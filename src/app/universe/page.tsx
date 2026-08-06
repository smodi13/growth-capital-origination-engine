import type { Metadata } from 'next';
import { companies, exclusions } from '@/data/companies';
import { scoreOf } from '@/lib/scoring';
import { channelDistribution, formatDate, freshnessDistribution } from '@/lib/derived';
import { DisclosureBanner, DistributionBar, ExternalLink, PageHeader, Section } from '@/components/primitives';
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
}));

export default function UniversePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Real private company sourcing universe"
        title={`${companies.length} private B2B enterprise software companies`}
        lede="Every company here is real, privately held, and independently operating as of the review date. Each carries an official website, at least one primary source, at least one independent corroborating source, a dated origination signal, a data confidence rating, and an explicit list of what public sources do not disclose."
      />

      <Section title="Universe" description="Sort by any column. Filter by sector, signal freshness, or data confidence.">
        <UniverseTable rows={rows} />
      </Section>

      <Section
        title="Signal distribution"
        description="Discovery channel and freshness across the universe. Both are displayed on the homepage, this table, every company page, the pipeline, and the comparison tool."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Discovery channel</h3>
            <div className="mt-3">
              <DistributionBar items={channelDistribution} total={companies.length} />
            </div>
          </div>
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-ink-100">Signal freshness</h3>
            <div className="mt-3">
              <DistributionBar items={freshnessDistribution} total={companies.length} />
            </div>
            <p className="mt-3 text-2xs leading-relaxed text-ink-500">
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
        <div className="table-scroll">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-800">
                <th scope="col" className="px-3 py-2"><span className="label">Company</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Sector considered</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Reason excluded</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Evidence</span></th>
              </tr>
            </thead>
            <tbody>
              {exclusions.map((e) => (
                <tr key={e.name} className="border-b border-ink-800/60 align-top">
                  <td className="px-3 py-3 text-xs font-semibold text-ink-100">{e.name}</td>
                  <td className="px-3 py-3 text-xs text-ink-400">{e.sector}</td>
                  <td className="px-3 py-3 text-xs text-ink-300">{e.reason}</td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-ink-400">
                    {e.evidence}
                    <p className="mt-1.5">
                      <ExternalLink href={e.sourceUrl}>Source</ExternalLink>
                      <span className="text-ink-600"> · {formatDate(e.sourceDate)}</span>
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
    </div>
  );
}
