'use server';

import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { contactSchema } from '@/lib/validators';
import { sendContactMessage, type ContactMessageData, type SendContactResult } from '@/lib/email';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

const attempts = new Map<string, number[]>();

function allowed(key: string): boolean {
  const now = Date.now();
  const times = (attempts.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (times.length >= RATE_LIMIT_MAX) {
    attempts.set(key, times);
    return false;
  }
  times.push(now);
  attempts.set(key, times);
  return true;
}

function extract(formData: FormData): ContactMessageData {
  return {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    message: String(formData.get('message') ?? ''),
  };
}

export async function contactAction(formData: FormData): Promise<SendContactResult> {
  const forwarded = (await headers()).get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  if (!allowed(ip)) {
    return {
      success: false,
      error: 'Too many messages. Please wait a moment and try again.',
    };
  }

  const data = extract(formData);
  return sendContactMessage(data);
}
