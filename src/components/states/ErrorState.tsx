type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title = 'Terjadi kesalahan',
  message,
  onRetry,
  retryLabel = 'Coba lagi',
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {message && <p className="mb-4 max-w-md text-sm text-neutral-500">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
