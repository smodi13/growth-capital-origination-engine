'use client';

import { useState } from 'react';
import type { CompanyRecord } from '@/lib/types';
import {
  DATA_ROOM_MATERIALS,
  improvementConditions,
  managementRequired,
  outstandingMetricCount,
  publiclySupported,
  qualificationCompleteness,
  READINESS_DESCRIPTION,
  readinessOf,
  type ReadinessItem,
} from '@/lib/readiness';
import { Collapse, ScoreBar, focusRing } from './motion';
import { ReadinessBadge } from './primitives';

/**
 * Underwriting readiness.
 *
 * Three panels answer three separate questions: what the public record already
 * supports, what only management can supply, and what a full data room would
 * need. A fourth explains exactly what evidence would move each rating.
 *
 * Nothing here is written per company. Every status is derived from the record
 * evidence, so the panel cannot flatter a company the research does not support.
 */

function ItemRow({ item }: { item: ReadinessItem }) {
  return (
    <li className="flex gap-2.5 border-b border-slate-100 py-2.5 last:border-0">
      <span
        aria-hidden="true"
        className={`mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border text-[8px] font-bold ${
          item.available
            ? 'border-positive-200 bg-positive-700/30 text-positive-700'
            : 'border-slate-100 bg-ivory-100 text-slate-600'
        }`}
      >
        {item.available ? '✓' : '·'}
      </span>
      <div className="min-w-0">
        <p
          className={`text-xs font-medium ${item.available ? 'text-slate-800' : 'text-slate-600'}`}
        >
          {item.label}
          <span className="sr-only">
            {item.available ? ': available in public sources' : ': not available in public sources'}
          </span>
        </p>
        <p className="mt-0.5 text-2xs leading-relaxed text-slate-600">{item.detail}</p>
      </div>
    </li>
  );
}

export function ReadinessPanel({ company }: { company: CompanyRecord }) {
  const [showAll, setShowAll] = useState(false);
  const level = readinessOf(company);
  const supported = publiclySupported(company);
  const required = managementRequired(company);
  const conditions = improvementConditions(company);
  const outstanding = outstandingMetricCount(company);
  const completeness = qualificationCompleteness(company);

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className="panel-raised p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="label">Underwriting readiness</p>
            <div className="mt-2">
              <ReadinessBadge value={level} />
            </div>
            <p className="mt-3 max-w-prose text-xs leading-relaxed text-slate-600">
              {READINESS_DESCRIPTION[level]}
            </p>
          </div>

          <div className="w-full max-w-[16rem]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="label">Qualification completeness</span>
              <span className="num text-xs text-slate-700">
                {Math.round(completeness * 100)}%
              </span>
            </div>
            <div className="mt-2">
              <ScoreBar
                value={completeness * 100}
                tone={completeness > 0.3 ? 'positive' : 'neutral'}
              />
            </div>
            <p className="mt-2 text-2xs leading-relaxed text-slate-600">
              {required.length - outstanding} of {required.length} management metrics are publicly
              disclosed. {outstanding} must come from the company.
            </p>
          </div>
        </div>

        <p className="mt-4 rounded-lg border border-slate-100 bg-ivory-100 px-3.5 py-2.5 text-2xs leading-relaxed text-slate-600">
          Public research does not complete credit underwriting. This status describes how far the
          public record can take a conversation, and no further.
        </p>
      </div>

      {/* Two column evidence */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <h3 className="text-sm font-semibold text-slate-900">Publicly supported information</h3>
          <p className="mt-1.5 text-2xs text-slate-600">
            What dated public sources already establish.
          </p>
          <ul className="mt-3">
            {supported.map((i) => (
              <ItemRow key={i.label} item={i} />
            ))}
          </ul>
        </div>

        <div className="panel p-5">
          <h3 className="text-sm font-semibold text-slate-900">Information required from management</h3>
          <p className="mt-1.5 text-2xs text-slate-600">
            The metrics that determine whether any structure is possible.
          </p>
          <ul className="mt-3">
            {required.slice(0, showAll ? required.length : 6).map((i) => (
              <ItemRow key={i.label} item={i} />
            ))}
          </ul>
          <Collapse open={showAll}>
            <span />
          </Collapse>
          {required.length > 6 ? (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className={`mt-3 rounded text-2xs font-semibold text-slate-600 hover:text-slate-800 ${focusRing}`}
            >
              {showAll ? 'Show fewer' : `Show all ${required.length} metrics`}
            </button>
          ) : null}
        </div>
      </div>

      {/* Data room */}
      <div className="panel p-5">
        <h3 className="text-sm font-semibold text-slate-900">Required data room materials</h3>
        <p className="mt-1.5 text-2xs text-slate-600">
          The standard request, identical for every company by design. None of this is public for
          any private company, which is the point.
        </p>
        <ul className="mt-3.5 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {DATA_ROOM_MATERIALS.map((m) => (
            <li key={m} className="flex gap-2 text-2xs text-slate-600">
              <span
                aria-hidden="true"
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600"
              />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement conditions */}
      <div className="panel p-5">
        <h3 className="text-sm font-semibold text-slate-900">What would change these ratings</h3>
        <p className="mt-1.5 text-2xs text-slate-600">
          Derived from which evidence gates are currently unmet, so the conditions shown are the
          ones that actually bind.
        </p>
        <dl className="mt-3.5 divide-y divide-slate-100">
          {conditions.map((c) => (
            <div
              key={c.target}
              className="grid gap-1.5 py-3 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-5"
            >
              <dt>
                <p className="text-xs font-medium text-slate-800">{c.target}</p>
                <p className="num mt-0.5 text-2xs text-slate-600">Currently {c.current}</p>
              </dt>
              <dd className="text-xs leading-relaxed text-slate-600">{c.condition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
