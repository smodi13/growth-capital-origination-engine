import type { Metadata } from 'next';
import {
  blendedCapitalCase,
  blendedCaseAssumptions,
  creditCaseAssumptions,
  downsideOutcomes,
  exitMultipleSensitivity,
  growthEquityCase,
  growthSensitivity,
  HYPOTHETICAL_DISCLOSURE,
  HYPOTHETICAL_LONG_DISCLOSURE,
  HYPOTHETICAL_NAME,
  ILLUSTRATIVE_FOOTER,
  interestRateSensitivity,
  privateCreditCase,
  recommendation,
  retentionSensitivity,
  structures,
  transactionAssumptions,
  type DebtYear,
  type StructureResult,
} from '@/data/hypothetical';
import { DisclosureBanner, PageHeader, PageShell, Section } from '@/components/primitives';
import { SectionNav } from '@/components/SectionNav';
import { ReadingProgress } from '@/components/motion';
import { DataTable, type Column } from '@/components/DataTable';

export const metadata: Metadata = {
  title: 'Structure comparison',
  description:
    'Growth equity, private credit, and blended capital compared on the same hypothetical company: dilution, debt service, covenant headroom, runway, and investor returns.',
};

const p = (n: number, dp = 1) => `${(n * 100).toFixed(dp)}%`;
const m = (n: number, dp = 1) => `${n < 0 ? '(' : ''}${Math.abs(n).toFixed(dp)}${n < 0 ? ')' : ''}`;

const debtColumns: Column<DebtYear>[] = [
  { key: 'y', header: 'Year', render: (r) => `Year ${r.year}`, emphasis: true },
  { key: 'ob', header: 'Opening balance', align: 'right', render: (r) => m(r.openingBalance) },
  { key: 'ci', header: 'Cash interest', align: 'right', render: (r) => m(r.cashInterest, 2) },
  { key: 'pik', header: 'PIK interest', align: 'right', render: (r) => m(r.pikInterest, 2) },
  { key: 'am', header: 'Amortisation', align: 'right', render: (r) => m(r.amortisation, 2) },
  { key: 'ds', header: 'Debt service', align: 'right', render: (r) => m(r.debtService, 2), emphasis: true },
  { key: 'cb', header: 'Closing balance', align: 'right', render: (r) => m(r.closingBalance) },
  { key: 'lev', header: 'Debt / ending ARR', align: 'right', render: (r) => `${r.leverageArr.toFixed(2)}x` },
  { key: 'ic', header: 'Interest coverage', align: 'right', render: (r) => `${r.interestCoverage.toFixed(2)}x` },
  { key: 'dscr', header: 'DSCR', align: 'right', render: (r) => `${r.dscr.toFixed(2)}x` },
];

function CashSchedule({ s }: { s: StructureResult }) {
  return (
    <DataTable
      minWidth="46rem"
      rowKey={(r) => String(r.year)}
      rows={s.cash}
      caption={`Cash roll forward for ${s.label}`}
      footnote={`USD millions. Figures in parentheses are negative. Minimum cash covenant is USD ${transactionAssumptions.minimumCashCovenant.toFixed(1)} million. ${ILLUSTRATIVE_FOOTER}`}
      columns={[
        { key: 'y', header: 'Year', render: (r) => `Year ${r.year}`, emphasis: true },
        { key: 'op', header: 'Opening cash', align: 'right', render: (r) => m(r.opening) },
        { key: 'fcf', header: 'Unlevered free cash flow', align: 'right', render: (r) => m(r.unleveredFcf) },
        { key: 'ci', header: 'Cash interest', align: 'right', render: (r) => (r.cashInterest === 0 ? '0.0' : `(${r.cashInterest.toFixed(2)})`) },
        { key: 'am', header: 'Amortisation', align: 'right', render: (r) => (r.amortisation === 0 ? '0.0' : `(${r.amortisation.toFixed(2)})`) },
        { key: 'cl', header: 'Closing cash', align: 'right', render: (r) => m(r.closing), emphasis: true },
        {
          key: 'cov',
          header: 'Covenant',
          align: 'right',
          render: (r) =>
            r.breachesMinimumCash ? (
              <span className="rounded border border-risk-500/40 bg-risk-700/22 px-1.5 py-0.5 text-2xs text-risk-200">
                Breach
              </span>
            ) : (
              <span className="text-slate-600">Headroom</span>
            ),
        },
      ]}
    />
  );
}


const SECTIONS = [
  { id: 'comparison', label: 'Side by side' },
  { id: 'equity', label: 'Growth equity case' },
  { id: 'credit', label: 'Private credit case' },
  { id: 'blended', label: 'Blended capital case' },
  { id: 'sensitivities', label: 'Sensitivities' },
  { id: 'recommendation', label: 'Recommendation' },
];

export default function StructuresPage() {
  const comparison = [
    { label: 'New equity invested', get: (s: StructureResult) => (s.equityInvested === 0 ? 'None' : `USD ${s.equityInvested.toFixed(1)}m`) },
    { label: 'Debt principal', get: (s: StructureResult) => (s.debtPrincipal === 0 ? 'None' : `USD ${s.debtPrincipal.toFixed(1)}m`) },
    { label: 'Pre-money valuation', get: (s: StructureResult) => `USD ${s.preMoneyValuation.toFixed(1)}m` },
    { label: 'Post-money valuation', get: (s: StructureResult) => `USD ${s.postMoneyValuation.toFixed(1)}m` },
    { label: 'Investor ownership', get: (s: StructureResult) => (s.investorOwnership === 0 ? 'None' : p(s.investorOwnership)) },
    { label: 'Founder and existing holder dilution', get: (s: StructureResult) => (s.founderDilution === 0 ? 'None' : p(s.founderDilution)) },
    { label: 'Cash at close', get: (s: StructureResult) => `USD ${s.cashAtClose.toFixed(1)}m` },
    { label: 'Lowest cash balance', get: (s: StructureResult) => `USD ${s.lowestCash.toFixed(1)}m` },
    { label: 'Minimum cash covenant breach', get: (s: StructureResult) => (s.minimumCashBreachYear === null ? 'None' : `Year ${s.minimumCashBreachYear}`) },
    { label: 'Year five ending cash', get: (s: StructureResult) => `USD ${s.endingCash.toFixed(1)}m` },
    { label: 'Year five ending debt', get: (s: StructureResult) => `USD ${s.endingDebt.toFixed(1)}m` },
    { label: 'Exit enterprise value', get: (s: StructureResult) => `USD ${s.exitEnterpriseValue.toFixed(1)}m` },
    { label: 'Exit equity value', get: (s: StructureResult) => `USD ${s.exitEquityValue.toFixed(1)}m` },
    { label: 'Equity investor proceeds', get: (s: StructureResult) => (s.equityInvested === 0 ? 'n/a' : `USD ${s.equityInvestorProceeds.toFixed(1)}m`) },
    { label: 'Equity investor MOIC', get: (s: StructureResult) => (s.equityInvested === 0 ? 'n/a' : `${s.equityMoic.toFixed(2)}x`) },
    { label: 'Equity investor IRR', get: (s: StructureResult) => (s.equityInvested === 0 ? 'n/a' : p(s.equityIrr)) },
    { label: 'Debt investor MOIC', get: (s: StructureResult) => (s.debtInvestorMoic === null ? 'n/a' : `${s.debtInvestorMoic.toFixed(2)}x`) },
    { label: 'Debt investor IRR', get: (s: StructureResult) => (s.debtInvestorIrr === null ? 'n/a' : p(s.debtInvestorIrr)) },
    { label: 'Downside case ending cash', get: (s: StructureResult) => { const o = downsideOutcomes.find((d) => d.label === s.label); return o ? `USD ${o.endingCash.toFixed(1)}m` : 'n/a'; } },
    { label: 'Survives the downside case', get: (s: StructureResult) => { const o = downsideOutcomes.find((d) => d.label === s.label); return o ? (o.survivesFiveYears ? 'Yes' : 'No') : 'n/a'; } },
  ];

  return (
    <PageShell>
      <ReadingProgress />
      <PageHeader
        eyebrow="Equity, debt, and blended structure comparison"
        title="The same USD 20 million, three ways"
        lede={`Growth equity, private credit, and blended capital applied to ${HYPOTHETICAL_NAME}. The operating forecast is identical across all three, so every difference below is caused by the structure rather than by the business.`}
      />

      <div className="mt-6">
        <DisclosureBanner tone="warning">{HYPOTHETICAL_DISCLOSURE}</DisclosureBanner>
      </div>

      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-14">
            <SectionNav sections={SECTIONS} />
          </div>
        </aside>
        <div className="min-w-0">

      <Section id="comparison" title="Side by side comparison">
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th scope="col" className="px-3 py-2"><span className="label">Metric</span></th>
                {structures.map((s) => (
                  <th key={s.key} scope="col" className="px-3 py-2 text-right">
                    <span className={`label ${s.key === 'blended' ? 'text-cobalt-400' : ''}`}>
                      {s.label}
                      {s.key === 'blended' ? ' (recommended)' : ''}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-white/[0.06]">
                  <td className="px-3 py-2.5 text-xs text-slate-400">{row.label}</td>
                  {structures.map((s) => (
                    <td
                      key={s.key}
                      className={`num px-3 py-2.5 text-right ${
                        s.key === 'blended' ? 'font-semibold text-cobalt-200' : 'text-slate-200'
                      }`}
                    >
                      {row.get(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-2xs text-slate-600">{ILLUSTRATIVE_FOOTER}</p>
      </Section>

      {/* Growth equity */}
      <Section
        id="equity"
        title="Growth equity case"
        description={`USD ${growthEquityCase.equityInvested.toFixed(1)} million of primary equity at a USD ${growthEquityCase.preMoneyValuation.toFixed(1)} million pre-money valuation, being ${transactionAssumptions.entryArrMultiple.toFixed(1)}x beginning ARR.`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Investor ownership', p(growthEquityCase.investorOwnership)],
            ['Founder dilution', p(growthEquityCase.founderDilution)],
            ['Equity MOIC', `${growthEquityCase.equityMoic.toFixed(2)}x`],
            ['Equity IRR', p(growthEquityCase.equityIrr)],
          ].map(([k, v]) => (
            <div key={k} className="panel px-4 py-3">
              <p className="label">{k}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-ivory-50">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <CashSchedule s={growthEquityCase} />
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-400">
          The all equity structure is the safest and the most expensive. It never approaches the
          minimum cash covenant and survives the downside case comfortably, but it costs existing
          holders {p(growthEquityCase.founderDilution)} of the company to achieve that.
        </p>
      </Section>

      {/* Private credit */}
      <Section
        id="credit"
        title="Private credit case"
        description={`USD ${creditCaseAssumptions.principal.toFixed(1)} million senior secured, ${p(creditCaseAssumptions.cashInterestRate)} cash interest, ${creditCaseAssumptions.maturityYears} year maturity, ${creditCaseAssumptions.interestOnlyYears} years interest only, then ${p(creditCaseAssumptions.amortisationPctOfPrincipal)} of original principal amortising annually, with ${p(creditCaseAssumptions.originalIssueDiscount)} original issue discount and no PIK in the base case.`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Annual cash interest', `USD ${(creditCaseAssumptions.principal * creditCaseAssumptions.cashInterestRate).toFixed(2)}m`],
            ['Year five ending balance', `USD ${privateCreditCase.endingDebt.toFixed(1)}m`],
            ['Debt investor MOIC', `${privateCreditCase.debtInvestorMoic?.toFixed(2)}x`],
            ['Debt investor IRR', p(privateCreditCase.debtInvestorIrr ?? 0)],
          ].map(([k, v]) => (
            <div key={k} className="panel px-4 py-3">
              <p className="label">{k}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-ivory-50">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <DataTable
            columns={debtColumns}
            rows={privateCreditCase.debt ?? []}
            rowKey={(r) => String(r.year)}
            minWidth="72rem"
            caption="Private credit debt schedule"
            footnote={`USD millions. Interest coverage is EBITDA divided by cash interest and is negative while EBITDA is negative. DSCR is EBITDA less capital expenditure divided by total debt service. ${ILLUSTRATIVE_FOOTER}`}
          />
        </div>

        <div className="mt-4">
          <CashSchedule s={privateCreditCase} />
        </div>

        <div className="mt-4 rounded-md border border-risk-500/40 bg-risk-700/15 p-4">
          <p className="text-xs font-semibold text-risk-200">The all debt structure does not work</p>
          <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-risk-200/85">
            Interest coverage is negative in every year until year five because EBITDA is negative,
            and debt service coverage never approaches 1.0x. Cash falls to USD{' '}
            {privateCreditCase.lowestCash.toFixed(1)} million and breaches the USD{' '}
            {transactionAssumptions.minimumCashCovenant.toFixed(1)} million minimum cash covenant in
            year {privateCreditCase.minimumCashBreachYear}. A USD{' '}
            {privateCreditCase.endingDebt.toFixed(1)} million balance remains at maturity against a
            business generating USD {structures[0].cash[4].unleveredFcf.toFixed(1)} million of
            unlevered free cash flow, so refinancing risk is material rather than theoretical. In the
            downside case the company runs out of cash entirely.
          </p>
        </div>
      </Section>

      {/* Blended */}
      <Section
        id="blended"
        title="Blended capital case"
        description={`USD ${blendedCaseAssumptions.equityComponent.toFixed(1)} million of primary equity alongside a USD ${blendedCaseAssumptions.debtComponent.toFixed(1)} million senior secured facility at ${p(blendedCaseAssumptions.cashInterestRate)} cash interest, ${blendedCaseAssumptions.interestOnlyYears} years interest only, then ${p(blendedCaseAssumptions.amortisationPctOfPrincipal)} of original principal amortising annually, with ${p(blendedCaseAssumptions.originalIssueDiscount)} original issue discount.`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Founder dilution', p(blendedCapitalCase.founderDilution)],
            ['Equity MOIC', `${blendedCapitalCase.equityMoic.toFixed(2)}x`],
            ['Equity IRR', p(blendedCapitalCase.equityIrr)],
            ['Debt investor IRR', p(blendedCapitalCase.debtInvestorIrr ?? 0)],
          ].map(([k, v]) => (
            <div key={k} className="panel px-4 py-3">
              <p className="label">{k}</p>
              <p className="mt-1 font-mono text-lg font-semibold text-cobalt-200">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <DataTable
            columns={debtColumns}
            rows={blendedCapitalCase.debt ?? []}
            rowKey={(r) => String(r.year)}
            minWidth="72rem"
            caption="Blended capital debt schedule"
            footnote={`USD millions. ${ILLUSTRATIVE_FOOTER}`}
          />
        </div>

        <div className="mt-4">
          <CashSchedule s={blendedCapitalCase} />
        </div>

        <div className="mt-4 rounded-md border border-cobalt-600/40 bg-cobalt-700/15 p-4">
          <p className="text-xs font-semibold text-cobalt-200">Combined company cash impact</p>
          <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-cobalt-100/80">
            The blended structure raises the same USD {transactionAssumptions.capitalRaised.toFixed(1)}{' '}
            million while diluting existing holders by {p(blendedCapitalCase.founderDilution)} rather
            than {p(growthEquityCase.founderDilution)}, a saving of{' '}
            {p(growthEquityCase.founderDilution - blendedCapitalCase.founderDilution)}. Total cash
            interest paid over five years is USD{' '}
            {(blendedCapitalCase.debt ?? []).reduce((s, d) => s + d.cashInterest, 0).toFixed(1)}{' '}
            million, and the company still ends year five with USD{' '}
            {blendedCapitalCase.endingCash.toFixed(1)} million of cash and never breaches the minimum
            cash covenant. The equity investor earns a higher MOIC of{' '}
            {blendedCapitalCase.equityMoic.toFixed(2)}x against{' '}
            {growthEquityCase.equityMoic.toFixed(2)}x, because a smaller cheque is exposed to the
            same enterprise value appreciation.
          </p>
        </div>
      </Section>

      {/* Sensitivities */}
      <Section
        id="sensitivities"
        title="Sensitivities"
        description="Each table holds everything else constant and moves a single driver, so the effect is attributable."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Exit multiple sensitivity</h3>
            <p className="mt-1 text-2xs text-slate-500">
              Blended capital equity investor outcomes across exit ARR multiples.
            </p>
            <table className="mt-3 w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="py-1.5"><span className="label">Exit multiple</span></th>
                  <th className="py-1.5 text-right"><span className="label">Equity value</span></th>
                  <th className="py-1.5 text-right"><span className="label">MOIC</span></th>
                  <th className="py-1.5 text-right"><span className="label">IRR</span></th>
                </tr>
              </thead>
              <tbody>
                {exitMultipleSensitivity(blendedCapitalCase).map((r) => (
                  <tr key={r.multiple} className="border-b border-white/[0.07]/50">
                    <td className="num py-1.5 text-slate-300">{r.multiple.toFixed(1)}x</td>
                    <td className="num py-1.5 text-right text-slate-300">{r.equityValue.toFixed(1)}</td>
                    <td className="num py-1.5 text-right font-semibold text-slate-100">{r.moic.toFixed(2)}x</td>
                    <td className="num py-1.5 text-right text-slate-300">{p(r.irr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">ARR growth sensitivity</h3>
            <p className="mt-1 text-2xs text-slate-500">
              Year one growth varied, with the same annual decay applied thereafter.
            </p>
            <table className="mt-3 w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="py-1.5"><span className="label">Year one growth</span></th>
                  <th className="py-1.5 text-right"><span className="label">Year five ARR</span></th>
                  <th className="py-1.5 text-right"><span className="label">Exit EV at 7.0x</span></th>
                </tr>
              </thead>
              <tbody>
                {growthSensitivity().map((r) => (
                  <tr key={r.rate} className="border-b border-white/[0.07]/50">
                    <td className="num py-1.5 text-slate-300">{p(r.rate, 0)}</td>
                    <td className="num py-1.5 text-right font-semibold text-slate-100">{r.endingArr.toFixed(1)}</td>
                    <td className="num py-1.5 text-right text-slate-300">{r.exitEvAt7x.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Retention sensitivity</h3>
            <p className="mt-1 text-2xs text-slate-500">
              Net revenue retention varied while holding the ARR growth target fixed. Lower retention
              means more new ARR must be sold to reach the same ending ARR.
            </p>
            <table className="mt-3 w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="py-1.5"><span className="label">Net revenue retention</span></th>
                  <th className="py-1.5 text-right"><span className="label">Year one new ARR required</span></th>
                </tr>
              </thead>
              <tbody>
                {retentionSensitivity().map((r) => (
                  <tr key={r.nrr} className="border-b border-white/[0.07]/50">
                    <td className="num py-1.5 text-slate-300">{p(r.nrr, 0)}</td>
                    <td className="num py-1.5 text-right font-semibold text-slate-100">{r.newArrYear1.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Interest rate sensitivity</h3>
            <p className="mt-1 text-2xs text-slate-500">
              Applied to the USD {blendedCaseAssumptions.debtComponent.toFixed(1)} million blended
              facility, showing where the minimum cash covenant starts to bind.
            </p>
            <table className="mt-3 w-full text-left">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="py-1.5"><span className="label">Cash interest rate</span></th>
                  <th className="py-1.5 text-right"><span className="label">Annual interest</span></th>
                  <th className="py-1.5 text-right"><span className="label">Lowest cash</span></th>
                  <th className="py-1.5 text-right"><span className="label">Breach</span></th>
                </tr>
              </thead>
              <tbody>
                {interestRateSensitivity().map((r) => (
                  <tr key={r.rate} className="border-b border-white/[0.07]/50">
                    <td className="num py-1.5 text-slate-300">{p(r.rate, 0)}</td>
                    <td className="num py-1.5 text-right text-slate-300">{r.annualCashInterest.toFixed(2)}</td>
                    <td className="num py-1.5 text-right font-semibold text-slate-100">{r.lowestCash.toFixed(1)}</td>
                    <td className="num py-1.5 text-right text-slate-300">
                      {r.breachYear === null ? 'None' : `Year ${r.breachYear}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-2xs text-slate-600">USD millions. {ILLUSTRATIVE_FOOTER}</p>
      </Section>

      <Section id="recommendation" title="Recommendation">
        <div className="panel p-5">
          <h3 className="text-lg font-semibold text-cobalt-300">{recommendation.structure}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200">{recommendation.headline}</p>
          <ul className="mt-4 space-y-3">
            {recommendation.reasons.map((r) => (
              <li key={r.title} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                <span className="label pt-0.5">{r.title}</span>
                <span className="text-xs leading-relaxed text-slate-300">{r.detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-md border border-caution-500/40 bg-caution-700/15 p-3.5">
            <p className="text-xs font-semibold text-caution-100">Where this conclusion could be wrong</p>
            <p className="mt-1.5 text-xs leading-relaxed text-caution-100/85">{recommendation.caveat}</p>
          </div>
        </div>
      </Section>

        <div className="mt-12">
          <DisclosureBanner tone="warning">{HYPOTHETICAL_LONG_DISCLOSURE}</DisclosureBanner>
        </div>
        </div>
      </div>
    </PageShell>
  );
}
