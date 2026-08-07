'use client';

import { useInView } from '@/components/motion';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

/**
 * The origination workflow, drawn as a connected sequence rather than as a grid
 * of cards.
 *
 * Six stages on two desktop rows, each carrying the artefact it produces, so a
 * reader can see that the process outputs something auditable at every step
 * rather than ending in a single opinion. The connecting rule draws itself once
 * when the section enters view, which is the only motion here: a scaleX on a
 * one pixel line, no new animation primitive, and nothing that moves while the
 * text is being read.
 *
 * On narrow viewports the same data becomes a vertical timeline, because six
 * stages side by side at 390px is a horizontal scroll nobody performs.
 */

export interface FlowStage {
  n: string;
  title: string;
  body: string;
  output: string;
}

function Rule({ shown, delay }: { shown: boolean; delay: number }) {
  const reduced = useReducedMotion();
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 right-0 top-[0.4375rem] hidden h-px origin-left bg-slate-200 lg:block"
      style={{
        transform: `scaleX(${reduced || shown ? 1 : 0})`,
        transition: reduced ? undefined : `transform ${DURATION.slow}ms ${EASING.standard} ${delay}ms`,
      }}
    />
  );
}

export function OriginationFlow({ stages }: { stages: readonly FlowStage[] }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>('-12% 0px -12% 0px');

  const rows = [stages.slice(0, 3), stages.slice(3, 6)];

  return (
    <div ref={ref} className="space-y-10 lg:space-y-12">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="relative">
          {/* The connecting rule, drawn left to right behind the stage markers. */}
          <Rule shown={inView} delay={rowIndex * 260} />

          <ol className="relative grid gap-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-8">
            {row.map((s, i) => {
              const index = rowIndex * 3 + i;
              const delay = reduced ? 0 : 220 + index * 90;
              return (
                <li
                  key={s.n}
                  className="relative min-w-0 pl-6 lg:pl-0 lg:pt-6"
                  style={{
                    opacity: reduced || inView ? 1 : 0,
                    transform: reduced || inView ? 'none' : 'translate3d(0, 8px, 0)',
                    transition: reduced
                      ? undefined
                      : `opacity ${DURATION.reveal}ms ${EASING.standard} ${delay}ms, transform ${DURATION.reveal}ms ${EASING.standard} ${delay}ms`,
                  }}
                >
                  {/* Marker. Sits on the rule at desktop, on a rail at mobile. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 h-2 w-2 rounded-full border-2 border-cobalt-500 bg-white lg:top-1"
                  />
                  {/* Mobile rail, connecting one stage to the next. */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2rem] left-[3px] top-5 w-px bg-slate-100 last:hidden lg:hidden"
                  />

                  <p className="num text-2xs font-semibold tracking-wider text-cobalt-600">{s.n}</p>
                  <h3 className="mt-1 font-display text-base font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.body}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-slate-100 bg-ivory-100 px-2 py-1 text-3xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-teal-500" />
                    {s.output}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
