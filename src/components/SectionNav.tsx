'use client';

import { useEffect, useState } from 'react';
import { focusRing } from './motion';
import { useReducedMotion } from '@/lib/motion';

/**
 * Sticky in-page navigation for long research pages.
 *
 * Tracks the active section with an IntersectionObserver and falls back to the
 * first section when the observer is unavailable, so the list is always usable.
 * It is a plain nav with anchor links, so it works with JavaScript disabled and
 * with the keyboard.
 */
export function SectionNav({
  sections,
  className = '',
}: {
  sections: { id: string; label: string }[];
  className?: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <nav className={className} aria-label="Page sections">
      <p className="label">On this page</p>
      <ul className="mt-3 space-y-0.5 border-l border-white/[0.08]">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className={`relative -ml-px block border-l py-1.5 pl-3 text-2xs transition-colors duration-200 ${focusRing} ${
                  on
                    ? 'border-cobalt-400 font-medium text-ivory-50'
                    : 'border-transparent text-slate-500 hover:border-white/20 hover:text-slate-300'
                }`}
                style={reduced ? undefined : undefined}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
