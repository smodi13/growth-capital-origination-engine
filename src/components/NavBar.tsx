'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import { SITE } from '@/lib/site';

/**
 * Sticky navigation.
 *
 * Transparent over the hero and solid once scrolled, with an animated active
 * indicator. The mobile panel is a focus trap with escape handling and returns
 * focus to the trigger on close, so keyboard users are never stranded inside
 * it.
 */
export function NavBar({ routes }: { routes: readonly { href: string; label: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : (pathname ?? '').startsWith(href)),
    [pathname],
  );

  // Solid chrome once the hero has scrolled away. Scroll position is external
  // state, so it is only written from the listener callback.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const id = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close on route change. Adjusting state during render is the sanctioned
  // pattern for reacting to a changed input, and it avoids the extra commit an
  // effect would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Escape to close, and keep tab focus inside the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // Move focus into the panel when it opens.
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    }, reduced ? 0 : DURATION.instant);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, reduced]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-standard ${
        scrolled || open
          ? 'border-slate-100 bg-white shadow-nav'
          : 'border-slate-100/70 bg-white/96 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto w-full max-w-[86rem] px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500"
          >
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-md border border-cobalt-200 bg-cobalt-50 font-mono text-3xs font-bold text-cobalt-700 transition-colors group-hover:border-cobalt-300"
            >
              GC
            </span>
            <span className="text-[0.8125rem] font-semibold tracking-tight text-slate-900">
              Origination Engine
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {routes.map((r) => {
              const active = isActive(r.href);
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded px-2 py-2 text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 ${
                    active ? 'text-slate-900' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {r.label}
                  {/* Animated underline. Scales rather than changing layout. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-1 h-px origin-left bg-cobalt-500"
                    style={{
                      transform: `scaleX(${active ? 1 : 0})`,
                      transition: reduced ? undefined : `transform 260ms ${EASING.standard}`,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-cobalt-200 px-2.5 py-1.5 text-3xs font-semibold uppercase tracking-wider text-cobalt-700 transition-colors hover:border-cobalt-300 hover:bg-cobalt-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 xl:inline-flex"
            >
              GitHub
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-slate-100 bg-white/98 lg:hidden"
      >
        <nav
          className="mx-auto grid w-full max-w-[86rem] grid-cols-2 gap-1 px-4 py-4 sm:px-6"
          aria-label="Primary mobile"
        >
          {routes.map((r) => {
            const active = isActive(r.href);
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-3 py-2.5 text-[0.8125rem] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500 ${
                  active
                    ? 'bg-cobalt-50 text-slate-900'
                    : 'text-slate-700 hover:bg-ivory-100'
                }`}
              >
                {r.label}
              </Link>
            );
          })}
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 rounded-lg border border-slate-100 px-3 py-2.5 text-center text-[0.8125rem] font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500"
          >
            GitHub repository
          </a>
        </nav>
      </div>
    </header>
  );
}
