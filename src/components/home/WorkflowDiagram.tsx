'use client';

import { useEffect, useState } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import { useInView } from '@/components/motion';

/**
 * The origination workflow as an investment process diagram.
 *
 * Five stages with the artefact each one produces. The connector fills left to
 * right on first view, which is the only motion. It reads as a capital process
 * rather than a software architecture diagram because the labels are the
 * decisions, not the components.
 */

const STAGES = [
  { key: 'signal', label: 'Signal', detail: 'A dated public event' },
  { key: 'qualification', label: 'Qualification', detail: 'Evidence classified by provenance' },
  { key: 'outreach', label: 'Outreach', detail: 'Executive contact drafted' },
  { key: 'underwriting', label: 'Underwriting', detail: 'SaaS quality assessed' },
  { key: 'structure', label: 'Capital structure', detail: 'Equity, debt, or blended' },
] as const;

export function WorkflowDiagram() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>('-20% 0px -20% 0px');
  const [active, setActive] = useState(reduced ? STAGES.length : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setActive(i);
      if (i >= STAGES.length) window.clearInterval(id);
    }, 190);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="panel relative overflow-hidden p-5 sm:p-6">
      <p className="label">Origination workflow</p>

      {/* Horizontal on wide screens, vertical on narrow. */}
      <ol className="mt-5 hidden items-start gap-0 md:flex">
        {STAGES.map((s, i) => {
          const on = i < active;
          return (
            <li
              key={s.key}
              className="relative flex flex-1 flex-col items-start last:max-w-[7.5rem] last:flex-none"
            >
              {/* Connector to the next stage */}
              {i < STAGES.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(0.55rem+2px)] right-0 top-[0.55rem] h-px bg-navy-700"
                >
                  <span
                    className="block h-full origin-left bg-cobalt-500"
                    style={{
                      transform: `scaleX(${on ? 1 : 0})`,
                      transition: reduced
                        ? undefined
                        : `transform ${DURATION.base}ms ${EASING.standard}`,
                    }}
                  />
                </span>
              ) : null}

              <span
                aria-hidden="true"
                className={`relative z-10 grid h-[1.1rem] w-[1.1rem] place-items-center rounded-full border transition-colors duration-300 ${
                  on
                    ? 'border-cobalt-400 bg-cobalt-500'
                    : 'border-navy-600 bg-navy-900'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    on ? 'bg-navy-950' : 'bg-navy-700'
                  }`}
                />
              </span>

              <div className="mt-3 pr-3 last:pr-0">
                <p
                  className={`text-xs font-semibold transition-colors duration-300 ${
                    on ? 'text-ivory-50' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </p>
                <p className="mt-1 text-3xs leading-snug text-slate-500">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Narrow layout */}
      <ol className="mt-5 space-y-3 md:hidden">
        {STAGES.map((s, i) => {
          const on = i < active;
          return (
            <li key={s.key} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                  on ? 'border-cobalt-400 bg-cobalt-500' : 'border-navy-600 bg-navy-900'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${on ? 'bg-navy-950' : 'bg-navy-700'}`}
                />
              </span>
              <div>
                <p
                  className={`text-xs font-semibold ${on ? 'text-ivory-50' : 'text-slate-500'}`}
                >
                  {s.label}
                </p>
                <p className="mt-0.5 text-3xs leading-snug text-slate-500">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
