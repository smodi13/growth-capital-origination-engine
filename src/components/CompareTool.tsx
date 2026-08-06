'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CompanyRecord } from '@/lib/types';
import { ConfidenceBadge, FreshnessBadge } from './primitives';

export interface CompareRecord {
  slug: string;
  name: string;
  sector: string;
  stage: string;
  headquarters: string;
  latestFinancing: string;
  financingDate: string;
  totalFunding: string;
  commercialMaturity: string;
  growthEvidence: string;
  recurringRevenueEvidence: string;
  capitalEfficiencyEvidence: string;
  debtEvidence: string;
  sourcingSignal: string;
  freshness: CompanyRecord['signalFreshness'];
  signalDate: string;
  confidence: CompanyRecord['dataConfidence'];
  score: number;
  equityFit: number;
  debtFit: number;
  blendedFit: number;
  mainRisk: string;
  nextQuestion: string;
}

const MAX = 4;

type RowDef = {
  label: string;
  render: (r: CompareRecord) => React.ReactNode;
  wrap?: boolean;
};

const ROWS: RowDef[] = [
  { label: 'Sector', render: (r) => r.sector },
  { label: 'Financing stage', render: (r) => r.stage },
  { label: 'Headquarters', render: (r) => r.headquarters },
  { label: 'Latest disclosed financing', render: (r) => r.latestFinancing, wrap: true },
  { label: 'Financing date', render: (r) => r.financingDate },
  { label: 'Total disclosed funding', render: (r) => r.totalFunding },
  { label: 'Commercial maturity evidence', render: (r) => r.commercialMaturity, wrap: true },
  { label: 'Growth evidence', render: (r) => r.growthEvidence, wrap: true },
  { label: 'Recurring revenue evidence', render: (r) => r.recurringRevenueEvidence, wrap: true },
  { label: 'Capital efficiency evidence', render: (r) => r.capitalEfficiencyEvidence, wrap: true },
  { label: 'Existing debt evidence', render: (r) => r.debtEvidence, wrap: true },
  { label: 'Original sourcing signal', render: (r) => r.sourcingSignal, wrap: true },
  {
    label: 'Signal freshness',
    render: (r) => (
      <span className="inline-flex flex-col items-start gap-1">
        <FreshnessBadge value={r.freshness} />
        <span className="num text-ink-600">{r.signalDate}</span>
      </span>
    ),
  },
  { label: 'Data confidence', render: (r) => <ConfidenceBadge value={r.confidence} /> },
  {
    label: 'Origination score',
    render: (r) => <span className="num text-base font-semibold text-ink-50">{r.score.toFixed(1)}</span>,
  },
  { label: 'Growth equity fit', render: (r) => <span className="num">{r.equityFit} / 5</span> },
  { label: 'Private credit fit', render: (r) => <span className="num">{r.debtFit} / 5</span> },
  { label: 'Blended capital fit', render: (r) => <span className="num">{r.blendedFit} / 5</span> },
  { label: 'Main risk', render: (r) => r.mainRisk, wrap: true },
  { label: 'Next diligence question', render: (r) => r.nextQuestion, wrap: true },
];

export function CompareTool({ records }: { records: CompareRecord[] }) {
  const [selected, setSelected] = useState<string[]>(() =>
    records.slice(0, 3).map((r) => r.slug),
  );

  const chosen = useMemo(
    () => selected.map((s) => records.find((r) => r.slug === s)).filter(Boolean) as CompareRecord[],
    [selected, records],
  );

  const toggle = (slug: string) => {
    setSelected((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug);
      if (cur.length >= MAX) return cur;
      return [...cur, slug];
    });
  };

  return (
    <div>
      <div className="panel p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="label">Select up to {MAX} companies</p>
          <p className="text-2xs text-ink-500">
            {selected.length} of {MAX} selected
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {records.map((r) => {
            const isOn = selected.includes(r.slug);
            const isFull = !isOn && selected.length >= MAX;
            return (
              <button
                key={r.slug}
                type="button"
                onClick={() => toggle(r.slug)}
                disabled={isFull}
                aria-pressed={isOn}
                className={`rounded border px-2.5 py-1.5 text-2xs font-medium transition-colors ${
                  isOn
                    ? 'border-accent-500 bg-accent-600/20 text-accent-200'
                    : isFull
                      ? 'cursor-not-allowed border-ink-800 bg-ink-900/50 text-ink-700'
                      : 'border-ink-700 bg-ink-900 text-ink-300 hover:border-ink-600 hover:text-ink-100'
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>
        {selected.length > 0 ? (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="mt-3 text-2xs text-ink-500 underline underline-offset-2 hover:text-ink-300"
          >
            Clear selection
          </button>
        ) : null}
      </div>

      {chosen.length === 0 ? (
        <p className="mt-6 text-sm text-ink-500">
          Select at least one company above to build a comparison.
        </p>
      ) : (
        <div className="table-scroll mt-5">
          <table
            className="w-full border-collapse text-left"
            style={{ minWidth: `${14 + chosen.length * 16}rem` }}
          >
            <thead>
              <tr className="border-b border-ink-800">
                <th scope="col" className="w-56 px-3 py-3 align-bottom">
                  <span className="label">Attribute</span>
                </th>
                {chosen.map((r) => (
                  <th key={r.slug} scope="col" className="px-3 py-3 align-bottom">
                    <Link href={`/companies/${r.slug}/`} className="text-sm font-semibold text-ink-50 hover:text-accent-300">
                      {r.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-ink-800/60 align-top">
                  <th scope="row" className="px-3 py-3 text-left">
                    <span className="label">{row.label}</span>
                  </th>
                  {chosen.map((r) => (
                    <td
                      key={r.slug}
                      className={`px-3 py-3 text-xs text-ink-300 ${row.wrap ? 'leading-relaxed' : ''}`}
                    >
                      {row.render(r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
