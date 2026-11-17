import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <main
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
      className="px-6 py-16"
    >
      <div className="mx-auto max-w-xl">
        <header className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Get in touch</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Fill out the form and I will get back to you within a day.
          </p>
        </header>

        <div className="relative mt-8 rounded-2xl border border-white/60 bg-white/50 p-8 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/40">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
