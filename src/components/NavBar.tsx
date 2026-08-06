'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function NavBar({ routes }: { routes: readonly { href: string; label: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : (pathname ?? '').startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid h-6 w-6 place-items-center rounded border border-accent-600/60 bg-accent-600/15 font-mono text-2xs font-bold text-accent-300"
            >
              GC
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink-100">
              Origination Engine
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive(r.href)
                    ? 'bg-ink-850 text-ink-50'
                    : 'text-ink-400 hover:bg-ink-900 hover:text-ink-200'
                }`}
              >
                {r.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded border border-ink-700 px-2.5 py-1.5 text-xs font-medium text-ink-300 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        {open ? (
          <nav id="mobile-nav" className="grid grid-cols-2 gap-1 pb-4 lg:hidden" aria-label="Primary mobile">
            {routes.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                onClick={() => setOpen(false)}
                className={`rounded px-3 py-2 text-xs font-medium ${
                  isActive(r.href) ? 'bg-ink-850 text-ink-50' : 'text-ink-400 hover:bg-ink-900'
                }`}
              >
                {r.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
