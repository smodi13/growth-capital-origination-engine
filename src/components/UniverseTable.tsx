'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CompanyRecord } from '@/lib/types';
import { ConfidenceBadge, FreshnessBadge } from './primitives';

export interface UniverseRow {
  slug: string;
  name: string;
  sector: string;
  subsector: string;
  headquarters: string;
  stage: string;
  latestFinancing: string;
  financingDate: string;
  totalFunding: string;
  channel: string;
  freshness: CompanyRecord['signalFreshness'];
  signalDate: string;
  confidence: CompanyRecord['dataConfidence'];
  score: number;
  equityFit: number;
  debtFit: number;
  blendedFit: number;
  priority: CompanyRecord['outreachPriority'];
  lastReviewed: string;
}

type SortKey = 'score' | 'name' | 'sector' | 'signalDate' | 'equityFit' | 'debtFit' | 'blendedFit';

const COLUMNS: { key: SortKey; label: string; align?: 'right' }[] = [
  { key: 'name', label: 'Company' },
  { key: 'sector', label: 'Sector' },
  { key: 'signalDate', label: 'Signal' },
  { key: 'score', label: 'Score', align: 'right' },
  { key: 'equityFit', label: 'Equity', align: 'right' },
  { key: 'debtFit', label: 'Debt', align: 'right' },
  { key: 'blendedFit', label: 'Blended', align: 'right' },
];

export function UniverseTable({ rows }: { rows: UniverseRow[] }) {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [freshness, setFreshness] = useState('All');
  const [confidence, setConfidence] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [asc, setAsc] = useState(false);

  const sectors = useMemo(
    () => ['All', ...Array.from(new Set(rows.map((r) => r.sector))).sort()],
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = rows.filter((r) => {
      if (sector !== 'All' && r.sector !== sector) return false;
      if (freshness !== 'All' && r.freshness !== freshness) return false;
      if (confidence !== 'All' && r.confidence !== confidence) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.sector.toLowerCase().includes(q) ||
        r.subsector.toLowerCase().includes(q) ||
        r.headquarters.toLowerCase().includes(q) ||
        r.channel.toLowerCase().includes(q)
      );
    });

    out.sort((a, b) => {
      const dir = asc ? 1 : -1;
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'number' && typeof vb === 'number') {
        return (va - vb) * dir || a.name.localeCompare(b.name);
      }
      return String(va).localeCompare(String(vb)) * dir;
    });

    return out;
  }, [rows, query, sector, freshness, confidence, sortKey, asc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(key === 'name' || key === 'sector');
    }
  };

  return (
    <div>
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="label">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Company, sector, city, signal"
            className="mt-1 w-full rounded-md border border-ink-700 bg-ink-900 px-3 py-2 text-xs text-ink-100 placeholder:text-ink-600"
          />
        </label>

        <label className="block">
          <span className="label">Sector</span>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-700 bg-ink-900 px-3 py-2 text-xs text-ink-100"
          >
            {sectors.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Signal freshness</span>
          <select
            value={freshness}
            onChange={(e) => setFreshness(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-700 bg-ink-900 px-3 py-2 text-xs text-ink-100"
          >
            {['All', 'Fresh', 'Recent', 'Established'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Data confidence</span>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
            className="mt-1 w-full rounded-md border border-ink-700 bg-ink-900 px-3 py-2 text-xs text-ink-100"
          >
            {['All', 'High', 'Moderate', 'Limited'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 text-2xs text-ink-500">
        Showing {filtered.length} of {rows.length} companies.
      </p>

      <div className="table-scroll mt-3">
        <table className="w-full min-w-[64rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-ink-800">
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`whitespace-nowrap px-3 py-2 ${c.align === 'right' ? 'text-right' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className="label hover:text-ink-300"
                  >
                    {c.label}
                    {sortKey === c.key ? <span aria-hidden="true">{asc ? ' ↑' : ' ↓'}</span> : null}
                  </button>
                </th>
              ))}
              <th scope="col" className="whitespace-nowrap px-3 py-2">
                <span className="label">Discovery channel</span>
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2">
                <span className="label">Confidence</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slug} className="border-b border-ink-800/60 hover:bg-ink-900/60">
                <td className="px-3 py-2.5">
                  <Link href={`/companies/${r.slug}/`} className="text-xs font-semibold text-ink-50 hover:text-accent-300">
                    {r.name}
                  </Link>
                  <p className="mt-0.5 text-2xs text-ink-600">{r.headquarters.split(',')[0]}</p>
                </td>
                <td className="px-3 py-2.5">
                  <p className="text-xs text-ink-300">{r.sector}</p>
                  <p className="mt-0.5 text-2xs text-ink-600">{r.stage}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2.5">
                  <FreshnessBadge value={r.freshness} />
                  <p className="num mt-0.5 text-ink-600">{r.signalDate}</p>
                </td>
                <td className="num px-3 py-2.5 text-right font-semibold text-ink-50">
                  {r.score.toFixed(1)}
                </td>
                <td className="num px-3 py-2.5 text-right text-ink-300">{r.equityFit}</td>
                <td className="num px-3 py-2.5 text-right text-ink-300">{r.debtFit}</td>
                <td className="num px-3 py-2.5 text-right text-ink-300">{r.blendedFit}</td>
                <td className="px-3 py-2.5 text-xs text-ink-400">{r.channel}</td>
                <td className="px-3 py-2.5">
                  <ConfidenceBadge value={r.confidence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-ink-500">No companies match the current filters.</p>
      ) : null}
    </div>
  );
}
