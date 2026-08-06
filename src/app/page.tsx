import Link from 'next/link';
import { companies, emergingTargets } from '@/data/companies';
import {
  capitalSolutionDistribution,
  channelDistribution,
  freshnessDistribution,
  sectorDistribution,
  stageDistribution,
  topPriorities,
  totalSources,
} from '@/lib/derived';
import { DISCLOSURE, DEVELOPMENT_DISCLOSURE, DOWNLOADS, SITE } from '@/lib/site';
import {
  blendedCapitalCase,
  growthEquityCase,
  HYPOTHETICAL_DISCLOSURE,
  HYPOTHETICAL_NAME,
  privateCreditCase,
  recommendation,
} from '@/data/hypothetical';
import { managementRequired } from '@/lib/readiness';
import { DisclosureBanner, DistributionBar, ExternalLink, Section } from '@/components/primitives';
import { CompanyCard } from '@/components/CompanyCard';
import { CapitalFlowBackground } from '@/components/CapitalFlowBackground';
import { CountUp, HeroReveal, Reveal } from '@/components/motion';
import { WorkflowDiagram } from '@/components/home/WorkflowDiagram';
import { StructureSwitcher, type StructureView } from '@/components/home/StructureSwitcher';

const pct = (n: number, dp = 1) => `${(n * 100).toFixed(dp)}%`;

/* --------------------------------------------------------------- workflow -- */

const WORKFLOW = [
  {
    n: '01',
    title: 'Discover',
    body: 'Companies enter through one dated public event: a financing, a disclosed credit facility, an executive appointment, a product launch, a customer win, or independent analyst research.',
  },
  {
    n: '02',
    title: 'Verify',
    body: 'Private status, founders, headquarters, and financing are checked against first party sources. Candidates that fail are removed and recorded rather than quietly replaced.',
  },
  {
    n: '03',
    title: 'Qualify',
    body: 'Every claim is classified by provenance. Evidence that is not sufficiently supported earns zero scoring weight, which the engine enforces in code rather than by convention.',
  },
  {
    n: '04',
    title: 'Contact',
    body: 'Executive outreach is drafted against the company actual product, financing history, and visible capital position, with three qualification questions and a defined next step.',
  },
  {
    n: '05',
    title: 'Underwrite',
    body: 'A hypothetical SaaS company is modelled end to end, with a live Excel workbook and a written memorandum carrying the operating case, the downside, and the recommendation.',
  },
  {
    n: '06',
    title: 'Structure',
    body: 'Growth equity, private credit, and blended capital are compared on identical operating assumptions, so every difference in outcome is caused by the structure.',
  },
];

/* ------------------------------------------------------------- structures -- */

const STRUCTURE_VIEWS: StructureView[] = [
  {
    key: 'equity',
    label: 'Growth equity',
    recommended: false,
    summary:
      'USD 20.0 million of primary equity at a USD 96.0 million pre-money valuation. No leverage, no covenant, and no debt service. It is the safest structure and the most expensive one in ownership terms.',
    metrics: [
      { label: 'Founder dilution', value: pct(growthEquityCase.founderDilution), tone: 'risk' },
      { label: 'Year five cash', value: `USD ${growthEquityCase.endingCash.toFixed(1)}m` },
      { label: 'Covenant status', value: 'No covenant', tone: 'positive' },
      { label: 'Equity MOIC', value: `${growthEquityCase.equityMoic.toFixed(2)}x` },
      { label: 'Equity IRR', value: pct(growthEquityCase.equityIrr) },
      { label: 'Downside year five cash', value: 'USD 8.4m', tone: 'positive' },
    ],
    caveat:
      'Existing holders give up 17.2 percent of the company to buy protection they may not need in the base case. It survives the downside comfortably, which is what that price is buying.',
  },
  {
    key: 'credit',
    label: 'Private credit',
    recommended: false,
    summary:
      'USD 20.0 million senior secured at 11.5 percent cash interest, three years interest only, then 5 percent of original principal amortising annually. There is no dilution at all, which is the entire attraction, and the structure does not work.',
    metrics: [
      { label: 'Founder dilution', value: 'None', tone: 'positive' },
      {
        label: 'Year five cash',
        value: `USD ${privateCreditCase.endingCash.toFixed(1)}m`,
        tone: 'risk',
      },
      {
        label: 'Covenant status',
        value: `Breach in year ${privateCreditCase.minimumCashBreachYear}`,
        tone: 'risk',
      },
      { label: 'Equity MOIC', value: 'Not applicable' },
      { label: 'Debt investor IRR', value: pct(privateCreditCase.debtInvestorIrr ?? 0) },
      { label: 'Downside year five cash', value: 'USD (5.4)m', tone: 'risk' },
    ],
    caveat:
      'Interest coverage is negative in every year until year five because EBITDA is negative, and debt service coverage never approaches 1.0x. Cash breaches the minimum covenant in year four, and in the downside case the company runs out entirely. The lender return is adequate, which is precisely the problem: the instrument works for the lender and not for the borrower.',
  },
  {
    key: 'blended',
    label: 'Blended capital',
    recommended: true,
    summary:
      'USD 8.0 million of primary equity alongside a USD 12.0 million senior secured facility at 11.0 percent cash interest. The smaller facility prices marginally tighter because leverage against the recurring base is lower.',
    metrics: [
      {
        label: 'Founder dilution',
        value: pct(blendedCapitalCase.founderDilution),
        tone: 'positive',
      },
      { label: 'Year five cash', value: `USD ${blendedCapitalCase.endingCash.toFixed(1)}m` },
      { label: 'Covenant status', value: 'No breach', tone: 'positive' },
      {
        label: 'Equity MOIC',
        value: `${blendedCapitalCase.equityMoic.toFixed(2)}x`,
        tone: 'positive',
      },
      { label: 'Equity IRR', value: pct(blendedCapitalCase.equityIrr), tone: 'positive' },
      { label: 'Downside year five cash', value: 'USD 0.4m', tone: 'risk' },
    ],
    caveat: recommendation.caveat,
  },
];

/* ------------------------------------------------------------ gap sampling - */

/**
 * The disclosure gaps that appear most often across the universe, computed from
 * the records rather than written by hand, so the section cannot drift from the
 * data it describes.
 */
function topGaps(limit = 6) {
  const counts = new Map<string, number>();
  companies.forEach((c) =>
    managementRequired(c)
      .filter((i) => !i.available)
      .forEach((i) => counts.set(i.label, (counts.get(i.label) ?? 0) + 1)),
  );
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([label, count]) => ({ label, count }));
}

const TOTAL_GAPS = companies.reduce((s, c) => s + c.missingInformation.length, 0);

export default function HomePage() {
  const gaps = topGaps();

  return (
    <div>
      {/* ============================================================= Hero == */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        <CapitalFlowBackground />

        <div className="relative mx-auto w-full max-w-[86rem] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <HeroReveal index={0}>
                <p className="eyebrow">Independent growth capital research platform</p>
              </HeroReveal>

              <HeroReveal index={1}>
                <h1 className="mt-4 max-w-[15ch] font-display text-hero font-semibold text-ivory-50">
                  Source, qualify, and underwrite B2B software companies.
                </h1>
              </HeroReveal>

              <HeroReveal index={2}>
                <p className="lede mt-6 max-w-prose">
                  The engine converts fragmented public signals into prioritized executive outreach,
                  preliminary SaaS qualification, capital solution views, structured diligence, and
                  an illustrative underwriting case. It is built to be explicit about what public
                  sources cannot establish.
                </p>
              </HeroReveal>

              <HeroReveal index={3}>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <Link href="/universe/" className="btn-primary">
                    Explore the sourcing universe
                  </Link>
                  <Link href="/underwriting/" className="btn-secondary">
                    Review the underwriting case
                  </Link>
                </div>
              </HeroReveal>

              <HeroReveal index={4}>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a href={DOWNLOADS.model.href} className="link-quiet text-xs">
                    Download Excel model
                  </a>
                  <a href={DOWNLOADS.memo.href} className="link-quiet text-xs">
                    Download investment memorandum
                  </a>
                  <ExternalLink href={SITE.github} className="link-quiet text-xs">
                    View source code
                  </ExternalLink>
                </div>
              </HeroReveal>
            </div>

            <HeroReveal index={3} className="lg:pt-10">
              <WorkflowDiagram />
            </HeroReveal>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[86rem] px-4 sm:px-6 lg:px-8">
        {/* ================================================== Credibility == */}
        <section className="mt-14">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
            {[
              {
                label: 'Verified private companies',
                value: companies.length,
                sub: 'Real, private, independently operating',
              },
              {
                label: 'Enterprise software sectors',
                value: sectorDistribution.length,
                sub: 'Across the universe',
              },
              { label: 'Dated sources', value: totalSources, sub: 'Primary and corroborating' },
              { label: 'Capital structures', value: 3, sub: 'Equity, credit, blended' },
              { label: 'Excel model sheets', value: 14, sub: 'All live formulas' },
              { label: 'Enumerated data gaps', value: TOTAL_GAPS, sub: 'Never estimated' },
            ].map((s, i) => (
              <Reveal key={s.label} index={i} stagger={55} className="panel px-4 py-4">
                <p className="num text-3xl font-semibold text-ivory-50">
                  <CountUp value={s.value} />
                </p>
                <p className="label mt-2">{s.label}</p>
                <p className="mt-1.5 text-3xs leading-snug text-slate-600">{s.sub}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================================================== Workflow == */}
        <Section
          title="How origination runs"
          description="Six stages, each producing an artefact the next stage can audit."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW.map((w, i) => (
              <Reveal
                key={w.n}
                index={i}
                stagger={50}
                className="panel p-5 transition-colors duration-200 hover:border-white/15"
              >
                <div className="flex items-baseline gap-3">
                  <span className="num text-sm font-semibold text-cobalt-400">{w.n}</span>
                  <h3 className="font-display text-base font-semibold text-ivory-50">{w.title}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ============================================ Priority companies == */}
        <Section
          title="Priority opportunities"
          description="The six highest ranked companies by Origination Priority Score. Every rating, its evidence, its source, and whether it is verified fact or analyst judgment is shown on the company page."
          actions={
            <Link href="/universe/" className="btn-ghost text-xs">
              All {companies.length} companies
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topPriorities.map((c, i) => (
              <Reveal key={c.slug} index={i} stagger={55} className="min-w-0">
                <CompanyCard company={c} rank={i + 1} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* =============================================== Disclosure gaps == */}
        <Section
          title="Why public information is not enough"
          description="The engine identifies what must be learned before underwriting rather than inventing the metrics that are missing."
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <Reveal className="surface-light p-6">
              <p className="text-3xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                The constraint
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-800">
                Growth equity underwriting can begin from things that are often public: category,
                growth direction, customer quality, and management. Private credit underwriting
                cannot. It turns on contracted ARR, gross margin, retention, burn, cash balance,
                existing leverage, and debt service capacity.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-800">
                Private companies disclose almost none of that. Rather than estimate around the gap,
                every record enumerates it, and the scoring engine refuses to award positive weight
                to anything the public record does not establish.
              </p>
              <p className="mt-5 border-t border-ivory-300 pt-4 text-xs leading-relaxed text-slate-700">
                Across {companies.length} companies there are{' '}
                <span className="num font-semibold text-slate-900">{TOTAL_GAPS}</span> separately
                enumerated gaps. That number is meant to be uncomfortable. It is the honest measure
                of how much private company underwriting cannot be done from public sources.
              </p>
            </Reveal>

            <Reveal index={1} className="panel p-6">
              <p className="label">Most common undisclosed metrics</p>
              <ul className="mt-4 space-y-3">
                {gaps.map((g) => (
                  <li key={g.label}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-xs text-slate-300">{g.label}</span>
                      <span className="num shrink-0 text-2xs text-slate-500">
                        {g.count} of {companies.length}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-navy-800">
                      <div
                        className="h-full rounded-full bg-risk-500/70"
                        style={{ width: `${(g.count / companies.length) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/[0.07] pt-4 text-2xs leading-relaxed text-slate-500">
                Each company page carries an underwriting readiness panel separating what the public
                record supports, what must come from management, and what a full data room would
                need.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ============================================= Structure switch == */}
        <Section
          title="The same capital, three ways"
          description={`Growth equity, private credit, and blended capital applied to ${HYPOTHETICAL_NAME}. The operating forecast is identical across all three, so every difference is caused by the structure rather than by the business.`}
        >
          <div className="mb-4">
            <DisclosureBanner tone="warning">{HYPOTHETICAL_DISCLOSURE}</DisclosureBanner>
          </div>
          <Reveal>
            <StructureSwitcher views={STRUCTURE_VIEWS} />
          </Reveal>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/structures/" className="btn-secondary">
              Full structure comparison
            </Link>
            <Link href="/underwriting/" className="btn-ghost">
              Operating model and downside case
            </Link>
          </div>
        </Section>

        {/* ================================================= Composition == */}
        <Section
          title="Universe composition"
          description={`${companies.length} companies across ${sectorDistribution.length} sectors, including ${emergingTargets.length} emerging origination targets held to the same verification standard as the benchmark set.`}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { title: 'Sector', items: sectorDistribution, note: undefined },
              { title: 'Financing stage', items: stageDistribution, note: undefined },
              {
                title: 'Signal freshness',
                items: freshnessDistribution,
                note: 'Fresh is within 90 days of the review date, Recent within 12 months. Freshness influences outreach sequencing but never the score.',
              },
              {
                title: 'Leading capital solution',
                items: capitalSolutionDistribution,
                note: 'The highest of the three separate fit assessments. Ties resolve toward the more conservative instrument.',
              },
            ].map((block, i) => (
              <Reveal key={block.title} index={i} stagger={50} className="panel p-5">
                <h3 className="text-sm font-semibold text-ivory-50">{block.title}</h3>
                {block.note ? (
                  <p className="mt-1.5 text-2xs leading-relaxed text-slate-500">{block.note}</p>
                ) : null}
                <div className="mt-4">
                  <DistributionBar items={block.items} total={companies.length} />
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Discovery channels span {channelDistribution.length} distinct origination signals.{' '}
            <Link href="/universe/" className="link">
              See the full universe and the exclusion register
            </Link>
          </p>
        </Section>

        {/* =================================================== Downloads == */}
        <Section
          title="Work product"
          description="Both artefacts are static files committed to the repository and generated from the same model constants that drive this site."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                d: DOWNLOADS.model,
                type: 'XLSX',
                meta: '14 sheets',
                detail:
                  'Every input is an editable cell on the Assumptions sheet and every output is a live formula. Change an assumption and the SaaS metrics, debt schedules, returns, sensitivities, and downside case all recalculate.',
              },
              {
                d: DOWNLOADS.memo,
                type: 'PDF',
                meta: '5 pages',
                detail:
                  'Executive summary, SaaS quality assessment, three structure alternatives with debt schedules and charts, key risks, and a conditional recommendation with its own stated limits.',
              },
            ].map((x, i) => (
              <Reveal key={x.d.href} index={i} stagger={60} className="min-w-0">
                <a
                  href={x.d.href}
                  className="panel flex h-full min-w-0 flex-col p-5 transition-[transform,border-color,box-shadow] duration-200 ease-standard hover:border-white/15 hover:shadow-lift motion-safe:hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="num rounded border border-cobalt-500/40 bg-cobalt-700/25 px-1.5 py-0.5 text-3xs font-bold text-cobalt-200">
                      {x.type}
                    </span>
                    <span className="text-2xs text-slate-500">{x.meta}</span>
                    <span className="text-2xs text-slate-600">Updated 6 Aug 2026</span>
                  </div>
                  <p className="mt-3 font-display text-base font-semibold text-ivory-50">
                    {x.d.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{x.detail}</p>
                  <p className="num mt-4 break-all text-2xs text-cobalt-300">{x.d.label}</p>
                  <span className="btn-secondary mt-4 w-full">Download</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ================================================= Methodology == */}
        <Section
          title="Methodology and disclosure"
          description="What this research is, how it was assembled, and what it deliberately refuses to conclude."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: 'Static dated research',
                b: 'Every company record is a snapshot with a review date on the page. Nothing is fetched live, so what you read is what was verified.',
              },
              {
                t: 'Source classification',
                b: 'Primary sources are first party. Corroborating sources are independent. A press release reproduction is flagged, because reproducing an announcement is not verifying it.',
              },
              {
                t: 'Missing data policy',
                b: 'Where public sources do not disclose something the record says so. ARR, retention, margin, burn, runway, and valuation are never estimated.',
              },
              {
                t: 'Hypothetical underwriting',
                b: `${HYPOTHETICAL_NAME} is hypothetical and appears only in the underwriting case, the structure comparison, the Excel model, and the memorandum.`,
              },
            ].map((x, i) => (
              <Reveal key={x.t} index={i} stagger={45} className="panel p-5">
                <h3 className="text-sm font-semibold text-ivory-50">{x.t}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-400">{x.b}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <Reveal className="panel p-5">
              <p className="label">Development disclosure</p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-300">
                {DEVELOPMENT_DISCLOSURE}
              </p>
            </Reveal>
            <Reveal index={1} className="panel p-5">
              <p className="label">Independent work sample</p>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{DISCLOSURE}</p>
            </Reveal>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/methodology/" className="btn-secondary">
              Full methodology
            </Link>
            <Link href="/sources/" className="btn-ghost">
              Source registry
            </Link>
            <Link href="/about/" className="btn-ghost">
              About this project
            </Link>
          </div>
        </Section>

        <div className="mt-14">
          <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
        </div>
      </div>
    </div>
  );
}
