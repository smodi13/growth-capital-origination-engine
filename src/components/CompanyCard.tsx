import Link from 'next/link';
import type { CompanyRecord } from '@/lib/types';
import { scoreOf } from '@/lib/scoring';
import { formatDate } from '@/lib/derived';
import { ConfidenceBadge, FreshnessBadge, Pill, ScoreMark } from './primitives';

export function CompanyCard({ company, rank }: { company: CompanyRecord; rank?: number }) {
  return (
    <Link
      href={`/companies/${company.slug}/`}
      className="panel group flex flex-col gap-3 p-4 transition-colors hover:border-ink-700 hover:bg-ink-850"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {rank ? <span className="num text-ink-600">{String(rank).padStart(2, '0')}</span> : null}
            <h3 className="truncate text-sm font-semibold text-ink-50 group-hover:text-white">
              {company.name}
            </h3>
          </div>
          <p className="mt-1 truncate text-2xs text-ink-500">
            {company.sector} <span className="text-ink-700">/</span> {company.financingStage}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <ScoreMark score={scoreOf(company)} />
          <p className="label mt-0.5">Score</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <FreshnessBadge value={company.signalFreshness} />
        <ConfidenceBadge value={company.dataConfidence} />
        <Pill>{company.discoveryChannel}</Pill>
      </div>

      <div>
        <p className="label">Why it entered the pipeline</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-300">{company.whyEnteredPipeline}</p>
      </div>

      <div>
        <p className="label">Preliminary capital solution view</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-400">{company.preliminaryCapitalView}</p>
      </div>

      <p className="mt-auto border-t border-ink-800 pt-2.5 text-2xs text-ink-600">
        Last reviewed {formatDate(company.lastReviewed)}
      </p>
    </Link>
  );
}
