/**
 * Emerging origination targets.
 *
 * These records are held to exactly the same verification standard as the
 * benchmark set: an official website, a verified private status claim, at least
 * one primary source, at least one independent corroborating source, a dated
 * origination signal, provenance on every material claim, and an explicit list
 * of what public sources do not disclose.
 *
 * What differs is the sourcing intent. The benchmark set exists to calibrate
 * what a mature private software company looks like. This set is where a
 * differentiated conversation is more plausible: earlier stage, more capital
 * efficient, founder led, and outside the list of names every growth investor
 * already tracks.
 *
 * The classification is deliberately not a scoring input. Nothing here is
 * boosted for being emerging, which is why several of these records score below
 * the benchmark companies. That is the honest result.
 */

import type { CompanyInput } from '@/lib/types';
import { NOT_DISCLOSED } from '@/lib/types';
import { claim, rate, src, undisclosed, REVIEW_DATE } from './helpers';

export const emergingCompanies: CompanyInput[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'workos',
    name: 'WorkOS',
    website: 'https://workos.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2019,
    founders: ['Michael Grinich'],
    ceo: 'Michael Grinich, founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Developer tools',
    subsector: 'Enterprise readiness and identity infrastructure',
    productDescription:
      'WorkOS sells the features that software companies must add before an enterprise will buy them: single sign on, directory synchronisation, audit logging, role based access control, and user management, delivered as APIs rather than as a platform migration. The pitch is that a company can become enterprise ready in days instead of quarters.',
    targetCustomer:
      'Engineering and product leaders at software companies moving upmarket from self serve into enterprise sales, particularly fast growing AI application companies hitting enterprise procurement for the first time.',
    businessModel:
      'Usage and seat based subscription priced by connection and directory, sold bottom up to developers with an enterprise tier above it.',

    financingStage: 'Series C',
    latestFinancing:
      'USD 100 million Series C led by Meritech Capital Partners and Sapphire Ventures at a reported USD 2 billion valuation',
    financingDate: '2026-03-02',
    totalDisclosedFunding:
      'Approximately USD 199 million, being USD 99 million reported raised prior to the Series C plus the USD 100 million Series C',
    investors: [
      'Meritech Capital Partners',
      'Sapphire Ventures',
      'Greenoaks Capital',
      'Lightspeed Venture Partners',
      'Abstract Ventures',
      'Lachy Groom',
    ],

    customerEvidence: claim(
      'Company announcement dated 2 March 2026 states thousands of customers and five nines of uptime across billions of API requests each month, naming OpenAI, Anthropic, xAI, Cursor, Perplexity, Sierra, Baseten, Replit, Vercel, Temporal, Gamma, and Clay. No precise customer count is disclosed.',
      'company-reported',
      ['wos-c', 'wos-sacra'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Seven years of operation, a stated base of thousands of customers, named adoption by essentially every leading AI application company, and a Series C led by two institutional growth investors at a reported USD 2 billion valuation.',
      'company-reported',
      ['wos-c', 'wos-vb'],
      false,
    ),
    growthSignal: claim(
      'Reported valuation rose from USD 525 million at the Series B in June 2022 to USD 2 billion at the Series C in March 2026. Valuation is an investor set price rather than a growth measure. No revenue, ARR, or customer growth figure has been disclosed by the company in any primary source.',
      'investor-reported',
      ['wos-c', 'wos-vb'],
      true,
      '2026-03-02',
    ),
    recurringRevenueEvidence: claim(
      'Sold as a usage and seat based subscription priced by connection and directory. No ARR figure and no retention measure has been published in any primary source.',
      'company-reported',
      ['wos-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. A figure of approximately USD 30 million for October 2025 circulates on aggregator sites, but it does not appear in the company announcements or in the published chief executive interview those sites cite, and the same aggregators report an obviously incorrect valuation alongside it. It is not relied upon here.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: claim(
      'No revenue figure has been disclosed, so capital efficiency cannot be assessed. Headcount figures for this company vary between roughly 89 and 134 across aggregator sites with no primary source, so no revenue per employee ratio can be computed.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: claim(
      'WorkOS acquired Modulz, the team behind the Radix open source user interface library, alongside its Series B in June 2022. Consideration was not disclosed.',
      'company-reported',
      ['wos-b'],
      false,
    ),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Auth0 under Okta, Stytch, Descope, Clerk, and the build it yourself path that most engineering teams take first. The differentiator is scope: WorkOS sells the whole enterprise readiness checklist rather than authentication alone.',
    mainCommercialRisk:
      'Customer concentration in AI application companies is a strength while that segment is growing and a correlated exposure if it consolidates. A single large customer building identity in house removes a material contract.',
    mainFinancialRisk:
      'A reported USD 2 billion valuation with no disclosed revenue at any point means the entry multiple cannot be assessed from public sources at all. That is a larger gap here than at most companies in this universe, because the valuation is high and the disclosure is minimal.',
    mainTechnologyRisk:
      'Identity infrastructure sits in the authentication path of the customer product. An outage is the customer outage, which raises the operational bar well above ordinary developer tooling.',

    originalSourcingSignal:
      'Financing announcement dated 2 March 2026 disclosing a USD 100 million Series C led by Meritech Capital Partners and Sapphire Ventures at a reported USD 2 billion valuation, up from a reported USD 525 million at the Series B in 2022.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2026-03-02',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'The customer list is the signal. OpenAI, Anthropic, xAI, Cursor, Perplexity, Replit, and Vercel all buying the same enterprise readiness layer means WorkOS sits underneath the fastest growing segment of enterprise software as infrastructure rather than as a vendor. That position is visible in primary sources even though nothing about the revenue behind it is.',
    whyMayNeedGrowthCapital:
      'The company has just raised, so near term need is low. The origination case is positional rather than transactional: a company embedded beneath the AI application layer will keep facing capital decisions as that segment scales, and the useful work is understanding the business before a process starts rather than during one.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity to serve customers moving upmarket alongside it',
      'Product expansion further along the enterprise readiness checklist',
      'Acquisition of adjacent developer infrastructure, as with the Modulz transaction',
      'International entity and compliance build out for regulated buyers',
    ],

    whyEquityMayFit:
      'A category leading position in a widening product surface, with a demonstrated appetite for tuck in acquisitions, is a conventional growth equity profile.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. No ARR, retention, margin, or cash flow figure has been disclosed in any primary source, and a subscription contract model alone is not sufficient to underwrite a facility.',
    whyBlendedMayFit:
      'At a reported USD 2 billion valuation every point of dilution is expensive, which is the condition a blended structure addresses. Whether it is available depends entirely on revenue evidence that has not been published.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the demonstrated and only supportable structure. Private credit is not assessable: no revenue figure of any kind appears in a primary source, and the capital efficiency inference that a credit case would rest on comes from aggregator data this project does not rely upon. Establishing ARR is the prerequisite to any structural view.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Aggregator sites report roughly USD 30 million of ARR for October 2025, which does not appear in any company announcement or in the published interview those sites cite. What is the actual ARR, and is the business at or near cash flow breakeven?',
      'A large share of named customers are AI application companies. What is revenue concentration across the top ten accounts, and how correlated is that cohort?',
      'The product surface keeps widening from single sign on into the full enterprise readiness checklist. Is that expansion sold as new contracts or absorbed into existing pricing?',
    ],
    nextDiligenceStep:
      'Establish ARR from the company directly. The figure circulating on aggregator sites could not be traced to any primary source during this audit, so the single most basic input to any structural view is currently unknown rather than approximately known.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Employee headcount from a first party source',
      'Customer count',
      'Gross margin',
      'Net revenue retention',
      'Gross retention',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Customer concentration',
      'Contracted against usage based revenue split',
      'Existing debt or credit facility',
      'Acquisition consideration paid for Modulz',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise software infrastructure sold on subscription to engineering and product buyers at software companies.',
        ['wos-sacra'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'A stated base of thousands of customers with named adoption by OpenAI, Anthropic, xAI, Cursor, Perplexity, Replit, and Vercel, plus five nines of uptime across billions of monthly API requests.',
        ['wos-c'],
        'company-reported',
        'Moderate',
        'The named logo quality is the strongest in the emerging set and spans essentially the whole frontier AI segment. Held below 5 because no customer count and no revenue scale is disclosed.',
      ),
      growthQuality: rate(
        2,
        'Reported valuation rose from USD 525 million in June 2022 to USD 2 billion in March 2026. No revenue, ARR, or customer growth figure has been disclosed in any primary source.',
        ['wos-c', 'wos-vb'],
        'investor-reported',
        'Limited',
        'Valuation appreciation is a price signal rather than a growth measure. Treating it as growth is the substitution this framework exists to prevent, so it earns a 2 for what it implies rather than a high rating for what it looks like.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Usage and seat based subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed in any primary source.',
        ['wos-c'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Identity and directory infrastructure sits in the authentication path of the customer product, so replacement is a migration rather than a switch. More than 1,000 customers implies reasonable breadth.',
        ['wos-sacra'],
        'analyst-judgment',
        'Moderate',
        'Very high technical switching cost once embedded. Held below 5 because the customer base is concentrated in one fast moving segment and large customers can rebuild identity internally.',
      ),
      marketAttractiveness: rate(
        4,
        'Every software company selling upmarket hits the same enterprise procurement checklist, and the volume of companies making that transition has risen with AI application growth.',
        ['wos-sacra'],
        'analyst-judgment',
        'Moderate',
        'A structural and repeating need with a clear trigger event. Held below 5 because the buy against build decision is genuinely contested and the alternative is free engineering time.',
      ),
      capitalEfficiency: rate(
        0,
        'No revenue figure has been disclosed in any primary source, and published headcount figures vary between roughly 89 and 134 across aggregators with no first party confirmation.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. This rating previously stood at 5 on an aggregator sourced revenue per employee ratio; that figure could not be traced to a primary source on audit and was removed.',
      ),
      capitalNeedTiming: rate(
        2,
        'A USD 100 million Series C closed in March 2026, approximately five months before review.',
        ['wos-c'],
        'company-reported',
        'High',
        'Recently and substantially financed, so there is no publicly visible near term requirement. That is what this factor measures rather than company quality.',
      ),
      outreachPotential: rate(
        4,
        'Founder chief executive who gives detailed named long form interviews about strategy and the enterprise buying motion. No finance leader is publicly disclosed.',
        ['wos-sacra'],
        'company-reported',
        'Moderate',
        'Strong founder visibility with substantive public commentary on the category. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Named adoption by essentially every leading AI application company',
          'Position as infrastructure beneath the fastest growing software segment',
          'Widening product surface with demonstrated acquisition appetite',
          'Founder chief executive with a clear public strategic thesis',
        ],
        conditions:
          'Subject to establishing revenue scale, growth, and customer concentration, none of which is public. Held at 4 because the category position is genuinely strong while a reported USD 2 billion valuation with no disclosed revenue is an entry that cannot be assessed.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Subscription contract model with deep technical embedding is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance appears in any primary source. This rating previously stood at 3 on an aggregator sourced revenue per employee ratio; that figure was removed on audit because it could not be traced to a primary source, and the rating fell with it.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'High valuation makes equity expensive per dollar raised',
          'Recently raised equity would reduce the size any facility needs to be',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear, and that component is currently unsupported.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company whose customers are the fastest growing software businesses in the market carries an unusual revenue profile underneath, and understanding whether that translates into contracted or consumption revenue is what determines which capital structures are available at the next event.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Michael Grinich, founder and Chief Executive Officer',
          subject: 'WorkOS customer concentration in the AI application cohort',
          body: `Michael,

I have been researching the infrastructure layer underneath the AI application companies, and WorkOS is the one that shows up in almost every stack I looked at.

OpenAI, Anthropic, xAI, Cursor, Perplexity, Replit, and Vercel buying the same enterprise readiness layer is a striking concentration. It is also a cohort whose own revenue is moving faster than almost any group of companies has before, which presumably makes both expansion and volatility unusually high.

I would be interested in learning whether that cohort behaves as one correlated block in practice, and how much of the revenue is contracted against consumption.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'wos-c',
        'WorkOS',
        'WorkOS raises USD 100M Series C, hits USD 2B valuation',
        'https://workos.com/blog/series-c',
        '2026-03-02',
        'primary',
      ),
      src(
        'wos-b',
        'WorkOS',
        'WorkOS raises USD 80m in Series B financing, acquires Modulz',
        'https://workos.com/blog/series-b',
        '2022-06-01',
        'primary',
      ),
      src(
        'wos-sacra',
        'Sacra',
        'Michael Grinich, chief executive of WorkOS, on AI startups getting enterprise ready at launch',
        'https://sacra.com/research/michael-grinich-workos-enterprise-ready-at-launch/',
        '2025-11-19',
        'corroborating',
      ),
      src(
        'wos-vb',
        'VentureBeat',
        'WorkOS, which brings enterprise readiness to SaaS apps, raises USD 80M',
        'https://venturebeat.com/programming-development/workos-which-brings-enterprise-readinessto-saas-apps-raises-80m',
        '2022-06-01',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'WorkOS remains privately held and independently operating. Its most recent disclosed financing in March 2026 was a private Series C round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['wos-c', 'wos-sacra'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'prophecy',
    name: 'Prophecy',
    website: 'https://www.prophecy.io',
    headquarters: 'Palo Alto, California, United States',
    foundedYear: 2015,
    founders: ['Raj Bains', 'Vikas Marwaha', 'Maciej Szpakowski', 'Rohit Bakhshi'],
    ceo: 'Raj Bains, founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Data infrastructure',
    subsector: 'Data transformation and pipeline development',
    productDescription:
      'Prophecy provides a low code data transformation platform where visual pipeline design compiles to open source Spark and SQL code rather than to a proprietary runtime. Data engineers work in code, analysts work visually, and both edit the same pipeline. The company has layered AI assisted pipeline generation on top of that model.',
    targetCustomer:
      'Data engineering and analytics teams at large enterprises migrating off legacy extract, transform, and load tooling onto cloud data platforms, particularly in financial services.',
    businessModel:
      'Annual enterprise subscription priced on users and compute connections, sold direct with a partner motion through the cloud data platforms.',

    financingStage: 'Series B',
    latestFinancing:
      'USD 47 million Series B extension led by Smith Point Capital, with HSBC joining as a new investor',
    financingDate: '2025-01-16',
    totalDisclosedFunding: 'Approximately USD 114 million across disclosed rounds',
    investors: [
      'Smith Point Capital',
      'Insight Partners',
      'SignalFire',
      'JPMorgan Chase',
      'HSBC',
      'Berkeley SkyDeck',
      'DallasVC',
    ],

    customerEvidence: claim(
      'Two global banks, JPMorgan Chase and HSBC, are disclosed as investors alongside being referenced in the customer context of the financing. Named individual enterprise customers are not disclosed in dated primary announcements.',
      'company-reported',
      ['pr-b2', 'pr-sa'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Eleven years of operation, a Series B extension led by an institutional growth investor, and strategic investment from two global banks that are also enterprise buyers in the category.',
      'investor-reported',
      ['pr-b2', 'pr-insight'],
      false,
    ),
    growthSignal: claim(
      'Company announcement dated 16 January 2025 states 3.5 times revenue growth in fiscal 2024 with 160 percent net revenue retention from existing customers.',
      'company-reported',
      ['pr-b2', 'pr-sa'],
      true,
      '2024-12-31',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription, with the company reporting growth in revenue and retention terms rather than in bookings or platform volume.',
      'company-reported',
      ['pr-b2'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: claim(
      'Company announcement dated 16 January 2025 states 160 percent net revenue retention from existing customers for fiscal 2024.',
      'company-reported',
      ['pr-b2', 'pr-sa'],
      true,
      '2024-12-31',
    ),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No absolute annual recurring revenue figure has been disclosed. A 3.5 times revenue growth multiple is disclosed for fiscal 2024, which bounds the trajectory without fixing the base.',
      'company-reported',
      ['pr-b2'],
      true,
      '2024-12-31',
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with dbt Labs, Informatica, Matillion, Coalesce, and the native transformation tooling inside Databricks and Snowflake. The compile to open source code architecture is the differentiator against both legacy vendors and platform native tools.',
    mainCommercialRisk:
      'Migration off legacy extract, transform, and load tooling is a multi year enterprise programme with long sales cycles, and the cloud data platforms ship competing transformation capability to customers who already pay them.',
    mainFinancialRisk:
      'Growth is disclosed as a multiple with no revenue base, so the absolute scale of the business is unknown. A 3.5 times increase on a small base is a different company from the same multiple on a large one.',
    mainTechnologyRisk:
      'Compiling a visual interface to correct, performant Spark and SQL across multiple cloud platforms is a hard engineering commitment that grows with every platform version.',

    originalSourcingSignal:
      'Financing announcement dated 16 January 2025 disclosing a USD 47 million Series B extension led by Smith Point Capital, with HSBC joining as a new investor, alongside a stated 160 percent net revenue retention for fiscal 2024. Both the announcement and the metric it carries are treated here as historical, since the fiscal period closed in December 2024.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-01-16',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Net revenue retention of 160 percent is disclosed for fiscal 2024. Almost no private company in this universe publishes a retention figure at all, and retention is the single metric that most determines whether a recurring revenue facility is possible. A company that volunteers it is a company that can have the conversation. The figure is roughly twenty months old at the review date, so the origination angle is the willingness to disclose rather than the number itself.',
    whyMayNeedGrowthCapital:
      'Nineteen months since the last disclosed round, with an enterprise migration motion that carries long sales cycles and high customer acquisition cost ahead of the revenue it produces.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity for multi year migration programmes',
      'Product investment in AI assisted pipeline generation',
      'Deepening the partner motion with the cloud data platforms',
      'Financial services vertical build out alongside the strategic bank investors',
    ],

    whyEquityMayFit:
      'A long cycle enterprise replacement motion requires patient capital that is not sensitive to quarterly cash conversion.',
    whyDebtMayFit:
      'The 160 percent net revenue retention disclosed for fiscal 2024 is exactly the evidence a recurring revenue lender tests first, and it is stronger than anything most companies in this universe disclose. What is missing is the revenue base to size a facility against, and a current figure. A lender would underwrite the trailing twelve months, not a period that closed in December 2024.',
    whyBlendedMayFit:
      'Strong disclosed retention with an unknown base is the profile where a small facility alongside equity is testable quickly, because confirming one number would resolve most of the credit question. That confirmation would have to be current rather than the fiscal 2024 figure on the public record.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity leads on the disclosed evidence. Private credit is potentially suitable and unusually testable, subject to confirming absolute ARR, gross margin, gross retention, burn, and debt service capacity on a current basis. The fiscal 2024 retention disclosure means the hardest question was answered once, which is rare here, but the answer is now historical rather than live.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'Net revenue retention of 160 percent is disclosed for fiscal 2024 but the revenue base is not, and there has been no update since. What is absolute ARR today, where does retention now sit, and how much of that expansion came from seat growth against compute consumption?',
      'JPMorgan Chase and HSBC are both investors and plausible enterprise buyers. What share of revenue comes from financial services, and does that concentration carry different contract terms?',
      'Migrations off legacy tooling are multi year. What does the revenue recognition profile look like across a typical migration, and how much is committed at signature?',
    ],
    nextDiligenceStep:
      'Establish absolute ARR and gross retention. Net revenue retention of 160 percent is a strong signal, and without gross retention it cannot be separated into expansion within a stable base against expansion masking churn.',
    missingInformation: [
      'Absolute annual recurring revenue',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer count and concentration',
      'Named enterprise customers in dated primary sources',
      'Financial services revenue concentration',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise data infrastructure software sold on annual subscription to enterprise data engineering teams.',
        ['pr-b2'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'Eleven years of operation with strategic investment from two global banks, against no disclosed customer count, no named enterprise logos in dated primary sources, and no revenue scale.',
        ['pr-b2', 'pr-insight'],
        'investor-reported',
        'Moderate',
        'Bank strategic investment is meaningful validation in a category those institutions buy in. The absence of any disclosed customer or revenue scale keeps this at the midpoint.',
      ),
      growthQuality: rate(
        4,
        'A stated 3.5 times revenue growth for fiscal 2024 published alongside a 160 percent net revenue retention figure, both in a dated announcement.',
        ['pr-b2', 'pr-sa'],
        'company-reported',
        'Moderate',
        'Two distinct growth measures disclosed for a specific fiscal year is high quality disclosure. Held below 5 because there is no absolute base, no prior year comparison to establish durability, and no update since the fiscal 2024 period closed.',
      ),
      recurringRevenueQuality: rate(
        4,
        'Disclosed net revenue retention of 160 percent against an annual enterprise subscription base, with growth reported in revenue rather than bookings terms.',
        ['pr-b2', 'pr-sa'],
        'company-reported',
        'Moderate',
        'A disclosed retention figure is the strongest recurring revenue evidence available short of a disclosed ARR base, and almost nothing else in this universe provides it. The absent base and the age of the fiscal 2024 measurement prevent a 5.',
      ),
      customerDurability: rate(
        4,
        'Data transformation pipelines encode business logic and become embedded in production reporting, and the compile to open source architecture reduces the lock in customers fear while raising the migration cost once adopted.',
        ['pr-b2'],
        'analyst-judgment',
        'Moderate',
        'Retention of 160 percent in fiscal 2024 is direct evidence that the installed base expanded rather than left. Held below 5 because no customer count or concentration data exists and the measurement has not been refreshed since.',
      ),
      marketAttractiveness: rate(
        3,
        'Migration off legacy extract, transform, and load tooling is a large multi year budget, but the cloud data platforms ship competing transformation capability to the same customers.',
        ['pr-b2'],
        'analyst-judgment',
        'Moderate',
        'A real and funded replacement cycle, offset by direct encroachment from the platforms the product depends on.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 114 million of disclosed funding across eleven years with no disclosed revenue base against which to assess it.',
        ['pr-b2'],
        'analyst-judgment',
        'Limited',
        'Modest capital consumption over a long operating history is weakly favourable. No revenue denominator prevents anything higher.',
      ),
      capitalNeedTiming: rate(
        4,
        'Nineteen months since the last disclosed round, with an enterprise migration motion that consumes capital ahead of revenue.',
        ['pr-b2'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time and the cost profile of long cycle enterprise selling together make a live requirement more likely than at recently financed peers.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive after eleven years and is quoted directly in company announcements. No finance leader is publicly disclosed.',
        ['pr-b2'],
        'company-reported',
        'Moderate',
        'Long tenured founder chief executive with public visibility. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Disclosed 160 percent net revenue retention',
          'Strategic validation from two global bank investors',
          'Long cycle enterprise motion requiring patient capital',
          'Founder led with eleven years of category focus',
        ],
        conditions:
          'Subject to establishing absolute revenue scale, which determines whether the disclosed growth multiple is material.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Disclosed net revenue retention of 160 percent, the strongest retention evidence in this universe',
          'Annual enterprise subscription contract base',
          'No disclosed existing leverage',
          'Bank investors already familiar with the credit',
        ],
        conditions:
          'Potentially suitable, subject to confirming absolute ARR scale, gross retention, gross margin, burn, cash balance, and debt service capacity. Net retention above 100 percent can mask churn in a shrinking customer count, so gross retention is the specific figure that would confirm or remove this rating.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 3,
        drivers: [
          'Strong retention evidence makes a facility testable quickly',
          'Valuation reference point not publicly reset since 2025',
          'Defined enterprise expansion programme',
        ],
        conditions:
          'Subject to confirming absolute ARR and gross retention. The blended rating tracks the debt component, which is unusually close to being supportable here.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Disclosing net revenue retention publicly is rare, and a company willing to publish it once is usually willing to discuss it currently, which is what opens structures a company at this stage would not expect to be available.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Raj Bains, founder and Chief Executive Officer',
          subject: 'Prophecy retention disclosure and the financial services concentration',
          body: `Raj,

I have been researching data transformation companies and how they are holding up as the cloud platforms ship native tooling, and Prophecy stood out for a reason unrelated to the product.

Publishing 160 percent net revenue retention for fiscal 2024 is unusual. Most private companies at this stage disclose a funding total and a customer logo wall, and retention is the number that actually determines what a business is worth financing.

That figure is now some way behind you, which is the reason I am writing rather than the reason I am not.

I would be interested in learning where retention has settled since, and how much of the expansion comes from the financial services base, given that JPMorgan and HSBC are both investors and plausible buyers, and whether those contracts behave differently from the rest.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'pr-b2',
        'PR Newswire',
        'Prophecy Takes in USD 47M Led by Smith Point Capital',
        'https://www.prnewswire.com/news-releases/prophecy-takes-in-47m-led-by-smith-point-capital-302352647.html',
        '2025-01-16',
        'primary',
        true,
      ),
      src(
        'pr-insight',
        'Insight Partners',
        'Prophecy Secures USD 35M Series B Funding to Scale its Self-Service Data Transformation Platform',
        'https://www.insightpartners.com/ideas/prophecy-secures-35m-series-b-funding-to-scale-its-self-service-data-transformation-platform/',
        '2023-10-11',
        'corroborating',
      ),
      src(
        'pr-sa',
        'SiliconANGLE',
        'Prophecy raises USD 47M to automate data pipeline development with generative AI',
        'https://siliconangle.com/2025/01/16/prophecy-raises-47m-automate-data-pipeline-development-generative-ai/',
        '2025-01-16',
        'corroborating',
      ),
      src(
        'pr-site',
        'Prophecy',
        'Prophecy platform documentation and newsroom',
        'https://www.prophecy.io',
        '2026-08-06',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Prophecy remains privately held and independently operating. The company continues to publish product and financing announcements under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['pr-b2', 'pr-sa'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'anrok',
    name: 'Anrok',
    website: 'https://www.anrok.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2020,
    founders: ['Michelle Valentine', 'Kannan Goundan'],
    ceo: 'Michelle Valentine, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Financial technology infrastructure',
    subsector: 'Sales tax and VAT compliance for software businesses',
    productDescription:
      'Anrok automates global sales tax and value added tax compliance for digital businesses: monitoring economic nexus thresholds across jurisdictions, calculating tax at transaction time, and filing returns. The product exists because software sold across borders creates tax obligations that scale with growth and that finance teams discover late.',
    targetCustomer:
      'Finance leaders at software and AI companies selling into multiple jurisdictions, typically encountering multi state or cross border tax exposure for the first time as revenue scales.',
    businessModel:
      'Annual subscription priced on transaction volume and jurisdictions monitored, with a filing service layered above it.',

    financingStage: 'Series C',
    latestFinancing:
      'USD 55 million Series C led by Spark Capital at a reported USD 525 million valuation',
    financingDate: '2025-10-21',
    totalDisclosedFunding: 'More than USD 100 million across disclosed rounds',
    investors: [
      'Spark Capital',
      'Sapphire Ventures',
      'Khosla Ventures',
      'Sequoia Capital',
      'Index Ventures',
    ],

    customerEvidence: claim(
      'Company announcement states more than 3,000 finance leaders use the platform, that customers include Anthropic, Cursor, and Notion, and that roughly 40 percent of the Forbes AI 50 are customers.',
      'company-reported',
      ['an-c', 'an-bw'],
      true,
      '2025-10-21',
    ),
    commercialMaturitySignal: claim(
      'Six years of operation, more than 3,000 customers, named adoption by leading AI and software companies, and a Series C led by an institutional growth investor at a reported valuation more than double the prior round.',
      'company-reported',
      ['an-c', 'an-bw'],
      true,
      '2025-10-21',
    ),
    growthSignal: claim(
      'Company sources state more than USD 1.4 billion in monthly revenue is analysed across the customer base, and the Series C reportedly more than doubled the valuation from the April 2024 Series B. Neither figure is a company revenue growth rate.',
      'company-reported',
      ['an-c', 'an-bw'],
      true,
      '2025-10-21',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual subscription priced on transaction volume and jurisdictions monitored. No ARR figure or retention measure has been published.',
      'company-reported',
      ['an-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. Monthly revenue analysed across the customer base is a platform volume metric and bears no fixed relationship to Anrok revenue.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'The product covers value added tax obligations outside the United States and the Series C was framed around scaling global tax compliance infrastructure. No international revenue mix is disclosed.',
      'company-reported',
      ['an-c'],
      false,
    ),

    competitiveLandscape:
      'Competes with Avalara under Vista Equity Partners, Vertex, Stripe Tax, and Sovos. Anrok differentiates on being built for software revenue models rather than adapted from physical goods tax logic.',
    mainCommercialRisk:
      'Stripe Tax reaches the same buyer inside a payment stack many customers already run, which caps pricing power at the smaller end of the market.',
    mainFinancialRisk:
      'No revenue figure of any kind has been disclosed, and the headline metrics describe customer activity rather than company revenue. A reported USD 525 million valuation cannot be assessed against anything public.',
    mainTechnologyRisk:
      'Tax rules change continuously across thousands of jurisdictions, so accuracy is an operating commitment rather than a feature, and an error creates a customer liability rather than a support ticket.',

    originalSourcingSignal:
      'Financing announcement dated 21 October 2025 disclosing a USD 55 million Series C led by Spark Capital, bringing total funding above USD 100 million at a reported USD 525 million valuation.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-10-21',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'Compliance obligations that scale automatically with a customer revenue is one of the few software categories where the buyer cannot defer the purchase once the threshold is crossed. That produces a demand profile closer to a regulated utility than to discretionary software, which is worth understanding in a credit context.',
    whyMayNeedGrowthCapital:
      'The company has just raised. The relevant near term question is the international build out, since VAT and cross border obligations require jurisdiction by jurisdiction registration and filing capability that carries cost ahead of the revenue it enables.',
    potentialUseOfProceeds: [
      'Jurisdiction coverage expansion for value added tax and cross border obligations',
      'Enterprise sales capacity to move above the software startup base',
      'Filing and compliance operations capacity',
      'Product investment in AI assisted tax determination',
    ],

    whyEquityMayFit:
      'Building jurisdiction coverage is an investment with a long payback that suits equity rather than a fixed repayment schedule.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. No ARR, retention, margin, or cash flow figure has been disclosed, and the disclosed metrics measure customer activity rather than company revenue.',
    whyBlendedMayFit:
      'If revenue scale supports it, the non discretionary demand profile would read well to a lender. That is conditional on evidence that does not exist publicly.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is not assessable: the disclosed figures describe the customer base rather than Anrok revenue, and no lender could size a facility against them. Establishing ARR is the prerequisite.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'More than USD 1.4 billion of monthly customer revenue is analysed on the platform. What is the relationship between that volume and Anrok ARR, and does pricing scale with it?',
      'Roughly 40 percent of the Forbes AI 50 are customers. What does net revenue retention look like for that cohort against the broader base, given how fast their own revenue is changing?',
      'International VAT coverage requires registration and filing capability per jurisdiction. How much of the cost base is fixed against variable as coverage expands?',
    ],
    nextDiligenceStep:
      'Establish ARR and its relationship to processed customer revenue. Platform volume metrics of this size can imply a scale the revenue base does not support, and every structural question depends on the revenue figure.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Relationship between processed customer revenue and Anrok revenue',
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
        'B2B enterprise software sold on annual subscription to finance buyers at software companies.',
        ['an-c'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'More than 3,000 customers, named adoption by Anthropic, Cursor, and Notion, and a stated 40 percent penetration of the Forbes AI 50.',
        ['an-c', 'an-bw'],
        'company-reported',
        'Moderate',
        'Customer count and named logos are strong for a six year old company. No disclosed revenue scale prevents a 5.',
      ),
      growthQuality: rate(
        2,
        'Reported valuation more than doubled between the April 2024 Series B and the October 2025 Series C. No revenue or ARR growth figure has been disclosed.',
        ['an-c', 'an-bw'],
        'investor-reported',
        'Limited',
        'Valuation appreciation is a price signal rather than a growth measure, and the platform volume figures disclosed alongside it do not resolve into a company growth rate.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['an-c'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Tax compliance embeds into the billing path and the filing calendar, and unwinding it mid year creates a filing gap, which is a strong practical deterrent to switching.',
        ['an-c'],
        'analyst-judgment',
        'Moderate',
        'Unusually high practical switching cost driven by the compliance calendar rather than by technical lock in. Held below 5 because no concentration data exists and the AI customer cohort is young.',
      ),
      marketAttractiveness: rate(
        5,
        'Economic nexus rules make the obligation automatic once revenue thresholds are crossed, so demand is created by the customer own growth rather than by a budget decision.',
        ['an-c'],
        'analyst-judgment',
        'Moderate',
        'This is the strongest non discretionary demand driver in the emerging set: the purchase is triggered by law rather than by preference.',
      ),
      capitalEfficiency: rate(
        2,
        'More than USD 100 million of disclosed funding with no disclosed revenue against which to assess it.',
        ['an-c'],
        'analyst-judgment',
        'Limited',
        'Capital raised is moderate relative to the benchmark set, bounding the potential inefficiency, but there is no denominator.',
      ),
      capitalNeedTiming: rate(
        2,
        'A USD 55 million Series C closed in October 2025, approximately ten months before review.',
        ['an-c'],
        'company-reported',
        'High',
        'Recently and substantially financed, so no near term requirement is publicly visible.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and both co-founders are publicly identified. The company publishes substantive tax research under its own name.',
        ['an-c', 'an-org'],
        'company-reported',
        'Moderate',
        'Founder chief executive with a public research output that supports an informed approach. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Non discretionary demand created by economic nexus rules',
          'Named adoption across leading AI and software companies',
          'International jurisdiction expansion requiring investment',
          'Institutional validation from a Spark Capital led round',
        ],
        conditions:
          'Subject to establishing revenue scale and growth. Held at 4 because the company was recently financed, which reduces near term relevance.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Annual subscription contract model with high practical switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and the platform volume figures describe customer revenue rather than Anrok revenue. Treating them as a proxy for scale would be an error.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined international expansion requirement',
          'Valuation set recently that shareholders would prefer to preserve',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A demand profile created by regulation rather than by budget reads very differently to a lender than ordinary software demand, and quantifying that relationship early is what makes non dilutive structures available later.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Michelle Valentine, co-founder and Chief Executive Officer',
          subject: 'Anrok cohort retention across the AI customer base',
          body: `Michelle,

I have been researching compliance software where the purchase is triggered by a threshold rather than by a budget cycle, and Anrok is the clearest example I have found in software tax.

The detail I keep returning to is the customer mix. Having roughly 40 percent of the Forbes AI 50 as customers is a striking concentration in a cohort whose own revenue is moving faster than almost any group of companies has before, which presumably makes both expansion and volatility unusually high.

I would be interested in learning how that cohort behaves on retention compared with the broader base.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'an-c',
        'Anrok',
        'Anrok raises USD 55M Series C to scale global tax compliance infrastructure',
        'https://www.anrok.com/resources/announcing-series-c',
        '2025-10-21',
        'primary',
      ),
      src(
        'an-b',
        'Anrok',
        'Announcing Anrok USD 30 million Series B',
        'https://www.anrok.com/resources/announcing-anroks-30-million-series-b',
        '2024-04-11',
        'primary',
      ),
      src(
        'an-bw',
        'Business Wire',
        'Anrok Raises Series C to Bring Funding to Over USD 100 Million',
        'https://www.businesswire.com/news/home/20251015978298/en/Anrok-Raises-Series-C-to-Bring-Funding-to-Over-$100-Million',
        '2025-10-21',
        'corroborating',
        true,
      ),
      src(
        'an-forbes',
        'Forbes',
        'Anrok Hits A USD 250 Million Valuation With A Mundane Idea: Calculating Sales Tax',
        'https://www.forbes.com/sites/kenrickcai/2024/04/11/anrok-series-b-funding-250-million-valuation-sales-tax/',
        '2024-04-11',
        'corroborating',
      ),
      src(
        'an-org',
        'The Org',
        'Michelle Valentine, chief executive and co-founder at Anrok',
        'https://theorg.com/org/anrok/org-chart/michelle-valentine',
        '2026-08-06',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Anrok remains privately held and independently operating. Its most recent disclosed financing in October 2025 was a private Series C round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['an-c', 'an-bw'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'incident-io',
    name: 'incident.io',
    website: 'https://incident.io',
    headquarters: 'London, United Kingdom, with a United States presence',
    foundedYear: 2021,
    founders: ['Stephen Whitworth', 'Pete Hamilton', 'Chris Evans'],
    ceo: 'Stephen Whitworth, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Enterprise infrastructure software',
    subsector: 'Incident management and on-call',
    productDescription:
      'incident.io runs the operational response when software breaks: on call scheduling, incident declaration and coordination inside the tools engineers already use, status pages, and automated post incident review. The company has extended into AI agents that triage and investigate incidents alongside responders.',
    targetCustomer:
      'Engineering, site reliability, and security operations teams at software companies where downtime carries direct revenue or contractual consequence.',
    businessModel:
      'Annual subscription priced per responder, with expansion driven by adding on call and status page products onto an existing incident deployment.',

    financingStage: 'Series B',
    latestFinancing:
      'USD 62 million Series B led by Insight Partners at a reported USD 400 million valuation',
    financingDate: '2025-04-10',
    totalDisclosedFunding: 'More than USD 96 million across disclosed rounds',
    investors: [
      'Insight Partners',
      'Index Ventures',
      'Point Nine Capital',
      'Mantis VC',
      'Mike Krieger',
    ],

    customerEvidence: claim(
      'Company announcement dated 10 April 2025 states more than 600 organisations use the platform, naming Netflix, Etsy, OpenAI, and Airbnb among them.',
      'company-reported',
      ['io-b', 'io-insight'],
      true,
      '2025-04-10',
    ),
    commercialMaturitySignal: claim(
      'More than 600 customer organisations within four years of founding, named adoption by Netflix, Etsy, OpenAI, and Airbnb, and a Series B led by an institutional growth investor.',
      'company-reported',
      ['io-b', 'io-insight'],
      true,
      '2025-04-10',
    ),
    growthSignal: claim(
      'No quantified revenue or ARR growth figure has been disclosed. The Series B was framed around expanding from incident response into AI agents that resolve incidents.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual per responder subscription. No ARR figure or retention measure has been published.',
      'company-reported',
      ['io-b'],
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
      'Founded and headquartered in London with a United States commercial presence, and a named customer base spanning both markets.',
      'company-reported',
      ['io-b', 'io-bil'],
      false,
    ),

    competitiveLandscape:
      'Competes with PagerDuty, Opsgenie under Atlassian, Rootly, FireHydrant, and Grafana OnCall. The differentiator is that incident coordination happens inside the messaging tool rather than in a separate console.',
    mainCommercialRisk:
      'PagerDuty is entrenched in on call budgets and the category has several funded challengers pursuing the same accounts, so displacement economics rather than category growth determine the outcome.',
    mainFinancialRisk:
      'No revenue figure of any kind has been disclosed. A reported USD 400 million valuation cannot be assessed against anything public, and per responder pricing is exposed to engineering headcount reductions at customers.',
    mainTechnologyRisk:
      'AI agents that triage live incidents make consequential judgments during outages, where a wrong call extends the outage rather than merely producing a poor answer.',

    originalSourcingSignal:
      'Financing announcement dated 10 April 2025 disclosing a USD 62 million Series B led by Insight Partners at a reported USD 400 million valuation, taking total funding above USD 96 million.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-04-10',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'A European headquartered company winning Netflix, OpenAI, and Airbnb within four years is displacing an entrenched incumbent on product rather than on price. That pattern is uncommon and it is a better predictor of durable revenue than any funding total. It scores 36 of 100 because the customer evidence is strong and the financial evidence is absent, and it stays in the set because the customer evidence is the part that is hard to acquire later.',
    whyMayNeedGrowthCapital:
      'Sixteen months since the last disclosed round, competing against a public incumbent and several funded challengers, in a category where United States enterprise go to market spend is the binding constraint for a London based company.',
    potentialUseOfProceeds: [
      'United States enterprise sales capacity',
      'Product investment in AI incident response agents',
      'Expansion from incident response into adjacent operational workflows',
      'Compliance and certification investment for regulated buyers',
    ],

    whyEquityMayFit:
      'Displacing an entrenched incumbent requires sustained go to market investment ahead of the revenue, which suits equity rather than a fixed repayment obligation.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. No ARR, retention, margin, or cash flow figure has been disclosed, and per responder pricing is more exposed to customer headcount than a platform fee would be.',
    whyBlendedMayFit:
      'If revenue scale supports it, funding a United States build out partly with debt would preserve ownership at a valuation set in early 2025. This is conditional on disclosure that does not exist.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is not assessable: no revenue evidence of any kind exists publicly. Establishing ARR and retention is the prerequisite to any structural view.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'More than 600 organisations use the platform including Netflix, OpenAI, and Airbnb. What is ARR, and what share comes from the largest ten accounts?',
      'Pricing is per responder. How exposed is the base to engineering headcount reductions at customers, and what proportion of contracts carry committed minimums?',
      'The company competes against an entrenched public incumbent. What is the win rate in competitive displacements, and how long is a typical replacement cycle?',
    ],
    nextDiligenceStep:
      'Establish ARR and the split between committed minimums and per responder billing. A seat priced model in a category exposed to engineering headcount is the specific profile where contracted revenue and billed revenue can diverge.',
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
      'Committed against per responder revenue split',
      'United States against European revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise infrastructure software sold on annual subscription to engineering and reliability teams.',
        ['io-b'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'More than 600 customer organisations within four years, with named adoption by Netflix, Etsy, OpenAI, and Airbnb.',
        ['io-b', 'io-insight'],
        'company-reported',
        'Moderate',
        'The named logo quality is exceptional for a company this young and indicates a repeatable enterprise sale. No disclosed revenue scale prevents a 5.',
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
        'Annual per responder subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['io-b'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it, and seat pricing is weaker than platform pricing for this purpose.',
      ),
      customerDurability: rate(
        4,
        'Incident tooling holds the on call rota, escalation policies, and post incident history, and is changed reluctantly because the migration itself creates operational risk.',
        ['io-b'],
        'analyst-judgment',
        'Moderate',
        'Genuine switching cost reinforced by the risk of changing systems that are only exercised during failures. Held below 5 because no concentration data exists.',
      ),
      marketAttractiveness: rate(
        4,
        'Operational reliability spend grows with system complexity and carries contractual service level obligations, which makes part of it non discretionary.',
        ['io-b'],
        'analyst-judgment',
        'Moderate',
        'A durable need with a contractual driver. Held below 5 because the category is crowded and an entrenched incumbent holds most existing budget.',
      ),
      capitalEfficiency: rate(
        2,
        'More than USD 96 million of disclosed funding with no disclosed revenue against which to assess it.',
        ['io-b'],
        'analyst-judgment',
        'Limited',
        'Modest capital raised for the customer base achieved, bounding potential inefficiency, but there is no revenue denominator.',
      ),
      capitalNeedTiming: rate(
        4,
        'Sixteen months since the last disclosed round, competing against a public incumbent and several challengers that have financed more recently.',
        ['io-b'],
        'analyst-judgment',
        'Moderate',
        'Competitive financing pressure combined with elapsed time makes a live requirement more likely here than the round size alone suggests.',
      ),
      outreachPotential: rate(
        5,
        'Founder chief executive who authors company announcements under his own name, with all three co-founders publicly identified and publicly associated with their prior engineering roles.',
        ['io-b'],
        'company-reported',
        'High',
        'Strong founder visibility and a company that publishes substantive engineering writing, which supports a genuinely informed approach.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Named enterprise customers won against an entrenched incumbent',
          'Rapid customer acquisition within four years',
          'United States expansion requiring investment ahead of revenue',
          'Institutional validation from an Insight Partners led round',
        ],
        conditions: 'Subject to establishing ARR scale and retention, neither of which is public.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: ['Annual subscription contract model is the only supporting condition present'],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed. Per responder pricing also carries more exposure to customer headcount than a lender would prefer.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined United States go to market expansion requirement',
          'Valuation set in early 2025 that shareholders may prefer to preserve',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Winning enterprise accounts from an entrenched incumbent is the hardest evidence a company can generate, and understanding whether that translates into contracted rather than seat billed revenue determines which structures are available.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Stephen Whitworth, co-founder and Chief Executive Officer',
          subject: 'incident.io displacement economics and the United States motion',
          body: `Stephen,

I have been researching operational reliability software and which challengers are genuinely displacing the incumbent rather than selling into greenfield teams, and incident.io is the clearest case.

Netflix, OpenAI, and Airbnb inside four years, from London, is not a product story alone. It suggests the replacement cycle is shorter than the category usually assumes, which is the thing most investors get wrong about this market.

I would be interested in learning how long a typical displacement actually takes, and whether the United States accounts are behaving differently from the European base on expansion.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'io-b',
        'incident.io',
        'incident.io raises USD 62M to build AI agents that resolve incidents with you',
        'https://incident.io/blog/incident.io-raises-62m',
        '2025-04-10',
        'primary',
      ),
      src(
        'io-site',
        'incident.io',
        'incident.io product and platform documentation',
        'https://incident.io',
        '2026-08-06',
        'primary',
      ),
      src(
        'io-insight',
        'Insight Partners',
        'incident.io Raises USD 62M to Build AI Agents That Resolve Incidents With You',
        'https://www.insightpartners.com/ideas/incident-io-raises-62m-to-build-ai-agents-that-resolve-incidents-with-you/',
        '2025-04-10',
        'corroborating',
      ),
      src(
        'io-bil',
        'Built In London',
        'AI Company incident.io Raises USD 62M Series B Round',
        'https://builtinlondon.uk/articles/incidentio-raises-62m-series-b-20250410',
        '2025-04-10',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'incident.io remains privately held and independently operating. The company continues to publish product and engineering content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['io-b', 'io-insight'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'tennr',
    name: 'Tennr',
    website: 'https://www.tennr.com',
    headquarters: 'New York, New York, United States',
    foundedYear: 2021,
    founders: ['Trey Holterman', 'Diego Baugh', 'Tyler Johnson'],
    ceo: 'Trey Holterman, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Healthcare enterprise software',
    subsector: 'Referral intake and document automation',
    productDescription:
      'Tennr reads the unstructured documents that move patients between providers, principally faxed referrals, and converts them into structured, actionable intake. The company uses domain specific language models to extract clinical and insurance detail, check requirements, and route the referral so that it does not stall.',
    targetCustomer:
      'Operations leaders at specialty provider groups, diagnostic and imaging networks, and durable medical equipment suppliers where referral volume determines revenue and manual intake is the bottleneck.',
    businessModel:
      'Annual subscription priced on document and referral volume processed, sold to provider organisations with implementation into existing electronic health record and intake workflows.',

    financingStage: 'Series C',
    latestFinancing: 'USD 101 million Series C led by IVP at a reported USD 605 million valuation',
    financingDate: '2025-06-18',
    totalDisclosedFunding:
      'At least USD 138 million across the two most recently disclosed rounds, being a USD 37 million round in October 2024 and the USD 101 million Series C',
    investors: [
      'IVP',
      'Andreessen Horowitz',
      'Lightspeed Venture Partners',
      'GV',
      'ICONIQ Growth',
      'Foundation Capital',
    ],

    customerEvidence: claim(
      'Company sources state the platform processes approximately 10 million documents a month across provider customers. Named individual customers are not disclosed in the dated primary announcement.',
      'company-reported',
      ['tn2-pr', 'tn2-fortune'],
      true,
      '2025-06-18',
    ),
    commercialMaturitySignal: claim(
      'Five years of operation, approximately 10 million documents processed monthly, two financing rounds within eight months, and a Series C led by IVP with participation from Andreessen Horowitz, Lightspeed, GV, and ICONIQ.',
      'company-reported',
      ['tn2-pr', 'tn2-fortune'],
      true,
      '2025-06-18',
    ),
    growthSignal: claim(
      'The USD 101 million Series C closed less than a year after a USD 37 million round in October 2024, and the reported valuation reached USD 605 million. Document volume is stated as growing. No revenue growth figure has been disclosed.',
      'investor-reported',
      ['tn2-fortune', 'tn2-mhn'],
      true,
      '2025-06-18',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual subscription priced on processed document and referral volume. No ARR figure or retention measure has been published.',
      'company-reported',
      ['tn2-pr'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. Monthly document volume is a platform metric and bears no fixed relationship to revenue.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with legacy fax and intake vendors, the referral modules inside electronic health record systems, and outsourced intake operations. The competitive alternative in most accounts is offshore manual processing rather than another software product.',
    mainCommercialRisk:
      'The product replaces labour, so the buying case competes directly against outsourced intake pricing, and provider organisations under margin pressure are practised at negotiating that comparison.',
    mainFinancialRisk:
      'Two large rounds within eight months at a rapidly rising valuation, with no disclosed revenue at any point. The financing pace has run well ahead of anything the public record can size.',
    mainTechnologyRisk:
      'Extraction accuracy on poor quality faxed clinical documents determines whether the product removes work or creates review work, and an error can affect a patient referral rather than a data field.',

    originalSourcingSignal:
      'Financing announcement dated 18 June 2025 disclosing a USD 101 million Series C led by IVP at a reported USD 605 million valuation, less than a year after a USD 37 million round.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-06-18',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Referral intake is where provider revenue leaks, and the incumbent alternative is offshore labour rather than software. That makes the value case measurable in a way that most healthcare software cannot claim, which is a stronger foundation for underwriting than category enthusiasm. It scores 35 of 100 on an almost entirely undisclosed financial record, and stays in the set because the measurable value case is the thing a first conversation would test.',
    whyMayNeedGrowthCapital:
      'Fourteen months since the last disclosed round, with a provider sales motion that carries long implementation cycles and an expansion path into adjacent intake workflows.',
    potentialUseOfProceeds: [
      'Provider sales and implementation capacity',
      'Expansion from referral intake into adjacent revenue cycle workflows',
      'Model development for clinical document extraction',
      'Integration engineering across electronic health record platforms',
    ],

    whyEquityMayFit:
      'A provider sales motion with long implementation cycles requires patient capital, and the company has demonstrated repeated access to it.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. No ARR, retention, margin, or cash flow figure has been disclosed, and document volume is not revenue.',
    whyBlendedMayFit:
      'Not on current evidence. A company that raised twice within eight months has shown no dilution sensitivity, which is the precondition a blended structure addresses.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure. Private credit is not assessable: the disclosed metrics measure document volume rather than revenue, and no revenue figure exists at any point in the public record.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Approximately 10 million documents are processed monthly. What is the relationship between document volume and revenue, and does pricing scale with volume or sit on a platform fee?',
      'The competitive alternative in most accounts is outsourced intake labour. What does the customer business case look like on a fully loaded basis, and how is it verified after implementation?',
      'Two rounds closed within eight months. What is the primary constraint the capital is relieving, given that provider implementation cycles do not compress with funding?',
    ],
    nextDiligenceStep:
      'Establish ARR and its relationship to processed document volume, then customer concentration. In a volume priced model serving provider organisations, a small number of large networks can dominate revenue.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Relationship between document volume and revenue',
      'Customer count and concentration',
      'Named customers in dated primary sources',
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
        'B2B healthcare enterprise software sold on annual subscription to provider operations buyers.',
        ['tn2-pr'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'Approximately 10 million documents processed monthly and two financings within eight months, against no disclosed customer count, no named customers in dated primary sources, and no revenue scale.',
        ['tn2-pr', 'tn2-fortune'],
        'company-reported',
        'Moderate',
        'Platform volume and investor quality evidence real traction. Every direct measure of customer or revenue scale is absent, which holds this at the midpoint.',
      ),
      growthQuality: rate(
        2,
        'Two rounds within eight months at a rising reported valuation, with stated growth in document volume. No revenue growth figure has been disclosed.',
        ['tn2-fortune', 'tn2-mhn'],
        'investor-reported',
        'Limited',
        'Financing pace and platform volume are directional signals rather than growth measures, and treating valuation appreciation as growth is the substitution this framework exists to prevent.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Annual subscription model priced on volume is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['tn2-pr'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Volume pricing without disclosed commitments prevents more.',
      ),
      customerDurability: rate(
        4,
        'Intake automation embeds into the referral workflow that determines provider revenue, and unwinding it returns manual volume to a team that has been resized around the software.',
        ['tn2-pr'],
        'analyst-judgment',
        'Moderate',
        'Strong operational switching cost once implemented. Held below 5 because no customer count or concentration data exists and provider procurement remains price sensitive.',
      ),
      marketAttractiveness: rate(
        4,
        'Referral leakage is a direct revenue problem for provider organisations, and the incumbent alternative is manual labour whose cost rises rather than falls.',
        ['tn2-pr'],
        'analyst-judgment',
        'Moderate',
        'A measurable financial driver rather than an efficiency claim. Held below 5 because provider margin pressure makes every purchase contested and electronic health record vendors sit adjacent.',
      ),
      capitalEfficiency: rate(
        1,
        'At least USD 138 million raised across two recent rounds with no disclosed revenue at any point against which to read it.',
        ['tn2-fortune'],
        'analyst-judgment',
        'Limited',
        'Substantial capital raised quickly with no revenue denominator available. Rated 1 to reflect absent evidence rather than to assert inefficiency.',
      ),
      capitalNeedTiming: rate(
        3,
        'Fourteen months since the last disclosed round, following two financings within eight months.',
        ['tn2-fortune'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time creates a plausible window, but the recent financing pace suggests the company is well capitalised.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and all three co-founders are publicly identified. The chief executive is quoted directly in company and press announcements.',
        ['tn2-pr', 'tn2-fortune'],
        'company-reported',
        'Moderate',
        'Founder chief executive access is favourable. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Measurable customer business case against manual labour',
          'Rapid platform volume growth',
          'Demonstrated access to tier one institutional capital',
          'Expansion path into adjacent revenue cycle workflows',
        ],
        conditions:
          'Subject to establishing revenue scale and its relationship to document volume, and to a view on a reported USD 605 million valuation with no disclosed revenue.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Annual subscription contract model with high operational switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed, and document volume bears no established relationship to revenue.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: ['No blended requirement is visible in the public record'],
        conditions:
          'Subject to the same evidence the debt assessment requires. A company that raised twice within eight months has not signalled the dilution sensitivity that blended structures address.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'Where the competitive alternative is outsourced labour rather than another vendor, the customer business case is measurable after implementation, and quantifying that relationship is what turns a volume metric into a financeable revenue base.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Trey Holterman, co-founder and Chief Executive Officer',
          subject: 'Tennr intake economics against outsourced processing',
          body: `Trey,

I have been researching healthcare software where the incumbent is a process rather than a product, and referral intake is the clearest example of that I have found.

What interests me about Tennr is that the alternative in most accounts is offshore manual processing, which means the business case is arithmetic rather than narrative. That is rare in provider software and it usually shows up in how quickly implementations pay back.

I would be interested in learning how that comparison holds after go live, and whether the volume you process translates into revenue proportionally or through a platform fee.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'tn2-pr',
        'PR Newswire',
        'Healthcare referrals are where patients get lost. Tennr raises USD 101M',
        'https://www.prnewswire.com/news-releases/healthcare-referrals-are-where-patients-get-lost-tennr-raises-101m-to-bring-the-visibility-our-system-desperately-needs-302485255.html',
        '2025-06-18',
        'primary',
        true,
      ),
      src(
        'tn2-site',
        'Tennr',
        'Tennr product and platform documentation',
        'https://www.tennr.com',
        '2026-08-06',
        'primary',
      ),
      src(
        'tn2-fortune',
        'Fortune',
        'Health tech startup Tennr raises USD 101 million Series C at USD 605 million valuation',
        'https://fortune.com/2025/06/18/tennr-health-tech-ai-patient-referral-ivp-a16z-lightspeed-iconiq-series-c/',
        '2025-06-18',
        'corroborating',
      ),
      src(
        'tn2-mhn',
        'MobiHealthNews',
        'Tennr raises USD 101M to automate referrals, hits USD 605M valuation',
        'https://www.mobihealthnews.com/news/tennr-raises-101m-automate-referrals-hits-605m-valuation',
        '2025-06-18',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Tennr remains privately held and independently operating. Its most recent disclosed financing in June 2025 was a private Series C round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['tn2-pr', 'tn2-fortune'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'sardine',
    name: 'Sardine',
    website: 'https://www.sardine.ai',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2020,
    founders: ['Soups Ranjan', 'Aditya Goel', 'Zahid Shaikh'],
    ceo: 'Soups Ranjan, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Financial technology infrastructure',
    subsector: 'Fraud, compliance, and risk decisioning',
    productDescription:
      'Sardine operates a risk platform combining device intelligence and behavioural biometrics with fraud, anti money laundering, and credit decisioning workflows. The device signal layer is the differentiator: the company profiles how a session behaves rather than only what the data says, and sells that signal into fraud, compliance, and underwriting decisions.',
    targetCustomer:
      'Risk, fraud, and compliance leaders at banks, payment companies, and financial technology platforms, particularly those facing real time payment fraud exposure.',
    businessModel:
      'Annual enterprise subscription with usage based pricing on transactions and identity checks screened, sold direct to financial institutions.',

    financingStage: 'Series C',
    latestFinancing: 'USD 70 million Series C led by Activant Capital',
    financingDate: '2025-02-11',
    totalDisclosedFunding: 'Approximately USD 145 million across disclosed rounds',
    investors: [
      'Activant Capital',
      'Andreessen Horowitz',
      'Nyca Partners',
      'GV',
      'Geodesic Capital',
      'Cross Creek Capital',
      'Moody’s Analytics',
      'Experian Ventures',
      'NAventures',
    ],

    customerEvidence: claim(
      'Company sources state the platform has profiled more than 2.2 billion devices and that the customer base nearly doubled during 2024. Strategic investment from Moody’s Analytics and Experian Ventures indicates adjacency to established risk data providers.',
      'company-reported',
      ['sd-c', 'sd-bw'],
      true,
      '2024-12-31',
    ),
    commercialMaturitySignal: claim(
      'Six years of operation, a stated 2.2 billion devices profiled, strategic investment from two established credit and risk data institutions, and a Series C led by an institutional growth investor.',
      'company-reported',
      ['sd-c', 'sd-bw'],
      true,
      '2025-02-11',
    ),
    growthSignal: claim(
      'Company announcement dated 11 February 2025 states 130 percent year over year annual recurring revenue growth during 2024, with the customer base nearly doubling over the same period.',
      'company-reported',
      ['sd-c', 'sd-bw'],
      true,
      '2024-12-31',
    ),
    recurringRevenueEvidence: claim(
      'The company reports growth in annual recurring revenue terms against an enterprise subscription base with usage components. No absolute ARR figure has been disclosed.',
      'company-reported',
      ['sd-c'],
      true,
      '2025-02-11',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No absolute annual recurring revenue figure has been disclosed. A 130 percent year over year ARR growth rate is disclosed for 2024, which bounds the trajectory without fixing the base.',
      'company-reported',
      ['sd-c', 'sd-bw'],
      true,
      '2024-12-31',
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Sift, Forter, Unit21, Alloy, and the internal risk engines of large banks, alongside the incumbent bureau and identity vendors. Strategic investment from Moody’s Analytics and Experian Ventures places it adjacent to rather than directly against those data providers.',
    mainCommercialRisk:
      'Financial institutions build risk decisioning internally more often than they build most software, and the buying centre is conservative, extending sales cycles and raising proof requirements.',
    mainFinancialRisk:
      'Growth is disclosed as a percentage with no revenue base, so absolute scale is unknown. Usage components in pricing also mean revenue tracks customer transaction volume rather than contracted minimums.',
    mainTechnologyRisk:
      'Behavioural and device signals degrade as fraud techniques adapt, so model performance is a continuous operating commitment rather than a delivered capability.',

    originalSourcingSignal:
      'Financing announcement dated 11 February 2025 disclosing a USD 70 million Series C led by Activant Capital, alongside a stated 130 percent year over year ARR growth for 2024 and strategic participation from Moody’s Analytics and Experian Ventures.',
    discoveryChannel: 'Strategic partnership',
    signalDate: '2025-02-11',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Two established credit and risk data institutions invested in the same round. Strategic money from incumbents in the exact data category a company competes near is a specific signal, because those investors underwrite the data asset rather than the growth story.',
    whyMayNeedGrowthCapital:
      'Eighteen months since the last disclosed round, with a financial institution sales motion that carries long procurement cycles and proof of concept costs ahead of contracted revenue.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity for bank and financial institution procurement',
      'Model and device intelligence investment as fraud techniques adapt',
      'Expansion from fraud into credit underwriting decisioning',
      'Compliance certification for regulated financial institution buyers',
    ],

    whyEquityMayFit:
      'Long financial institution sales cycles with proof of concept costs ahead of revenue require patient capital rather than fixed repayment.',
    whyDebtMayFit:
      'Disclosed ARR growth of 130 percent against an enterprise subscription base is a meaningful starting condition, and the usage component plus the absent revenue base mean no facility could currently be sized.',
    whyBlendedMayFit:
      'If the revenue base supports it, the disclosed growth rate and strategic investor validation would read well to a lender. This is conditional on a figure that has not been published.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is potentially suitable, subject to confirming absolute ARR scale, the contracted against usage revenue split, gross margin, net and gross retention, burn, and debt service capacity. The company discloses a growth rate but not the base, so sizing is impossible from public information.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'ARR growth of 130 percent is disclosed for 2024 but the base is not. What is absolute ARR, and what share sits on committed contracts against transaction based usage?',
      'Moody’s Analytics and Experian Ventures both invested. Are those relationships commercial as well as financial, and do they create distribution or channel conflict?',
      'Financial institutions frequently build risk decisioning internally. What is the win rate against internal build, and what does the displacement case rest on?',
    ],
    nextDiligenceStep:
      'Establish absolute ARR and the committed against usage revenue split. In a usage priced model selling to financial institutions, contracted minimums determine whether the disclosed growth is financeable.',
    missingInformation: [
      'Absolute annual recurring revenue',
      'Committed against usage based revenue split',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer count and concentration',
      'Nature of the strategic investor relationships',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        4,
        'B2B enterprise risk software sold on subscription with usage components to financial institution buyers.',
        ['sd-c'],
        'company-reported',
        'High',
        'Clearly enterprise software by buyer and product. Held below 5 because usage based transaction pricing sits partly outside a pure recurring software mandate.',
      ),
      commercialMaturity: rate(
        4,
        'A stated 2.2 billion devices profiled, a customer base that nearly doubled in 2024, and strategic investment from Moody’s Analytics and Experian Ventures.',
        ['sd-c', 'sd-bw'],
        'company-reported',
        'Moderate',
        'Strategic investment from established risk data institutions is meaningful third party validation of the underlying data asset. No disclosed customer count or revenue scale prevents a 5.',
      ),
      growthQuality: rate(
        3,
        'A disclosed 130 percent year over year ARR growth rate for 2024, published alongside a statement that the customer base nearly doubled.',
        ['sd-c', 'sd-bw'],
        'company-reported',
        'Moderate',
        'Two growth measures disclosed for a specific year is solid. Held at 3 because there is no absolute base, no prior year comparison, and the figure is now eighteen months old.',
      ),
      recurringRevenueQuality: rate(
        3,
        'The company reports in ARR terms and discloses an ARR growth rate against an enterprise subscription base. No absolute figure and no retention measure is published.',
        ['sd-c'],
        'company-reported',
        'Moderate',
        'Reporting in ARR terms with a disclosed growth rate is more than a bare subscription claim. The absent base, absent retention, and usage components prevent a 4.',
      ),
      customerDurability: rate(
        4,
        'Risk decisioning embeds into transaction authorisation paths and compliance procedures that are examined by regulators, which makes replacement a governance exercise rather than a procurement one.',
        ['sd-c'],
        'analyst-judgment',
        'Moderate',
        'High regulatory and operational switching cost. Held below 5 because no concentration data exists and internal build remains a live alternative at large institutions.',
      ),
      marketAttractiveness: rate(
        4,
        'Real time payment rails have expanded fraud exposure faster than institutions have adapted, and anti money laundering obligations make part of the spend non discretionary.',
        ['sd-c'],
        'analyst-judgment',
        'Moderate',
        'A regulatory and structural driver operating together. Held below 5 because the category is crowded and large institutions retain strong internal capability.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 145 million of disclosed funding with no absolute revenue figure against which to assess it.',
        ['sd-c'],
        'analyst-judgment',
        'Limited',
        'Capital raised is moderate for the category, bounding potential inefficiency, but there is no denominator.',
      ),
      capitalNeedTiming: rate(
        4,
        'Eighteen months since the last disclosed round, with a financial institution sales motion that carries proof of concept costs ahead of contracted revenue.',
        ['sd-c'],
        'analyst-judgment',
        'Moderate',
        'Elapsed time combined with a cost heavy enterprise motion makes a live requirement more likely than at recently financed peers.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive, authors the company financing announcement under his own name, and all three co-founders are publicly identified.',
        ['sd-c'],
        'company-reported',
        'Moderate',
        'Founder chief executive who writes publicly, which supports an informed approach. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Disclosed 130 percent ARR growth for 2024',
          'Strategic validation from two established risk data institutions',
          'Regulatory and real time payment fraud tailwinds',
          'Expansion path from fraud into credit decisioning',
        ],
        conditions:
          'Subject to establishing absolute revenue scale and the durability of the disclosed growth rate eighteen months on.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 2,
        drivers: [
          'Disclosed ARR growth against an enterprise subscription base',
          'High regulatory switching cost supporting revenue durability',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming absolute ARR scale, the committed against usage revenue split, gross margin, net and gross retention, burn, and debt service capacity. The company discloses a growth rate but not the base, so no facility could be sized from public information.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined enterprise expansion requirement',
          'Valuation not publicly reset since early 2025',
        ],
        conditions:
          'Subject to confirming absolute ARR and debt service capacity. The blended rating tracks the debt component.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A disclosed growth rate without a disclosed base is the most common gap in private credit conversations, and closing it is usually the difference between a facility being available and being theoretical.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Soups Ranjan, co-founder and Chief Executive Officer',
          subject: 'Sardine device signal asset and the strategic investor relationships',
          body: `Soups,

I have been researching risk decisioning companies and which have built a proprietary data asset rather than a workflow around someone else's data, and the device intelligence layer at Sardine is what makes it distinct.

The detail that stood out from the Series C was who invested. Moody's Analytics and Experian Ventures both taking positions suggests they are underwriting the signal itself rather than the growth story, which is a different kind of validation than a typical round.

I would be interested in learning whether those relationships are commercial as well as financial, and how the device layer holds its edge as fraud techniques adapt.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'sd-c',
        'Sardine',
        'Sardine USD 70M Funding: Innovating Financial Fraud Protection',
        'https://www.sardine.ai/blog/series-c-announcement',
        '2025-02-11',
        'primary',
      ),
      src(
        'sd-bw',
        'Business Wire',
        'Sardine AI Raises USD 70M to Make Fraud and Compliance Teams More Productive',
        'https://www.businesswire.com/news/home/20250211169372/en/Sardine-AI-Raises-$70M-to-Make-Fraud-and-Compliance-Teams-More-Productive',
        '2025-02-11',
        'corroborating',
        true,
      ),
      src(
        'sd-finextra',
        'Finextra',
        'Sardine raises USD 70m for AI fraud platform',
        'https://www.finextra.com/newsarticle/45484/sardine-raises-70m-for-ai-fraud-platform',
        '2025-02-11',
        'corroborating',
      ),
      src(
        'sd-contrary',
        'Contrary Research',
        'Sardine business breakdown and founding story',
        'https://research.contrary.com/company/sardine',
        '2025-06-01',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Sardine remains privately held and independently operating. The company continues to publish product and research content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['sd-c', 'sd-finextra'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'ashby',
    name: 'Ashby',
    website: 'https://www.ashbyhq.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2018,
    founders: ['Benjamin Encz', 'Abhik Pramanik'],
    ceo: 'Benjamin Encz, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Vertical SaaS',
    subsector: 'Recruiting operations and applicant tracking',
    productDescription:
      'Ashby combines applicant tracking, candidate relationship management, interview scheduling, and pipeline analytics in one system rather than as separate tools stitched together. Analytics is the wedge: the product was built so that recruiting teams can measure conversion at each stage without exporting data.',
    targetCustomer:
      'Talent and recruiting operations leaders at high growth software companies and mid market organisations replacing a legacy applicant tracking system plus several point tools.',
    businessModel:
      'Annual subscription priced per employee or per recruiting seat, expanding as customer headcount grows.',

    financingStage: 'Series D',
    latestFinancing: 'USD 50 million Series D led by Alkeon Capital with Lachy Groom co-leading',
    financingDate: '2025-07-23',
    totalDisclosedFunding: 'Approximately USD 100 million across disclosed rounds',
    investors: [
      'Alkeon Capital',
      'Lachy Groom',
      'F-Prime Capital',
      'Elad Gil',
      'Y Combinator',
      'Gaingels',
    ],

    customerEvidence: claim(
      'Company sources name Ramp, OpenAI, Notion, Cursor, Shopify, and Snowflake as customers, and state the customer base more than doubled over the year to July 2025.',
      'company-reported',
      ['ab-d', 'ab-cb'],
      true,
      '2025-07-23',
    ),
    commercialMaturitySignal: claim(
      'Eight years of operation, named adoption by Shopify, Snowflake, OpenAI, and Ramp, a customer base that more than doubled in a year, and a Series D led by an institutional growth investor.',
      'company-reported',
      ['ab-d', 'ab-cb'],
      true,
      '2025-07-23',
    ),
    growthSignal: claim(
      'Company sources state annual recurring revenue increased 135 percent and the customer base more than doubled over the year to July 2025.',
      'company-reported',
      ['ab-d', 'ab-cb'],
      true,
      '2025-07-23',
    ),
    recurringRevenueEvidence: claim(
      'The company reports in annual recurring revenue terms and discloses an ARR growth rate against a per seat annual subscription base. No absolute ARR figure has been disclosed.',
      'company-reported',
      ['ab-d'],
      true,
      '2025-07-23',
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No absolute annual recurring revenue figure has been disclosed. A 135 percent ARR growth rate is disclosed for the year to July 2025, which bounds the trajectory without fixing the base.',
      'company-reported',
      ['ab-d', 'ab-cb'],
      true,
      '2025-07-23',
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Greenhouse and Lever in the mid market, Workday Recruiting at enterprise scale, and Rippling as it bundles recruiting into a broader suite. Ashby differentiates on analytics depth and on consolidating point tools.',
    mainCommercialRisk:
      'Recruiting software spend is directly procyclical with hiring. A slowdown in customer headcount growth reduces both seat expansion and new logo demand at the same time.',
    mainFinancialRisk:
      'Growth is disclosed as a percentage with no revenue base, so absolute scale is unknown. Per seat pricing tied to recruiting headcount is among the more cyclical revenue profiles in enterprise software.',
    mainTechnologyRisk:
      'Consolidating applicant tracking, scheduling, and analytics means competing with specialists in each, and the analytics advantage narrows as competitors close the gap.',

    originalSourcingSignal:
      'Financing announcement dated 23 July 2025 disclosing a USD 50 million Series D led by Alkeon Capital, alongside a stated 135 percent ARR increase and a customer base that more than doubled over the prior year.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-07-23',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Disclosing a specific ARR growth rate alongside a customer count movement is unusual at Series D, and the named customer list spans both fast growing AI companies and established enterprises, which suggests the product is not confined to one buying cohort.',
    whyMayNeedGrowthCapital:
      'Twelve months since the last disclosed round, in a category where the incumbent competitors are well capitalised and where moving upmarket into enterprise requires a different sales motion from the current base.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity to move above the current mid market base',
      'Product investment in AI assisted sourcing and screening',
      'International expansion beyond the United States base',
      'Consolidation of adjacent recruiting point tools',
    ],

    whyEquityMayFit:
      'Moving upmarket while defending a mid market base is a two front investment that suits patient primary equity.',
    whyDebtMayFit:
      'A disclosed ARR growth rate against a subscription base is a real starting condition, but per seat pricing tied to customer hiring is a cyclical revenue profile that lenders discount, and no revenue base has been disclosed.',
    whyBlendedMayFit:
      'If the revenue base supports it, part debt funding would preserve ownership at a valuation set in mid 2025. The cyclicality of the revenue model would need to be reflected in sizing.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is potentially suitable, subject to confirming absolute ARR scale, gross margin, net and gross retention, burn, and debt service capacity, with particular attention to how the base behaved through the 2023 hiring contraction.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'ARR grew 135 percent over the year to July 2025 but the base is not disclosed. What is absolute ARR, and how much of that growth came from seat expansion within existing customers?',
      'Pricing is tied to customer headcount. How did the installed base behave through the 2023 and 2024 hiring slowdown, and what does that imply about downside revenue?',
      'The customer list spans fast growing AI companies and established enterprises. Do those cohorts differ materially on retention and expansion?',
    ],
    nextDiligenceStep:
      'Establish absolute ARR and net revenue retention through the 2023 to 2024 hiring contraction. For a headcount linked revenue model, behaviour in a downturn is more informative than the current growth rate.',
    missingInformation: [
      'Absolute annual recurring revenue',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer count and concentration',
      'Behaviour of the base through the 2023 hiring contraction',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B vertical enterprise software sold on annual per seat subscription to talent and recruiting operations buyers.',
        ['ab-d'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'Named adoption by Shopify, Snowflake, OpenAI, Ramp, Notion, and Cursor, with a customer base that more than doubled over the year to July 2025.',
        ['ab-d', 'ab-cb'],
        'company-reported',
        'Moderate',
        'The named logo list spans both enterprise and high growth cohorts, which is stronger evidence than either alone. No disclosed revenue scale or customer count prevents a 5.',
      ),
      growthQuality: rate(
        3,
        'A disclosed 135 percent ARR increase over the year to July 2025, published alongside a statement that the customer base more than doubled.',
        ['ab-d', 'ab-cb'],
        'company-reported',
        'Moderate',
        'Two growth measures for a defined period is solid disclosure. Held at 3 because there is no absolute base, no multi period series, and the figure is a year old.',
      ),
      recurringRevenueQuality: rate(
        3,
        'The company reports in ARR terms with a disclosed growth rate against a per seat annual subscription base. No absolute figure and no retention measure is published.',
        ['ab-d'],
        'company-reported',
        'Moderate',
        'ARR framing with a disclosed rate lifts this above a bare subscription claim. The absent base and absent retention prevent a 4.',
      ),
      customerDurability: rate(
        3,
        'Applicant tracking systems hold candidate history and hiring records and are replaced infrequently, but the category sees more displacement than infrastructure software and pricing is tied to customer headcount.',
        ['ab-d'],
        'analyst-judgment',
        'Moderate',
        'Real switching cost offset by a cyclical revenue base and by a category where replacement projects are routine rather than exceptional.',
      ),
      marketAttractiveness: rate(
        3,
        'Recruiting software is a large established category, and demand moves directly with hiring volume rather than with a structural driver.',
        ['ab-d'],
        'analyst-judgment',
        'Moderate',
        'Sizeable market undermined by procyclicality. Spend contracts precisely when a lender would most want stability.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 100 million of disclosed funding across eight years, modest relative to the benchmark set, with no absolute revenue figure against which to read it.',
        ['ab-d'],
        'analyst-judgment',
        'Limited',
        'Low absolute capital consumption over a long period is genuinely suggestive of discipline, which lifts this above peers with larger raises and no disclosure. No denominator prevents more.',
      ),
      capitalNeedTiming: rate(
        3,
        'Twelve months since the last disclosed round, with an upmarket transition underway against well capitalised incumbents.',
        ['ab-d'],
        'analyst-judgment',
        'Moderate',
        'A credible investment programme with a recent round behind it, which is the definition of a middling rating on this factor.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and is quoted directly on strategy in financing coverage, with both co-founders publicly identified.',
        ['ab-d', 'ab-cb'],
        'company-reported',
        'Moderate',
        'Founder chief executive access is favourable. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Disclosed 135 percent ARR growth',
          'Named customers across enterprise and high growth cohorts',
          'Upmarket transition requiring go to market investment',
          'Modest historical capital consumption',
        ],
        conditions:
          'Subject to establishing absolute revenue scale and how the base behaved through the last hiring contraction.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 2,
        drivers: [
          'Disclosed ARR growth against a subscription contract base',
          'Long operating history with modest capital raised',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming absolute ARR scale, gross margin, net and gross retention, burn, and debt service capacity. Per seat pricing tied to customer hiring is among the more cyclical revenue profiles in enterprise software, so downside behaviour would need specific attention before any facility.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Defined upmarket expansion requirement',
          'Valuation set in mid 2025 that shareholders may prefer to preserve',
        ],
        conditions:
          'Subject to confirming absolute ARR and downside revenue behaviour. The blended rating tracks the debt component, which is constrained by revenue cyclicality rather than only by disclosure.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'For a revenue model tied to customer hiring, how the installed base behaved through the last contraction says more about financeability than the current growth rate does, and it is worth being explicit about internally before it is tested externally.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Benjamin Encz, co-founder and Chief Executive Officer',
          subject: 'Ashby base behaviour through the hiring contraction',
          body: `Benji,

I have been researching recruiting software and how the analytics led products held up through a period when hiring volume fell across the customer base, and Ashby is the case I most wanted to understand.

Growing ARR 135 percent while customer headcount growth was uneven suggests the expansion is coming from consolidation of point tools rather than from seat growth alone. That is a meaningfully different revenue quality than the category usually carries.

I would be interested in learning how the installed base behaved through 2023 and 2024, since that period is the most informative test this model has had.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'ab-d',
        'The SaaS News',
        'Ashby Raises USD 50 Million in Series D',
        'https://www.thesaasnews.com/news/ashby-raises-50-million-in-series-d/',
        '2025-07-23',
        'primary',
      ),
      src(
        'ab-site',
        'Ashby',
        'Ashby product and platform documentation',
        'https://www.ashbyhq.com',
        '2026-08-06',
        'primary',
      ),
      src(
        'ab-cb',
        'Crunchbase News',
        'AI powered HR platform Ashby raises USD 50M',
        'https://news.crunchbase.com/venture/ai-powered-hr-platform-ashby-raise/',
        '2025-07-23',
        'corroborating',
      ),
      src(
        'ab-ab',
        'American Bazaar',
        'AI hiring platform Ashby secures USD 50 million to streamline recruitment',
        'https://americanbazaaronline.com/2025/07/23/ai-hiring-platform-ashby-secures-50-million-to-streamline-recruitment-465454/',
        '2025-07-23',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Ashby remains privately held and independently operating. Its most recent disclosed financing in July 2025 was a private Series D round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['ab-d', 'ab-cb'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'tailscale',
    name: 'Tailscale',
    website: 'https://tailscale.com',
    headquarters: 'Toronto, Ontario, Canada, operating remote first',
    foundedYear: 2019,
    founders: ['Avery Pennarun', 'David Crawshaw', 'David Carney'],
    ceo: 'Avery Pennarun, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Enterprise infrastructure software',
    subsector: 'Zero trust network connectivity',
    productDescription:
      'Tailscale builds a mesh network layer on the open source WireGuard protocol that connects devices, servers, and services directly to each other regardless of where they sit. It replaces the traditional corporate virtual private network concentrator with peer to peer connections and identity based access control.',
    targetCustomer:
      'Platform engineering, security, and infrastructure teams at software companies and enterprises with distributed workloads, plus a large individual developer base that seeds organisational adoption.',
    businessModel:
      'Per user subscription with a free personal tier, an open source client, and enterprise tiers adding access control, audit, and compliance features. Bottom up adoption converts into organisational contracts.',

    financingStage: 'Series C',
    latestFinancing:
      'USD 160 million Series C led by Accel, being approximately CAD 230 million, in an all equity round',
    financingDate: '2025-04-08',
    totalDisclosedFunding: 'Approximately USD 275 million reported across four disclosed rounds',
    investors: [
      'Accel',
      'CRV',
      'Insight Partners',
      'Heavybit',
      'Uncork Capital',
      'George Kurtz',
      'Anthony Casalena',
    ],

    customerEvidence: claim(
      'Company announcement dated 8 April 2025 names Instacart, Cribl, Mercury, SAP, Telus, Motorola, Duolingo, Perplexity, Mistral, Cohere, Groq, and Hugging Face as customers, and references a base of 10,000 customers.',
      'company-reported',
      ['ts-c', 'ts-pcj'],
      true,
      '2025-04-09',
    ),
    commercialMaturitySignal: claim(
      'Seven years of operation, a stated 10,000 customer base spanning enterprise and AI infrastructure companies, named adoption by SAP, Motorola, and Telus, and a Series C led by Accel.',
      'company-reported',
      ['ts-c', 'ts-betakit'],
      true,
      '2025-04-08',
    ),
    growthSignal: claim(
      'The Series C was described by press coverage as driven by surprising growth, and the round was all equity with no debt component. No quantified revenue or ARR growth figure has been disclosed by the company.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as a per user subscription with free and enterprise tiers. No ARR figure or retention measure has been published by the company.',
      'company-reported',
      ['ts-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed by the company. Aggregator sites publish revenue estimates that are not primary sourced and are not relied upon here.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: claim(
      'The Series C is explicitly described as an all equity round. No credit facility or debt instrument has been disclosed.',
      'company-reported',
      ['ts-pcj'],
      false,
    ),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Canadian headquartered with a remote first operating model and a named customer base spanning North America and Europe, including SAP and Telus.',
      'company-reported',
      ['ts-c', 'ts-betakit'],
      false,
    ),

    competitiveLandscape:
      'Competes with Cloudflare Zero Trust, Zscaler, Twingate, Netbird, and the incumbent virtual private network appliances it is designed to replace, alongside its own open source components which capable teams can self host.',
    mainCommercialRisk:
      'The open source client and generous free tier are the distribution engine and the conversion risk. Sophisticated teams can run the protocol themselves, and the coordination server is the paid element they may choose to replace.',
    mainFinancialRisk:
      'No revenue figure has ever been disclosed by the company. Approximately USD 275 million reported raised with no public revenue base means capital efficiency cannot be assessed in either direction.',
    mainTechnologyRisk:
      'The product sits in the network path of customer production traffic, so availability of the coordination layer is a hard operational requirement rather than a service quality target.',

    originalSourcingSignal:
      'Financing announcement dated 8 April 2025 disclosing a USD 160 million all equity Series C led by Accel, with a named customer list spanning SAP, Motorola, Telus, and several leading AI infrastructure companies.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-04-08',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Selling infrastructure to both SAP and a set of frontier AI companies at the same time is unusual, because those buyers have almost nothing in common procedurally. It suggests the product wins on a technical property rather than on a go to market motion, which tends to produce more durable revenue than category timing does. It scores 33 of 100 because the company discloses no financial information at all, and it stays in the set as a growth equity name only. The debt and blended assessments below are both rated 1, and that is a conclusion rather than a gap.',
    whyMayNeedGrowthCapital:
      'Sixteen months since the last disclosed round, with a stated intention to grow as a private company toward an eventual public listing, which typically requires building the reporting and enterprise infrastructure ahead of the event.',
    potentialUseOfProceeds: [
      'Enterprise sales and compliance capability for regulated buyers',
      'Product investment in access control and audit for larger organisations',
      'Conversion investment against the large free and open source user base',
      'Financial reporting infrastructure ahead of an eventual listing',
    ],

    whyEquityMayFit:
      'A bottom up infrastructure company converting an open source base into enterprise contracts needs capital for go to market rather than for survival, and the company has demonstrated repeated access to it.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. The company has never disclosed a revenue figure, and it has explicitly chosen an all equity structure at its most recent round.',
    whyBlendedMayFit:
      'Nothing in the public record suggests dilution sensitivity. The most recent round was deliberately all equity, which is the opposite signal from the one a blended structure responds to.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the demonstrated and supportable structure. Private credit is not assessable: no revenue evidence of any kind has ever been disclosed, and the company explicitly chose an all equity round most recently, which is itself informative about appetite.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'The Series C was explicitly all equity. Was non dilutive capital considered, and what drove the decision against it?',
      'The customer base spans SAP and Telus alongside frontier AI infrastructure companies. How do those cohorts differ on contract size, term length, and expansion?',
      'A large free and open source user base feeds the paid product. What is the conversion rate from individual to organisational contracts, and how has it trended?',
    ],
    nextDiligenceStep:
      'Establish ARR and the conversion economics from the free and open source base into paid organisational contracts. In an open core model, adoption metrics and revenue can diverge widely and only the latter is financeable.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Free to paid conversion rate',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Customer concentration',
      'Enterprise against individual revenue mix',
      'Series C valuation',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise infrastructure software sold on per user subscription to platform engineering and security buyers.',
        ['ts-c'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'A stated 10,000 customer base with named adoption by SAP, Motorola, Telus, Instacart, and several leading AI infrastructure companies.',
        ['ts-c', 'ts-pcj'],
        'company-reported',
        'Moderate',
        'The named logo breadth across traditional enterprise and frontier AI companies is strong evidence of a product that sells across buying cultures. No disclosed revenue scale prevents a 5.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed by the company at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. Press characterisations of surprising growth are not a growth disclosure.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Per user subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['ts-c'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it, and the free tier means user counts are not revenue.',
      ),
      customerDurability: rate(
        4,
        'Network connectivity embeds into production infrastructure and access policy, and replacing it requires re establishing connectivity for every device and service.',
        ['ts-c'],
        'analyst-judgment',
        'Moderate',
        'Very high technical switching cost once deployed across an estate. Held below 5 because the open source components allow a sophisticated customer to self host the parts it values most.',
      ),
      marketAttractiveness: rate(
        4,
        'Zero trust network access is replacing perimeter virtual private networks across the enterprise, and distributed AI workloads have added a new driver of demand for direct connectivity.',
        ['ts-c'],
        'analyst-judgment',
        'Moderate',
        'A genuine architectural replacement cycle with a new workload driver. Held below 5 because the category includes very well capitalised incumbents selling into existing security budgets.',
      ),
      capitalEfficiency: rate(
        0,
        'Approximately USD 275 million reported raised with no disclosed revenue figure of any kind against which to assess it.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight. Substantial capital raised with no revenue disclosure means no efficiency judgment is possible.',
      ),
      capitalNeedTiming: rate(
        3,
        'Sixteen months since the last disclosed round, with a stated intention to grow as a private company toward an eventual listing.',
        ['ts-c', 'ts-betakit'],
        'analyst-judgment',
        'Moderate',
        'The elapsed time and the stated listing ambition create a plausible window, though a USD 160 million round provides substantial runway.',
      ),
      outreachPotential: rate(
        5,
        'Founder chief executive who authors the company financing announcements personally and publishes extensively and technically under his own name, with all three co-founders publicly identified.',
        ['ts-c'],
        'company-reported',
        'High',
        'Exceptional founder visibility with a long public writing record on exactly the architectural questions a capital conversation would engage.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Named customer breadth across enterprise and frontier AI companies',
          'Architectural replacement cycle in zero trust access',
          'Demonstrated repeated access to institutional capital',
          'Stated intention to build toward an eventual public listing',
        ],
        conditions:
          'Subject to establishing revenue scale and free to paid conversion economics, neither of which is public.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Per user subscription contract model with high switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No revenue figure has ever been disclosed, and the company explicitly structured its most recent round as all equity, which indicates limited appetite independently of the evidence gap.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: ['No blended requirement is visible in the public record'],
        conditions:
          'Subject to the same evidence the debt assessment requires. An explicitly all equity most recent round is the opposite of the dilution sensitivity a blended structure addresses.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company that has deliberately raised all equity has usually made that choice for a reason worth understanding, and the answer often reveals more about how it thinks about capital than a financing need would.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Avery Pennarun, co-founder and Chief Executive Officer',
          subject: 'Tailscale customer cohorts and the all equity Series C',
          body: `Avery,

I have been researching infrastructure companies that sell successfully into both traditional enterprises and frontier AI companies, which is a combination almost nobody manages, and Tailscale is the clearest example.

SAP and Telus alongside Mistral, Cohere, and Groq is an unusual customer list, because those organisations buy in completely different ways. It suggests the product is winning on a technical property rather than on a sales motion.

I also noticed the Series C was explicitly all equity. I would be interested in learning what drove that, and how the two customer cohorts compare on contract structure and expansion.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'ts-c',
        'Tailscale',
        'Tailscale raises USD 160 Million Series C to build the New Internet',
        'https://tailscale.com/blog/series-c',
        '2025-04-08',
        'primary',
      ),
      src(
        'ts-site',
        'Tailscale',
        'Tailscale product and platform documentation',
        'https://tailscale.com',
        '2026-08-06',
        'primary',
      ),
      src(
        'ts-betakit',
        'BetaKit',
        'Corporate VPN startup Tailscale secures USD 230 million CAD Series C on back of surprising growth',
        'https://betakit.com/corporate-vpn-startup-tailscale-secures-230-million-cad-series-c-on-back-of-surprising-growth/',
        '2025-04-08',
        'corroborating',
      ),
      src(
        'ts-pcj',
        'Private Capital Journal',
        'Tailscale secures US USD 160M Series C',
        'https://privatecapitaljournal.com/tailscale-secures-us-160m-series-c/',
        '2025-04-09',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Tailscale remains privately held and independently operating. The company has stated its intention to grow as a private company, its most recent disclosed financing in April 2025 was a private Series C round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['ts-c', 'ts-betakit'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'threeflow',
    name: 'ThreeFlow',
    website: 'https://www.threeflow.com',
    headquarters: 'Chicago, Illinois, United States',
    foundedYear: 2015,
    founders: ['Ryan Sachtjen', 'Richard Perrott', 'Shaheeb Roshan'],
    ceo: 'Ryan Sachtjen, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Vertical SaaS',
    subsector: 'Employee benefits placement',
    productDescription:
      'ThreeFlow is a benefits placement system connecting the brokers who advise employers with the carriers who underwrite employee benefits. Both sides work in the same system through the request for proposal, quoting, and renewal cycle, replacing a process that otherwise runs on spreadsheets and email between two parties who do not share software.',
    targetCustomer:
      'Employee benefits brokerages and the insurance carriers that quote to them, in a market where the same placement transaction must be visible to both sides.',
    businessModel:
      'Annual subscription sold to both sides of the placement market, with carriers and brokers on separate contracts, which produces a two sided network that strengthens as either side grows.',

    financingStage: 'Series C',
    latestFinancing: 'USD 30 million Series C led by Emergence Capital',
    financingDate: '2023-12-01',
    totalDisclosedFunding: 'Approximately USD 83 million across three disclosed rounds',
    investors: [
      'Emergence Capital',
      'Accel',
      'Equal Ventures',
      'First Trust Capital Partners',
      '9Yards Capital',
    ],

    customerEvidence: claim(
      'ThreeFlow publishes customer and partner material describing adoption by benefits brokerages and carriers. No customer count or named customer list appears in dated primary financing announcements reviewed.',
      'company-reported',
      ['tf-site', 'tf-2023'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Eleven years of operation, three disclosed financing rounds, a Series C led by an institutional vertical software investor, and a two sided market position spanning both brokers and carriers.',
      'investor-reported',
      ['tf-cb', 'tf-2023'],
      false,
    ),
    growthSignal: claim(
      'The company publishes annual reflections on its growth, and the Series C was led by an investor specialising in vertical software. No quantified revenue, ARR, or customer growth figure has been disclosed.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual subscription to both brokers and carriers. No ARR figure or retention measure has been published.',
      'company-reported',
      ['tf-site'],
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
    capitalEfficiencyEvidence: claim(
      'Approximately USD 83 million raised across eleven years is modest for a company of this age, and the last round was led by a growth investor that typically underwrites existing revenue. Neither observation substitutes for a disclosed revenue figure.',
      'analyst-judgment',
      ['tf-cb'],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with legacy benefits administration platforms, broker management systems, and the spreadsheet and email process that still handles most placement activity. The two sided position is the barrier: a competitor must win both brokers and carriers to be useful to either.',
    mainCommercialRisk:
      'Two sided markets are slow to build and slow to displace. Growth depends on carrier adoption keeping pace with broker adoption, and neither side alone creates value.',
    mainFinancialRisk:
      'No revenue figure of any kind has been disclosed and the last financing is nearly three years old. Nothing public establishes current scale, growth, or capital position.',
    mainTechnologyRisk:
      'Integrating with carrier underwriting systems and broker management systems means maintaining connections to counterparties who control their own roadmaps and change them without coordination.',

    originalSourcingSignal:
      'Company retrospective published 15 January 2024 reviewing growth through 2023, following a USD 30 million Series C led by Emergence Capital in December 2023 with participation from Accel, Equal Ventures, First Trust Capital Partners, and new strategic growth investor 9Yards Capital.',
    discoveryChannel: 'Industry research',
    signalDate: '2024-01-15',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'A two sided network in an insurance workflow that neither carriers nor brokers can build alone is a structurally defensible position that rarely appears in growth software screens. It entered the pipeline as a deliberate search for that shape rather than for a growth rate. It scores 25 of 100 and stays in the set because the score measures how much a company has published, and ThreeFlow has published almost nothing. The financing gap and the network structure are the origination case, and neither of them is a disclosure.',
    whyMayNeedGrowthCapital:
      'Nearly three years since the last disclosed round, which is the longest financing gap in the emerging set. For a company that had raised roughly every two years, that gap is itself the question worth asking.',
    potentialUseOfProceeds: [
      'Carrier side adoption to deepen the two sided network',
      'Product expansion from placement into renewal and servicing workflows',
      'Integration engineering across carrier underwriting systems',
      'Runway extension if growth has moderated since the last round',
    ],

    whyEquityMayFit:
      'Building the second side of a two sided market is a long investment with delayed payback that suits patient capital.',
    whyDebtMayFit:
      'It cannot be assessed on the public record. No ARR, retention, margin, or cash flow figure has been disclosed at any point in eleven years of operation.',
    whyBlendedMayFit:
      'If the company is closer to breakeven than its stage implies, a modest facility could extend runway without resetting a valuation set in 2023. This is speculation about a company that has not disclosed, and is labelled as such.',
    preliminaryCapitalView:
      'Analyst judgment. No structure can be recommended on the current public record. The correct next action is establishing current scale and growth rather than selecting an instrument. This record is retained because the network position is genuinely differentiated even though the financial evidence is absent.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'The last disclosed round was December 2023, which is the longest gap in this set. Has the business been self funding since then?',
      'The model requires both brokers and carriers. What is the current balance between the two sides, and which one is the constraint on growth today?',
      'Placement is a seasonal process tied to renewal cycles. How does that seasonality affect revenue recognition and cash collection through the year?',
    ],
    nextDiligenceStep:
      'Establish current ARR, growth, and the balance of adoption between brokers and carriers. In a two sided network the ratio between the sides determines the value of the whole, and none of it is public.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Any financing event after December 2023',
      'Broker against carrier revenue split',
      'Customer count on either side of the network',
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
        'B2B vertical enterprise software sold on annual subscription to insurance brokers and carriers.',
        ['tf-site'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'Eleven years of operation with three disclosed rounds and a Series C led by a specialist vertical software investor, against no disclosed customer count, named customers, or revenue scale.',
        ['tf-cb', 'tf-2023'],
        'investor-reported',
        'Limited',
        'Longevity and investor quality are the only maturity evidence available. Every direct measure this factor asks for is absent.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Annual subscription model on both sides of the network is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['tf-site'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        5,
        'A two sided placement network becomes the shared record between brokers and carriers, so leaving requires the counterparty to leave as well. That is the highest structural switching cost available to enterprise software.',
        ['tf-site'],
        'analyst-judgment',
        'Moderate',
        'Network effects across counterparties who must transact with each other produce durability that single sided software cannot match, and it is the specific reason this company is in the universe.',
      ),
      marketAttractiveness: rate(
        3,
        'Employee benefits placement is a large and non discretionary annual process, but the software budget is small relative to the premium flowing through it and the buying side is fragmented.',
        ['tf-site'],
        'analyst-judgment',
        'Moderate',
        'Durable underlying process with a constrained software budget and a slow moving, fragmented buyer base.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 83 million of disclosed funding across eleven years, modest for the operating history, with a last round led by a growth equity investor.',
        ['tf-cb'],
        'analyst-judgment',
        'Limited',
        'Low capital consumption over a long period is genuinely suggestive of discipline. No revenue denominator prevents anything higher.',
      ),
      capitalNeedTiming: rate(
        4,
        'Nearly three years since the last disclosed round, the longest financing gap in the emerging set, from a company that had previously raised roughly every two years.',
        ['tf-cb'],
        'analyst-judgment',
        'Moderate',
        'A break in an established financing cadence is a specific signal, and it makes a live conversation more likely here than the absence of other news would suggest.',
      ),
      outreachPotential: rate(
        3,
        'Founder remains chief executive after eleven years and all three co-founders are publicly identified. Public commentary on strategy is limited and no finance leader is disclosed.',
        ['tf-cb'],
        'analyst-judgment',
        'Limited',
        'Founder continuity is favourable but public visibility is the lowest in the emerging set, and there is no disclosed finance counterparty.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Structurally defensible two sided network position',
          'Eleven year operating history with modest capital consumption',
          'Longest financing gap in the set, suggesting a live conversation',
        ],
        conditions:
          'Subject to establishing current revenue scale and growth, neither of which is public. The rating reflects unverifiable current performance rather than a negative view of the network position.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Annual subscription contract model with exceptional network switching cost is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. No ARR, retention, gross margin, burn, or cash balance has been disclosed at any point. Strong structural durability is not a substitute for the financial evidence a credit assessment requires.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Long operating history with modest capital raised suggests the business may be closer to breakeven than its stage implies',
          'Valuation reference point set in 2023 that shareholders may prefer not to reset',
        ],
        conditions:
          'Subject to the same evidence the debt assessment requires. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A two sided network that both counterparties depend on is among the most financeable structures in software once the revenue is visible, which makes establishing that visibility the highest value first step.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Ryan Sachtjen, co-founder and Chief Executive Officer',
          subject: 'ThreeFlow network balance between brokers and carriers',
          body: `Ryan,

I have been researching vertical software companies that sit between two counterparties rather than selling to one, and ThreeFlow is the clearest example I have found in insurance.

Placement is a process where neither the broker nor the carrier can adopt software unilaterally and get value from it, which makes the position much harder to displace than ordinary vertical software. It also makes growth harder to sequence.

I would be interested in learning which side is the constraint today, and how the seasonality of renewal cycles shows up in the shape of the year.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'tf-site',
        'ThreeFlow',
        'ThreeFlow software for benefits brokers and carriers',
        'https://www.threeflow.com/',
        '2026-08-06',
        'primary',
      ),
      src(
        'tf-2023',
        'ThreeFlow',
        'Reflecting on ThreeFlow growth in 2023',
        'https://www.threeflow.com/post/reflecting-on-threeflows-growth-in-2023',
        '2024-01-15',
        'primary',
      ),
      src(
        'tf-tc',
        'TechCrunch',
        'ThreeFlow raises USD 45 million to scale its employee benefits placement software',
        'https://techcrunch.com/2021/11/30/threeflow-raises-45-million-to-scale-its-employee-benefits-placement-software/',
        '2021-11-30',
        'corroborating',
      ),
      src(
        'tf-cb',
        'Crunchbase News',
        'Employee benefits company WatchTower becomes ThreeFlow',
        'https://news.crunchbase.com/startups/exclusive-watchtower-becomes-threeflow-raises-8m-series-a/',
        '2020-06-16',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'ThreeFlow remains privately held and independently operating. The company continues to publish product and company content under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['tf-site', 'tf-cb'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'middesk',
    name: 'Middesk',
    website: 'https://www.middesk.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2018,
    founders: ['Kyle Mack', 'Kurt Ruppel'],
    ceo: 'Kyle Mack, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Financial technology infrastructure',
    subsector: 'Business identity and know your business verification',
    productDescription:
      'Middesk verifies the identity of businesses rather than individuals: confirming that a company exists, who controls it, whether it is in good standing across state registries, and whether it can legally transact. It also automates employer registration filings with state agencies.',
    targetCustomer:
      'Risk, compliance, and onboarding teams at banks, payment companies, lenders, and business to business platforms that must complete know your business checks before transacting.',
    businessModel:
      'Usage based pricing per verification and per filing, with enterprise subscription tiers, sold to financial institutions and platforms.',

    financingStage: 'Series B',
    latestFinancing: 'USD 57 million Series B co-led by Insight Partners and Canapi Ventures',
    financingDate: '2022-06-09',
    totalDisclosedFunding: 'Approximately USD 77 million across three disclosed rounds',
    investors: ['Insight Partners', 'Canapi Ventures', 'Sequoia Capital', 'Accel', 'Gaingels'],

    customerEvidence: claim(
      'Middesk publishes customer material describing adoption by financial institutions and platforms. No customer count or named customer list appears in the dated primary financing announcement reviewed.',
      'company-reported',
      ['md-site', 'md-b'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Named to the Fast Company list of the World’s Most Innovative Companies for 2025, eight years of operation, and a Series B co-led by an institutional growth investor and a bank backed venture fund.',
      'independently-verified',
      ['md-fc', 'md-b'],
      false,
    ),
    growthSignal: claim(
      'No quantified revenue, ARR, or customer growth figure has been disclosed. The company continues to publish product expansion and industry recognition.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Revenue is usage based per verification and per filing with enterprise subscription tiers above it. That is recurring in the sense that it repeats with customer activity, and it is not contracted recurring revenue in the sense a lender underwrites.',
      'analyst-judgment',
      ['md-site'],
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
    capitalEfficiencyEvidence: claim(
      'Approximately USD 77 million raised across eight years is the lowest disclosed total in the emerging set, and the company has not raised publicly since 2022. Neither observation substitutes for a disclosed revenue figure.',
      'analyst-judgment',
      ['md-b'],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: undisclosed(),

    competitiveLandscape:
      'Competes with Dun and Bradstreet, Moody’s Analytics, LexisNexis Risk Solutions, Alloy, and Baselayer, alongside the manual registry checks that many institutions still perform. The state registry and filing coverage is the differentiator against the incumbent data vendors.',
    mainCommercialRisk:
      'The incumbent business data vendors have decades of distribution into the same compliance teams, and a large institution can decide that existing bureau coverage is sufficient rather than better.',
    mainFinancialRisk:
      'No revenue figure of any kind has been disclosed and the last financing is four years old. Usage based pricing also means revenue tracks customer onboarding volume rather than contracted minimums.',
    mainTechnologyRisk:
      'Coverage depends on maintaining current data from state registries and agencies that publish inconsistently, so the data asset requires continuous investment simply to stay accurate.',

    originalSourcingSignal:
      'Independent recognition dated March 2025 naming Middesk to the Fast Company list of the World’s Most Innovative Companies for 2025, following an extended period without a disclosed financing event.',
    discoveryChannel: 'Industry research',
    signalDate: '2025-03-18',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Four years without a disclosed round, in a category where competitors have raised repeatedly, usually means one of two things: the business is self funding or it is constrained. Both are worth establishing, and the answer determines everything about which conversation is appropriate. It scores 18 of 100, the lowest in the universe, and stays in the set for that reason rather than despite it: the score is low because four years of silence leave nothing to score, and four years of silence is precisely the condition that produces a financing conversation.',
    whyMayNeedGrowthCapital:
      'The longest financing gap of any company in this universe. A company that raised a USD 57 million Series B in 2022 and has not disclosed since has either reached sustainability or is managing a longer runway than planned.',
    potentialUseOfProceeds: [
      'Data coverage expansion across state and federal registries',
      'Enterprise sales capacity for large financial institution buyers',
      'Product expansion from verification into ongoing monitoring',
      'Runway extension if growth has not matched the 2022 plan',
    ],

    whyEquityMayFit:
      'Building registry data coverage is a long payback investment that suits patient capital, and the company has an institutional investor base already familiar with it.',
    whyDebtMayFit:
      'It does not fit well on the public record. Usage based verification revenue is not contracted recurring revenue, and no revenue figure has been disclosed at any point.',
    whyBlendedMayFit:
      'If the company is self funding, a modest facility could fund expansion without resetting a valuation set in 2022. This is conditional on evidence that does not exist publicly.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only supportable structure, and even that requires establishing current scale. Private credit against recurring revenue is a poor fit on the usage based pricing model alone, before considering the complete absence of disclosed financials.',

    outreachPriority: 'Watch',
    qualificationQuestions: [
      'The last disclosed financing was June 2022, which is the longest gap in this universe. Has the business been self funding since then, and was that a choice?',
      'Revenue is usage based per verification. What share sits on committed enterprise minimums, and how did volume behave through the 2023 to 2024 slowdown in business formation and lending?',
      'The incumbent bureaus have long standing distribution into the same compliance teams. Where does Middesk win, and is it on coverage, speed, or integration?',
    ],
    nextDiligenceStep:
      'Establish current revenue and the committed against usage split. In a per verification model, revenue tracks customer onboarding volume, and a lender would need contracted minimums before considering any facility.',
    missingInformation: [
      'Annual recurring revenue',
      'Revenue growth rate',
      'Committed against usage based revenue split',
      'Any financing event after June 2022',
      'Customer count, named customers, and concentration',
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
        4,
        'B2B financial technology infrastructure sold to risk and compliance buyers, with usage based rather than subscription economics.',
        ['md-site'],
        'company-reported',
        'Moderate',
        'Clearly enterprise software by buyer and product. Held below 5 because per verification pricing sits partly outside a recurring software mandate.',
      ),
      commercialMaturity: rate(
        3,
        'Independent recognition on the Fast Company Most Innovative Companies list for 2025 and eight years of operation, against no disclosed customer count, named customers, or revenue scale.',
        ['md-fc', 'md-b'],
        'independently-verified',
        'Limited',
        'Independent recognition is real third party validation, which holds this at the midpoint. Every direct measure of scale is absent.',
      ),
      growthQuality: rate(
        0,
        'No quantified revenue, ARR, or customer growth figure has been disclosed at any point.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'Rated zero because the supporting evidence is classified as not sufficiently supported and cannot carry positive weight.',
      ),
      recurringRevenueQuality: rate(
        1,
        'Revenue is usage based per verification and per filing rather than contracted subscription. No revenue figure and no retention measure is disclosed.',
        ['md-site'],
        'analyst-judgment',
        'Limited',
        'Usage based verification revenue does not earn the baseline credit given to a subscription contract model, because it repeats only with customer activity.',
      ),
      customerDurability: rate(
        4,
        'Verification providers embed into onboarding flows and compliance procedures that are examined by regulators, so replacement requires re validating the control rather than swapping a vendor.',
        ['md-site'],
        'analyst-judgment',
        'Limited',
        'High regulatory switching cost. Held below 5 because no customer data exists and incumbent bureau relationships remain in place alongside.',
      ),
      marketAttractiveness: rate(
        4,
        'Know your business obligations are regulatory rather than discretionary, and business to business platforms increasingly face the same requirements banks do.',
        ['md-site'],
        'analyst-judgment',
        'Moderate',
        'A genuine regulatory driver expanding to new buyer types. Held below 5 because entrenched bureaus hold the existing budget.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 77 million of disclosed funding across eight years, the lowest total in the emerging set, with four years since the last disclosed round.',
        ['md-b'],
        'analyst-judgment',
        'Limited',
        'Operating four years without disclosed external capital is real circumstantial evidence of discipline, which is why this is not lower. No revenue denominator prevents more.',
      ),
      capitalNeedTiming: rate(
        5,
        'Four years since the last disclosed financing, the longest gap in the entire universe, in a category where direct competitors have raised repeatedly over the same period.',
        ['md-b', 'md-fc'],
        'analyst-judgment',
        'Moderate',
        'This is the anchor case for a high rating on this factor. A four year gap against active competitor financing means the capital question is live in one direction or the other.',
      ),
      outreachPotential: rate(
        3,
        'Founder remains chief executive after eight years and both co-founders are publicly identified. Public commentary on strategy is limited and no finance leader is disclosed.',
        ['md-site'],
        'analyst-judgment',
        'Limited',
        'Founder continuity is favourable but public visibility is low and there is no disclosed finance counterparty.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Regulatory demand driver expanding to new buyer types',
          'Lowest capital consumption in the emerging set',
          'Independent industry recognition',
          'Four year financing gap suggesting a live conversation',
        ],
        conditions:
          'Subject to establishing current revenue scale and whether the financing gap reflects sustainability or constraint. Those are very different companies and the public record cannot distinguish them.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'High regulatory switching cost supporting customer persistence is the only meaningful supporting condition',
        ],
        conditions:
          'Not supportable on public information, and the usage based pricing model argues against a recurring revenue facility independently. Per verification revenue tracks customer onboarding volume rather than contracted minimums, which is the profile lenders discount most.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'A runway extension need, if one exists, could suit a mixed instrument',
          'Valuation set in 2022 that shareholders would prefer not to reset',
        ],
        conditions:
          'Subject to establishing revenue scale and the committed revenue share. The blended rating cannot exceed what the debt component can bear.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A four year gap without external capital usually means a company has found sustainability or is protecting a valuation, and which one it is determines entirely which structures make sense.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Kyle Mack, co-founder and Chief Executive Officer',
          subject: 'Middesk coverage advantage against the incumbent bureaus',
          body: `Kyle,

I have been researching business identity and know your business infrastructure, and Middesk stands out for something that is not in any funding announcement: it has been four years since the last disclosed round while most of the category has raised repeatedly.

That usually means a company found its own footing. It is also the thing least visible from the outside, and it changes what a capital conversation would even be about.

I would be interested in learning where the coverage advantage against the incumbent bureaus actually binds, and how verification volume held up through the slowdown in business formation.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'md-site',
        'Middesk',
        'Middesk business identity platform documentation',
        'https://www.middesk.com',
        '2026-08-06',
        'primary',
      ),
      src(
        'md-fc',
        'Middesk',
        'Middesk named a 2025 Fast Company World’s Most Innovative Company',
        'https://www.middesk.com/blog/middesk-named-a-2025-fast-company-worlds-most-innovative-company',
        '2025-03-18',
        'primary',
      ),
      src(
        'md-b',
        'PR Newswire',
        'Leading business identity platform Middesk raises USD 57M Series B',
        'https://www.prnewswire.com/news-releases/leading-business-identity-platform-middesk-raises-57m-series-b-co-led-by-insight-partners-and-canapi-ventures-301561620.html',
        '2022-06-09',
        'corroborating',
        true,
      ),
      src(
        'md-tc',
        'TechCrunch',
        'Middesk raises USD 57M to automate business verification and underwriting',
        'https://techcrunch.com/2022/06/09/middesk-raises-57m/',
        '2022-06-09',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'Middesk remains privately held and independently operating. The company published company content under its own name in March 2025 and continues to operate its platform, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['md-fc', 'md-site'],
      false,
    ),
  },
];
