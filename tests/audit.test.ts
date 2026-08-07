/**
 * Investment-quality audit tests, checks 20 to 29.
 *
 * These lock in the results of the final audit pass. Each one exists because
 * the audit found something a reader could have been misled by, and each would
 * fail if that specific failure were reintroduced.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

import { companies, emergingTargets } from '@/data/companies';
import { REVIEW_DATE } from '@/data/helpers';
import { isHistorical, STALE_AFTER_MONTHS } from '@/lib/readiness';
import { scoreOf } from '@/lib/scoring';
import {
  capitalSizing,
  creditFraming,
  existingHolderValue,
  hypotheticalProfile,
  mixConclusion,
  mixSensitivity,
} from '@/data/hypothetical';
import { CLASSIFICATION_NOTE } from '@/lib/site';
import type { Claim } from '@/lib/types';

const ROOT = resolve(__dirname, '..');
const read = (p: string) => readFileSync(resolve(ROOT, p), 'utf8');

function walk(dir: string, filter: (p: string) => boolean, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  });
  return acc;
}

function claimsOf(c: (typeof companies)[number]): { field: string; claim: Claim }[] {
  return (
    [
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
    ] as const
  ).map(([field, claim]) => ({ field, claim }));
}

/* -------------------------------------------------------------------------- */
/* 20. Measurement dates                                                      */
/* -------------------------------------------------------------------------- */

describe('measurement dating', () => {
  it('every quantified claim carries an as-of date', () => {
    companies.forEach((c) => {
      claimsOf(c).forEach(({ field, claim }) => {
        if (!claim.quantified) return;
        expect(claim.asOf, `${c.slug}.${field} is quantified and must carry asOf`).toMatch(
          /^\d{4}-\d{2}-\d{2}$/,
        );
      });
    });
  });

  it('no as-of date is later than the source that carries the figure', () => {
    // asOf is min(period end, publication date), so it can never postdate the
    // most recent source cited. A later date would be claiming freshness that
    // no source supports.
    companies.forEach((c) => {
      claimsOf(c).forEach(({ field, claim }) => {
        if (!claim.asOf) return;
        const published = c.sources
          .filter((s) => claim.sourceIds.includes(s.id))
          .map((s) => s.published)
          .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
          .sort();
        if (published.length === 0) return;
        expect(
          claim.asOf <= published[published.length - 1],
          `${c.slug}.${field} asOf ${claim.asOf} postdates its latest source`,
        ).toBe(true);
      });
    });
  });

  it('no as-of date is in the future relative to the review date', () => {
    companies.forEach((c) => {
      claimsOf(c).forEach(({ field, claim }) => {
        if (!claim.asOf) return;
        expect(claim.asOf <= REVIEW_DATE, `${c.slug}.${field} asOf is after the review date`).toBe(
          true,
        );
      });
    });
  });

  it('staleness is measured, and figures older than the window are flagged', () => {
    const stale = companies.flatMap((c) =>
      claimsOf(c)
        .filter(({ claim }) => claim.quantified && isHistorical(claim, REVIEW_DATE))
        .map(({ field }) => `${c.slug}.${field}`),
    );
    // The point of the flag is that it actually fires. A universe where nothing
    // is ever historical would mean the check is decorative.
    expect(stale.length).toBeGreaterThan(0);
    expect(STALE_AFTER_MONTHS).toBe(18);
  });
});

/* -------------------------------------------------------------------------- */
/* 21. Withdrawn claims stay withdrawn                                        */
/* -------------------------------------------------------------------------- */

describe('withdrawn figures', () => {
  it('the unsourced WorkOS revenue and headcount figures carry no weight', () => {
    // These circulated only on data aggregators, one of which also published a
    // demonstrably wrong valuation, and could not be traced to any primary
    // source. They were removed rather than narrowed, because narrowing an
    // unsupported figure produces an estimate.
    //
    // The figures may still be named in the record, because saying which figure
    // was rejected and why is more useful than silence. What they may not do is
    // appear anywhere the reader would take them as an input: narrative,
    // outreach, factor evidence, or capital structure reasoning.
    const workos = emergingTargets.find((c) => c.slug === 'workos')!;
    const figure = /30 million|95 (?:people|employees)/i;

    const loadBearing = [
      workos.whyEnteredPipeline,
      workos.whyMayNeedGrowthCapital,
      workos.whyEquityMayFit,
      workos.whyDebtMayFit,
      workos.whyBlendedMayFit,
      workos.preliminaryCapitalView,
      workos.outreach.valueProposition,
      ...workos.outreach.emails.map((e) => `${e.subject} ${e.body}`),
      ...Object.values(workos.factors).flatMap((f) => [f.evidence, f.explanation]),
      ...Object.values(workos.capitalFit).flatMap((f) => [...f.drivers, f.conditions]),
    ];
    loadBearing.forEach((text) => expect(text).not.toMatch(figure));

    // Where the figure is named, it must be named as rejected evidence.
    claimsOf(workos).forEach(({ field, claim }) => {
      if (!figure.test(claim.statement)) return;
      expect(claim.provenance, `${field} presents the withdrawn figure as usable`).toBe(
        'not-sufficiently-supported',
      );
    });
  });

  it('WorkOS carries no positive scoring weight from revenue evidence', () => {
    const workos = emergingTargets.find((c) => c.slug === 'workos')!;
    expect(workos.arrEvidence.provenance).toBe('not-sufficiently-supported');
    expect(workos.capitalEfficiencyEvidence.provenance).toBe('not-sufficiently-supported');
    expect(workos.factors.capitalEfficiency.rating).toBe(0);
    expect(workos.dataConfidence).toBe('Limited');
  });

  it('the retained Prophecy retention figure is anchored to its fiscal period', () => {
    // The opposite case. This figure is real, company-reported, and
    // corroborated, so it stays; what it needed was a measurement date, because
    // fiscal 2024 closed well before the announcement that carried it.
    const prophecy = emergingTargets.find((c) => c.slug === 'prophecy')!;
    expect(prophecy.netRevenueRetentionEvidence.provenance).toBe('company-reported');
    expect(prophecy.netRevenueRetentionEvidence.asOf).toBe('2024-12-31');
    expect(isHistorical(prophecy.netRevenueRetentionEvidence, REVIEW_DATE)).toBe(true);
    // and the surrounding narrative must say so rather than reading as current
    expect(prophecy.whyDebtMayFit).toMatch(/fiscal 2024/);
    expect(prophecy.whyEnteredPipeline).toMatch(/fiscal 2024/);
  });

  it('no company file cites a revenue data aggregator as a source', () => {
    const banned = /getlatka|tracxn|arr\.club|growjo|craft\.co|owler/i;
    ['emerging', 'data-infrastructure', 'security-grc', 'automation-fintech', 'vertical-industry']
      .map((f) => `src/data/companies.${f}.ts`)
      .forEach((f) => {
        expect(read(f), `${f} cites an aggregator`).not.toMatch(banned);
      });
  });
});

/* -------------------------------------------------------------------------- */
/* 22. Classification does not confer advantage                               */
/* -------------------------------------------------------------------------- */

describe('classification note', () => {
  const surfaces = {
    'universe page': 'src/app/universe/page.tsx',
    'homepage priority section': 'src/app/page.tsx',
    'methodology page': 'src/app/methodology/page.tsx',
    'classification badge': 'src/components/primitives.tsx',
  };

  it('is stated in one place and reused verbatim on all four surfaces', () => {
    Object.entries(surfaces).forEach(([name, file]) => {
      expect(read(file), `${name} must render CLASSIFICATION_NOTE`).toContain(
        'CLASSIFICATION_NOTE',
      );
    });
  });

  it('says exactly what the classification does not do', () => {
    expect(CLASSIFICATION_NOTE).toContain('does not increase their investment score');
    expect(CLASSIFICATION_NOTE).toContain('publicly observable fundamentals');
    expect(CLASSIFICATION_NOTE).not.toContain('—');
  });

  it('is true: the emerging set does not outscore the benchmark set', () => {
    // The note would be a false claim if emerging records happened to sit at the
    // top. They do not, and this asserts the ordering that makes the note honest.
    const top = companies.slice().sort((a, b) => scoreOf(b) - scoreOf(a))[0];
    expect(top.classification).toBe('Benchmark growth company');
    const bestEmerging = Math.max(...emergingTargets.map(scoreOf));
    const bestBenchmark = Math.max(
      ...companies
        .filter((c) => c.classification === 'Benchmark growth company')
        .map((c) => scoreOf(c)),
    );
    expect(bestEmerging).toBeLessThan(bestBenchmark);
  });
});

/* -------------------------------------------------------------------------- */
/* 23. Every emerging target has a defensible origination angle               */
/* -------------------------------------------------------------------------- */

describe('emerging target origination angles', () => {
  it('each target has a dated signal, a stated need, and specific proceeds', () => {
    emergingTargets.forEach((c) => {
      expect(c.signalDate, c.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.originalSourcingSignal.length, c.slug).toBeGreaterThan(80);
      expect(c.whyMayNeedGrowthCapital.length, c.slug).toBeGreaterThan(80);
      expect(c.potentialUseOfProceeds.length, c.slug).toBeGreaterThanOrEqual(3);
    });
  });

  it('each target carries an explicit private status verification', () => {
    emergingTargets.forEach((c) => {
      expect(c.privateStatusVerification.statement, c.slug).toMatch(
        /privately held and independently operating/,
      );
      expect(c.privateStatusVerification.sourceIds.length, c.slug).toBeGreaterThan(0);
    });
  });

  it('every target scoring below 40 states why it remains in the set', () => {
    // A low score is a statement about disclosure, not about merit. Where the
    // two diverge the record has to say so in its own words rather than leaving
    // a reader to assume the company was kept to pad a count.
    emergingTargets
      .filter((c) => scoreOf(c) < 40)
      .forEach((c) => {
        expect(c.whyEnteredPipeline, `${c.slug} scores ${scoreOf(c)} and must justify itself`).toMatch(
          /scores \d+ of 100/,
        );
      });
  });

  it('a capital structure is never asserted without the evidence to support it', () => {
    emergingTargets.forEach((c) => {
      if (c.capitalFit.debt.rating <= 1) {
        // A near-zero debt rating must be a conclusion with a stated reason,
        // not an empty field.
        expect(c.whyDebtMayFit.length, c.slug).toBeGreaterThan(80);
      }
      // The blended rating is bounded by the debt component it contains.
      expect(
        c.capitalFit.blended.rating,
        `${c.slug} blended fit exceeds what its debt fit can carry`,
      ).toBeLessThanOrEqual(Math.max(c.capitalFit.debt.rating + 1, 2));
    });
  });

  it('outreach priority does not outrun data confidence', () => {
    // High priority on Limited confidence is the combination that reads as
    // enthusiasm rather than analysis, so it has to be argued for explicitly.
    emergingTargets
      .filter((c) => c.outreachPriority === 'High')
      .forEach((c) => {
        expect(c.dataConfidence, `${c.slug} is High priority on ${c.dataConfidence} confidence`).not.toBe(
          'Limited',
        );
      });
  });
});

/* -------------------------------------------------------------------------- */
/* 24. The ground is white                                                     */
/* -------------------------------------------------------------------------- */

describe('white ground', () => {
  const css = read('src/app/globals.css');
  const tw = read('tailwind.config.ts');

  it('declares #ffffff on html, body, and main rather than on a wrapper', () => {
    // Declared on the roots so a short page cannot reveal a different colour
    // underneath the content.
    ['html', 'body', 'main'].forEach((sel) => {
      const block = new RegExp(`\\n  ${sel} \\{[^}]*background-color: #ffffff;`, 'i');
      expect(css, `${sel} must set an explicit white background`).toMatch(block);
    });
    expect(css).toContain('color-scheme: light');
  });

  it('the neutral grounds are the specified values', () => {
    expect(tw).toContain("50: '#ffffff'");
    expect(tw).toContain("100: '#f7f8fa'");
    expect(tw).toContain("200: '#f2f4f7'");
    expect(tw).toContain("300: '#e4e7ec'");
  });

  it('no component paints a dark navy or graphite ground', () => {
    // The dark ramp still exists for table headers, the footer, and a single
    // banner. What must not exist is a page, hero, or section using it.
    const banned = /(bg-navy-9\d0|bg-graphite-\d00)(?![\w-])/;
    walk(resolve(ROOT, 'src'), (p) => p.endsWith('.tsx')).forEach((f) => {
      expect(readFileSync(f, 'utf8'), `${relative(ROOT, f)} paints a dark ground`).not.toMatch(
        banned,
      );
    });
  });

  it('an end to end check verifies the rendered result in a browser', () => {
    // Source inspection cannot prove a page renders white, so the real check
    // runs Chromium over the export. This asserts that check exists and still
    // covers every route and both the computed style and the rendered pixels.
    const e2e = read('tests/e2e/white-background.mjs');
    ['/universe/', '/pipeline/', '/underwriting/', '/structures/', '/companies/vanta/'].forEach(
      (r) => expect(e2e, `e2e must cover ${r}`).toContain(`'${r}'`),
    );
    expect(e2e).toContain('getComputedStyle');
    expect(e2e).toContain('document.documentElement');
    expect(e2e).toContain('isDarkSurface');
    expect(e2e).toContain('isBlueSurface');
    expect(e2e).toContain('lightShare');
    expect(read('package.json')).toContain('"test:e2e"');
  });
});

/* -------------------------------------------------------------------------- */
/* 25. The supplied work products are served unchanged                         */
/* -------------------------------------------------------------------------- */

describe('supplied work products', () => {
  it('are referenced by their real names, with URLs percent encoded', () => {
    const site = read('src/lib/site.ts');
    expect(site).toContain('Enterprise Software Growth Capital Model.xlsx');
    expect(site).toContain('Enterprise Software Origination and Underwriting Case.pdf');
    expect(site).toContain('/downloads/Enterprise%20Software%20Growth%20Capital%20Model.xlsx');
    expect(site).toContain(
      '/downloads/Enterprise%20Software%20Origination%20and%20Underwriting%20Case.pdf',
    );
  });

  it('the old underscored filenames appear nowhere', () => {
    const files = [
      ...walk(resolve(ROOT, 'src'), (p) => /\.(ts|tsx|css)$/.test(p)),
      resolve(ROOT, 'README.md'),
    ];
    files.forEach((f) => {
      expect(readFileSync(f, 'utf8'), `${relative(ROOT, f)} uses an old filename`).not.toMatch(
        /Enterprise_Software_/,
      );
    });
  });
});

/* -------------------------------------------------------------------------- */
/* 26. Underwriting outputs match the supplied workbook                        */
/* -------------------------------------------------------------------------- */

describe('underwriting outputs', () => {
  it('the capital sizing bridge carries the workbook figures', () => {
    expect(capitalSizing.baseRequired).toBe(16.9);
    expect(capitalSizing.raised).toBe(20.0);
    expect(capitalSizing.baseHeadroom).toBe(3.1);
    expect(capitalSizing.downsideRequired).toBe(24.6);
    expect(capitalSizing.downsideShortfall).toBe(4.6);
    // The bridge has to actually add up to the figure it claims.
    const summed = capitalSizing.lines.reduce((a, l) => a + l.value, 0);
    expect(Math.abs(summed - capitalSizing.baseRequired)).toBeLessThan(0.05);
  });

  it('existing holder proceeds are stated per structure', () => {
    const blend = existingHolderValue.rows.find((r) => r.structure === 'Selected blend')!;
    expect(blend.incrementalVersusAllEquity).toBe(9.7);
    expect(blend.proceeds).toBe(243.5);
    expect(existingHolderValue.rows.find((r) => r.structure === 'Growth equity')!.proceeds).toBe(
      233.8,
    );
    expect(existingHolderValue.rows.find((r) => r.structure === 'Private credit')!.proceeds).toBe(
      250.7,
    );

    // The holder-value figure is stated once, as a result. Scoped to the
    // hypothetical case and the pages that present it, because real companies in
    // the research universe legitimately raised USD 25 million and those are
    // unrelated figures.
    const surfaces = [
      'src/data/hypothetical.ts',
      'src/app/underwriting/page.tsx',
      'src/app/structures/page.tsx',
      'src/app/page.tsx',
    ];
    surfaces.forEach((f) => {
      expect(read(f), `${f} carries a stale holder-value figure`).not.toMatch(
        /USD 25(\.0)? million|USD 25m/,
      );
    });

    // Nor does any surface narrate the history of the calculation. The work
    // sample presents the analysis, not its revisions.
    [...surfaces, 'README.md'].forEach((f) => {
      expect(read(f), `${f} narrates a superseded draft`).not.toMatch(
        /earlier draft|incorrectly applied|superseded|overstated the benefit/i,
      );
    });
  });

  it('the mix sensitivity matches the workbook and exposes the downside tension', () => {
    expect(mixSensitivity).toHaveLength(6);
    mixSensitivity.forEach((r) => expect(r.equity + r.debt).toBe(20));

    const expected = [
      [0, 20, 2.9, -4.8, 'FAIL'],
      [4, 16, 5.5, -2.2, 'FAIL'],
      [8, 12, 8.1, 0.4, 'BREACH'],
      [12, 8, 10.8, 3.1, 'BREACH'],
      [16, 4, 13.4, 5.7, 'HEADROOM'],
      [20, 0, 16.0, 8.4, 'HEADROOM'],
    ] as const;
    expected.forEach(([eq, debt, base, down, status], i) => {
      expect(mixSensitivity[i].equity).toBe(eq);
      expect(mixSensitivity[i].debt).toBe(debt);
      expect(mixSensitivity[i].baseYear5Cash).toBe(base);
      expect(mixSensitivity[i].downsideYear5Cash).toBe(down);
      expect(mixSensitivity[i].status).toBe(status);
    });

    // The selected structure is the one that breaches, and that is stated.
    const selected = mixSensitivity.find((r) => r.selected)!;
    expect(selected.equity).toBe(8);
    expect(selected.status).toBe('BREACH');
    expect(mixConclusion.tension).toMatch(/does not preserve/);
    expect(mixConclusion.threshold).toMatch(/USD 15 million/);
    expect(mixConclusion.threshold).toMatch(/USD 16 million of equity alongside USD 4 million/);

    // The first tested structure with downside headroom.
    const firstSafe = mixSensitivity.find((r) => r.status === 'HEADROOM')!;
    expect(firstSafe.equity).toBe(16);
    expect(firstSafe.debt).toBe(4);
  });

  it('the credit case is framed as recurring revenue rather than cash flow lending', () => {
    expect(creditFraming.headline).toBe(
      'Recurring-revenue facility, not a conventional cash-flow loan',
    );
    expect(creditFraming.rationale).toMatch(/EBITDA is negative through year four/);
    expect(creditFraming.rationale).toMatch(/below 1\.0x/);
    expect(creditFraming.standingRisks.join(' ')).toMatch(/[Rr]efinancing risk/);
  });

  it('operating drivers are never presented as separate uses of proceeds', () => {
    const uses = hypotheticalProfile.capitalUses.join(' ').toLowerCase();
    ['product development', 'sales hiring', 'international expansion', 'working capital'].forEach(
      (d) => expect(uses, `"${d}" must not be a separate use of proceeds`).not.toContain(d),
    );
    expect(uses).not.toContain('acquisition');
    // and they are still named, as what they are
    expect(hypotheticalProfile.operatingDrivers.length).toBeGreaterThan(3);
    expect(capitalSizing.notModelled.join(' ')).toMatch(/[Aa]cquisition/);
  });
});
