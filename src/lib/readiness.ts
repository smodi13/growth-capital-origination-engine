/**
 * Underwriting readiness.
 *
 * The central point of this module is that readiness is derived from a
 * company's evidence, never from its identity. Nothing here reads a name, a
 * slug, or a list position, and an automated test asserts that swapping two
 * companies' evidence swaps their readiness.
 *
 * The distinction that matters is between a claim that *mentions* a metric and
 * a claim that *carries* one. A record can say "no net revenue retention figure
 * is published" as a company-reported claim, which is useful context and is not
 * a disclosed number. Only claims flagged `quantified`, backed by provenance
 * that can support a positive conclusion, count as publicly quantified metrics.
 */

import type { Claim, CompanyRecord } from './types';
import { canSupportPositiveScore, NOT_DISCLOSED } from './types';

export const READINESS_LEVELS = [
  'Insufficient public evidence',
  'Outreach worthy',
  'Preliminary qualification possible',
  'Underwriting data required',
  'Potentially underwritable',
] as const;

export type ReadinessLevel = (typeof READINESS_LEVELS)[number];

export const READINESS_DESCRIPTION: Record<ReadinessLevel, string> = {
  'Insufficient public evidence':
    'The public record does not yet establish enough about commercial traction to justify a specific approach. More research is required before outreach, not more analysis.',
  'Outreach worthy':
    'There is enough evidence of a real business and a live signal to justify contacting an executive, and not enough to qualify the company on any financial dimension.',
  'Preliminary qualification possible':
    'Recurring revenue and commercial maturity are both evidenced, so a first qualification conversation can be structured around specific questions rather than general ones.',
  'Underwriting data required':
    'Revenue scale is publicly disclosed, so the size of the opportunity is knowable. The credit metrics that determine whether any debt is possible are not, and must come from management.',
  'Potentially underwritable':
    'Revenue scale plus either a retention measure or a lender who has already underwritten the credit. This is the closest the public record gets, and it still requires a full data room before any structure could be committed.',
};

/**
 * Months after which a quantified metric is treated as historical.
 *
 * Eighteen months is roughly two reporting cycles. Past that, a figure
 * describes what was true rather than what is true, and the interface says so
 * rather than presenting it as current.
 */
export const STALE_AFTER_MONTHS = 18;

/** Whether a quantified claim describes a period now materially in the past. */
export function isHistorical(claim: Claim, reviewDate: string): boolean {
  if (!claim.asOf) return false;
  const asOf = new Date(claim.asOf);
  const review = new Date(reviewDate);
  const months =
    (review.getFullYear() - asOf.getFullYear()) * 12 + (review.getMonth() - asOf.getMonth());
  return months >= STALE_AFTER_MONTHS;
}

/** A claim that actually carries a number a reader could act on. */
export function isPubliclyQuantified(claim: Claim): boolean {
  return (
    claim.quantified &&
    claim.statement !== NOT_DISCLOSED &&
    canSupportPositiveScore(claim.provenance)
  );
}

/** A claim that describes something real, whether or not it carries a number. */
export function isSupported(claim: Claim): boolean {
  return claim.statement !== NOT_DISCLOSED && canSupportPositiveScore(claim.provenance);
}

export interface EvidenceGates {
  commercialMaturity: boolean;
  namedCustomers: boolean;
  recurringModel: boolean;
  quantifiedGrowth: boolean;
  quantifiedArr: boolean;
  quantifiedRetention: boolean;
  quantifiedMargin: boolean;
  capitalEfficiency: boolean;
  disclosedFacility: boolean;
  internationalFootprint: boolean;
  acquisitionActivity: boolean;
}

export function evidenceGates(c: CompanyRecord): EvidenceGates {
  return {
    commercialMaturity: isSupported(c.commercialMaturitySignal),
    namedCustomers: isSupported(c.customerEvidence),
    recurringModel: isSupported(c.recurringRevenueEvidence),
    quantifiedGrowth: isPubliclyQuantified(c.growthSignal),
    quantifiedArr: isPubliclyQuantified(c.arrEvidence),
    quantifiedRetention:
      isPubliclyQuantified(c.netRevenueRetentionEvidence) ||
      isPubliclyQuantified(c.grossRetentionEvidence),
    quantifiedMargin: isPubliclyQuantified(c.grossMarginEvidence),
    capitalEfficiency: isPubliclyQuantified(c.capitalEfficiencyEvidence),
    disclosedFacility: isPubliclyQuantified(c.debtEvidence),
    internationalFootprint: isPubliclyQuantified(c.internationalExpansion),
    acquisitionActivity: isPubliclyQuantified(c.acquisitionActivity),
  };
}

/** Derive the readiness level purely from the evidence gates. */
export function readinessOf(c: CompanyRecord): ReadinessLevel {
  const g = evidenceGates(c);

  if (g.recurringModel && g.quantifiedArr && (g.quantifiedRetention || g.disclosedFacility)) {
    return 'Potentially underwritable';
  }
  if (g.recurringModel && g.quantifiedArr) {
    return 'Underwriting data required';
  }
  if (g.recurringModel && g.commercialMaturity && (g.namedCustomers || g.quantifiedGrowth)) {
    return 'Preliminary qualification possible';
  }
  if (g.commercialMaturity || g.namedCustomers) {
    return 'Outreach worthy';
  }
  return 'Insufficient public evidence';
}

/* -------------------------------------------------------------------------- */
/* Panels                                                                     */
/* -------------------------------------------------------------------------- */

export interface ReadinessItem {
  label: string;
  /** Present in the public record. */
  available: boolean;
  detail: string;
}

/** What the public record already supports, item by item. */
export function publiclySupported(c: CompanyRecord): ReadinessItem[] {
  return [
    {
      label: 'Financing history',
      available: c.latestFinancing !== NOT_DISCLOSED,
      detail:
        c.latestFinancing !== NOT_DISCLOSED
          ? c.latestFinancing
          : 'No financing terms are disclosed publicly.',
    },
    {
      label: 'Customer evidence',
      available: isSupported(c.customerEvidence),
      detail: c.customerEvidence.statement,
    },
    {
      label: 'Growth signals',
      available: isSupported(c.growthSignal),
      detail: c.growthSignal.statement,
    },
    {
      label: 'Existing credit facility',
      available: isSupported(c.debtEvidence),
      detail: c.debtEvidence.statement,
    },
    {
      label: 'Product maturity',
      available: isSupported(c.commercialMaturitySignal),
      detail: c.commercialMaturitySignal.statement,
    },
    {
      label: 'Expansion activity',
      available: isSupported(c.internationalExpansion) || isSupported(c.acquisitionActivity),
      detail: [
        isSupported(c.internationalExpansion) ? c.internationalExpansion.statement : null,
        isSupported(c.acquisitionActivity) ? c.acquisitionActivity.statement : null,
      ]
        .filter(Boolean)
        .join(' ') || 'No international or acquisition activity is disclosed publicly.',
    },
  ];
}

/**
 * The metrics a growth capital or private credit investor needs and that only
 * management can supply. An item is marked satisfied only where the public
 * record actually carries the number.
 */
export function managementRequired(c: CompanyRecord): ReadinessItem[] {
  const g = evidenceGates(c);
  const na = 'Must be requested from management. Not established by public sources.';
  return [
    { label: 'Annual recurring revenue', available: g.quantifiedArr, detail: g.quantifiedArr ? c.arrEvidence.statement : na },
    { label: 'ARR growth rate', available: g.quantifiedGrowth, detail: g.quantifiedGrowth ? c.growthSignal.statement : na },
    { label: 'Gross retention', available: isPubliclyQuantified(c.grossRetentionEvidence), detail: isPubliclyQuantified(c.grossRetentionEvidence) ? c.grossRetentionEvidence.statement : na },
    { label: 'Net revenue retention', available: isPubliclyQuantified(c.netRevenueRetentionEvidence), detail: isPubliclyQuantified(c.netRevenueRetentionEvidence) ? c.netRevenueRetentionEvidence.statement : na },
    { label: 'Gross margin', available: g.quantifiedMargin, detail: g.quantifiedMargin ? c.grossMarginEvidence.statement : na },
    { label: 'EBITDA', available: false, detail: na },
    { label: 'Cash burn', available: false, detail: na },
    { label: 'Cash balance', available: false, detail: na },
    { label: 'Runway', available: false, detail: na },
    { label: 'Customer concentration', available: false, detail: na },
    { label: 'Debt balances', available: g.disclosedFacility, detail: g.disclosedFacility ? c.debtEvidence.statement : na },
    { label: 'Covenants', available: false, detail: na },
    { label: 'Monthly recurring revenue history', available: false, detail: na },
  ];
}

/** Standard data room request. Identical for every company by design. */
export const DATA_ROOM_MATERIALS: readonly string[] = [
  'Monthly profit and loss statement',
  'Balance sheet',
  'Cash flow statement',
  'ARR bridge showing new, expansion, and churned ARR',
  'Customer cohort data',
  'Revenue concentration by customer',
  'Contract terms and average contract length',
  'Sales pipeline data',
  'Board materials',
  'Debt agreements and covenant schedules',
  'Capitalization table',
  'Budget and forecast',
] as const;

export interface ImprovementCondition {
  target: 'Private credit fit' | 'Growth equity fit' | 'Blended capital fit' | 'Data confidence' | 'Origination priority';
  current: string;
  condition: string;
}

/**
 * What specific evidence would move each rating. Derived from which gates are
 * currently unmet, so the conditions are always the ones that actually bind.
 */
export function improvementConditions(c: CompanyRecord): ImprovementCondition[] {
  const g = evidenceGates(c);
  const out: ImprovementCondition[] = [];

  const debtNeeds: string[] = [];
  if (!g.recurringModel) debtNeeds.push('evidence that revenue is contractually recurring');
  if (!g.quantifiedArr) debtNeeds.push('a disclosed or confirmed ARR figure');
  if (!g.quantifiedRetention) debtNeeds.push('gross and net retention by cohort');
  if (!g.quantifiedMargin) debtNeeds.push('gross margin split between subscription and services');
  if (!g.disclosedFacility) debtNeeds.push('confirmation of existing debt, its terms, and covenant headroom');
  out.push({
    target: 'Private credit fit',
    current: `${c.capitalFit.debt.rating} of 5`,
    condition: debtNeeds.length
      ? `Would rise on ${debtNeeds.join(', ')}, plus burn and debt service capacity.`
      : 'Every public precondition is met. A rating change now depends on confirming the figures in diligence rather than on finding more public evidence.',
  });

  const equityNeeds: string[] = [];
  if (!g.quantifiedGrowth) equityNeeds.push('a dated growth rate covering more than one period');
  if (!g.namedCustomers) equityNeeds.push('named enterprise customers with contract scale');
  if (!g.capitalEfficiency) equityNeeds.push('revenue measured against capital raised');
  out.push({
    target: 'Growth equity fit',
    current: `${c.capitalFit.equity.rating} of 5`,
    condition: equityNeeds.length
      ? `Would rise on ${equityNeeds.join(', ')}.`
      : 'Supported by the public record. Further movement depends on valuation and process rather than on evidence.',
  });

  out.push({
    target: 'Blended capital fit',
    current: `${c.capitalFit.blended.rating} of 5`,
    condition:
      'Cannot exceed what the private credit component can bear, so it moves with the debt conditions above, plus evidence that the company is dilution sensitive and would accept covenant discipline.',
  });

  const missing = c.missingInformation.length;
  out.push({
    target: 'Data confidence',
    current: c.dataConfidence,
    condition: `Currently ${missing} enumerated gaps. Confidence rises as dated primary disclosures replace them, and it is capped so that disclosure alone cannot move the score by more than three points.`,
  });

  out.push({
    target: 'Origination priority',
    current: c.outreachPriority,
    condition:
      c.signalFreshness === 'Established'
        ? 'Would rise on a new dated signal, a financing event, an executive appointment, or a disclosed facility. Freshness affects sequencing rather than the score itself.'
        : 'Supported by a current signal. Priority would fall if the company completed a large financing that removed any near term capital requirement.',
  });

  return out;
}

/** Count of management-required metrics still outstanding. */
export function outstandingMetricCount(c: CompanyRecord): number {
  return managementRequired(c).filter((i) => !i.available).length;
}

/** Share of the qualification picture the public record covers, 0 to 1. */
export function qualificationCompleteness(c: CompanyRecord): number {
  const items = managementRequired(c);
  return items.filter((i) => i.available).length / items.length;
}
