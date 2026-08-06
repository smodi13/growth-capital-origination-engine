/**
 * Domain types for the Growth Capital Origination Engine.
 *
 * Two rules govern every type in this file:
 *
 * 1. Any field that may be unavailable in public sources is typed to permit
 *    the literal string NOT_DISCLOSED. Nothing is estimated, interpolated, or
 *    inferred to fill a gap.
 * 2. Any quantified claim carries a Provenance classification, so a reader can
 *    always tell an independently verified fact from a company-reported figure
 *    from an analyst judgment.
 */

/** The single sentinel used everywhere public information is unavailable. */
export const NOT_DISCLOSED = 'Not publicly disclosed' as const;
export type NotDisclosed = typeof NOT_DISCLOSED;

/** A value that may legitimately be absent from the public record. */
export type Disclosable<T = string> = T | NotDisclosed;

export function isDisclosed<T>(v: Disclosable<T>): v is T {
  return v !== NOT_DISCLOSED;
}

/**
 * How well supported a material claim is. Ordered from strongest to weakest.
 * `not-sufficiently-supported` may never be used as positive scoring evidence;
 * the scoring engine enforces this.
 */
export type Provenance =
  | 'independently-verified'
  | 'company-reported'
  | 'investor-reported'
  | 'government-reported'
  | 'analyst-judgment'
  | 'not-sufficiently-supported';

export const PROVENANCE_LABEL: Record<Provenance, string> = {
  'independently-verified': 'Independently verified',
  'company-reported': 'Company reported',
  'investor-reported': 'Investor reported',
  'government-reported': 'Government reported',
  'analyst-judgment': 'Analyst judgment',
  'not-sufficiently-supported': 'Not sufficiently supported',
};

/** Provenance values that may support a positive score. */
export const POSITIVE_EVIDENCE_PROVENANCE: readonly Provenance[] = [
  'independently-verified',
  'company-reported',
  'investor-reported',
  'government-reported',
];

export function canSupportPositiveScore(p: Provenance): boolean {
  return POSITIVE_EVIDENCE_PROVENANCE.includes(p);
}

/** A dated, linkable source record. */
export interface SourceRef {
  id: string;
  /** Publisher or organisation behind the source. */
  publisher: string;
  title: string;
  url: string;
  /** ISO date the source was published, or NOT_DISCLOSED if undated. */
  published: Disclosable;
  /** Primary sources are first-party; corroborating sources are independent. */
  role: 'primary' | 'corroborating';
  /**
   * A press-release reproduction does not count as independent verification.
   * Marking it here keeps the distinction visible and testable.
   */
  isPressReleaseReproduction?: boolean;
}

/** A single claim about a company, with its evidence and provenance. */
export interface Claim {
  /** The claim in plain language. */
  statement: string;
  provenance: Provenance;
  /** Source ids backing this claim. Empty only for analyst judgment. */
  sourceIds: string[];
  /** True when the claim contains a number that a reader may act on. */
  quantified: boolean;
}

export type DiscoveryChannel =
  | 'Financing announcement'
  | 'Product launch'
  | 'Customer signal'
  | 'Executive hire'
  | 'Credit facility'
  | 'Acquisition activity'
  | 'Market expansion'
  | 'Strategic partnership'
  | 'Regulatory development'
  | 'Hiring signal'
  | 'Industry research'
  | 'Founder research'
  | 'Enterprise buyer signal'
  | 'Software ecosystem activity';

export type SignalFreshness = 'Fresh' | 'Recent' | 'Established';

export type DataConfidence = 'High' | 'Moderate' | 'Limited';

/**
 * Whether a company is in the universe as a market and underwriting reference
 * point, or as a differentiated origination target.
 *
 * This is a sourcing classification, not a quality judgment. It is assigned by
 * which research file a record lives in, and it deliberately has no effect on
 * the origination score. An emerging target is not boosted, and a benchmark is
 * not penalised.
 */
export type CompanyClassification = 'Benchmark growth company' | 'Emerging origination target';

export type Sector =
  | 'Enterprise infrastructure software'
  | 'Data infrastructure'
  | 'Cybersecurity'
  | 'Developer tools'
  | 'Workflow automation'
  | 'Financial technology infrastructure'
  | 'Governance, risk, and compliance'
  | 'Vertical SaaS'
  | 'Healthcare enterprise software'
  | 'Supply chain and logistics software'
  | 'Customer support software'
  | 'AI-enabled enterprise applications';

export type FinancingStage =
  | 'Series B'
  | 'Series C'
  | 'Series D'
  | 'Series E'
  | 'Series F'
  | 'Series G'
  | 'Growth financing'
  | 'Late stage private';

/** The nine origination scoring factors. Weights live in scoring.ts. */
export type FactorKey =
  | 'mandateFit'
  | 'commercialMaturity'
  | 'growthQuality'
  | 'recurringRevenueQuality'
  | 'customerDurability'
  | 'marketAttractiveness'
  | 'capitalEfficiency'
  | 'capitalNeedTiming'
  | 'outreachPotential';

/** A 0 to 5 coarse rating with its visible reasoning. */
export interface FactorRating {
  /** Integer 0 to 5. Nothing else is permitted. */
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  /** The specific evidence relied upon. */
  evidence: string;
  sourceIds: string[];
  provenance: Provenance;
  /** How confident the analyst is in this individual rating. */
  confidence: DataConfidence;
  /** Why this rating rather than one above or below it. */
  explanation: string;
}

export type CapitalFitKind = 'equity' | 'debt' | 'blended';

export interface CapitalFit {
  /** Integer 0 to 5. */
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  /** The factors that drove this rating. */
  drivers: string[];
  /** What would have to be confirmed before the rating could be relied upon. */
  conditions: string;
  /** Always analyst judgment. Fit is an opinion, not a fact. */
  provenance: Extract<Provenance, 'analyst-judgment'>;
}

export interface OutreachEmail {
  audience: 'CEO' | 'CFO';
  recipientRole: string;
  subject: string;
  body: string;
}

export interface CompanyRecord {
  slug: string;
  name: string;
  website: string;
  headquarters: string;
  foundedYear: number;
  founders: string[];
  ceo: Disclosable;
  financeLeader: Disclosable;
  sector: Sector;
  subsector: string;
  productDescription: string;
  targetCustomer: string;
  businessModel: string;

  financingStage: FinancingStage;
  latestFinancing: Disclosable;
  financingDate: Disclosable;
  totalDisclosedFunding: Disclosable;
  investors: string[];

  /** Evidence blocks. Each one is a claim with provenance. */
  customerEvidence: Claim;
  commercialMaturitySignal: Claim;
  growthSignal: Claim;
  recurringRevenueEvidence: Claim;
  grossMarginEvidence: Claim;
  netRevenueRetentionEvidence: Claim;
  grossRetentionEvidence: Claim;
  arrEvidence: Claim;
  capitalEfficiencyEvidence: Claim;
  debtEvidence: Claim;
  acquisitionActivity: Claim;
  internationalExpansion: Claim;

  competitiveLandscape: string;
  mainCommercialRisk: string;
  mainFinancialRisk: string;
  mainTechnologyRisk: string;

  originalSourcingSignal: string;
  discoveryChannel: DiscoveryChannel;
  signalDate: string;
  signalFreshness: SignalFreshness;
  whyEnteredPipeline: string;
  whyMayNeedGrowthCapital: string;
  potentialUseOfProceeds: string[];

  whyEquityMayFit: string;
  whyDebtMayFit: string;
  whyBlendedMayFit: string;
  preliminaryCapitalView: string;

  outreachPriority: 'High' | 'Medium' | 'Watch';
  qualificationQuestions: string[];
  nextDiligenceStep: string;
  missingInformation: string[];

  factors: Record<FactorKey, FactorRating>;
  capitalFit: Record<CapitalFitKind, CapitalFit>;

  outreach: {
    emails: OutreachEmail[];
    valueProposition: string;
  };

  sources: SourceRef[];
  lastReviewed: string;
  dataConfidence: DataConfidence;

  /** Explicit verification that the company is independently operating. */
  privateStatusVerification: Claim;

  /**
   * Sourcing classification. Assigned during aggregation from the research file
   * a record lives in, so an individual record never sets it directly and it
   * cannot be used to tilt a score.
   */
  classification: CompanyClassification;
}

/**
 * A company record as authored in a research file, before the aggregation step
 * stamps its sourcing classification.
 */
export type CompanyInput = Omit<CompanyRecord, 'classification'>;
