import type { CompanyInput } from '@/lib/types';
import { NOT_DISCLOSED } from '@/lib/types';
import { claim, rate, src, undisclosed, REVIEW_DATE } from './helpers';

export const securityGrcCompanies: CompanyInput[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'cyera',
    name: 'Cyera',
    website: 'https://www.cyera.com',
    headquarters:
      'New York, New York, United States, with research and development in Tel Aviv, Israel',
    foundedYear: 2021,
    founders: ['Yotam Segev', 'Tamar Bar-Ilan'],
    ceo: 'Yotam Segev, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Cybersecurity',
    subsector: 'Data security posture management and AI data security',
    productDescription:
      'Cyera discovers and classifies data across cloud, software as a service, and on premises estates, then applies posture management, loss prevention, identity, and behavioural controls to it. The company converged data security posture management, data loss prevention, and identity into one platform and has extended it into governing what enterprise AI systems are permitted to read.',
    targetCustomer:
      'Chief information security officers at large enterprises deploying AI systems against sensitive data, particularly in regulated industries where the obligation is to prove what a model can access.',
    businessModel:
      'Annual enterprise subscription priced on data volume and estate scope, sold direct with a significant channel and cloud marketplace component.',

    financingStage: 'Late stage private',
    latestFinancing: 'USD 600 million round at a reported USD 12 billion valuation',
    financingDate: '2026-06-10',
    totalDisclosedFunding: 'Approximately USD 2.3 billion',
    investors: [
      'Sequoia Capital',
      'Accel',
      'Coatue',
      'Georgian',
      'Lightspeed Venture Partners',
      'Sapphire Ventures',
      'Spark Capital',
    ],

    customerEvidence: claim(
      'Company sources describe deployment across large regulated enterprises. Cyera publishes customer case material but does not disclose a customer count in dated primary announcements.',
      'company-reported',
      ['cyera-f', 'cyera-about'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Five financing rounds in under five years culminating in a reported USD 12 billion valuation, a platform spanning more than 100 stated capabilities, and the launch of AI Guardian as a distinct product line.',
      'investor-reported',
      ['cyera-f', 'cyera-sw'],
      true,
      '2026-06-10',
    ),
    growthSignal: claim(
      'Reported valuation progression from USD 3 billion in late 2024, to USD 6 billion in June 2025, to USD 9 billion in January 2026, to USD 12 billion in June 2026. Valuation is an investor set price, not a revenue measure, and is treated here as a financing signal rather than as growth evidence.',
      'investor-reported',
      ['cyera-f', 'cyera-sw', 'cyera-sa'],
      true,
      '2026-06-10',
    ),
    recurringRevenueEvidence: claim(
      'The platform is sold as an annual enterprise subscription. No ARR figure or recurring revenue disclosure has been published by the company.',
      'company-reported',
      ['cyera-about'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No annual recurring revenue figure has been disclosed in any primary or corroborated source. Press coverage has referenced expectations of revenue growth without publishing a base figure.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    capitalEfficiencyEvidence: claim(
      'Approximately USD 2.3 billion raised in under five years with no disclosed revenue against which to read it. On the public record capital efficiency cannot be assessed in either direction.',
      'not-sufficiently-supported',
      [],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Dual footprint from inception with headquarters in New York and research and development in Tel Aviv, described in company sources.',
      'company-reported',
      ['cyera-about'],
      false,
    ),

    competitiveLandscape:
      'Competes with Varonis, Securiti, BigID, Palo Alto Networks, and Microsoft Purview, alongside the data security features shipped natively by the hyperscalers. The AI governance angle is currently a differentiator and is also where the most new entrants are arriving.',
    mainCommercialRisk:
      'A reported USD 12 billion valuation on undisclosed revenue sets an execution bar that leaves little room for a slower enterprise sales cycle than the financing pace implies.',
    mainFinancialRisk:
      'Five rounds in under five years at rapidly escalating prices means the preference stack is substantial and the ratio of capital raised to disclosed revenue is unknown. Neither can be assessed from public sources.',
    mainTechnologyRisk:
      'Data classification accuracy across heterogeneous estates is the hard technical problem, and false positives at enterprise scale erode trust in the control layer faster than they erode the product.',

    originalSourcingSignal:
      'Reported USD 600 million financing at a USD 12 billion valuation dated 10 June 2026, the fourth disclosed round in approximately twenty months.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2026-06-10',
    signalFreshness: 'Fresh',
    whyEnteredPipeline:
      'The financing cadence is the signal. Four disclosed rounds in twenty months at escalating prices indicates investors underwriting something they can see and the public cannot, which makes this a company to understand rather than one to conclude on.',
    whyMayNeedGrowthCapital:
      'It plainly does not need capital in any conventional sense. The relevant question for an origination pipeline is the inverse one: what a company raising at this pace is buying with the money, and whether any part of that is better funded another way.',
    potentialUseOfProceeds: [
      'Enterprise go to market expansion in North America and Europe',
      'Continued build of the AI governance product line',
      'Acquisition of adjacent data security or identity capability',
      'Employee liquidity given the pace of valuation appreciation',
    ],

    whyEquityMayFit:
      'It is already the operative structure. The company has raised primary equity four times in twenty months and has no evident constraint on access to it.',
    whyDebtMayFit:
      'On the public record, nothing supports a debt view. No ARR, retention, margin, or cash flow figure has been disclosed, and a company raising equity this readily has no obvious reason to accept covenants.',
    whyBlendedMayFit:
      'A blended structure is not the natural fit here. Where equity is available at escalating prices without disclosure requirements, adding debt discipline trades flexibility for a cost saving the company does not appear to need.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the only structure the company has demonstrated appetite for and the only one the public record supports. Private credit is not assessable: no ARR, retention, margin, or cash flow evidence exists. Cyera is retained here as a high quality name where the honest conclusion is that a credit conversation would be premature rather than merely conditional.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'Four disclosed rounds in twenty months at escalating valuations. What is the primary constraint the capital is relieving, given that enterprise security sales cycles do not compress with funding?',
      'The platform now spans posture management, loss prevention, identity, and AI governance. What share of ARR comes from the original data security posture product against the newer lines?',
      'How does the company think about the gap between a reported USD 12 billion valuation and the disclosure that a debt or public market investor would eventually require?',
    ],
    nextDiligenceStep:
      'Establish a disclosed or company confirmed ARR figure and a net revenue retention measure. Every capital structure question here is downstream of those two numbers, and neither exists publicly.',
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
      'Liquidation preference structure',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise cybersecurity software sold on annual subscription to chief information security officers at large enterprises.',
        ['cyera-about', 'cyera-f'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model sit squarely inside an enterprise software mandate.',
      ),
      commercialMaturity: rate(
        3,
        'Substantial institutional backing across five rounds and a broad platform, against no disclosed customer count, no named enterprise logos in dated primary sources, and no revenue scale.',
        ['cyera-f', 'cyera-sw'],
        'investor-reported',
        'Moderate',
        'Investor conviction at this scale is meaningful evidence of commercial traction, which is why this is not lower. But every direct measure of maturity that this factor asks for is absent, which is why it is not higher. Valuation is not maturity.',
      ),
      growthQuality: rate(
        2,
        'Rapid valuation appreciation across four disclosed rounds. No revenue, ARR, or customer growth figure has been published.',
        ['cyera-f', 'cyera-sw', 'cyera-sa'],
        'investor-reported',
        'Limited',
        'Valuation growth is a price signal, not a growth measure. Treating it as growth evidence is the specific error this framework exists to avoid, so it earns a 2 for what it implies rather than a high rating for what it looks like.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure has been disclosed.',
        ['cyera-about'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        3,
        'Data security controls embed into compliance and audit processes and are difficult to unwind. No customer count, logo list, or concentration data is disclosed.',
        ['cyera-about'],
        'analyst-judgment',
        'Limited',
        'The structural argument for stickiness is sound but entirely unevidenced at this company specifically, so it cannot be rated on the strength of the category alone.',
      ),
      marketAttractiveness: rate(
        5,
        'Enterprise AI deployment has created a regulatory and architectural obligation to know what data models can reach, which converts a discretionary security purchase into a compliance requirement.',
        ['cyera-f', 'cyera-sw'],
        'analyst-judgment',
        'Moderate',
        'This is the clearest structural spend driver in the universe reviewed here: a new non discretionary obligation arriving faster than budgets can be reallocated away from it.',
      ),
      capitalEfficiency: rate(
        0,
        'Approximately USD 2.3 billion raised in under five years with no disclosed revenue of any kind against which to assess it.',
        [],
        'not-sufficiently-supported',
        'Limited',
        'This factor is rated zero because the supporting evidence is classified as not sufficiently supported, and the scoring engine will not award positive weight on that basis. It is a statement about the absence of disclosure, not an assertion that the company is inefficient.',
      ),
      capitalNeedTiming: rate(
        1,
        'A reported USD 600 million raised in June 2026, following USD 400 million in January 2026.',
        ['cyera-f', 'cyera-sw'],
        'investor-reported',
        'High',
        'This is the anchor case for a low rating on this factor. A company that raised twice in six months has no publicly visible near term capital requirement, which is the definition of poor timing for an origination approach.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and gives named interviews on strategy. No finance leader is publicly disclosed.',
        ['cyera-about', 'cyera-ctech'],
        'company-reported',
        'Moderate',
        'Chief executive is publicly visible and accessible through media. No disclosed finance counterparty caps this at 4.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Demonstrated repeated access to primary growth equity',
          'Structural category tailwind from enterprise AI governance obligations',
          'Platform expansion agenda with identified adjacencies',
        ],
        conditions:
          'Subject to confirming revenue scale and growth, and to a view on whether the reported valuation is supportable. Rated 4 rather than 5 because entry at a reported USD 12 billion on undisclosed revenue is a return question, not only a company question.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 1,
        drivers: [
          'Enterprise annual subscription contract model is the only supporting condition present',
        ],
        conditions:
          'Not supportable on public information. There is no disclosed ARR, retention, gross margin, burn, or cash balance. A company with this level of equity access also has little incentive to accept covenant discipline, which is a commercial reason for the low rating alongside the evidential one.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 1,
        drivers: ['No blended requirement is visible in the public record'],
        conditions:
          'Subject to the same evidence the debt assessment requires. Blended structures address dilution sensitivity, and a company raising primary equity every six months has not signalled that sensitivity.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'The interesting question for a company at this financing pace is not access to capital but what disclosure discipline it wants to build before a debt or public market investor eventually requires it, which is worth thinking about early rather than late.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Yotam Segev, co-founder and Chief Executive Officer',
          subject: 'Cyera platform revenue mix and the AI governance line',
          body: `Yotam,

I have been researching how data security companies are being repriced by enterprise AI adoption, and Cyera is the clearest case of the market treating data governance as an AI problem rather than a compliance one.

What I found most interesting was not the financing pace but the platform shape. Converging posture management, loss prevention, and identity into one purchase changes who the buyer is, and AI Guardian looks like it changes it again. I would be interested in learning whether the AI governance line is landing with the same security buyer or opening a different budget.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'cyera-about',
        'Cyera',
        'About Cyera, company, platform, and leadership',
        'https://www.cyera.com/about',
        '2026-08-05',
        'primary',
      ),
      src(
        'cyera-f',
        'Cyera',
        'Cyera Raises USD 400M to Meet Rapidly Growing Demand for AI Security Among Enterprises',
        'https://www.cyera.com/press-releases/cyera-raises-400m-to-meet-rapidly-growing-demand-for-ai-security-among-enterprises',
        '2026-01-08',
        'primary',
      ),
      src(
        'cyera-sw',
        'SecurityWeek',
        'Cyera Raises USD 600 Million at USD 12 Billion Valuation',
        'https://www.securityweek.com/cyera-raises-600-million-at-12-billion-valuation/',
        '2026-06-10',
        'corroborating',
      ),
      src(
        'cyera-sa',
        'SiliconANGLE',
        'Cyera bets big on AI data security with USD 400M round at USD 9B valuation',
        'https://siliconangle.com/2026/01/08/cyera-bets-big-ai-data-security-400m-round-9b-valuation/',
        '2026-01-08',
        'corroborating',
      ),
      src(
        'cyera-ctech',
        'CTech by Calcalist',
        'Cyera chief executive interview on data security strategy',
        'https://www.calcalistech.com/ctechnews/article/sk8lpdztjx',
        '2025-06-18',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Cyera remains privately held and independently operating. Its most recent disclosed financing in June 2026 was a private round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['cyera-sw', 'cyera-about'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'chainguard',
    name: 'Chainguard',
    website: 'https://www.chainguard.dev',
    headquarters: 'Kirkland, Washington, United States, operating remote first',
    foundedYear: 2021,
    founders: ['Dan Lorenc', 'Kim Lewandowski', 'Matt Moore', 'Ville Aikas', 'Scott Nichols'],
    ceo: 'Dan Lorenc, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Cybersecurity',
    subsector: 'Software supply chain security',
    productDescription:
      'Chainguard builds and maintains hardened, continuously rebuilt versions of open source software. Chainguard Containers are minimal container images with no known vulnerabilities, Chainguard VMs apply the same approach to virtual machines, and Chainguard Libraries extends it to language level dependencies starting with Java.',
    targetCustomer:
      'Platform engineering and application security teams at regulated enterprises that must demonstrate a clean software bill of materials and are spending engineering time remediating vulnerabilities in base images.',
    businessModel:
      'Annual subscription priced on image and repository consumption. The economics rest on replacing internal engineering hours spent on patching with a maintained external supply.',

    financingStage: 'Series D',
    latestFinancing: 'USD 356 million Series D at a reported USD 3.5 billion valuation',
    financingDate: '2025-04-24',
    totalDisclosedFunding: 'Approximately USD 612 million',
    investors: [
      'Kleiner Perkins',
      'IVP',
      'Sequoia Capital',
      'Redpoint Ventures',
      'Amplify Partners',
      'Mantis VC',
      'Salesforce Ventures',
      'Datadog Ventures',
    ],

    customerEvidence: claim(
      'Company and press sources disclose more than 150 customers at the time of the Series D, naming ANZ Bank, Canva, GitLab, Hewlett Packard Enterprise, Oceaneering International, Snap Inc., Univar Solutions, VPBank, and Wiz.',
      'company-reported',
      ['cg-seriesd', 'cg-fg'],
      true,
      '2025-04-24',
    ),
    commercialMaturitySignal: claim(
      'A named customer list spanning banking, software, and industrial sectors, a three product portfolio, and a Series D co-led by Kleiner Perkins and IVP within four years of founding.',
      'company-reported',
      ['cg-seriesd', 'cg-gw'],
      false,
    ),
    growthSignal: claim(
      'Company announcement states annual recurring revenue grew approximately sevenfold to USD 40 million in fiscal 2025, with a stated plan to exceed USD 100 million ARR before the end of fiscal 2026.',
      'company-reported',
      ['cg-seriesd', 'cg-fg'],
      true,
      '2025-04-24',
    ),
    recurringRevenueEvidence: claim(
      'The company discloses revenue in annual recurring revenue terms against an annual subscription contract base.',
      'company-reported',
      ['cg-seriesd'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 24 April 2025 states ARR of approximately USD 40 million in fiscal 2025, grown sevenfold year over year, with a forward target above USD 100 million.',
      'company-reported',
      ['cg-seriesd', 'cg-fg'],
      true,
      '2025-04-24',
    ),
    capitalEfficiencyEvidence: claim(
      'Approximately USD 612 million of disclosed funding against approximately USD 40 million of disclosed ARR. On a revenue to capital basis this is the least efficient ratio in the universe reviewed here, though it reflects a deliberate choice to finance ahead of revenue in a category the investors believe is forming quickly.',
      'analyst-judgment',
      ['cg-seriesd'],
      true,
      '2025-04-24',
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Named customers include ANZ Bank in Australia and VPBank in Vietnam, indicating enterprise sales outside North America. No international revenue mix is disclosed.',
      'company-reported',
      ['cg-seriesd'],
      false,
    ),

    competitiveLandscape:
      'Competes with Docker Hub official images, Red Hat Universal Base Images, Snyk, Sysdig, and the free distributions the product replaces. The unusual competitive feature is that the primary alternative is free software plus internal engineering time.',
    mainCommercialRisk:
      'The value proposition is denominated in engineering hours saved. If a customer reduces its patching burden through other means, or decides the internal cost is acceptable, the purchase becomes discretionary quickly.',
    mainFinancialRisk:
      'Approximately USD 612 million raised against approximately USD 40 million of disclosed ARR. The forward target of above USD 100 million ARR is a plan rather than a disclosure, and the gap between capital raised and revenue achieved is the central financial question.',
    mainTechnologyRisk:
      'Continuously rebuilding a large catalogue of open source packages with no known vulnerabilities is an operationally demanding commitment that scales in cost with the catalogue rather than with revenue.',

    originalSourcingSignal:
      'Series D announcement dated 24 April 2025 disclosing a USD 356 million round and a sevenfold ARR increase to approximately USD 40 million, with a stated plan to exceed USD 100 million ARR.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2025-04-24',
    signalFreshness: 'Established',
    whyEnteredPipeline:
      'Very few private companies publish both an exact ARR figure and a forward ARR target in the same announcement. That combination creates a testable claim with a known deadline, which is a more useful basis for a diligence conversation than a valuation ever is.',
    whyMayNeedGrowthCapital:
      'The stated path from approximately USD 40 million to above USD 100 million ARR within one fiscal year requires substantial go to market investment ahead of the revenue. More than a year has now passed since that target was set.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity to support the stated ARR target',
      'Catalogue expansion beyond containers into virtual machines and language libraries',
      'Compliance and certification investment for regulated and public sector buyers',
      'International go to market build out',
    ],

    whyEquityMayFit:
      'A company financing ahead of revenue in a forming category, with disclosed high growth from a small base, is a conventional growth equity profile.',
    whyDebtMayFit:
      'Disclosed ARR of approximately USD 40 million sits at or below the threshold most recurring revenue lenders require, and with no disclosed margin, retention, or burn the credit case cannot be made from public sources.',
    whyBlendedMayFit:
      'If the stated ARR target has been met, the company would sit in the range where a facility can supplement equity. That is a conditional statement about a claim that has not been publicly updated.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure today. Private credit is potentially suitable only at a materially larger revenue base, subject to confirming that the stated ARR target was achieved, together with gross margin, net and gross retention, burn, and debt service capacity.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'The Series D announcement set a target of exceeding USD 100 million ARR before the end of fiscal 2026. Was that achieved, and if so on what mix of new logos against expansion within the 150 customer base?',
      'The product competes against free base images plus internal engineering time. What does net revenue retention look like once a customer has completed its initial migration and the one time remediation saving is behind it?',
      'Approximately USD 612 million raised against approximately USD 40 million disclosed ARR. How does the company think about the point at which capital efficiency rather than growth becomes the binding constraint?',
    ],
    nextDiligenceStep:
      'Confirm whether the stated fiscal 2026 ARR target above USD 100 million was achieved, and obtain an ARR bridge separating new from expansion revenue across the 150 customer base.',
    missingInformation: [
      'Whether the stated fiscal 2026 ARR target was achieved',
      'Current annual recurring revenue',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Current customer count',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise security software sold on annual subscription to platform engineering and application security buyers.',
        ['cg-seriesd'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are unambiguously enterprise software.',
      ),
      commercialMaturity: rate(
        3,
        'More than 150 customers including ANZ Bank, GitLab, Hewlett Packard Enterprise, and Snap Inc., against approximately USD 40 million of disclosed ARR after five years.',
        ['cg-seriesd', 'cg-fg'],
        'company-reported',
        'High',
        'The named logo quality is genuinely strong for a company this young, which supports a 3. The disclosed revenue base is small relative to the rest of this universe, which prevents anything higher.',
      ),
      growthQuality: rate(
        4,
        'Disclosed sevenfold ARR growth to approximately USD 40 million in fiscal 2025, published with a specific figure rather than a percentage alone.',
        ['cg-seriesd', 'cg-fg'],
        'company-reported',
        'High',
        'An exact ARR figure with a stated multiple is high quality disclosure. Held below 5 because it covers a single period from a small base, and no follow up disclosure has confirmed whether the trajectory held.',
      ),
      recurringRevenueQuality: rate(
        3,
        'Exact ARR disclosed against an annual subscription contract base. No retention measure of any kind is published.',
        ['cg-seriesd'],
        'company-reported',
        'Moderate',
        'Scale is disclosed precisely, which is better than most of this universe. Retention is entirely absent, which is the specific gap that matters most for a product whose value is partly a one time migration saving.',
      ),
      customerDurability: rate(
        3,
        'Named customers across banking and enterprise software, with base image dependencies that are operationally embedded once adopted across a build pipeline.',
        ['cg-seriesd'],
        'analyst-judgment',
        'Moderate',
        'Real switching cost once integrated into continuous integration pipelines, held at 3 because the free alternative remains available at all times and the renewal case differs materially from the initial purchase case.',
      ),
      marketAttractiveness: rate(
        4,
        'Software supply chain security carries regulatory drivers including software bill of materials requirements in United States federal procurement and equivalent European frameworks.',
        ['cg-seriesd'],
        'analyst-judgment',
        'Moderate',
        'A genuine regulatory driver converting discretionary spend into obligation, held below 5 because compliance can be satisfied by several approaches and this product is one option among them.',
      ),
      capitalEfficiency: rate(
        1,
        'Approximately USD 612 million of disclosed funding against approximately USD 40 million of disclosed ARR.',
        ['cg-seriesd'],
        'company-reported',
        'High',
        'This is the weakest disclosed revenue to capital ratio in the universe. Unusually, both inputs are disclosed, so this is a measured rating rather than an absence of evidence, which is why confidence is high while the rating is low.',
      ),
      capitalNeedTiming: rate(
        4,
        'A stated ARR target requiring roughly a 150 percent increase within one fiscal year, set in April 2025, with more than a year elapsed and no public update.',
        ['cg-seriesd'],
        'analyst-judgment',
        'Moderate',
        'A published growth plan of this magnitude implies sustained investment ahead of revenue, which makes a live capital requirement more likely here than at most peers.',
      ),
      outreachPotential: rate(
        5,
        'Founder chief executive is a recognised public figure in software supply chain security who writes and speaks on the category under his own name, and multiple co-founders are publicly identified.',
        ['cg-seriesd', 'cg-about'],
        'company-reported',
        'High',
        'This is the strongest outreach profile in the universe: a founder chief executive with an established public position on the exact question a capital conversation would open with.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Disclosed high growth from a precisely stated base',
          'Regulatory driver supporting category formation',
          'Named enterprise customers validating the enterprise motion',
          'Published growth plan requiring investment ahead of revenue',
        ],
        conditions:
          'Subject to confirming whether the stated fiscal 2026 ARR target was achieved. Rated 4 rather than 5 because a reported USD 3.5 billion valuation against approximately USD 40 million of disclosed ARR is a demanding entry multiple.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 2,
        drivers: [
          'Exact ARR disclosed, which is more than most peers provide',
          'Annual subscription contract base',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable at a materially larger revenue base, subject to confirming that ARR has grown substantially beyond the disclosed approximately USD 40 million, together with gross margin, net and gross retention, burn, and debt service capacity. At the last disclosed scale the company sits below where most recurring revenue facilities begin.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Meaningful growth initiative with a published target',
          'Dilution sensitivity plausible after four rounds in five years',
        ],
        conditions:
          'Subject to confirming current ARR scale and debt service capacity. The blended rating is constrained by the same revenue base question that constrains the debt rating.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company that has publicly committed to a specific ARR target has also created a natural point at which the mix of equity and non dilutive capital should be revisited, and that is a more useful conversation than a valuation discussion.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Dan Lorenc, co-founder and Chief Executive Officer',
          subject: 'Chainguard renewal economics after the initial migration',
          body: `Dan,

I have been researching companies whose product replaces internal engineering time rather than a competitor's licence, and Chainguard is the cleanest example of that model I have found in security.

The April 2025 announcement was unusually specific: approximately USD 40 million ARR, grown sevenfold, with a stated plan to exceed USD 100 million. Very few private companies publish a forward target that precise, and it made the company much easier to study.

The question I keep coming back to is the second year economics. The initial purchase is measured against a remediation backlog, and I was interested in how the renewal conversation changes once that backlog is cleared and the comparison becomes ongoing maintenance rather than catch up.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'cg-seriesd',
        'Chainguard',
        'Announcing Chainguard Series D: Building the Safe Source for All Open Source',
        'https://www.chainguard.dev/unchained/announcing-chainguards-series-d-building-the-safe-source-for-all-open-source',
        '2025-04-24',
        'primary',
      ),
      src(
        'cg-about',
        'Chainguard',
        'About Chainguard, team, customers, and investors',
        'https://www.chainguard.dev/about-us',
        '2026-08-05',
        'primary',
      ),
      src(
        'cg-gw',
        'GeekWire',
        'Cybersecurity startup Chainguard lands USD 356M at USD 3.5B valuation, up from USD 1.1B a year ago',
        'https://www.geekwire.com/2025/cybersecurity-startup-chainguard-lands-356m-now-valued-at-3-5b/',
        '2025-04-24',
        'corroborating',
      ),
      src(
        'cg-fg',
        'FinTech Global',
        'Chainguard lands USD 356m to boost global software supply chain security',
        'https://fintech.global/2025/04/24/chainguard-lands-356m-series-d-to-boost-global-software-supply-chain-security/',
        '2025-04-24',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Chainguard remains privately held and independently operating. The company continues to publish product announcements and events under its own name and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['cg-about', 'cg-gw'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'torq',
    name: 'Torq',
    website: 'https://torq.io',
    headquarters:
      'New York, New York, United States, with research and development in Tel Aviv, Israel',
    foundedYear: 2020,
    founders: ['Ofer Smadari', 'Leonid Belkind', 'Eldad Livni'],
    ceo: 'Ofer Smadari, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Cybersecurity',
    subsector: 'Security operations automation and AI security operations centre',
    productDescription:
      'Torq automates security operations workflows, connecting detection, enrichment, triage, and response across a customer existing security tool estate. The company has repositioned the platform around an AI security operations centre in which agents perform first line triage rather than only executing predefined playbooks.',
    targetCustomer:
      'Security operations centre leaders at multinational enterprises facing alert volumes that outpace analyst headcount.',
    businessModel:
      'Annual enterprise subscription, sold both direct and through managed security service providers who deliver Torq based services to their own customer bases.',

    financingStage: 'Series D',
    latestFinancing: 'USD 140 million Series D at a reported USD 1.2 billion valuation',
    financingDate: '2026-01-09',
    totalDisclosedFunding: 'Approximately USD 332 million',
    investors: [
      'Merlin Ventures',
      'Evolution Equity Partners',
      'Bessemer Venture Partners',
      'Insight Partners',
      'Notable Capital',
      'Greenfield Partners',
      'GGV Capital',
    ],

    customerEvidence: claim(
      'Company announcement dated 9 January 2026 states the platform protects hundreds of multinational enterprises and names Marriott, PepsiCo, Procter and Gamble, Siemens, Uber, and Virgin Atlantic. Earlier disclosure referenced more than 150 direct enterprise customers plus partners serving nearly 900 enterprises.',
      'company-reported',
      ['torq-d', 'torq-c'],
      true,
      '2026-01-09',
    ),
    commercialMaturitySignal: claim(
      'Named Fortune 500 customers across hospitality, consumer goods, industrials, and transport, a two channel motion spanning direct and managed service providers, and four financing rounds in six years.',
      'company-reported',
      ['torq-d', 'torq-c'],
      false,
    ),
    growthSignal: claim(
      'The Series D announcement describes tremendous revenue growth and significant customer expansion in 2025 without publishing a figure. An earlier company statement referenced 300 percent revenue growth in the context of EMEA expansion, and the company previously set a public ARR target of USD 100 million for 2026.',
      'company-reported',
      ['torq-d', 'torq-c', 'torq-cio'],
      true,
      '2026-01-09',
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription. The company has spoken publicly in ARR terms when setting targets, though it has not published an achieved ARR figure.',
      'company-reported',
      ['torq-c'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'No achieved annual recurring revenue figure has been disclosed. The company set a public target of USD 100 million ARR for 2026 at the time of its Series C, but has not published whether it was met.',
      'company-reported',
      ['torq-c'],
      true,
      '2024-09-24',
    ),
    capitalEfficiencyEvidence: undisclosed(),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'Company statements dated January 2025 describe EMEA operational expansion. Named customers include Siemens and Virgin Atlantic, indicating European enterprise sales.',
      'company-reported',
      ['torq-cio', 'torq-d'],
      false,
    ),

    competitiveLandscape:
      'Competes with Palo Alto Networks XSOAR, Splunk SOAR, Tines, Swimlane, and the automation features shipped inside cloud security platforms. The AI security operations centre positioning also places it against a wave of newer agent native entrants.',
    mainCommercialRisk:
      'Security automation is repeatedly absorbed into the platforms that generate the alerts. Torq must stay ahead of the automation features that its own integration partners ship.',
    mainFinancialRisk:
      'A public ARR target was set for 2026 and no achievement has been disclosed. Growth is described qualitatively in the most recent announcement, which is weaker disclosure than the company itself provided earlier.',
    mainTechnologyRisk:
      'Agent driven triage means the product makes consequential security decisions autonomously. A false negative in that path is an incident rather than a support ticket.',

    originalSourcingSignal:
      'Series D announcement dated 9 January 2026 disclosing a USD 140 million round led by Merlin Ventures at a reported USD 1.2 billion valuation, with all existing investors participating.',
    discoveryChannel: 'Financing announcement',
    signalDate: '2026-01-09',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'A new lead investor coming in at a materially higher price with every existing investor also participating is a specific signal. Full existing participation usually means the insiders had the option to price the round themselves and chose to validate an outside mark instead.',
    whyMayNeedGrowthCapital:
      'The company has repositioned from security orchestration to an AI security operations centre. That is a go to market repositioning as much as a product one, and it typically requires sales retraining and new segment entry ahead of the revenue.',
    potentialUseOfProceeds: [
      'Enterprise sales and solution engineering capacity for the AI security operations centre positioning',
      'Continued expansion of the managed service provider channel',
      'EMEA and APAC geographic build out',
      'Product investment in autonomous triage capability',
    ],

    whyEquityMayFit:
      'A repositioning into a newly forming category, funded ahead of the revenue, is a growth equity situation rather than a credit one.',
    whyDebtMayFit:
      'It may not yet. No achieved ARR figure has been disclosed, and the last public target was USD 100 million for 2026, which is at the lower boundary of where recurring revenue facilities typically become available.',
    whyBlendedMayFit:
      'If the USD 100 million ARR target was met, the company would enter the range where a modest facility alongside equity becomes viable. That is conditional on a disclosure that does not exist.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity is the supportable structure. Private credit is potentially suitable subject to confirming achieved ARR against the stated USD 100 million target, together with gross margin, net and gross retention, burn, and debt service capacity.',

    outreachPriority: 'Medium',
    qualificationQuestions: [
      'A USD 100 million ARR target for 2026 was set publicly at the time of the Series C. Was it achieved, and what was the split between direct enterprise and managed service provider channel revenue?',
      'The platform has repositioned from orchestration to an AI security operations centre. Has that changed the buyer, the contract size, or the sales cycle within the existing customer base?',
      'The managed service provider channel reportedly serves nearly 900 enterprises indirectly. How does the economics of that channel compare with direct enterprise on gross margin and retention?',
    ],
    nextDiligenceStep:
      'Establish achieved ARR against the publicly stated USD 100 million target, and separate direct from channel revenue, since the two carry materially different margin and retention profiles.',
    missingInformation: [
      'Achieved annual recurring revenue',
      'Whether the stated USD 100 million ARR target was met',
      'Direct against channel revenue split',
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Customer concentration',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise security software sold on annual subscription to security operations buyers at multinational enterprises.',
        ['torq-d'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'Named customers including Marriott, PepsiCo, Procter and Gamble, Siemens, Uber, and Virgin Atlantic, plus a stated base of hundreds of multinational enterprises across direct and channel motions.',
        ['torq-d', 'torq-c'],
        'company-reported',
        'Moderate',
        'The named logo quality is strong and the two channel motion indicates a repeatable sale. Held below 5 because no revenue scale has been disclosed and the customer count is described qualitatively.',
      ),
      growthQuality: rate(
        2,
        'The most recent announcement describes growth qualitatively. The one specific figure, 300 percent revenue growth, dates to January 2025 and was framed around EMEA expansion rather than the whole business.',
        ['torq-d', 'torq-cio'],
        'company-reported',
        'Limited',
        'Notably, disclosure has moved backwards: the company published a specific target earlier and describes growth in adjectives now. A company that stops quantifying growth after publicly targeting a number is a company to ask rather than assume about.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model with public discussion in ARR terms, but no achieved ARR figure and no retention measure disclosed.',
        ['torq-c'],
        'company-reported',
        'Limited',
        'The recurring model is evidenced and the company thinks in ARR terms publicly, but nothing is quantified.',
      ),
      customerDurability: rate(
        4,
        'Automation workflows embed into security operations runbooks across a customer entire tool estate, and named customers span multiple regulated and safety sensitive industries.',
        ['torq-d'],
        'company-reported',
        'Moderate',
        'Integration breadth creates genuine switching cost. Held below 5 because no concentration data exists and the channel served base is indirect, which weakens the direct relationship.',
      ),
      marketAttractiveness: rate(
        4,
        'Security alert volume grows faster than analyst headcount can, which is a structural driver that does not depend on discretionary budget expansion.',
        ['torq-d'],
        'analyst-judgment',
        'Moderate',
        'The underlying labour constraint is real and durable. Held below 5 because the category is crowded and the largest platform vendors bundle automation into products customers already own.',
      ),
      capitalEfficiency: rate(
        2,
        'Approximately USD 332 million of disclosed funding with no achieved revenue figure disclosed against which to assess it.',
        ['torq-d'],
        'analyst-judgment',
        'Limited',
        'Rated 2 rather than 1 because total capital raised is moderate relative to peers in this universe, so the potential inefficiency is bounded even though the revenue denominator is unknown.',
      ),
      capitalNeedTiming: rate(
        2,
        'A USD 140 million round closed in January 2026, approximately seven months before review.',
        ['torq-d'],
        'company-reported',
        'High',
        'Recently and substantially financed, so there is no publicly visible near term capital requirement. Rated 2 rather than 1 because a repositioning of this scope can consume capital faster than planned.',
      ),
      outreachPotential: rate(
        4,
        'Founder remains chief executive and is quoted directly on strategy in company announcements. No finance leader is publicly disclosed.',
        ['torq-d'],
        'company-reported',
        'Moderate',
        'Founder chief executive access is strong, with no disclosed finance counterparty.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 4,
        drivers: [
          'Named Fortune 500 customer base validating the enterprise motion',
          'Category repositioning requiring investment ahead of revenue',
          'Full existing investor participation in the most recent round',
          'Two channel go to market with an established partner base',
        ],
        conditions:
          'Subject to confirming achieved ARR and the direct against channel revenue mix. Held at 4 because the company recently raised, which reduces near term relevance regardless of quality.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 2,
        drivers: [
          'Enterprise annual subscription contract base',
          'Broad customer count implying limited single name concentration',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming achieved ARR against the stated USD 100 million target, gross margin, net and gross retention, burn, and debt service capacity. Channel revenue in particular needs separate treatment because its margin and retention profile differs from direct.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 2,
        drivers: [
          'Meaningful repositioning initiative that could suit part debt funding',
          'Four equity rounds in six years implies accumulating dilution',
        ],
        conditions:
          'Subject to confirming ARR scale and debt service capacity. A recent large equity round also reduces the near term case for adding a debt tranche.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company that has publicly targeted an ARR milestone and then moved to qualitative growth language has a disclosure decision to make, and how that is resolved shapes which capital sources are available to it later.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Ofer Smadari, co-founder and Chief Executive Officer',
          subject: 'Torq channel economics and the AI security operations positioning',
          body: `Ofer,

I have been researching security automation companies and how the shift toward agent driven triage is changing what customers actually buy, and Torq is the clearest case of a company repositioning rather than extending.

The part I found most interesting is the two channel structure. Serving roughly 900 enterprises indirectly through managed service providers alongside a direct enterprise base is a very different revenue quality question from either motion on its own, particularly on retention.

I would be interested in learning how you think about the relative durability of those two channels as the platform moves from playbook execution to autonomous triage.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'torq-d',
        'Torq',
        'Torq Secures USD 140M Series D at USD 1.2B Valuation to Lead the AI SOC and Agentic AI Era',
        'https://torq.io/news/torq-seriesd/',
        '2026-01-09',
        'primary',
      ),
      src(
        'torq-c',
        'Torq',
        'Torq Announces USD 70M Series C to Double Down on Generative AI for Security Operations',
        'https://torq.io/news/torqseriesc/',
        '2024-09-24',
        'primary',
      ),
      src(
        'torq-cio',
        'Intelligent CIO Middle East',
        'Torq to expand EMEA operations and announces 300 percent revenue growth',
        'https://www.intelligentcio.com/me/2025/01/29/torq-to-expand-emea-operations-and-announces-300-revenue-growth/',
        '2025-01-29',
        'corroborating',
      ),
      src(
        'torq-sw',
        'SecurityWeek',
        'Torq Secures USD 70M Series C for HyperSOC',
        'https://www.securityweek.com/torq-secures-70m-series-c-for-hypersoc/',
        '2024-09-24',
        'corroborating',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Moderate',
    privateStatusVerification: claim(
      'Torq remains privately held and independently operating. Its most recent disclosed financing in January 2026 was a private Series D round, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['torq-d', 'torq-sw'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'vanta',
    name: 'Vanta',
    website: 'https://www.vanta.com',
    headquarters: 'San Francisco, California, United States',
    foundedYear: 2018,
    founders: ['Christina Cacioppo', 'Erik Goldman'],
    ceo: 'Christina Cacioppo, co-founder and Chief Executive Officer',
    financeLeader: NOT_DISCLOSED,
    sector: 'Governance, risk, and compliance',
    subsector: 'Automated security compliance and trust management',
    productDescription:
      'Vanta automates the evidence collection and continuous monitoring behind security compliance frameworks including SOC 2, ISO 27001, and HIPAA. The platform runs continuous tests across a customer infrastructure and vendor estate, manages third party risk, automates security questionnaires, and publishes a customer facing trust centre.',
    targetCustomer:
      'Security, compliance, and engineering leaders across a wide band from early stage software companies through to large enterprises, with the entry point usually a first compliance certification required by a customer.',
    businessModel:
      'Annual subscription priced by framework and company size, with a product led motion at the smaller end and an enterprise sales motion above it.',

    financingStage: 'Series D',
    latestFinancing: 'USD 150 million Series D at a reported USD 4.15 billion valuation',
    financingDate: '2025-07-23',
    totalDisclosedFunding: 'Approximately USD 504 million',
    investors: [
      'Wellington Management',
      'Growth Equity at Goldman Sachs Alternatives',
      'Sequoia Capital',
      'J.P. Morgan',
      'Craft Ventures',
      'Y Combinator',
      'Atlassian Ventures',
      'CrowdStrike Ventures',
    ],

    customerEvidence: claim(
      'Company announcement dated 29 April 2026 states more than 16,000 customer organisations, naming Atlassian, Samsara, and Snowflake among enterprises and Harvey, Lovable, and Cursor among software companies.',
      'company-reported',
      ['vanta-arr', 'vanta-d'],
      true,
      '2026-04-29',
    ),
    commercialMaturitySignal: claim(
      'More than 16,000 customers, disclosed ARR above USD 300 million, a stated 400 or more product integrations and 1,400 or more continuous tests, and a first time Leader position in the Forrester Wave for governance, risk, and compliance platforms.',
      'company-reported',
      ['vanta-arr', 'vanta-agent'],
      true,
      '2026-06-02',
    ),
    growthSignal: claim(
      'Company announcement dated 29 April 2026 states ARR crossed USD 300 million having tripled since 2024, with customer organisations rising from approximately 7,000 in fiscal 2024 to more than 12,000 by July 2025 and more than 16,000 by April 2026.',
      'company-reported',
      ['vanta-arr', 'vanta-d'],
      true,
      '2026-04-29',
    ),
    recurringRevenueEvidence: claim(
      'Revenue is disclosed in annual recurring revenue terms against an annual subscription base tied to compliance frameworks that renew on audit cycles.',
      'company-reported',
      ['vanta-arr'],
      false,
    ),
    grossMarginEvidence: undisclosed(),
    netRevenueRetentionEvidence: undisclosed(),
    grossRetentionEvidence: undisclosed(),
    arrEvidence: claim(
      'Company announcement dated 29 April 2026 states annual recurring revenue crossed USD 300 million, tripled since 2024.',
      'company-reported',
      ['vanta-arr'],
      true,
      '2026-04-29',
    ),
    capitalEfficiencyEvidence: claim(
      'Above USD 300 million disclosed ARR against approximately USD 504 million total disclosed funding is a favourable revenue to capital ratio. The underlying margin and burn profile is not disclosed.',
      'analyst-judgment',
      ['vanta-arr', 'vanta-d'],
      true,
      '2026-04-29',
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'The Series D announcement describes international growth as a use of proceeds, and the customer base spans multiple regions. No international revenue mix is disclosed.',
      'company-reported',
      ['vanta-d'],
      false,
    ),

    competitiveLandscape:
      'Competes with Drata, Secureframe, Sprinto, and Scrut at the mid market end, and with LogicGate, AuditBoard, and ServiceNow as it moves upmarket into enterprise governance, risk, and compliance.',
    mainCommercialRisk:
      'The compliance automation category has strong competition on price at the smaller end, and moving upmarket into enterprise governance, risk, and compliance means competing against entrenched vendors with different buying centres.',
    mainFinancialRisk:
      'A customer base of more than 16,000 implies a low average contract value and a long tail of smaller customers, which typically carries higher gross churn than an enterprise only base. No retention figure is disclosed to test that.',
    mainTechnologyRisk:
      'Continuous compliance monitoring depends on integrations with hundreds of third party systems. Each one is a maintenance obligation and a potential source of false assurance.',

    originalSourcingSignal:
      'Product launch dated 2 June 2026 introducing the Vanta Agent for Risk, unifying internal and third party risk on the company Trust Graph data foundation, following an ARR disclosure on 29 April 2026.',
    discoveryChannel: 'Product launch',
    signalDate: '2026-06-02',
    signalFreshness: 'Fresh',
    whyEnteredPipeline:
      'Vanta discloses more of the metrics that matter than almost any private company in this universe: exact customer counts at three dated points, an ARR figure, and a growth multiple. That level of disclosure makes a quantitative conversation possible from the first meeting.',
    whyMayNeedGrowthCapital:
      'The move upmarket from compliance automation into enterprise governance, risk, and compliance is a different sale requiring different sellers. The Forrester Leader placement suggests the product is ready; the go to market investment to match it typically runs ahead of the revenue.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity to support the upmarket transition',
      'Continued build of the agentic risk product line',
      'International expansion into regulated European markets',
      'Selective acquisition of adjacent risk or vendor management capability',
    ],

    whyEquityMayFit:
      'Funding an upmarket transition while defending a large mid market base is a two front investment that suits patient primary equity.',
    whyDebtMayFit:
      'Disclosed ARR above USD 300 million across more than 16,000 customers gives both scale and unusually low single name concentration, which are two of the strongest starting conditions for a recurring revenue facility in this universe.',
    whyBlendedMayFit:
      'At a reported USD 4.15 billion valuation, funding part of the go to market build with debt would preserve materially more ownership than an equivalent all equity round.',
    preliminaryCapitalView:
      'Analyst judgment. Growth equity leads on the strength of the disclosed growth record. Blended capital is a genuine alternative here rather than a theoretical one, because the disclosed scale and customer breadth clear the usual first hurdles. Potentially suitable for a debt component, subject to confirming gross margin, net and gross retention, burn, and debt service capacity, with particular attention to churn in the long tail of smaller customers.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'ARR tripled since 2024 while customer count roughly doubled, which implies average contract value rose materially. How much of that came from enterprise mix shift against price increases in the existing base?',
      'With more than 16,000 customers the base includes a long tail of smaller companies. What are gross and net retention for the sub enterprise cohort separately from the enterprise cohort?',
      'The Forrester Leader placement is in enterprise governance, risk, and compliance, which is a different buying centre from compliance automation. What share of new ARR now comes from that enterprise motion?',
    ],
    nextDiligenceStep:
      'Obtain gross and net retention split by customer cohort. Given the very large customer count, blended retention would conceal exactly the dynamic that matters for both equity and credit underwriting.',
    missingInformation: [
      'Net revenue retention',
      'Gross retention',
      'Gross margin',
      'EBITDA and cash burn',
      'Cash balance and runway',
      'Existing debt or credit facility',
      'Average contract value by cohort',
      'Enterprise against mid market revenue mix',
      'International revenue mix',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise governance, risk, and compliance software sold on annual subscription to security and compliance buyers.',
        ['vanta-arr'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        5,
        'More than 16,000 customers, disclosed ARR above USD 300 million, named enterprise logos including Atlassian, Samsara, and Snowflake, and a first time Forrester Wave Leader placement.',
        ['vanta-arr', 'vanta-agent'],
        'company-reported',
        'High',
        'Customer count, revenue scale, named logos, and independent analyst recognition are all present and dated, which is the complete set this factor asks for.',
      ),
      growthQuality: rate(
        5,
        'Customer count disclosed at three dated points across two years, approximately 7,000 then more than 12,000 then more than 16,000, alongside ARR tripling to above USD 300 million.',
        ['vanta-arr', 'vanta-d'],
        'company-reported',
        'High',
        'Growth is disclosed repeatedly, on two independent measures, across multiple dated periods. This is the highest quality growth disclosure in the universe reviewed here.',
      ),
      recurringRevenueQuality: rate(
        3,
        'ARR disclosed against an annual subscription base tied to audit renewal cycles, but no retention measure is published and the very large customer count implies a long tail.',
        ['vanta-arr'],
        'company-reported',
        'Moderate',
        'Scale and recurrence are well evidenced. Retention is entirely absent and matters more here than almost anywhere else because of the small customer tail, which is why this does not rise to a 4.',
      ),
      customerDurability: rate(
        4,
        'Compliance certifications renew on annual audit cycles and the platform holds the evidence history, which creates real switching cost. More than 16,000 customers implies negligible single name concentration.',
        ['vanta-arr'],
        'company-reported',
        'High',
        'Strong on both stickiness and concentration. Held below 5 because the smaller end of the base is genuinely more mobile between competing vendors on price.',
      ),
      marketAttractiveness: rate(
        4,
        'Compliance obligations expand with regulation and with enterprise customer security requirements, making the spend largely non discretionary once a customer demands certification.',
        ['vanta-arr', 'vanta-agent'],
        'analyst-judgment',
        'Moderate',
        'Non discretionary driver, held below 5 because the mid market segment competes hard on price and the category has many credible vendors.',
      ),
      capitalEfficiency: rate(
        5,
        'Disclosed ARR above USD 300 million against approximately USD 504 million of total disclosed funding, with ARR having tripled in two years.',
        ['vanta-arr', 'vanta-d'],
        'company-reported',
        'High',
        'The strongest disclosed revenue to capital ratio in this universe, and both inputs are dated and company disclosed rather than inferred.',
      ),
      capitalNeedTiming: rate(
        3,
        'Approximately twelve months since the last disclosed round, with an active upmarket transition and a newly launched agentic product line.',
        ['vanta-d', 'vanta-agent'],
        'company-reported',
        'Moderate',
        'A credible investment programme is underway but the last round was recent enough that no acute need is visible, which is the definition of a middling rating on this factor.',
      ),
      outreachPotential: rate(
        5,
        'Founder chief executive speaks publicly and frequently about company strategy in named interviews and podcasts, and is quoted directly in company announcements.',
        ['vanta-arr', 'vanta-d'],
        'company-reported',
        'High',
        'Exceptional public visibility from a founder chief executive who discusses operating detail publicly, which makes an informed approach possible.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 5,
        drivers: [
          'Disclosed growth on two independent measures across multiple periods',
          'Upmarket transition requiring sustained go to market investment',
          'Strong disclosed capital efficiency supporting a premium entry',
          'Independent analyst validation of enterprise product readiness',
        ],
        conditions:
          'Subject to confirming retention in the smaller customer cohort, which is the principal unmeasured risk in an otherwise well disclosed record.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 3,
        drivers: [
          'Disclosed ARR above USD 300 million clears typical facility scale thresholds',
          'More than 16,000 customers means effectively no single name concentration',
          'Strong disclosed revenue to capital ratio implies a shorter path to cash generation',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming gross margin, net and gross retention, burn, cash balance, and debt service capacity. The long tail of smaller customers is the specific area a lender would test first, since blended retention across 16,000 accounts can conceal high churn at the bottom.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 4,
        drivers: [
          'Reported valuation makes all equity funding expensive per dollar raised',
          'Disclosed scale and customer breadth clear the first credit hurdles',
          'Identified growth initiative with a definable funding requirement',
          'Capital efficiency suggests capacity to service interest sooner than most peers',
        ],
        conditions:
          'Subject to confirming debt service capacity and cohort level retention. This is one of the few names in the universe where a blended structure looks genuinely available rather than merely conceivable.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'A company with disclosed ARR above USD 300 million, more than 16,000 customers, and a strong revenue to capital ratio is in the narrow band where non dilutive capital can fund a go to market build at a fraction of the ownership cost of equity, which is worth quantifying before the next round is framed.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Christina Cacioppo, co-founder and Chief Executive Officer',
          subject: 'Vanta cohort economics through the upmarket transition',
          body: `Christina,

I have been researching how compliance automation companies handle the move upmarket, and Vanta is the one where the public record is detailed enough to actually study the transition rather than guess at it.

Customer count at three dated points and ARR tripling to above USD 300 million is more disclosure than almost any private company provides. Working through it, the figure that stands out is the implied rise in average contract value, which suggests the enterprise motion is carrying more of the growth than the headline customer number alone would imply.

I would be interested in learning how you think about the two cohorts separately, particularly whether the smaller end is behaving as a durable base or as a funnel into the enterprise product.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'vanta-arr',
        'Vanta via Business Wire',
        'Vanta Crosses USD 300M ARR as Growth Accelerates from AI',
        'https://www.businesswire.com/news/home/20260429269142/en/Vanta-Crosses-$300M-ARR-as-Growth-Accelerates-from-AI',
        '2026-04-29',
        'primary',
      ),
      src(
        'vanta-agent',
        'Vanta via Business Wire',
        'Vanta Launches New Agent to Unify Internal and Third-Party Risk',
        'https://www.businesswire.com/news/home/20260602347223/en/Vanta-Launches-New-Agent-to-Unify-Internal-and-Third-Party-Risk',
        '2026-06-02',
        'primary',
      ),
      src(
        'vanta-d',
        'Vanta via Business Wire',
        'Vanta Raises USD 150M Series D to Power the Future of AI-Driven Trust',
        'https://www.businesswire.com/news/home/20250723901336/en/Vanta-Raises-$150M-Series-D-to-Power-the-Future-of-AI-Driven-Trust',
        '2025-07-23',
        'primary',
      ),
      src(
        'vanta-sw',
        'SecurityWeek',
        'GRC Firm Vanta Raises USD 150 Million at USD 4.15 Billion Valuation',
        'https://www.securityweek.com/grc-firm-vanta-raises-150-million-at-4-15-billion-valuation/',
        '2025-07-23',
        'corroborating',
      ),
      src(
        'vanta-about',
        'Vanta',
        'Vanta company and mission pages',
        'https://www.vanta.com/company/about',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'High',
    privateStatusVerification: claim(
      'Vanta remains privately held and independently operating. The company published its own ARR milestone in April 2026 and a product launch in June 2026 under its own name, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['vanta-arr', 'vanta-sw'],
      false,
    ),
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'logicgate',
    name: 'LogicGate',
    website: 'https://www.logicgate.com',
    headquarters: 'Chicago, Illinois, United States',
    foundedYear: 2015,
    founders: ['Matt Kunkel', 'Jon Siegler', 'Dan Campbell'],
    ceo: 'Diego Panama, Chief Executive Officer, effective July 2026, with co-founder Matt Kunkel transitioning to Executive Chairman',
    financeLeader: NOT_DISCLOSED,
    sector: 'Governance, risk, and compliance',
    subsector: 'Enterprise risk management and third party risk',
    productDescription:
      'LogicGate Risk Cloud is a no code platform for building governance, risk, and compliance workflows. Customers configure risk registers, control libraries, third party assessments, and quantification models without engineering support, which is the central design decision distinguishing it from configurable enterprise suites.',
    targetCustomer:
      'Chief risk officers, internal audit, and compliance functions at enterprises whose risk programmes have outgrown spreadsheets but do not want a multi year platform implementation.',
    businessModel:
      'Annual enterprise subscription priced on applications deployed and users, with expansion driven by adding risk programmes onto an existing deployment.',

    financingStage: 'Series C',
    latestFinancing: 'USD 113 million Series C led by PSG',
    financingDate: '2022-11-01',
    totalDisclosedFunding: 'Approximately USD 156 million',
    investors: ['PSG', 'Greenspring Associates', 'Silversmith Capital Partners', 'Foundry Group'],

    customerEvidence: claim(
      'LogicGate publishes customer case material and is evaluated in independent analyst reports covering enterprise deployments. Specific named enterprise customers and a customer count are not disclosed in dated primary announcements.',
      'company-reported',
      ['lg-site', 'lg-forrester'],
      false,
    ),
    commercialMaturitySignal: claim(
      'Named one of only four Leaders in the Forrester Wave for governance, risk, and compliance platforms in the second quarter of 2026, and one of three Leaders in the Forrester Wave for third party risk management platforms in the first quarter of 2026.',
      'independently-verified',
      ['lg-forrester', 'lg-tprm'],
      true,
      '2026-05-27',
    ),
    growthSignal: claim(
      'No revenue or customer growth figure has been disclosed. The company has continued shipping major platform releases, including a Spring 2026 release positioning the platform around enterprise AI governance.',
      'company-reported',
      ['lg-spring'],
      false,
    ),
    recurringRevenueEvidence: claim(
      'Sold as an annual enterprise subscription. No ARR figure or recurring revenue disclosure has been published.',
      'company-reported',
      ['lg-site'],
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
      'Approximately USD 156 million of disclosed funding across a ten year operating history is modest relative to peers in this universe, and the last round was led by a growth equity firm that typically underwrites existing revenue rather than funding losses. Neither observation substitutes for a disclosed revenue figure.',
      'analyst-judgment',
      ['lg-seriesc'],
      false,
    ),
    debtEvidence: undisclosed(),
    acquisitionActivity: undisclosed(),
    internationalExpansion: claim(
      'The Series C announcement described international presence as a use of proceeds. No international revenue mix or entity detail is disclosed.',
      'company-reported',
      ['lg-seriesc'],
      false,
    ),

    competitiveLandscape:
      'Competes with Archer, MetricStream, ServiceNow Integrated Risk Management, AuditBoard, Diligent, and increasingly with Vanta as compliance automation vendors move upmarket. Forrester places LogicGate among a small group of Leaders in both governance, risk, and compliance and third party risk.',
    mainCommercialRisk:
      'Enterprise governance, risk, and compliance buying is slow and often tied to platform consolidation decisions. LogicGate competes against vendors already embedded in adjacent enterprise workflows, particularly ServiceNow.',
    mainFinancialRisk:
      'No revenue figure of any kind has been disclosed and the last financing was almost four years ago. A leadership transition at the same time as a category repositioning adds execution risk that cannot be assessed against financial disclosure.',
    mainTechnologyRisk:
      'No code configurability is the differentiator, and it creates a support and upgrade obligation across highly customised customer deployments that grows with the customer base.',

    originalSourcingSignal:
      'Executive appointment announced 30 April 2026 naming President and Chief Operating Officer Diego Panama as Chief Executive Officer effective July 2026, with co-founder Matt Kunkel moving to Executive Chairman focused on capital strategy and strategic partnerships.',
    discoveryChannel: 'Executive hire',
    signalDate: '2026-04-30',
    signalFreshness: 'Recent',
    whyEnteredPipeline:
      'The specific wording of the transition is the signal. A founder moving to Executive Chairman with a stated focus on capital strategy is an unusually direct public indication that capital structure is an active agenda item, and it identifies exactly who owns that conversation.',
    whyMayNeedGrowthCapital:
      'Nearly four years since the last disclosed round, a new chief executive appointed to grow the enterprise position, a founder explicitly focused on capital strategy, and two Forrester Leader placements in the same year. Those four facts together describe a company positioning for a transaction of some kind.',
    potentialUseOfProceeds: [
      'Enterprise sales capacity to convert the analyst positioning',
      'Product investment in AI governance capability',
      'Acquisition of adjacent third party risk or vendor management capability',
      'Shareholder liquidity for a ten year old cap table',
    ],

    whyEquityMayFit:
      'A leadership transition, an analyst validated product position, and a four year gap since the last round is a recognisable growth equity setup, particularly for an investor comfortable underwriting a new chief executive.',
    whyDebtMayFit:
      'On the public record it cannot be assessed. No ARR, retention, margin, or cash flow figure has been disclosed. That a growth equity firm led the last round suggests existing revenue was being underwritten, but this is an inference rather than evidence.',
    whyBlendedMayFit:
      'If the company is near breakeven, a structure combining a modest primary round with a facility could fund an acquisition without resetting a valuation set in 2022. This is conditional on disclosure that does not exist publicly.',
    preliminaryCapitalView:
      'Analyst judgment. This is the highest priority outreach name in the universe relative to its score, because the public signal identifies both a live capital agenda and the executive who owns it. Structure cannot be determined publicly: no ARR, retention, margin, or cash flow evidence exists, and the correct next step is a conversation rather than a recommendation.',

    outreachPriority: 'High',
    qualificationQuestions: [
      'The transition announcement described the Executive Chairman role as focused on capital strategy. Is the company currently evaluating a financing, a liquidity event, or acquisitions, and on what timeline?',
      'LogicGate was named a Leader in two Forrester Waves within one year. Has that changed win rates against ServiceNow and Archer in competitive enterprise evaluations?',
      'The last disclosed round was in 2022 and was led by a growth equity firm. Has the business been self funding since then, and what does the current cash generation profile look like?',
    ],
    nextDiligenceStep:
      'Approach the Executive Chairman directly on capital strategy, since the public announcement identifies that as his explicit remit. Establish current ARR and growth before forming any structural view.',
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
      'Any financing event after November 2022',
      'Finance leader identity',
    ],

    factors: {
      mandateFit: rate(
        5,
        'B2B enterprise governance, risk, and compliance software sold on annual subscription to risk, audit, and compliance buyers.',
        ['lg-site', 'lg-forrester'],
        'company-reported',
        'High',
        'Product, buyer, and revenue model are squarely enterprise software.',
      ),
      commercialMaturity: rate(
        4,
        'Named one of only four Leaders in the Forrester Wave for governance, risk, and compliance platforms in the second quarter of 2026 and one of three Leaders in third party risk management in the first quarter of 2026, after ten years of operation.',
        ['lg-forrester', 'lg-tprm'],
        'independently-verified',
        'High',
        'Independent analyst evaluation is the strongest maturity evidence available for a company that discloses no financials, and two Leader placements in one year is a high bar. Held below 5 only because no customer count or revenue scale is disclosed.',
      ),
      growthQuality: rate(
        1,
        'No revenue or customer growth figure has been disclosed at any point. Continued major platform releases are evidence of investment rather than of growth.',
        ['lg-spring'],
        'company-reported',
        'Limited',
        'There is essentially no growth disclosure to assess. This is rated 1 rather than 0 because sustained product investment and analyst recognition are weakly consistent with a growing business, but nothing here quantifies it.',
      ),
      recurringRevenueQuality: rate(
        2,
        'Enterprise annual subscription model is evidenced by the product structure. No ARR figure and no retention measure is disclosed.',
        ['lg-site'],
        'company-reported',
        'Limited',
        'The contract model is recurring, which earns a 2. Nothing quantifies it.',
      ),
      customerDurability: rate(
        4,
        'Governance, risk, and compliance platforms hold audit history and configured control libraries, making replacement a multi year project. Forrester Leader placement in third party risk indicates depth of deployment.',
        ['lg-forrester', 'lg-tprm'],
        'independently-verified',
        'Moderate',
        'Enterprise risk platforms are among the stickiest enterprise software once configured, and the analyst evaluation is independent evidence of depth. Held below 5 because no concentration or customer count data exists.',
      ),
      marketAttractiveness: rate(
        4,
        'Enterprise risk and third party risk obligations expand with regulation, and AI governance requirements are creating a new compliance surface within the same buying centre.',
        ['lg-forrester', 'lg-spring'],
        'analyst-judgment',
        'Moderate',
        'Non discretionary category with a newly expanding surface. Held below 5 because enterprise governance, risk, and compliance is a slow moving market with entrenched incumbents and long replacement cycles.',
      ),
      capitalEfficiency: rate(
        3,
        'Approximately USD 156 million of disclosed funding across ten years, materially less than most peers in this universe, with the last round led by a growth equity firm.',
        ['lg-seriesc'],
        'analyst-judgment',
        'Limited',
        'Modest capital consumption over a long operating history is genuinely suggestive of discipline, and a growth equity lead usually implies existing revenue was underwritten. Held at 3 because no revenue denominator exists to confirm it.',
      ),
      capitalNeedTiming: rate(
        5,
        'Almost four years since the last disclosed round, a new chief executive appointed to grow the enterprise position, and a founder explicitly moving to a role focused on capital strategy.',
        ['lg-ceo', 'lg-cci'],
        'independently-verified',
        'High',
        'This is the anchor case for a 5. A company does not publicly assign a founder to capital strategy unless capital strategy is live, and the announcement names the person who owns it.',
      ),
      outreachPotential: rate(
        5,
        'Two named senior executives with clearly delineated public remits: an incoming chief executive quoted on product strategy and an executive chairman publicly tasked with capital strategy and partnerships.',
        ['lg-ceo', 'lg-cci'],
        'independently-verified',
        'High',
        'The public record identifies not just an accessible executive but specifically which executive owns the capital conversation, which is the ideal condition this factor is designed to reward.',
      ),
    },

    capitalFit: {
      equity: {
        rating: 3,
        drivers: [
          'Independent analyst validation of enterprise product position',
          'Leadership transition creating a natural transaction window',
          'Four year gap since the last disclosed round',
          'Founder publicly assigned to capital strategy',
        ],
        conditions:
          'Subject to establishing current revenue scale and growth, neither of which is public. The situational signals are strong; the financial evidence is absent, and the rating reflects both.',
        provenance: 'analyst-judgment',
      },
      debt: {
        rating: 2,
        drivers: [
          'Enterprise annual subscription contract base with high switching cost',
          'Modest total capital raised over ten years, weakly suggesting disciplined burn',
          'No disclosed existing leverage',
        ],
        conditions:
          'Potentially suitable, subject to confirming ARR scale, gross margin, net and gross retention, burn, and debt service capacity. Nothing in the public record establishes any of these. The rating reflects a plausible starting position rather than evidence, and it would move in either direction quickly once financials were seen.',
        provenance: 'analyst-judgment',
      },
      blended: {
        rating: 3,
        drivers: [
          'A ten year old cap table where a liquidity component is plausible',
          'Possible acquisition agenda under a new chief executive',
          'Valuation reference point set in 2022 that shareholders may prefer not to reset',
          'Explicit public focus on capital strategy',
        ],
        conditions:
          'Subject to confirming debt service capacity and current revenue scale. Rated marginally above the standalone debt fit because the situational profile, a mature company avoiding a valuation reset, is the specific case blended structures address.',
        provenance: 'analyst-judgment',
      },
    },

    outreach: {
      valueProposition:
        'For a company whose valuation reference point was set in 2022 and whose founder is now focused on capital strategy, the useful work is mapping which structures fund the enterprise push without requiring a new price to be agreed first.',
      emails: [
        {
          audience: 'CEO',
          recipientRole: 'Diego Panama, Chief Executive Officer',
          subject: 'LogicGate enterprise win rates after two Forrester Leader placements',
          body: `Diego,

Congratulations on the appointment. I have been researching the enterprise governance, risk, and compliance market and how the compliance automation vendors moving upmarket are changing competitive dynamics, and LogicGate sits at an interesting point in that.

Two Forrester Leader placements within a single year, in governance, risk, and compliance and in third party risk, is a stronger analyst position than the company gets credit for from the outside. What I was interested in is whether that has translated into competitive win rates against ServiceNow and Archer in enterprise evaluations, or whether platform consolidation still decides most of those.

I would be interested in learning how you are thinking about the enterprise motion in your first months in the role.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
        {
          audience: 'CFO',
          recipientRole:
            'Matt Kunkel, co-founder and Executive Chairman, publicly focused on capital strategy',
          subject: 'LogicGate capital strategy and structure options after the transition',
          body: `Matt,

I have been researching how enterprise governance, risk, and compliance companies fund their growth, and the LogicGate transition announcement stood out because it stated plainly that your focus is moving to capital strategy and partnerships. That is more specific than most transition announcements, and it is what prompted me to write.

From the outside, the situation reads as a company with an independently validated enterprise product position, a valuation reference point set in 2022, and a cap table now ten years old. Those three facts usually point toward structures that fund growth without requiring a new price to be agreed first, whether that is a facility against recurring revenue, a structured primary round, or a combination.

I would be interested in learning how you are framing the options, and what the constraints look like from where you sit.

I am researching this independently and am not raising or placing capital. If a short conversation is useful I would value it.

Best regards,
Sahil Modi
modi.sahil@gmail.com`,
        },
      ],
    },

    sources: [
      src(
        'lg-ceo',
        'LogicGate',
        'LogicGate Appoints Diego Panama as Chief Executive Officer',
        'https://www.logicgate.com/news/logicgate-appoints-diego-panama-as-chief-executive-officer/',
        '2026-04-30',
        'primary',
      ),
      src(
        'lg-forrester',
        'LogicGate',
        'LogicGate Recognized as One of Only Four Leaders in Governance, Risk and Compliance Platforms, Q2 2026 Report',
        'https://www.logicgate.com/news/logicgate-proudly-announced-it-was-named-one-of-four-leaders-in-the-forrester-wave-governance-risk-and-compliance-platforms-q2-2026-report/',
        '2026-05-27',
        'primary',
      ),
      src(
        'lg-tprm',
        'PR Newswire',
        'LogicGate Recognized as a Leader in Third-Party Risk Management Platforms, Q1 2026 Report',
        'https://www.prnewswire.com/news-releases/logicgate-recognized-as-a-leader-in-third-party-risk-management-platforms-q1-2026-report-by-independent-research-firm-302708471.html',
        '2026-03-09',
        'corroborating',
        true,
      ),
      src(
        'lg-cci',
        'Corporate Compliance Insights',
        'LogicGate Names New CEO, Co-Founder Transitions to Chairmanship',
        'https://www.corporatecomplianceinsights.com/logicgate-names-new-ceo-co-founder-transitions-to-chairmanship/',
        '2026-05-01',
        'corroborating',
      ),
      src(
        'lg-seriesc',
        'LogicGate',
        'LogicGate Secures USD 113M Series C Funding Round',
        'https://www.logicgate.com/blog/logicgate-secures-113m-series-c-funding-round/',
        '2022-11-01',
        'primary',
      ),
      src(
        'lg-spring',
        'PR Newswire',
        'LogicGate Solidifies Position as the Enterprise AI GRC Leader With Its Spring 2026 Release',
        'https://www.prnewswire.com/news-releases/logicgate-solidifies-position-as-the-enterprise-ai-grc-leader-with-its-spring-2026-release-302814438.html',
        '2026-05-19',
        'corroborating',
        true,
      ),
      src(
        'lg-site',
        'LogicGate',
        'LogicGate Risk Cloud platform and services description',
        'https://www.logicgate.com/',
        '2026-08-05',
        'primary',
      ),
    ],
    lastReviewed: REVIEW_DATE,
    dataConfidence: 'Limited',
    privateStatusVerification: claim(
      'LogicGate remains privately held and independently operating. The company announced its own chief executive transition in April 2026 under its own name, continues to ship platform releases, and no acquisition, registration statement, or exchange listing has been announced.',
      'independently-verified',
      ['lg-ceo', 'lg-cci'],
      false,
    ),
  },
];
