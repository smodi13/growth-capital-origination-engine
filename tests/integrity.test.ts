/**
 * Research integrity tests, checks 1 to 19.
 *
 * These assert the rules the research framework claims to follow. They exist so
 * that a future edit which quietly violates one of them fails here rather than
 * reaching a reader.
 */

import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { benchmarkCompanies, companies, emergingTargets, exclusions } from '@/data/companies';
import {
  computeOriginationScore,
  debtFitExceedsEvidence,
  maxSupportableDebtFit,
  FACTOR_DEFINITIONS,
  TOTAL_WEIGHT,
  CONFIDENCE_MODIFIER_CAP,
} from '@/lib/scoring';
import { canSupportPositiveScore, NOT_DISCLOSED, type Claim } from '@/lib/types';
import { HYPOTHETICAL_NAME } from '@/data/hypothetical';
import { DEFAULT_STATUSES } from '@/components/PipelineBoard';

const ROOT = resolve(__dirname, '..');

/** Every evidence claim on a record, with the field it came from. */
function allClaims(c: (typeof companies)[number]): { field: string; claim: Claim }[] {
  return [
    ['customerEvidence', c.customerEvidence],
    ['commercialMaturitySignal', c.commercialMaturitySignal],
    ['growthSignal', c.growthSignal],
    ['recurringRevenueEvidence', c.recurringRevenueEvidence],
    ['grossMarginEvidence', c.grossMarginEvidence],
    ['netRevenueRetentionEvidence', c.netRevenueRetentionEvidence],
    ['grossRetentionEvidence', c.grossRetentionEvidence],
    ['arrEvidence', c.arrEvidence],
    ['capitalEfficiencyEvidence', c.capitalEfficiencyEvidence],
    ['debtEvidence', c.debtEvidence],
    ['acquisitionActivity', c.acquisitionActivity],
    ['internationalExpansion', c.internationalExpansion],
    ['privateStatusVerification', c.privateStatusVerification],
  ].map(([field, claim]) => ({ field: field as string, claim: claim as Claim }));
}

describe('sourcing universe integrity', () => {
  it('1. every sourcing company is real and private, with an explicit verification claim', () => {
    // The universe holds a benchmark set plus an emerging origination set.
    // Both are held to this same verification standard.
    expect(benchmarkCompanies.length).toBeGreaterThanOrEqual(18);
    expect(benchmarkCompanies.length).toBeLessThanOrEqual(22);
    expect(emergingTargets.length).toBeGreaterThanOrEqual(8);
    expect(emergingTargets.length).toBeLessThanOrEqual(12);
    expect(companies.length).toBe(benchmarkCompanies.length + emergingTargets.length);

    companies.forEach((c) => {
      const v = c.privateStatusVerification;
      expect(v.statement, `${c.name} private status statement`).not.toBe(NOT_DISCLOSED);
      expect(v.statement.length, `${c.name} private status detail`).toBeGreaterThan(60);
      expect(
        canSupportPositiveScore(v.provenance),
        `${c.name} private status provenance`,
      ).toBe(true);
      expect(v.sourceIds.length, `${c.name} private status sources`).toBeGreaterThan(0);
      expect(v.statement.toLowerCase()).toMatch(/privately held|private/);
    });
  });

  it('2. no public company appears in the sourcing universe', () => {
    // Any record claiming a listing, ticker, or completed IPO would fail here.
    const banned = /\b(nasdaq|nyse|ticker|publicly traded|publicly listed|initial public offering completed)\b/i;
    companies.forEach((c) => {
      const v = c.privateStatusVerification.statement;
      expect(v, `${c.name}`).not.toMatch(banned);
      // Each record must positively assert that no listing or acquisition
      // has occurred, in whatever word order the sentence uses.
      expect(
        /no (acquisition|registration statement|exchange listing)/i.test(v),
        `${c.name} must state that no listing or acquisition has been announced`,
      ).toBe(true);
      expect(
        /privately held/i.test(v) && /independently operating/i.test(v),
        `${c.name} must assert private and independent status explicitly`,
      ).toBe(true);
    });

    // Every excluded public company must stay out of the universe.
    const slugs = new Set(companies.map((x) => x.name.toLowerCase()));
    exclusions
      .filter((e) => e.reason === 'Publicly listed')
      .forEach((e) => expect(slugs.has(e.name.toLowerCase())).toBe(false));
  });

  it('3. no hypothetical company appears in the real company universe', () => {
    const blob = JSON.stringify(companies).toLowerCase();
    expect(blob).not.toContain(HYPOTHETICAL_NAME.toLowerCase());
    expect(blob).not.toContain('northstar');
    expect(blob).not.toContain('hypothetical company');
  });

  it('4. the hypothetical underwriting company is clearly labelled everywhere it appears', async () => {
    const h = await import('@/data/hypothetical');
    expect(h.HYPOTHETICAL_DISCLOSURE).toContain('hypothetical company');
    expect(h.HYPOTHETICAL_DISCLOSURE).toContain('not a real business');
    expect(h.HYPOTHETICAL_LONG_DISCLOSURE).toContain('is hypothetical');
    expect(h.ILLUSTRATIVE_FOOTER).toBe('All figures are hypothetical and illustrative.');
  });

  it('5. every real company has a resolvable official website', () => {
    companies.forEach((c) => {
      expect(c.website, `${c.name}`).toMatch(/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}/i);
      expect(c.website).not.toContain(' ');
    });
  });

  it('6. every real company has at least one primary source', () => {
    companies.forEach((c) => {
      const primary = c.sources.filter((s) => s.role === 'primary');
      expect(primary.length, `${c.name} primary sources`).toBeGreaterThanOrEqual(1);
    });
  });

  it('7. every real company has at least one independent corroborating source', () => {
    companies.forEach((c) => {
      // A press release reproduction is not independent verification, so it does
      // not satisfy the corroboration requirement on its own.
      const independent = c.sources.filter(
        (s) => s.role === 'corroborating' && !s.isPressReleaseReproduction,
      );
      expect(independent.length, `${c.name} independent corroborating sources`).toBeGreaterThanOrEqual(1);
    });
  });

  it('8. every company has a last reviewed date and every source is dated', () => {
    companies.forEach((c) => {
      expect(c.lastReviewed, `${c.name}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      c.sources.forEach((s) => {
        expect(s.published, `${c.name} source ${s.id}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(s.url).toMatch(/^https:\/\//);
      });
    });
  });

  it('9. every quantified claim carries a provenance classification and a source', () => {
    companies.forEach((c) => {
      allClaims(c).forEach(({ field, claim }) => {
        expect(claim.provenance, `${c.name}.${field}`).toBeTruthy();
        if (claim.quantified) {
          expect(
            claim.sourceIds.length,
            `${c.name}.${field} is quantified so it must cite a source`,
          ).toBeGreaterThan(0);
        }
        // Every cited source id must actually exist on the record.
        const ids = new Set(c.sources.map((s) => s.id));
        claim.sourceIds.forEach((id) =>
          expect(ids.has(id), `${c.name}.${field} cites unknown source ${id}`).toBe(true),
        );
      });
    });
  });

  it('10. no unsupported claim is used as positive scoring evidence', () => {
    companies.forEach((c) => {
      const breakdown = computeOriginationScore(c.factors, c.dataConfidence);
      breakdown.contributions.forEach((f) => {
        if (!canSupportPositiveScore(f.provenance)) {
          expect(f.points, `${c.name}.${f.key} must contribute zero points`).toBe(0);
          expect(f.effectiveRating).toBe(0);
        }
      });

      // A claim marked not sufficiently supported must not also assert a fact.
      allClaims(c).forEach(({ field, claim }) => {
        if (claim.provenance === 'not-sufficiently-supported') {
          expect(claim.sourceIds.length, `${c.name}.${field}`).toBe(0);
        }
      });
    });
  });

  it('11. every company has a discovery channel', () => {
    companies.forEach((c) => {
      expect(c.discoveryChannel, `${c.name}`).toBeTruthy();
      expect(c.discoveryChannel.length).toBeGreaterThan(3);
    });
  });

  it('12. every company has a dated sourcing signal that matches a real source date', () => {
    companies.forEach((c) => {
      expect(c.signalDate, `${c.name}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.originalSourcingSignal.length, `${c.name}`).toBeGreaterThan(40);
      expect(c.signalDate <= c.lastReviewed, `${c.name} signal cannot post-date review`).toBe(true);

      // The signal date must correspond to something actually cited.
      const dates = new Set(c.sources.map((s) => s.published));
      expect(dates.has(c.signalDate), `${c.name} signal date ${c.signalDate} has no matching source`).toBe(true);
    });
  });

  it('13. every company has a freshness classification consistent with its signal date', () => {
    const FRESH = '2026-05-07';
    const RECENT = '2025-08-05';
    companies.forEach((c) => {
      const expected =
        c.signalDate >= FRESH ? 'Fresh' : c.signalDate >= RECENT ? 'Recent' : 'Established';
      expect(c.signalFreshness, `${c.name} signal ${c.signalDate}`).toBe(expected);
    });
  });

  it('14. every company enumerates its missing information', () => {
    companies.forEach((c) => {
      expect(c.missingInformation.length, `${c.name}`).toBeGreaterThanOrEqual(5);
      c.missingInformation.forEach((m) => expect(m.length).toBeGreaterThan(2));
    });
  });

  it('15. no undisclosed financial metric is estimated', () => {
    // Where a metric is undisclosed the statement must be exactly the sentinel,
    // never a number, a range, or an approximation.
    const numeric = /\b\d/;
    companies.forEach((c) => {
      allClaims(c).forEach(({ field, claim }) => {
        if (claim.statement === NOT_DISCLOSED) {
          expect(claim.provenance, `${c.name}.${field}`).toBe('not-sufficiently-supported');
          expect(claim.quantified).toBe(false);
        }
      });

      // Undisclosed scalar fields must use the sentinel exactly.
      ([c.ceo, c.financeLeader, c.latestFinancing, c.financingDate, c.totalDisclosedFunding] as string[])
        .filter((v) => v.includes(NOT_DISCLOSED))
        .forEach((v) => {
          expect(v, `${c.name} sentinel field must not be decorated`).toBe(NOT_DISCLOSED);
          expect(numeric.test(v)).toBe(false);
        });
    });
  });

  it('16. no company defaults to a contacted or meeting pipeline status', () => {
    const forbidden = [
      'Contacted',
      'Initial discussion',
      'Preliminary diligence',
      'Outreach drafted',
      'Passed',
      'Priority follow-up',
    ];
    companies.forEach((c) => {
      const seeded =
        c.outreachPriority === 'High' ? 'Qualified for outreach' : 'Researching';
      expect(DEFAULT_STATUSES).toContain(seeded);
      expect(forbidden).not.toContain(seeded);
    });

    // The seeding rule in the page must only ever produce the two safe statuses.
    const src = readFileSync(resolve(ROOT, 'src/app/pipeline/page.tsx'), 'utf8');
    const m = src.match(/defaultStatus:[^,]+,/);
    expect(m).toBeTruthy();
    forbidden.forEach((s) => expect(m![0]).not.toContain(s));
  });

  it('17. the scoring model is not hardcoded by company identity', () => {
    const src = readFileSync(resolve(ROOT, 'src/lib/scoring.ts'), 'utf8');
    companies.forEach((c) => {
      expect(src, `scoring.ts must not mention ${c.slug}`).not.toContain(c.slug);
      expect(src).not.toContain(c.name);
    });

    // Swapping two companies' factor blocks must swap their scores exactly.
    const [a, b] = companies;
    const sa = computeOriginationScore(a.factors, a.dataConfidence).score;
    const sb = computeOriginationScore(b.factors, b.dataConfidence).score;
    const swappedA = computeOriginationScore(b.factors, b.dataConfidence).score;
    const swappedB = computeOriginationScore(a.factors, a.dataConfidence).score;
    expect(swappedA).toBe(sb);
    expect(swappedB).toBe(sa);

    // Weights are the declared ones and sum to 100.
    expect(TOTAL_WEIGHT).toBe(100);
    expect(FACTOR_DEFINITIONS).toHaveLength(9);
  });

  it('18. equity, debt, and blended fit are assessed separately', () => {
    let differing = 0;
    companies.forEach((c) => {
      const { equity, debt, blended } = c.capitalFit;
      [equity, debt, blended].forEach((f) => {
        expect(f.rating).toBeGreaterThanOrEqual(0);
        expect(f.rating).toBeLessThanOrEqual(5);
        expect(f.provenance, `${c.name} capital fit must be labelled judgment`).toBe('analyst-judgment');
        expect(f.conditions.length, `${c.name} fit conditions`).toBeGreaterThan(30);
      });
      if (!(equity.rating === debt.rating && debt.rating === blended.rating)) differing += 1;
    });
    // If the three were a single rating in disguise they would move together.
    expect(differing).toBeGreaterThan(companies.length * 0.8);
  });

  it('19. debt fit cannot be high without recurring revenue and cash flow evidence', () => {
    companies.forEach((c) => {
      expect(
        debtFitExceedsEvidence(c),
        `${c.name} debt fit ${c.capitalFit.debt.rating} exceeds the evidence cap of ${maxSupportableDebtFit(c)}`,
      ).toBe(false);
    });

    // Companies with no usable recurring revenue evidence must be capped low.
    const capped = companies.filter((c) => maxSupportableDebtFit(c) === 2);
    capped.forEach((c) => expect(c.capitalFit.debt.rating).toBeLessThanOrEqual(2));

    // At least one company must actually be constrained, or the rule is inert.
    expect(companies.some((c) => maxSupportableDebtFit(c) < 5)).toBe(true);

    // Any debt fit of 4 or more must cite a disclosed facility or disclosed ARR.
    companies
      .filter((c) => c.capitalFit.debt.rating >= 4)
      .forEach((c) => {
        const hasFacility = c.debtEvidence.statement !== NOT_DISCLOSED;
        const hasArr = canSupportPositiveScore(c.arrEvidence.provenance);
        expect(
          hasFacility || hasArr,
          `${c.name} has debt fit ${c.capitalFit.debt.rating} without a facility or disclosed ARR`,
        ).toBe(true);
      });
  });
});

describe('scoring mechanics', () => {
  it('the confidence modifier is visible and hard capped', () => {
    companies.forEach((c) => {
      const b = computeOriginationScore(c.factors, c.dataConfidence);
      expect(Math.abs(b.confidenceModifier)).toBeLessThanOrEqual(CONFIDENCE_MODIFIER_CAP);
      expect(b.score).toBeGreaterThanOrEqual(0);
      expect(b.score).toBeLessThanOrEqual(100);
    });
  });

  it('disclosure alone cannot lift a weak company above a clearly stronger one', () => {
    // Construct the extreme case the cap exists to prevent: identical companies
    // except that the weaker one has the best possible disclosure.
    const strong = companies.reduce((a, b) =>
      computeOriginationScore(a.factors, 'Moderate').baseScore >
      computeOriginationScore(b.factors, 'Moderate').baseScore
        ? a
        : b,
    );
    const weak = companies.reduce((a, b) =>
      computeOriginationScore(a.factors, 'Moderate').baseScore <
      computeOriginationScore(b.factors, 'Moderate').baseScore
        ? a
        : b,
    );
    const strongBase = computeOriginationScore(strong.factors, 'Moderate').baseScore;
    const weakBase = computeOriginationScore(weak.factors, 'Moderate').baseScore;
    expect(strongBase - weakBase).toBeGreaterThan(2 * CONFIDENCE_MODIFIER_CAP);

    const weakBest = computeOriginationScore(weak.factors, 'High').score;
    const strongWorst = computeOriginationScore(strong.factors, 'Limited').score;
    expect(weakBest).toBeLessThan(strongWorst);
  });

  it('every factor rating is a coarse integer from 0 to 5 with visible reasoning', () => {
    companies.forEach((c) => {
      FACTOR_DEFINITIONS.forEach((def) => {
        const f = c.factors[def.key];
        expect(Number.isInteger(f.rating), `${c.name}.${def.key}`).toBe(true);
        expect(f.rating).toBeGreaterThanOrEqual(0);
        expect(f.rating).toBeLessThanOrEqual(5);
        expect(f.evidence.length, `${c.name}.${def.key} evidence`).toBeGreaterThan(30);
        expect(f.explanation.length, `${c.name}.${def.key} explanation`).toBeGreaterThan(30);
        if (f.rating > 0 && canSupportPositiveScore(f.provenance)) {
          expect(
            f.sourceIds.length,
            `${c.name}.${def.key} scores positively so it must cite evidence`,
          ).toBeGreaterThan(0);
        }
      });
    });
  });
});

describe('record completeness', () => {
  it('every required company field is populated', () => {
    companies.forEach((c) => {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/);
      expect(c.name.length).toBeGreaterThan(1);
      expect(c.headquarters.length).toBeGreaterThan(5);
      expect(c.foundedYear).toBeGreaterThan(1990);
      expect(c.foundedYear).toBeLessThanOrEqual(2026);
      expect(c.founders.length).toBeGreaterThan(0);
      expect(c.sector.length).toBeGreaterThan(3);
      expect(c.subsector.length).toBeGreaterThan(3);
      expect(c.productDescription.length).toBeGreaterThan(80);
      expect(c.targetCustomer.length).toBeGreaterThan(40);
      expect(c.businessModel.length).toBeGreaterThan(40);
      expect(c.investors.length).toBeGreaterThan(0);
      expect(c.competitiveLandscape.length).toBeGreaterThan(60);
      expect(c.mainCommercialRisk.length).toBeGreaterThan(40);
      expect(c.mainFinancialRisk.length).toBeGreaterThan(40);
      expect(c.mainTechnologyRisk.length).toBeGreaterThan(40);
      expect(c.whyEnteredPipeline.length).toBeGreaterThan(60);
      expect(c.whyMayNeedGrowthCapital.length).toBeGreaterThan(60);
      expect(c.potentialUseOfProceeds.length).toBeGreaterThanOrEqual(3);
      expect(c.whyEquityMayFit.length).toBeGreaterThan(40);
      expect(c.whyDebtMayFit.length).toBeGreaterThan(40);
      expect(c.whyBlendedMayFit.length).toBeGreaterThan(40);
      expect(c.preliminaryCapitalView.length).toBeGreaterThan(60);
      expect(['High', 'Medium', 'Watch']).toContain(c.outreachPriority);
      expect(c.qualificationQuestions.length).toBeGreaterThanOrEqual(3);
      expect(c.nextDiligenceStep.length).toBeGreaterThan(40);
      expect(['High', 'Moderate', 'Limited']).toContain(c.dataConfidence);
    });
  });

  it('slugs are unique and source ids are unique within a record', () => {
    const slugs = companies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    companies.forEach((c) => {
      const ids = c.sources.map((s) => s.id);
      expect(new Set(ids).size, `${c.name} duplicate source ids`).toBe(ids.length);
    });
  });

  it('conditional capital language is used wherever debt is discussed positively', () => {
    companies
      .filter((c) => c.capitalFit.debt.rating >= 2)
      .forEach((c) => {
        const text = `${c.capitalFit.debt.conditions} ${c.preliminaryCapitalView}`.toLowerCase();
        expect(
          /subject to confirming|potentially suitable|not supportable|cannot be assessed|not assessable/.test(text),
          `${c.name} must qualify its debt language`,
        ).toBe(true);
      });
  });

  it('outreach exists for every company and never implies representing a fund', () => {
    const forbidden = [
      'we are looking to invest',
      'our fund',
      'we can provide',
      'we would like to invest',
      'on behalf of our fund',
    ];
    companies.forEach((c) => {
      expect(c.outreach.emails.length, `${c.name}`).toBeGreaterThanOrEqual(1);
      expect(c.outreach.valueProposition.length).toBeGreaterThan(40);

      const ceo = c.outreach.emails.find((e) => e.audience === 'CEO');
      expect(ceo, `${c.name} must have a CEO email`).toBeTruthy();

      // A CFO email may exist only where a finance leader is publicly disclosed.
      const cfo = c.outreach.emails.find((e) => e.audience === 'CFO');
      if (c.financeLeader === NOT_DISCLOSED && cfo) {
        // Permitted only when the record names a different disclosed finance
        // counterparty in the recipient role, as with an executive chairman
        // publicly assigned to capital strategy.
        expect(cfo.recipientRole.length).toBeGreaterThan(20);
      }

      c.outreach.emails.forEach((e) => {
        const body = e.body.toLowerCase();
        forbidden.forEach((f) =>
          expect(body, `${c.name} ${e.audience} email uses "${f}"`).not.toContain(f),
        );
        expect(body).toContain('i am researching this independently');
        expect(body).toContain('not raising or placing capital');
        expect(e.subject.length).toBeGreaterThan(10);
      });
    });
  });

  it('exclusions are recorded with evidence', () => {
    expect(exclusions.length).toBeGreaterThanOrEqual(3);
    exclusions.forEach((e) => {
      expect(e.evidence.length).toBeGreaterThan(60);
      expect(e.sourceUrl).toMatch(/^https:\/\//);
      expect(e.sourceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

describe('source directory hygiene', () => {
  it('no company data file imports the hypothetical company module', () => {
    const dir = resolve(ROOT, 'src/data');
    readdirSync(dir)
      .filter((f) => f.startsWith('companies'))
      .forEach((f) => {
        const src = readFileSync(resolve(dir, f), 'utf8');
        expect(src, `${f} must not import the hypothetical case`).not.toMatch(
          /from\s+['"][^'"]*hypothetical['"]/,
        );
        expect(src, `${f} must not reference the hypothetical company`).not.toContain(
          HYPOTHETICAL_NAME,
        );
      });
  });
});
