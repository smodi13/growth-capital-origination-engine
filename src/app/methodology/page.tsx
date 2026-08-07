import type { Metadata } from 'next';
import { companies } from '@/data/companies';
import {
  CONFIDENCE_MODIFIER_CAP,
  DEBT_FIT_CAP_NO_CASHFLOW,
  DEBT_FIT_CAP_NO_RECURRING,
  FACTOR_DEFINITIONS,
  TOTAL_WEIGHT,
} from '@/lib/scoring';
import { PROVENANCE_LABEL } from '@/lib/types';
import { DisclosureBanner, ExternalLink, PageHeader, Section, PageShell} from '@/components/primitives';
import { CLASSIFICATION_NOTE, DEVELOPMENT_DISCLOSURE, DISCLOSURE, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How companies were discovered, how private status was verified, how sources were classified, how the origination score works, and how missing information is handled.',
};

const PROVENANCE_RULES = [
  {
    key: 'independently-verified',
    definition:
      'A first party fact corroborated by an independent publication that did more than reproduce a press release, or confirmed by an independent evaluator such as an analyst firm.',
    scoring: 'Can support a positive score at any rating.',
  },
  {
    key: 'company-reported',
    definition:
      'Stated by the company in a dated announcement or on its own site. Reliable as a record of what the company said, and not independently confirmed.',
    scoring: 'Can support a positive score. Ratings above 4 usually require corroboration.',
  },
  {
    key: 'investor-reported',
    definition:
      'Stated by an investor in a portfolio announcement. Useful for round terms and valuations, and inherently interested.',
    scoring: 'Can support a positive score, and is not treated as evidence of operating performance.',
  },
  {
    key: 'government-reported',
    definition:
      'Drawn from a regulatory filing, a public procurement record, or another government source.',
    scoring: 'Can support a positive score.',
  },
  {
    key: 'analyst-judgment',
    definition:
      'A conclusion drawn by the analyst from disclosed facts. Labelled as opinion everywhere it appears, including all capital solution fit ratings.',
    scoring: 'Can support a positive score, and is always labelled as judgment rather than fact.',
  },
  {
    key: 'not-sufficiently-supported',
    definition:
      'A claim that public sources do not establish. Includes absent facts and claims that appear only in aggregators, estimates, or uncorroborated reproductions.',
    scoring:
      'Cannot support a positive score. The scoring engine forces the effective rating to zero regardless of what the rating field says.',
  },
] as const;

export default function MethodologyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Sourcing and scoring methodology"
        title="How this was built, and what it will not claim"
        lede="This page sets out the discovery process, the verification standard, the provenance classification, the scoring mechanics, and the rules that prevent the model from converting an absence of information into a conclusion."
      />

      <div className="mt-6">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>

      <Section
        title="How companies were discovered"
        description="Companies enter through a specific dated signal, not through a list of well known names."
      >
        <div className="prose-research max-w-3xl">
          <p>
            The universe was assembled by working outward from origination signals rather than
            inward from a ranking of the largest private software companies. Each candidate had to
            have a specific, dated, publicly visible event behind it: a financing announcement, a
            disclosed credit facility, an executive appointment, a product launch, a named enterprise
            customer win, a market expansion, a regulatory development, or an independent analyst
            evaluation.
          </p>
          <p>
            That constraint shapes the result. Roughly a third of the universe consists of companies
            that a screen ordered by valuation or funding total would not surface. LogicGate entered
            because a founder was publicly reassigned to capital strategy during a chief executive
            transition. Qventus entered because three health systems invested in a vendor they also
            buy from. Shippeo entered as a European counterpoint to an American competitor.
            Highnote entered on a second consecutive independent industry listing despite being the
            smallest company here by disclosed funding.
          </p>
          <p>
            Records carry one of two sourcing classifications. Benchmark growth companies calibrate
            the underwriting reference points. Emerging origination targets are the companies sourced
            specifically for a differentiated conversation. {CLASSIFICATION_NOTE} The classification
            is stamped during aggregation from the research file a record lives in, so no record can
            assign its own label, and it is never passed to the scoring engine. Several emerging
            records score below the benchmark set, and that ordering is left as it falls.
          </p>
          <p>
            Two records are deliberately retained as tests of the framework rather than as
            recommendations. Monte Carlo is included because widely syndicated sources report a 2025
            financing whose terms are identical to its 2022 round; holding the record at what a
            primary source supports, and saying so on the page, demonstrates the standard more
            clearly than quietly dropping the company would. Gladly is included because a modest late
            letter round in a category being repriced by AI is a set of facts worth stating plainly.
          </p>
        </div>
      </Section>

      <Section
        title="How private status was verified"
        description="Every company carries an explicit verification claim on its detail page."
      >
        <div className="prose-research max-w-3xl">
          <p>
            Each record contains a private status verification claim with its own provenance and
            sources. Verification required an active official website, recent first party publishing
            under the company own name, and the absence of any announced acquisition, registration
            statement, or exchange listing as at the review date.
          </p>
          <p>
            Candidates that failed were removed rather than retained. Laudio was researched as a less
            obvious healthcare candidate and removed once verification found it had been acquired in
            September 2025. ServiceTitan and Hinge Health were removed for having listed publicly.
            Moveworks was removed as a subsidiary following acquisition. AuditBoard was removed
            because private equity ownership changes both the origination question and the capital
            structure question this project addresses. None was replaced with a weaker company to
            preserve a target count.
          </p>
        </div>
      </Section>

      <Section
        title="How sources were classified"
        description="Primary sources are first party. Corroborating sources are independent. A press release reproduction is neither, and is labelled as such."
      >
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-3 py-2"><span className="label">Classification</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Definition</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Effect on scoring</span></th>
              </tr>
            </thead>
            <tbody>
              {PROVENANCE_RULES.map((r) => (
                <tr key={r.key} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3 text-xs font-semibold text-slate-800">
                    {PROVENANCE_LABEL[r.key]}
                  </td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-slate-600">{r.definition}</td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-slate-700">{r.scoring}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-600">
          Wire service and syndication copies of company announcements are recorded where they are
          the most durable link, but they are flagged as press release reproductions on the company
          page and do not count as the independent corroboration each record requires.
        </p>
      </Section>

      <Section
        title="How the score works"
        description={`Nine factors, weights summing to ${TOTAL_WEIGHT}, coarse 0 to 5 ratings, and a capped confidence modifier.`}
      >
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
          <table className="w-full min-w-[52rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th scope="col" className="px-3 py-2"><span className="label">Factor</span></th>
                <th scope="col" className="px-3 py-2 text-right"><span className="label">Weight</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">What it measures</span></th>
                <th scope="col" className="px-3 py-2"><span className="label">Rating anchors</span></th>
              </tr>
            </thead>
            <tbody>
              {FACTOR_DEFINITIONS.map((f) => (
                <tr key={f.key} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-3 text-xs font-semibold text-slate-800">{f.label}</td>
                  <td className="num px-3 py-3 text-right text-slate-800">{f.weight}%</td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-slate-600">{f.description}</td>
                  <td className="px-3 py-3 text-xs leading-relaxed text-slate-600">
                    <p><span className="text-slate-700">5:</span> {f.anchor5}</p>
                    <p className="mt-1.5"><span className="text-slate-700">1:</span> {f.anchor1}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <div className="panel p-4">
            <p className="text-sm font-semibold text-slate-800">The score is a pure function</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Nothing in the scoring engine keys off a company name, slug, or position in the list.
              Swapping two companies factor blocks swaps their scores exactly, which is asserted by
              an automated test rather than left as an assurance.
            </p>
          </div>
          <div className="panel p-4">
            <p className="text-sm font-semibold text-slate-800">The confidence modifier is capped</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              High confidence adds {CONFIDENCE_MODIFIER_CAP} points, limited confidence subtracts{' '}
              {CONFIDENCE_MODIFIER_CAP}, and moderate adds nothing. The cap exists so a well
              documented weak company cannot outrank a clearly stronger one purely because more
              public data happens to exist about it.
            </p>
          </div>
          <div className="panel p-4">
            <p className="text-sm font-semibold text-slate-800">Unsupported evidence earns nothing</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Where a factor rests on evidence classified as not sufficiently supported, the engine
              forces its effective rating to zero. Several companies here carry a zero on capital
              efficiency or growth quality for exactly that reason, and the company page marks it as
              suppressed by provenance.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="How missing information is handled"
        description="The single most important rule in the framework."
      >
        <div className="prose-research max-w-3xl">
          <p>
            Where public sources do not disclose something, the record says so using the exact phrase
            not publicly disclosed. Nothing is estimated. ARR, revenue, net retention, gross
            retention, gross margin, EBITDA, cash burn, runway, valuation, customer concentration,
            debt balance, covenants, profitability, founder ownership, and exit value are never
            inferred, interpolated, or filled from an aggregator.
          </p>
          <p>
            Missing information reduces data confidence, which moves the score by at most{' '}
            {CONFIDENCE_MODIFIER_CAP} points. It never becomes a fabricated negative fact. A company
            with no disclosed gross margin is not recorded as having a poor gross margin; it is
            recorded as a company whose gross margin cannot be assessed, and the factor that would
            have depended on it is rated on that basis with the reasoning shown.
          </p>
          <p>
            Across the {companies.length} records in this universe there are{' '}
            {companies.reduce((s, c) => s + c.missingInformation.length, 0)} separately enumerated
            gaps. That number is meant to be uncomfortable. It is the honest measure of how much of
            private company underwriting cannot be done from public sources.
          </p>
        </div>
      </Section>

      <Section
        title="Evidence against analyst judgment"
        description="Two different things, kept visibly separate throughout."
      >
        <div className="prose-research max-w-3xl">
          <p>
            Evidence is what a dated source establishes. Analyst judgment is what the analyst
            concludes from it. Every claim block, every factor rating, and every capital fit
            assessment carries a provenance badge identifying which it is.
          </p>
          <p>
            All three capital solution fit ratings are analyst judgment by construction and are typed
            that way in code, so they cannot be recorded as anything else. A reader who disagrees
            with a conclusion can see precisely which facts it rests on and where the reasoning
            departs from them.
          </p>
        </div>
      </Section>

      <Section
        title="Why private credit suitability needs more than public sources provide"
        description="The structural reason so many private credit fit ratings here are low."
      >
        <div className="prose-research max-w-3xl">
          <p>
            Growth equity underwriting can begin from things that are often public: category, growth
            direction, customer quality, competitive position, and management. Private credit
            underwriting cannot. It turns on contracted ARR, gross margin, net and gross retention,
            burn, cash balance, existing leverage, covenant headroom, and debt service capacity.
            Private companies disclose almost none of that.
          </p>
          <p>
            The framework enforces this rather than describing it. A company with no usable recurring
            revenue evidence is capped at a private credit fit of {DEBT_FIT_CAP_NO_RECURRING} of 5.
            A company with recurring revenue evidence but no revenue scale, capital efficiency, or
            disclosed facility to read debt service against is capped at {DEBT_FIT_CAP_NO_CASHFLOW}.
            Only where all of that is present can the rating go higher, and the cap is displayed on
            each company page alongside the rating.
          </p>
          <p>
            The two companies that reach the top of the private credit ranking do so because a
            third party lender has already underwritten them. Clio disclosed a USD 350 million
            facility co-led by Blackstone and Blue Owl Capital in November 2025, and Harness
            disclosed USD 150 million of senior secured venture growth loans from Silicon Valley Bank
            and Hercules Capital in May 2024. That is a materially stronger form of evidence than any
            company statement, because a lender performed its own diligence and put capital behind
            the conclusion.
          </p>
          <p>
            Everywhere else the language stays conditional. The standard formulation used throughout
            is that a company is potentially suitable, subject to confirming ARR scale, retention,
            burn, and debt service capacity. That phrasing is not hedging; it is the accurate
            description of what a public record can support.
          </p>
        </div>
      </Section>

      <Section
        title="Why a company can rank highly and still need substantial diligence"
        description="What the origination score is for, and what it is not for."
      >
        <div className="prose-research max-w-3xl">
          <p>
            The Origination Priority Score answers one question: is this company worth the time it
            takes to reach an executive and have an informed conversation. It does not answer whether
            the company is a good investment, whether the valuation is supportable, or whether a
            facility could be arranged.
          </p>
          <p>
            LogicGate is the clearest illustration. Its score is held down by an almost complete
            absence of financial disclosure, yet it carries a high outreach priority, because the
            public record identifies both a live capital agenda and the named executive who owns it.
            That is a strong reason to make contact and a weak basis for any conclusion about the
            business.
          </p>
          <p>
            The reverse also occurs. Cyera scores respectably and is deliberately marked as a
            medium priority, because a company that has raised twice in six months has no visible
            near term capital requirement regardless of quality.
          </p>
        </div>
      </Section>

      <Section
        title="How signal freshness is treated"
        description="Freshness affects sequencing, not ranking."
      >
        <div className="prose-research max-w-3xl">
          <p>
            Freshness is measured from the review date: Fresh within 90 days, Recent within 12
            months, Established beyond that. It is displayed on the homepage, the universe table,
            every company page, the pipeline, and the comparison tool.
          </p>
          <p>
            Freshness is deliberately not a scoring factor. A recent event tells you there is a
            current reason to make contact; it says nothing about whether the company is good. If
            freshness fed the score, a weak company that had just announced something would outrank
            a strong company that had been quiet, which is the failure mode most sourcing screens
            actually exhibit.
          </p>
        </div>
      </Section>

      <Section title="How AI-assisted development tools were used">
        <div className="panel p-5">
          <p className="text-sm leading-relaxed text-slate-800">{DEVELOPMENT_DISCLOSURE}</p>
          <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 lg:grid-cols-2">
            <div>
              <p className="label">What the tools did</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
                <li>Wrote and refactored application code, components, and the test suite</li>
                <li>Ran public web searches and retrieved pages during the research phase</li>
                <li>Organised research findings into the structured record format</li>
                <li>Generated the Excel workbook and the PDF memorandum from the model definitions</li>
              </ul>
            </div>
            <div>
              <p className="label">What they did not do</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
                <li>Choose which companies enter or leave the universe</li>
                <li>Set the factors, weights, rating anchors, or evidence caps</li>
                <li>Decide any capital solution fit rating or the recommended structure</li>
                <li>Make an investment decision of any kind</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-600">
            Every company record and material claim was reviewed against dated public sources. Where
            a widely repeated claim could not be traced to a primary source, the record says so
            rather than adopting it, which is visible in the Monte Carlo, Workato, and Sigma
            Computing records in particular.
          </p>
        </div>
      </Section>

      <Section title="Repository">
        <p className="text-sm text-slate-700">
          The complete source, including the scoring engine, every company record, and the document
          generation scripts, is public at{' '}
          <ExternalLink href={SITE.github}>{SITE.github}</ExternalLink>.
        </p>
      </Section>

      <div className="mt-12">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </PageShell>
  );
}
