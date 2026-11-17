type Props = {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
};

export function LoadingSkeleton({
  width = '100%',
  height = '16',
  circle = false,
  className,
}: Props) {
  return (
    <div
      className={`
        animate-pulse rounded-full ${circle ? 'bg-neutral-200 dark:bg-neutral-800' : 'bg-neutral-100 dark:bg-neutral-800'}
        ${className ?? ''}
      `}
      style={{ width, height }}
      aria-busy="true"
    />
  );
}
