'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import type { CompanyClassification, CompanyRecord } from '@/lib/types';
import type { ReadinessLevel } from '@/lib/readiness';
import { focusRing } from './motion';
import {
  ClassificationBadge,
  ConfidenceBadge,
  FreshnessBadge,
  ReadinessBadge,
  Term,
} from './primitives';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

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
  classification: CompanyClassification;
  readiness: ReadinessLevel;
  outstandingMetrics: number;
  whyEntered: string;
  capitalView: string;
}

type SortKey =
  | 'score'
  | 'name'
  | 'sector'
  | 'signalDate'
  | 'equityFit'
  | 'debtFit'
  | 'blendedFit'
  | 'outstandingMetrics';

type ColumnKey =
  | 'company'
  | 'classification'
  | 'sector'
  | 'signal'
  | 'score'
  | 'fit'
  | 'readiness'
  | 'channel'
  | 'confidence'
  | 'gaps';

interface ColumnDef {
  key: ColumnKey;
  label: string;
  sort?: SortKey;
  align?: 'right';
  /** Hidden in the compact view. */
  compactHidden?: boolean;
  tip?: string;
}

const COLUMNS: ColumnDef[] = [
  { key: 'company', label: 'Company', sort: 'name' },
  {
    key: 'classification',
    label: 'Class',
    compactHidden: true,
    tip: 'Benchmark growth companies calibrate the underwriting reference points. Emerging origination targets are where a differentiated conversation is more plausible. Classification never affects the score.',
  },
  { key: 'sector', label: 'Sector', sort: 'sector' },
  {
    key: 'signal',
    label: 'Signal',
    sort: 'signalDate',
    tip: 'The dated public event that put the company into the pipeline, and how recent it is relative to the review date.',
  },
  {
    key: 'score',
    label: 'Score',
    sort: 'score',
    align: 'right',
    tip: 'Origination Priority Score from 0 to 100. A weighted average of nine coarse factor ratings plus a capped data confidence modifier. It measures whether a company is worth a conversation, not whether it is a good investment.',
  },
  {
    key: 'fit',
    label: 'E / D / B',
    align: 'right',
    tip: 'Growth equity, private credit, and blended capital fit, each rated 0 to 5 and assessed independently. Private credit is capped by what the public record can support.',
  },
  {
    key: 'readiness',
    label: 'Underwriting readiness',
    compactHidden: true,
    tip: 'Derived from the evidence on the record, never from the company identity. It describes how far public information can take an underwriting conversation.',
  },
  {
    key: 'gaps',
    label: 'Gaps',
    sort: 'outstandingMetrics',
    align: 'right',
    compactHidden: true,
    tip: 'Count of the thirteen management-required metrics that public sources do not disclose for this company.',
  },
  { key: 'channel', label: 'Discovery channel', compactHidden: true },
  { key: 'confidence', label: 'Confidence', compactHidden: true },
];

/* -------------------------------------------------------------------------- */
/* Presets                                                                    */
/* -------------------------------------------------------------------------- */

interface Preset {
  id: string;
  label: string;
  description: string;
  apply: (r: UniverseRow) => boolean;
  sort?: SortKey;
}

const PRESETS: Preset[] = [
  {
    id: 'priority',
    label: 'Highest outreach priority',
    description: 'Companies flagged High priority, ranked by score.',
    apply: (r) => r.priority === 'High',
    sort: 'score',
  },
  {
    id: 'equity',
    label: 'Best growth equity fit',
    description: 'Equity fit of 4 or 5 on the public record.',
    apply: (r) => r.equityFit >= 4,
    sort: 'equityFit',
  },
  {
    id: 'debt',
    label: 'Potential debt candidates',
    description:
      'Private credit fit of 3 or more, meaning the record clears the first credit hurdles.',
    apply: (r) => r.debtFit >= 3,
    sort: 'debtFit',
  },
  {
    id: 'blended',
    label: 'Blended capital opportunities',
    description:
      'Blended fit of 4 or 5, where dilution sensitivity and debt capacity plausibly coexist.',
    apply: (r) => r.blendedFit >= 4,
    sort: 'blendedFit',
  },
  {
    id: 'fresh',
    label: 'Fresh sourcing signals',
    description: 'A dated signal within 90 days of the review date.',
    apply: (r) => r.freshness === 'Fresh',
    sort: 'signalDate',
  },
  {
    id: 'confident',
    label: 'High confidence records',
    description: 'Records where disclosure is strong enough to support firm conclusions.',
    apply: (r) => r.confidence === 'High',
    sort: 'score',
  },
  {
    id: 'gaps',
    label: 'Missing critical SaaS metrics',
    description: 'Ten or more of the thirteen management-required metrics undisclosed.',
    apply: (r) => r.outstandingMetrics >= 10,
    sort: 'outstandingMetrics',
  },
  {
    id: 'emerging',
    label: 'Emerging origination targets',
    description: 'The differentiated subset, held to the same verification standard.',
    apply: (r) => r.classification === 'Emerging origination target',
    sort: 'score',
  },
];

const VIEW_KEY = 'gcoe.universe.view.v1';

/* -------------------------------------------------------------------------- */
/* Search highlighting                                                        */
/* -------------------------------------------------------------------------- */

function Highlight({ text, query }: { text: string; query: string }): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="hit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Table                                                                      */
/* -------------------------------------------------------------------------- */

interface SavedView {
  sector?: string;
  freshness?: string;
  confidence?: string;
  classification?: string;
  sortKey?: SortKey;
  asc?: boolean;
  dense?: boolean;
  hidden?: ColumnKey[];
}

/*
 * The saved view lives in browser storage, which is an external system, so it
 * is read through useSyncExternalStore. The server snapshot is null, so the
 * prerendered markup always shows the default view and the stored view is
 * applied after hydration. Reading storage during the first render instead
 * would produce a hydration mismatch.
 */
const listeners = new Set<() => void>();
let rawCache: string | null = null;
let parsedCache: SavedView = {};

function subscribeView(fn: () => void): () => void {
  listeners.add(fn);
  window.addEventListener('storage', fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', fn);
  };
}

function getViewSnapshot(): string | null {
  try {
    return window.localStorage.getItem(VIEW_KEY);
  } catch {
    return null;
  }
}

function getViewServerSnapshot(): string | null {
  return null;
}

function parseView(raw: string | null): SavedView {
  if (raw === rawCache) return parsedCache;
  rawCache = raw;
  try {
    parsedCache = raw ? (JSON.parse(raw) as SavedView) : {};
  } catch {
    parsedCache = {};
  }
  return parsedCache;
}

function writeView(next: SavedView): void {
  try {
    window.localStorage.setItem(VIEW_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable. The view still works for this session.
  }
  listeners.forEach((fn) => fn());
}

export function UniverseTable({ rows }: { rows: UniverseRow[] }) {
  const raw = useSyncExternalStore(subscribeView, getViewSnapshot, getViewServerSnapshot);
  const saved = parseView(raw);

  // Controls the user has touched this session override the stored view.
  const [override, setOverride] = useState<SavedView>({});
  const [query, setQuery] = useState('');
  const [preset, setPreset] = useState<string | null>(null);
  const [showColumns, setShowColumns] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const sector = override.sector ?? saved.sector ?? 'All';
  const freshness = override.freshness ?? saved.freshness ?? 'All';
  const confidence = override.confidence ?? saved.confidence ?? 'All';
  const classification = override.classification ?? saved.classification ?? 'All';
  const sortKey = override.sortKey ?? saved.sortKey ?? 'score';
  const asc = override.asc ?? saved.asc ?? false;
  const dense = override.dense ?? saved.dense ?? false;
  // Memoised so the array identity is stable across renders, which keeps the
  // hooks below from re-running on every keystroke.
  const hiddenList = useMemo<ColumnKey[]>(
    () => override.hidden ?? saved.hidden ?? [],
    [override.hidden, saved.hidden],
  );
  const hidden = useMemo(() => new Set<ColumnKey>(hiddenList), [hiddenList]);

  /** Apply a change and persist the resulting view in one step. */
  const apply = useCallback(
    (patch: SavedView) => {
      const next: SavedView = {
        sector,
        freshness,
        confidence,
        classification,
        sortKey,
        asc,
        dense,
        hidden: hiddenList,
        ...patch,
      };
      setOverride(next);
      writeView(next);
    },
    [sector, freshness, confidence, classification, sortKey, asc, dense, hiddenList],
  );

  const setSector = (v: string) => apply({ sector: v });
  const setFreshness = (v: string) => apply({ freshness: v });
  const setConfidence = (v: string) => apply({ confidence: v });
  const setClassification = (v: string) => apply({ classification: v });
  const setDense = (v: boolean) => apply({ dense: v });

  const sectors = useMemo(
    () => ['All', ...Array.from(new Set(rows.map((r) => r.sector))).sort()],
    [rows],
  );

  const activePreset = PRESETS.find((p) => p.id === preset) ?? null;

  const activeFilterCount =
    (query.trim() ? 1 : 0) +
    (sector !== 'All' ? 1 : 0) +
    (freshness !== 'All' ? 1 : 0) +
    (confidence !== 'All' ? 1 : 0) +
    (classification !== 'All' ? 1 : 0) +
    (activePreset ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = rows.filter((r) => {
      if (activePreset && !activePreset.apply(r)) return false;
      if (sector !== 'All' && r.sector !== sector) return false;
      if (freshness !== 'All' && r.freshness !== freshness) return false;
      if (confidence !== 'All' && r.confidence !== confidence) return false;
      if (classification !== 'All' && r.classification !== classification) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.sector.toLowerCase().includes(q) ||
        r.subsector.toLowerCase().includes(q) ||
        r.headquarters.toLowerCase().includes(q) ||
        r.channel.toLowerCase().includes(q) ||
        r.stage.toLowerCase().includes(q)
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
  }, [rows, query, sector, freshness, confidence, classification, activePreset, sortKey, asc]);

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (key === sortKey) apply({ asc: !asc });
      else apply({ sortKey: key, asc: key === 'name' || key === 'sector' });
    },
    [sortKey, asc, apply],
  );

  const reset = useCallback(() => {
    setQuery('');
    setPreset(null);
    const cleared: SavedView = {
      sector: 'All',
      freshness: 'All',
      confidence: 'All',
      classification: 'All',
      sortKey: 'score',
      asc: false,
      dense,
      hidden: hiddenList,
    };
    setOverride(cleared);
    writeView(cleared);
  }, [dense, hiddenList]);

  const applyPreset = useCallback(
    (p: Preset) => {
      setPreset((cur) => (cur === p.id ? null : p.id));
      if (p.sort) apply({ sortKey: p.sort, asc: false });
    },
    [apply],
  );

  const visible = COLUMNS.filter((c) => !hidden.has(c.key) && !(dense && c.compactHidden));

  return (
    <div>
      {/* -------------------------------------------------------- toolbar -- */}
      <div className="rounded-xl border border-slate-100 bg-ivory-100 p-4 sm:p-5">
        <p className="label">Saved views</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => {
            const on = preset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p)}
                aria-pressed={on}
                title={p.description}
                className={`rounded-md border px-2.5 py-1.5 text-2xs font-medium transition-colors duration-200 ${focusRing} ${
                  on
                    ? 'border-cobalt-500 bg-cobalt-600/25 text-cobalt-700'
                    : 'border-slate-100 bg-ivory-100 text-slate-600 hover:border-slate-200 hover:text-slate-800'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        {activePreset ? (
          <p className="mt-2 text-2xs text-slate-600">{activePreset.description}</p>
        ) : null}

        {/* -------------------------------------------------------- filters -- */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
          <label className="block lg:col-span-2">
            <span className="label">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Company, sector, city, stage, signal"
              className="field mt-1.5"
            />
          </label>

          {[
            { label: 'Sector', value: sector, set: setSector, options: sectors },
            {
              label: 'Freshness',
              value: freshness,
              set: setFreshness,
              options: ['All', 'Fresh', 'Recent', 'Established'],
            },
            {
              label: 'Confidence',
              value: confidence,
              set: setConfidence,
              options: ['All', 'High', 'Moderate', 'Limited'],
            },
            {
              label: 'Classification',
              value: classification,
              set: setClassification,
              options: ['All', 'Benchmark growth company', 'Emerging origination target'],
            },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="label">{f.label}</span>
              <select
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="field mt-1.5"
              >
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {/* ------------------------------------------------------- controls -- */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-2xs text-slate-600">
            Showing <span className="num text-slate-700">{filtered.length}</span> of {rows.length}
            {activeFilterCount > 0 ? (
              <span className="chip ml-2 border-cobalt-200 bg-cobalt-50 text-cobalt-700">
                {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'} active
              </span>
            ) : null}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex rounded-md border border-slate-100 p-0.5"
              role="group"
              aria-label="Table density"
            >
              {[
                { id: false, label: 'Expanded' },
                { id: true, label: 'Compact' },
              ].map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setDense(d.id)}
                  aria-pressed={dense === d.id}
                  className={`rounded px-2.5 py-1 text-2xs font-medium transition-colors ${focusRing} ${
                    dense === d.id
                      ? 'bg-ivory-200 text-slate-800'
                      : 'text-slate-600 hover:text-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowColumns((v) => !v)}
              aria-expanded={showColumns}
              className={`rounded-md border border-slate-100 px-2.5 py-1.5 text-2xs font-medium text-slate-600 hover:text-slate-800 ${focusRing}`}
            >
              Columns
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={activeFilterCount === 0}
              className={`rounded-md border border-slate-100 px-2.5 py-1.5 text-2xs font-medium transition-colors ${focusRing} ${
                activeFilterCount === 0
                  ? 'cursor-not-allowed text-slate-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {showColumns ? (
          <div className="panel mt-3 p-3">
            <p className="label">Visible columns</p>
            <div className="mt-2.5 flex flex-wrap gap-3">
              {COLUMNS.map((c) => (
                <label
                  key={c.key}
                  className="inline-flex items-center gap-1.5 text-2xs text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={!hidden.has(c.key)}
                    disabled={c.key === 'company'}
                    onChange={() => {
                      const next = new Set(hidden);
                      if (next.has(c.key)) next.delete(c.key);
                      else next.add(c.key);
                      apply({ hidden: [...next] });
                    }}
                    className="h-3 w-3 accent-cobalt-500"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* --------------------------------------------------------- desktop -- */}
      <div
        className="table-scroll mt-4 hidden lg:block"
        tabIndex={0}
        role="region"
        aria-label="Scrollable table"
      >
        <table className="w-full min-w-[62rem] border-collapse text-left">
          <caption className="sr-only">
            Private company sourcing universe, sortable by column
          </caption>
          <thead className="thead-sticky">
            <tr className="border-b border-slate-200">
              {visible.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`th ${c.align === 'right' ? 'text-right' : ''}`}
                  aria-sort={
                    c.sort && sortKey === c.sort ? (asc ? 'ascending' : 'descending') : undefined
                  }
                >
                  {c.sort ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(c.sort as SortKey)}
                      className={`label rounded hover:text-slate-800 ${focusRing}`}
                    >
                      {c.tip ? <Term definition={c.tip}>{c.label}</Term> : c.label}
                      {sortKey === c.sort ? (
                        <span aria-hidden="true" className="ml-1 text-cobalt-600">
                          {asc ? '↑' : '↓'}
                        </span>
                      ) : null}
                    </button>
                  ) : (
                    <span className="label">
                      {c.tip ? <Term definition={c.tip}>{c.label}</Term> : c.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.slug}
                className="row-hover border-b border-slate-100"
                onMouseEnter={() => setHovered(r.slug)}
                onMouseLeave={() => setHovered((h) => (h === r.slug ? null : h))}
              >
                {visible.map((c) => (
                  <td key={c.key} className={`td ${c.align === 'right' ? 'text-right' : ''}`}>
                    {c.key === 'company' ? (
                      <>
                        <Link
                          href={`/companies/${r.slug}/`}
                          className={`rounded font-semibold text-slate-900 hover:text-cobalt-700 ${focusRing}`}
                        >
                          <Highlight text={r.name} query={query} />
                        </Link>
                        <p className="mt-0.5 text-2xs text-slate-600">
                          <Highlight text={r.headquarters.split(',')[0]} query={query} />
                        </p>
                        {hovered === r.slug && !dense ? (
                          <p className="mt-1.5 max-w-[24rem] text-2xs leading-relaxed text-slate-600">
                            {r.whyEntered.slice(0, 150)}
                            {r.whyEntered.length > 150 ? '...' : ''}
                          </p>
                        ) : null}
                      </>
                    ) : c.key === 'classification' ? (
                      <ClassificationBadge value={r.classification} compact />
                    ) : c.key === 'sector' ? (
                      <>
                        <p className="text-slate-700">
                          <Highlight text={r.sector} query={query} />
                        </p>
                        <p className="mt-0.5 text-2xs text-slate-600">{r.stage}</p>
                      </>
                    ) : c.key === 'signal' ? (
                      <>
                        <FreshnessBadge value={r.freshness} />
                        <p className="num mt-1 text-2xs text-slate-600">{r.signalDate}</p>
                      </>
                    ) : c.key === 'score' ? (
                      <span className="num text-sm font-semibold text-slate-900">
                        {r.score.toFixed(1)}
                      </span>
                    ) : c.key === 'fit' ? (
                      <span className="num text-slate-700">
                        {r.equityFit} <span className="text-slate-600">/</span> {r.debtFit}{' '}
                        <span className="text-slate-600">/</span> {r.blendedFit}
                      </span>
                    ) : c.key === 'readiness' ? (
                      <ReadinessBadge value={r.readiness} />
                    ) : c.key === 'gaps' ? (
                      <span className="num text-slate-600">{r.outstandingMetrics}</span>
                    ) : c.key === 'channel' ? (
                      <span className="text-slate-600">
                        <Highlight text={r.channel} query={query} />
                      </span>
                    ) : (
                      <ConfidenceBadge value={r.confidence} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------------------------------------------------- mobile -- */}
      <ul className="mt-4 space-y-2.5 lg:hidden">
        {filtered.map((r) => (
          <li key={r.slug} className="panel p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/companies/${r.slug}/`}
                  className={`rounded font-display text-base font-semibold text-slate-900 ${focusRing}`}
                >
                  <Highlight text={r.name} query={query} />
                </Link>
                <p className="mt-1 text-2xs text-slate-600">
                  {r.sector} <span className="text-slate-600">/</span> {r.stage}
                </p>
              </div>
              <span className="num shrink-0 text-xl font-semibold text-slate-900">
                {r.score.toFixed(1)}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <ClassificationBadge value={r.classification} compact />
              <FreshnessBadge value={r.freshness} />
              <ConfidenceBadge value={r.confidence} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-2xs text-slate-600">
              <span className="num">
                E {r.equityFit} / D {r.debtFit} / B {r.blendedFit}
              </span>
              <span className="num">{r.outstandingMetrics} gaps</span>
              <span>{r.channel}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* ----------------------------------------------------- empty state -- */}
      {filtered.length === 0 ? (
        <div className="panel mt-6 px-6 py-12 text-center">
          <p className="font-display text-base font-semibold text-slate-900">
            No companies match these filters
          </p>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-slate-600">
            The universe holds {rows.length} verified companies. Try widening the sector or
            confidence filter, or clear the saved view to start again.
          </p>
          <button type="button" onClick={reset} className="btn-secondary mt-5">
            Reset all filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
