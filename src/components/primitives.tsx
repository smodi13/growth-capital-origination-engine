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
import { CLASSIFICATION_NOTE } from '@/lib/site';

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
    <header className="relative border-b border-slate-100 pb-9">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-display font-semibold text-slate-900">{title}</h1>
      {lede ? <p className="lede mt-4 max-w-prose">{lede}</p> : null}
      {children}
    </header>
  );
}

/**
 * Optional section ground.
 *
 * White is the default and the overwhelming majority. The alternatives exist so
 * a long analytical route can separate one stage of an argument from the next
 * without reaching for a dark panel: a neutral for supporting schedules, and two
 * very pale states for the downside and the conclusion.
 */
export type SectionGround = 'white' | 'neutral' | 'downside' | 'conclusion';

const SECTION_GROUND: Record<SectionGround, string> = {
  white: '',
  neutral: 'rounded-2xl bg-ivory-100 px-5 py-8 sm:px-7',
  downside: 'rounded-2xl bg-risk-100/60 px-5 py-8 sm:px-7',
  conclusion: 'rounded-2xl bg-cobalt-50 px-5 py-8 sm:px-7',
};

export function Section({
  title,
  description,
  children,
  id,
  actions,
  ground = 'white',
}: {
  title: string;
  description?: string;
  children: ReactNode;
  id?: string;
  actions?: ReactNode;
  ground?: SectionGround;
}) {
  return (
    <section id={id} className={`mt-14 scroll-mt-24 ${SECTION_GROUND[ground]}`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-title font-semibold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600">{description}</p>
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
  Fresh: 'border-positive-200 bg-positive-100 text-positive-700',
  Recent: 'border-caution-200 bg-caution-100 text-caution-700',
  Established: 'border-slate-100 bg-ivory-200 text-slate-600',
};

export function FreshnessBadge({ value }: { value: SignalFreshness }) {
  return <span className={`chip ${FRESHNESS_STYLE[value]}`}>{value}</span>;
}

const CONFIDENCE_STYLE: Record<DataConfidence, string> = {
  High: 'border-cobalt-200 bg-cobalt-50 text-cobalt-700',
  Moderate: 'border-slate-100 bg-ivory-100 text-slate-700',
  Limited: 'border-slate-100 bg-ivory-200 text-slate-600',
};

export function ConfidenceBadge({ value }: { value: DataConfidence }) {
  return (
    <span className={`chip ${CONFIDENCE_STYLE[value]}`} title={`Data confidence: ${value}`}>
      {value} confidence
    </span>
  );
}

const PROVENANCE_STYLE: Record<Provenance, string> = {
  'independently-verified': 'border-positive-200 bg-positive-100 text-positive-700',
  'company-reported': 'border-cobalt-200 bg-cobalt-50 text-cobalt-700',
  'investor-reported': 'border-teal-200 bg-teal-50 text-teal-700',
  'government-reported': 'border-teal-200 bg-teal-50 text-teal-700',
  'analyst-judgment': 'border-caution-200 bg-caution-100 text-caution-700',
  'not-sufficiently-supported': 'border-risk-200 bg-risk-100 text-risk-700',
};

export function ProvenanceBadge({ value }: { value: Provenance }) {
  return <span className={`chip ${PROVENANCE_STYLE[value]}`}>{PROVENANCE_LABEL[value]}</span>;
}

const CLASSIFICATION_STYLE: Record<CompanyClassification, string> = {
  'Benchmark growth company': 'border-slate-200 bg-ivory-200 text-slate-700',
  'Emerging origination target': 'border-cobalt-200 bg-cobalt-50 text-cobalt-700',
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
    <span
      className={`chip ${CLASSIFICATION_STYLE[value]}`}
      title={`${value}. ${CLASSIFICATION_NOTE}`}
    >
      {label}
    </span>
  );
}

const READINESS_STYLE: Record<ReadinessLevel, string> = {
  'Potentially underwritable': 'border-positive-200 bg-positive-100 text-positive-700',
  'Underwriting data required': 'border-cobalt-200 bg-cobalt-50 text-cobalt-700',
  'Preliminary qualification possible': 'border-teal-200 bg-teal-50 text-teal-700',
  'Outreach worthy': 'border-caution-200 bg-caution-100 text-caution-700',
  'Insufficient public evidence': 'border-risk-200 bg-risk-100 text-risk-700',
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
          ? 'border-cobalt-200 bg-cobalt-50 text-cobalt-700'
          : 'border-slate-200 bg-ivory-200 text-slate-600'
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
    <span className={`num font-semibold text-slate-900 ${cls}`}>{score.toFixed(1)}</span>
  );
}

export function RatingBar({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={`${rating} of ${max}`}>
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`h-3 w-1.5 rounded-sm ${i < rating ? 'bg-cobalt-500' : 'bg-slate-200'}`}
          />
        ))}
      </span>
      <span className="num text-2xs text-slate-600">
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
          ? 'border-caution-200 bg-caution-100 text-caution-700'
          : 'border-slate-200 bg-ivory-200 text-slate-600'
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
      <p className="num mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {sub ? <p className="mt-1.5 text-2xs leading-snug text-slate-600">{sub}</p> : null}
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
              <span className="truncate text-xs text-slate-700">{item.label}</span>
              <span className="num shrink-0 text-2xs text-slate-600">{item.count}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-cobalt-500"
                style={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
          <span className="num w-10 text-right text-2xs text-slate-600">
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
    <dl className="divide-y divide-slate-100">
      {fields.map((f) => (
        <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-5">
          <dt className="label pt-0.5">{f.label}</dt>
          <dd className="text-[0.8125rem] leading-relaxed text-slate-800">{f.value}</dd>
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
      className="cursor-help border-b border-dotted border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-500"
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
