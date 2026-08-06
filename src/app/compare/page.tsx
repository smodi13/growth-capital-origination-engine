import type { Metadata } from 'next';
import { companies } from '@/data/companies';
import { scoreOf } from '@/lib/scoring';
import { formatDate } from '@/lib/derived';
import { NOT_DISCLOSED } from '@/lib/types';
import { DisclosureBanner, PageHeader, Section } from '@/components/primitives';
import { CompareTool, type CompareRecord } from '@/components/CompareTool';
import { DISCLOSURE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Compare companies',
  description:
    'Compare up to four real private companies side by side across financing, evidence quality, sourcing signal, origination score, and capital solution fit.',
};

const records: CompareRecord[] = companies.map((c) => ({
  slug: c.slug,
  name: c.name,
  sector: c.sector,
  stage: c.financingStage,
  headquarters: c.headquarters,
  latestFinancing: c.latestFinancing,
  financingDate: c.financingDate === NOT_DISCLOSED ? NOT_DISCLOSED : formatDate(c.financingDate),
  totalFunding: c.totalDisclosedFunding,
  commercialMaturity: c.commercialMaturitySignal.statement,
  growthEvidence: c.growthSignal.statement,
  recurringRevenueEvidence: c.recurringRevenueEvidence.statement,
  capitalEfficiencyEvidence: c.capitalEfficiencyEvidence.statement,
  debtEvidence: c.debtEvidence.statement,
  sourcingSignal: c.originalSourcingSignal,
  freshness: c.signalFreshness,
  signalDate: c.signalDate,
  confidence: c.dataConfidence,
  score: scoreOf(c),
  equityFit: c.capitalFit.equity.rating,
  debtFit: c.capitalFit.debt.rating,
  blendedFit: c.capitalFit.blended.rating,
  mainRisk: c.mainFinancialRisk,
  nextQuestion: c.qualificationQuestions[0],
}));

export default function ComparePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Private company comparison tool"
        title="Compare up to four companies"
        lede="Every field shown is either a dated disclosed fact or an explicit statement that public sources do not disclose it. No undisclosed metric is estimated to make a comparison look complete, which is why several rows read as not publicly disclosed."
      />

      <Section title="Comparison">
        <CompareTool records={records} />
      </Section>

      <Section
        title="How to read this"
        description="Three things are worth noting before drawing conclusions from a side by side view."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            {
              t: 'Gaps are findings, not formatting problems',
              b: 'Where a row reads "Not publicly disclosed", that is the result. Filling it with an estimate would make the comparison look tidier and make it useless, because a reader could no longer tell which numbers are real.',
            },
            {
              t: 'A high score does not mean a high debt fit',
              b: 'The origination score measures whether a company is worth approaching. The private credit fit measures whether the public record supports a debt conversation. Several companies here score well and carry a private credit fit of 1 or 0, and that is the framework working rather than failing.',
            },
            {
              t: 'Freshness is context, not ranking',
              b: 'A fresh signal means there is a current reason to make contact. It raises outreach priority but does not lift the origination score, so an established company with better fundamentals still ranks above a recently financed weaker one.',
            },
          ].map((x) => (
            <div key={x.t} className="panel p-4">
              <p className="text-sm font-semibold text-ink-100">{x.t}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-400">{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-12">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </div>
  );
}
