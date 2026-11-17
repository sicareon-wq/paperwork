import type { ContactMessage } from '@prisma/client';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { contactSchema, type ContactFormValues } from '@/lib/validators';

export interface ContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SendContactResult =
  | { success: true; data: ContactMessage; sent: boolean }
  | { success: false; error: string; fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>> };

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Paperwork <noreply@paperwork.local>';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? process.env.ADMIN_EMAIL;

async function sendViaResend(data: ContactMessageData): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('[contact] RESEND_API_KEY not set; message stored but email not sent', {
      name: data.name,
      email: data.email,
      subject: data.subject,
    });
    return false;
  }

  const to = TO_EMAIL;
  if (!to) {
    console.error('[contact] CONTACT_TO_EMAIL / ADMIN_EMAIL not set; email not sent');
    return false;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `[Contact] ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      replyTo: data.email,
    });
    return true;
  } catch (err) {
    console.error('[contact] Resend send failed', err);
    return false;
  }
}

export async function sendContactMessage(data: ContactMessageData): Promise<SendContactResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Your message could not be sent',
      fieldErrors: parsed.error.flatten().fieldErrors as Partial<Record<keyof ContactFormValues, string[]>>,
    };
  }

  const stored = await db.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  const sent = await sendViaResend({ name: stored.name, email: stored.email, subject: stored.subject, message: stored.message });
  return { success: true, data: stored, sent };
}
