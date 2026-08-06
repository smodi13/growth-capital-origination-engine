'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import type { CompanyRecord } from '@/lib/types';
import { ConfidenceBadge, FreshnessBadge, Pill } from './primitives';

/**
 * Pipeline statuses. The two default statuses are the only ones a seeded
 * record may hold, because anything further would imply contact that has not
 * happened.
 */
export const STATUSES = [
  'Researching',
  'Qualified for outreach',
  'Outreach drafted',
  'Contacted',
  'Initial discussion',
  'Preliminary diligence',
  'Passed',
  'Priority follow-up',
] as const;

export type Status = (typeof STATUSES)[number];

/** Statuses permitted in seeded, default data. */
export const DEFAULT_STATUSES: readonly Status[] = ['Researching', 'Qualified for outreach'];

export const PRIORITIES = ['High', 'Medium', 'Watch'] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface PipelineSeed {
  slug: string;
  name: string;
  sector: string;
  stage: string;
  channel: string;
  freshness: CompanyRecord['signalFreshness'];
  signalDate: string;
  confidence: CompanyRecord['dataConfidence'];
  score: number;
  defaultStatus: Status;
  defaultPriority: Priority;
  defaultNextAction: string;
  capitalView: string;
  readiness: string;
  outstandingMetrics: number;
  qualificationCompleteness: number;
}

interface PipelineState {
  status: Status;
  priority: Priority;
  nextAction: string;
  notes: string;
}

const STORAGE_KEY = 'gcoe.pipeline.v1';

const STATUS_TONE: Record<Status, string> = {
  Researching: 'border-white/10 bg-graphite-800 text-slate-300',
  'Qualified for outreach': 'border-cobalt-600/45 bg-cobalt-700/25 text-cobalt-300',
  'Outreach drafted': 'border-cobalt-500/40 bg-cobalt-700/22 text-cobalt-200',
  Contacted: 'border-teal-500/40 bg-teal-800/25 text-teal-200',
  'Initial discussion': 'border-teal-600/40 bg-teal-900/35 text-teal-200',
  'Preliminary diligence': 'border-positive-500/40 bg-positive-700/25 text-positive-200',
  Passed: 'border-white/[0.07] bg-graphite-900 text-slate-500',
  'Priority follow-up': 'border-caution-500/40 bg-caution-700/22 text-caution-200',
};

function csvEscape(v: string): string {
  return `"${v.replace(/"/g, '""')}"`;
}

/* -------------------------------------------------------------------------- */
/* localStorage as an external store                                          */
/* -------------------------------------------------------------------------- */

/**
 * Browser storage is an external system, so it is read through
 * useSyncExternalStore rather than mirrored into React state inside an effect.
 * That avoids a cascading render on mount and gives a clean server snapshot,
 * which matters here because the page is statically prerendered.
 */
type Overrides = Record<string, Partial<PipelineState>>;

const listeners = new Set<() => void>();
let snapshot: string | null = null;
let snapshotParsed: Overrides = {};

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  // Another tab writing the same key should be reflected here too.
  window.addEventListener('storage', fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', fn);
  };
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable in private modes. The board still works.
    return null;
  }
}

/** The prerendered HTML must not depend on browser storage. */
function getServerSnapshot(): string | null {
  return null;
}

function parseOverrides(raw: string | null): Overrides {
  if (raw === snapshot) return snapshotParsed;
  snapshot = raw;
  try {
    snapshotParsed = raw ? (JSON.parse(raw) as Overrides) : {};
  } catch {
    snapshotParsed = {};
  }
  return snapshotParsed;
}

function writeOverrides(next: Overrides): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Nothing to do. The in-memory value below still drives the UI.
  }
  listeners.forEach((fn) => fn());
}

function clearOverrides(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do.
  }
  listeners.forEach((fn) => fn());
}

export function PipelineBoard({ seeds }: { seeds: PipelineSeed[] }) {
  const initial = useMemo(() => {
    const map: Record<string, PipelineState> = {};
    seeds.forEach((s) => {
      map[s.slug] = {
        status: s.defaultStatus,
        priority: s.defaultPriority,
        nextAction: s.defaultNextAction,
        notes: '',
      };
    });
    return map;
  }, [seeds]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Seeded defaults with any persisted user edits layered on top.
  const state = useMemo(() => {
    const overrides = parseOverrides(raw);
    const merged: Record<string, PipelineState> = {};
    Object.keys(initial).forEach((slug) => {
      merged[slug] = { ...initial[slug], ...(overrides[slug] ?? {}) };
    });
    return merged;
  }, [initial, raw]);

  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Priority>('All');
  const [sortKey, setSortKey] = useState<'score' | 'name' | 'priority'>('score');
  const [expanded, setExpanded] = useState<string | null>(null);

  const update = useCallback(
    (slug: string, patch: Partial<PipelineState>) => {
      const overrides = parseOverrides(getSnapshot());
      writeOverrides({ ...overrides, [slug]: { ...(overrides[slug] ?? {}), ...patch } });
    },
    [],
  );

  const reset = useCallback(() => {
    clearOverrides();
  }, []);

  const rows = useMemo(() => {
    const priorityRank: Record<Priority, number> = { High: 0, Medium: 1, Watch: 2 };
    const out = seeds.filter((s) => {
      const st = state[s.slug];
      if (!st) return false;
      if (statusFilter !== 'All' && st.status !== statusFilter) return false;
      if (priorityFilter !== 'All' && st.priority !== priorityFilter) return false;
      return true;
    });
    out.sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'priority') {
        const d = priorityRank[state[a.slug].priority] - priorityRank[state[b.slug].priority];
        return d || b.score - a.score;
      }
      return b.score - a.score || a.name.localeCompare(b.name);
    });
    return out;
  }, [seeds, state, statusFilter, priorityFilter, sortKey]);

  const exportCsv = useCallback(() => {
    const header = [
      'Company',
      'Sector',
      'Financing stage',
      'Origination score',
      'Discovery channel',
      'Signal date',
      'Signal freshness',
      'Data confidence',
      'Pipeline status',
      'Priority',
      'Next action',
      'Notes',
      'Preliminary capital solution view',
    ];
    const lines = [header.map(csvEscape).join(',')];
    rows.forEach((s) => {
      const st = state[s.slug];
      lines.push(
        [
          s.name,
          s.sector,
          s.stage,
          s.score.toFixed(1),
          s.channel,
          s.signalDate,
          s.freshness,
          s.confidence,
          st.status,
          st.priority,
          st.nextAction,
          st.notes,
          s.capitalView,
        ]
          .map((v) => csvEscape(String(v)))
          .join(','),
      );
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'origination-pipeline.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [rows, state]);

  const counts = useMemo(() => {
    const c: Partial<Record<Status, number>> = {};
    seeds.forEach((s) => {
      const st = state[s.slug];
      if (st) c[st.status] = (c[st.status] ?? 0) + 1;
    });
    return c;
  }, [seeds, state]);

  return (
    <div>
      {/* Status summary */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <span
            key={s}
            className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 text-2xs font-medium ${STATUS_TONE[s]}`}
          >
            {s}
            <span className="num">{counts[s] ?? 0}</span>
          </span>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="label">Filter by status</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'All' | Status)}
            className="mt-1 w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2 text-xs text-slate-100"
          >
            <option>All</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Filter by priority</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as 'All' | Priority)}
            className="mt-1 w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2 text-xs text-slate-100"
          >
            <option>All</option>
            {PRIORITIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label">Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as 'score' | 'name' | 'priority')}
            className="mt-1 w-full rounded-md border border-white/10 bg-graphite-900 px-3 py-2 text-xs text-slate-100"
          >
            <option value="score">Origination score</option>
            <option value="priority">Outreach priority</option>
            <option value="name">Company name</option>
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="flex-1 rounded-md bg-cobalt-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cobalt-400"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-graphite-900"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-2xs text-slate-500">
          Showing <span className="num text-slate-300">{rows.length}</span> of {seeds.length}.
          Changes persist in this browser only, using localStorage. There is no database, no
          account, and nothing is transmitted anywhere.
        </p>
        <div
          className="inline-flex shrink-0 rounded-md border border-white/10 p-0.5"
          role="group"
          aria-label="Pipeline view"
        >
          {(['table', 'kanban'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`rounded px-2.5 py-1 text-2xs font-medium capitalize transition-colors ${
                view === v ? 'bg-white/[0.08] text-slate-100' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban */}
      {view === 'kanban' ? (
        <div className="table-scroll mt-4" tabIndex={0} role="region" aria-label="Scrollable table">
          <div className="flex min-w-[62rem] gap-3">
            {STATUSES.map((status) => {
              const column = rows.filter((s) => state[s.slug].status === status);
              return (
                <section key={status} className="w-[15rem] shrink-0">
                  <div
                    className={`flex items-center justify-between gap-2 rounded-t-lg border px-3 py-2 ${STATUS_TONE[status]}`}
                  >
                    <span className="text-2xs font-semibold">{status}</span>
                    <span className="num text-2xs">{column.length}</span>
                  </div>
                  <div className="min-h-[6rem] space-y-2 rounded-b-lg border border-t-0 border-white/[0.07] bg-graphite-900/40 p-2">
                    {column.map((s) => (
                      <article key={s.slug} className="panel p-3">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/companies/${s.slug}/`}
                            className="truncate text-xs font-semibold text-ivory-50 hover:text-cobalt-200"
                          >
                            {s.name}
                          </Link>
                          <span className="num shrink-0 text-2xs text-slate-400">
                            {s.score.toFixed(1)}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <FreshnessBadge value={s.freshness} />
                          <span className="chip border-white/10 bg-white/[0.04] text-slate-500">
                            {s.outstandingMetrics} gaps
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="h-1 w-full overflow-hidden rounded-full bg-navy-800">
                            <div
                              className="h-full rounded-full bg-cobalt-500/80"
                              style={{ width: `${s.qualificationCompleteness * 100}%` }}
                            />
                          </div>
                          <p className="mt-1 text-3xs text-slate-600">
                            {Math.round(s.qualificationCompleteness * 100)}% qualified
                          </p>
                        </div>
                      </article>
                    ))}
                    {column.length === 0 ? (
                      <p className="px-1 py-4 text-center text-3xs text-slate-600">
                        No records in this stage
                      </p>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Rows */}
      <ul className={`mt-4 space-y-2 ${view === 'kanban' ? 'hidden' : ''}`}>
        {rows.map((s) => {
          const st = state[s.slug];
          const isOpen = expanded === s.slug;
          return (
            <li key={s.slug} className="panel p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/companies/${s.slug}/`} className="text-sm font-semibold text-ivory-50 hover:text-cobalt-300">
                      {s.name}
                    </Link>
                    <span className="num text-slate-500">{s.score.toFixed(1)}</span>
                    <span className={`rounded border px-1.5 py-0.5 text-2xs font-medium ${STATUS_TONE[st.status]}`}>
                      {st.status}
                    </span>
                  </div>
                  <p className="mt-1 text-2xs text-slate-500">
                    {s.sector} <span className="text-slate-600">/</span> {s.stage}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <FreshnessBadge value={s.freshness} />
                    <ConfidenceBadge value={s.confidence} />
                    <Pill>{s.channel}</Pill>
                    <Pill>Signal {s.signalDate}</Pill>
                    <Pill>{s.readiness}</Pill>
                    <Pill>{s.outstandingMetrics} metrics outstanding</Pill>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : s.slug)}
                  className="shrink-0 rounded-md border border-white/10 px-3 py-1.5 text-2xs font-semibold text-slate-300 hover:bg-graphite-800"
                  aria-expanded={isOpen}
                >
                  {isOpen ? 'Close' : 'Edit'}
                </button>
              </div>

              {isOpen ? (
                <div className="mt-4 grid gap-3 border-t border-white/[0.07] pt-4 lg:grid-cols-2">
                  <label className="block">
                    <span className="label">Status</span>
                    <select
                      value={st.status}
                      onChange={(e) => update(s.slug, { status: e.target.value as Status })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2 text-xs text-slate-100"
                    >
                      {STATUSES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="label">Priority</span>
                    <select
                      value={st.priority}
                      onChange={(e) => update(s.slug, { priority: e.target.value as Priority })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2 text-xs text-slate-100"
                    >
                      {PRIORITIES.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="label">Next action</span>
                    <input
                      type="text"
                      value={st.nextAction}
                      onChange={(e) => update(s.slug, { nextAction: e.target.value })}
                      className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2 text-xs text-slate-100"
                    />
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="label">Notes</span>
                    <textarea
                      value={st.notes}
                      onChange={(e) => update(s.slug, { notes: e.target.value })}
                      rows={3}
                      placeholder="Working notes stay in this browser only."
                      className="mt-1 w-full rounded-md border border-white/10 bg-navy-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600"
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-3 grid gap-2 border-t border-white/[0.07] pt-3 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <span className="label pt-0.5">Next action</span>
                  <span className="text-xs leading-relaxed text-slate-300">{st.nextAction}</span>
                  {st.notes ? (
                    <>
                      <span className="label pt-0.5">Notes</span>
                      <span className="whitespace-pre-wrap text-xs leading-relaxed text-slate-400">
                        {st.notes}
                      </span>
                    </>
                  ) : null}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No records match the current filters.</p>
      ) : null}
    </div>
  );
}
