import { describe, it, expect, vi, type Mock } from 'vitest';
import { contactAction } from '@/actions/contact';
import { db } from '@/lib/db';

const state = vi.hoisted(() => ({ ip: '203.0.113.9' }));

vi.mock('next/headers', () => ({
  headers: async () => ({ get: () => state.ip }),
}));

vi.mock('@/lib/db', () => ({
  db: {
    contactMessage: {
      create: vi.fn(async (input) => input.data),
    },
  },
}));

function validFormData() {
  const fd = new FormData();
  fd.append('name', 'Jane');
  fd.append('email', 'jane@example.com');
  fd.append('subject', 'Hi');
  fd.append('message', 'x');
  return fd;
}

describe('contactAction', () => {
  it('invalid input fails the action without storing', async () => {
    state.ip = '198.51.100.1';
    const result = await contactAction(new FormData());

    expect(result.success).toBe(false);
    if (result.success) {
      expect.fail('expected failure');
    }
    expect(result.fieldErrors?.name).toEqual(['Name is required']);
    expect(result.fieldErrors?.email).toEqual(expect.arrayContaining(['Email is required']));
    expect(db.contactMessage.create as unknown as Mock).not.toHaveBeenCalled();
  });

  it('rate-limits by IP', async () => {
    state.ip = '198.51.100.2';
    const results = await Promise.all(Array.from({ length: 6 }, () => contactAction(validFormData())));
    expect(results.slice(0, 5).every((r) => r.success)).toBe(true);
    expect(results[5].success).toBe(false);
  });
});
