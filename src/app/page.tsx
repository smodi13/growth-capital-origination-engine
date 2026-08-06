import Link from 'next/link';
import { companies } from '@/data/companies';
import {
  capitalSolutionDistribution,
  channelDistribution,
  freshnessDistribution,
  sectorDistribution,
  stageDistribution,
  topPriorities,
  totalSources,
} from '@/lib/derived';
import { DISCLOSURE, DOWNLOADS, SITE } from '@/lib/site';
import { HYPOTHETICAL_DISCLOSURE, HYPOTHETICAL_NAME, recommendation } from '@/data/hypothetical';
import {
  DisclosureBanner,
  DistributionBar,
  ExternalLink,
  Section,
  StatTile,
} from '@/components/primitives';
import { CompanyCard } from '@/components/CompanyCard';

const WORKFLOW = [
  {
    step: '01',
    title: 'Source',
    body: 'Companies enter through a specific, dated public signal: a financing announcement, a credit facility, an executive hire, a product launch, an enterprise customer win, or independent analyst research. The signal is recorded with its date and channel so freshness can be measured rather than asserted.',
  },
  {
    step: '02',
    title: 'Qualify',
    body: 'Every claim is classified by provenance before it is used. Independently verified, company reported, investor reported, and government reported evidence can support a score. Anything not sufficiently supported cannot, and the scoring engine enforces that in code rather than by convention.',
  },
  {
    step: '03',
    title: 'Contact',
    body: 'Each company carries executive outreach drafted against its actual product, financing history, and visible capital position, plus three qualification questions and a defined next diligence step. The tone demonstrates executive level research, not representation of a fund.',
  },
  {
    step: '04',
    title: 'Underwrite',
    body: 'A hypothetical SaaS company is modelled end to end across growth equity, private credit, and blended structures, with a live Excel model and a written memorandum showing how the structure choice changes dilution, debt service risk, runway, and returns.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-800 pb-10">
        <p className="label">Independent growth capital research platform</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-300">{SITE.description}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            href="/universe/"
            className="rounded-md bg-accent-500 px-4 py-2 text-xs font-semibold text-ink-950 transition-colors hover:bg-accent-400"
          >
            View the sourcing universe
          </Link>
          <Link
            href="/underwriting/"
            className="rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900"
          >
            Hypothetical underwriting case
          </Link>
          <a
            href={DOWNLOADS.model.href}
            className="rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900"
          >
            Download Excel model
          </a>
          <a
            href={DOWNLOADS.memo.href}
            className="rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900"
          >
            Download PDF memorandum
          </a>
          <ExternalLink
            href={SITE.github}
            className="rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold text-ink-200 transition-colors hover:border-ink-600 hover:bg-ink-900"
          >
            GitHub repository
          </ExternalLink>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Private companies"
          value={String(companies.length)}
          sub="Real, independently operating, privately held"
        />
        <StatTile label="Sectors covered" value={String(sectorDistribution.length)} sub="Enterprise software categories" />
        <StatTile label="Dated sources" value={String(totalSources)} sub="Primary and corroborating, all linked" />
        <StatTile label="Discovery channels" value={String(channelDistribution.length)} sub="Distinct origination signals" />
      </section>

      {/* Workflow */}
      <Section
        title="How the workflow runs"
        description="Four stages, each producing an artefact the next stage can audit."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w) => (
            <div key={w.step} className="panel p-4">
              <p className="num text-accent-400">{w.step}</p>
              <h3 className="mt-1.5 text-sm font-semibold text-ink-50">{w.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Top priorities */}
      <Section
        title="Top six origination priorities"
        description="Ranked by Origination Priority Score. Every rating, its evidence, its source, and whether it is verified fact or analyst judgment is shown on the company page."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topPriorities.map((c, i) => (
            <CompanyCard key={c.slug} company={c} rank={i + 1} />
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-500">
          <Link href="/universe/" className="link">
            View all {companies.length} companies in the universe
          </Link>
        </p>
      </Section>

      {/* Distributions */}
      <Section
        title="Universe composition"
        description="Distribution across sector, financing stage, signal freshness, and the leading capital solution view for each company."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Sector distribution</h3>
            <div className="mt-3">
              <DistributionBar items={sectorDistribution} total={companies.length} />
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Financing stage distribution</h3>
            <div className="mt-3">
              <DistributionBar items={stageDistribution} total={companies.length} />
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Signal freshness distribution</h3>
            <p className="mt-1 text-2xs leading-relaxed text-ink-500">
              Fresh is within 90 days of the review date, Recent is within 12 months, Established is
              older. Freshness influences outreach priority but does not override company quality.
            </p>
            <div className="mt-3">
              <DistributionBar items={freshnessDistribution} total={companies.length} />
            </div>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Capital solution distribution</h3>
            <p className="mt-1 text-2xs leading-relaxed text-ink-500">
              The highest of the three separate fit assessments for each company. Ties resolve
              toward the more conservative instrument.
            </p>
            <div className="mt-3">
              <DistributionBar items={capitalSolutionDistribution} total={companies.length} />
            </div>
          </div>
        </div>
      </Section>

      {/* Underwriting */}
      <Section
        title="Hypothetical underwriting case"
        description="A clearly isolated illustrative company used to show how the same capital requirement produces materially different outcomes under three structures."
      >
        <div className="panel p-5">
          <DisclosureBanner tone="warning">{HYPOTHETICAL_DISCLOSURE}</DisclosureBanner>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <div>
              <h3 className="text-sm font-semibold text-ink-50">{HYPOTHETICAL_NAME}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">
                Approximately USD 12 million of beginning ARR growing 30 percent, 110 percent net
                revenue retention, 88 percent gross retention, 78 percent gross margin, negative
                EBITDA, and a requirement for approximately USD 20 million of growth capital.
              </p>
            </div>
            <div>
              <p className="label">Recommended illustrative structure</p>
              <p className="mt-1.5 text-sm font-semibold text-accent-300">{recommendation.structure}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">{recommendation.headline}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5 border-t border-ink-800 pt-4">
            <Link
              href="/underwriting/"
              className="rounded-md bg-accent-500 px-3.5 py-2 text-xs font-semibold text-ink-950 hover:bg-accent-400"
            >
              Open the underwriting case
            </Link>
            <Link
              href="/structures/"
              className="rounded-md border border-ink-700 px-3.5 py-2 text-xs font-semibold text-ink-200 hover:bg-ink-900"
            >
              Compare the three structures
            </Link>
          </div>
        </div>
      </Section>

      {/* Downloads */}
      <Section title="Downloads" description="Both artefacts are committed to the repository and served as static files.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[DOWNLOADS.model, DOWNLOADS.memo].map((d) => (
            <a key={d.href} href={d.href} className="panel block min-w-0 p-4 transition-colors hover:border-ink-700 hover:bg-ink-850">
              <p className="text-sm font-semibold text-ink-50">{d.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-400">{d.description}</p>
              <p className="num mt-3 break-all text-accent-400">{d.label}</p>
            </a>
          ))}
        </div>
      </Section>

      <div className="mt-12">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </div>
  );
}
