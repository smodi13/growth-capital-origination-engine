import type { Metadata } from 'next';
import { companies } from '@/data/companies';
import { scoreOf } from '@/lib/scoring';
import {
  outstandingMetricCount,
  qualificationCompleteness,
  readinessOf,
} from '@/lib/readiness';
import { DisclosureBanner, PageHeader, Section, PageShell} from '@/components/primitives';
import { PipelineBoard, STATUSES, type PipelineSeed } from '@/components/PipelineBoard';
import { DISCLOSURE, PIPELINE_DISCLOSURE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Origination pipeline',
  description:
    'A browser local origination pipeline with statuses, priorities, notes, next actions, filtering, sorting, and CSV export. No database, no login, no telemetry.',
};

/**
 * Seeded pipeline records.
 *
 * Default statuses are restricted to Researching and Qualified for outreach.
 * No seeded record may imply contact, a meeting, or diligence that has not
 * happened, and an automated test enforces that.
 */
const seeds: PipelineSeed[] = companies.map((c) => ({
  slug: c.slug,
  name: c.name,
  sector: c.sector,
  stage: c.financingStage,
  channel: c.discoveryChannel,
  freshness: c.signalFreshness,
  signalDate: c.signalDate,
  confidence: c.dataConfidence,
  score: scoreOf(c),
  defaultStatus: c.outreachPriority === 'High' ? 'Qualified for outreach' : 'Researching',
  defaultPriority: c.outreachPriority,
  defaultNextAction: c.nextDiligenceStep,
  capitalView: c.preliminaryCapitalView,
  readiness: readinessOf(c),
  outstandingMetrics: outstandingMetricCount(c),
  qualificationCompleteness: qualificationCompleteness(c),
}));

export default function PipelinePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Origination pipeline"
        title="Workflow demonstration"
        lede="A working origination pipeline that runs entirely in the browser. Status changes, priorities, next actions, and notes persist in localStorage, and the whole board exports to CSV. Nothing is transmitted anywhere and there is no account to create."
      />

      <div className="mt-6">
        <DisclosureBanner tone="warning">{PIPELINE_DISCLOSURE}</DisclosureBanner>
      </div>

      <Section
        title="Pipeline"
        description={`All ${companies.length} companies seeded at either Researching or Qualified for outreach. Every other status is available to demonstrate the workflow, but no record starts in one, because doing so would imply contact that has not taken place.`}
      >
        <PipelineBoard seeds={seeds} />
      </Section>

      <Section title="Status definitions">
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-3 py-2"><span className="label">Status</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Meaning</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Used as a default</span></th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ['Researching', 'The company is in the universe and its record is being built or verified. No outreach has been drafted.'],
                  ['Qualified for outreach', 'Research is complete, the record has passed verification, and outreach has been drafted and is ready to send.'],
                  ['Outreach drafted', 'A message has been written for a specific executive but has not been sent.'],
                  ['Contacted', 'An approach has been made and no reply has been received yet.'],
                  ['Initial discussion', 'A first conversation has taken place.'],
                  ['Preliminary diligence', 'Information has been shared and analysis is underway.'],
                  ['Passed', 'Reviewed and not being pursued further, with the reason recorded in notes.'],
                  ['Priority follow-up', 'Not active now but flagged to revisit on a specific trigger.'],
                ] as const
              ).map(([status, meaning]) => {
                const isDefault = status === 'Researching' || status === 'Qualified for outreach';
                return (
                  <tr key={status} className="border-b border-slate-100 align-top">
                    <td className="px-3 py-2.5 text-xs font-semibold text-slate-800">{status}</td>
                    <td className="px-3 py-2.5 text-xs leading-relaxed text-slate-600">{meaning}</td>
                    <td className="px-3 py-2.5 text-xs">
                      {isDefault ? (
                        <span className="text-cobalt-600">Yes</span>
                      ) : (
                        <span className="text-slate-600">No, available to the user only</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-2xs text-slate-600">
          {STATUSES.length} statuses in total.
        </p>
      </Section>

      <div className="mt-12 space-y-3">
        <DisclosureBanner tone="warning">{PIPELINE_DISCLOSURE}</DisclosureBanner>
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </PageShell>
  );
}
