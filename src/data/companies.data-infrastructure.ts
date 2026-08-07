import type { CompanyInput } from '@/lib/types';
import { NOT_DISCLOSED } from '@/lib/types';
import { claim, rate, src, undisclosed, REVIEW_DATE } from './helpers';

export const dataInfrastructureCompanies: CompanyInput[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'cribl',
    name: 'Cribl',
    website: 'https://cribl.io',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2018,
    founders: ['Clint Sharp', 'Ledion Bitincka', 'Dritan Bitincka'],
    ceo: 'Clint Sharp, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Data infrastructure',
    subsector: 'Telemetry and observability data pipelines',
    productDescription:
      'Cribl sells a telemetry data engine that sits between the systems that emit logs, metrics, and traces and the destinations that store or analyse them. Stream routes and reduces data in flight, Edge collects at source, Lake provides low cost retention, and Search queries data where it rests. The commercial pitch is control over where observability and security data goes and what it costs to keep.',
    targetCustomer:
      'Security operations and observability teams inside large enterprises that already run Splunk, Elastic, Datadog, or a cloud SIEM and are managing rising telemetry volume against a fixed budget.',
    businessModel:
      'Annual subscription priced primarily on data volume processed, sold direct to enterprise and increasingly through cloud marketplaces, with a free tier used as a land motion.',

    financingStage: 'Series E',
    latestFinancing: 'USD 319 million Series E at a reported USD 3.5 billion valuation',
    financingDate: '2024-08-14',
    totalDisclosedFunding: 'Approximately USD 725 million',
    investors: [
      'GV',
      'CRV',
      'Sequoia Capital',
      'IVP',
      'CapitalG',
      'Tiger Global Management',
      'Redpoint Ventures',
    ],

    customerEvidence: claim(
      'Cribl states that its software is used by roughly 50 percent of the Fortune 100 and 35 percent of the Fortune 500, and that customers spending more than USD 500,000 in annual recurring revenue grew more than 50 percent year over year.',
      'company-reported',
      ['cribl-arr300', 'cribl-sa'],
      true,
      '2026-02-11',
    ),
    commercialMaturitySignal: claim(
      'Eight years of operating history, a disclosed ARR base above USD 300 million, a multi product portfolio spanning Stream, Edge, Lake, and Search, and a named position in the enterprise observability stack.',
      'company-reported',
      ['cribl-arr300'],
      true,
      '2026-02-11',
    ),
    growthSignal: claim(
      'Disclosed ARR progression of approximately USD 117 million at the end of 2023, USD 200 million at the end of 2024, and above USD 300 million in 2025, with the company guiding to growth in excess of 40 percent for fiscal 2026.',
      'company-reported',
      ['cribl-arr300', 'cribl-arr200'],
      true,
      '2025-12-31',
    ),
    recurringRevenueEvidence: claim(
      'Revenue is disclosed by the company in annual recurring revenue terms, which implies a subscription or committed consumption contract base rather than perpetual licence or services revenue.',
      'company-reported',
      ['cribl-arr300'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: claim(
      'No net revenue retention figure is published. The company does disclose that customers using more than one product grew more than 90 percent year over year, which is an expansion indicator but is not a retention measure.',
      'company-reported',
      ['cribl-arr300'],
      false,
    ),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 11 February 2026 states annual recurring revenue above USD 300 million, of which cloud ARR is above USD 130 million growing more than 75 percent year over year.',
      'company-reported',
      ['cribl-arr300'],
      true,
      '2026-02-11',
    ),
    capitalEfficiencyEvidence: claim(
      'Disclosed ARR above USD 300 million against approximately USD 725 million of total disclosed funding implies a revenue to capital ratio that reads favourably for a company of this stage. The underlying burn and margin profile is not published.',
      'analyst-judgment',
      ['cribl-arr300', 'cribl-sa'],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Cribl operates as a distributed company and markets to global enterprises, but no dated disclosure of international revenue mix or specific regional entity formation was located.',
      'not-sufficiently-supported',
      [],
      false,
    ),

    competitiveLandscape:
      'Competes for telemetry pipeline budget with Splunk under Cisco, Datadog, Elastic, Confluent for streaming adjacency, and open source collectors such as OpenTelemetry and Vector. The durable question is whether a pipeline layer remains a separate purchase or is absorbed by the platforms on either side of it.',
    mainCommercialRisk:
      'The value proposition is partly cost avoidance against incumbent analytics licences. If Splunk or Datadog materially change pricing, part of the addressable saving compresses.',
    mainFinancialRisk:
      'Volume based pricing means revenue tracks customer data growth. A customer that succeeds in reducing telemetry volume reduces its own Cribl spend, which creates a structural tension between the product promise and the revenue model.',
    mainTechnologyRisk:
      'OpenTelemetry collectors continue to absorb routing and transformation functions at no licence cost, which raises the bar on what the commercial product must do beyond the open standard.',

    originalSourcingSignal:
      'Company announcement dated 11 February 2026 disclosing annual recurring revenue above USD 300 million with fiscal 2026 growth guidance in excess of 40 percent.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2026-02-11',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'Few private enterprise infrastructure companies publish a dated ARR series across three consecutive years. That disclosure alone makes Cribl one of the small number of names where a growth capital conversation can start from a shared factual base rather than from a request for a data room.',
    whyMayNeedGrowthCapital:
      'The last disclosed primary round closed in August 2024. Two years of disclosed growth since then, a stated push into AI era telemetry architecture, and a cloud business growing faster than the base all point to a company that could fund an acceleration, an adjacent product build, or shareholder liquidity without needing to raise for survival.',
    potentialUseOfProceeds: [
      'Continued build out of the cloud products, where disclosed growth is fastest',
      'Enterprise and public sector go to market expansion',
      'Employee and early investor liquidity through a secondary component',
      'Selective acquisition of adjacent telemetry or search capability',
    ],

    whyEquityMayFit:
      'A category leader with a disclosed multi year growth record and an unfinished platform build is the classic profile for primary growth equity, particularly where a secondary component can address long tenured employee holdings.',
    whyDebtMayFit:
      'Disclosed ARR scale above USD 300 million with a subscription contract base is the starting condition lenders look for in a recurring revenue facility. Whether it is actually financeable depends on gross margin, burn, and retention, none of which are public.',
    whyBlendedMayFit:
      'If the objective is to fund expansion while limiting dilution at a reported USD 3.5 billion valuation, a smaller primary equity cheque paired with a recurring revenue facility would raise less dilutive capital per dollar deployed.',
    preliminaryCapitalView:
      'Analyst judgment. Leads on growth equity with a credible secondary component. Potentially suitable for a blended structure, subject to confirming ARR scale, gross margin, net and gross retention, burn, and debt service capacity.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'Cloud ARR is disclosed as growing faster than the total. How much of the reported USD 300 million base is now consumption priced rather than committed, and how does that change revenue predictability for a lender?',
      'Multi product customers grew more than 90 percent year over year. What does net revenue retention look like for the single product cohort compared with the multi product cohort?',
      'The last primary round closed in August 2024. Is the current priority funding an acceleration, providing shareholder liquidity, or neither?',
    ],
    nextDiligenceStep:
      'Request a cohort level ARR bridge separating new, expansion, and churned ARR for fiscal 2024 through fiscal 2026, and reconcile it to the three publicly disclosed ARR milestones.',
    missingInformation: [
      'Gross margin',
      'Net revenue retention',
      'Gross retention',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Finance leader identity',
      'International revenue mix',
    ],

    factors: {
      mandateFit: rate(
        5,
        'Pure play B2B enterprise infrastructure software sold on subscription terms to security and observability buyers inside large enterprises.',
        ['cribl-arr300', 'cribl-site'],
        'company-reported',
        'High',
        'Nothing about the revenue model, buyer, or product sits outside an enterprise software mandate, so there is no reason to mark below a 5.',
      ),
      commercialMaturity: rate(
        5,
        'Disclosed ARR above USD 300 million, stated penetration of roughly half the Fortune 100, and a four product portfolio after eight years of operation.',
        ['cribl-arr300'],
        'company-reported',
        'High',
        'Disclosed revenue scale and enterprise penetration both sit at the top of the private universe reviewed here.',
      ),
      growthQuality: rate(
        5,
        'Three dated ARR milestones across consecutive years, approximately USD 117 million, USD 200 million, and above USD 300 million, plus forward guidance above 40 percent.',
        ['cribl-arr300', 'cribl-arr200'],
        'company-reported',
        'High',
        'Growth is high and, more importantly, disclosed repeatedly across periods rather than asserted once, which is the distinction this factor is meant to capture.',
      ),
      recurringRevenueQuality: rate(
        3,
        'ARR is disclosed and the contract base is subscription led, but no retention measure of any kind is published.',
        ['cribl-arr300'],
        'company-reported',
        'Moderate',
        'Scale is disclosed, so this is not a 2. Retention is entirely absent, so it cannot be a 4. Volume based pricing adds a further reason for caution.',
      ),
      customerDurability: rate(
        4,
        'Telemetry pipelines sit in the path of security and compliance logging, which is difficult to remove once routed. Stated Fortune 100 penetration and 90 percent growth in multi product customers support embeddedness.',
        ['cribl-arr300'],
        'company-reported',
        'Moderate',
        'Strong structural stickiness, held below 5 because the named customer evidence is aggregate percentages rather than a disclosed logo list with contract terms.',
      ),
      marketAttractiveness: rate(
        4,
        'Observability and security telemetry volume grows with infrastructure footprint, and log retention carries regulatory obligations that make part of the spend non discretionary.',
        ['cribl-arr300'],
        'analyst-judgment',
        'Moderate',
        'Durable category with a real structural driver, held below 5 because a meaningful share of the pitch is cost reduction, which is a fund that can be spent only once.',
      ),
      capitalEfficiency: rate(
        4,
        'Above USD 300 million disclosed ARR against approximately USD 725 million of disclosed funding.',
        ['cribl-arr300', 'cribl-sa'],
        'company-reported',
        'Moderate',
        'The ratio reads well, but with no disclosed burn or margin the judgment rests on one input, so it is held below the top rating.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately two years since the last disclosed primary round, with a stated architectural push into AI era telemetry.',
        ['cribl-arr300', 'cribl-seriese'],
        'company-reported',
        'Moderate',
        'A plausible window rather than a stated need. Nothing public indicates the company must raise, which is exactly why this is a 3 and not a 5.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and comments publicly on category strategy. No finance leader is publicly disclosed.',
        ['cribl-arr300', 'cribl-leadership'],
        'company-reported',
        'Moderate',
        'Chief executive access is strong. The absent finance leader removes the natural counterparty for a structure conversation, which caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 5,
        drivers: [
          'Disclosed multi year growth at scale',
          'Unfinished platform build with a faster growing cloud segment',
          'Eight year old cap table with plausible demand for employee liquidity',
          'Category leadership position that supports a premium entry',
        ],
        conditions:
          'Subject to confirming the growth rate is sustained on a like for like basis, and to understanding how much of any round would be primary against secondary.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Disclosed ARR above USD 300 million provides the scale a recurring revenue lender requires',
          'Subscription contract base implies forward revenue visibility',
          'No disclosed existing leverage to subordinate behind',
        ],
        conditions:
          'Potentially suitable, subject to confirming ARR scale on a contracted basis, gross margin, net and gross retention, burn, cash balance, and debt service capacity. Volume based pricing needs specific attention because it makes forward ARR less contractually fixed than a seat based model.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 4,
        drivers: [
          'Reported valuation makes pure primary equity expensive per dollar raised',
          'Disclosed scale is sufficient to support a debt tranche if the undisclosed metrics confirm',
          'A secondary requirement can be met with equity while growth capital comes cheaper through debt',
        ],
        conditions:
          'Subject to confirming debt service capacity and to the company being willing to accept covenant discipline it does not currently carry.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company disclosing ARR above USD 300 million with a faster growing cloud segment has the scale to fund expansion through a mix of primary equity and recurring revenue debt rather than dilution alone, which is worth mapping before the next round is framed.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Clint Sharp, co-founder and Chief Executive Officer',
          subject: 'Cribl cloud ARR mix and the shape of the next raise',
          body: `Clint,

I have been researching how private enterprise infrastructure companies fund the transition from a single flagship product to a platform, and Cribl keeps coming up as one of the few that has disclosed enough to study properly.

The February announcement put ARR above USD 300 million with cloud above USD 130 million growing more than 75 percent. What I found interesting was less the headline than the mix: the faster growing segment is also the one that is consumption priced, which usually changes how a company thinks about the predictability of its forward revenue.

I would be interested in learning how you are thinking about funding the next stage of the cloud build, and whether the roughly two years since the Series E reflects a deliberate decision to grow into the last round rather than a timing question.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'cribl-arr300',
        'Cribl',
        'Cribl Surpasses USD 300 million in ARR, Powering the Essential Infrastructure for the AI Era',
        'https://cribl.io/news/cribl-surpasses-usd300-million-in-arr-powering-the-essential-infrastructure/',
        '2026-02-11',
        'primary',
      ),
      src(
        'cribl-arr200',
        'Cribl',
        'Cribl Surpasses USD 200M in ARR, Growing more than 70 percent Year-over-Year',
        'https://cribl.io/news/cribl-surpasses-200m-in-arr-growing-more-than-70-percent-year-over-year/',
        '2024-12-11',
        'primary',
      ),
      src(
        'cribl-site',
        'Cribl',
        'Cribl product and platform documentation',
        'https://cribl.io/',
        '2026-08-05',
        'primary',
      ),
      src(
        'cribl-leadership',
        'Cribl',
        'Cribl leadership team',
        'https://cribl.io/leadership/',
        '2026-08-05',
        'primary',
      ),
      src(
        'cribl-seriese',
        'CNBC',
        'Cribl profile and Series E coverage',
        'https://www.cnbc.com/2022/11/07/cribl-cnbc-top-startups-for-the-enterprise.html',
        '2022-11-07',
        'corroborating',
      ),
      src(
        'cribl-sa',
        'Yahoo Finance',
        'Cribl Surpasses USD 300 million in ARR',
        'https://finance.yahoo.com/news/cribl-surpasses-300-million-arr-210000117.html',
        '2026-02-11',
        'corroborating',
        true,
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Cribl remains privately held and independently operating. The company continues to publish its own financing and revenue milestones under its own name, most recently in February 2026, and no registration statement, exchange listing, or acquisition has been announced.',
      'independently-verified',
      ['cribl-arr300', 'cribl-site'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'grafana-labs',
    name: 'Grafana Labs',
    website: 'https://grafana.com',
    headquarters: 'New York, New York, United States, operating fully remote',
    foundedYear: 2014,
    founders: ['Raj Dutt', 'Torkel Odegaard', 'Anthony Woods'],
    ceo: 'Raj Dutt, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Enterprise infrastructure software',
    subsector: 'Observability and monitoring',
    productDescription:
      'Grafana Labs commercialises the open source Grafana visualisation project alongside Loki for logs, Mimir for metrics, Tempo for traces, and Pyroscope for profiling. The commercial products are Grafana Cloud, a managed observability service, and Grafana Enterprise, a self managed licence with proprietary integrations and support.',
    targetCustomer:
      'Platform engineering, site reliability, and infrastructure teams, ranging from individual developers on the free tier through to large enterprises running hybrid and multi cloud estates.',
    businessModel:
      'Open core. A free and widely adopted open source project feeds a paid managed cloud service priced on usage and a self managed enterprise licence, giving the company an unusually wide top of funnel relative to its sales spend.',

    financingStage: 'Late stage private',
    latestFinancing:
      'USD 270 million primary and secondary transaction in August 2024 at a reported valuation above USD 6 billion, followed by a secondary transaction announced 30 September 2025 led by Ontario Teachers Pension Plan',
    financingDate: '2025-09-30',
    totalDisclosedFunding: 'Approximately USD 805 million',
    investors: [
      'Lightspeed Venture Partners',
      'CapitalG',
      'Sequoia Capital',
      'Coatue',
      'GIC',
      'Lead Edge Capital',
      'Ontario Teachers Pension Plan',
      'Sapphire Ventures',
      'Tiger Global Management',
    ],

    customerEvidence: claim(
      'Company announcement dated 30 September 2025 states more than 7,000 paying customers and names Anthropic, NVIDIA, Salesforce, Microsoft, and Bloomberg among them.',
      'company-reported',
      ['grafana-400', 'grafana-yahoo'],
      true,
      '2025-09-30',
    ),
    commercialMaturitySignal: claim(
      'Twelve years of operation, more than 7,000 paying customers, a stated user base above 35 million, and recognition as a Leader in the Gartner Magic Quadrant for Observability Platforms.',
      'company-reported',
      ['grafana-400', 'grafana-250'],
      true,
      '2025-09-30',
    ),
    growthSignal: claim(
      'Disclosed ARR rose from above USD 250 million in August 2024 to above USD 400 million in September 2025, with paying customers rising from more than 5,000 to more than 7,000 over the same period.',
      'company-reported',
      ['grafana-400', 'grafana-250'],
      true,
      '2025-09-30',
    ),
    recurringRevenueEvidence: claim(
      'Revenue is disclosed in annual recurring revenue terms across two dated announcements, covering a managed cloud subscription and a self managed enterprise licence.',
      'company-reported',
      ['grafana-400', 'grafana-250'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 30 September 2025 states annual recurring revenue above USD 400 million, against above USD 250 million disclosed in August 2024.',
      'company-reported',
      ['grafana-400', 'grafana-250'],
      true,
      '2025-09-30',
    ),
    capitalEfficiencyEvidence: claim(
      'Above USD 400 million disclosed ARR against approximately USD 805 million of total disclosed funding, of which a material portion was structured as secondary rather than primary capital into the business.',
      'analyst-judgment',
      ['grafana-400', 'grafana-250'],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Company announcement dated 30 September 2025 states more than 1,400 team members across more than 40 countries and describes the use of proceeds as accelerating global expansion.',
      'company-reported',
      ['grafana-400'],
      true,
      '2025-09-30',
    ),

    competitiveLandscape:
      'Competes with Datadog, Splunk under Cisco, Dynatrace, New Relic, Elastic, and the native monitoring services of the major cloud providers. Grafana differentiates on open standards and cost, which positions it well when observability budgets are under review.',
    mainCommercialRisk:
      'Open core conversion is the whole model. If a larger share of the 35 million user base stays on the free self managed path, headline adoption keeps growing while paid ARR does not follow at the same rate.',
    mainFinancialRisk:
      'A substantial share of the disclosed funding total reflects secondary transactions rather than primary capital, so total funding is a poor proxy for cash actually invested in the business and for the cash position today.',
    mainTechnologyRisk:
      'The commercial products depend on projects the company itself open sources. Licence changes are the usual lever when that tension binds, and they carry community and customer risk.',

    originalSourcingSignal:
      'Company announcement dated 30 September 2025 disclosing annual recurring revenue above USD 400 million and more than 7,000 customers, alongside a secondary transaction led by Ontario Teachers Pension Plan.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-09-30',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'The arrival of a pension plan as a lead investor in a secondary transaction is a specific and readable signal. It indicates the company is at a scale and quality where long duration institutional capital is willing to underwrite it, and it usually means an existing shareholder base with real liquidity demand.',
    whyMayNeedGrowthCapital:
      'The stated use of the September 2025 transaction was global expansion. A company running fully remote across more than 40 countries carries entity, payroll, and compliance costs ahead of the revenue those geographies produce, which is a working capital shaped need rather than a survival one.',
    potentialUseOfProceeds: [
      'International go to market build out across the stated 40 country footprint',
      'Enterprise sales capacity to convert the open source user base',
      'Ongoing shareholder liquidity for a twelve year old cap table',
      'Product investment in profiling and AI observability adjacencies',
    ],

    whyEquityMayFit:
      'A twelve year old company with a large employee shareholder base and a stated global expansion agenda is a natural fit for growth equity that can accommodate both primary and secondary in a single transaction, which is what the last two rounds have done.',
    whyDebtMayFit:
      'Above USD 400 million of disclosed ARR across more than 7,000 customers implies both scale and low single customer concentration, which are two of the conditions a recurring revenue lender tests first.',
    whyBlendedMayFit:
      'Where the recurring need is shareholder liquidity rather than operating cash, a debt tranche can fund the buyback while a smaller equity cheque covers growth investment, reducing the dilution cost of a repeat liquidity event.',
    preliminaryCapitalView:
      'Analyst judgment. Strongest fit is late stage growth equity with a secondary component, consistent with the last two disclosed transactions. Private credit is potentially suitable, subject to confirming contracted ARR, gross margin, net and gross retention, burn, and debt service capacity, and to understanding how much of the ARR base is usage priced.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'ARR moved from above USD 250 million to above USD 400 million while customers moved from more than 5,000 to more than 7,000. How much of that increment was expansion within existing accounts against new logos?',
      'Grafana Cloud is usage priced. What share of cloud ARR sits on committed contracts rather than pay as you go, and what does that imply for forward revenue visibility?',
      'The last two transactions carried a secondary component. Is recurring shareholder liquidity now a planned part of the capital strategy rather than an occasional event?',
    ],
    nextDiligenceStep:
      'Reconcile the two disclosed ARR milestones against customer count to derive implied average contract value, then test whether growth is being carried by expansion or by logo addition.',
    missingInformation: [
      'Gross margin',
      'Net revenue retention',
      'Gross retention',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Split of total funding between primary and secondary',
      'Finance leader identity',
      'Cloud against enterprise licence revenue mix',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise infrastructure software sold as a managed subscription and a self managed enterprise licence to platform and reliability engineering buyers.',
        ['grafana-400'],
        'company-reported',
        'High',
        'Squarely inside an enterprise software mandate on product, buyer, and revenue model.',
      ),
      commercialMaturity: rate(
        5,
        'More than 7,000 paying customers, above USD 400 million disclosed ARR, named customers including NVIDIA, Salesforce, Microsoft, and Bloomberg, and Gartner Magic Quadrant Leader recognition.',
        ['grafana-400', 'grafana-250'],
        'company-reported',
        'High',
        'Customer count, revenue scale, named logos, and independent analyst recognition are all present, which is the full set this factor asks for.',
      ),
      growthQuality: rate(
        4,
        'Two dated ARR disclosures thirteen months apart showing a move from above USD 250 million to above USD 400 million, with customer count rising in parallel.',
        ['grafana-400', 'grafana-250'],
        'company-reported',
        'High',
        'Growth is well evidenced across two periods but the disclosures are floor figures rather than exact values, so the true rate cannot be computed precisely. That imprecision is why this is a 4 rather than a 5.',
      ),
      recurringRevenueQuality: rate(
        3,
        'ARR disclosed twice with dates against a subscription and licence base, but no retention measure is published and the cloud product is usage priced.',
        ['grafana-400', 'grafana-250'],
        'company-reported',
        'Moderate',
        'Scale and recurrence are evidenced; retention is absent entirely, and usage pricing weakens the contractual fixity a lender would want.',
      ),
      customerDurability: rate(
        5,
        'Observability is embedded in production operations and is difficult to remove once dashboards, alerts, and runbooks are built on it. More than 7,000 paying customers implies very low single name concentration.',
        ['grafana-400'],
        'company-reported',
        'High',
        'Both switching cost and customer breadth are strongly evidenced, which is the combination this factor rewards most.',
      ),
      marketAttractiveness: rate(
        4,
        'Observability spend scales with infrastructure footprint and is largely non discretionary once systems are in production.',
        ['grafana-400'],
        'analyst-judgment',
        'Moderate',
        'Structurally attractive, held below 5 because the category is unusually crowded with well capitalised incumbents competing directly on price.',
      ),
      capitalEfficiency: rate(
        3,
        'Above USD 400 million disclosed ARR against approximately USD 805 million of disclosed funding, though a material portion of that total was secondary rather than primary capital.',
        ['grafana-400'],
        'analyst-judgment',
        'Limited',
        'The headline ratio is respectable but the primary against secondary split is not disclosed, so the denominator is unreliable. Rating held at 3 to reflect that the input cannot be trusted rather than to imply the company is inefficient.',
      ),
      capitalNeedTiming: rate(
        3,
        'Stated global expansion agenda across more than 40 countries, with the most recent disclosed transaction structured as secondary rather than primary.',
        ['grafana-400'],
        'company-reported',
        'Moderate',
        'A clear use for capital exists, but the most recent transaction did not put primary capital into the business, which suggests the operating need is not acute.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and is quoted directly in company announcements on strategy. No finance leader is publicly disclosed.',
        ['grafana-400'],
        'company-reported',
        'Moderate',
        'Strong chief executive visibility, with no disclosed finance counterparty for a structure discussion.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 5,
        drivers: [
          'Disclosed ARR growth at scale across two dated periods',
          'Stated global expansion programme with an identified use of capital',
          'Twelve year old cap table with demonstrated appetite for secondary liquidity',
          'Institutional validation from a pension plan lead investor',
        ],
        conditions:
          'Subject to confirming the growth rate on exact rather than floor ARR figures, and understanding the intended primary against secondary split.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Disclosed ARR above USD 400 million clears typical recurring revenue facility scale thresholds',
          'More than 7,000 customers implies minimal single name concentration risk',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming contracted against usage priced ARR, gross margin, net and gross retention, burn, cash balance, and debt service capacity. The open core model means a portion of the user base generates no revenue, so user metrics must not be read as revenue quality.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 4,
        drivers: [
          'Recurring shareholder liquidity requirement that debt can fund more cheaply than equity',
          'Sufficient disclosed scale to support a debt tranche if undisclosed metrics confirm',
          'Growth investment and liquidity are separable needs that suit separate instruments',
        ],
        conditions:
          'Subject to confirming debt service capacity and to establishing whether existing shareholders would accept leverage ahead of their position.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company that has now run two transactions with a secondary component may find that funding recurring liquidity with debt rather than equity preserves materially more ownership over a five year horizon, which is worth modelling before the next event.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Raj Dutt, co-founder and Chief Executive Officer',
          subject: 'Grafana open source conversion and the funding of global expansion',
          body: `Raj,

I have been researching how open core infrastructure companies finance the gap between where their users are and where their entities are, and Grafana is the clearest case I have found.

The September announcement put ARR above USD 400 million with more than 7,000 paying customers and a team across more than 40 countries. The part I keep returning to is that the last two transactions carried a secondary component rather than being purely primary, which reads as a company funding its expansion from operations and using the market for liquidity instead.

I would be interested in learning whether that is the deliberate strategy it appears to be, and how you think about the conversion economics of the free user base as the enterprise motion scales.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'grafana-400',
        'Grafana Labs',
        'Grafana Labs Surpasses USD 400M ARR and 7,000 Customers, Gains New Investors to Accelerate Global Expansion',
        'https://grafana.com/press/2025/09/30/grafana-labs-surpasses-400m-arr-and-7000-customers-gains-new-investors-to-accelerate-global-expansion/',
        '2025-09-30',
        'primary',
      ),
      src(
        'grafana-250',
        'Grafana Labs',
        'Grafana Labs Soars Past USD 250M ARR and 5,000 Customers, Completes USD 270M Primary and Secondary Transaction',
        'https://grafana.com/press/2024/08/21/grafana-labs-soars-past-250m-arr-and-5000-customers-completes-270m-primary-and-secondary-transaction-and-named-a-leader-in-the-gartner-magic-quadrant-for-observability-platforms/',
        '2024-08-21',
        'primary',
      ),
      src(
        'grafana-bdw',
        'BigDATAwire',
        'Grafana Labs Raises USD 270M, Boosting Valuation to Over USD 6B',
        'https://www.hpcwire.com/bigdatawire/2024/08/26/grafana-labs-raises-270m-boosting-valuation-to-over-6b/',
        '2024-08-26',
        'corroborating',
      ),
      src(
        'grafana-yahoo',
        'Yahoo Finance',
        'Grafana Labs Surpasses USD 400M ARR and 7,000 Customers',
        'https://finance.yahoo.com/news/grafana-labs-surpasses-400m-arr-130000076.html',
        '2025-09-30',
        'corroborating',
        true,
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Grafana Labs remains privately held and independently operating. Its most recent disclosed transaction in September 2025 was a private secondary sale among institutional investors, not a public offering, and no acquisition or registration statement has been announced.',
      'independently-verified',
      ['grafana-400', 'grafana-bdw'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'sigma-computing',
    name: 'Sigma Computing',
    website: 'https://www.sigmacomputing.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2014,
    founders: ['Rob Woollen', 'Jason Frantz'],
    ceo: 'Mike Palmer, Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Data infrastructure',
    subsector: 'Cloud analytics and business intelligence',
    productDescription:
      'Sigma provides a business intelligence and analytics layer that runs directly against cloud data warehouses such as Snowflake, Databricks, BigQuery, and Redshift. The interface is a spreadsheet, which lets business users query billions of rows without SQL, and the product supports write back so analysis can update source systems rather than only read from them.',
    targetCustomer:
      'Data and analytics teams inside mid market and enterprise organisations that have already committed to a cloud data warehouse and need to put it in front of non technical business users.',
    businessModel:
      'Annual subscription priced by user type, with a strong partner led motion through the cloud data warehouse vendors whose consumption Sigma drives.',

    financingStage: 'Series D',
    latestFinancing: 'USD 200 million Series D at a reported USD 1.5 billion valuation',
    financingDate: '2024-05-16',
    totalDisclosedFunding: 'Approximately USD 581 million',
    investors: [
      'Spark Capital',
      'Avenir Growth Capital',
      'NewView Capital',
      'Snowflake Ventures',
      'Sutter Hill Ventures',
      'D1 Capital Partners',
      'XN',
      'Altimeter Capital',
    ],

    customerEvidence: claim(
      'Company and press coverage of the Series D reference a customer base of approximately 1,000 organisations. Named enterprise logos are not consistently disclosed in dated primary sources.',
      'company-reported',
      ['sigma-seriesd', 'sigma-tt'],
      true,
      '2024-05-23',
    ),
    commercialMaturitySignal: claim(
      'Twelve years of operation, a Series D round led by two growth investors, participation from Snowflake Ventures as a strategic backer, and an approximately 1,000 organisation customer base.',
      'investor-reported',
      ['sigma-seriesd', 'sigma-tt'],
      true,
      '2024-05-23',
    ),
    growthSignal: claim(
      'At the time of the Series D the company stated revenue had grown approximately 100 percent year over year for four consecutive years. No dated revenue figure has been published by the company since.',
      'company-reported',
      ['sigma-seriesd'],
      true,
      '2024-05-16',
    ),
    recurringRevenueEvidence: claim(
      'The product is sold on annual subscription by user type. The company describes its growth in revenue rather than ARR terms, so the recurring share is not separately disclosed.',
      'company-reported',
      ['sigma-seriesd'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed by the company. Third party aggregators publish revenue estimates, but these are not primary or corroborated disclosures and are not relied upon here.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Looker under Google, Power BI under Microsoft, Tableau under Salesforce, ThoughtSpot, and the native notebook and dashboard tools shipped by Snowflake and Databricks. The strategic question is whether the warehouse vendors keep treating the analytics layer as a partner opportunity or absorb it.',
    mainCommercialRisk:
      'Sigma sits directly on top of cloud data warehouses whose vendors also ship their own analytics interfaces. Snowflake Ventures is on the cap table, which helps, but partner and competitor are the same party.',
    mainFinancialRisk:
      'Growth is described in percentage terms without a disclosed revenue base or ARR figure, and the most recent such statement dates to May 2024. Two years without an updated disclosure is itself informative, and no current scale can be established from public sources.',
    mainTechnologyRisk:
      'The spreadsheet interface is the differentiator. It is a design advantage rather than a technical moat, and it is reproducible by better resourced incumbents.',

    originalSourcingSignal:
      'Series D announcement dated 16 May 2024 disclosing a USD 200 million round co-led by Spark Capital and Avenir Growth Capital at a reported USD 1.5 billion valuation, with Snowflake Ventures participating.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2024-05-16',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'The strategic investor position is the interesting part. Snowflake Ventures backing an independent analytics layer that drives Snowflake consumption is a specific commercial alignment, and it is a different qualification question from the usual one about competitive displacement.',
    whyMayNeedGrowthCapital:
      'More than two years have passed since the last disclosed round with no subsequent revenue or financing disclosure. For a company that had been publicising growth annually, that silence makes the current capital position a genuine open question rather than a settled one.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity beyond the approximately 1,000 organisation base',
      'Product investment in AI assisted analysis',
      'Deepening of the cloud data warehouse partner motion',
      'Extension of operating runway if the disclosed growth rate has moderated',
    ],

    whyEquityMayFit:
      'A category challenger with a differentiated interface and strategic investor alignment is a recognisable growth equity profile, provided the growth rate stated in 2024 has held.',
    whyDebtMayFit:
      'On the public record it may not. Nothing about ARR scale, retention, margin, or cash flow has been disclosed, and a subscription model alone is not sufficient to underwrite a facility.',
    whyBlendedMayFit:
      'If the company has moderated growth in exchange for improved unit economics, a smaller primary round paired with a modest facility could extend runway without resetting a USD 1.5 billion valuation set in a different market.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only structure the public record can currently support, and even that is conditional. Private credit is not supportable on public information: no ARR, retention, margin, or cash flow evidence exists, and the correct position is to confirm those before forming any debt view.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'The Series D announcement described approximately 100 percent revenue growth for four consecutive years. What has the growth rate been in the two fiscal years since, and on what revenue base?',
      'Snowflake Ventures is an investor and Snowflake ships competing analytics surfaces. How is that relationship governed, and what share of new business arrives through warehouse partner channels?',
      'What proportion of revenue is committed annual subscription against consumption or seat expansion that can be reduced mid term?',
    ],
    nextDiligenceStep:
      'Establish a current disclosed or company confirmed ARR figure and a two year growth series. Without that, no scoring factor above commercial maturity can be moved off its current rating in either direction.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth since May 2024',
      'Gross margin',
      'Net revenue retention',
      'Gross retention',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Named enterprise customers in dated primary sources',
      'Finance leader identity',
      'International revenue mix',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise analytics software sold on annual subscription to data and business teams.',
        ['sigma-seriesd'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are all squarely enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'Approximately 1,000 customer organisations and a Series D led by institutional growth investors, but no named enterprise logos in dated primary sources and no disclosed revenue scale.',
        ['sigma-seriesd', 'sigma-tt'],
        'investor-reported',
        'Moderate',
        'Customer count and round quality evidence real commercial traction. The absence of named logos and any revenue figure keeps this well below the companies that disclose both.',
      ),
      growthQuality: rate(
        2,
        'A single statement of approximately 100 percent growth for four consecutive years, made in May 2024, with no subsequent dated disclosure.',
        ['sigma-seriesd'],
        'company-reported',
        'Limited',
        'The claim is strong but it is now more than two years old and has not been refreshed. A stale growth claim is weak growth evidence regardless of how high the number was, which is precisely the distinction this factor exists to draw.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Annual subscription model is evidenced, but no ARR figure and no retention measure of any kind is disclosed.',
        ['sigma-seriesd'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it, so it cannot rise further.',
      ),
      customerDurability: rate(
        3,
        'Analytics tools embed into reporting workflows, and write back deepens that. Approximately 1,000 customers implies reasonable breadth, but no concentration data or named logos are available.',
        ['sigma-seriesd', 'sigma-tt'],
        'analyst-judgment',
        'Limited',
        'Structural stickiness is plausible rather than evidenced. Business intelligence tools are also displaced more often than infrastructure, so a middling rating is the honest position.',
      ),
      marketAttractiveness: rate(
        3,
        'Cloud analytics spend grows with data warehouse adoption, but the category is contested by every major cloud and data platform vendor.',
        ['sigma-seriesd'],
        'analyst-judgment',
        'Moderate',
        'Real growth in the underlying category, offset by the most crowded competitive field in the universe reviewed here and by direct platform vendor encroachment.',
      ),
      capitalEfficiency: rate(
        1,
        'Approximately USD 581 million of disclosed funding with no disclosed revenue or ARR figure against which to assess it.',
        ['sigma-seriesd'],
        'analyst-judgment',
        'Limited',
        'This is the anchor case for a 1: substantial capital raised with no disclosed revenue to read it against. It is a statement about what can be verified, not an assertion that the company is inefficient.',
      ),
      capitalNeedTiming: rate(
        4,
        'More than two years since the last disclosed round, with no subsequent financing or revenue disclosure from a company that had previously disclosed annually.',
        ['sigma-seriesd'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time and the break in a previously regular disclosure pattern together make a live capital question more likely here than at recently financed peers.',
      ),
      outreachPotential: rate(
        2,
        'The chief executive is not a founder and public commentary on strategy is limited. No finance leader is publicly disclosed.',
        ['sigma-seriesd'],
        'analyst-judgment',
        'Limited',
        'Low public executive visibility and no disclosed finance counterparty make a cold approach materially harder than at founder led peers.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Differentiated product interface in a large category',
          'Strategic alignment with a major cloud data warehouse vendor',
          'Elapsed time since the last round suggests a live conversation',
        ],
        conditions:
          'Subject to confirming that the growth rate disclosed in May 2024 has been sustained, and to understanding whether the USD 1.5 billion valuation remains a realistic reference point.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: ['Annual subscription contract model is the only supporting condition present'],
        conditions:
          'Not supportable on public information. There is no disclosed ARR, retention, gross margin, burn, or cash balance. A debt view would require all of those to be confirmed first, and the correct position today is to hold no view rather than to infer one from the subscription model alone.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'A runway extension need, if one exists, could suit a mixed instrument',
          'Valuation set in 2024 may make a pure equity round unattractive to existing holders',
        ],
        conditions:
          'Subject to confirming the same ARR, retention, margin, and cash flow evidence that the debt assessment requires. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'For a company two years past its last disclosed round, the useful question is not what it could raise but what structure preserves optionality if the valuation reference point has moved, which is worth working through before a process starts.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Mike Palmer, Chief Executive Officer',
          subject: 'Sigma warehouse partner motion and capital structure options',
          body: `Mike,

I have been researching independent analytics companies that sit directly on top of the cloud data warehouses, and Sigma is the one where the partner dynamic looks most deliberate rather than incidental.

Having Snowflake Ventures on the cap table while Snowflake ships its own analytics surfaces is an unusual position, and from the outside it reads as an alignment on consumption rather than a competitive standoff. I was interested in whether that is how it works in practice, and what share of new business now arrives through the warehouse partner channels.

I would also be interested in learning how you are thinking about capital structure now that the Series D is two years behind you, particularly whether preserving the 2024 valuation reference point is a constraint worth optimising around.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'sigma-seriesd',
        'Sigma Computing',
        'Sigma Raises USD 200 Million in Series D Funding',
        'https://www.sigmacomputing.com/resources/announcements/sigma-raises-200-million-in-series-d-funding',
        '2024-05-16',
        'primary',
      ),
      src(
        'sigma-site',
        'Sigma Computing',
        'Sigma product and platform pages',
        'https://www.sigmacomputing.com/',
        '2026-08-05',
        'primary',
      ),
      src(
        'sigma-tt',
        'TechTarget',
        'Differentiation key as Sigma Computing raises USD 200M',
        'https://www.techtarget.com/searchbusinessanalytics/news/366585775/Differentiation-key-as-Sigma-Computing-raises-200M',
        '2024-05-23',
        'corroborating',
      ),
      src(
        'sigma-bdw',
        'BigDATAwire',
        'Sigma Secures USD 200M Round to Advance Its BI and Analytics Solutions',
        'https://www.bigdatawire.com/2024/05/23/sigma-secures-200m-round-to-advance-its-bi-and-analytics-solutions/',
        '2024-05-23',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Sigma Computing remains privately held and independently operating. The company continues to publish product announcements under its own name and no acquisition, registration statement, or exchange listing has been announced. Its most recent disclosed financing was a private Series D round.',
      'independently-verified',
      ['sigma-seriesd', 'sigma-site'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'monte-carlo',
    name: 'Monte Carlo',
    website: 'https://www.montecarlodata.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2019,
    founders: ['Barr Moses', 'Lior Gavish'],
    ceo: 'Barr Moses, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Data infrastructure',
    subsector: 'Data and AI observability',
    productDescription:
      'Monte Carlo monitors data pipelines for freshness, volume, schema, and distribution anomalies, then traces incidents to root cause across the warehouse, transformation layer, and downstream dashboards. The company has extended the same approach to monitoring AI model outputs and agent behaviour.',
    targetCustomer:
      'Data engineering and analytics platform teams at enterprises where incorrect data reaching a dashboard, a model, or a regulator carries real consequence.',
    businessModel:
      'Annual subscription priced on monitored data assets and connected sources, sold direct to enterprise data teams.',

    financingStage: 'Series D',
    latestFinancing: 'USD 135 million Series D at a reported USD 1.6 billion valuation',
    financingDate: '2022-05-24',
    totalDisclosedFunding: 'Approximately USD 236 million',
    investors: [
      'IVP',
      'Accel',
      'Redpoint Ventures',
      'ICONIQ Growth',
      'GGV Capital',
      'Salesforce Ventures',
      'GIC',
    ],

    customerEvidence: claim(
      'Named customers disclosed in company sources include NASDAQ, Honeywell, Roche, Fox, American Airlines, PepsiCo, JetBlue, Affirm, and SoFi.',
      'company-reported',
      ['mc-seriesd', 'mc-site'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Seven years of operation, a named enterprise customer list spanning financial services, pharmaceuticals, aviation, and consumer goods, and a Series D round led by IVP.',
      'company-reported',
      ['mc-seriesd', 'mc-site'],
      false,
    ),
    growthSignal: claim(
      'At the Series D in May 2022 the company stated it had doubled revenue every quarter since its Series C in August 2021 and had grown headcount from 20 to 120 in twenty months. No dated growth disclosure has been published since.',
      'company-reported',
      ['mc-seriesd'],
      true,
      '2022-05-24',
    ),
    recurringRevenueEvidence: claim(
      'The product is sold as an annual subscription. The company stated 100 percent customer retention in 2021, which is a dated gross retention style disclosure, though it is now four years old.',
      'company-reported',
      ['mc-seriesd'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: claim(
      'The company stated 100 percent customer retention for calendar 2021 in its Series D announcement. This is a single dated point from four years ago and is not treated as current evidence.',
      'company-reported',
      ['mc-seriesd'],
      true,
      '2021-12-31',
    ),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed. Aggregator sites publish estimates and one widely repeated report of a 2025 Series E appears to restate the 2022 Series D terms; neither is corroborated by a primary source and neither is relied upon here.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Bigeye, Anomalo, Soda, Metaplane, and the native quality features shipped inside dbt, Databricks, and Snowflake. Category consolidation into the platforms is the principal structural threat.',
    mainCommercialRisk:
      'Data quality monitoring is a feature that platform vendors have strong incentive to bundle. Every warehouse and transformation vendor has shipped some version of it since 2022.',
    mainFinancialRisk:
      'The most recent primary disclosure is four years old. No current revenue, growth, retention, or cash figure can be established from any reliable public source, which is a material gap for a company of this stage.',
    mainTechnologyRisk:
      'Extending from data observability into AI and agent monitoring places the product against a different and better funded competitive set than the one it originally addressed.',

    originalSourcingSignal:
      'Series D announcement dated 24 May 2022 disclosing a USD 135 million round led by IVP at a reported USD 1.6 billion valuation, with a stated 100 percent customer retention rate for 2021.',
    discoveryChannel: 'Industry research',
    signalDate: '2022-05-24',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Monte Carlo entered the pipeline as a deliberate test of the research standard rather than despite failing it. Widely syndicated sources report a 2025 Series E; on inspection those reports restate the 2022 Series D amount and valuation exactly. Holding the record at what a primary source supports, and saying so, is the point.',
    whyMayNeedGrowthCapital:
      'Four years without a disclosed financing event, in a category where platform vendors have been shipping competing native features throughout that period, makes the capital position an open question. That is a reason to ask rather than a conclusion about the answer.',
    potentialUseOfProceeds: [
      'Product investment in AI and agent observability',
      'Enterprise sales capacity',
      'Runway extension if growth has moderated from the 2022 rate',
      'Consolidation of adjacent data quality capability',
    ],

    whyEquityMayFit:
      'A named category creator with a strong enterprise logo list is a growth equity profile if current growth supports it, though the four year disclosure gap means that condition is entirely unverified.',
    whyDebtMayFit:
      'It may not on the public record. The one retention data point is four years old and there is no ARR, margin, or cash flow evidence at all.',
    whyBlendedMayFit:
      'If the company is closer to breakeven than its last disclosure implies, a small facility alongside a modest primary round could avoid a valuation reset. This is speculation about a company that has not disclosed, and is labelled as such.',
    preliminaryCapitalView:
      'Analyst judgment. No structure can be recommended on the current public record. The correct next action is establishing current scale and growth, not selecting an instrument. This record is retained in the universe as a documented example of a company where the public evidence does not support the conclusions that aggregator sources assert.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'Several aggregator sources report a 2025 Series E at USD 135 million and a USD 1.6 billion valuation, which are the exact terms of the 2022 Series D. Has there been a financing event since May 2022?',
      'The 100 percent customer retention figure dates to 2021. What have gross and net retention been in the last two fiscal years, given that warehouse and transformation vendors have shipped native quality monitoring since then?',
      'How much of current revenue comes from the original data observability product against the newer AI and agent monitoring products?',
    ],
    nextDiligenceStep:
      'Establish whether any financing has occurred since May 2022 through direct company confirmation. Until that is resolved, no factor rating here should be revised in either direction.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth since 2022',
      'Any financing event after May 2022',
      'Current net revenue retention',
      'Current gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Finance leader identity',
      'Current customer count',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise data infrastructure software sold on annual subscription to enterprise data engineering teams.',
        ['mc-seriesd', 'mc-site'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are unambiguously enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'A named customer list including NASDAQ, Honeywell, Roche, American Airlines, and PepsiCo across seven years of operation, against no disclosed revenue scale or current customer count.',
        ['mc-seriesd', 'mc-site'],
        'company-reported',
        'Moderate',
        'The logo quality is genuinely strong and is what holds this at 3. Without any disclosed scale or a current customer count it cannot go higher.',
      ),
      growthQuality: rate(
        1,
        'One growth statement, quarterly revenue doubling, made in May 2022 and never updated.',
        ['mc-seriesd'],
        'company-reported',
        'Limited',
        'A four year old growth claim is close to no growth evidence. It is not zero because the claim was specific and primary sourced at the time, but it cannot support anything above a 1 today.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Annual subscription model with a single retention disclosure from 2021 and no ARR figure.',
        ['mc-seriesd'],
        'company-reported',
        'Limited',
        'The recurring model is evidenced and one historic retention point exists, which is marginally more than nothing. No current quantification means it stays at 2.',
      ),
      customerDurability: rate(
        4,
        'Named blue chip customers across regulated and safety critical industries, where data quality failures carry regulatory and operational consequence.',
        ['mc-seriesd', 'mc-site'],
        'company-reported',
        'Moderate',
        'The customer set is the strongest evidence this company has, spanning finance, pharmaceuticals, and aviation. Held below 5 because no concentration data exists and platform bundling directly threatens this stickiness.',
      ),
      marketAttractiveness: rate(
        3,
        'Data reliability spend grows with data estate complexity and gains a new driver from AI deployment, but the category is being absorbed into the surrounding platforms.',
        ['mc-seriesd'],
        'analyst-judgment',
        'Moderate',
        'A genuine and growing need, offset by the clearest bundling threat in this universe. Those roughly cancel to a middling rating.',
      ),
      capitalEfficiency: rate(
        1,
        'Approximately USD 236 million disclosed funding with no disclosed revenue at any point against which to read it.',
        ['mc-seriesd'],
        'analyst-judgment',
        'Limited',
        'Capital raised is known and revenue is entirely unknown, so no efficiency judgment is possible. Rated 1 to reflect absent evidence, not inefficiency.',
      ),
      capitalNeedTiming: rate(
        3,
        'Four years since the last disclosed financing event, during a period of active competitive encroachment.',
        ['mc-seriesd'],
        'analyst-judgment',
        'Limited',
        'The elapsed time is suggestive but could equally mean the company is self funding. With no cash or burn disclosure the honest reading is genuinely uncertain, which is a 3.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive, publishes regularly on category strategy, and is a recognised public voice in the data engineering community. No finance leader is publicly disclosed.',
        ['mc-seriesd', 'mc-site'],
        'company-reported',
        'Moderate',
        'Unusually high founder visibility and public writing make an approach straightforward. No disclosed finance leader caps it at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 2,
        drivers: [
          'Named category creator with a strong enterprise logo list',
          'A four year financing gap that may indicate a live requirement',
        ],
        conditions:
          'Subject to establishing current revenue scale and growth, neither of which is available publicly. The rating reflects unverifiable current performance rather than a negative view of the business.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Annual subscription contract model and one historic retention disclosure are the only supporting conditions present',
        ],
        conditions:
          'Not supportable on public information. The single retention figure is four years old and there is no ARR, gross margin, burn, or cash balance evidence. Recommending debt here would be an invented conclusion.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: ['A runway extension need, if one exists, could suit a mixed instrument'],
        conditions:
          'Subject to the same evidence the debt assessment requires. A blended structure cannot be better supported than its debt component, and that component is currently unsupported.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'For a company whose last disclosed financing is four years old, the most valuable near term step is establishing what the current operating picture actually is, because the public record has drifted into restating stale figures as if they were new.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Barr Moses, co-founder and Chief Executive Officer',
          subject: 'Monte Carlo public record and the AI observability extension',
          body: `Barr,

I have been researching how data infrastructure companies have held up as the warehouse and transformation platforms shipped native quality monitoring, and Monte Carlo is the company I most wanted to understand properly.

One thing I ran into is worth flagging. Several widely syndicated sources report a 2025 Series E at USD 135 million and a USD 1.6 billion valuation. Those are the exact terms of the May 2022 Series D, so I have kept my own record at what the primary announcement supports rather than what the aggregators assert.

I was interested in how the extension into AI and agent observability is landing commercially, and whether it is being bought by the same data engineering buyer or by a different one.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'mc-seriesd',
        'Monte Carlo',
        'Monte Carlo Raises USD 135M Series D To Accelerate The Rapid Growth Of The Data Observability Category',
        'https://montecarlo.ai/blog-monte-carlo-raises-135m-series-d-to-accelerate-the-rapid-growth-of-the-data-observability-category/',
        '2022-05-24',
        'primary',
      ),
      src(
        'mc-site',
        'Monte Carlo',
        'Monte Carlo product, customer, and platform pages',
        'https://www.montecarlodata.com/',
        '2026-08-05',
        'primary',
      ),
      src(
        'mc-contrary',
        'Contrary Research',
        'Monte Carlo company profile and business breakdown',
        'https://research.contrary.com/company/monte-carlo',
        '2025-06-01',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Monte Carlo remains privately held and independently operating. The company continues to publish product and research content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['mc-site', 'mc-contrary'],
      false,
    ),
  },
];
