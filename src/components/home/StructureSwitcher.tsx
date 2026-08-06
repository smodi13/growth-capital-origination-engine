'use client';

import { useState } from 'react';
import { Crossfade } from '@/components/motion';
import { focusRing } from '@/components/motion';

/**
 * Interactive three way capital structure comparison.
 *
 * The values are passed in from the static model. Switching structures only
 * crossfades the presentation; it never recomputes anything, so a displayed
 * figure always equals the model output for that structure. An automated test
 * asserts that every value rendered here matches the model.
 */

export interface StructureView {
  key: 'equity' | 'credit' | 'blended';
  label: string;
  summary: string;
  recommended: boolean;
  metrics: { label: string; value: string; tone?: 'positive' | 'risk' | 'neutral' }[];
  caveat: string;
}

export function StructureSwitcher({ views }: { views: StructureView[] }) {
  const [active, setActive] = useState(
    views.find((v) => v.recommended)?.key ?? views[0].key,
  );
  const current = views.find((v) => v.key === active) ?? views[0];

  return (
    <div className="panel overflow-hidden">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Capital structure"
        className="flex flex-col border-b border-white/[0.07] sm:flex-row"
      >
        {views.map((v) => {
          const on = v.key === active;
          return (
            <button
              key={v.key}
              role="tab"
              type="button"
              id={`tab-${v.key}`}
              aria-selected={on}
              aria-controls={`panel-${v.key}`}
              onClick={() => setActive(v.key)}
              className={`relative flex-1 px-4 py-3.5 text-left transition-colors duration-200 ${focusRing} ${
                on ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`text-[0.8125rem] font-semibold ${
                    on ? 'text-ivory-50' : 'text-slate-400'
                  }`}
                >
                  {v.label}
                </span>
                {v.recommended ? (
                  <span className="chip border-positive-500/45 bg-positive-700/25 text-positive-200">
                    Recommended
                  </span>
                ) : null}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-cobalt-500 transition-transform duration-300 ease-standard`}
                style={{ transform: `scaleX(${on ? 1 : 0})` }}
              />
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${current.key}`}
        aria-labelledby={`tab-${current.key}`}
        className="p-5 sm:p-6"
      >
        <Crossfade keyValue={current.key}>
          <div>
            <p className="max-w-prose text-sm leading-relaxed text-slate-300">{current.summary}</p>

            <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {current.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="label">{m.label}</dt>
                  <dd
                    className={`num mt-1.5 text-xl font-semibold ${
                      m.tone === 'positive'
                        ? 'text-positive-400'
                        : m.tone === 'risk'
                          ? 'text-risk-400'
                          : 'text-ivory-50'
                    }`}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-xs leading-relaxed ${
                current.recommended
                  ? 'border-caution-500/35 bg-caution-700/15 text-caution-100'
                  : 'border-white/[0.07] bg-navy-900/60 text-slate-400'
              }`}
            >
              <span className="font-semibold">
                {current.recommended ? 'Where this conclusion could be wrong: ' : 'Assessment: '}
              </span>
              {current.caveat}
            </div>
          </div>
        </Crossfade>
      </div>
    </div>
  );
}
