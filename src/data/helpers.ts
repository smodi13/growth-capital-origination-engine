import {
  NOT_DISCLOSED,
  type Claim,
  type FactorRating,
  type Provenance,
  type SourceRef,
} from '@/lib/types';

/** Build a supported claim. */
export function claim(
  statement: string,
  provenance: Provenance,
  sourceIds: string[],
  quantified = false,
  asOf?: string,
): Claim {
  return { statement, provenance, sourceIds, quantified, asOf };
}

/**
 * A field that public sources do not cover.
 *
 * Note the provenance: an absent fact is `not-sufficiently-supported`, which
 * the scoring engine refuses to treat as positive evidence. That is the whole
 * point. A gap lowers confidence; it never becomes a number.
 */
export function undisclosed(): Claim {
  return {
    statement: NOT_DISCLOSED,
    provenance: 'not-sufficiently-supported',
    sourceIds: [],
    quantified: false,
  };
}

/** Build a 0 to 5 factor rating. */
export function rate(
  rating: FactorRating['rating'],
  evidence: string,
  sourceIds: string[],
  provenance: Provenance,
  confidence: FactorRating['confidence'],
  explanation: string,
): FactorRating {
  return { rating, evidence, sourceIds, provenance, confidence, explanation };
}

/** Build a source reference. */
export function src(
  id: string,
  publisher: string,
  title: string,
  url: string,
  published: string,
  role: SourceRef['role'],
  isPressReleaseReproduction = false,
): SourceRef {
  return { id, publisher, title, url, published, role, isPressReleaseReproduction };
}

/** The date on which this research universe was last reviewed end to end. */
export const REVIEW_DATE = '2026-08-05';

/**
 * Signal freshness boundaries, measured from the review date.
 * Fresh is within 90 days, Recent is within 12 months, Established is older.
 */
export const FRESH_CUTOFF = '2026-05-07';
export const RECENT_CUTOFF = '2025-08-05';

export function classifyFreshness(signalDate: string): 'Fresh' | 'Recent' | 'Established' {
  if (signalDate >= FRESH_CUTOFF) return 'Fresh';
  if (signalDate >= RECENT_CUTOFF) return 'Recent';
  return 'Established';
}
