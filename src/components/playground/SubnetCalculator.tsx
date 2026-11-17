'use client';

import { useMemo, useState } from 'react';
import { calculateSubnet } from '@/lib/subnet';

interface SubnetCalculatorProps {
  initial?: { ip?: string; cidr?: number } | null;
}

function planck(n: number, width: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: width });
}

export default function SubnetCalculator({ initial }: SubnetCalculatorProps) {
  const [ip, setIp] = useState(initial?.ip ?? '192.168.1.0');
  const [cidr, setCidr] = useState<number>(initial?.cidr ?? 24);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    setError(null);
    try {
      return calculateSubnet(ip, cidr);
    } catch (err) {
      return { ...calculateSubnet('0.0.0.0', 24), error: err instanceof Error ? err.message : 'Invalid input' } as any;
    }
  }, [ip, cidr]);

  const copy = async () => {
    const text = `${result.network}/${result.prefix} — Network ${result.network} · Broadcast ${result.broadcast} · Usable hosts ${result.usableHosts}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard API unavailable */
    }
  };

  return (
    <section className="w-full max-w-4xl rounded-2xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/50">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Subnet calculator</h2>
          <p className="text-sm text-neutral-500">IPv4 network analysis</p>
        </div>
        <button
          onClick={copy}
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
          type="button"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="ip" className="block text-xs font-medium text-neutral-500">
              IP address
            </label>
            <input
              id="ip"
              className="w-full rounded-lg border border-neutral-300 bg-white/80 px-3 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-900/70 dark:focus:border-neutral-100 dark:focus:ring-neutral-100/30"
              placeholder="e.g. 192.168.1.0"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cidr" className="mb-1 block text-xs font-medium text-neutral-500">
                CIDR
              </label>
              <input
                id="cidr"
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full accent-neutral-900 dark:accent-neutral-100"
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>/0</span>
                <span>/32</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700">
              <span className="text-sm font-mono text-neutral-700">{planck(result.mask, 0)}</span>
              <span className="text-neutral-500">mask</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Network" value={result.network} />
          <Field label="Broadcast" value={result.broadcast} />
          <Field label="Host range" value={`${result.hostMin} – ${result.hostMax}`} />
          <Field label="Prefix" value={`/${result.prefix}`} />
          <Field label="Mask" value={result.mask} />
          <Field label="Usable hosts" value={planck(result.usableHosts, 0)} monospace />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
          <span>Hosts total: {planck(result.hostCount, 0)}</span>
          <span>Network mask: {result.mask}</span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, monospace }: { label: string; value: string; monospace?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-800">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <span className={`font-mono text-sm ${monospace ? 'font-semibold' : 'font-medium'} text-neutral-900 dark:text-neutral-100`}>
        {value}
      </span>
    </div>
  );
}
