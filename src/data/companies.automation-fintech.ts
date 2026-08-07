import type { CompanyInput } from '@/lib/types';
import { NOT_DISCLOSED } from '@/lib/types';
import { claim, rate, src, undisclosed, REVIEW_DATE } from './helpers';

export const automationFintechCompanies: CompanyInput[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'harness',
    name: 'Harness',
    website: 'https://www.harness.io',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2017,
    founders: ['Jyoti Bansal', 'Rishi Singh'],
    ceo: 'Jyoti Bansal, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Developer tools',
    subsector: 'Software delivery and continuous integration platform',
    productDescription:
      'Harness provides an AI assisted software delivery platform covering continuous integration, continuous delivery, feature flags, cloud cost management, chaos engineering, security testing orchestration, and infrastructure as code management. The positioning is everything that happens after code is written.',
    targetCustomer:
      'Platform engineering and developer productivity teams at enterprises consolidating a fragmented set of build, deploy, and governance tools onto one platform.',
    businessModel:
      'Annual enterprise subscription priced by module and by developer or service, with expansion driven by adding modules to an existing deployment.',

    financingStage: 'Series E',
    latestFinancing:
      'USD 240 million Series E at a reported USD 5.5 billion valuation, comprising a USD 200 million investment led by Goldman Sachs Alternatives and a planned USD 40 million tender offer',
    financingDate: '2025-12-12',
    totalDisclosedFunding:
      'Approximately USD 795 million of disclosed equity, plus a separate USD 150 million debt facility disclosed in May 2024',
    investors: [
      'Goldman Sachs Alternatives',
      'IVP',
      'Menlo Ventures',
      'Unusual Ventures',
      'Alkeon Capital',
      'Citi Ventures',
      'Norwest Venture Partners',
    ],

    customerEvidence: claim(
      'Company sources state more than 1,000 enterprise engineering teams across North America, EMEA, and APAC. Named enterprise customers disclosed at the time of the 2024 financing include Nike, NetApp, Morningstar, and Icelandair.',
      'company-reported',
      ['hn-e', 'hn-debt'],
      true,
      '2025-12-12',
    ),
    commercialMaturitySignal: claim(
      'Disclosed ARR above USD 250 million, more than 1,000 enterprise customers, a stated 1,200 or more employees across 14 offices, and a multi module platform built partly through acquisition.',
      'company-reported',
      ['hn-e', 'hn-ai'],
      true,
      '2025-12-12',
    ),
    growthSignal: claim(
      'Company sources state ARR on track to exceed USD 250 million in 2025 with growth above 50 percent year over year, following an earlier disclosure of growth from USD 1 million to more than USD 100 million ARR over five years.',
      'company-reported',
      ['hn-e', 'hn-ai', 'hn-debt'],
      true,
      '2025-12-12',
    ),
    recurringRevenueEvidence: claim(
      'Revenue is disclosed in annual recurring revenue terms across multiple dated announcements, against an annual enterprise subscription base.',
      'company-reported',
      ['hn-e', 'hn-debt'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 12 December 2025 states ARR on track to exceed USD 250 million in 2025 with growth above 50 percent year over year. An earlier announcement dated 14 May 2024 stated growth from USD 1 million to more than USD 100 million ARR over five years.',
      'company-reported',
      ['hn-e', 'hn-ai', 'hn-debt'],
      true,
      '2025-12-12',
    ),
    capitalEfficiencyEvidence: claim(
      'Above USD 250 million disclosed ARR against approximately USD 795 million of disclosed equity funding. More informative than the ratio is that two institutional lenders extended senior secured facilities against this revenue base in May 2024, which is third party evidence that the credit was underwritable at roughly USD 100 million of ARR.',
      'company-reported',
      ['hn-debt', 'hn-e'],
      true,
      '2025-12-12',
    ),
    debtEvidence: claim(
      'Company announcement dated 14 May 2024 discloses USD 150 million in senior secured venture growth loans provided by Silicon Valley Bank, a division of First Citizens Bank, and Hercules Capital. Specific terms, pricing, covenants, and current outstanding balance were not disclosed.',
      'company-reported',
      ['hn-debt'],
      true,
      '2024-05-14',
    ),
    acquisitionActivity: claim(
      'Harness has built its multi module platform partly through acquisition, including Drone continuous integration, Propelo, and Split Software for feature experimentation. Transaction values were not disclosed.',
      'company-reported',
      ['hn-site', 'hn-e'],
      false,
    ),
    internationalExpansion: claim(
      'Company sources state operations across 14 offices worldwide serving enterprise engineering teams in North America, EMEA, and APAC. No international revenue mix is disclosed.',
      'company-reported',
      ['hn-e', 'hn-ai'],
      true,
      '2025-12-12',
    ),

    competitiveLandscape:
      'Competes with GitLab, GitHub Actions under Microsoft, CircleCI, Atlassian, JFrog, and the native delivery tooling of the cloud providers. Harness differentiates on breadth across the post commit lifecycle rather than depth in any single stage.',
    mainCommercialRisk:
      'The platform consolidation pitch competes against free and bundled alternatives at every individual module. Customers can adopt GitHub Actions or GitLab for continuous integration at no incremental cost, which means Harness must win on the whole rather than on any part.',
    mainFinancialRisk:
      'A reported USD 5.5 billion valuation against above USD 250 million disclosed ARR implies a demanding forward multiple, and an existing senior secured facility sits ahead of equity in the capital structure with undisclosed terms.',
    mainTechnologyRisk:
      'Breadth across seven or more modules is expensive to maintain at parity with specialists in each. Acquisition led platform building carries integration debt that shows up in product coherence.',

    originalSourcingSignal:
      'Series E announcement dated 12 December 2025 disclosing a USD 240 million round led by Goldman Sachs Alternatives at a reported USD 5.5 billion valuation, with ARR stated to exceed USD 250 million.',
    discoveryChannel: 'Credit facility',
    signalDate: '2025-12-12',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'Harness is the only company in this universe with a publicly disclosed senior secured facility from named institutional lenders. That single disclosure converts private credit suitability from an inference into a documented fact, which makes it the reference case for the debt fit framework.',
    whyMayNeedGrowthCapital:
      'The company has raised both equity and debt while pursuing acquisition led platform expansion. A USD 150 million facility taken at roughly USD 100 million of ARR would typically face a refinancing or upsizing decision as the revenue base has since more than doubled.',
    potentialUseOfProceeds: [
      'Refinancing or upsizing the existing senior secured facility against a larger revenue base',
      'Further acquisitions to complete the post commit platform',
      'AI capability investment across existing modules',
      'International go to market expansion across the stated 14 office footprint',
    ],

    whyEquityMayFit:
      'A platform consolidation strategy executed partly through acquisition needs equity capacity for transactions that a lender will not fund on their own.',
    whyDebtMayFit:
      'This is the strongest debt case in the universe on public evidence. Disclosed ARR above USD 250 million, a subscription contract base, more than 1,000 enterprise customers implying low concentration, and two institutional lenders having already underwritten the credit at a smaller revenue base.',
    whyBlendedMayFit:
      'The company has already run a blended structure in practice, taking senior secured debt in 2024 and primary equity in 2025. The relevant question is the mix at the next event rather than whether a mix is possible.',
    preliminaryCapitalView:
      'Analyst judgment. Blended capital is the demonstrated structure and the natural one. Private credit is potentially suitable on unusually strong public evidence, subject to confirming current ARR, gross margin, net and gross retention, burn, cash balance, existing facility terms and outstanding balance, and incremental debt service capacity. The existing facility means any new lender must first understand what sits ahead of it.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'The USD 150 million facility from Silicon Valley Bank and Hercules was taken when ARR was around USD 100 million and ARR is now stated above USD 250 million. What is the current outstanding balance, and is a refinancing or upsizing contemplated?',
      'The platform now spans seven or more modules, several acquired. What does net revenue retention look like for single module customers against multi module customers?',
      'The December 2025 round included a USD 40 million tender offer. How is the company balancing shareholder liquidity against the leverage already in the structure?',
    ],
    nextDiligenceStep:
      'Obtain the terms, covenants, amortisation profile, and current outstanding balance of the existing senior secured facility. Nothing about incremental debt capacity can be assessed without knowing what is already ahead of it.',
    missingInformation: [
      'Existing facility terms, pricing, covenants, and outstanding balance',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Customer concentration',
      'Module level revenue mix',
      'Acquisition consideration paid',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise developer tooling sold on annual subscription to platform engineering buyers at large enterprises.',
        ['hn-e'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        5,
        'Disclosed ARR above USD 250 million, more than 1,000 enterprise customers, named logos including Nike, NetApp, and Morningstar, and a stated 1,200 or more employees across 14 offices.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'High',
        'Revenue scale, customer count, named logos, and organisational scale are all disclosed and dated.',
      ),
      growthQuality: rate(
        4,
        'Two dated ARR reference points, more than USD 100 million disclosed in May 2024 and above USD 250 million disclosed in December 2025, with a stated growth rate above 50 percent.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'High',
        'Growth is disclosed across two periods with a stated rate, which is strong. Held below 5 because both figures are floor values rather than exact, and part of the increase reflects acquisition rather than organic growth.',
      ),
      recurringRevenueQuality: rate(
        4,
        'ARR disclosed across multiple dated announcements against an enterprise subscription base, and two institutional lenders underwrote senior secured facilities against that recurring revenue in 2024.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'High',
        'Rated 4 rather than 3 specifically because third party lenders performed their own diligence on the recurring revenue base and lent against it, which is stronger evidence of revenue quality than any company disclosure. No retention figure is published, which prevents a 5.',
      ),
      customerDurability: rate(
        4,
        'Software delivery pipelines are deeply embedded in engineering workflow and expensive to migrate. More than 1,000 enterprise customers implies limited single name concentration.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'Moderate',
        'Genuine switching cost and reasonable breadth. Held below 5 because individual modules face free alternatives, so durability is stronger for multi module customers than for the base as a whole.',
      ),
      marketAttractiveness: rate(
        3,
        'Developer tooling spend grows with engineering headcount, but the category is heavily contested by vendors offering equivalent capability bundled at no incremental cost.',
        ['hn-e'],
        'analyst-judgment',
        'Moderate',
        'Real spend growth offset by the most direct free substitution risk in the universe reviewed here, since GitHub Actions and GitLab are already paid for by most target customers.',
      ),
      capitalEfficiency: rate(
        3,
        'Above USD 250 million disclosed ARR against approximately USD 795 million of disclosed equity plus a USD 150 million facility.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'Moderate',
        'The ratio is unremarkable, and part of the revenue was acquired rather than built, which makes the denominator harder to read. Both inputs are disclosed, so this is a measured rating.',
      ),
      capitalNeedTiming: rate(
        3,
        'A facility taken in May 2024 against a much smaller revenue base, and an equity round closed in December 2025.',
        ['hn-debt', 'hn-e'],
        'company-reported',
        'Moderate',
        'The recent equity round reduces near term need, but an existing facility sized to a revenue base that has since more than doubled creates a genuine refinancing question on its own timeline.',
      ),
      outreachPotential: rate(
        5,
        'Founder chief executive who previously founded and sold AppDynamics, speaks publicly and frequently on developer tooling strategy, and is quoted directly in company announcements.',
        ['hn-e', 'hn-debt'],
        'company-reported',
        'High',
        'A repeat founder chief executive with a substantial public profile and demonstrated familiarity with institutional capital on both the equity and debt side.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Acquisition led platform strategy requiring equity capacity',
          'Disclosed ARR growth above 50 percent at meaningful scale',
          'Demonstrated shareholder liquidity requirement',
          'Repeat founder with an established institutional track record',
        ],
        conditions:
          'Subject to confirming organic against acquired growth, and to a view on a reported USD 5.5 billion valuation relative to above USD 250 million of ARR.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 4,
        drivers: [
          'Disclosed ARR above USD 250 million comfortably clears facility scale thresholds',
          'Two named institutional lenders have already underwritten this credit',
          'More than 1,000 enterprise customers implying low single name concentration',
          'Subscription contract base with multi year enterprise agreements',
          'Existing facility demonstrates the company will accept covenant discipline',
        ],
        conditions:
          'Potentially suitable, subject to confirming current ARR on a contracted basis, gross margin, net and gross retention, burn, cash balance, and incremental debt service capacity. Critically, the terms, covenants, and outstanding balance of the existing senior secured facility must be established first, since any new facility sits behind or alongside it. Rated 4 rather than 5 only because those existing terms are undisclosed.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 5,
        drivers: [
          'The company has already executed a blended structure in practice',
          'Acquisition programme suits equity while operating growth suits debt',
          'Disclosed scale supports a meaningful debt tranche',
          'Shareholder liquidity requirement that debt can partly fund',
          'Demonstrated willingness to work with institutional lenders',
        ],
        conditions:
          'Subject to confirming existing facility terms and incremental debt service capacity. This is the clearest blended capital case in the universe because the company has already demonstrated both the appetite and the capacity.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A facility sized against roughly USD 100 million of ARR now sits against a revenue base more than twice that size, which usually means the existing structure is no longer the cheapest available and is worth testing against the market.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Jyoti Bansal, co-founder and Chief Executive Officer',
          subject: 'Harness module attach rates and the shape of the capital structure',
          body: `Jyoti,

I have been researching how software delivery platforms fund consolidation strategies, and Harness is the most instructive case I have found because the capital structure is visible in a way that is unusual for a private company.

Taking USD 150 million of senior secured debt from Silicon Valley Bank and Hercules in 2024, then a Goldman led round in 2025, is a deliberately mixed structure rather than a default one. With ARR now stated above USD 250 million against roughly USD 100 million when that facility was put in place, the original sizing looks conservative relative to where the business is.

I would be interested in learning how you think about module attach rates as the driver of that revenue base, since the durability of a multi module customer looks very different from a single module one when a lender is underwriting it.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'hn-e',
        'PR Newswire',
        'Harness Announces USD 240M Financing Round Led by Goldman Sachs Alternatives',
        'https://www.prnewswire.com/news-releases/harness-announces-240m-financing-round-led-by-goldman-sachs-alternatives-to-advance-ai-for-everything-after-code-302638707.html',
        '2025-12-12',
        'primary',
        true,
      ),
      src(
        'hn-debt',
        'PR Newswire',
        'Harness Raises USD 150 Million in New Financing, senior secured venture growth loans from Silicon Valley Bank and Hercules Capital',
        'https://www.prnewswire.com/news-releases/harness-raises-150-million-in-new-financing-302144095.html',
        '2024-05-14',
        'primary',
        true,
      ),
      src(
        'hn-gs',
        'Goldman Sachs Asset Management',
        'Harness Announces USD 240M Financing Round',
        'https://am.gs.com/en-us/advisors/news/press-release/2025/harness',
        '2025-12-12',
        'corroborating',
      ),
      src(
        'hn-ai',
        'The AI Insider',
        'Harness Raises USD 240M Series E as AI DevOps Platform Surpasses USD 250M ARR',
        'https://theaiinsider.tech/2025/12/12/harness-raises-240m-series-e-as-ai-devops-platform-surpasses-250m-arr-and-expands-global-footprint/',
        '2025-12-12',
        'corroborating',
      ),
      src(
        'hn-site',
        'Harness',
        'Harness platform and module documentation',
        'https://www.harness.io/',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Harness remains privately held and independently operating. Its most recent disclosed financing in December 2025 was a private round including a tender offer for existing shareholders, which is a private liquidity mechanism rather than a public listing, and no acquisition or registration statement has been announced.',
      'independently-verified',
      ['hn-e', 'hn-gs'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'workato',
    name: 'Workato',
    website: 'https://www.workato.com',
    headquarters: 'Mountain View, California, United States',
    foundedYear: 2013,
    founders: ['Vijay Tella', 'Gautham Viswanathan', 'Harish Shetty', 'Dimitris Kogias'],
    ceo: 'Vijay Tella, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Workflow automation',
    subsector: 'Enterprise integration and agentic orchestration',
    productDescription:
      'Workato is an enterprise integration and automation platform. Customers build recipes that connect applications, data sources, and workflows across a stated library of more than 14,000 application connectors, using a low code environment intended for business users as well as engineers. The company has extended the platform into a multi agent system marketed as AIRO.',
    targetCustomer:
      'Information technology, operations, and business systems teams at mid market and enterprise organisations integrating a large software as a service estate without building point to point connections.',
    businessModel:
      'Annual enterprise subscription priced on recipes and tasks, with a substantial partner and systems integrator channel.',

    financingStage: 'Series E',
    latestFinancing: 'USD 200 million Series E at a reported USD 5.7 billion valuation',
    financingDate: '2021-11-10',
    totalDisclosedFunding: 'Approximately USD 441 million',
    investors: [
      'Battery Ventures',
      'Altimeter Capital',
      'Insight Partners',
      'Tiger Global Management',
      'Redpoint Ventures',
      'Salesforce Ventures',
      'Workday Ventures',
    ],

    customerEvidence: claim(
      'Company sources state more than 700 customers each contributing above USD 100,000 in annual recurring revenue as of fiscal 2026, and a stated integration library of more than 14,000 applications.',
      'company-reported',
      ['wk-partner', 'wk-airo'],
      true,
      '2026-07-30',
    ),
    commercialMaturitySignal: claim(
      'Thirteen years of operation, more than 700 customers above USD 100,000 ARR, a named position on the Deloitte Technology Fast 500 for 2025, and a global partner programme with regional award events.',
      'company-reported',
      ['wk-partner', 'wk-g2'],
      true,
      '2026-04-30',
    ),
    growthSignal: claim(
      'Company sources state fiscal 2026 closed with 35 percent year over year ARR growth and 50 percent growth in net new ARR, with partner sourced ARR growing 61 percent year over year across 24 additional transacting partners.',
      'company-reported',
      ['wk-partner'],
      true,
      '2026-04-30',
    ),
    recurringRevenueEvidence: claim(
      'The company discusses its business in annual recurring revenue terms, discloses a growth rate on that basis, and reports a count of customers above a stated ARR threshold. No absolute ARR figure is disclosed.',
      'company-reported',
      ['wk-partner'],
      true,
      '2026-04-30',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No absolute annual recurring revenue figure has been disclosed by the company. Fiscal 2026 ARR growth of 35 percent and a count of more than 700 customers above USD 100,000 ARR are disclosed, which bound the base without fixing it. Third party estimates of a USD 150 million ARR figure for 2023 are not primary sourced and are not relied upon here.',
      'company-reported',
      ['wk-partner'],
      true,
      '2026-04-30',
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Company sources describe partner award events held in Amsterdam and Denver and a partnership with Tata Consultancy Services announced in March 2025, indicating an established international and systems integrator presence.',
      'company-reported',
      ['wk-partner'],
      false,
    ),

    competitiveLandscape:
      'Competes with MuleSoft under Salesforce, Boomi, Celigo, Tray.ai, Zapier at the lighter end, and increasingly with Microsoft Power Platform. The agentic repositioning also places it against a new set of orchestration entrants.',
    mainCommercialRisk:
      'Integration platforms are being bundled into the application suites they connect. Microsoft and Salesforce both ship automation inside products customers already own, which compresses the standalone budget.',
    mainFinancialRisk:
      'The last disclosed equity round closed in November 2021 at a reported USD 5.7 billion valuation in a materially different market. Nearly five years have passed with no subsequent financing disclosure and no absolute revenue figure, so both the current valuation reference point and the current scale are unknown.',
    mainTechnologyRisk:
      'Maintaining more than 14,000 connectors is a fixed operating burden that scales with the software as a service estate rather than with revenue.',

    originalSourcingSignal:
      'Product launch dated 30 July 2026 announcing global availability of Workato AIRO, a multi agent system built into the platform, following a fiscal 2026 disclosure of 35 percent ARR growth and 61 percent partner sourced ARR growth on 30 April 2026.',
    discoveryChannel: 'Product launch',
    signalDate: '2026-07-30',
    signalFreshness: 'Fresh',
    whyEnteredPipeline:
      'The combination is unusual: a company nearly five years past its last disclosed round that is still publishing specific growth percentages and a major platform launch. That pattern usually indicates a business funding itself from operations, which is a different and more interesting conversation than a company between rounds.',
    whyMayNeedGrowthCapital:
      'A reported USD 5.7 billion valuation set in November 2021 is very likely above where a new primary round would price today. That makes non dilutive or structured capital more attractive than a priced equity round, and it is precisely the situation blended structures exist to address.',
    potentialUseOfProceeds: [
      'Go to market investment behind the agentic platform launch',
      'Continued expansion of the systems integrator and partner channel',
      'Shareholder and employee liquidity for a thirteen year old cap table',
      'Selective acquisition of agent orchestration capability',
    ],

    whyEquityMayFit:
      'It may fit poorly. A primary round would likely require accepting a valuation below the 2021 mark, which existing shareholders and employees typically resist when the business is growing and self funding.',
    whyDebtMayFit:
      'Disclosed ARR growth of 35 percent, more than 700 customers above USD 100,000 ARR, and nearly five years without external equity together suggest a business with real recurring revenue and moderate burn. None of the metrics a lender would test are actually disclosed.',
    whyBlendedMayFit:
      'This is the textbook profile for it: a mature, growing, self funding company with a stale valuation mark and a liquidity requirement. Debt funds growth and liquidity without setting a new price, and a small structured equity component can bridge whatever debt cannot carry.',
    preliminaryCapitalView:
      'Analyst judgment. Blended capital leads here on situational logic rather than on financial disclosure, which is an important distinction. Potentially suitable, subject to confirming absolute ARR scale, gross margin, net and gross retention, burn, cash balance, and debt service capacity. The company discloses growth rates but not the base, so no lender could size a facility from public information.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'Fiscal 2026 ARR growth of 35 percent is disclosed but the absolute base is not. What is current ARR, and how much of the 50 percent net new ARR growth came through the partner channel against direct?',
      'The last disclosed round was in November 2021 at a reported USD 5.7 billion valuation. Has the business been self funding since then, and is preserving that valuation reference point a constraint on how the next event is structured?',
      'Partner sourced ARR grew 61 percent. How does the gross margin and retention profile of channel revenue compare with direct, given that the channel carries systems integrator economics?',
    ],
    nextDiligenceStep:
      'Establish absolute ARR and the direct against partner channel revenue split. The disclosed growth rates are meaningful but unsizeable without a base, and channel mix materially changes both margin and credit quality.',
    missingInformation: [
      'Absolute annual recurring revenue',
      'Direct against partner channel revenue split',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Any financing event after November 2021',
      'Current valuation reference point',
      'Customer concentration',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise integration and automation software sold on annual subscription to information technology and business systems buyers.',
        ['wk-airo', 'wk-partner'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'More than 700 customers each above USD 100,000 ARR, a stated 14,000 application integration library, thirteen years of operation, and an established global partner programme.',
        ['wk-partner', 'wk-airo'],
        'company-reported',
        'Moderate',
        'A customer count qualified by contract value is better evidence than a raw count, and 700 accounts above USD 100,000 indicates a genuine enterprise motion. Held below 5 because no absolute revenue figure and no named enterprise logos appear in dated primary sources.',
      ),
      growthQuality: rate(
        4,
        'Fiscal 2026 disclosed at 35 percent ARR growth, 50 percent net new ARR growth, and 61 percent partner sourced ARR growth, all published together with a dated fiscal year reference.',
        ['wk-partner'],
        'company-reported',
        'Moderate',
        'Three distinct growth measures disclosed for a specific fiscal year is high quality disclosure. Held below 5 because there is no absolute base and no prior year comparison to establish durability across periods.',
      ),
      recurringRevenueQuality: rate(
        3,
        'The company reports in ARR terms, discloses an ARR growth rate, and reports a customer count above a stated ARR threshold. No absolute ARR figure and no retention measure is published.',
        ['wk-partner'],
        'company-reported',
        'Moderate',
        'Reporting in ARR terms with a contract value qualified customer count is more than a bare subscription model, which lifts this above a 2. The absent base and absent retention prevent a 4.',
      ),
      customerDurability: rate(
        5,
        'Integration platforms sit between systems of record and are among the most expensive enterprise software to replace once recipes are in production. More than 700 accounts above USD 100,000 ARR implies both depth and low concentration.',
        ['wk-partner'],
        'company-reported',
        'Moderate',
        'Integration middleware has the highest structural switching cost of any category in this universe, and the disclosed contract value distribution supports it on both dimensions this factor measures.',
      ),
      marketAttractiveness: rate(
        3,
        'Enterprise integration spend grows with software as a service estate complexity, but the largest application vendors bundle competing automation into products customers already pay for.',
        ['wk-airo'],
        'analyst-judgment',
        'Moderate',
        'Genuine underlying growth in the need, materially offset by bundling pressure from Microsoft and Salesforce, which is the same dynamic that has compressed this category before.',
      ),
      capitalEfficiency: rate(
        3,
        'Nearly five years without a disclosed equity round while continuing to publish growth and ship major platform releases, against approximately USD 441 million raised. No absolute revenue figure is disclosed.',
        ['wk-partner'],
        'analyst-judgment',
        'Limited',
        'Operating for five years without external equity while growing is real circumstantial evidence of discipline, which is why this is not lower. With no revenue denominator it cannot be higher.',
      ),
      capitalNeedTiming: rate(
        4,
        'Nearly five years since the last disclosed round, a major platform launch in July 2026 requiring go to market investment, and a thirteen year old cap table.',
        ['wk-airo', 'wk-partner'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time, the active launch, and the cap table age together make a live capital conversation likely, though the apparent self funding means it is a choice rather than a necessity.',
      ),
      outreachPotential: rate(
        3,
        'Founder remains chief executive after thirteen years. Public commentary is largely product focused rather than strategic, and no finance leader is publicly disclosed.',
        ['wk-airo'],
        'company-reported',
        'Moderate',
        'Founder chief executive continuity is favourable, but the public profile is lower than at comparable founder led peers and there is no disclosed finance counterparty.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 2,
        drivers: [
          'Major platform launch requiring go to market investment',
          'Established enterprise customer base above USD 100,000 ARR',
        ],
        conditions:
          'Constrained by the November 2021 valuation reference point. A primary round today would most likely price below that mark, which existing holders typically resist. The low rating reflects structural unattractiveness to the company rather than business quality.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Disclosed ARR growth of 35 percent against an established recurring base',
          'More than 700 customers above USD 100,000 ARR implying low concentration',
          'Nearly five years without external equity, suggesting moderate burn',
          'Very high switching cost supporting forward revenue visibility',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming absolute ARR scale, gross margin, net and gross retention, burn, cash balance, and debt service capacity. The company discloses growth rates but not the base, so no facility could be sized from public information. Partner channel revenue would need separate treatment.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 4,
        drivers: [
          'Stale valuation mark that a priced equity round would reset',
          'Thirteen year old cap table with a plausible liquidity requirement',
          'Apparent self funding implying capacity to service interest',
          'Defined growth initiative in the agentic platform launch',
          'Very high customer switching cost supporting a lender view',
        ],
        conditions:
          'Subject to confirming absolute ARR, burn, and debt service capacity. This is the situational profile blended structures exist for: a mature growing company that wants capital without agreeing a new price.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'For a company growing 35 percent without external equity since 2021, the practical question is how to fund a platform launch and any liquidity requirement without agreeing a new valuation, which is a structuring problem rather than a fundraising one.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Vijay Tella, co-founder and Chief Executive Officer',
          subject: 'Workato partner channel economics and funding the AIRO launch',
          body: `Vijay,

I have been researching enterprise integration companies and how they are funding the move from workflow automation into agentic orchestration, and Workato stands out for a reason that has little to do with the product.

Publishing 35 percent ARR growth and 61 percent partner sourced ARR growth nearly five years after the last disclosed round suggests a business funding its own expansion, which is uncommon at this scale and changes what capital is actually for.

I would be interested in learning how the partner channel economics compare with direct as AIRO rolls out, since a systems integrator led motion usually carries a different margin and retention profile than the direct base.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'wk-airo',
        'Workato via Business Wire',
        'Workato Announces AIRO Global Availability, Redefining Enterprise Software for the Agentic Era',
        'https://www.businesswire.com/news/home/20260730592940/en/Workato-Announces-AIRO-Global-Availability-Redefining-Enterprise-Software-for-the-Agentic-Era',
        '2026-07-30',
        'primary',
      ),
      src(
        'wk-partner',
        'Workato via Business Wire',
        'Workato Celebrates 2026 Global Partner Award Winners, including fiscal 2026 ARR growth disclosure',
        'https://www.businesswire.com/news/home/20260430870688/en/CORRECTING-and-REPLACING-Workato-Celebrates-2026-Global-Partner-Award-Winners',
        '2026-04-30',
        'primary',
      ),
      src(
        'wk-g2',
        'Workato',
        'Workato Named a G2 Leader in Agentic AI and Enterprise Software 2026',
        'https://www.workato.com/the-connector/g2-leader-2026/',
        '2026-03-01',
        'primary',
      ),
      src(
        'wk-seriese',
        'Workato via Business Wire',
        'Workato Raises USD 200 Million Series E Funding at a USD 5.7 Billion Valuation',
        'https://www.businesswire.com/news/home/20211110005682/en/Workato-Raises-%24200-Million-Series-E-Funding-at-a-%245.7-Billion-Valuation-to-Accelerate-Record-Growth-and-Capitalise-on-Surging-Demand-for-Enterprise-Automation',
        '2021-11-10',
        'primary',
      ),
      src(
        'wk-mts',
        'MarTech Series',
        'Workato Announces AIRO Global Availability',
        'https://martechseries.com/predictive-ai/ai-platforms-machine-learning/workato-announces-airo-global-availability-redefining-enterprise-software-for-the-agentic-era/',
        '2026-07-30',
        'corroborating',
        true,
      ),
      src(
        'wk-qcg',
        'Quandary Consulting Group',
        'Workato Q1 2026: From Automation to AI Execution, independent practitioner analysis of the platform direction',
        'https://www.quandarycg.com/workato-q1-2026-from-automation-to-ai-execution/',
        '2026-03-15',
        'corroborating',
      ),
      src(
        'wk-dr',
        'Dealroom',
        'Workato partner-sourced ARR grows 61 percent as firm names 2026 global award winners',
        'https://app.dealroom.co/news/feed/workato-s-partner-sourced-arr-grows-61-as-firm-names-2026-global-award-winners',
        '2026-04-30',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Workato remains privately held and independently operating. The company published a major product launch in July 2026 and fiscal 2026 growth disclosures in April 2026 under its own name, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['wk-airo', 'wk-partner'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'tines',
    name: 'Tines',
    website: 'https://www.tines.com',
    headquarters: 'Dublin, Ireland and Boston, Massachusetts, United States',
    foundedYear: 2018,
    founders: ['Eoin Hinchy', 'Thomas Kinsella'],
    ceo: 'Eoin Hinchy, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Workflow automation',
    subsector: 'Security and infrastructure workflow orchestration',
    productDescription:
      'Tines is a no code workflow orchestration platform used primarily by security, information technology, and infrastructure teams. Workflows are built by connecting actions across existing tools without writing code, and the platform can be deployed in a customer own tenant, which matters to regulated buyers.',
    targetCustomer:
      'Security operations, information technology, and compliance teams in regulated industries including financial services and healthcare, where automation must run inside the customer own environment.',
    businessModel:
      'Annual enterprise subscription priced on workflow volume, with a free community tier used as a land motion into security teams.',

    financingStage: 'Series C',
    latestFinancing: 'USD 125 million Series C at a reported USD 1.125 billion valuation',
    financingDate: '2025-02-11',
    totalDisclosedFunding: 'Approximately USD 272 million',
    investors: [
      'Growth Equity at Goldman Sachs Alternatives',
      'SoftBank Vision Fund 2',
      'Activant Capital',
      'Accel',
      'Felicis',
      'CrowdStrike Falcon Fund',
      'Addition',
    ],

    customerEvidence: claim(
      'Company announcement dated 11 February 2025 states the platform performs more than one billion automated actions weekly on behalf of customers, and that two thirds of customers adopted AI features launched in 2024. No customer count or named enterprise logo list appears in the dated primary announcement.',
      'company-reported',
      ['tn-c', 'tn-pr'],
      true,
      '2025-02-11',
    ),
    commercialMaturitySignal: claim(
      'A Series C led by Growth Equity at Goldman Sachs Alternatives with SoftBank Vision Fund 2 participating, unicorn valuation within seven years, and a stated threefold increase in weekly automated actions over one year.',
      'investor-reported',
      ['tn-c', 'tn-pr'],
      true,
      '2025-02-11',
    ),
    growthSignal: claim(
      'Company sources state weekly automated actions grew approximately threefold in the year to February 2025, reaching more than one billion. This is a usage measure rather than a revenue measure and is treated as such.',
      'company-reported',
      ['tn-c', 'tn-tfn'],
      true,
      '2025-02-12',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['tn-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Dual headquarters in Dublin and Boston from an early stage, with a European origin and a United States commercial base. No international revenue mix is disclosed.',
      'company-reported',
      ['tn-c', 'tn-eus'],
      false,
    ),

    competitiveLandscape:
      'Competes with Torq, Palo Alto Networks XSOAR, Splunk SOAR, Swimlane, and Workato where the buyer is broader than security. Tines differentiates on deployment model and on being usable by non engineers.',
    mainCommercialRisk:
      'The security automation category has several well funded competitors pursuing the same enterprise accounts, and the largest security platform vendors bundle automation into products customers already own.',
    mainFinancialRisk:
      'Growth is disclosed only as a usage metric. Weekly automated actions can grow substantially without corresponding revenue growth if pricing does not track volume, and no revenue figure exists to test that.',
    mainTechnologyRisk:
      'A no code builder must remain simple enough for non engineers while handling enterprise complexity. That tension usually resolves toward complexity, which erodes the original differentiation.',

    originalSourcingSignal:
      'Series C announcement dated 11 February 2025 disclosing a USD 125 million round led by Growth Equity at Goldman Sachs Alternatives at a reported USD 1.125 billion valuation, with SoftBank Vision Fund 2 joining.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-02-11',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'A European headquartered company reaching unicorn status with a Goldman growth equity lead and SoftBank participation is a specific pattern. Companies that raise from that investor set typically have revenue quality that supports institutional diligence even when they do not disclose it publicly.',
    whyMayNeedGrowthCapital:
      'Eighteen months since the last disclosed round, in a category where two well funded competitors have raised since. Competitive go to market spend in security automation has escalated over that period.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity in the United States market',
      'Product investment in AI workflow capability',
      'Expansion beyond security into broader information technology automation',
      'Compliance and certification investment for regulated buyers',
    ],

    whyEquityMayFit:
      'A category challenger competing against better funded rivals in an escalating go to market environment needs equity to fund share capture rather than to service debt.',
    whyDebtMayFit:
      'On the public record it cannot be assessed. No ARR, retention, margin, or cash flow figure has been disclosed, and usage growth is not revenue evidence.',
    whyBlendedMayFit:
      'If revenue scale supports it, funding part of a United States go to market build with debt would preserve ownership at a valuation set in early 2025. This is conditional on disclosure that does not exist.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is not assessable: the only disclosed growth measure is usage volume, and no revenue, retention, margin, or cash flow evidence exists. Confirming ARR scale is the prerequisite to any structural view.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Weekly automated actions grew roughly threefold to more than one billion. How closely does pricing track action volume, and what did ARR growth look like over the same period?',
      'The platform can be deployed in a customer own tenant, which matters in regulated industries. What share of ARR comes from financial services and healthcare, and does that carry different contract length and retention?',
      'Torq and Tines have both raised substantially since 2024 and compete for the same accounts. How has that affected win rates and customer acquisition cost?',
    ],
    nextDiligenceStep:
      'Establish ARR and its growth rate separately from the usage metric. The two can diverge substantially under volume based pricing, and every structural question depends on the revenue figure rather than the action count.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Customer count',
      'Named enterprise customers in dated primary sources',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise workflow automation software sold on annual subscription to security and information technology buyers.',
        ['tn-c'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'A Series C led by Goldman Sachs Alternatives with SoftBank Vision Fund 2 participating, and a stated one billion weekly automated actions, against no disclosed customer count, named logos, or revenue scale.',
        ['tn-c', 'tn-pr'],
        'investor-reported',
        'Moderate',
        'Investor quality is meaningful evidence that institutional diligence was satisfied. The complete absence of disclosed customer or revenue scale keeps this at the midpoint.',
      ),
      growthQuality: rate(
        2,
        'A stated threefold increase in weekly automated actions over one year to February 2025. No revenue growth figure has been disclosed at any point.',
        ['tn-c', 'tn-tfn'],
        'company-reported',
        'Limited',
        'Usage growth is a genuine signal but it is not revenue growth, and treating it as such is exactly the substitution this framework is meant to prevent. The metric is also now eighteen months old.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['tn-c'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Workflow automation embeds into security operations runbooks across a customer whole tool estate, and the own tenant deployment model deepens the integration in regulated environments.',
        ['tn-c'],
        'analyst-judgment',
        'Limited',
        'The structural switching cost argument is strong and the deployment model reinforces it. Held below 5 because no customer count, logo list, or concentration data exists to evidence it at this company.',
      ),
      marketAttractiveness: rate(
        4,
        'Security alert and workflow volume grows faster than headcount, which drives automation demand independently of budget expansion.',
        ['tn-c'],
        'analyst-judgment',
        'Moderate',
        'Durable structural driver, held below 5 because the category is crowded with well funded direct competitors and platform vendors bundling equivalent capability.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 272 million of disclosed funding with no disclosed revenue against which to assess it.',
        ['tn-c'],
        'analyst-judgment',
        'Limited',
        'Rated 2 rather than 1 because total capital raised is moderate by the standards of this universe, bounding the potential inefficiency even though the revenue denominator is unknown.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately eighteen months since the last disclosed round, in a category where direct competitors have raised more recently and at larger scale.',
        ['tn-c'],
        'analyst-judgment',
        'Moderate',
        'Competitive financing pressure creates a plausible timing case, but eighteen months after a USD 125 million round is not obviously a point of need.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive, authors company announcements under his own name, and is publicly identified alongside his co-founder. No finance leader is publicly disclosed.',
        ['tn-c'],
        'company-reported',
        'Moderate',
        'Founder chief executive who writes publicly is a strong outreach profile. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Institutional investor validation from Goldman Sachs Alternatives and SoftBank',
          'Strong disclosed usage growth indicating product traction',
          'Competitive environment requiring go to market investment',
          'Regulated industry deployment model as a differentiator',
        ],
        conditions:
          'Subject to establishing ARR scale and revenue growth, neither of which is public. The usage metric supports the direction of travel but cannot substitute for revenue.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise annual subscription contract model is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and usage volume is not a substitute for any of them. A debt view would require all of these to be confirmed first.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined go to market expansion requirement',
          'Valuation set in early 2025 that shareholders may prefer to preserve',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear, and that component is currently unsupported.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Where usage growth is disclosed but revenue growth is not, the gap between the two is the whole question, and understanding it early determines which capital sources are available at all.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Eoin Hinchy, co-founder and Chief Executive Officer',
          subject: 'Tines regulated industry mix and the own tenant deployment model',
          body: `Eoin,

I have been researching workflow automation companies serving security teams, and Tines is the one where the deployment model looks like the actual differentiator rather than the interface.

Running inside a customer own tenant is a meaningful advantage in financial services and healthcare, and it usually shows up in contract length and renewal behaviour rather than in the initial sale. I was interested in whether that is how it plays out in practice.

The other thing I would be interested in learning is how closely pricing tracks the action volume you disclose. Growing to more than a billion weekly actions is a striking number, and whether revenue moves with it is the part the public record does not show.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'tn-c',
        'Tines',
        'Announcing our USD 125M Series C fundraise',
        'https://www.tines.com/blog/series-c-fundraise/',
        '2025-02-11',
        'primary',
      ),
      src(
        'tn-pr',
        'PR Newswire',
        'Tines Secures USD 125M in Series C Financing, Bringing Total Valuation to USD 1.125B',
        'https://www.prnewswire.com/news-releases/tines-secures-125m-in-series-c-financing-bringing-total-valuation-to-1-125b-302372726.html',
        '2025-02-11',
        'corroborating',
        true,
      ),
      src(
        'tn-tfn',
        'Tech Funding News',
        'Tines raises USD 125M at USD 1.1B valuation',
        'https://techfundingnews.com/new-unicorn-from-ireland-next-gen-ai-automation-startup-tines-raises-125m-at-1-1b-valuation/',
        '2025-02-12',
        'corroborating',
      ),
      src(
        'tn-eus',
        'EU-Startups',
        'EUR 120.7 million for Tines and its AI-powered workflow platform',
        'https://www.eu-startups.com/2025/02/e120-7-million-for-tines-and-its-ai-powered-workflow-platform/',
        '2025-02-12',
        'corroborating',
      ),
      src(
        'tn-site',
        'Tines',
        'Tines platform and product documentation',
        'https://www.tines.com/',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Tines remains privately held and independently operating. The company continues to publish product and company content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['tn-c', 'tn-site'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'zip',
    name: 'Zip',
    website: 'https://zip.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2020,
    founders: ['Rujul Zaparde', 'Lu Cheng'],
    ceo: 'Rujul Zaparde, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Workflow automation',
    subsector: 'Procurement orchestration and intake management',
    productDescription:
      'Zip provides a procurement orchestration layer that sits in front of a company existing enterprise resource planning and procure to pay systems. Employees submit purchase requests through a single intake, and Zip routes each one through the required finance, legal, security, and privacy approvals before it reaches the system of record.',
    targetCustomer:
      'Chief procurement officers and finance operations leaders at enterprises where purchase approval spans multiple functions and existing procure to pay software has poor employee adoption.',
    businessModel:
      'Annual enterprise subscription priced on spend under management and modules deployed, sold direct to enterprise procurement and finance functions.',

    financingStage: 'Series D',
    latestFinancing: 'USD 190 million Series D led by BOND at a reported USD 2.2 billion valuation',
    financingDate: '2024-10-21',
    totalDisclosedFunding: 'Approximately USD 370 million',
    investors: [
      'BOND',
      'DST Global',
      'Adams Street Partners',
      'Alkeon Capital',
      'Y Combinator',
      'CRV',
      'Tiger Global Management',
    ],

    customerEvidence: claim(
      'Company announcement dated 21 October 2024 names Barings, Benchling, Dollar Tree, Figma, Instacart, Udemy, Northwestern Mutual, Prudential, Snowflake, Toast, and Coinbase as customers, and states more than USD 107 billion in spend processed across 3.9 million suppliers on the platform.',
      'company-reported',
      ['zip-d', 'zip-bw'],
      true,
      '2024-10-21',
    ),
    commercialMaturitySignal: claim(
      'A named customer list spanning insurance, retail, financial services, and software, more than USD 107 billion of processed spend, 3.9 million suppliers managed, and a Series D described as the largest procurement technology investment in over two decades.',
      'company-reported',
      ['zip-d', 'zip-bw'],
      true,
      '2024-10-21',
    ),
    growthSignal: claim(
      'Reported valuation rose from USD 1.5 billion in 2023 to USD 2.2 billion in October 2024. Company sources disclose cumulative processed spend and customer savings rather than a revenue growth rate.',
      'investor-reported',
      ['zip-d', 'zip-ff'],
      true,
      '2024-10-22',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['zip-d'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. Processed spend of more than USD 107 billion is a platform volume metric and bears no fixed relationship to Zip revenue.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Company sources reference new offices in San Francisco and New York at the company fifth anniversary. No international entity or revenue detail is disclosed in dated primary sources.',
      'not-sufficiently-supported',
      [],
      false,
    ),

    competitiveLandscape:
      'Competes with Coupa, SAP Ariba, Oracle Procurement, Ivalua, and Workday Strategic Sourcing. Zip positions as an orchestration layer above these rather than a replacement, which is both its wedge and its dependency.',
    mainCommercialRisk:
      'The orchestration layer positioning depends on incumbents not fixing their own intake experience. Coupa and SAP both have strong incentive to close that gap, and they own the system of record.',
    mainFinancialRisk:
      'The disclosed metrics are platform volume rather than company revenue. More than USD 107 billion of processed spend says nothing directly about ARR, and no revenue figure has ever been published.',
    mainTechnologyRisk:
      'Sitting above multiple enterprise resource planning and procure to pay systems means maintaining deep integrations with vendors who are also competitors, which is a durable structural dependency.',

    originalSourcingSignal:
      'Series D announcement dated 21 October 2024 disclosing a USD 190 million round led by BOND at a reported USD 2.2 billion valuation, with a named customer list and more than USD 107 billion of processed spend.',
    discoveryChannel: 'Enterprise buyer signal',
    signalDate: '2024-10-21',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'The named customer list is the signal rather than the round. Barings, Northwestern Mutual, Prudential, and Dollar Tree alongside Figma and Snowflake indicates the product sells into conservative regulated buyers as well as technology companies, which is a harder and more valuable proof point.',
    whyMayNeedGrowthCapital:
      'Nearly two years since the last disclosed round, with an enterprise sales motion into large regulated organisations that carries long cycles and high customer acquisition cost ahead of the revenue.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity for large regulated buyers',
      'International expansion beyond the United States base',
      'Product investment in AI assisted approval routing',
      'Deepening integrations with enterprise resource planning systems of record',
    ],

    whyEquityMayFit:
      'An enterprise land and expand motion with long sales cycles into large regulated accounts requires patient capital that is not sensitive to quarterly cash conversion.',
    whyDebtMayFit:
      'It cannot be assessed publicly. Processed spend is not revenue, and no ARR, retention, margin, or cash flow figure has been disclosed.',
    whyBlendedMayFit:
      'If revenue scale supports it, funding part of the enterprise build with debt would preserve ownership at a valuation set in late 2024. That is conditional on evidence that does not exist publicly.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is not assessable: the disclosed metrics measure platform volume rather than company revenue, and no lender could size a facility against them. Establishing ARR is the prerequisite.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'More than USD 107 billion of spend is processed through the platform. What is the relationship between processed spend and Zip ARR, and does pricing scale with volume or with modules deployed?',
      'The customer list includes both regulated financial institutions and fast growing software companies. How do contract length, expansion rate, and retention differ between those two cohorts?',
      'Zip orchestrates above Coupa, SAP Ariba, and Oracle. What happens to the wedge as those vendors improve their own intake experience, and how is that reflected in renewal conversations?',
    ],
    nextDiligenceStep:
      'Establish ARR and its relationship to processed spend. Volume metrics of this size can create an impression of scale that the revenue base does not support, and every structural question depends on the revenue figure.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Relationship between processed spend and revenue',
      'Customer count',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise procurement software sold on annual subscription to procurement and finance buyers at large enterprises.',
        ['zip-d'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'Named customers including Barings, Northwestern Mutual, Prudential, Dollar Tree, Snowflake, and Coinbase, with more than USD 107 billion of processed spend across 3.9 million suppliers.',
        ['zip-d', 'zip-bw'],
        'company-reported',
        'Moderate',
        'The named logo list is the strongest evidence here, spanning conservative regulated buyers as well as technology companies, which is a harder sale. Held below 5 because no revenue scale or customer count is disclosed.',
      ),
      growthQuality: rate(
        2,
        'Reported valuation rose from USD 1.5 billion to USD 2.2 billion between 2023 and October 2024. No revenue or ARR growth figure has been disclosed.',
        ['zip-d', 'zip-ff'],
        'investor-reported',
        'Limited',
        'Valuation appreciation is a price signal, not a growth measure, and the cumulative volume metrics disclosed alongside it do not resolve into a growth rate either.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['zip-d'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Procurement approval workflows encode a company internal control structure and become part of its audit trail, which is difficult to unwind. The named customer set spans regulated financial institutions where those controls are examined.',
        ['zip-d'],
        'company-reported',
        'Moderate',
        'Strong structural stickiness reinforced by the regulated customer mix. Held below 5 because the orchestration layer sits above a system of record that a customer could consolidate onto instead.',
      ),
      marketAttractiveness: rate(
        3,
        'Procurement control obligations grow with company size and regulatory scrutiny, but the category is dominated by entrenched suite vendors who own the system of record.',
        ['zip-d'],
        'analyst-judgment',
        'Moderate',
        'A real and durable need, offset by the strongest incumbent position of any category in this universe, since the competitors are already installed at the target customers.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 370 million of disclosed funding with no disclosed revenue against which to assess it.',
        ['zip-d'],
        'analyst-judgment',
        'Limited',
        'Rated 2 rather than 1 because capital raised is moderate relative to the peer set here, bounding the potential inefficiency even with an unknown denominator.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately twenty two months since the last disclosed round, with an enterprise sales motion that carries high cost ahead of revenue.',
        ['zip-d'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time creates a plausible window, but a USD 190 million round is substantial and nothing public indicates it has been consumed.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and is publicly identified alongside his co-founder in company announcements. No finance leader is publicly disclosed.',
        ['zip-d'],
        'company-reported',
        'Moderate',
        'Founder chief executive access is favourable. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Named enterprise customer base spanning regulated and technology buyers',
          'Large addressable category with a clear product wedge',
          'Enterprise motion requiring investment ahead of revenue',
          'Institutional investor validation from BOND and DST Global',
        ],
        conditions:
          'Subject to establishing ARR scale and growth, and to a view on how durable the orchestration wedge is against incumbent suite vendors improving their own intake.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise annual subscription contract model is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. Processed spend of more than USD 107 billion is a platform volume metric that bears no established relationship to Zip revenue, and treating it as a proxy for scale would be an error. No ARR, retention, margin, burn, or cash balance is disclosed.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined enterprise go to market expansion requirement',
          'Valuation set in late 2024 that shareholders may prefer to preserve',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating is constrained by an unsupported debt component.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Where a company discloses platform volume but not revenue, the two can diverge widely, and establishing the relationship between them determines what capital structures are genuinely available.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Rujul Zaparde, co-founder and Chief Executive Officer',
          subject: 'Zip cohort behaviour across regulated and technology customers',
          body: `Rujul,

I have been researching procurement software and how orchestration layers hold up against the suite vendors that own the system of record, and Zip is the clearest test case.

The part of the Series D announcement I keep returning to is the customer list. Barings, Northwestern Mutual, and Prudential alongside Figma and Snowflake is an unusual mix, because those two groups buy very differently and usually renew very differently too.

I would be interested in learning how those cohorts compare on expansion and retention, and whether the regulated accounts behave as the more durable base you would expect.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'zip-d',
        'Zip',
        'Zip raises USD 190 million in Series D funding',
        'https://zip.com/blog/series-d',
        '2024-10-21',
        'primary',
      ),
      src(
        'zip-bw',
        'Zip via Business Wire',
        'Zip Secures USD 190 Million in Landmark Series D Funding',
        'https://www.businesswire.com/news/home/20241021142811/en/Zip-Secures-$190-Million-in-Landmark-Series-D-Funding-Marking-the-Largest-Investment-in-Procurement-Technology-in-Over-Two-Decades',
        '2024-10-21',
        'primary',
      ),
      src(
        'zip-ff',
        'FinTech Futures',
        'Procurement fintech Zip raises USD 190m Series D at USD 2.2bn valuation',
        'https://www.fintechfutures.com/fintech/procurement-fintech-zip-raises-190m-series-d-at-2-2bn-valuation',
        '2024-10-22',
        'corroborating',
      ),
      src(
        'zip-site',
        'Zip',
        'Zip procurement orchestration platform documentation',
        'https://zip.com/',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Zip remains privately held and independently operating. The company continues to publish product and company content under its own name at its current domain and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['zip-d', 'zip-site'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'modern-treasury',
    name: 'Modern Treasury',
    website: 'https://www.moderntreasury.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2018,
    founders: ['Dimitri Dadiomov', 'Matt Marcus', 'Sam Aarons'],
    ceo: 'Dimitri Dadiomov, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Financial technology infrastructure',
    subsector: 'Payment operations and ledgering',
    productDescription:
      'Modern Treasury provides money movement infrastructure through a single application programming interface covering ACH, wire, real time payments and FedNow, push to card, and stablecoins. The platform includes a double entry ledger, reconciliation, and compliance tooling, and in February 2026 the company launched an integrated payment service provider offering.',
    targetCustomer:
      'Engineering and finance teams at software companies and financial institutions that move money as part of their product and need programmatic control over accounts, rails, and reconciliation.',
    businessModel:
      'Usage based pricing on payment volume and platform subscription, sold to enterprise and growth stage technology companies.',

    financingStage: 'Series C',
    latestFinancing: 'Series C at a reported USD 2.2 billion valuation',
    financingDate: '2021-11-03',
    totalDisclosedFunding: 'Approximately USD 183 million',
    investors: [
      'Altimeter Capital',
      'Benchmark',
      'SVB Capital',
      'Salesforce Ventures',
      'Y Combinator',
      'Ryan Petersen',
    ],

    customerEvidence: claim(
      'Company announcement dated 18 February 2026 names Anchorage Digital, Float, Gusto, Navan, Procore, and Sling Money as customers and states the platform has processed more than USD 400 billion. Company sources separately reference approximately 160 enterprise customers, up 70 percent over the prior year.',
      'company-reported',
      ['mt-payments', 'mt-forbes'],
      true,
      '2026-02-18',
    ),
    commercialMaturitySignal: claim(
      'Eight years of operation, named enterprise customers including Gusto, Navan, and Procore, more than USD 400 billion of processed payment volume, and a completed acquisition integrated into the product.',
      'company-reported',
      ['mt-payments'],
      true,
      '2026-02-18',
    ),
    growthSignal: claim(
      'Company sources reference enterprise customers rising approximately 70 percent over one year to roughly 160. No revenue growth figure has been disclosed.',
      'company-reported',
      ['mt-forbes'],
      true,
      '2026-02-01',
    ),
    recurringRevenueEvidence: claim(
      'The February 2026 announcement states the new Payments product is priced on usage rather than volume commitments. That is a material disclosure for revenue quality assessment: usage pricing without minimum commitments is meaningfully less contractually fixed than committed subscription revenue.',
      'company-reported',
      ['mt-payments'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed. Processed payment volume of more than USD 400 billion is a platform metric and does not translate into company revenue at any disclosed rate.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: claim(
      'Company sources reference the acquisition of Beam, described as strengthening stablecoin on and off ramp capability. Consideration was not disclosed.',
      'company-reported',
      ['mt-payments'],
      false,
    ),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Stripe Treasury, Increase, Column, Unit, and the direct bank integrations that larger customers build themselves. The stablecoin orchestration positioning is newer and contested by both crypto native infrastructure and incumbent processors.',
    mainCommercialRisk:
      'Customers that reach sufficient scale have a standing incentive to build direct bank integrations and remove the intermediary. That is the recurring pattern in payment infrastructure.',
    mainFinancialRisk:
      'Usage based pricing without volume commitments means revenue tracks customer transaction activity rather than contracted minimums. For credit purposes that is materially weaker than committed subscription revenue, and the company has disclosed the pricing model but not the revenue.',
    mainTechnologyRisk:
      'Supporting fiat rails and multiple stablecoins under one interface means absorbing the operational and regulatory complexity of both, and stablecoin regulation is still forming.',

    originalSourcingSignal:
      'Product launch dated 18 February 2026 introducing Modern Treasury Payments, an integrated payment service provider unifying fiat and stablecoin rails, built on infrastructure that has processed more than USD 400 billion.',
    discoveryChannel: 'Product launch',
    signalDate: '2026-02-18',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'Moving from software that orchestrates bank relationships to acting as a payment service provider changes the business materially. It typically changes the regulatory perimeter, the balance sheet requirement, and the revenue model at once, which makes the capital question concrete rather than speculative.',
    whyMayNeedGrowthCapital:
      'Nearly five years since the last disclosed round, alongside a product expansion into payment service provision that usually carries licensing, compliance, and working capital requirements that pure software does not.',
    potentialUseOfProceeds: [
      'Regulatory licensing and compliance infrastructure for the payment service provider model',
      'Working capital to support settlement timing',
      'Continued build of stablecoin orchestration capability',
      'Enterprise sales capacity beyond the approximately 160 account base',
    ],

    whyEquityMayFit:
      'A regulatory perimeter expansion carries execution risk that equity is better suited to bear than debt, and licensing requirements often carry their own capital adequacy expectations.',
    whyDebtMayFit:
      'It is questionable here even before the disclosure gap. Usage based pricing without volume commitments produces exactly the revenue profile that recurring revenue lenders discount most heavily, and no revenue figure exists in any case.',
    whyBlendedMayFit:
      'Working capital needs arising from settlement timing are a genuine use for a facility, but that is a different instrument from a growth facility underwritten against recurring revenue, and it would need to be structured as such.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit against recurring revenue is a poor fit on the disclosed pricing model alone, before considering that no ARR figure exists. This is one of the clearer cases in the universe where a company can be commercially attractive and still be the wrong shape for a recurring revenue facility.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'The Payments product is priced on usage without volume commitments. What share of total revenue sits on committed contracts against pure usage, and how does that shape revenue predictability?',
      'Becoming a payment service provider usually changes the regulatory perimeter and the balance sheet. What licensing and capital adequacy requirements does that introduce?',
      'Enterprise customers reportedly grew approximately 70 percent to around 160. What is the revenue concentration across that base, given that a small number of high volume customers can dominate a usage priced model?',
    ],
    nextDiligenceStep:
      'Establish the committed against usage revenue split and customer concentration. Both are more important here than absolute scale, because usage pricing concentrated in a few large accounts is the specific profile that makes revenue look larger than it is durable.',
    missingInformation: [
      'Annual recurring revenue',
      'Committed against usage based revenue split',
      'Revenue growth rate',
      'Customer concentration',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Regulatory licences held',
      'Acquisition consideration paid for Beam',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        4,
        'B2B financial technology infrastructure sold to engineering and finance teams, with a revenue model that is usage based rather than subscription.',
        ['mt-payments'],
        'company-reported',
        'High',
        'Clearly enterprise software by buyer and product. Held below 5 because the move into payment service provision introduces transaction economics and a regulatory perimeter that sit outside a pure software mandate.',
      ),
      commercialMaturity: rate(
        4,
        'Named customers including Gusto, Navan, Procore, and Anchorage Digital, more than USD 400 billion of processed volume, approximately 160 enterprise customers, and a completed acquisition.',
        ['mt-payments', 'mt-forbes'],
        'company-reported',
        'Moderate',
        'Named logos and processed volume are substantial. Held below 5 because approximately 160 customers is a narrow base and no revenue scale is disclosed.',
      ),
      growthQuality: rate(
        2,
        'Enterprise customer count reportedly up approximately 70 percent over one year to around 160. No revenue growth figure has been disclosed and the customer growth figure does not appear in a dated primary announcement.',
        ['mt-forbes'],
        'company-reported',
        'Limited',
        'A single customer count growth figure from a secondary compilation is thin evidence, and customer count growth in a usage priced model tells you little about revenue growth.',
      ),
      recurringRevenueQuality: rate(
        1,
        'The company has disclosed that its new Payments product is priced on usage rather than volume commitments. No ARR figure and no retention measure is published.',
        ['mt-payments'],
        'company-reported',
        'Moderate',
        'This is the one company in the universe where disclosure actively argues against recurring revenue quality rather than merely being absent. Usage pricing without commitments is the weakest contractual profile here, and the rating reflects a disclosed fact rather than a gap.',
      ),
      customerDurability: rate(
        4,
        'Payment infrastructure and ledgering embed into a customer own product and financial close process, making migration a significant engineering programme.',
        ['mt-payments'],
        'analyst-judgment',
        'Moderate',
        'Very high technical switching cost. Held below 5 because a base of approximately 160 customers implies meaningful concentration risk, and large customers have a standing incentive to build direct.',
      ),
      marketAttractiveness: rate(
        4,
        'Programmatic money movement demand grows with software companies embedding financial services, and stablecoin settlement is a genuinely new rail rather than a repackaged one.',
        ['mt-payments'],
        'analyst-judgment',
        'Moderate',
        'Real structural growth with a new technology driver. Held below 5 because regulatory uncertainty around stablecoins is unresolved and the competitive field includes Stripe.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 183 million of disclosed funding across eight years, the second lowest total in this universe, with no disclosed revenue against which to read it.',
        ['mt-forbes'],
        'analyst-judgment',
        'Limited',
        'Low absolute capital consumption over a long period is genuinely suggestive of discipline, which lifts this above the other companies with no revenue disclosure. It cannot rise further without a denominator.',
      ),
      capitalNeedTiming: rate(
        4,
        'Nearly five years since the last disclosed round, alongside a February 2026 expansion into payment service provision that typically carries licensing and working capital requirements.',
        ['mt-payments'],
        'analyst-judgment',
        'Moderate',
        'The combination of a long financing gap and a business model expansion with its own capital requirements makes a live need more likely here than at recently financed peers.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive, all three co-founders are publicly identified, and the company publishes detailed product and research material under named authorship. No finance leader is publicly disclosed.',
        ['mt-payments'],
        'company-reported',
        'Moderate',
        'Strong founder visibility and a company that publishes substantive research, which gives an informed approach real material to work from.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Business model expansion into payment service provision',
          'Named enterprise customers with deep technical integration',
          'Low historical capital consumption suggesting disciplined use of new capital',
          'Long gap since the last disclosed round',
        ],
        conditions:
          'Subject to establishing revenue scale, customer concentration, and the regulatory capital requirements introduced by the payment service provider model.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Deep technical integration supporting customer persistence is the only meaningful supporting condition',
        ],
        conditions:
          'Not supportable on public information, and the disclosed pricing model argues against it independently. Usage based pricing without volume commitments produces the revenue profile recurring revenue lenders discount most. Any working capital facility to support settlement timing would be a different instrument underwritten on different terms.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Settlement working capital is a genuine and separable financing need',
          'Valuation set in 2021 that shareholders may prefer not to reset',
        ],
        conditions:
          'Subject to establishing revenue scale and concentration. Any debt component would need to be structured against settlement flows rather than against recurring revenue, which is a materially different underwriting exercise.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Moving from orchestration software to payment service provision changes the capital requirement as much as the product, and separating the growth financing question from the settlement working capital question early usually produces better terms on both.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Dimitri Dadiomov, co-founder and Chief Executive Officer',
          subject: 'Modern Treasury revenue mix under usage based Payments pricing',
          body: `Dimitri,

I have been researching payment infrastructure companies and how the move from orchestrating bank relationships to acting as a payment service provider changes the business, and the February launch is the clearest example I have found.

The detail that stood out was the pricing decision: usage based rather than volume commitments. That is a genuine bet on customer growth over contracted predictability, and it is unusual to state it that plainly.

I would be interested in learning how you think about the balance between those two as the Payments product scales, and whether the committed share of revenue is something you expect to grow alongside it.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'mt-payments',
        'Modern Treasury',
        'Modern Treasury Launches Payments: An Integrated Payment Service Provider for Fiat and Stablecoins',
        'https://www.moderntreasury.com/newsroom/press-releases/modern-treasury-launches-payments',
        '2026-02-18',
        'primary',
      ),
      src(
        'mt-spring',
        'Modern Treasury',
        'Spring 2026 Product Release Recap: Introducing Modern Treasury Payments',
        'https://www.moderntreasury.com/journal/spring-product-release-recap',
        '2026-05-01',
        'primary',
      ),
      src(
        'mt-forbes',
        'Forbes',
        'Modern Treasury company overview, funding, valuation, and customer count',
        'https://www.forbes.com/companies/modern-treasury/',
        '2026-02-01',
        'corroborating',
      ),
      src(
        'mt-ci',
        'Crowdfund Insider',
        'Modern Treasury Launches Integrated Payments Platform To Streamline Money Movement',
        'https://www.crowdfundinsider.com/2026/02/262774-modern-treasury-launches-integrated-payments-platform-to-streamline-money-movement/',
        '2026-02-19',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Modern Treasury remains privately held and independently operating. The company launched a major product under its own name in February 2026 and continues to publish research and product material, with no acquisition, registration statement, or exchange listing announced.',
      'independently-verified',
      ['mt-payments', 'mt-forbes'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'highnote',
    name: 'Highnote',
    website: 'https://highnote.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2020,
    founders: ['John MacIlwaine', 'Kin Kee', 'Rachel Huang'],
    ceo: 'John MacIlwaine, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Financial technology infrastructure',
    subsector: 'Card issuing, acquiring, and embedded finance',
    productDescription:
      'Highnote is a unified embedded payments platform combining card issuing and processing, payment acquiring, commercial and consumer credit programmes, money movement, and a real time integrated ledger. The differentiator is that issuing and acquiring sit on one platform rather than requiring separate vendors.',
    targetCustomer:
      'Digital first businesses and platforms launching branded card programmes or embedding payment acceptance, particularly those that would otherwise assemble separate issuing and acquiring vendors.',
    businessModel:
      'Transaction based revenue on payment volume processed, plus platform fees, with revenue growing as customer card programmes scale.',

    financingStage: 'Series B',
    latestFinancing:
      'USD 90 million Series B led by Adams Street Partners in January 2025, subsequently extended by USD 25 million from existing investors to approximately USD 125 million',
    financingDate: '2025-01-15',
    totalDisclosedFunding: 'Approximately USD 173 million',
    investors: [
      'Adams Street Partners',
      'Oak HC/FT',
      'WestCap',
      'Costanoa Ventures',
      'Pinegrove Venture Partners',
    ],

    customerEvidence: claim(
      'Highnote publishes customer case material describing card programme launches. No customer count or named enterprise customer list appears in dated primary announcements reviewed.',
      'company-reported',
      ['hi-site', 'hi-blog'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Named to the Forbes Fintech 50 for a second consecutive year in February 2026, a Series B led by a growth equity firm and extended by existing investors, and a product expansion from issuing into acquiring.',
      'independently-verified',
      ['hi-forbes50', 'hi-pd'],
      false,
    ),
    growthSignal: claim(
      'Company sources describe the period preceding the Forbes Fintech 50 recognition as a year of platform expansion, new product launches, and enterprise growth. No quantified growth figure has been disclosed.',
      'company-reported',
      ['hi-forbes50'],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Revenue is transaction based on payment volume rather than subscription. This is recurring in the sense that it repeats with customer activity, but it is not contracted recurring revenue in the sense a lender underwrites.',
      'analyst-judgment',
      ['hi-site'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue or revenue figure has been disclosed in any primary or corroborated source.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Marqeta, Galileo under SoFi, Lithic, Stripe Issuing, and legacy processors including Fiserv and FIS. The combined issuing and acquiring position is the differentiator against most of these.',
    mainCommercialRisk:
      'Card issuing processing is a scale business with thin unit economics and entrenched incumbents. Winning requires either a defensible technology advantage or a distribution advantage, and both are contested.',
    mainFinancialRisk:
      'Revenue is transaction based and therefore tracks customer programme volume rather than contracted minimums. A small number of large card programmes can dominate revenue, and no concentration data is disclosed.',
    mainTechnologyRisk:
      'Operating issuing, acquiring, credit, and ledger functions on one platform means a single point of failure across all of them, with the regulatory and reputational consequences that carries in payments.',

    originalSourcingSignal:
      'Independent recognition dated February 2026 naming Highnote to the Forbes Fintech 50 for a second consecutive year, following a year of platform expansion and the launch of an acquiring product.',
    discoveryChannel: 'Industry research',
    signalDate: '2026-02-11',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'Highnote is here as a deliberately less obvious selection. It is materially smaller than most of this universe and discloses little, but a second consecutive independent industry listing alongside an issuing to acquiring product expansion is a real signal that warrants tracking even where the financial record is thin.',
    whyMayNeedGrowthCapital:
      'Card issuing and acquiring both require scale to reach acceptable unit economics. A company expanding from one into the other typically needs to fund volume acquisition ahead of the margin, and the last disclosed round was over eighteen months ago.',
    potentialUseOfProceeds: [
      'Sales and partnership capacity to win larger card programmes',
      'Compliance and network certification for the acquiring product',
      'Platform investment to support combined issuing and acquiring volume',
      'Working capital associated with settlement timing',
    ],

    whyEquityMayFit:
      'Building volume in a scale dependent payments business requires capital ahead of margin, which equity is better suited to fund than debt.',
    whyDebtMayFit:
      'It does not fit on the public record. Transaction based revenue is not contracted recurring revenue, no revenue figure has been disclosed, and the company is the smallest in this universe by disclosed funding.',
    whyBlendedMayFit:
      'Settlement working capital is a real financing need in this business model, but it is a specialised facility rather than a growth capital structure, and it would be underwritten on different terms entirely.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure. Private credit against recurring revenue is not applicable given transaction based economics and the absence of any disclosed revenue. This record is retained to demonstrate that a company can be a legitimate origination target while being clearly unsuitable for the debt product.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'Revenue is transaction based on programme volume. What share of total revenue comes from the largest three customer programmes, and how long are those programme agreements?',
      'The platform now spans issuing and acquiring. Are customers adopting both, and what does the combined attach rate do to revenue per customer?',
      'Card issuing processing is a scale business. Where does the company sit relative to the volume threshold at which unit economics become attractive?',
    ],
    nextDiligenceStep:
      'Establish revenue scale and customer concentration. In a transaction based model at this stage, concentration is the dominant risk and it is entirely undisclosed.',
    missingInformation: [
      'Revenue and annual recurring revenue',
      'Revenue growth rate',
      'Customer count',
      'Named customers in dated primary sources',
      'Customer and programme concentration',
      'Processed payment volume',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        3,
        'B2B financial technology infrastructure sold to digital first businesses, with transaction based rather than subscription economics.',
        ['hi-site', 'hi-pd'],
        'company-reported',
        'Moderate',
        'The buyer and the platform are enterprise, but transaction based payments economics sit meaningfully outside a recurring software mandate. This is the lowest mandate fit rating in the universe and it reflects the revenue model rather than the product.',
      ),
      commercialMaturity: rate(
        3,
        'Named to the Forbes Fintech 50 for a second consecutive year, a growth equity led Series B extended by existing investors, and a product expansion from issuing into acquiring, over six years of operation.',
        ['hi-forbes50', 'hi-pd'],
        'independently-verified',
        'Moderate',
        'Repeated independent industry recognition is real third party validation, which holds this at the midpoint. No customer count, named logos, or revenue scale prevents anything higher.',
      ),
      growthQuality: rate(
        1,
        'Growth is described qualitatively in company sources as platform expansion and enterprise growth. No quantified growth figure has been disclosed at any point.',
        ['hi-forbes50'],
        'company-reported',
        'Limited',
        'There is no quantified growth evidence of any kind. Rated 1 rather than 0 because the Series B extension by existing investors is weak circumstantial evidence that insiders saw progress.',
      ),
      recurringRevenueQuality: rate(
        1,
        'Revenue is transaction based on payment volume rather than contracted subscription. No revenue figure and no retention measure is disclosed.',
        ['hi-site'],
        'analyst-judgment',
        'Limited',
        'Transaction based revenue is the weakest recurring profile in this universe, and unlike a subscription model it does not even earn the baseline credit for contractual recurrence.',
      ),
      customerDurability: rate(
        3,
        'Card programmes are operationally difficult to migrate once live, involving network certification and cardholder reissuance, which creates real switching cost.',
        ['hi-site'],
        'analyst-judgment',
        'Limited',
        'The migration cost argument is genuinely strong. Held at 3 because no customer count or concentration data exists, and in a transaction model a small base of programmes is itself a durability risk.',
      ),
      marketAttractiveness: rate(
        3,
        'Embedded finance and branded card programmes continue to expand, but card processing is a mature, scale driven category with thin margins and entrenched incumbents.',
        ['hi-pd'],
        'analyst-judgment',
        'Moderate',
        'Genuine category growth offset by structurally thin economics and incumbents operating at far greater scale.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 173 million of disclosed funding, the lowest in this universe, with no disclosed revenue against which to assess it.',
        ['hi-pd'],
        'analyst-judgment',
        'Limited',
        'Low absolute capital consumption bounds the potential inefficiency, but a scale dependent payments business with no disclosed revenue offers nothing further to assess.',
      ),
      capitalNeedTiming: rate(
        4,
        'Approximately eighteen months since the last disclosed round, in a scale dependent business expanding into an adjacent product line that requires volume investment.',
        ['hi-pd', 'hi-forbes50'],
        'analyst-judgment',
        'Moderate',
        'The combination of a scale dependent model, a product expansion, and elapsed time makes a live capital requirement more likely here than the small disclosed base would otherwise suggest.',
      ),
      outreachPotential: rate(
        3,
        'Founder remains chief executive and all three co-founders are publicly identified. Public commentary on strategy is limited and no finance leader is disclosed.',
        ['hi-site'],
        'company-reported',
        'Limited',
        'Founder chief executive continuity is favourable but public visibility is lower than at most peers here, and there is no disclosed finance counterparty.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Repeated independent industry recognition',
          'Product expansion from issuing into acquiring',
          'Scale dependent model requiring capital ahead of margin',
        ],
        conditions:
          'Subject to establishing revenue scale, programme concentration, and distance from the volume threshold at which unit economics improve. None of these is public.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 0,
        drivers: [],
        conditions:
          'Not supportable and not applicable in this form. Revenue is transaction based rather than contracted recurring, no revenue figure has been disclosed, and the disclosed capital base is the smallest in this universe. A recurring revenue facility is the wrong instrument for this business irrespective of what diligence would reveal. Any debt here would be a settlement working capital facility underwritten on entirely different terms.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: ['Settlement working capital is a genuine but specialised financing need'],
        conditions:
          'Subject to establishing revenue scale and concentration. A blended growth structure is not the right frame for this business at its current stage.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'In a scale dependent payments business, the distance to the volume threshold where unit economics turn is the number that determines everything about financing, and it is worth being explicit about internally before it is tested externally.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'John MacIlwaine, co-founder and Chief Executive Officer',
          subject: 'Highnote combined issuing and acquiring attach rates',
          body: `John,

I have been researching embedded finance infrastructure and which platforms are genuinely differentiated rather than repackaging the same processor relationships, and the combined issuing and acquiring position at Highnote is the part that looks structurally different.

Most platforms make customers assemble those separately. Putting both on one ledger changes the economics for the customer, and presumably changes revenue per customer for you.

I would be interested in learning what the attach rate looks like in practice, and whether customers who adopted issuing first are taking acquiring or whether they arrive wanting both.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'hi-forbes50',
        'Highnote',
        'Highnote Named to Forbes Fintech 50 for Second Consecutive Year',
        'https://highnote.com/blog/highnote-named-to-forbes-fintech-50-for-second-consecutive-year',
        '2026-02-11',
        'primary',
      ),
      src(
        'hi-site',
        'Highnote',
        'Highnote platform, card program management, and product documentation',
        'https://highnote.com/',
        '2026-08-05',
        'primary',
      ),
      src(
        'hi-blog',
        'Highnote',
        'Card Program Management: Launch Faster With Unified Control',
        'https://highnote.com/blog/card-program-management-launch-faster-with-unified-control',
        '2026-01-15',
        'primary',
      ),
      src(
        'hi-pd',
        'Payments Dive',
        'Highnote raises USD 90M for expansion',
        'https://www.paymentsdive.com/news/highnote-embedded-payments-card-issuing-acquiring-capital-expansion/738325/',
        '2025-01-15',
        'corroborating',
      ),
      src(
        'hi-asp',
        'Adams Street Partners',
        'Why We Invested in Highnote, Accelerating the Future of Card Payments',
        'https://www.adamsstreetpartners.com/insights/why-we-invested-in-highnote/',
        '2025-01-16',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Highnote remains privately held and independently operating. The company continues to publish product and company content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['hi-forbes50', 'hi-site'],
      false,
    ),
  },
];
