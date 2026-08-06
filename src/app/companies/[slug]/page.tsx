import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { companies, companySlugs, getCompany } from '@/data/companies';
import {
  breakdownOf,
  CAPITAL_FIT_LABEL,
  fitDescriptor,
  maxSupportableDebtFit,
} from '@/lib/scoring';
import { formatDate } from '@/lib/derived';
import { DISCLOSURE } from '@/lib/site';
import { NOT_DISCLOSED, type Claim, type CompanyRecord, type SourceRef } from '@/lib/types';
import { ReadinessPanel } from '@/components/ReadinessPanel';
import { SectionNav } from '@/components/SectionNav';
import { ReadingProgress, ScoreBar } from '@/components/motion';
import { readinessOf } from '@/lib/readiness';
import {
  ClassificationBadge,
  ConfidenceBadge,
  DisclosureBanner,
  ExternalLink,
  FieldList,
  FreshnessBadge,
  Pill,
  ProvenanceBadge,
  RatingBar,
  ScoreMark,
  PageShell,
  ReadinessBadge,
  Section,
} from '@/components/primitives';


const SECTIONS = [
  { id: 'snapshot', label: 'Investment snapshot' },
  { id: 'signal', label: 'Sourcing signal' },
  { id: 'verification', label: 'Private status' },
  { id: 'evidence', label: 'Evidence and provenance' },
  { id: 'score', label: 'Score breakdown' },
  { id: 'fit', label: 'Capital solution fit' },
  { id: 'readiness', label: 'Underwriting readiness' },
  { id: 'risks', label: 'Risks' },
  { id: 'outreach', label: 'Outreach and questions' },
  { id: 'missing', label: 'Missing information' },
  { id: 'sources', label: 'Sources' },
];

export function generateStaticParams() {
  return companySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) return { title: 'Company not found' };
  return {
    title: c.name,
    description: `${c.name}: ${c.sector}. Origination research, capital solution fit, and executive outreach based on dated public sources.`,
  };
}

function ClaimBlock({
  label,
  claim,
  sources,
}: {
  label: string;
  claim: Claim;
  sources: SourceRef[];
}) {
  const isMissing = claim.statement === NOT_DISCLOSED;
  const refs = sources.filter((s) => claim.sourceIds.includes(s.id));

  return (
    <div className="border-b border-white/[0.06] py-3 last:border-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="label">{label}</p>
        <ProvenanceBadge value={claim.provenance} />
        {claim.quantified ? <Pill>Quantified</Pill> : null}
      </div>
      <p className={`mt-1.5 text-sm leading-relaxed ${isMissing ? 'text-slate-500' : 'text-slate-200'}`}>
        {claim.statement}
      </p>
      {refs.length > 0 ? (
        <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-2xs">
          {refs.map((r) => (
            <ExternalLink key={r.id} href={r.url} className="text-slate-500 underline decoration-white/20 underline-offset-2 hover:text-slate-300">
              {r.publisher}
              {r.published !== NOT_DISCLOSED ? `, ${formatDate(r.published)}` : ''}
            </ExternalLink>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function CapitalFitCard({ company, kind }: { company: CompanyRecord; kind: 'equity' | 'debt' | 'blended' }) {
  const fit = company.capitalFit[kind];
  const cap = maxSupportableDebtFit(company);

  return (
    <div className="panel flex flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-ivory-50">{CAPITAL_FIT_LABEL[kind]}</h3>
        <RatingBar rating={fit.rating} />
      </div>
      <p className="mt-1 text-2xs text-slate-500">{fitDescriptor(fit.rating)}</p>

      {fit.drivers.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {fit.drivers.map((d) => (
            <li key={d} className="flex gap-2 text-xs leading-relaxed text-slate-300">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-500" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-xs italic text-slate-500">
          No supporting driver is evidenced in the public record.
        </p>
      )}

      <div className="mt-auto pt-3">
        <p className="label">Conditions</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{fit.conditions}</p>
        {kind === 'debt' ? (
          <p className="mt-2 rounded border border-white/[0.07] bg-navy-950/60 px-2.5 py-1.5 text-2xs leading-relaxed text-slate-500">
            Evidence cap: the public record supports a private credit fit of at most {cap} of 5 for
            this company. The rating above cannot exceed that cap.
          </p>
        ) : null}
        <p className="mt-2 text-2xs text-slate-600">
          Capital solution fit is analyst judgment, not verified fact.
        </p>
      </div>
    </div>
  );
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  const breakdown = breakdownOf(company);
  const primary = company.sources.filter((s) => s.role === 'primary');
  const corroborating = company.sources.filter((s) => s.role === 'corroborating');
  const index = companies.findIndex((c) => c.slug === company.slug);

  return (
    <PageShell>
      <ReadingProgress />

      {/* Investment snapshot */}
      <header className="border-b border-white/[0.07] pb-8">
        <p className="label">
          Company {index + 1} of {companies.length}
        </p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="font-display text-display font-semibold text-ivory-50">
              {company.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {company.sector} <span className="text-slate-600">/</span> {company.subsector}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <ClassificationBadge value={company.classification} />
              <FreshnessBadge value={company.signalFreshness} />
              <ConfidenceBadge value={company.dataConfidence} />
              <ReadinessBadge value={readinessOf(company)} />
              <Pill>{company.discoveryChannel}</Pill>
              <Pill tone="accent">{company.outreachPriority} outreach priority</Pill>
            </div>
            <p className="mt-4 text-xs">
              <ExternalLink href={company.website}>{company.website}</ExternalLink>
            </p>
          </div>

          <div className="panel-raised min-w-[13rem] px-5 py-4">
            <div className="text-right">
              <ScoreMark score={breakdown.score} size="lg" />
            </div>
            <p className="label mt-1.5 text-right">Origination priority score</p>
            <div className="mt-3">
              <ScoreBar value={breakdown.score} tone="cobalt" />
            </div>
            <p className="num mt-2.5 text-right text-2xs text-slate-500">
              {breakdown.baseScore.toFixed(1)} base
              {breakdown.confidenceModifier >= 0 ? ' + ' : ' - '}
              {Math.abs(breakdown.confidenceModifier).toFixed(1)} confidence
            </p>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10">
        <div className="min-w-0">

      {/* Snapshot */}
      <Section id="snapshot" title="Company snapshot">
        <div className="panel px-4 py-2">
          <FieldList
            fields={[
              { label: 'Official website', value: <ExternalLink href={company.website}>{company.website}</ExternalLink> },
              { label: 'Headquarters', value: company.headquarters },
              { label: 'Founded', value: String(company.foundedYear) },
              { label: 'Founders', value: company.founders.join(', ') },
              { label: 'Chief executive', value: company.ceo },
              {
                label: 'Finance leader',
                value:
                  company.financeLeader === NOT_DISCLOSED ? (
                    <span className="text-slate-500">{NOT_DISCLOSED}</span>
                  ) : (
                    company.financeLeader
                  ),
              },
              { label: 'Product', value: company.productDescription },
              { label: 'Target customer', value: company.targetCustomer },
              { label: 'Business model', value: company.businessModel },
              { label: 'Financing stage', value: company.financingStage },
              { label: 'Latest disclosed financing', value: company.latestFinancing },
              {
                label: 'Financing date',
                value:
                  company.financingDate === NOT_DISCLOSED
                    ? company.financingDate
                    : formatDate(company.financingDate),
              },
              { label: 'Total disclosed funding', value: company.totalDisclosedFunding },
              { label: 'Investors', value: company.investors.join(', ') },
              { label: 'Competitive landscape', value: company.competitiveLandscape },
            ]}
          />
        </div>
      </Section>

      {/* Private status */}
      <Section
        id="verification"
        title="Private status verification"
        description="Confirmation that the company is still privately held and independently operating as of the review date."
      >
        <div className="panel px-4 py-2">
          <ClaimBlock label="Verification" claim={company.privateStatusVerification} sources={company.sources} />
        </div>
      </Section>

      {/* Origination signal */}
      <Section id="signal" title="Origination signal">
        <div className="panel px-4 py-2">
          <FieldList
            fields={[
              { label: 'Original sourcing signal', value: company.originalSourcingSignal },
              { label: 'Discovery channel', value: company.discoveryChannel },
              { label: 'Signal date', value: formatDate(company.signalDate) },
              {
                label: 'Signal freshness',
                value: (
                  <span className="inline-flex items-center gap-2">
                    <FreshnessBadge value={company.signalFreshness} />
                    <span className="text-xs text-slate-500">
                      Measured from the review date of {formatDate(company.lastReviewed)}
                    </span>
                  </span>
                ),
              },
              { label: 'Why it entered the pipeline', value: company.whyEnteredPipeline },
              { label: 'Why it may need growth capital', value: company.whyMayNeedGrowthCapital },
              {
                label: 'Potential use of proceeds',
                value: (
                  <ul className="space-y-1">
                    {company.potentialUseOfProceeds.map((u) => (
                      <li key={u} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* Evidence */}
      <Section
        id="evidence"
        title="Evidence and provenance"
        description="Each claim carries its own provenance classification. A claim marked not sufficiently supported cannot contribute positive weight to the origination score, which the scoring engine enforces in code."
      >
        <div className="panel px-4 py-2">
          <ClaimBlock label="Customer evidence" claim={company.customerEvidence} sources={company.sources} />
          <ClaimBlock label="Commercial maturity signal" claim={company.commercialMaturitySignal} sources={company.sources} />
          <ClaimBlock label="Growth signal" claim={company.growthSignal} sources={company.sources} />
          <ClaimBlock label="Recurring revenue evidence" claim={company.recurringRevenueEvidence} sources={company.sources} />
          <ClaimBlock label="ARR or revenue evidence" claim={company.arrEvidence} sources={company.sources} />
          <ClaimBlock label="Gross margin evidence" claim={company.grossMarginEvidence} sources={company.sources} />
          <ClaimBlock label="Net revenue retention evidence" claim={company.netRevenueRetentionEvidence} sources={company.sources} />
          <ClaimBlock label="Gross retention evidence" claim={company.grossRetentionEvidence} sources={company.sources} />
          <ClaimBlock label="Capital efficiency evidence" claim={company.capitalEfficiencyEvidence} sources={company.sources} />
          <ClaimBlock label="Existing debt or credit facility" claim={company.debtEvidence} sources={company.sources} />
          <ClaimBlock label="Acquisition activity" claim={company.acquisitionActivity} sources={company.sources} />
          <ClaimBlock label="International expansion" claim={company.internationalExpansion} sources={company.sources} />
        </div>
      </Section>

      {/* Score breakdown */}
      <Section
        id="score"
        title="Origination priority score breakdown"
        description="Nine weighted factors, each a coarse 0 to 5 rating with its evidence, source, confidence, and the reason for that rating rather than the one above or below it."
      >
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[60rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th scope="col" className="px-3 py-2"><span className="label">Factor</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Rating</span></th>
                <th scope="col" className="px-3 py-2 text-right"><span className="label">Weight</span></th>
                <th scope="col" className="px-3 py-2 text-right"><span className="label">Points</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Evidence and explanation</span></th>
              </tr>
            </thead>
            <tbody>
              {breakdown.contributions.map((c) => (
                <tr key={c.key} className="border-b border-white/[0.06] align-top">
                  <td className="px-3 py-3">
                    <p className="text-xs font-semibold text-slate-100">{c.label}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <ProvenanceBadge value={c.provenance} />
                      <Pill>{c.confidence} confidence</Pill>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RatingBar rating={c.rating} />
                    {c.suppressed ? (
                      <p className="mt-1 text-2xs text-risk-400">
                        Suppressed to 0 by provenance
                      </p>
                    ) : null}
                  </td>
                  <td className="num px-3 py-3 text-right text-slate-400">{c.weight}%</td>
                  <td className="num px-3 py-3 text-right font-semibold text-slate-100">
                    {c.points.toFixed(1)}
                    <span className="text-slate-600">/{c.maxPoints}</span>
                  </td>
                  <td className="px-3 py-3">
                    <p className="text-xs leading-relaxed text-slate-300">{c.evidence}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.explanation}</p>
                    {c.sourceIds.length > 0 ? (
                      <p className="mt-1.5 flex flex-wrap gap-x-3 text-2xs">
                        {company.sources
                          .filter((s) => c.sourceIds.includes(s.id))
                          .map((s) => (
                            <ExternalLink key={s.id} href={s.url} className="text-slate-600 underline decoration-white/20 underline-offset-2 hover:text-slate-400">
                              {s.publisher}
                            </ExternalLink>
                          ))}
                      </p>
                    ) : null}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-white/[0.07]">
                <td className="px-3 py-3 text-xs font-semibold text-slate-100" colSpan={3}>
                  Base weighted score
                </td>
                <td className="num px-3 py-3 text-right font-semibold text-ivory-50">
                  {breakdown.baseScore.toFixed(1)}
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">
                  Sum of weighted factor contributions, before the confidence modifier.
                </td>
              </tr>
              <tr className="border-b border-white/[0.07]">
                <td className="px-3 py-3 text-xs font-semibold text-slate-100" colSpan={3}>
                  Data confidence modifier ({company.dataConfidence})
                </td>
                <td className="num px-3 py-3 text-right font-semibold text-ivory-50">
                  {breakdown.confidenceModifier >= 0 ? '+' : ''}
                  {breakdown.confidenceModifier.toFixed(1)}
                </td>
                <td className="px-3 py-3 text-xs text-slate-500">
                  Capped at plus or minus 3 points so that a well documented weak company cannot
                  outrank a clearly stronger one on disclosure alone.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-3 text-sm font-semibold text-ivory-50" colSpan={3}>
                  Origination priority score
                </td>
                <td className="num px-3 py-3 text-right text-base font-semibold text-cobalt-300">
                  {breakdown.score.toFixed(1)}
                </td>
                <td className="px-3 py-3" />
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Capital fit */}
      <Section
        id="fit"
        title="Capital solution fit"
        description="Three separate assessments, each rated 0 to 5. They are assessed independently: a high growth equity fit does not imply a high private credit fit, and the private credit rating is capped by what the public record can actually support."
      >
        <div className="grid gap-3 lg:grid-cols-3">
          <CapitalFitCard company={company} kind="equity" />
          <CapitalFitCard company={company} kind="debt" />
          <CapitalFitCard company={company} kind="blended" />
        </div>

        <div className="panel mt-3 px-4 py-2">
          <FieldList
            fields={[
              { label: 'Why equity may fit', value: company.whyEquityMayFit },
              { label: 'Why debt may fit', value: company.whyDebtMayFit },
              { label: 'Why blended capital may fit', value: company.whyBlendedMayFit },
              { label: 'Preliminary capital solution view', value: company.preliminaryCapitalView },
            ]}
          />
        </div>
      </Section>

      {/* Risks */}
      <Section
        id="readiness"
        title="Underwriting readiness"
        description="What the public record supports, what must come from management, what a full data room would require, and exactly what evidence would move each rating. Every status here is derived from this company evidence rather than assigned to it."
      >
        <ReadinessPanel company={company} />
      </Section>

      <Section id="risks" title="Risk assessment">
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            { label: 'Main commercial risk', value: company.mainCommercialRisk },
            { label: 'Main financial risk', value: company.mainFinancialRisk },
            { label: 'Main technology or product risk', value: company.mainTechnologyRisk },
          ].map((r) => (
            <div key={r.label} className="panel p-4">
              <p className="label">{r.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{r.value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Outreach */}
      <Section
        id="outreach"
        title="Executive outreach"
        description="Drafted against the company actual product, financing history, and publicly visible capital position. The purpose is to demonstrate executive level research and tone, not to represent an investment fund."
      >
        <div className="panel p-4">
          <p className="label">Capital value proposition</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
            {company.outreach.valueProposition}
          </p>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {company.outreach.emails.map((email) => (
            <article key={email.audience} className="panel flex flex-col p-4">
              <div className="flex items-center justify-between gap-3">
                <Pill tone="accent">{email.audience} outreach</Pill>
                <p className="text-2xs text-slate-600">Draft, not sent</p>
              </div>
              <p className="mt-2.5 text-xs text-slate-400">{email.recipientRole}</p>
              <p className="mt-2 text-xs font-semibold text-slate-100">
                Subject: {email.subject}
              </p>
              <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-slate-300">
                {email.body}
              </pre>
            </article>
          ))}
        </div>

        {company.outreach.emails.length === 1 ? (
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            No chief financial officer or equivalent finance leader is publicly disclosed for{' '}
            {company.name}, so no finance leader outreach has been drafted. Writing to an unnamed or
            assumed finance contact would be inventing a counterparty.
          </p>
        ) : null}

        <div className="panel mt-3 p-4">
          <p className="label">Key qualification questions</p>
          <ol className="mt-2 space-y-2">
            {company.qualificationQuestions.map((q, i) => (
              <li key={q} className="flex gap-2.5 text-xs leading-relaxed text-slate-300">
                <span className="num shrink-0 text-cobalt-400">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-white/[0.07] pt-3">
            <p className="label">Next diligence step</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{company.nextDiligenceStep}</p>
          </div>
        </div>
      </Section>

      {/* Missing information */}
      <Section
        id="missing"
        title="Missing information"
        description="What public sources do not disclose. These gaps reduce data confidence. They are never filled with an estimate, and they never become a fabricated negative fact."
      >
        <div className="panel p-4">
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {company.missingInformation.map((m) => (
              <li key={m} className="flex gap-2 text-xs text-slate-400">
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-risk-600" />
                <span>
                  {m}: <span className="text-slate-500">{NOT_DISCLOSED}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Sources */}
      <Section
        id="sources"
        title="Sources"
        description="Primary sources are first party. Corroborating sources are independent. A press release reproduction is marked as such because it is not independent verification."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            { title: 'Primary sources', list: primary },
            { title: 'Corroborating sources', list: corroborating },
          ].map((group) => (
            <div key={group.title} className="panel p-4">
              <h3 className="text-sm font-semibold text-slate-100">
                {group.title} <span className="num text-slate-600">({group.list.length})</span>
              </h3>
              <ul className="mt-3 space-y-3">
                {group.list.map((s) => (
                  <li key={s.id} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <ExternalLink href={s.url} className="text-xs font-medium text-cobalt-300 hover:text-cobalt-200">
                      {s.title}
                    </ExternalLink>
                    <p className="mt-1 text-2xs text-slate-500">
                      {s.publisher}
                      {s.published !== NOT_DISCLOSED ? ` · ${formatDate(s.published)}` : ' · undated'}
                      {s.isPressReleaseReproduction ? ' · press release reproduction, not independent verification' : ''}
                    </p>
                  </li>
                ))}
              </ul>
              {group.list.length === 0 ? (
                <p className="mt-3 text-xs text-slate-500">None recorded.</p>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-3 text-2xs text-slate-600">
          Last reviewed {formatDate(company.lastReviewed)}. Data confidence: {company.dataConfidence}.
        </p>
      </Section>

          <div className="mt-12">
            <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
          </div>
        </div>

        {/* Sticky section navigation, desktop only. */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-14">
            <SectionNav sections={SECTIONS} />
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
