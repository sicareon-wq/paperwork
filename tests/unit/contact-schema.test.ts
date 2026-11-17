import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/validators';

describe('contactSchema', () => {
  it('valid input passes', () => {
    const r = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'Hi there, let us talk.',
    });
    expect(r.success).toBe(true);
  });

  it('empty name fails', () => {
    const r = contactSchema.safeParse({ name: '', email: 'jane@example.com', subject: 'Hi', message: 'x' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'name')).toBe(true);
    }
  });

  it('whitespace-only name fails', () => {
    const r = contactSchema.safeParse({ name: '   ', email: 'jane@example.com', subject: 'Hi', message: 'x' });
    expect(r.success).toBe(false);
  });

  it('empty email fails', () => {
    const r = contactSchema.safeParse({ name: 'Jane', email: '', subject: 'Hi', message: 'x' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('invalid email fails', () => {
    const r = contactSchema.safeParse({ name: 'Jane', email: 'not-an-email', subject: 'Hi', message: 'x' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'email')).toBe(true);
    }
  });

  it('empty subject fails', () => {
    const r = contactSchema.safeParse({ name: 'Jane', email: 'jane@example.com', subject: '', message: 'x' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'subject')).toBe(true);
    }
  });

  it('empty message fails', () => {
    const r = contactSchema.safeParse({ name: 'Jane', email: 'jane@example.com', subject: 'Hi', message: '' });
    expect(r.success).toBe(false);
    if (!r.success) {
      expect(r.error.issues.some((i) => i.path[0] === 'message')).toBe(true);
    }
  });

  it('over-long fields fail', () => {
    const name = 'x'.repeat(121);
    const email = 'x'.repeat(321) + '@example.com';
    const subject = 'x'.repeat(201);
    const message = 'x'.repeat(5001);
    expect(contactSchema.safeParse({ name, email, subject, message }).success).toBe(false);
  });
});
