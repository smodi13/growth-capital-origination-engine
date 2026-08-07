import type { CompanyInput } from '@/lib/types';
import { NOT_DISCLOSED } from '@/lib/types';
import { claim, rate, src, undisclosed, REVIEW_DATE } from './helpers';

export const verticalIndustryCompanies: CompanyInput[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'clio',
    name: 'Clio',
    website: 'https://www.clio.com',
    headquarters:
      'Burnaby, British Columbia, Canada, with offices in Vancouver, Toronto, Calgary, London, Manchester, Dublin, Sydney, Barcelona, and Bogota',
    foundedYear: 2008,
    founders: ['Jack Newton', 'Rian Gauvreau'],
    ceo: 'Jack Newton, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Vertical SaaS',
    subsector: 'Legal practice management and legal research',
    productDescription:
      'Clio provides cloud practice management for law firms covering matter management, time tracking, billing, payments, client intake, and document management. The acquisition of vLex in 2025 added legal research and a large primary law corpus, extending the platform from running a firm to doing the legal work itself.',
    targetCustomer:
      'Small and mid sized law firms and legal departments, with a stated presence across more than 130 countries and endorsement relationships with bar associations.',
    businessModel:
      'Annual and monthly subscription per user, with a growing payments attach through Clio Payments that adds transaction revenue on top of the software subscription.',

    financingStage: 'Series G',
    latestFinancing:
      'USD 500 million Series G at a USD 5 billion post money valuation, announced alongside a separate USD 350 million debt facility co-led by Blackstone and Blue Owl Capital',
    financingDate: '2025-11-10',
    totalDisclosedFunding:
      'Approximately USD 1.4 billion of disclosed equity, plus a USD 350 million debt facility disclosed in November 2025',
    investors: [
      'New Enterprise Associates',
      'TCV',
      'Goldman Sachs Asset Management',
      'Sixth Street Growth',
      'JMI Equity',
      'CapitalG',
      'Blackstone',
      'Blue Owl Capital',
    ],

    customerEvidence: claim(
      'Company announcement dated 12 May 2026 states hundreds of thousands of legal professionals across more than 130 countries use the platform. Clio holds bar association approvals, which is a form of institutional endorsement rather than a customer claim.',
      'company-reported',
      ['cl-arr', 'cl-g'],
      true,
      '2026-05-12',
    ),
    commercialMaturitySignal: claim(
      'Eighteen years of operation, ARR above USD 500 million, a stated profitable operating position, presence in more than 130 countries, offices across nine cities, and completion of a USD 1 billion acquisition.',
      'company-reported',
      ['cl-arr', 'cl-g'],
      true,
      '2026-05-12',
    ),
    growthSignal: claim(
      'Company announcement dated 12 May 2026 states annual recurring revenue surpassed USD 500 million with accelerating organic growth. The company did not publish a numerical growth rate alongside that milestone.',
      'company-reported',
      ['cl-arr'],
      true,
      '2026-05-12',
    ),
    recurringRevenueEvidence: claim(
      'Revenue is disclosed in annual recurring revenue terms against a per user subscription base. The company describes the business as profitable and accelerating, which is an unusual disclosure for a private company at this stage.',
      'company-reported',
      ['cl-arr'],
      true,
      '2026-05-12',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 12 May 2026 states annual recurring revenue surpassed USD 500 million.',
      'company-reported',
      ['cl-arr', 'cl-tr'],
      true,
      '2026-05-12',
    ),
    capitalEfficiencyEvidence: claim(
      'The company describes itself as profitable and accelerating in its May 2026 ARR announcement. Separately, institutional lenders extended a USD 350 million facility in November 2025, which is third party evidence that debt service capacity was underwritable at that scale.',
      'company-reported',
      ['cl-arr', 'cl-g'],
      true,
      '2026-05-12',
    ),
    debtEvidence: claim(
      'Company announcement dated 10 November 2025 discloses a USD 350 million debt facility co-led by Blackstone and Blue Owl Capital, raised alongside the Series G equity round. Pricing, covenants, amortisation, and drawn balance were not disclosed.',
      'company-reported',
      ['cl-g', 'cl-law'],
      true,
      '2025-11-10',
    ),
    acquisitionActivity: claim(
      'Company announcement dated 10 November 2025 confirms completion of the acquisition of vLex for USD 1 billion, adding legal research and a primary law corpus to the practice management platform.',
      'company-reported',
      ['cl-g', 'cl-law'],
      true,
      '2025-11-10',
    ),
    internationalExpansion: claim(
      'Company sources state presence across more than 130 countries with offices in Vancouver, Toronto, Calgary, London, Manchester, Dublin, Sydney, Barcelona, and Bogota.',
      'company-reported',
      ['cl-arr'],
      true,
      '2026-05-12',
    ),

    competitiveLandscape:
      'Competes with MyCase and Smokeball in practice management, and with Thomson Reuters and LexisNexis in legal research following the vLex acquisition. The strategic bet is that combining the two categories creates a position neither incumbent group currently holds.',
    mainCommercialRisk:
      'The vLex acquisition moves Clio into direct competition with Thomson Reuters and LexisNexis, both far larger and both holding entrenched research relationships with the same firms.',
    mainFinancialRisk:
      'A USD 1 billion acquisition funded partly with a USD 350 million debt facility introduces integration risk and leverage simultaneously. Facility terms, covenants, and drawn balance are undisclosed, so actual leverage cannot be measured.',
    mainTechnologyRisk:
      'Integrating a large legal research corpus with a practice management platform is a substantial data and product integration, and the AI features that justify the combination depend on that integration working.',

    originalSourcingSignal:
      'Financing announcement dated 10 November 2025 disclosing a USD 350 million debt facility co-led by Blackstone and Blue Owl Capital, raised alongside a USD 500 million Series G to complete a USD 1 billion acquisition.',
    discoveryChannel: 'Credit facility',
    signalDate: '2025-11-10',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'This is the clearest worked example of blended capital in the universe. A USD 500 million equity round and a USD 350 million debt facility raised simultaneously to fund a USD 1 billion acquisition is exactly the structure this project exists to analyse, executed by real counterparties at real scale.',
    whyMayNeedGrowthCapital:
      'Clio has just deployed substantial capital on an acquisition and taken on leverage to do it. The forward need is less likely to be growth capital than a refinancing or upsizing decision as the combined business scales past USD 500 million of ARR.',
    potentialUseOfProceeds: [
      'Refinancing or upsizing the existing facility against a larger combined revenue base',
      'Integration investment across the practice management and legal research platforms',
      'Further consolidation in a legal technology market the company describes as consolidating',
      'Continued international expansion across the stated 130 country footprint',
    ],

    whyEquityMayFit:
      'Acquisition led consolidation requires equity capacity that lenders will not provide alone, and the company has just demonstrated both the appetite and the ability to raise it.',
    whyDebtMayFit:
      'This is the strongest debt case in the universe on public evidence. Disclosed ARR above USD 500 million, a stated profitable operating position, a subscription base across hundreds of thousands of professionals implying negligible concentration, and two of the largest private credit managers having already underwritten the credit.',
    whyBlendedMayFit:
      'It is not a hypothetical here. The company executed a blended structure in November 2025, and the relevant question is the mix at the next event rather than whether a mix is available.',
    preliminaryCapitalView:
      'Analyst judgment. Blended capital is the demonstrated and appropriate structure. Private credit is potentially suitable on unusually strong public evidence, subject to confirming the existing facility terms, covenants, amortisation profile and drawn balance, together with gross margin, net and gross retention, and incremental debt service capacity on the combined business post acquisition.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'The USD 350 million facility was raised alongside the Series G to fund the vLex acquisition. What is the drawn balance, and how do the covenants interact with further acquisition activity?',
      'ARR surpassed USD 500 million with the business described as profitable. How much of that ARR is subscription against payments attach revenue, given that the two carry different margins and different durability?',
      'The vLex acquisition puts Clio against Thomson Reuters and LexisNexis. What is the retention profile of firms that have adopted both practice management and research against those on practice management alone?',
    ],
    nextDiligenceStep:
      'Obtain the existing facility terms, covenants, amortisation schedule and drawn balance, and a post acquisition combined ARR bridge separating legacy Clio from vLex. Both are prerequisites to sizing any incremental facility.',
    missingInformation: [
      'Existing facility terms, pricing, covenants, amortisation, and drawn balance',
      'Numerical ARR growth rate',
      'Subscription against payments attach revenue split',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and free cash flow',
      'Cash balance',
      'Post acquisition combined ARR contribution from vLex',
      'Customer concentration',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B vertical enterprise software sold on subscription to law firms, with a stated ARR base above USD 500 million.',
        ['cl-arr'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software. Payments attach adds transaction revenue but the subscription base remains the core.',
      ),
      commercialMaturity: rate(
        5,
        'ARR above USD 500 million, a stated profitable operating position, hundreds of thousands of legal professionals across more than 130 countries, offices in nine cities, and a completed USD 1 billion acquisition.',
        ['cl-arr', 'cl-g'],
        'company-reported',
        'High',
        'The most complete maturity evidence in the universe. Revenue scale, profitability, geographic breadth, and demonstrated acquisition capability are all disclosed and dated.',
      ),
      growthQuality: rate(
        4,
        'ARR disclosed above USD 500 million in May 2026 with growth described as accelerating and organic. No numerical growth rate was published alongside the milestone.',
        ['cl-arr'],
        'company-reported',
        'Moderate',
        'Reaching this scale profitably is strong evidence of durable growth. Held below 5 specifically because no rate was disclosed, and after a USD 1 billion acquisition the organic against acquired split matters more than usual.',
      ),
      recurringRevenueQuality: rate(
        5,
        'ARR above USD 500 million disclosed against a per user subscription base, with the business described as profitable, and two institutional lenders having underwritten a USD 350 million facility against that revenue.',
        ['cl-arr', 'cl-g'],
        'company-reported',
        'High',
        'Rated 5 because third party lenders have performed their own diligence on this recurring revenue base and lent USD 350 million against it. That is the strongest available external validation of recurring revenue quality, and it exists for no other company here at this scale.',
      ),
      customerDurability: rate(
        5,
        'Practice management systems hold a law firm matter history, billing records, and client files, making replacement a substantial operational risk. Hundreds of thousands of professionals across 130 countries implies no meaningful concentration, and bar association approvals add institutional endorsement.',
        ['cl-arr', 'cl-g'],
        'company-reported',
        'High',
        'Among the highest switching costs of any category here, combined with the broadest customer base in the universe. Both dimensions this factor measures are at their maximum.',
      ),
      marketAttractiveness: rate(
        4,
        'Legal software spend is durable and largely non discretionary for operating firms, and AI is expanding the addressable work rather than compressing it.',
        ['cl-arr'],
        'analyst-judgment',
        'Moderate',
        'A durable, non cyclical category. Held below 5 because the research segment Clio has just entered is dominated by two far larger incumbents with entrenched relationships.',
      ),
      capitalEfficiency: rate(
        5,
        'A stated profitable operating position at above USD 500 million of ARR, with institutional lenders having underwritten debt service capacity at USD 350 million.',
        ['cl-arr', 'cl-g'],
        'company-reported',
        'High',
        'Profitability is the strongest possible disclosure on this factor and only one company in this universe claims it. The lender validation independently corroborates it.',
      ),
      capitalNeedTiming: rate(
        2,
        'A USD 500 million equity round and a USD 350 million facility were raised in November 2025, approximately nine months before review.',
        ['cl-g'],
        'company-reported',
        'High',
        'Comprehensively financed on both the equity and debt side very recently. There is no near term capital requirement, which is what this factor measures rather than company quality.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after eighteen years and is quoted directly on strategy in company announcements. No finance leader is publicly disclosed.',
        ['cl-arr', 'cl-g'],
        'company-reported',
        'Moderate',
        'Long tenured founder chief executive with a clear public voice. The absence of a disclosed finance leader is more limiting here than elsewhere, because the live questions are all structural.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Demonstrated acquisition led consolidation strategy',
          'Profitable at above USD 500 million of ARR',
          'Broad international footprint with further expansion capacity',
          'Institutional investor base already assembled for scale transactions',
        ],
        conditions:
          'Subject to confirming organic against acquired growth post vLex. Held at 4 because the company was comprehensively financed nine months ago, which reduces near term relevance rather than quality.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 5,
        drivers: [
          'Disclosed ARR above USD 500 million, the largest in this universe',
          'Stated profitable operating position providing debt service capacity',
          'Two of the largest private credit managers have already underwritten this credit',
          'Hundreds of thousands of subscribers implying negligible single name concentration',
          'Eighteen year operating history through multiple cycles',
        ],
        conditions:
          'Potentially suitable, subject to confirming the existing facility terms, covenants, amortisation and drawn balance, together with gross margin, net and gross retention, and incremental debt service capacity on the combined post acquisition business. This is the only company in the universe where every structural precondition for a recurring revenue facility is evidenced publicly rather than inferred.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 5,
        drivers: [
          'The company executed a blended structure in November 2025',
          'Acquisition programme suits equity while operating growth suits debt',
          'Profitability supports meaningful leverage capacity',
          'Demonstrated relationships with both growth equity and private credit providers',
          'Consolidating market creating further transaction opportunities',
        ],
        conditions:
          'Subject to confirming existing facility terms and headroom. The relevant question is the mix at the next event, not whether a blended structure is achievable.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A facility sized before the vLex integration now sits against a materially larger and still profitable revenue base, which usually means the existing terms are no longer the best available for funding the next acquisition.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Jack Newton, co-founder and Chief Executive Officer',
          subject: 'Clio combined platform retention after the vLex integration',
          body: `Jack,

I have been researching how vertical software companies fund consolidation, and the November structure at Clio is the most instructive example I have come across. Raising USD 500 million of equity and a USD 350 million facility simultaneously to fund a USD 1 billion acquisition is a deliberate blend rather than a default, and very few private companies at this scale execute both sides at once.

What interests me most is what the combination does to the customer relationship. Practice management is already difficult to displace, and adding research changes the firm's dependency in a different way than adding another workflow module would.

I would be interested in learning how firms that have adopted both are behaving relative to those on practice management alone.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'cl-arr',
        'Clio',
        'Clio Surpasses US 500 Million in Annual Recurring Revenue',
        'https://www.clio.com/about/press/clio-500-million-arr/',
        '2026-05-12',
        'primary',
      ),
      src(
        'cl-g',
        'Clio',
        'Clio Completes Landmark USD 1B vLex Acquisition and Announces USD 500M Series G Funding Round at USD 5B Valuation',
        'https://www.clio.com/about/press/clio-completes-landmark-1b-vlex-acquisition-series-g-5b-valuation/',
        '2025-11-10',
        'primary',
      ),
      src(
        'cl-law',
        'Law.com Legaltech News',
        'Clio Raises USD 500M in Series G Funding Round, Boosting Valuation to USD 5B',
        'https://www.law.com/legaltechnews/2025/11/10/clio-raises-500m-in-series-g-funding-round-boosting-valuation-to-5b-/',
        '2025-11-10',
        'corroborating',
      ),
      src(
        'cl-tr',
        'TipRanks',
        'Clio Surpasses USD 500 Million ARR as AI-Driven Legal Platform Gains Global Traction',
        'https://www.tipranks.com/news/private-companies/clio-surpasses-500-million-arr-as-ai-driven-legal-platform-gains-global-traction',
        '2026-05-12',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Clio remains privately held and independently operating. Its November 2025 financing was a private Series G round with a private debt facility, it published an ARR milestone under its own name in May 2026, and no acquisition of Clio, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['cl-arr', 'cl-law'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'project44',
    name: 'project44',
    website: 'https://www.project44.com',
    headquarters: 'Chicago, Illinois, United States',
    foundedYear: 2014,
    founders: ['Jett McCandless'],
    ceo: 'Jett McCandless, founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Supply chain and logistics software',
    subsector: 'Transportation visibility and decision intelligence',
    productDescription:
      'project44 operates the Movement platform, which connects shippers, third party logistics providers, and carriers to provide real time visibility across ocean, road, rail, and parcel. The company has extended from visibility into transportation management and into a portfolio of AI agents that act on the data rather than only report it.',
    targetCustomer:
      'Supply chain and logistics leaders at large shippers and third party logistics providers managing multimodal freight across international networks.',
    businessModel:
      'Annual enterprise subscription priced on shipment volume and modules, with expansion driven by adding modes, geographies, and now agent products onto an existing deployment.',

    financingStage: 'Series G',
    latestFinancing: 'USD 80 million round at a reported USD 2.7 billion valuation',
    financingDate: '2022-11-03',
    totalDisclosedFunding: 'Approximately USD 912 million',
    investors: [
      'Generation Investment Management',
      'A.P. Moller Holding',
      'CMA CGM',
      'Thomas H. Lee Partners',
      'Goldman Sachs Asset Management',
      'Emergence Capital',
      'Sapphire Ventures',
      'Insight Partners',
    ],

    customerEvidence: claim(
      'Company sources reference enterprise adoption including adidas, and the company has been named a Leader in the Gartner Magic Quadrant for Real Time Transportation Visibility Platforms for five consecutive years, ranking first across all five use cases in the associated Critical Capabilities report.',
      'independently-verified',
      ['p44-q1', 'p44-adidas'],
      true,
      '2026-05-18',
    ),
    commercialMaturitySignal: claim(
      'Twelve years of operation, five consecutive Gartner Magic Quadrant Leader placements, strategic investment from A.P. Moller Holding and CMA CGM which are two of the largest global carriers, and a published quarterly results cadence unusual for a private company.',
      'independently-verified',
      ['p44-q1', 'p44-p44mq'],
      true,
      '2026-08-05',
    ),
    growthSignal: claim(
      'Company announcement dated 18 May 2026 states first quarter fiscal 2027 new annual recurring revenue grew 34 percent year over year, achieving 109 percent of plan, with shipper new ARR growing 52 percent year over year as the fastest growing segment.',
      'company-reported',
      ['p44-q1'],
      true,
      '2026-05-18',
    ),
    recurringRevenueEvidence: claim(
      'The company reports in annual recurring revenue terms on a quarterly cadence against an enterprise subscription base, which is a materially higher disclosure standard than most private companies in this universe.',
      'company-reported',
      ['p44-q1'],
      true,
      '2026-05-18',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'The company discloses new ARR growth of 34 percent year over year and shipper new ARR growth of 52 percent for the first quarter of fiscal 2027, but does not publish a total ARR figure. New ARR growth measures the rate of addition, not the size of the base.',
      'company-reported',
      ['p44-q1'],
      true,
      '2026-05-18',
    ),
    capitalEfficiencyEvidence: claim(
      'Approximately USD 912 million of disclosed funding with no total ARR figure published against which to read it. The company reports growth in new ARR rather than total, which prevents any efficiency assessment.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'The platform covers ocean, road, rail, and parcel across international networks, and strategic investors include A.P. Moller Holding of Denmark and CMA CGM of France. No international revenue mix is disclosed.',
      'company-reported',
      ['p44-q1'],
      false,
    ),

    competitiveLandscape:
      'Competes with FourKites, Shippeo, E2open, and the visibility modules of transportation management incumbents including Oracle and SAP. The extension into transportation management moves project44 into direct competition with vendors it previously integrated alongside.',
    mainCommercialRisk:
      'Moving from visibility into transportation management puts the company against far larger enterprise resource planning vendors who own the system of record, and risks the neutrality that made the visibility layer adoptable.',
    mainFinancialRisk:
      'Total ARR has never been disclosed. Reporting new ARR growth without a base is a disclosure choice that presents momentum without scale, and no lender or investor could size the business from it.',
    mainTechnologyRisk:
      'Real time multimodal visibility depends on carrier data integrations that the company does not control, and the AI agent products depend on the completeness of that same data.',

    originalSourcingSignal:
      'Company announcement dated 18 May 2026 disclosing first quarter fiscal 2027 results with 34 percent year over year new annual recurring revenue growth at 109 percent of plan, and shipper new ARR growth of 52 percent.',
    discoveryChannel: 'Industry research',
    signalDate: '2026-05-18',
    signalFreshness: 'Fresh',
    whyEnteredPipeline:
      'A private company publishing quarterly results against plan is unusual and informative. It indicates internal reporting discipline of the kind that institutional investors and lenders require, and it suggests a company preparing for a market that will demand it.',
    whyMayNeedGrowthCapital:
      'Nearly four years since the last disclosed round, an ongoing expansion from visibility into transportation management and AI agents, and a quarterly reporting cadence that reads as preparation for an institutional capital event.',
    potentialUseOfProceeds: [
      'Continued build of the transportation management and AI agent product lines',
      'Enterprise go to market capacity for the fastest growing shipper segment',
      'Shareholder liquidity for a twelve year old cap table with a large institutional investor base',
      'Consolidation within a fragmenting visibility market',
    ],

    whyEquityMayFit:
      'A twelve year old company with a large institutional shareholder base and a multi year product expansion is a natural fit for late stage growth equity, particularly with a secondary component.',
    whyDebtMayFit:
      'The enterprise subscription base and the disclosed growth are supportive, but no total ARR figure exists. A lender cannot size a facility against a growth rate without a base, and that is the specific gap here.',
    whyBlendedMayFit:
      'If total ARR supports it, funding the product expansion with a facility while using equity for any liquidity requirement would preserve ownership at a valuation set in 2022. This is conditional on the base figure.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity leads on the disclosed evidence. Private credit is potentially suitable, subject to confirming total ARR scale, gross margin, net and gross retention, burn, and debt service capacity. The disclosure gap here is narrow and specific: the company reports growth in new ARR but has never published the base.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'The company reports new ARR growth quarterly but has not published total ARR. What is the total ARR base, and is the decision not to disclose it deliberate?',
      'Shipper new ARR grew 52 percent against 34 percent for the business overall, making it the fastest growing segment. What does gross and net retention look like for shippers against third party logistics providers?',
      'Extending from visibility into transportation management competes with vendors project44 previously integrated alongside. Has that affected carrier data access or partner relationships?',
    ],
    nextDiligenceStep:
      'Obtain total ARR and a full ARR bridge showing new, expansion, and churned ARR. The company already produces quarterly internal reporting, so the bridge exists; only the base is withheld publicly.',
    missingInformation: [
      'Total annual recurring revenue',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer count and concentration',
      'Any financing event after November 2022',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise supply chain software sold on annual subscription to logistics and supply chain buyers at large shippers and logistics providers.',
        ['p44-q1'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        5,
        'Five consecutive Gartner Magic Quadrant Leader placements ranking first across all five use cases, strategic investment from two of the largest global carriers, twelve years of operation, and a published quarterly results cadence.',
        ['p44-q1', 'p44-p44mq'],
        'independently-verified',
        'High',
        'Independent analyst leadership sustained across five years, combined with strategic carrier investment, is the strongest external validation of enterprise maturity available to a private company.',
      ),
      growthQuality: rate(
        4,
        'Quarterly disclosure of 34 percent year over year new ARR growth at 109 percent of plan, with segment level detail showing 52 percent shipper new ARR growth.',
        ['p44-q1'],
        'company-reported',
        'High',
        'Quarterly reporting with performance against plan and segment level breakdown is the highest disclosure cadence in this universe. Held below 5 only because new ARR growth without a total base cannot establish overall growth.',
      ),
      recurringRevenueQuality: rate(
        3,
        'The company reports in ARR terms quarterly against an enterprise subscription base. No total ARR figure and no retention measure is published.',
        ['p44-q1'],
        'company-reported',
        'Moderate',
        'Quarterly ARR reporting discipline lifts this above companies that mention ARR once. The absent base and absent retention prevent a 4.',
      ),
      customerDurability: rate(
        4,
        'Visibility platforms integrate with carrier networks and become embedded in daily logistics operations. Five years of Gartner leadership indicates sustained depth of enterprise deployment.',
        ['p44-q1', 'p44-p44mq'],
        'independently-verified',
        'Moderate',
        'Real operational embeddedness supported by independent evaluation. Held below 5 because no customer count or concentration data exists, and large shippers can and do run multiple visibility vendors.',
      ),
      marketAttractiveness: rate(
        3,
        'Supply chain visibility demand is durable following the disruptions of recent years, but the category has multiple funded competitors and the buyer is a cost centre under pressure.',
        ['p44-q1'],
        'analyst-judgment',
        'Moderate',
        'Genuine ongoing need offset by a fragmented competitive field and a buying centre whose budget is directly exposed to freight market cycles.',
      ),
      capitalEfficiency: rate(
        0,
        'Approximately USD 912 million of disclosed funding with no total ARR figure published against which to assess it.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. Substantial capital raised with no disclosed revenue base means no efficiency judgment is possible in either direction.',
      ),
      capitalNeedTiming: rate(
        4,
        'Nearly four years since the last disclosed round, an active product expansion into transportation management and AI agents, and a quarterly reporting cadence consistent with preparation for an institutional capital event.',
        ['p44-q1'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time, the expansion programme, and the reporting discipline together make a live capital conversation likely, and the reporting cadence in particular is a deliberate signal.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after twelve years and is publicly profiled on the company site. No finance leader is publicly disclosed.',
        ['p44-q1', 'p44-team'],
        'company-reported',
        'Moderate',
        'Long tenured founder chief executive with a public profile. No disclosed finance counterparty caps this at 4, which is limiting given that the open questions are financial.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Sustained independent analyst leadership across five years',
          'Disclosed quarterly growth against plan',
          'Twelve year old cap table with plausible liquidity requirement',
          'Active product expansion into adjacent categories',
        ],
        conditions:
          'Subject to establishing total ARR scale, and to a view on whether the USD 2.7 billion valuation set in 2022 remains a realistic reference point.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Enterprise subscription contract base with quarterly ARR reporting discipline',
          'Disclosed new ARR growth of 34 percent at 109 percent of plan',
          'Sustained analyst leadership supporting revenue durability',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming total ARR scale, gross margin, net and gross retention, burn, and debt service capacity. The specific and narrow gap is the total ARR base: the company reports growth in new ARR but has never published the denominator, and no facility can be sized without it.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 3,
        drivers: [
          'Valuation reference point set in 2022 that shareholders may prefer to preserve',
          'Separable needs: product expansion suits debt, liquidity suits equity',
          'Reporting discipline suggesting readiness for covenant compliance',
        ],
        conditions:
          'Subject to confirming total ARR and debt service capacity. The reporting cadence suggests the company could meet lender information requirements more readily than most peers here.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company already reporting quarterly against plan has most of the information discipline a lender requires, which usually means non dilutive capital is available on better terms than management expects.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Jett McCandless, founder and Chief Executive Officer',
          subject: 'project44 shipper segment growth and the move into transportation management',
          body: `Jett,

I have been researching supply chain software companies and how the visibility vendors are handling the move into execution, and project44 is the one I found most useful to study because you actually publish quarterly numbers.

The detail that stood out from the May results was the segment split. Shipper new ARR growing 52 percent against 34 percent overall suggests the expansion into transportation management is landing with the buyer who has the most to gain from it, rather than with the logistics providers who were the earlier base.

I would be interested in learning whether that shift is changing contract structure and renewal behaviour as well as growth.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'p44-q1',
        'project44 via GlobeNewswire',
        'project44 Delivers 34 percent New ARR Growth Fueled by AI Agent Momentum and Intelligent TMS Expansion',
        'https://www.globenewswire.com/news-release/2026/05/18/3296989/0/en/project44-delivers-34-new-arr-growth-fueled-by-ai-agent-momentum-and-intelligent-tms-expansion.html',
        '2026-05-18',
        'primary',
      ),
      src(
        'p44-p44mq',
        'project44',
        'project44 press releases including Gartner Magic Quadrant Leader recognition and AI agent portfolio launch',
        'https://www.project44.com/newsroom/press-releases/',
        '2026-08-05',
        'primary',
      ),
      src(
        'p44-team',
        'project44',
        'Jett McCandless, founder and Chief Executive Officer profile',
        'https://www.project44.com/team/jett-mccandless/',
        '2026-08-05',
        'primary',
      ),
      src(
        'p44-adidas',
        'Retail Technology Innovation Hub',
        'adidas taps project44 tech with focus on how AI is transforming supply chain',
        'https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain',
        '2026-02-15',
        'corroborating',
      ),
      src(
        'p44-fw',
        'FreightWaves',
        'project44 unveils fleet of AI agents at customer event Decision44',
        'https://www.freightwaves.com/news/project44-unveils-fleet-of-ai-agents-at-customer-event-decision44',
        '2026-04-08',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'project44 remains privately held and independently operating. The company published quarterly results under its own name in May 2026, its shares are not listed on any exchange, and no acquisition or registration statement has been announced.',
      'independently-verified',
      ['p44-q1', 'p44-p44mq'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'commure',
    name: 'Commure',
    website: 'https://www.commure.com',
    headquarters: 'Mountain View, California, United States',
    foundedYear: 2017,
    founders: [
      'Tanay Tandon, founder of Athelas, which combined with Commure in 2023 and now leads the combined company',
    ],
    ceo: 'Tanay Tandon, Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Healthcare enterprise software',
    subsector: 'Revenue cycle management and clinical workflow automation',
    productDescription:
      'Commure provides an AI enabled operating layer for health systems spanning ambient clinical documentation, revenue cycle management, remote patient monitoring, staff scheduling, and security. The revenue mix is led by revenue cycle management alongside an enterprise software business serving large health systems directly.',
    targetCustomer:
      'Chief financial officers, chief information officers, and clinical operations leaders at large hospital systems and physician groups under margin pressure.',
    businessModel:
      'A mix of enterprise subscription and outcome linked revenue cycle management pricing, where a portion of revenue is tied to collections performance rather than fixed licence fees.',

    financingStage: 'Growth financing',
    latestFinancing:
      'USD 200 million in non dilutive growth financing from the General Catalyst Customer Value Fund',
    financingDate: '2025-06-19',
    totalDisclosedFunding: 'Approximately USD 823 million',
    investors: ['General Catalyst', 'General Catalyst Customer Value Fund'],

    customerEvidence: claim(
      'Company announcement dated 19 June 2025 states more than 130 health systems across the country, naming HCA Healthcare where the company describes the largest ambient AI rollout in the nation, alongside Tenet Healthcare, Jefferson, and Providence in related announcements.',
      'company-reported',
      ['cm-cvf'],
      true,
      '2025-06-19',
    ),
    commercialMaturitySignal: claim(
      'More than 130 health systems as customers, named deployments at HCA Healthcare and Tenet Healthcare which are among the largest hospital operators in the United States, and revenue described as in the hundreds of millions.',
      'company-reported',
      ['cm-cvf', 'cm-sa'],
      true,
      '2025-06-19',
    ),
    growthSignal: claim(
      'Company announcement dated 19 June 2025 states annual recurring revenue in the hundreds of millions has doubled for three consecutive years.',
      'company-reported',
      ['cm-cvf', 'cm-sa'],
      true,
      '2025-06-19',
    ),
    recurringRevenueEvidence: claim(
      'The company describes its revenue in annual recurring revenue terms and has stated a three year doubling trajectory. Part of the revenue cycle management business is linked to collections performance rather than fixed subscription, which is a different revenue character.',
      'company-reported',
      ['cm-cvf'],
      true,
      '2025-06-19',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 19 June 2025 states annual recurring revenue in the hundreds of millions, doubled for three consecutive years. No precise figure has been published.',
      'company-reported',
      ['cm-cvf', 'cm-sa'],
      true,
      '2025-06-19',
    ),
    capitalEfficiencyEvidence: claim(
      'The June 2025 financing was structured through the General Catalyst Customer Value Fund, which the company describes as enabling investment in growth without dilution or added risk. That structure is typically underwritten against contracted customer revenue, which implies a lender style assessment of the revenue base was performed.',
      'company-reported',
      ['cm-cvf'],
      false,
    ),
    debtEvidence: claim(
      'The USD 200 million Customer Value Fund financing is explicitly described as non dilutive growth financing rather than equity. The company did not characterise it as debt, and no terms, security, or repayment profile were disclosed.',
      'company-reported',
      ['cm-cvf', 'cm-sa'],
      true,
      '2025-06-19',
    ),
    acquisitionActivity: claim(
      'Commure has assembled its platform through combination, most significantly the 2023 combination with Athelas. Individual transaction values were not disclosed.',
      'company-reported',
      ['cm-cvf'],
      false,
    ),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Epic and Oracle Health in the electronic health record adjacent layer, with R1 RCM and Ensemble Health Partners in revenue cycle management, and with Abridge and Nuance under Microsoft in ambient clinical documentation.',
    mainCommercialRisk:
      'Health system purchasing is concentrated and slow, and Epic in particular holds a position that allows it to bundle adjacent capability. A small number of very large customers can dominate the revenue base.',
    mainFinancialRisk:
      'A portion of revenue is linked to collections performance rather than fixed subscription, which behaves differently in a downturn. Revenue is described only as in the hundreds of millions, and no precise figure exists.',
    mainTechnologyRisk:
      'Ambient clinical documentation operates in a clinical safety context where errors carry patient consequence, and the regulatory environment for clinical AI continues to develop.',

    originalSourcingSignal:
      'Financing announcement dated 19 June 2025 disclosing USD 200 million in non dilutive growth financing from the General Catalyst Customer Value Fund, with revenue stated to have doubled for three consecutive years.',
    discoveryChannel: 'Credit facility',
    signalDate: '2025-06-19',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'A USD 200 million non dilutive financing underwritten against customer revenue is the closest thing in this universe to a private credit transaction outside the two disclosed facilities. It demonstrates that a third party assessed this revenue base as financeable without taking equity risk.',
    whyMayNeedGrowthCapital:
      'The company has grown through combination and continues to add capability across the health system operating stack. That pattern requires ongoing capital, and the choice of a non dilutive instrument in 2025 suggests a preference for structures that avoid resetting equity value.',
    potentialUseOfProceeds: [
      'Continued expansion of the ambient documentation deployment across large health systems',
      'Revenue cycle management capacity to support contracted collections volume',
      'Product consolidation across the assembled platform',
      'Working capital associated with outcome linked revenue cycle contracts',
    ],

    whyEquityMayFit:
      'Platform assembly through combination requires equity capacity, and the company has raised substantial equity historically to do exactly that.',
    whyDebtMayFit:
      'A third party has already underwritten USD 200 million against this customer revenue base, which is direct evidence of financeability. The revenue mix including collections linked contracts would require careful structuring rather than a standard recurring revenue facility.',
    whyBlendedMayFit:
      'The company has effectively already run a blended approach, using equity to assemble the platform and a non dilutive instrument to fund growth against contracted customer revenue.',
    preliminaryCapitalView:
      'Analyst judgment. Blended capital is the demonstrated structure. Private credit is potentially suitable, subject to confirming precise ARR, the split between fixed subscription and collections linked revenue, gross margin, net and gross retention, customer concentration, and debt service capacity. Customer concentration deserves particular attention given the named dependence on very large hospital operators.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Revenue is described as in the hundreds of millions having doubled for three consecutive years. What is the precise figure, and how much is fixed subscription against collections linked revenue cycle management?',
      'Deployments at HCA Healthcare and Tenet Healthcare are named. What share of total revenue comes from the three largest customers, given how concentrated large health system purchasing is?',
      'The 2025 financing was non dilutive and underwritten by the Customer Value Fund. How were the economics structured, and would a conventional recurring revenue facility be viable against the same base?',
    ],
    nextDiligenceStep:
      'Establish precise revenue and customer concentration. In a business with named dependence on a small number of very large hospital operators, concentration is the dominant credit question and it is entirely undisclosed.',
    missingInformation: [
      'Precise annual recurring revenue',
      'Fixed subscription against collections linked revenue split',
      'Customer concentration',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Terms and repayment profile of the Customer Value Fund financing',
      'Acquisition consideration paid',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        4,
        'B2B healthcare enterprise software sold to health systems, with a revenue mix that includes outcome linked revenue cycle management alongside subscription software.',
        ['cm-cvf'],
        'company-reported',
        'Moderate',
        'Clearly enterprise software by buyer and product. Held below 5 because collections linked revenue cycle management carries services and outcome economics that sit outside a pure software mandate.',
      ),
      commercialMaturity: rate(
        5,
        'More than 130 health systems as customers, named deployments at HCA Healthcare and Tenet Healthcare, and revenue described as in the hundreds of millions.',
        ['cm-cvf', 'cm-sa'],
        'company-reported',
        'High',
        'Deployment at the largest hospital operators in the United States, at a stated revenue scale in the hundreds of millions, is strong maturity evidence on both customer quality and scale.',
      ),
      growthQuality: rate(
        4,
        'Revenue stated to have doubled for three consecutive years as of June 2025, which is a multi period growth claim rather than a single point.',
        ['cm-cvf', 'cm-sa'],
        'company-reported',
        'Moderate',
        'A three year doubling claim covers multiple periods, which is what this factor rewards. Held below 5 because no absolute figures anchor it and part of the growth came through combination rather than organically.',
      ),
      recurringRevenueQuality: rate(
        3,
        'Revenue described in ARR terms with a three year trajectory, against a mix of subscription and collections linked contracts. No precise figure and no retention measure is disclosed.',
        ['cm-cvf'],
        'company-reported',
        'Moderate',
        'ARR framing with a multi year trajectory lifts this above a bare subscription claim. The collections linked portion and the absent retention data prevent a 4.',
      ),
      customerDurability: rate(
        4,
        'Clinical and revenue cycle workflows embed deeply into health system operations and are subject to long procurement and implementation cycles that discourage switching.',
        ['cm-cvf'],
        'analyst-judgment',
        'Moderate',
        'Very high switching cost in a slow moving procurement environment. Held below 5 because customer concentration in large health systems is a genuine offsetting risk and is undisclosed.',
      ),
      marketAttractiveness: rate(
        4,
        'Health system margin pressure makes administrative cost reduction a board level priority, and clinical documentation burden is a named driver of clinician attrition.',
        ['cm-cvf'],
        'analyst-judgment',
        'Moderate',
        'Genuine non discretionary drivers on both the financial and workforce side. Held below 5 because the electronic health record vendors hold a structurally advantaged position in the same accounts.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 823 million of disclosed funding against revenue described as in the hundreds of millions, with a USD 200 million tranche structured as non dilutive against customer revenue.',
        ['cm-cvf'],
        'analyst-judgment',
        'Limited',
        'The non dilutive structure implies a third party found the revenue base financeable, which is meaningful. The imprecise revenue figure prevents any firmer assessment.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately fourteen months since the last disclosed financing, with continued platform expansion across the health system operating stack.',
        ['cm-cvf'],
        'analyst-judgment',
        'Moderate',
        'A plausible window given the elapsed time and expansion agenda, though the 2025 financing was substantial and nothing public suggests it has been exhausted.',
      ),
      outreachPotential: rate(
        3,
        'Chief executive is quoted directly in company announcements. The founding history is complex following the 2023 combination, and no finance leader is publicly disclosed.',
        ['cm-cvf'],
        'company-reported',
        'Limited',
        'Chief executive is publicly visible but the corporate history makes the counterparty structure less clear than at straightforward founder led companies, and there is no disclosed finance leader.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Named deployments at the largest United States hospital operators',
          'Multi year revenue doubling trajectory',
          'Continued platform assembly requiring equity capacity',
        ],
        conditions:
          'Subject to establishing precise revenue and customer concentration. Held at 3 because the company has explicitly chosen non dilutive capital most recently, which signals limited appetite for further equity.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'A third party has already underwritten USD 200 million against this customer revenue base',
          'Revenue described as in the hundreds of millions provides sufficient scale',
          'More than 130 health system customers providing some breadth',
          'Demonstrated willingness to accept non dilutive structures',
        ],
        conditions:
          'Potentially suitable, subject to confirming precise ARR, the split between fixed subscription and collections linked revenue, gross margin, net and gross retention, customer concentration, and debt service capacity. Concentration in a small number of very large hospital operators is the specific risk a lender would size first, and the collections linked revenue would need separate treatment from subscription.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 4,
        drivers: [
          'The company has already combined equity and non dilutive capital in practice',
          'Demonstrated preference for structures that avoid dilution',
          'Separable needs across platform assembly and working capital',
          'Revenue base already validated as financeable by a third party',
        ],
        conditions:
          'Subject to confirming revenue precision and concentration. The demonstrated preference for non dilutive capital makes this the most likely structure for the next event.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company that has already financed growth against contracted customer revenue without dilution has established the precedent; the useful question is whether the same base would now support broader structures on better terms.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Tanay Tandon, Chief Executive Officer',
          subject: 'Commure revenue mix and the non dilutive financing precedent',
          body: `Tanay,

I have been researching how healthcare software companies finance growth when their customers are health systems with long procurement cycles, and the June 2025 structure at Commure is the most interesting example I have found.

Raising USD 200 million against customer revenue without dilution is a meaningful precedent, and it says something about the revenue base that a conventional equity round would not have.

I would be interested in learning how the mix between fixed subscription and collections linked revenue cycle work affects how you think about that. The two behave quite differently under stress, and I would expect that to shape what structures are available.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'cm-cvf',
        'Commure',
        'Commure Raises USD 200M in Growth Financing from General Catalyst CVF to Accelerate AI-Powered RCM Platform',
        'https://www.commure.com/press-releases/commure-raises-200m-in-growth-financing-from-general-catalysts-cvf-to-accelerate-ai-powered-rcm-platform',
        '2025-06-19',
        'primary',
      ),
      src(
        'cm-blog',
        'Commure',
        'Commure Secures USD 200M to Accelerate AI-Powered Healthcare Transformation',
        'https://www.commure.com/blog/commure-secures-200m-to-accelerate-ai-powered-healthcare-transformation',
        '2025-06-19',
        'primary',
      ),
      src(
        'cm-sa',
        'SiliconANGLE',
        'Healthcare technology startup Commure raises USD 200M',
        'https://siliconangle.com/2025/06/19/healthcare-technology-startup-commure-raises-200m-ahead-ipo/',
        '2025-06-19',
        'corroborating',
      ),
      src(
        'cm-site',
        'Commure',
        'Commure platform and product documentation',
        'https://www.commure.com/',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Commure remains privately held and independently operating. The company continues to publish product and financing announcements under its own name and no acquisition of Commure, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['cm-cvf', 'cm-sa'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'qventus',
    name: 'Qventus',
    website: 'https://www.qventus.com',
    headquarters: 'Mountain View, California, United States',
    foundedYear: 2012,
    founders: ['Mudit Garg', 'Ian Christopher', 'Brent Newhouse'],
    ceo: 'Mudit Garg, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Healthcare enterprise software',
    subsector: 'Care operations automation',
    productDescription:
      'Qventus applies AI to hospital operations, automating the coordination work behind surgical scheduling and inpatient capacity. The company describes its products as AI operational assistants and AI teammates that handle the follow up, scheduling, and preparation tasks around a patient journey rather than the clinical decisions themselves.',
    targetCustomer:
      'Chief operating officers and perioperative leaders at hospitals and health systems seeking to increase surgical throughput and reduce length of stay without adding staff.',
    businessModel:
      'Annual enterprise subscription per facility or service line, sold to health systems with implementation and integration into existing electronic health record systems.',

    financingStage: 'Series D',
    latestFinancing: 'USD 105 million Series D led by KKR',
    financingDate: '2025-01-13',
    totalDisclosedFunding: 'Approximately USD 200 million',
    investors: [
      'KKR',
      'Bessemer Venture Partners',
      'Mayfield Fund',
      'Northwestern Medicine',
      'Allina Health',
      'HonorHealth',
    ],

    customerEvidence: claim(
      'Company announcement dated 13 January 2025 states the technology is used by more than 115 hospitals and health systems, naming Northwestern Medicine, Banner Health, and Allina Health. Northwestern Medicine, Allina Health, and HonorHealth also participated as investors in the round.',
      'company-reported',
      ['qv-d', 'qv-fh'],
      true,
      '2025-01-13',
    ),
    commercialMaturitySignal: claim(
      'Fourteen years of operation, more than 115 hospitals and health systems as customers, a Series D led by KKR, and three health system customers participating as investors, which is a form of customer validation that is difficult to manufacture.',
      'company-reported',
      ['qv-d', 'qv-fh'],
      true,
      '2025-01-13',
    ),
    growthSignal: claim(
      'Company sources describe winning several new clients and enterprise wide expansions across the perioperative product line. No quantified revenue or ARR growth figure has been disclosed.',
      'company-reported',
      ['qv-peri'],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription to health systems. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['qv-d'],
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
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with LeanTaaS, Epic native scheduling and capacity tools, Hospital IQ, and internal health system analytics teams. Epic remains the structural competitive question because it sits inside the same workflow.',
    mainCommercialRisk:
      'Health system operations software must demonstrate measurable financial return to survive budget review, and the same electronic health record vendor that holds the data can ship comparable capability as an included feature.',
    mainFinancialRisk:
      'Fourteen years of operation with approximately USD 200 million raised and no revenue disclosure of any kind. The long operating history without a disclosed revenue milestone is itself a data point worth understanding.',
    mainTechnologyRisk:
      'Automating operational coordination in a clinical environment requires deep electronic health record integration that the vendor controls, and AI assistants acting on scheduling carry real operational consequence when wrong.',

    originalSourcingSignal:
      'Series D announcement dated 13 January 2025 disclosing a USD 105 million round led by KKR with three health system customers, Northwestern Medicine, Allina Health, and HonorHealth, participating as investors.',
    discoveryChannel: 'Customer signal',
    signalDate: '2025-01-13',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Three health systems investing in a vendor they also buy from is a stronger customer endorsement than any reference call produces. Customers do not put capital into software they are planning to replace, and that signal carried more weight here than the size of the round.',
    whyMayNeedGrowthCapital:
      'Nineteen months since the last disclosed round, with a stated expansion of the product line into new care settings beyond the original surgical growth and inpatient capacity solutions.',
    potentialUseOfProceeds: [
      'Commercialisation of AI operational assistants into new care settings',
      'Enterprise sales capacity for health system wide deployments',
      'Integration engineering across electronic health record platforms',
      'Clinical evidence generation to support procurement business cases',
    ],

    whyEquityMayFit:
      'Health system sales cycles are long and implementation heavy, which requires patient capital rather than capital that must be serviced on a fixed schedule.',
    whyDebtMayFit:
      'It cannot be assessed publicly. No ARR, retention, margin, or cash flow figure has been disclosed after fourteen years of operation.',
    whyBlendedMayFit:
      'If revenue scale supports it, a modest facility could extend runway alongside a smaller equity round. This is conditional on disclosure that does not exist.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure. Private credit is not assessable: no revenue evidence of any kind exists in the public record. The customer investment signal is genuinely strong, but customer endorsement is not a substitute for the financial evidence a credit assessment requires, and conflating the two would be an error.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Northwestern Medicine, Allina Health, and HonorHealth invested as well as buying. How did those investments affect contract terms, and are they structured to align on outcomes?',
      'The product line is expanding beyond surgical growth and inpatient capacity into new care settings. What is the revenue contribution of the newer settings against the established two?',
      'After fourteen years and approximately USD 200 million raised, what is the current ARR and what does the path to cash generation look like?',
    ],
    nextDiligenceStep:
      'Establish ARR and the revenue contribution by product line. A fourteen year operating history with no disclosed revenue milestone is the first thing to resolve, and it determines whether any structure beyond equity is worth discussing.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Revenue contribution by product line',
      'Terms of health system investor participation',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B healthcare enterprise software sold on annual subscription to hospital operations buyers.',
        ['qv-d'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'More than 115 hospitals and health systems as customers after fourteen years, named deployments at Northwestern Medicine, Banner Health, and Allina Health, and a Series D led by KKR.',
        ['qv-d', 'qv-fh'],
        'company-reported',
        'High',
        'Customer count and named health systems are solid evidence of a repeatable enterprise sale. Held below 5 because no revenue scale is disclosed after an unusually long operating history.',
      ),
      growthQuality: rate(
        1,
        'Growth is described qualitatively as new client wins and enterprise wide expansions. No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        ['qv-peri'],
        'company-reported',
        'Limited',
        'There is no quantified growth evidence. Rated 1 rather than 0 because a KKR led round and customer investment participation are weak circumstantial evidence that growth was demonstrable to those parties privately.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['qv-d'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        5,
        'Operations automation integrates into electronic health record workflows and surgical scheduling processes, which are exceptionally difficult to change once running. Three customers invested in the company, which is direct evidence of intent to continue the relationship.',
        ['qv-d', 'qv-fh'],
        'company-reported',
        'High',
        'The customer investment participation is the strongest single piece of durability evidence in this universe. Health systems do not fund vendors they intend to replace, and it is combined with genuinely high workflow switching cost.',
      ),
      marketAttractiveness: rate(
        4,
        'Hospital capacity constraints and staffing shortages create measurable financial pressure that operations automation addresses directly, and surgical throughput is a revenue driver rather than a cost line.',
        ['qv-d'],
        'analyst-judgment',
        'Moderate',
        'Strong non discretionary drivers tied to revenue rather than only cost. Held below 5 because the electronic health record vendors sit inside the same workflow and can bundle.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 200 million of disclosed funding across fourteen years with no disclosed revenue against which to assess it.',
        ['qv-d'],
        'analyst-judgment',
        'Limited',
        'Total capital raised is modest by this universe standard, which bounds the potential inefficiency. Fourteen years without a disclosed revenue milestone prevents anything higher.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately nineteen months since the last disclosed round, with a stated product line expansion into new care settings.',
        ['qv-d', 'qv-peri'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time and stated expansion create a plausible window, though a USD 105 million round for a company of this size should provide substantial runway.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after fourteen years and is quoted directly in company announcements. No finance leader is publicly disclosed.',
        ['qv-d'],
        'company-reported',
        'Moderate',
        'Long tenured founder chief executive with public visibility. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Customers investing alongside institutional capital',
          'More than 115 health system customers with high switching cost',
          'Product line expansion into new care settings',
          'Institutional validation from a KKR led round',
        ],
        conditions:
          'Subject to establishing ARR scale and growth after fourteen years of operation, which is the central unanswered question.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise annual subscription contract model with very high switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed. Strong customer endorsement, including customers investing, is not a substitute for the financial evidence a credit assessment requires, and treating it as one would be exactly the kind of inference this framework exists to prevent.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined product expansion with a fundable requirement',
          'Long operating history suggesting the business may be closer to breakeven than its stage implies',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'When customers invest alongside institutional capital, the commercial relationship is unusually well validated, and the useful next question is what the financial profile underneath it can support structurally.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Mudit Garg, co-founder and Chief Executive Officer',
          subject: 'Qventus health system investor participation and product line expansion',
          body: `Mudit,

I have been researching healthcare operations software and which companies have genuinely proven their value to health systems rather than only to investors, and the Series D structure at Qventus stood out immediately.

Having Northwestern Medicine, Allina Health, and HonorHealth invest alongside KKR is a stronger endorsement than any customer reference, because those systems are putting capital behind a vendor they already run in production.

I would be interested in learning whether that changed how those relationships are structured, and how the expansion beyond surgical growth and inpatient capacity is landing with the same buyers.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'qv-d',
        'Qventus',
        'Qventus Announces USD 105 Million Investment, Series D Led by KKR',
        'https://www.qventus.com/company/newsroom/qventus-announces-105-million-investment-series-d-led-by-kkr/',
        '2025-01-13',
        'primary',
      ),
      src(
        'qv-peri',
        'Qventus',
        'Qventus AI Teammates Transform the Perioperative Care Journey, Driving Strategic Surgical Growth',
        'https://www.qventus.com/company/newsroom/qventus-ai-teammates-transform-the-perioperative-care-journey-driving-strategic-surgical-growth-and-winning-several-new-clients-and-enterprise-wide-expansions/',
        '2025-09-16',
        'primary',
      ),
      src(
        'qv-fh',
        'Fierce Healthcare',
        'Qventus pockets USD 105M series D backed by KKR to build out operational AI tech',
        'https://www.fiercehealthcare.com/finance/qventus-raises-105m-series-d-new-level-resonance-decade-old-company',
        '2025-01-13',
        'corroborating',
      ),
      src(
        'qv-mcn',
        'MedCity News',
        'Qventus Snags USD 105M for Its Patient Flow Automation Tech',
        'https://medcitynews.com/2025/01/healthcare-ai-investment/',
        '2025-01-14',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Qventus remains privately held and independently operating. The company continues to publish product and customer announcements under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['qv-d', 'qv-fh'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'altana',
    name: 'Altana',
    website: 'https://altana.ai',
    headquarters: 'Brooklyn, New York, United States',
    foundedYear: 2018,
    founders: ['Evan Smith', 'Peter Swartz', 'Raphael Tehranian'],
    ceo: 'Evan Smith, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'AI-enabled enterprise applications',
    subsector: 'Supply chain intelligence and trade compliance',
    productDescription:
      'Altana builds a value chain management system that maps global supply networks from raw material through to finished goods using shipping, customs, and corporate registry data. Customers use it to identify sanctions exposure, forced labour risk, tariff liability, and supplier dependencies several tiers beyond their direct relationships.',
    targetCustomer:
      'Global manufacturers, logistics operators, insurers, and government agencies responsible for trade compliance, customs enforcement, and supply chain risk.',
    businessModel:
      'Annual enterprise and government subscription, with government contracts typically carrying longer terms and different procurement cycles than commercial accounts.',

    financingStage: 'Series C',
    latestFinancing: 'USD 200 million Series C at a USD 1 billion valuation',
    financingDate: '2024-07-29',
    totalDisclosedFunding: 'Approximately USD 322 million',
    investors: [
      'US Innovative Technology Fund',
      'March Capital',
      'Generation Investment Management',
      'Salesforce Ventures',
      'GV',
      'Activate Capital',
      'Floating Point',
      'OMERS Ventures',
      'Friends and Family Capital',
    ],

    customerEvidence: claim(
      'Company announcement dated 29 July 2024 names Maersk, Boston Scientific, ZF, the Lloyd’s Insurance Market, United States Customs and Border Protection, and multiple United Kingdom government agencies as customers.',
      'company-reported',
      ['al-c', 'al-forbes'],
      true,
      '2024-07-29',
    ),
    commercialMaturitySignal: claim(
      'A named customer list spanning global shipping, medical devices, automotive components, insurance, and government agencies in two countries, with a Series C valuing the company at USD 1 billion within six years.',
      'company-reported',
      ['al-c', 'al-forbes'],
      true,
      '2024-07-29',
    ),
    growthSignal: claim(
      'No quantified revenue or ARR growth figure has been disclosed. The Series C announcement describes new product development as the use of proceeds.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise and government subscription. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['al-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. Third party estimates exist but are not primary sourced and are not relied upon here.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Named customers include United Kingdom government agencies and European industrial companies including Maersk and ZF, indicating established commercial and public sector presence outside the United States.',
      'company-reported',
      ['al-c'],
      false,
    ),

    competitiveLandscape:
      'Competes with S&P Global Market Intelligence, Kharon, Sayari, Exiger, and the internal analysis capabilities of large trade compliance functions. The government contract position is a meaningful differentiator that few commercial competitors hold.',
    mainCommercialRisk:
      'Trade compliance spend responds to regulatory enforcement intensity. A durable shift in enforcement priorities would change the urgency of the purchase for commercial buyers.',
    mainFinancialRisk:
      'Government contracts carry procurement cycles, appropriation risk, and renewal dynamics that differ from commercial subscription revenue. The mix between the two is not disclosed, and no revenue figure exists.',
    mainTechnologyRisk:
      'The product depends on shipping, customs, and registry data sourced from third parties. Changes to data availability or licensing terms would affect the core asset directly.',

    originalSourcingSignal:
      'Series C announcement dated 29 July 2024 disclosing a USD 200 million round led by the US Innovative Technology Fund at a USD 1 billion valuation, with a named customer list including United States Customs and Border Protection and multiple United Kingdom government agencies.',
    discoveryChannel: 'Regulatory development',
    signalDate: '2024-07-29',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'The government customer list is the differentiator. Selling to United States Customs and Border Protection and multiple United Kingdom agencies requires clearing procurement and security requirements that commercial competitors have not, which is a durable barrier that does not appear in a revenue figure.',
    whyMayNeedGrowthCapital:
      'Two years since the last disclosed round, in a category where tariff and sanctions policy changes have materially increased the addressable urgency since that round closed.',
    potentialUseOfProceeds: [
      'Commercial go to market expansion to convert regulatory urgency into contracts',
      'Product development across tariff and sanctions exposure analysis',
      'Government contract capacity in additional jurisdictions',
      'Data acquisition and licensing to deepen network coverage',
    ],

    whyEquityMayFit:
      'A company positioned against a shifting regulatory environment needs capital to scale commercially while that window is open, and the timing risk suits equity rather than debt.',
    whyDebtMayFit:
      'It cannot be assessed publicly. No ARR, retention, margin, or cash flow figure has been disclosed, and the government against commercial revenue mix, which materially affects credit quality, is also unknown.',
    whyBlendedMayFit:
      'Government contracts can support receivables based financing structures given the counterparty credit quality, but that is a different instrument from a recurring revenue facility and would require the contract terms to be visible.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is not assessable: no revenue evidence exists, and the undisclosed government against commercial mix would materially change any credit view. Establishing that mix matters as much as establishing scale.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'The customer list spans commercial enterprises and government agencies in two countries. What share of revenue comes from government contracts, and how do their term length and renewal dynamics compare with commercial subscriptions?',
      'Tariff and sanctions policy has shifted substantially since the July 2024 round. How has that affected inbound demand and average contract value?',
      'The platform depends on third party shipping, customs, and registry data. How is that supply secured contractually, and what would a licensing change do to the product?',
    ],
    nextDiligenceStep:
      'Establish ARR and the government against commercial revenue split. The mix matters as much as the total here, because the two revenue types carry different durability, different working capital profiles, and different credit characteristics.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Government against commercial revenue split',
      'Customer count and concentration',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Data licensing terms and costs',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        4,
        'B2B enterprise software sold on annual subscription to commercial and government buyers, with a meaningful government contract component.',
        ['al-c'],
        'company-reported',
        'High',
        'Clearly enterprise software by product and revenue model. Held below 5 because government contracting carries procurement and appropriation dynamics that differ from a commercial software mandate.',
      ),
      commercialMaturity: rate(
        4,
        'Named customers including Maersk, Boston Scientific, ZF, the Lloyd’s Insurance Market, United States Customs and Border Protection, and multiple United Kingdom government agencies.',
        ['al-c', 'al-forbes'],
        'company-reported',
        'High',
        'The customer list is exceptional in quality and breadth, spanning commercial and sovereign buyers across two countries. Held below 5 because no customer count or revenue scale is disclosed.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. There is no growth disclosure of any kind to assess, and the scoring engine correctly awards nothing for it.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise and government annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['al-c'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        5,
        'Government agencies including United States Customs and Border Protection embed the platform into enforcement workflows, and commercial customers use it for regulatory compliance rather than optimisation, which makes removal a compliance decision rather than a cost one.',
        ['al-c'],
        'company-reported',
        'High',
        'Sovereign customers with enforcement dependencies represent the highest durability profile available, and compliance driven commercial use reinforces it. This is the strongest factor in this record.',
      ),
      marketAttractiveness: rate(
        5,
        'Tariff, sanctions, and forced labour enforcement have all intensified, and supply chain transparency obligations are expanding across multiple jurisdictions simultaneously.',
        ['al-c', 'al-forbes'],
        'analyst-judgment',
        'Moderate',
        'The regulatory driver here is stronger and more immediate than in any other category in this universe, and it operates on both the commercial and sovereign side at once.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 322 million of disclosed funding with no disclosed revenue against which to assess it.',
        ['al-c'],
        'analyst-judgment',
        'Limited',
        'Capital raised is moderate relative to this universe, bounding the potential inefficiency, but there is no denominator.',
      ),
      capitalNeedTiming: rate(
        4,
        'Two years since the last disclosed round, during a period in which tariff and sanctions policy changes have materially increased demand urgency in the category.',
        ['al-c'],
        'analyst-judgment',
        'Moderate',
        'The combination of elapsed time and a materially changed regulatory environment since the last round makes a capital conversation more likely than the elapsed time alone would suggest.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and is quoted directly in company announcements, with all three co-founders publicly identified. No finance leader is publicly disclosed.',
        ['al-c'],
        'company-reported',
        'Moderate',
        'Founder chief executive access is favourable. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Exceptional customer list spanning commercial and sovereign buyers',
          'Strong and intensifying regulatory demand driver',
          'Government contract position as a durable competitive barrier',
          'Two years elapsed since the last disclosed round',
        ],
        conditions:
          'Subject to establishing revenue scale and growth, and to understanding the government against commercial mix. Held at 4 rather than 5 because no growth evidence exists at all.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise and government subscription contract model with very high switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and the government against commercial revenue mix would materially change any credit view. Government receivables financing could be a separate instrument but would require contract visibility.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Government contract receivables could support a specialised facility',
          'Commercial expansion requirement suited to equity',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires, plus visibility of government contract terms. Any debt component would be structured against receivables rather than recurring revenue.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A revenue base that combines sovereign and commercial customers has an unusual credit character, and separating the two early opens financing structures that a blended view would obscure.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Evan Smith, co-founder and Chief Executive Officer',
          subject: 'Altana government contract position and the commercial motion',
          body: `Evan,

I have been researching supply chain intelligence companies and which have built genuinely defensible positions rather than assembling similar data into similar products, and the government side of Altana is what makes it distinct.

Selling to United States Customs and Border Protection and multiple United Kingdom agencies requires clearing procurement and security requirements that most commercial competitors have not attempted, and that barrier does not show up anywhere in a valuation or a funding total.

I would be interested in learning how the government work and the commercial motion reinforce each other, and whether tariff policy changes since 2024 have shifted the balance between them.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'al-c',
        'Altana',
        'Altana Closes USD 200M Series C to Enable the Public and Private Sectors to Take Command of Global Value Chains',
        'https://altana.ai/resources/series-c-valuation',
        '2024-07-29',
        'primary',
      ),
      src(
        'al-site',
        'Altana',
        'Altana Value Chain Management System product documentation',
        'https://altana.ai/',
        '2026-08-05',
        'primary',
      ),
      src(
        'al-forbes',
        'Forbes',
        'Altana, An AI Platform For Supply Chain Data, Hits Unicorn Status After USD 200 Million Raise',
        'https://www.forbes.com/sites/richardnieva/2024/07/29/altana-unicorn-fundraise-200-million/',
        '2024-07-29',
        'corroborating',
      ),
      src(
        'al-pb',
        'PitchBook News',
        'Supply-chain startup Altana valued at USD 1B in Thomas Tull latest AI bet',
        'https://pitchbook.com/news/articles/supply-chain-startup-altana-1-billion-valuation',
        '2024-07-29',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Altana remains privately held and independently operating. The company continues to publish product and company content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['al-c', 'al-site'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'shippeo',
    name: 'Shippeo',
    website: 'https://www.shippeo.com',
    headquarters: 'Paris, France',
    foundedYear: 2014,
    founders: ['Pierre Khoury', 'Lucien Besse'],
    ceo: 'Pierre Khoury, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Supply chain and logistics software',
    subsector: 'Real time multimodal transportation visibility',
    productDescription:
      'Shippeo provides real time multimodal transportation visibility, tracking shipments across road, ocean, rail, air, and parcel through direct carrier integrations. The platform provides predictive arrival times and exception alerts to shippers and logistics providers operating international networks.',
    targetCustomer:
      'Supply chain and transportation leaders at large European manufacturers, retailers, and logistics providers, with growing presence in North America and Asia Pacific.',
    businessModel:
      'Annual enterprise subscription priced on shipment volume and transport modes covered.',

    financingStage: 'Growth financing',
    latestFinancing:
      'USD 30 million strategic round led by Woven Capital, the growth fund of Toyota',
    financingDate: '2025-01-16',
    totalDisclosedFunding: 'More than USD 140 million',
    investors: [
      'Woven Capital',
      'Battery Ventures',
      'Partech',
      'NGP Capital',
      'Bpifrance Digital',
      'Shift4Good',
    ],

    customerEvidence: claim(
      'Company sources state the platform is trusted by global brands across 150 countries and tracks more than 90 million shipments annually. Named individual customers are not disclosed in the dated primary financing announcement.',
      'company-reported',
      ['sh-round', 'sh-mq'],
      true,
      '2025-02-27',
    ),
    commercialMaturitySignal: claim(
      'Named a Leader in the Gartner Magic Quadrant for Real Time Transportation Visibility Platforms in both 2024 and 2025, more than 90 million shipments tracked annually across 150 countries, and strategic investment from the growth fund of Toyota.',
      'independently-verified',
      ['sh-mq', 'sh-round'],
      true,
      '2025-02-27',
    ),
    growthSignal: claim(
      'No quantified revenue or ARR growth figure has been disclosed. The January 2025 round was described as funding accelerated expansion across North America and Asia Pacific.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['sh-round'],
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
      'Company announcement dated 16 January 2025 states the round funds accelerated expansion across North America and Asia Pacific, from an established European base, with the platform operating across 150 countries.',
      'company-reported',
      ['sh-round', 'sh-ngp'],
      true,
      '2025-01-16',
    ),

    competitiveLandscape:
      'Competes directly with project44 and FourKites, alongside E2open and the visibility modules of transportation management incumbents. Shippeo holds a stronger European position than its United States competitors and a weaker North American one.',
    mainCommercialRisk:
      'Expanding into North America means competing directly with better capitalised incumbents on their home ground, where project44 in particular holds five consecutive years of category leadership.',
    mainFinancialRisk:
      'A USD 30 million round is small relative to the international expansion it is funding, and to what direct competitors have raised. No revenue figure exists to assess whether the funding is proportionate.',
    mainTechnologyRisk:
      'Multimodal visibility depends on direct carrier integrations that must be built and maintained per carrier per geography, and North American carrier networks require a largely separate integration estate from European ones.',

    originalSourcingSignal:
      'Financing announcement dated 16 January 2025 disclosing a USD 30 million strategic round led by Woven Capital, the growth fund of Toyota, to accelerate expansion across North America and Asia Pacific.',
    discoveryChannel: 'Market expansion',
    signalDate: '2025-01-16',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Shippeo is here as a deliberately less obvious selection and as a geographic counterpoint to project44. A European category leader funding entry into a market where its main competitor is entrenched is a specific and interesting origination situation that a United States focused screen would not surface.',
    whyMayNeedGrowthCapital:
      'A USD 30 million round to fund simultaneous North American and Asia Pacific expansion is modest for the task. Nineteen months on, the expansion is either working and needs scaling capital or is not and needs a different plan.',
    potentialUseOfProceeds: [
      'North American carrier integration build out',
      'Sales capacity in North America and Asia Pacific',
      'Continued platform investment to maintain analyst category position',
      'Working capital to support a longer international sales cycle',
    ],

    whyEquityMayFit:
      'Geographic expansion into a competitive market is a multi year investment with uncertain payback timing, which suits equity rather than a fixed repayment schedule.',
    whyDebtMayFit:
      'It cannot be assessed publicly. No ARR, retention, margin, or cash flow figure has been disclosed, and the company is the smallest in this universe by disclosed funding after Highnote.',
    whyBlendedMayFit:
      'European growth financing markets offer structures combining equity with venture debt that could suit a company at this scale, but nothing in the public record establishes debt service capacity.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure. Private credit is not assessable: no revenue evidence exists and the disclosed capital base is small. Establishing ARR and the European against North American revenue split is the prerequisite to any structural view.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'The January 2025 round was USD 30 million to fund expansion into both North America and Asia Pacific. Nineteen months on, what proportion of new business is coming from outside Europe?',
      'North American carrier integration is largely a separate estate from European. How far through that build is the platform, and what does it cost to maintain?',
      'project44 holds five consecutive years of Gartner leadership and is entrenched in North America. Where is Shippeo winning against it, and on what basis?',
    ],
    nextDiligenceStep:
      'Establish ARR and the European against North American revenue split. The expansion thesis is the entire investment case, and no public evidence indicates whether it is working.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'European against North American revenue split',
      'Customer count and named customers',
      'Customer concentration',
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
        5,
        'B2B enterprise supply chain software sold on annual subscription to transportation and logistics buyers.',
        ['sh-round'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'Named a Gartner Magic Quadrant Leader in both 2024 and 2025, more than 90 million shipments tracked annually across 150 countries, and twelve years of operation.',
        ['sh-mq', 'sh-round'],
        'independently-verified',
        'High',
        'Two consecutive independent analyst Leader placements plus substantial disclosed platform volume is strong maturity evidence. Held below 5 because no named customers, customer count, or revenue scale is disclosed.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. There is no growth disclosure of any kind.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['sh-round'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Transportation visibility platforms integrate with carrier networks and embed into daily logistics operations, and two consecutive analyst Leader placements indicate depth of enterprise deployment.',
        ['sh-mq'],
        'independently-verified',
        'Moderate',
        'Genuine operational embeddedness supported by independent evaluation. Held below 5 because no customer count or concentration data exists and shippers frequently run multiple visibility vendors.',
      ),
      marketAttractiveness: rate(
        3,
        'Transportation visibility demand is durable, but the category has several well funded competitors and the buying centre is exposed to freight market cycles.',
        ['sh-mq'],
        'analyst-judgment',
        'Moderate',
        'A real ongoing need in a fragmented and cyclically exposed category, which is the same assessment applied to project44 for consistency.',
      ),
      capitalEfficiency: rate(
        3,
        'More than USD 140 million of disclosed funding across twelve years, the second lowest total in this universe, with no disclosed revenue against which to read it.',
        ['sh-round'],
        'analyst-judgment',
        'Limited',
        'Low absolute capital consumption over a long operating history in a capital intensive category is genuinely suggestive of discipline, which lifts this above peers with no revenue disclosure and larger raises.',
      ),
      capitalNeedTiming: rate(
        4,
        'A USD 30 million round in January 2025 funding simultaneous North American and Asia Pacific expansion, which is modest relative to the task and to competitor funding levels.',
        ['sh-round'],
        'analyst-judgment',
        'Moderate',
        'The mismatch between the funding size and the stated expansion scope makes a follow on requirement more likely here than the elapsed time alone would suggest.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after twelve years, publishes co-founder interviews on the company site, and the co-founder leadership team is publicly identified. No finance leader is publicly disclosed.',
        ['sh-round', 'sh-qa'],
        'company-reported',
        'Moderate',
        'Founder chief executive with published interview material available, which supports an informed approach. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Two consecutive independent analyst Leader placements',
          'Established European category position',
          'Active international expansion with a defined use of capital',
          'Strategic investor validation from the Toyota growth fund',
        ],
        conditions:
          'Subject to establishing revenue scale and whether the North American expansion is converting. Held at 3 because no growth evidence exists and the competitive position outside Europe is unproven.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise annual subscription contract model is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and the disclosed capital base is among the smallest in this universe.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'European growth financing markets offer venture debt alongside equity at this scale',
          'Defined expansion programme with an identifiable funding requirement',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. Nothing public establishes debt service capacity.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Funding a two continent expansion from a modest round usually forces a choice between depth and breadth within eighteen months, and understanding which way that resolved determines what capital is actually needed next.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Pierre Khoury, co-founder and Chief Executive Officer',
          subject: 'Shippeo North American carrier integration and the expansion economics',
          body: `Pierre,

I have been researching transportation visibility companies and how the European and North American markets differ structurally, and Shippeo is the clearest case of a company with a strong home position attempting the harder direction of travel.

The January 2025 round funded expansion into both North America and Asia Pacific, which is a wide brief for that amount, particularly given that North American carrier integration is largely a separate build from the European estate.

I would be interested in learning how that has resolved in practice, and whether the win rate against the entrenched North American vendors is coming from multinational accounts that already know you from Europe.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'sh-round',
        'Shippeo',
        'Shippeo Raises USD 30m Strategic Round Led by Woven Capital to Accelerate US and APAC Expansion',
        'https://www.shippeo.com/resources/explore/press-releases/shippeo-raises-30m-strategic-round-led-by-woven-capital-to-accelerate-us-and-apac-expansion',
        '2025-01-16',
        'primary',
      ),
      src(
        'sh-mq',
        'Shippeo via Business Wire',
        'Shippeo Named a Leader in the 2025 Gartner Magic Quadrant for Real Time Transportation Visibility Platforms for Second Consecutive Year',
        'https://www.businesswire.com/news/home/20250227846230/en/Shippeo-Named-a-Leader-in-the-2025-Gartner-Magic-Quadrant-for-Real-Time-Transportation-Visibility-Platforms-for-Second-Consecutive-Year',
        '2025-02-27',
        'primary',
      ),
      src(
        'sh-ngp',
        'NGP Capital',
        'Portfolio company Shippeo Raises USD 30m Strategic Round to Accelerate US and APAC Expansion',
        'https://www.ngpcap.com/insights/ngp-portfolio-company-shippeo-raises-30m-strategic-round-to-accelerate-us-and-apac-expansion',
        '2025-01-16',
        'corroborating',
      ),
      src(
        'sh-dc',
        'Digital Commerce 360',
        'Shippeo secures USD 30 million funding to expand into North America',
        'https://www.digitalcommerce360.com/2025/01/16/shippeo-secures-30-million-funding/',
        '2025-01-16',
        'corroborating',
      ),
      src(
        'sh-qa',
        'Shippeo',
        'Leading the Way in Real-Time Visibility: A Q and A with Shippeo co-founders Pierre Khoury and Lucien Besse',
        'https://www.shippeo.com/blog/leading-the-way-in-visibility-a-q-a-with-shippeos-co-founders-pierre-khoury-lucien-besse',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Shippeo remains privately held and independently operating. The company continues to publish product and company announcements under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['sh-round', 'sh-mq'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'gladly',
    name: 'Gladly',
    website: 'https://www.gladly.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2014,
    founders: ['Joseph Ansanelli', 'Michael Wolfe', 'Dirk Kessler'],
    ceo: 'Joseph Ansanelli, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Customer support software',
    subsector: 'AI customer service platform',
    productDescription:
      'Gladly is a customer service platform organised around the customer rather than the ticket. Conversation history follows the person across channels including voice, messaging, email, and chat, and the company has layered AI agents on top of that model to resolve routine enquiries and to position support as a revenue channel rather than a cost centre.',
    targetCustomer:
      'Customer experience leaders at consumer brands and retailers where support quality is part of the brand proposition and repeat purchase economics justify the investment.',
    businessModel:
      'Annual subscription priced per support agent and increasingly per AI resolution, sold to mid market and enterprise consumer brands.',

    financingStage: 'Series E',
    latestFinancing: 'USD 40 million Series E led by AXA Venture Partners',
    financingDate: '2024-09-26',
    totalDisclosedFunding: 'Approximately USD 208 million',
    investors: [
      'AXA Venture Partners',
      'Greylock Partners',
      'New Enterprise Associates',
      'GGV Capital',
      'Riverwood Capital',
      'Glynn Capital',
    ],

    customerEvidence: claim(
      'Gladly publishes customer case material focused on consumer brands and retailers. No customer count or named enterprise customer list appears in the dated primary financing announcement reviewed.',
      'company-reported',
      ['gl-site', 'gl-e'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Twelve years of operation, five disclosed financing rounds, approximately USD 208 million raised, and an established position among consumer brand customer experience teams.',
      'company-reported',
      ['gl-e', 'gl-pr'],
      false,
    ),
    growthSignal: claim(
      'No quantified revenue or ARR growth figure has been disclosed. The Series E was framed around the launch of an AI powered unified platform positioning support as a revenue driver.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual per agent subscription, with pricing evolving toward per AI resolution. No ARR figure or retention measure has been disclosed.',
      'company-reported',
      ['gl-e'],
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
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Zendesk, Salesforce Service Cloud, Intercom, Front, and a wave of AI native support entrants including Decagon and Sierra. Gladly differentiates on the person centred data model rather than on AI capability alone.',
    mainCommercialRisk:
      'AI resolution pricing is deflationary for a per agent model. As AI resolves more contacts, the seat count that historically drove revenue falls, and the transition must be managed faster than the erosion.',
    mainFinancialRisk:
      'A USD 40 million Series E after approximately USD 208 million raised across twelve years is a modest round at a late stage letter, and no valuation was disclosed alongside it. Neither observation is conclusive, but together they warrant understanding before anything else.',
    mainTechnologyRisk:
      'The person centred data model is the differentiator, and AI native entrants are building on it from the start rather than migrating to it, which erodes the structural advantage over time.',

    originalSourcingSignal:
      'Series E announcement dated 26 September 2024 disclosing a USD 40 million round led by AXA Venture Partners alongside the launch of an AI powered unified customer service platform positioning support as a revenue driver.',
    discoveryChannel: 'Product launch',
    signalDate: '2024-09-26',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Gladly is included as a deliberate test of whether the framework distinguishes a genuinely challenged situation from a merely under disclosed one. A modest late letter round with no disclosed valuation, in a category being repriced by AI, is a set of facts worth stating plainly rather than screening out.',
    whyMayNeedGrowthCapital:
      'Almost two years since a modest Series E, in a category where the pricing model is being restructured by AI and where several better funded AI native competitors have entered since.',
    potentialUseOfProceeds: [
      'Transition of the pricing model from per agent to per AI resolution',
      'Product investment in AI resolution capability',
      'Go to market defence against AI native entrants',
      'Runway extension through the pricing model transition',
    ],

    whyEquityMayFit:
      'A pricing model transition carries revenue risk during the change, which equity is better placed to absorb than a fixed repayment obligation.',
    whyDebtMayFit:
      'It does not on the public record. No ARR, retention, margin, or cash flow figure has been disclosed, and a per agent model facing AI driven seat compression is the specific revenue profile a lender would discount most heavily.',
    whyBlendedMayFit:
      'A modest facility could extend runway through the transition, but only if the recurring base is stable, which is precisely what is unknown and what the AI transition puts in question.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure, and even that requires establishing that the pricing transition is working. Private credit is not supportable: a per agent revenue model under AI driven seat compression is the weakest recurring revenue profile for a lender in this universe, before considering that no metrics are disclosed at all.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'The pricing model is moving from per agent to per AI resolution. What proportion of ARR now sits on resolution based pricing, and is total contract value rising or falling through that transition?',
      'The Series E was USD 40 million with no disclosed valuation, after approximately USD 208 million raised. How should that round be understood in the context of the AI repricing of the category?',
      'AI native competitors have entered with no per agent legacy to protect. What is the win rate against them in competitive evaluations, and on what basis are you winning?',
    ],
    nextDiligenceStep:
      'Establish ARR, the split between per agent and per resolution pricing, and net revenue retention. The direction of net retention through this transition is the single most informative number about the business.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Per agent against per resolution revenue split',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Series E valuation',
      'Customer count, named customers, and concentration',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise customer service software sold on annual subscription to customer experience buyers.',
        ['gl-e'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        2,
        'Twelve years of operation and five financing rounds, against no disclosed customer count, no named enterprise customers in dated primary sources, and no revenue scale.',
        ['gl-e', 'gl-pr'],
        'company-reported',
        'Limited',
        'Longevity and repeat financing are the only maturity evidence available, and every direct measure this factor asks for is absent. This is the lowest commercial maturity rating in the universe and it reflects the disclosure record.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. No growth disclosure of any kind exists.',
      ),
      recurringRevenueQuality: rate(
        1,
        'Per agent annual subscription model, transitioning toward per AI resolution pricing. No ARR figure and no retention measure is disclosed.',
        ['gl-e'],
        'analyst-judgment',
        'Limited',
        'Rated below the baseline given to other subscription models because a per agent model under AI driven seat compression is structurally deflationary, which is a specific weakness rather than merely an absence of data.',
      ),
      customerDurability: rate(
        3,
        'Customer service platforms hold conversation history and integrate with commerce systems, creating real migration cost. No customer count, logo list, or concentration data is disclosed.',
        ['gl-site'],
        'analyst-judgment',
        'Limited',
        'The structural switching cost argument holds, but it is weaker in customer service than in infrastructure, and AI native entrants are actively targeting these migrations.',
      ),
      marketAttractiveness: rate(
        2,
        'Customer service software is a large category, but AI resolution is compressing the seat count that has historically driven revenue across the whole category.',
        ['gl-e'],
        'analyst-judgment',
        'Moderate',
        'This is the only category in the universe where the dominant technology shift reduces the unit that vendors have historically priced against. Category size does not offset a deflationary pricing base.',
      ),
      capitalEfficiency: rate(
        1,
        'Approximately USD 208 million of disclosed funding across twelve years with no disclosed revenue against which to assess it, and a modest most recent round with no disclosed valuation.',
        ['gl-e', 'gl-pr'],
        'analyst-judgment',
        'Limited',
        'Rated 1 because twelve years and five rounds without a single disclosed revenue milestone is a weaker record than the other companies with no revenue disclosure but shorter histories.',
      ),
      capitalNeedTiming: rate(
        4,
        'Almost two years since a modest Series E with no disclosed valuation, during a period when the category pricing model is being restructured and better funded competitors have entered.',
        ['gl-e'],
        'analyst-judgment',
        'Moderate',
        'The combination of elapsed time, a small last round, and active competitive and pricing pressure makes a live capital requirement more likely here than almost anywhere in this universe.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after twelve years and is quoted directly in company announcements. No finance leader is publicly disclosed.',
        ['gl-e'],
        'company-reported',
        'Moderate',
        'Long tenured founder chief executive with public visibility. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 2,
        drivers: [
          'Differentiated person centred data model',
          'Long operating history with an established customer base',
          'Defined pricing model transition requiring investment',
        ],
        conditions:
          'Subject to establishing ARR, retention, and whether the pricing transition is accretive or dilutive to contract value. The rating reflects genuine category headwinds alongside the absence of disclosure.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 0,
        drivers: [],
        conditions:
          'Not supportable. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and independently of that the per agent revenue model faces structural compression from AI resolution. A recurring revenue facility underwritten against a seat base that the product roadmap is designed to shrink would be poorly conceived even with full disclosure.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: [
          'A runway extension through the pricing transition could suit a mixed instrument',
        ],
        conditions:
          'Subject to establishing that the recurring base is stable through the pricing transition, which is precisely what is unknown. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'When a category shifts from pricing per seat to pricing per resolution, the direction of net revenue retention through that transition tells you more about the business than any growth figure, and it is worth being explicit about it early.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Joseph Ansanelli, co-founder and Chief Executive Officer',
          subject: 'Gladly transition from per agent to per resolution pricing',
          body: `Joseph,

I have been researching customer service software and how the incumbent vendors are handling a shift that reduces the unit they have always priced against, and Gladly is an interesting case because the person centred data model was built before AI made it obvious.

The part I would most like to understand is the pricing transition. Moving from per agent to per resolution is the right direction, but it changes contract value in both directions at once, and the net effect within existing accounts is the number that matters.

I would be interested in learning how that is trending, and whether the accounts furthest through the transition are expanding or contracting.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'gl-e',
        'PR Newswire',
        'Gladly secures USD 40M in funding led by AXA Venture Partners and launches AI-powered unified customer service platform',
        'https://www.prnewswire.com/news-releases/gladly-secures-40m-in-funding-led-by-axa-venture-partners-avp-and-launches-ai-powered-unified-customer-service-platform-transforming-support-into-a-revenue-driver-302259688.html',
        '2024-09-26',
        'primary',
        true,
      ),
      src(
        'gl-site',
        'Gladly',
        'Gladly platform and product documentation',
        'https://www.gladly.com/',
        '2026-08-05',
        'primary',
      ),
      src(
        'gl-pr',
        'PRWeb',
        'Gladly Secures USD 55 Million Funding to Expand Innovation of its Customer Service Platform',
        'https://www.prweb.com/releases/gladly-secures-55-million-funding-to-expand-innovation-of-its-customer-service-platform-860197484.html',
        '2021-06-15',
        'corroborating',
        true,
      ),
      src(
        'gl-st',
        'SalesTechStar',
        'Gladly secures USD 40M in funding led by AXA Venture Partners',
        'https://salestechstar.com/price-optimization-revenue-management/gladly-secures-40m-in-funding-led-by-axa-venture-partners-avp-and-launches-ai-powered-unified-customer-service-platform-transforming-support-into-a-revenue-driver/',
        '2024-09-27',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Gladly remains privately held and independently operating. The company continues to publish product and company content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['gl-e', 'gl-site'],
      false,
    ),
  },
];
