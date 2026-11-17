'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { contactSchema, type ContactFormValues } from '@/lib/validators';
import { contactAction } from '@/actions/contact';

type FieldError = { message?: string };

function inputClass(err?: FieldError) {
  return [
    'w-full rounded-md border px-3 py-2 outline-none transition focus:border-neutral-900 dark:focus:border-neutral-100',
    err ? 'border-red-500 dark:border-red-500' : 'border-neutral-300 dark:border-neutral-700',
    'bg-white/70 backdrop-blur dark:bg-neutral-900/50',
  ]
    .filter(Boolean)
    .join(' ');
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues;
        setError(field, { type: 'validation', message: issue.message });
      }
      return;
    }

    const result = await contactAction(new FormData());

    if (result.success) {
      toast.success('Message sent. I will get back to you soon.');
      reset();
      return;
    }

    if (result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        setError(field as keyof ContactFormValues, { type: 'server', message: messages[0] });
      }
    } else {
      toast.error(result.error);
    }

    return; // preserve entered data on failure

    toast.success('Message sent. I will get back to you soon.');
    reset();
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-2">
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className={inputClass(errors.name)}
          placeholder="Jane Doe"
        />
        {errors.name ? <p className="text-sm text-red-600 dark:text-red-400">{errors.name.message}</p> : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={inputClass(errors.email)}
          placeholder="jane@example.com"
        />
        {errors.email ? <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p> : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Subject
        </label>
        <input
          id="subject"
          {...register('subject')}
          className={inputClass(errors.subject)}
          placeholder="Let's work together"
        />
        {errors.subject ? <p className="text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p> : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className={inputClass(errors.message)}
          placeholder="Tell me about your project..."
        />
        {errors.message ? <p className="text-sm text-red-600 dark:text-red-400">{errors.message.message}</p> : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
