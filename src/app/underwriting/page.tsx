import type { Metadata } from 'next';
import Link from 'next/link';
import {
  assumptions,
  blendedCapitalCase,
  breakEven,
  downsideForecast,
  downsideAssumptions,
  downsideOutcomes,
  forecast,
  growthEquityCase,
  HYPOTHETICAL_DISCLOSURE,
  HYPOTHETICAL_LONG_DISCLOSURE,
  HYPOTHETICAL_NAME,
  hypotheticalProfile,
  ILLUSTRATIVE_FOOTER,
  privateCreditCase,
  recommendation,
  transactionAssumptions,
} from '@/data/hypothetical';
import { DisclosureBanner, PageHeader, Section, StatTile, PageShell} from '@/components/primitives';
import { DataTable, type Column } from '@/components/DataTable';
import { DOWNLOADS } from '@/lib/site';
import type { ForecastYear, DownsideYear } from '@/data/hypothetical';

export const metadata: Metadata = {
  title: 'Hypothetical underwriting case',
  description:
    'An illustrative SaaS underwriting case for a hypothetical company, covering the ARR bridge, operating forecast, SaaS quality metrics, cash runway, and downside analysis.',
};

const m = (n: number, dp = 1) => `${n < 0 ? '(' : ''}${Math.abs(n).toFixed(dp)}${n < 0 ? ')' : ''}`;
const p = (n: number, dp = 0) => `${(n * 100).toFixed(dp)}%`;

const arrBridgeColumns: Column<ForecastYear>[] = [
  { key: 'y', header: 'Year', render: (r) => r.label, emphasis: true },
  { key: 'beg', header: 'Beginning ARR', align: 'right', render: (r) => m(r.beginningArr) },
  { key: 'new', header: 'New ARR', align: 'right', render: (r) => m(r.newArr) },
  { key: 'exp', header: 'Expansion ARR', align: 'right', render: (r) => m(r.expansionArr) },
  { key: 'chn', header: 'Churned ARR', align: 'right', render: (r) => `(${r.churnedArr.toFixed(1)})` },
  { key: 'end', header: 'Ending ARR', align: 'right', render: (r) => m(r.endingArr), emphasis: true },
  { key: 'g', header: 'ARR growth', align: 'right', render: (r) => p(r.arrGrowth) },
];

const opColumns: Column<ForecastYear>[] = [
  { key: 'y', header: 'Year', render: (r) => r.label, emphasis: true },
  { key: 'rev', header: 'Revenue', align: 'right', render: (r) => m(r.revenue) },
  { key: 'gp', header: 'Gross profit', align: 'right', render: (r) => m(r.grossProfit) },
  { key: 'sm', header: 'Sales and marketing', align: 'right', render: (r) => m(r.salesMarketing) },
  { key: 'rd', header: 'Research and development', align: 'right', render: (r) => m(r.researchDevelopment) },
  { key: 'ga', header: 'General and administrative', align: 'right', render: (r) => m(r.generalAdmin) },
  { key: 'eb', header: 'EBITDA', align: 'right', render: (r) => m(r.ebitda), emphasis: true },
  { key: 'fcf', header: 'Unlevered free cash flow', align: 'right', render: (r) => m(r.unleveredFcf) },
];

const saasColumns: Column<ForecastYear>[] = [
  { key: 'y', header: 'Year', render: (r) => r.label, emphasis: true },
  { key: 'g', header: 'ARR growth', align: 'right', render: (r) => p(r.arrGrowth) },
  { key: 'nrr', header: 'Net revenue retention', align: 'right', render: () => p(assumptions.netRevenueRetention) },
  { key: 'grr', header: 'Gross retention', align: 'right', render: () => p(assumptions.grossRetention) },
  { key: 'gm', header: 'Gross margin', align: 'right', render: () => p(assumptions.grossMargin) },
  { key: 'cac', header: 'CAC payback (months)', align: 'right', render: (r) => r.cacPaybackMonths.toFixed(1) },
  { key: 'bm', header: 'Burn multiple', align: 'right', render: (r) => (r.burnMultiple === null ? 'n/a' : r.burnMultiple.toFixed(2)) },
  { key: 'r40', header: 'Rule of 40', align: 'right', render: (r) => r.ruleOf40.toFixed(0), emphasis: true },
  { key: 'cust', header: 'Customers', align: 'right', render: (r) => String(r.customerCount) },
  { key: 'acv', header: 'Average contract value (USD k)', align: 'right', render: (r) => r.averageContractValue.toFixed(0) },
  { key: 'rpc', header: 'Revenue per customer (USD k)', align: 'right', render: (r) => r.revenuePerCustomer.toFixed(0) },
];

const downsideColumns: Column<DownsideYear>[] = [
  { key: 'y', header: 'Year', render: (r) => `Year ${r.year}`, emphasis: true },
  { key: 'arr', header: 'Ending ARR', align: 'right', render: (r) => m(r.endingArr) },
  { key: 'rev', header: 'Revenue', align: 'right', render: (r) => m(r.revenue) },
  { key: 'eb', header: 'EBITDA', align: 'right', render: (r) => m(r.ebitda), emphasis: true },
  { key: 'fcf', header: 'Unlevered free cash flow', align: 'right', render: (r) => m(r.unleveredFcf) },
];

export default function UnderwritingPage() {
  const y5 = forecast[forecast.length - 1];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Hypothetical SaaS underwriting case"
        title={HYPOTHETICAL_NAME}
        lede={hypotheticalProfile.description}
      />

      <div className="mt-6">
        <DisclosureBanner tone="warning">{HYPOTHETICAL_DISCLOSURE}</DisclosureBanner>
      </div>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Beginning ARR" value={`USD ${assumptions.beginningArr.toFixed(1)}m`} sub="Illustrative" />
        <StatTile label="Year one ARR growth" value={p(assumptions.growthYear1)} sub={`Declining ${p(assumptions.growthDecay)} per year`} />
        <StatTile label="Net revenue retention" value={p(assumptions.netRevenueRetention)} sub={`Gross retention ${p(assumptions.grossRetention)}`} />
        <StatTile label="Capital requirement" value={`USD ${hypotheticalProfile.capitalNeed.toFixed(1)}m`} sub="Including refinancing existing debt" />
      </section>

      <Section title="Case assumptions" description="Every assumption below is an editable input in the Excel model rather than a hardcoded output.">
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Operating assumptions</h3>
            <dl className="mt-3 divide-y divide-white/[0.06]">
              {[
                ['Beginning ARR', `USD ${assumptions.beginningArr.toFixed(1)} million`],
                ['Year one ARR growth', p(assumptions.growthYear1)],
                ['Annual growth decay', `${p(assumptions.growthDecay)} per year`],
                ['Net revenue retention', p(assumptions.netRevenueRetention)],
                ['Gross retention', p(assumptions.grossRetention)],
                ['Gross margin', p(assumptions.grossMargin)],
                ['Sales and marketing', `${p(assumptions.salesMarketingPct[0])} of revenue declining to ${p(assumptions.salesMarketingPct[4])}`],
                ['Research and development', `${p(assumptions.researchDevelopmentPct[0])} of revenue declining to ${p(assumptions.researchDevelopmentPct[4])}`],
                ['General and administrative', `${p(assumptions.generalAdminPct[0])} of revenue declining to ${p(assumptions.generalAdminPct[4])}`],
                ['Beginning cash', `USD ${assumptions.beginningCash.toFixed(1)} million`],
                ['Existing debt', `USD ${assumptions.existingDebt.toFixed(1)} million`],
                ['Customer count at year zero', String(assumptions.customerCountYear0)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-xs text-slate-400">{k}</dt>
                  <dd className="num text-right text-slate-100">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel p-4">
            <h3 className="text-sm font-semibold text-slate-100">Illustrative use of proceeds</h3>
            <ul className="mt-3 space-y-2">
              {hypotheticalProfile.useOfProceeds.map((u) => (
                <li key={u} className="flex gap-2 text-xs leading-relaxed text-slate-300">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cobalt-500" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 border-t border-white/[0.07] pt-4 text-sm font-semibold text-slate-100">
              Transaction assumptions
            </h3>
            <dl className="mt-3 divide-y divide-white/[0.06]">
              {[
                ['Capital raised', `USD ${transactionAssumptions.capitalRaised.toFixed(1)} million`],
                ['Existing debt refinanced at close', `USD ${transactionAssumptions.refinanceExistingDebt.toFixed(1)} million`],
                ['Entry ARR multiple', `${transactionAssumptions.entryArrMultiple.toFixed(1)}x`],
                ['Exit ARR multiple', `${transactionAssumptions.exitArrMultiple.toFixed(1)}x`],
                ['Minimum cash covenant', `USD ${transactionAssumptions.minimumCashCovenant.toFixed(1)} million`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-xs text-slate-400">{k}</dt>
                  <dd className="num text-right text-slate-100">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section
        title="ARR bridge"
        description="Churn and expansion are set by the retention assumptions. New ARR is the residual required to reach the growth target, which makes the sales requirement explicit rather than assumed."
      >
        <DataTable
          columns={arrBridgeColumns}
          rows={forecast}
          rowKey={(r) => r.label}
          caption="ARR bridge in USD millions"
          footnote={`USD millions. ${ILLUSTRATIVE_FOOTER}`}
        />
      </Section>

      <Section
        title="Operating forecast"
        description="Revenue is the average of beginning and ending ARR, reflecting that ARR is added through the year rather than on day one."
      >
        <DataTable
          columns={opColumns}
          rows={forecast}
          rowKey={(r) => r.label}
          minWidth="56rem"
          caption="Operating forecast in USD millions"
          footnote={`USD millions. Figures in parentheses are negative. ${ILLUSTRATIVE_FOOTER}`}
        />
      </Section>

      <Section
        title="SaaS quality metrics"
        description="The metrics a growth capital or private credit investor tests first. CAC payback is blended, charging sales and marketing against gross profit on new plus expansion ARR."
      >
        <DataTable
          columns={saasColumns}
          rows={forecast}
          rowKey={(r) => r.label}
          minWidth="68rem"
          caption="SaaS quality metrics"
          footnote={ILLUSTRATIVE_FOOTER}
        />

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          <div className="panel p-4">
            <p className="label">Where the case is strong</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Net revenue retention of {p(assumptions.netRevenueRetention)} against gross retention of{' '}
              {p(assumptions.grossRetention)} means the installed base grows without new logos, and
              the burn multiple improves every year from {forecast[0].burnMultiple?.toFixed(2)} to{' '}
              {forecast[3].burnMultiple?.toFixed(2)}. Capital is buying progressively more ARR.
            </p>
          </div>
          <div className="panel p-4">
            <p className="label">Where the case is weak</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Rule of 40 begins at {forecast[0].ruleOf40.toFixed(0)} and only reaches{' '}
              {y5.ruleOf40.toFixed(0)} by year five. Gross retention of {p(assumptions.grossRetention)}{' '}
              implies {p(1 - assumptions.grossRetention)} of the base is lost annually, which is the
              single assumption most worth challenging in diligence.
            </p>
          </div>
          <div className="panel p-4">
            <p className="label">Break even</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              At the year five cost structure, operating expenses run{' '}
              {p(breakEven.year5OpexPctOfRevenue)} of revenue against a {p(assumptions.grossMargin)}{' '}
              gross margin, giving a contribution margin of {p(breakEven.contributionMargin)}. EBITDA
              turns positive in year five at USD {y5.ebitda.toFixed(1)} million.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Downside case"
        description={`Growth of ${p(downsideAssumptions.growthYear1)} rather than ${p(assumptions.growthYear1)}, net revenue retention of ${p(downsideAssumptions.netRevenueRetention)}, gross retention of ${p(downsideAssumptions.grossRetention)}, gross margin of ${p(downsideAssumptions.grossMargin)}, and sales and marketing that does not fall as quickly when growth disappoints.`}
      >
        <DataTable
          columns={downsideColumns}
          rows={downsideForecast}
          rowKey={(r) => String(r.year)}
          caption="Downside operating case in USD millions"
          footnote={`USD millions. Figures in parentheses are negative. ${ILLUSTRATIVE_FOOTER}`}
        />

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {downsideOutcomes.map((o) => (
            <div key={o.label} className="panel p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-ivory-50">{o.label}</p>
                <span
                  className={`rounded border px-1.5 py-0.5 text-2xs font-medium ${
                    o.survivesFiveYears
                      ? 'border-positive-500/40 bg-positive-700/25 text-positive-200'
                      : 'border-risk-500/40 bg-risk-700/22 text-risk-200'
                  }`}
                >
                  {o.survivesFiveYears ? 'Survives 5 years' : 'Runs out of cash'}
                </span>
              </div>
              <dl className="mt-3 space-y-1.5">
                <div className="flex justify-between gap-3">
                  <dt className="text-xs text-slate-400">Ending cash</dt>
                  <dd className="num text-slate-100">USD {o.endingCash.toFixed(1)}m</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-xs text-slate-400">Minimum cash breach</dt>
                  <dd className="num text-slate-100">
                    {o.breachYear === null ? 'None' : `Year ${o.breachYear}`}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-400">
          The downside case is what separates the three structures. Under all equity the company
          still ends year five with USD {downsideOutcomes[0].endingCash.toFixed(1)} million of cash.
          Under the all debt structure it runs out entirely, ending at USD{' '}
          {downsideOutcomes[1].endingCash.toFixed(1)} million. The blended structure survives but
          only just, at USD {downsideOutcomes[2].endingCash.toFixed(1)} million, and it breaches the
          minimum cash covenant in year {downsideOutcomes[2].breachYear}. That is the honest boundary
          of the recommendation rather than a footnote to it.
        </p>
      </Section>

      <Section title="Preliminary recommendation">
        <div className="panel p-5">
          <p className="label">Recommended illustrative structure</p>
          <h3 className="mt-1.5 text-lg font-semibold text-cobalt-300">{recommendation.structure}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-200">
            {recommendation.headline}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommendation.reasons.map((r) => (
              <div key={r.title} className="rounded-md border border-white/[0.07] bg-navy-950/50 p-3.5">
                <p className="text-xs font-semibold text-slate-100">{r.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{r.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-caution-500/40 bg-caution-700/15 p-3.5">
            <p className="text-xs font-semibold text-caution-100">Where this conclusion could be wrong</p>
            <p className="mt-1.5 text-xs leading-relaxed text-caution-100/85">{recommendation.caveat}</p>
          </div>

          <div className="mt-5 grid gap-2 border-t border-white/[0.07] pt-4 sm:grid-cols-3">
            {[
              { label: 'Growth equity', s: growthEquityCase },
              { label: 'Private credit', s: privateCreditCase },
              { label: 'Blended capital', s: blendedCapitalCase },
            ].map(({ label, s }) => (
              <div key={label}>
                <p className="label">{label}</p>
                <p className="num mt-1 text-slate-200">
                  Dilution {p(s.founderDilution, 1)} · Ending cash USD {s.endingCash.toFixed(1)}m
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs">
            <Link href="/structures/" className="link">
              See the full structure comparison, debt schedule, returns, and sensitivities
            </Link>
          </p>
        </div>
      </Section>

      <Section title="Downloads" description="The full model and the written memorandum.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[DOWNLOADS.model, DOWNLOADS.memo].map((d) => (
            <a key={d.href} href={d.href} className="panel block min-w-0 p-4 transition-colors hover:border-white/10 hover:bg-graphite-800">
              <p className="text-sm font-semibold text-ivory-50">{d.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{d.description}</p>
              <p className="num mt-3 break-all text-cobalt-400">{d.label}</p>
            </a>
          ))}
        </div>
      </Section>

      <div className="mt-12">
        <DisclosureBanner tone="warning">{HYPOTHETICAL_LONG_DISCLOSURE}</DisclosureBanner>
      </div>
    </PageShell>
  );
}
