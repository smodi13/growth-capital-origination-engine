'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CompanyRecord } from '@/lib/types';
import { scoreOf } from '@/lib/scoring';
import { readinessOf } from '@/lib/readiness';
import { formatDate } from '@/lib/derived';
import { Collapse, ScoreBar, focusRing, hoverLift } from './motion';
import {
  ClassificationBadge,
  ConfidenceBadge,
  FreshnessBadge,
  Pill,
  ReadinessBadge,
} from './primitives';

/**
 * Priority opportunity card.
 *
 * The face of the card carries only what is needed to decide whether to look
 * closer. Secondary research detail sits behind a disclosure control so the
 * grid stays scannable, which was the main failing of the previous design.
 */
export function CompanyCard({
  company,
  rank,
}: {
  company: CompanyRecord;
  rank?: number;
}) {
  const [open, setOpen] = useState(false);
  const score = scoreOf(company);
  const readiness = readinessOf(company);

  return (
    <article className={`panel flex min-w-0 flex-col p-4 ${hoverLift}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            {rank ? (
              <span className="num text-2xs text-slate-600">{String(rank).padStart(2, '0')}</span>
            ) : null}
            <Link
              href={`/companies/${company.slug}/`}
              className={`truncate font-display text-base font-semibold text-ivory-50 hover:text-cobalt-200 ${focusRing} rounded`}
            >
              {company.name}
            </Link>
          </div>
          <p className="mt-1 truncate text-2xs text-slate-500">
            {company.sector} <span className="text-slate-600">/</span> {company.financingStage}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="num text-2xl font-semibold leading-none text-ivory-50">
            {score.toFixed(1)}
          </span>
          <p className="label mt-1">Score</p>
        </div>
      </div>

      <div className="mt-3">
        <ScoreBar value={score} tone="cobalt" />
      </div>

      {/* Signals */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        <ClassificationBadge value={company.classification} compact />
        <FreshnessBadge value={company.signalFreshness} />
        <ConfidenceBadge value={company.dataConfidence} />
      </div>

      {/* Primary reasoning */}
      <div className="mt-4">
        <p className="label">Why it entered the pipeline</p>
        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-300">
          {company.whyEnteredPipeline}
        </p>
      </div>

      {/* Progressive disclosure */}
      <Collapse open={open}>
        <div className="mt-4 space-y-3.5 border-t border-white/[0.07] pt-4">
          <div>
            <p className="label">Discovery signal</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              {company.discoveryChannel} <span className="text-slate-600">/</span>{' '}
              <span className="num">{company.signalDate}</span>
            </p>
          </div>
          <div>
            <p className="label">Preliminary capital solution view</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
              {company.preliminaryCapitalView}
            </p>
          </div>
          <div>
            <p className="label">Underwriting readiness</p>
            <div className="mt-1.5">
              <ReadinessBadge value={readiness} />
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Pill>Equity {company.capitalFit.equity.rating}/5</Pill>
            <Pill>Debt {company.capitalFit.debt.rating}/5</Pill>
            <Pill>Blended {company.capitalFit.blended.rating}/5</Pill>
          </div>
        </div>
      </Collapse>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3 text-2xs text-slate-600">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`rounded font-semibold text-slate-400 transition-colors hover:text-slate-100 ${focusRing}`}
        >
          {open ? 'Less detail' : 'More detail'}
        </button>
        <span>Reviewed {formatDate(company.lastReviewed)}</span>
      </div>
    </article>
  );
}
