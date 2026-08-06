import Link from 'next/link';
import type { Metadata } from 'next';
import { companies, emergingTargets, exclusions, benchmarkCompanies } from '@/data/companies';
import { scoreOf } from '@/lib/scoring';
import { outstandingMetricCount, readinessOf } from '@/lib/readiness';
import { channelDistribution, formatDate, freshnessDistribution } from '@/lib/derived';
import {
  DisclosureBanner,
  DistributionBar,
  ExternalLink,
  FreshnessBadge,
  PageHeader,
  PageShell,
  ReadinessBadge,
  Section,
} from '@/components/primitives';
import { UniverseTable, type UniverseRow } from '@/components/UniverseTable';
import { DISCLOSURE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sourcing universe',
  description:
    'Real private B2B enterprise software companies verified against dated public sources, with origination scores and separate equity, debt, and blended capital fit assessments.',
};

const rows: UniverseRow[] = companies.map((c) => ({
  slug: c.slug,
  name: c.name,
  sector: c.sector,
  subsector: c.subsector,
  headquarters: c.headquarters,
  stage: c.financingStage,
  latestFinancing: c.latestFinancing,
  financingDate: c.financingDate,
  totalFunding: c.totalDisclosedFunding,
  channel: c.discoveryChannel,
  freshness: c.signalFreshness,
  signalDate: c.signalDate,
  confidence: c.dataConfidence,
  score: scoreOf(c),
  equityFit: c.capitalFit.equity.rating,
  debtFit: c.capitalFit.debt.rating,
  blendedFit: c.capitalFit.blended.rating,
  priority: c.outreachPriority,
  lastReviewed: c.lastReviewed,
  classification: c.classification,
  readiness: readinessOf(c),
  outstandingMetrics: outstandingMetricCount(c),
  whyEntered: c.whyEnteredPipeline,
  capitalView: c.preliminaryCapitalView,
}));

export default function UniversePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Real private company sourcing universe"
        title={`${companies.length} private B2B enterprise software companies`}
        lede="Every company here is real, privately held, and independently operating as of the review date. Each carries an official website, at least one primary source, at least one independent corroborating source, a dated origination signal, a data confidence rating, and an explicit list of what public sources do not disclose."
      />

      <Section
        title="Origination workstation"
        description="Start from a saved view or build your own. Sort by any column, switch between compact and expanded density, hide columns you do not need, and reset in one click. Saved views persist in this browser only."
      >
        <UniverseTable rows={rows} />
      </Section>


      <Section
        title="Emerging origination targets"
        description={`${emergingTargets.length} companies sourced specifically as differentiated origination targets rather than as market reference points. Series B and C weighted, more capital efficient, founder led, and outside the list of names every growth investor already tracks. Held to exactly the same verification standard as the benchmark set, and deliberately given no scoring advantage for being here.`}
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          <div className="surface-light p-6">
            <p className="text-3xs font-semibold uppercase tracking-[0.16em] text-slate-700">
              Why the split exists
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-800">
              A universe weighted toward Series D and later tells you what a mature private software
              company looks like. It does not tell you where a specialist capital provider can
              actually be differentiated, because those companies are tracked by everyone and
              financed by whoever they choose.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-800">
              The emerging set was sourced against a different filter: earlier stage, more capital
              efficient, founder led, and carrying a recent product, customer, executive, financing,
              or credit signal that makes a flexible equity, debt, or blended conversation credible.
            </p>
            <p className="mt-5 border-t border-ivory-300 pt-4 text-xs leading-relaxed text-slate-700">
              Classification is stamped during aggregation from the research file a record lives in,
              so a company cannot assign its own label, and it is excluded from every scoring input.
              Several emerging records score below the benchmark set. That is the honest result of
              holding both to the same evidence standard.
            </p>
          </div>

          <div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {emergingTargets
                .slice()
                .sort((a, b) => scoreOf(b) - scoreOf(a))
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/companies/${c.slug}/`}
                    className="panel flex flex-col p-4 transition-[transform,border-color] duration-200 hover:border-white/15 motion-safe:hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-display text-sm font-semibold text-ivory-50">
                          {c.name}
                        </p>
                        <p className="mt-0.5 truncate text-2xs text-slate-500">
                          {c.sector} <span className="text-slate-600">/</span> {c.financingStage}
                        </p>
                      </div>
                      <span className="num shrink-0 text-base font-semibold text-ivory-50">
                        {scoreOf(c).toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <FreshnessBadge value={c.signalFreshness} />
                      <ReadinessBadge value={readinessOf(c)} />
                    </div>
                  </Link>
                ))}
            </div>
            <p className="mt-3 text-2xs leading-relaxed text-slate-500">
              Benchmark set: {benchmarkCompanies.length} companies. Emerging set:{' '}
              {emergingTargets.length}. Filter the table above by classification to see either group
              on its own.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Signal distribution"
        description="Discovery channel and freshness across the universe. Both are displayed on the homepage, this table, every company page, the pipeline, and the comparison tool."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Discovery channel</h3>
            <div className="mt-3">
              <DistributionBar items={channelDistribution} total={companies.length} />
            </div>
          </div>
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Signal freshness</h3>
            <div className="mt-3">
              <DistributionBar items={freshnessDistribution} total={companies.length} />
            </div>
            <p className="mt-3 text-2xs leading-relaxed text-slate-500">
              Measured from the review date of {formatDate('2026-08-05')}. Fresh is within 90 days,
              Recent within 12 months, Established beyond that. A fresh signal raises outreach
              priority but never overrides fundamental company quality in the score.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Companies researched and excluded"
        description="Verification is only meaningful if it rejects candidates. These companies were researched and removed rather than retained to hit a target count, and none was replaced with a weaker company to keep the number up."
      >
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th scope="col" className="px-3 py-2"><span className="label">Company</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Sector considered</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Reason excluded</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Evidence</span></th>
              </tr>
            </thead>
            <tbody>
              {exclusions.map((e) => (
                <tr key={e.name} className="border-b border-white/[0.06] align-top">
                  <td className="px-3 py-3 text-xs font-semibold text-slate-100">{e.name}</td>
                  <td className="px-3 py-3 text-xs text-slate-400">{e.sector}</td>
                  <td className="px-3 py-3 text-xs text-slate-300">{e.reason}</td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-slate-400">
                    {e.evidence}
                    <p className="mt-1.5">
                      <ExternalLink href={e.sourceUrl}>Source</ExternalLink>
                      <span className="text-slate-600"> · {formatDate(e.sourceDate)}</span>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="mt-12">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </PageShell>
  );
}
