import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  PROVENANCE_LABEL,
  type DataConfidence,
  type Provenance,
  type SignalFreshness,
} from '@/lib/types';

/* -------------------------------------------------------------------------- */
/* External link                                                              */
/* -------------------------------------------------------------------------- */

export function ExternalLink({
  href,
  children,
  className = 'link',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Page structure                                                             */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ink-800 pb-8">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      {lede ? <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-300">{lede}</p> : null}
      {children}
    </header>
  );
}

export function Section({
  title,
  description,
  children,
  id,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mt-12">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-400">{description}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Badges                                                                     */
/* -------------------------------------------------------------------------- */

const FRESHNESS_STYLE: Record<SignalFreshness, string> = {
  Fresh: 'border-emerald-700/50 bg-emerald-950/50 text-emerald-300',
  Recent: 'border-amber-700/50 bg-amber-950/40 text-amber-300',
  Established: 'border-ink-700 bg-ink-850 text-ink-400',
};

export function FreshnessBadge({ value }: { value: SignalFreshness }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-2xs font-medium ${FRESHNESS_STYLE[value]}`}
    >
      {value}
    </span>
  );
}

const CONFIDENCE_STYLE: Record<DataConfidence, string> = {
  High: 'border-accent-600/60 bg-accent-600/15 text-accent-300',
  Moderate: 'border-ink-700 bg-ink-850 text-ink-300',
  Limited: 'border-ink-700 bg-ink-900 text-ink-500',
};

export function ConfidenceBadge({ value }: { value: DataConfidence }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-2xs font-medium ${CONFIDENCE_STYLE[value]}`}
      title={`Data confidence: ${value}`}
    >
      {value} confidence
    </span>
  );
}

const PROVENANCE_STYLE: Record<Provenance, string> = {
  'independently-verified': 'border-emerald-700/50 bg-emerald-950/40 text-emerald-300',
  'company-reported': 'border-sky-800/50 bg-sky-950/40 text-sky-300',
  'investor-reported': 'border-indigo-800/50 bg-indigo-950/40 text-indigo-300',
  'government-reported': 'border-teal-800/50 bg-teal-950/40 text-teal-300',
  'analyst-judgment': 'border-amber-800/50 bg-amber-950/30 text-amber-300',
  'not-sufficiently-supported': 'border-rose-900/50 bg-rose-950/30 text-rose-300',
};

export function ProvenanceBadge({ value }: { value: Provenance }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-2xs font-medium ${PROVENANCE_STYLE[value]}`}
    >
      {PROVENANCE_LABEL[value]}
    </span>
  );
}

export function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-2xs font-medium ${
        tone === 'accent'
          ? 'border-accent-600/60 bg-accent-600/15 text-accent-300'
          : 'border-ink-700 bg-ink-850 text-ink-400'
      }`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Score                                                                      */
/* -------------------------------------------------------------------------- */

export function ScoreMark({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const cls =
    size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-xl';
  return (
    <span className={`font-mono font-semibold tabular-nums text-ink-50 ${cls}`}>
      {score.toFixed(1)}
    </span>
  );
}

/** A 0 to 5 rating rendered as filled segments plus the numeral. */
export function RatingBar({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={`${rating} of ${max}`}>
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-1.5 rounded-sm ${i < rating ? 'bg-accent-400' : 'bg-ink-800'}`}
          />
        ))}
      </span>
      <span className="num text-ink-300">
        {rating}/{max}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Disclosure banner                                                          */
/* -------------------------------------------------------------------------- */

export function DisclosureBanner({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'warning';
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-xs leading-relaxed ${
        tone === 'warning'
          ? 'border-amber-800/50 bg-amber-950/25 text-amber-200/90'
          : 'border-ink-800 bg-ink-900/60 text-ink-400'
      }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

export function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="panel px-4 py-3">
      <p className="label">{label}</p>
      <p className="mt-1.5 font-mono text-xl font-semibold tabular-nums text-ink-50">{value}</p>
      {sub ? <p className="mt-1 text-2xs leading-snug text-ink-500">{sub}</p> : null}
    </div>
  );
}

/** A labelled horizontal distribution bar. */
export function DistributionBar({
  items,
  total,
}: {
  items: { label: string; count: number }[];
  total: number;
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-xs text-ink-300">{item.label}</span>
              <span className="num shrink-0 text-ink-500">{item.count}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink-850">
              <div
                className="h-full rounded-full bg-accent-500"
                style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
          <span className="num w-10 text-right text-ink-500">
            {total > 0 ? Math.round((item.count / total) * 100) : 0}%
          </span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Definition list                                                            */
/* -------------------------------------------------------------------------- */

export function FieldList({
  fields,
}: {
  fields: { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="divide-y divide-ink-800/70">
      {fields.map((f) => (
        <div key={f.label} className="grid gap-1 py-2.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
          <dt className="label pt-0.5">{f.label}</dt>
          <dd className="text-sm leading-relaxed text-ink-200">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link">
      {children}
    </Link>
  );
}
