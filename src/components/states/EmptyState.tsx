import Link from 'next/link';

type Props = {
  title?: string;
  description?: string;
  message?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: React.ReactNode;
};

export function EmptyState({
  title = 'Nothing here yet',
  description,
  message,
  actionHref,
  actionLabel,
  children,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      {(description || message) && (
        <p className="mt-2 max-w-md text-sm text-neutral-500">{description ?? message}</p>
      )}
      {children}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-6 rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;