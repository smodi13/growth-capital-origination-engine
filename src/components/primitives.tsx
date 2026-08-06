import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  PROVENANCE_LABEL,
  type CompanyClassification,
  type DataConfidence,
  type Provenance,
  type SignalFreshness,
} from '@/lib/types';
import type { ReadinessLevel } from '@/lib/readiness';

/* -------------------------------------------------------------------------- */
/* Links                                                                      */
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

export function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link">
      {children}
    </Link>
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
    <header className="relative border-b border-white/[0.07] pb-9">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-display font-semibold text-ivory-50">{title}</h1>
      {lede ? <p className="lede mt-4 max-w-prose">{lede}</p> : null}
      {children}
    </header>
  );
}

export function Section({
  title,
  description,
  children,
  id,
  actions,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  actions?: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-title font-semibold text-ivory-50">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-400">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Badges                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Every badge pairs colour with a distinct label, so no state is communicated
 * by colour alone.
 */

const FRESHNESS_STYLE: Record<SignalFreshness, string> = {
  Fresh: 'border-positive-500/40 bg-positive-700/25 text-positive-200',
  Recent: 'border-caution-500/40 bg-caution-700/25 text-caution-200',
  Established: 'border-white/12 bg-white/[0.05] text-slate-400',
};

export function FreshnessBadge({ value }: { value: SignalFreshness }) {
  return <span className={`chip ${FRESHNESS_STYLE[value]}`}>{value}</span>;
}

const CONFIDENCE_STYLE: Record<DataConfidence, string> = {
  High: 'border-cobalt-500/45 bg-cobalt-700/25 text-cobalt-200',
  Moderate: 'border-white/12 bg-white/[0.05] text-slate-300',
  Limited: 'border-white/10 bg-white/[0.03] text-slate-500',
};

export function ConfidenceBadge({ value }: { value: DataConfidence }) {
  return (
    <span className={`chip ${CONFIDENCE_STYLE[value]}`} title={`Data confidence: ${value}`}>
      {value} confidence
    </span>
  );
}

const PROVENANCE_STYLE: Record<Provenance, string> = {
  'independently-verified': 'border-positive-500/40 bg-positive-700/22 text-positive-200',
  'company-reported': 'border-cobalt-500/40 bg-cobalt-700/22 text-cobalt-200',
  'investor-reported': 'border-teal-500/40 bg-teal-800/25 text-teal-200',
  'government-reported': 'border-teal-600/40 bg-teal-900/35 text-teal-200',
  'analyst-judgment': 'border-caution-500/40 bg-caution-700/22 text-caution-200',
  'not-sufficiently-supported': 'border-risk-500/40 bg-risk-700/22 text-risk-200',
};

export function ProvenanceBadge({ value }: { value: Provenance }) {
  return <span className={`chip ${PROVENANCE_STYLE[value]}`}>{PROVENANCE_LABEL[value]}</span>;
}

const CLASSIFICATION_STYLE: Record<CompanyClassification, string> = {
  'Benchmark growth company': 'border-white/12 bg-white/[0.05] text-slate-300',
  'Emerging origination target': 'border-teal-500/45 bg-teal-800/30 text-teal-200',
};

export function ClassificationBadge({
  value,
  compact = false,
}: {
  value: CompanyClassification;
  compact?: boolean;
}) {
  const label = compact
    ? value === 'Emerging origination target'
      ? 'Emerging'
      : 'Benchmark'
    : value;
  return (
    <span className={`chip ${CLASSIFICATION_STYLE[value]}`} title={value}>
      {label}
    </span>
  );
}

const READINESS_STYLE: Record<ReadinessLevel, string> = {
  'Potentially underwritable': 'border-positive-500/45 bg-positive-700/25 text-positive-200',
  'Underwriting data required': 'border-cobalt-500/45 bg-cobalt-700/25 text-cobalt-200',
  'Preliminary qualification possible': 'border-teal-500/40 bg-teal-800/28 text-teal-200',
  'Outreach worthy': 'border-caution-500/40 bg-caution-700/22 text-caution-200',
  'Insufficient public evidence': 'border-risk-500/40 bg-risk-700/22 text-risk-200',
};

export function ReadinessBadge({ value }: { value: ReadinessLevel }) {
  return <span className={`chip ${READINESS_STYLE[value]}`}>{value}</span>;
}

export function Pill({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'accent';
}) {
  return (
    <span
      className={`chip ${
        tone === 'accent'
          ? 'border-cobalt-500/45 bg-cobalt-700/25 text-cobalt-200'
          : 'border-white/10 bg-white/[0.04] text-slate-400'
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
  const cls = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-base' : 'text-2xl';
  return (
    <span className={`num font-semibold text-ivory-50 ${cls}`}>{score.toFixed(1)}</span>
  );
}

export function RatingBar({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={`${rating} of ${max}`}>
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-1.5 rounded-sm ${i < rating ? 'bg-cobalt-400' : 'bg-navy-700'}`}
          />
        ))}
      </span>
      <span className="num text-2xs text-slate-400">
        {rating}/{max}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Disclosure                                                                 */
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
          ? 'border-caution-500/35 bg-caution-700/15 text-caution-100'
          : 'border-white/[0.07] bg-graphite-900/50 text-slate-400'
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
  value: ReactNode;
  sub?: string;
}) {
  return (
    <div className="panel px-4 py-3.5">
      <p className="label">{label}</p>
      <p className="num mt-2 text-2xl font-semibold text-ivory-50">{value}</p>
      {sub ? <p className="mt-1.5 text-2xs leading-snug text-slate-500">{sub}</p> : null}
    </div>
  );
}

export function DistributionBar({
  items,
  total,
}: {
  items: { label: string; count: number }[];
  total: number;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-xs text-slate-300">{item.label}</span>
              <span className="num shrink-0 text-2xs text-slate-500">{item.count}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy-800">
              <div
                className="h-full rounded-full bg-cobalt-500"
                style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
          <span className="num w-10 text-right text-2xs text-slate-500">
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

export function FieldList({ fields }: { fields: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-white/[0.06]">
      {fields.map((f) => (
        <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-5">
          <dt className="label pt-0.5">{f.label}</dt>
          <dd className="text-[0.8125rem] leading-relaxed text-slate-200">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* Tooltip                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * An accessible term explanation.
 *
 * Implemented as a native title plus a visible dotted underline and an
 * accessible description, so the meaning is reachable by keyboard and by screen
 * reader rather than only on pointer hover.
 */
export function Term({ children, definition }: { children: ReactNode; definition: string }) {
  return (
    <span
      tabIndex={0}
      title={definition}
      aria-label={`${typeof children === 'string' ? children : ''}. ${definition}`}
      className="cursor-help border-b border-dotted border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-400"
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Page shell                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Standard content container for every route except the homepage, which
 * manages its own full bleed hero.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[86rem] px-4 pb-16 pt-10 sm:px-6 lg:px-8">{children}</div>
  );
}
