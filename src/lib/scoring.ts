/**
 * Origination Priority Score.
 *
 * The score is a transparent weighted average of nine coarse 0 to 5 factor
 * ratings, expressed on a 0 to 100 scale, plus a small and hard capped
 * data confidence modifier.
 *
 * Three design constraints are enforced in code rather than left to
 * discipline, because they are the constraints most easily violated by a
 * scoring model that is written to make a conclusion look inevitable:
 *
 *   1. The score is a pure function of a company's factor ratings. Nothing
 *      keys off a company name, slug, or index. Swapping two companies'
 *      factor blocks swaps their scores exactly.
 *   2. Evidence that is not sufficiently supported earns zero positive
 *      credit. Weak disclosure lowers confidence; it never manufactures a
 *      negative fact, and it never quietly counts as support.
 *   3. The confidence modifier is capped at plus or minus three points. A
 *      well documented weak company cannot outrank a clearly stronger one on
 *      disclosure alone.
 */

import {
  canSupportPositiveScore,
  isDisclosed,
  type CapitalFitKind,
  type Claim,
  type CompanyRecord,
  type DataConfidence,
  type FactorKey,
  type FactorRating,
} from './types';

export interface FactorDefinition {
  key: FactorKey;
  label: string;
  /** Weight as a percentage. All weights sum to 100. */
  weight: number;
  description: string;
  /** What a 5 looks like, so the reader can audit the rating. */
  anchor5: string;
  /** What a 1 looks like. */
  anchor1: string;
}

export const FACTOR_DEFINITIONS: readonly FactorDefinition[] = [
  {
    key: 'mandateFit',
    label: 'Enterprise software mandate fit',
    weight: 15,
    description:
      'How squarely the company sits inside a B2B enterprise software mandate: recurring software revenue, business buyers, and a product sold as software rather than as a service engagement.',
    anchor5:
      'Pure play B2B enterprise software sold on subscription or consumption terms to business and IT buyers.',
    anchor1:
      'Adjacent to enterprise software but revenue is materially services led, consumer facing, or hardware dependent.',
  },
  {
    key: 'commercialMaturity',
    label: 'Commercial maturity',
    weight: 15,
    description:
      'Evidence that the company has moved past early product market fit into repeatable enterprise selling: named enterprise customers, disclosed customer counts, analyst recognition, and multi year operating history.',
    anchor5:
      'Named large enterprise logos, a disclosed customer count in the thousands or a disclosed revenue scale above roughly two hundred million, and independent analyst recognition.',
    anchor1:
      'Limited public evidence of enterprise adoption beyond the company’s own marketing pages.',
  },
  {
    key: 'growthQuality',
    label: 'Growth quality',
    weight: 15,
    description:
      'Not growth alone but the quality of the disclosed growth: rate, durability across periods, and whether the rate is corroborated rather than asserted once.',
    anchor5:
      'Repeated, dated disclosures showing sustained high growth across at least two consecutive periods, corroborated independently.',
    anchor1: 'A single undated or uncorroborated growth assertion.',
  },
  {
    key: 'recurringRevenueQuality',
    label: 'Recurring revenue quality',
    weight: 10,
    description:
      'How much is publicly knowable about the recurring nature of revenue: subscription or committed consumption contracts, disclosed ARR, and any disclosed retention.',
    anchor5:
      'Disclosed ARR with a stated recurring contract model and at least one disclosed retention measure.',
    anchor1: 'Recurring model is likely from the product but nothing about it is disclosed.',
  },
  {
    key: 'customerDurability',
    label: 'Customer durability',
    weight: 10,
    description:
      'How embedded the product is likely to be: regulated or mission critical workloads, breadth of named customers, switching cost, and multi product adoption.',
    anchor5:
      'Mission critical or regulated deployments across many named large customers with disclosed multi product adoption.',
    anchor1: 'Easily substituted product with no disclosed customer breadth.',
  },
  {
    key: 'marketAttractiveness',
    label: 'Market attractiveness',
    weight: 10,
    description:
      'Structural attractiveness of the category for a growth capital provider: budget durability, regulatory or architectural tailwinds, and whether spend is discretionary.',
    anchor5:
      'Large non discretionary category with a durable regulatory or architectural driver of spend.',
    anchor1: 'Small or highly discretionary category exposed to budget compression.',
  },
  {
    key: 'capitalEfficiency',
    label: 'Capital efficiency',
    weight: 10,
    description:
      'What the public record supports about capital productivity: revenue achieved per dollar raised, non dilutive financing that implies lender diligence, and disclosed profitability posture.',
    anchor5:
      'Disclosed revenue scale that is large relative to total capital raised, or a disclosed profitability statement.',
    anchor1: 'Large disclosed funding with no disclosed revenue against which to read it.',
  },
  {
    key: 'capitalNeedTiming',
    label: 'Capital need and timing',
    weight: 10,
    description:
      'Whether an identifiable capital need is plausibly live now: funded expansion programmes, acquisition activity, or time elapsed since the last disclosed round.',
    anchor5:
      'A publicly stated expansion or acquisition programme with a plausible near term financing requirement.',
    anchor1:
      'Very recently and heavily financed with no publicly visible use for additional capital.',
  },
  {
    key: 'outreachPotential',
    label: 'Executive outreach potential',
    weight: 5,
    description:
      'How reachable and receptive the decision makers plausibly are: founder still in the chief executive seat, public commentary on strategy, and a disclosed finance leader.',
    anchor5:
      'Founder chief executive who speaks publicly about strategy, plus a publicly disclosed finance leader.',
    anchor1: 'No public executive visibility and no disclosed finance leadership.',
  },
] as const;

/** Total of all factor weights. Asserted at module load so it cannot drift. */
export const TOTAL_WEIGHT = FACTOR_DEFINITIONS.reduce((s, f) => s + f.weight, 0);
if (TOTAL_WEIGHT !== 100) {
  throw new Error(`Origination factor weights must sum to 100, got ${TOTAL_WEIGHT}`);
}

/** The hard cap on how much disclosure quality alone can move a score. */
export const CONFIDENCE_MODIFIER_CAP = 3;

const CONFIDENCE_MODIFIER: Record<DataConfidence, number> = {
  High: 3,
  Moderate: 0,
  Limited: -3,
};

export interface FactorContribution {
  key: FactorKey;
  label: string;
  weight: number;
  rating: number;
  /**
   * The rating actually used. Equal to `rating` unless the supporting
   * provenance cannot carry positive weight, in which case it is zero.
   */
  effectiveRating: number;
  /** Points contributed to the 0 to 100 base score. */
  points: number;
  /** Maximum points this factor could have contributed. */
  maxPoints: number;
  evidence: string;
  sourceIds: string[];
  provenance: FactorRating['provenance'];
  confidence: DataConfidence;
  explanation: string;
  /** True when provenance suppressed the rating. */
  suppressed: boolean;
}

export interface ScoreBreakdown {
  /** Weighted factor score before the confidence modifier, 0 to 100. */
  baseScore: number;
  /** Applied confidence modifier, always within the cap. */
  confidenceModifier: number;
  /** Final score, 0 to 100. */
  score: number;
  contributions: FactorContribution[];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Compute a company's origination priority score from its factor ratings.
 *
 * Pure: depends only on `factors` and `dataConfidence`. No company identity is
 * consulted, which is what test 17 checks.
 */
export function computeOriginationScore(
  factors: Record<FactorKey, FactorRating>,
  dataConfidence: DataConfidence,
): ScoreBreakdown {
  const contributions: FactorContribution[] = FACTOR_DEFINITIONS.map((def) => {
    const f = factors[def.key];
    const allowed = canSupportPositiveScore(f.provenance);
    const effectiveRating = allowed ? f.rating : 0;
    const points = (effectiveRating / 5) * def.weight;
    return {
      key: def.key,
      label: def.label,
      weight: def.weight,
      rating: f.rating,
      effectiveRating,
      points: round1(points),
      maxPoints: def.weight,
      evidence: f.evidence,
      sourceIds: f.sourceIds,
      provenance: f.provenance,
      confidence: f.confidence,
      explanation: f.explanation,
      suppressed: !allowed && f.rating > 0,
    };
  });

  const baseScore = round1(contributions.reduce((s, c) => s + c.points, 0));

  const raw = CONFIDENCE_MODIFIER[dataConfidence];
  const confidenceModifier = Math.max(
    -CONFIDENCE_MODIFIER_CAP,
    Math.min(CONFIDENCE_MODIFIER_CAP, raw),
  );

  const score = round1(Math.max(0, Math.min(100, baseScore + confidenceModifier)));

  return { baseScore, confidenceModifier, score, contributions };
}

export function scoreOf(company: CompanyRecord): number {
  return computeOriginationScore(company.factors, company.dataConfidence).score;
}

export function breakdownOf(company: CompanyRecord): ScoreBreakdown {
  return computeOriginationScore(company.factors, company.dataConfidence);
}

/* -------------------------------------------------------------------------- */
/* Capital solution fit guardrails                                            */
/* -------------------------------------------------------------------------- */

/** A claim counts as usable evidence only if it is disclosed and supportable. */
export function isUsableEvidence(claim: Claim): boolean {
  return (
    isDisclosed(claim.statement) &&
    claim.statement.trim().length > 0 &&
    canSupportPositiveScore(claim.provenance)
  );
}

/**
 * The maximum private credit fit rating the public record can justify.
 *
 * Private credit underwriting turns on recurring revenue durability and
 * debt service capacity. Where the public record does not carry that, a high
 * debt fit rating would be an invented conclusion, so it is capped here.
 *
 *   - No usable recurring revenue evidence at all: cap of 2.
 *   - Recurring revenue evidence but no revenue scale or capital efficiency
 *     signal to read debt service against: cap of 3.
 *   - Both present: cap of 5, and a disclosed facility raises confidence
 *     further because a lender has already underwritten the credit.
 */
export const DEBT_FIT_CAP_NO_RECURRING = 2;
export const DEBT_FIT_CAP_NO_CASHFLOW = 3;

export function maxSupportableDebtFit(company: CompanyRecord): number {
  const recurring = isUsableEvidence(company.recurringRevenueEvidence);
  if (!recurring) return DEBT_FIT_CAP_NO_RECURRING;

  const scale = isUsableEvidence(company.arrEvidence);
  const efficiency = isUsableEvidence(company.capitalEfficiencyEvidence);
  const facility = isUsableEvidence(company.debtEvidence);

  if (!scale && !efficiency && !facility) return DEBT_FIT_CAP_NO_CASHFLOW;
  return 5;
}

/** True when a company's stated debt fit exceeds what its disclosure supports. */
export function debtFitExceedsEvidence(company: CompanyRecord): boolean {
  return company.capitalFit.debt.rating > maxSupportableDebtFit(company);
}

export const CAPITAL_FIT_LABEL: Record<CapitalFitKind, string> = {
  equity: 'Growth equity fit',
  debt: 'Private credit fit',
  blended: 'Blended capital fit',
};

export function fitDescriptor(rating: number): string {
  if (rating >= 5) return 'Strong on public evidence';
  if (rating === 4) return 'Favourable on public evidence';
  if (rating === 3) return 'Plausible, needs confirmation';
  if (rating === 2) return 'Limited public support';
  if (rating === 1) return 'Weak on public evidence';
  return 'Not supported publicly';
}

/* -------------------------------------------------------------------------- */
/* Ranking                                                                     */
/* -------------------------------------------------------------------------- */

export function rankByOriginationScore(companies: CompanyRecord[]): CompanyRecord[] {
  return [...companies].sort((a, b) => {
    const d = scoreOf(b) - scoreOf(a);
    if (Math.abs(d) > 0.0001) return d;
    return a.name.localeCompare(b.name);
  });
}
