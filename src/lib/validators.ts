import { z } from 'zod';

const experienceItemSchema = z
  .object({
    title: z.string().default(''),
    organization: z.string().default(''),
    period: z.string().default(''),
    bullets: z.array(z.string()).default([]),
  })
  .passthrough();

const projectItemSchema = z
  .object({
    title: z.string().default(''),
    description: z.string().default(''),
  })
  .passthrough();

const educationItemSchema = z
  .object({
    institution: z.string().default(''),
    major: z.string().default(''),
    period: z.string().default(''),
    gpa: z.string().default(''),
  })
  .passthrough();

const certificationItemSchema = z
  .object({
    title: z.string().default(''),
    issuer: z.string().default(''),
    period: z.string().default(''),
    note: z.string().default(''),
  })
  .passthrough();

export const biodataSchema = z.object({
  name: z.string().default(''),
  location: z.string().default(''),
  headline: z.string().default(''),
  summary: z.string().default(''),
  phone: z.string().default(''),
  email: z.string().email().or(z.literal('')).default(''),
  linkedin: z
    .string()
    .default('')
    .refine((v) => v === '' || /^https?:\/\//i.test(v), 'Must be an http(s) URL'),
  github: z
    .string()
    .default('')
    .refine((v) => v === '' || /^https?:\/\//i.test(v), 'Must be an http(s) URL'),
  experience: z.array(experienceItemSchema).default([]),
  projects: z.array(projectItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  certifications: z.array(certificationItemSchema).default([]),
  skills: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
});

export type BiodataInput = z.infer<typeof biodataSchema>;

// Alias for consumers expecting a capitalized name.
export const BiodataSchema = biodataSchema;

export { slugify } from '@/lib/slugify';

const urlField = z
  .string()
  .default('')
  .refine((v) => v === '' || /^https?:\/\//i.test(v), 'Must be an http(s) URL');

export const researchSchema = z.object({
  slug: z.string().optional().default(''),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().default(''),
  content: z.string().default(''),
  category: z.string().default(''),
  fileUrl: urlField,
  coverUrl: urlField,
  published: z.boolean().default(true),
});

export type ResearchInput = z.infer<typeof researchSchema>;

export const ResearchSchema = researchSchema;

export const portfolioSchema = z.object({
  slug: z.string().optional().default(''),
  title: z.string().min(1, 'Title is required'),
  summary: z.string().default(''),
  description: z.string().default(''),
  category: z.string().default(''),
  imageUrl: z.string().default(''),
  demoUrl: urlField,
  repoUrl: urlField,
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;

// Alias for consumers expecting a capitalized name.
export const PortfolioSchema = portfolioSchema;
