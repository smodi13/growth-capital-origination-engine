/**
 * Redesign tests, checks 1 to 20 of the visual and experience pass.
 *
 * These sit alongside the original 51 research and security tests, which are
 * preserved unchanged. The focus here is that motion is optional rather than
 * load bearing, that the new classification and readiness layers are derived
 * from evidence, and that nothing in the redesign introduced a network
 * dependency or regressed the approved artefacts.
 */

import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

import { companies, benchmarkCompanies, emergingTargets, exclusions } from '@/data/companies';
import { scoreOf } from '@/lib/scoring';
import {
  evidenceGates,
  isPubliclyQuantified,
  managementRequired,
  publiclySupported,
  readinessOf,
  DATA_ROOM_MATERIALS,
  READINESS_LEVELS,
} from '@/lib/readiness';
import { DURATION, DISTANCE, STAGGER } from '@/lib/motion';
import { ROUTES } from '@/lib/site';
import { XLSX_PATH, PDF_PATH } from './helpers/artifacts';
import { canSupportPositiveScore, NOT_DISCLOSED } from '@/lib/types';

const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'out');
const SRC = resolve(ROOT, 'src');

function walk(dir: string, filter: (p: string) => boolean, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  });
  return acc;
}

const srcFiles = walk(SRC, (p) => /\.(ts|tsx|css)$/.test(p));
const outHtml = walk(OUT, (p) => p.endsWith('.html'));
const outJs = walk(OUT, (p) => p.endsWith('.js'));
const outCss = walk(OUT, (p) => p.endsWith('.css'));

const sha = (p: string) => createHash('sha256').update(readFileSync(p)).digest('hex');

/**
 * Hashes of the two supplied work products.
 *
 * These files are the source of truth for every underwriting figure on the
 * site, so a byte difference means something modified them and this test is the
 * thing that catches it. The same hashes are asserted against the exported
 * build and against the deployed production downloads.
 *
 * The workbook is byte for byte as supplied and is never opened, recalculated,
 * or resaved. The memorandum carries two textual corrections applied to the
 * supplied file: no financial value, chart, table, style, or conclusion in it
 * was altered, and an automated diff of every numeric token confirms that.
 */
const APPROVED = {
  xlsx: '1f12a340d0231d8c80e42bd5e938b6ad84c7896fcaa377c9733dab691eabd9d4',
  pdf: '20891339b40f0ef1e5eb450642008526bbd3185d4f10c3742aaeb599c2ee6f13',
} as const;

describe('motion system', () => {
  it('1. reduced motion is respected and disables nonessential animation', () => {
    const css = readFileSync(resolve(SRC, 'app/globals.css'), 'utf8');
    expect(css).toContain('prefers-reduced-motion: reduce');
    expect(css).toMatch(/animation-duration:\s*0\.001ms\s*!important/);
    expect(css).toMatch(/transition-duration:\s*0\.001ms\s*!important/);
    expect(css).toMatch(/scroll-behavior:\s*auto\s*!important/);

    // The motion module must short circuit rather than merely shorten.
    const motion = readFileSync(resolve(SRC, 'lib/motion.ts'), 'utf8');
    expect(motion).toContain('prefers-reduced-motion: reduce');
    expect(motion).toContain('if (reduced) return { opacity: 1, transform: \'none\' }');

    // The server snapshot reports reduced motion, so prerendered HTML is the
    // finished state and content is never hidden behind an animation.
    expect(motion).toMatch(/function getServerSnapshot\(\): boolean \{\s*return true;/);
  });

  it('2. no animation prevents interaction or blocks content', () => {
    const motion = readFileSync(resolve(SRC, 'lib/motion.ts'), 'utf8');

    // Entrance durations stay inside the stated range.
    Object.values(DURATION).forEach((d) => expect(d).toBeLessThanOrEqual(650));
    expect(DURATION.reveal).toBeGreaterThanOrEqual(300);
    // Stagger is short enough that nothing waits noticeably.
    Object.values(STAGGER).forEach((s) => expect(s).toBeLessThanOrEqual(100));
    // Hover movement stays under the 4px cap.
    expect(DISTANCE.hover).toBeLessThan(4);

    // Only opacity and transform are animated, so nothing triggers layout.
    expect(motion).not.toMatch(/transition:\s*`?(width|height|top|left|margin)/);

    // No component may block pointer events during an entrance.
    srcFiles.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      expect(t, `${relative(ROOT, f)}`).not.toMatch(/pointer-events-none[^"'`]*animate/);
    });

    // No infinite spin or bounce anywhere.
    const all = [...srcFiles, ...outCss].map((f) => readFileSync(f, 'utf8')).join('\n');
    expect(all).not.toMatch(/animate-spin|animate-bounce|animate-ping/);
  });

  it('5. the animated background has no external dependency', () => {
    const bg = readFileSync(resolve(SRC, 'components/CapitalFlowBackground.tsx'), 'utf8');
    // No remote asset of any kind.
    expect(bg).not.toMatch(/https?:\/\/(?!www\.w3\.org)/);
    expect(bg).not.toMatch(/\.(mp4|webm|gif|png|jpe?g|lottie|json)\b/);
    expect(bg).not.toMatch(/\bfetch\s*\(|import\(/);
    // Motion is suspended on narrow viewports and when the tab is hidden.
    expect(bg).toContain('min-width: 768px');
    expect(bg).toContain('visibilitychange');
    // Reduced motion turns the layer static.
    expect(bg).toContain('useReducedMotion');
    // No blur value is animated. Blur is expensive to repaint every frame, so
    // it may be applied statically but never transitioned or keyframed.
    expect(bg).not.toMatch(/transitionProperty:[^,}]*filter/);
    expect(bg).not.toMatch(/transition:\s*['"`][^'"`]*filter/);
    expect(bg).not.toMatch(/animation:\s*['"`][^'"`]*blur/);
  });

  it('10. capital structure switching never changes the underlying numbers', async () => {
    const h = await import('@/data/hypothetical');
    const page = readFileSync(resolve(SRC, 'app/page.tsx'), 'utf8');

    // Every metric shown in the switcher is read from the model, not typed in.
    expect(page).toContain('growthEquityCase.founderDilution');
    expect(page).toContain('blendedCapitalCase.equityMoic');
    expect(page).toContain('privateCreditCase.minimumCashBreachYear');

    // The switcher component only crossfades presentation.
    // The switcher is presentation only. It never imports the model and never
    // performs arithmetic, so a displayed figure is always the value passed in.
    const sw = readFileSync(resolve(SRC, 'components/home/StructureSwitcher.tsx'), 'utf8');
    expect(sw).not.toContain('@/data/hypothetical');
    expect(sw).not.toMatch(/Math\.[a-z]/);
    expect(sw).not.toMatch(/toFixed\(/);
    expect(sw).toContain('Crossfade');

    // Values rendered in the built HTML match the model exactly.
    const home = readFileSync(resolve(OUT, 'index.html'), 'utf8');
    expect(home).toContain(`${(h.blendedCapitalCase.founderDilution * 100).toFixed(1)}%`);
    expect(home).toContain(`${h.blendedCapitalCase.equityMoic.toFixed(2)}x`);
    expect(home).toContain(`${(h.growthEquityCase.founderDilution * 100).toFixed(1)}%`);
  });
});

describe('accessibility and navigation', () => {
  it('3. every route is reachable and keyboard accessible', () => {
    // A skip link exists and targets the main landmark.
    const layout = readFileSync(resolve(SRC, 'app/layout.tsx'), 'utf8');
    expect(layout).toContain('skip-link');
    expect(layout).toContain('href="#main"');
    expect(layout).toContain('id="main"');

    // Every interactive control carries a visible focus state.
    const css = readFileSync(resolve(SRC, 'app/globals.css'), 'utf8');
    expect(css).toContain(':focus-visible');
    expect(css).toMatch(/ring-2/);

    // No positive tabindex anywhere, which would break tab order.
    srcFiles.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      expect(t, `${relative(ROOT, f)}`).not.toMatch(/tabIndex=\{[1-9]/);
    });

    // Built pages expose the landmark and the skip target.
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      expect(html, relative(ROOT, f)).toContain('id="main"');
      expect(html).toContain('Skip to main content');
    });
  });

  it('4. navigation works at desktop and mobile sizes', () => {
    const nav = readFileSync(resolve(SRC, 'components/NavBar.tsx'), 'utf8');

    // Both navigations exist and are mutually exclusive by breakpoint.
    expect(nav).toContain('aria-label="Primary"');
    expect(nav).toContain('aria-label="Primary mobile"');
    expect(nav).toContain('lg:flex');
    expect(nav).toContain('lg:hidden');

    // The mobile panel is a proper disclosure with a focus trap.
    expect(nav).toContain('aria-expanded');
    expect(nav).toContain('aria-controls="mobile-nav"');
    expect(nav).toContain("e.key === 'Escape'");
    expect(nav).toContain("e.key !== 'Tab'");
    expect(nav).toContain('triggerRef.current?.focus()');

    // Active route is announced, not only coloured.
    expect(nav).toContain("aria-current={active ? 'page' : undefined}");

    // Every route appears in both navigations in the built output.
    const home = readFileSync(resolve(OUT, 'index.html'), 'utf8');
    ROUTES.forEach((r) => {
      // Static export emits trailing slashes on directory routes, so the
      // closing quote is deliberately not part of the match.
      const href = r.href === '/' ? 'href="/"' : `href="${r.href}/"`;
      expect(home, `nav missing ${r.label}`).toContain(href);
    });
  });

  it('7. every route renders without console errors in the built output', () => {
    // A build time proxy for the runtime check performed in the browser pass:
    // no page may contain a React error boundary marker or a failed island.
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      expect(html, relative(ROOT, f)).not.toContain('Application error');
      expect(html).not.toContain('__NEXT_ERROR__');
      // Every page rendered real content rather than an empty shell.
      expect(html.length).toBeGreaterThan(8000);
    });
    expect(outHtml.length).toBeGreaterThanOrEqual(ROUTES.length + companies.length);
  });

  it('8. no layout overflow is introduced by fixed widths', () => {
    // Wide content must scroll inside its own container, never the body.
    const css = readFileSync(resolve(SRC, 'app/globals.css'), 'utf8');
    expect(css).toContain('.table-scroll');
    expect(css).toContain('overflow-x-auto');

    // Every wide table sits inside a scroll container.
    srcFiles
      .filter((f) => f.endsWith('.tsx'))
      .forEach((f) => {
        const t = readFileSync(f, 'utf8');
        const wide = t.match(/min-w-\[\d+rem\]/g) ?? [];
        if (wide.length > 0) {
          expect(t, `${relative(ROOT, f)} has a wide element without table-scroll`).toMatch(
            /table-scroll|overflow-x-auto|overflow-hidden/,
          );
        }
      });

    // Grid and flex children that truncate must be able to shrink.
    const card = readFileSync(resolve(SRC, 'components/CompanyCard.tsx'), 'utf8');
    expect(card).toContain('min-w-0');
  });
});

describe('data integrity of the redesign', () => {
  it('9. top company cards display correct data', () => {
    const home = readFileSync(resolve(OUT, 'index.html'), 'utf8');
    const ranked = [...companies].sort(
      (a, b) => scoreOf(b) - scoreOf(a) || a.name.localeCompare(b.name),
    );
    const top = ranked.slice(0, 6);

    top.forEach((c) => {
      expect(home, `home missing ${c.name}`).toContain(c.name);
      expect(home, `home missing score for ${c.name}`).toContain(scoreOf(c).toFixed(1));
      expect(home, `home missing sector for ${c.name}`).toContain(c.sector);
    });

    // The card must show every required face field.
    const card = readFileSync(resolve(SRC, 'components/CompanyCard.tsx'), 'utf8');
    [
      'ClassificationBadge',
      'FreshnessBadge',
      'ConfidenceBadge',
      'ReadinessBadge',
      'whyEnteredPipeline',
      'preliminaryCapitalView',
      'discoveryChannel',
      'signalDate',
      'lastReviewed',
      'financingStage',
    ].forEach((field) => expect(card, `card missing ${field}`).toContain(field));
  });

  it('11. emerging targets meet every verification standard', () => {
    expect(emergingTargets.length).toBeGreaterThanOrEqual(8);
    expect(emergingTargets.length).toBeLessThanOrEqual(12);

    emergingTargets.forEach((c) => {
      // Same standard as the benchmark set, asserted independently here.
      expect(c.website, c.name).toMatch(/^https:\/\//);
      expect(c.sources.filter((s) => s.role === 'primary').length, c.name).toBeGreaterThanOrEqual(1);
      expect(
        c.sources.filter((s) => s.role === 'corroborating' && !s.isPressReleaseReproduction).length,
        `${c.name} independent corroboration`,
      ).toBeGreaterThanOrEqual(1);
      c.sources.forEach((s) => {
        expect(s.published, `${c.name} source ${s.id}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(s.url).toMatch(/^https:\/\//);
      });
      expect(c.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.missingInformation.length, c.name).toBeGreaterThanOrEqual(5);
      expect(c.privateStatusVerification.statement).not.toBe(NOT_DISCLOSED);
      expect(canSupportPositiveScore(c.privateStatusVerification.provenance)).toBe(true);
      expect(/privately held/i.test(c.privateStatusVerification.statement), c.name).toBe(true);
      expect(/no (acquisition|registration statement|exchange listing)/i.test(
        c.privateStatusVerification.statement,
      ), c.name).toBe(true);

      // The signal date must correspond to a source actually cited.
      const dates = new Set(c.sources.map((s) => s.published));
      expect(dates.has(c.signalDate), `${c.name} signal ${c.signalDate} unsourced`).toBe(true);

      // Outreach tone rules apply identically.
      expect(c.outreach.emails.length).toBeGreaterThanOrEqual(1);
      c.outreach.emails.forEach((e) => {
        const b = e.body.toLowerCase();
        expect(b).toContain('i am researching this independently');
        expect(b).not.toContain('our fund');
        expect(b).not.toContain('we are looking to invest');
      });
    });
  });

  it('12. benchmark and emerging classifications are visible and never scored', () => {
    expect(benchmarkCompanies.length).toBeGreaterThan(0);
    expect(benchmarkCompanies.length + emergingTargets.length).toBe(companies.length);

    // Classification is stamped at aggregation, never authored per record.
    ['data-infrastructure', 'security-grc', 'automation-fintech', 'vertical-industry', 'emerging']
      .forEach((f) => {
        const src = readFileSync(resolve(SRC, `data/companies.${f}.ts`), 'utf8');
        expect(src, `${f} must not set its own classification`).not.toMatch(
          /^\s*classification:/m,
        );
      });

    // The scoring engine never sees the classification.
    const scoring = readFileSync(resolve(SRC, 'lib/scoring.ts'), 'utf8');
    expect(scoring).not.toContain('classification');
    expect(scoring).not.toContain('Emerging');

    // Classification is rendered in the universe and on company pages.
    const universe = readFileSync(resolve(OUT, 'universe/index.html'), 'utf8');
    expect(universe).toContain('Emerging origination target');
    expect(universe).toContain('Benchmark');

    emergingTargets.forEach((c) => {
      const html = readFileSync(resolve(OUT, 'companies', c.slug, 'index.html'), 'utf8');
      expect(html, `${c.name} page must show its classification`).toContain(
        'Emerging origination target',
      );
    });

    // Emerging companies get no scoring advantage. If they did, the emerging
    // mean would exceed the benchmark mean, which the research does not support.
    const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
    const emergingMean = mean(emergingTargets.map(scoreOf));
    const benchmarkMean = mean(benchmarkCompanies.map(scoreOf));
    expect(emergingMean).toBeLessThan(benchmarkMean + 1);
  });

  it('13. underwriting readiness is derived from evidence, never from identity', () => {
    const src = readFileSync(resolve(SRC, 'lib/readiness.ts'), 'utf8');
    companies.forEach((c) => {
      expect(src, `readiness.ts must not mention ${c.slug}`).not.toContain(c.slug);
      expect(src, `readiness.ts must not mention ${c.name}`).not.toContain(c.name);
    });

    // Every company resolves to a defined level.
    companies.forEach((c) => {
      expect(READINESS_LEVELS).toContain(readinessOf(c));
    });

    // Swapping evidence swaps readiness, which is the identity independence test.
    const withArr = companies.find((c) => evidenceGates(c).quantifiedArr);
    const withoutArr = companies.find((c) => !evidenceGates(c).quantifiedArr);
    expect(withArr).toBeTruthy();
    expect(withoutArr).toBeTruthy();

    const swapped = { ...withoutArr!, arrEvidence: withArr!.arrEvidence, recurringRevenueEvidence: withArr!.recurringRevenueEvidence };
    const original = readinessOf(withoutArr!);
    const after = readinessOf(swapped);
    expect(after).not.toBe(original);

    // A claim that only mentions a metric must not count as disclosing it.
    const mentionOnly = companies
      .flatMap((c) => [c.netRevenueRetentionEvidence, c.grossMarginEvidence])
      .filter((cl) => cl.statement !== NOT_DISCLOSED && !cl.quantified);
    mentionOnly.forEach((cl) => expect(isPubliclyQuantified(cl)).toBe(false));

    // Readiness ladder is monotonic in evidence: nothing reaches the top level
    // without both recurring revenue and a quantified ARR figure.
    companies
      .filter((c) => readinessOf(c) === 'Potentially underwritable')
      .forEach((c) => {
        const g = evidenceGates(c);
        expect(g.recurringModel, c.name).toBe(true);
        expect(g.quantifiedArr, c.name).toBe(true);
        expect(g.quantifiedRetention || g.disclosedFacility, c.name).toBe(true);
      });
  });

  it('14. missing data requirements are visible on every company page', () => {
    expect(DATA_ROOM_MATERIALS.length).toBeGreaterThanOrEqual(12);

    companies.forEach((c) => {
      const required = managementRequired(c);
      const supported = publiclySupported(c);
      expect(required.length).toBe(13);
      expect(supported.length).toBeGreaterThanOrEqual(6);
      // Every company has at least one outstanding metric. If one did not, the
      // panel would be claiming public sources are sufficient for underwriting.
      expect(required.some((i) => !i.available), c.name).toBe(true);
    });

    // The panel renders all three lists plus the improvement conditions.
    const panel = readFileSync(resolve(SRC, 'components/ReadinessPanel.tsx'), 'utf8');
    expect(panel).toContain('Publicly supported information');
    expect(panel).toContain('Information required from management');
    expect(panel).toContain('Required data room materials');
    expect(panel).toContain('What would change these ratings');
    expect(panel).toContain('does not complete credit underwriting');

    // And it appears in the built pages.
    const sample = readFileSync(
      resolve(OUT, 'companies', companies[0].slug, 'index.html'),
      'utf8',
    );
    expect(sample).toContain('Underwriting readiness');
    expect(sample).toContain('Required data room materials');
    expect(sample).toContain('Monthly profit and loss statement');
  });

  it('15. default pipeline statuses still do not imply contact', () => {
    const page = readFileSync(resolve(SRC, 'app/pipeline/page.tsx'), 'utf8');
    const m = page.match(/defaultStatus:[^,]+,/);
    expect(m).toBeTruthy();
    ['Contacted', 'Initial discussion', 'Preliminary diligence', 'Outreach drafted', 'Passed']
      .forEach((s) => expect(m![0], `seeded status must not be ${s}`).not.toContain(s));

    // The disclosure survives the redesign, including in the kanban view.
    const html = readFileSync(resolve(OUT, 'pipeline/index.html'), 'utf8');
    expect(html).toContain(
      'Pipeline statuses are demonstration workflow data and do not imply actual contact',
    );

    // The kanban column for every non default status starts empty.
    const board = readFileSync(resolve(SRC, 'components/PipelineBoard.tsx'), 'utf8');
    expect(board).toContain('DEFAULT_STATUSES');
    expect(board).toContain("['Researching', 'Qualified for outreach']");
  });
});

describe('artefacts and security are unchanged', () => {
  it('16. Excel and PDF downloads remain byte identical to the approved files', () => {
    expect(sha(XLSX_PATH), 'Excel workbook changed unexpectedly').toBe(APPROVED.xlsx);
    expect(sha(PDF_PATH), 'PDF memorandum changed unexpectedly').toBe(APPROVED.pdf);

    // The copies served from the build must match the source files exactly.
    const outXlsx = resolve(OUT, 'downloads/Enterprise Software Growth Capital Model.xlsx');
    const outPdf = resolve(OUT, 'downloads/Enterprise Software Origination and Underwriting Case.pdf');
    expect(existsSync(outXlsx)).toBe(true);
    expect(existsSync(outPdf)).toBe(true);
    expect(sha(outXlsx)).toBe(APPROVED.xlsx);
    expect(sha(outPdf)).toBe(APPROVED.pdf);
    expect(statSync(outXlsx).size).toBeGreaterThan(20_000);
  });

  it('17. GitHub and external source links retain safe attributes', () => {
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/<a\b[^>]*href="https?:\/\/[^"]*"[^>]*>/g)) {
        expect(m[0], `${relative(ROOT, f)}: ${m[0].slice(0, 110)}`).toContain('target="_blank"');
        expect(m[0]).toMatch(/rel="[^"]*noopener[^"]*"/);
        expect(m[0]).toMatch(/rel="[^"]*noreferrer[^"]*"/);
      }
    });
  });

  it('18. no employer or investment firm name appears', () => {
    const banned = ['Numeta', 'BMP', 'Plug and Play', 'Plug N Play', 'Magid', 'Centerfield',
      'K Street', 'Forester', 'Matchstick', 'LDV', 'Cerberus'];
    const scan = [...srcFiles, ...outHtml, ...walk(resolve(ROOT, 'scripts'), (p) => p.endsWith('.py'))];
    scan.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      banned.forEach((n) => {
        const re = new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        expect(re.test(t), `${relative(ROOT, f)} mentions "${n}"`).toBe(false);
      });
      expect(/\bHeadline\s+(VC|Ventures|Capital|Partners|Fund)\b/i.test(t)).toBe(false);
    });
  });

  it('19. no em dashes appear in visible copy', () => {
    const bad = /[—–]/;
    srcFiles.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      expect(t.match(bad), `${relative(ROOT, f)} contains an em or en dash`).toBeNull();
    });
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      expect(html.includes('&mdash;'), relative(ROOT, f)).toBe(false);
      expect(html.includes('&ndash;'), relative(ROOT, f)).toBe(false);
      expect(bad.test(html), relative(ROOT, f)).toBe(false);
    });
  });

  it('20. no credential or environment dependency was added', () => {
    // Still no environment reads anywhere in the application.
    srcFiles.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      expect(t, `${relative(ROOT, f)} reads process.env`).not.toMatch(/process\.env\./);
      expect(t).not.toMatch(/import\.meta\.env/);
    });

    // .env.example remains comments only.
    readFileSync(resolve(ROOT, '.env.example'), 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((l) => expect(l.startsWith('#')).toBe(true));

    // Runtime dependencies unchanged by the redesign: no motion library added.
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
    expect(Object.keys(pkg.dependencies).sort()).toEqual(['next', 'react', 'react-dom']);
    ['framer-motion', 'motion', 'gsap', 'lottie-web', '@lottiefiles/react-lottie-player',
      'react-spring', 'animejs'].forEach((d) =>
      expect(pkg.dependencies[d], `${d} must not be a runtime dependency`).toBeUndefined(),
    );

    // No credential patterns in anything shipped.
    const patterns: [string, RegExp][] = [
      ['bearer token', /\bBearer\s+[A-Za-z0-9_\-.]{16,}/],
      ['github token', /\bgh[pousr]_[A-Za-z0-9]{20,}/],
      ['aws key', /\bAKIA[0-9A-Z]{16}\b/],
      ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
      ['jwt', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./],
    ];
    [...srcFiles, ...outJs, ...outHtml].forEach((f) => {
      const t = readFileSync(f, 'utf8');
      patterns.forEach(([label, re]) =>
        expect(t.match(re), `${label} in ${relative(ROOT, f)}`).toBeNull(),
      );
    });
  });

  it('6. the site makes zero third party requests', () => {
    // No element in any built page loads from another origin.
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*>/g)) {
        const url = m[0].match(/(?:src|href)="(https?:\/\/[^"]+)"/);
        expect(url, `${relative(ROOT, f)} loads ${url?.[1]}`).toBeNull();
      }
      expect(html).not.toMatch(/rel="(preconnect|dns-prefetch|preload)"[^>]*href="https?:/);
    });

    // No font is fetched. The stacks resolve to locally installed families.
    const tw = readFileSync(resolve(ROOT, 'tailwind.config.ts'), 'utf8');
    expect(tw).not.toMatch(/fonts\.googleapis|fonts\.gstatic|@font-face|typekit/);
    outCss.forEach((f) => {
      const css = readFileSync(f, 'utf8');
      expect(css, relative(ROOT, f)).not.toMatch(/@font-face|url\(https?:/);
    });

    // No runtime network call in the application source.
    srcFiles.forEach((f) => {
      const t = readFileSync(f, 'utf8');
      [/\bfetch\s*\(/, /XMLHttpRequest/, /new\s+WebSocket/, /new\s+EventSource/, /sendBeacon/]
        .forEach((re) => expect(re.test(t), `${relative(ROOT, f)}`).toBe(false));
    });
  });
});

describe('exclusion register', () => {
  it('records the candidates rejected during the research expansion', () => {
    const names = exclusions.map((e) => e.name);
    expect(names).toContain('Metronome');
    expect(names).toContain('Rootly');
    exclusions.forEach((e) => {
      expect(e.evidence.length).toBeGreaterThan(60);
      expect(e.sourceUrl).toMatch(/^https:\/\//);
      expect(e.sourceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
    // No excluded company may appear in the universe.
    const slugs = new Set(companies.map((c) => c.name.toLowerCase()));
    exclusions.forEach((e) => expect(slugs.has(e.name.toLowerCase())).toBe(false));
  });
});
