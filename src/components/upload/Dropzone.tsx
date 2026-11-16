'use client';

import { useRef, useState } from 'react';

type Props = {
  value?: string | null;
  onFile: (file: File) => void | Promise<void>;
  uploading?: boolean;
  progress?: number;
  accept?: string;
};

export default function Dropzone({ value, onFile, uploading, progress, accept = 'image/*' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(value ?? null);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
    onFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
        dragging ? 'border-neutral-900 bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800' : 'border-neutral-300 dark:border-neutral-700'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="preview" className="mb-3 max-h-40 rounded-md object-contain" />
      ) : (
        <p className="text-sm text-neutral-500">Drag & drop an image here, or click to select</p>
      )}
      {uploading && (
        <div className="mt-2 w-full">
          <div className="h-2 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-700">
            <div className="h-full bg-neutral-900 transition-all dark:bg-neutral-100" style={{ width: `${progress ?? 0}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}