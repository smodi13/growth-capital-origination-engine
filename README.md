# Growth Capital Origination Engine

**Source, qualify, and underwrite B2B software companies.**

An independent growth-capital research platform for identifying enterprise software companies, prioritizing founder outreach, evaluating SaaS quality, and comparing equity, debt, and blended financing structures.

- **Production:** https://growth-capital-origination-engine.vercel.app
- **Repository:** https://github.com/smodi13/growth-capital-origination-engine

---

## Disclosure

This is an independent work sample built by Sahil Modi. It is not affiliated with or endorsed by any investment firm. The private-company universe is based on dated public sources. Missing information is identified as not publicly disclosed. The underwriting case is hypothetical and illustrative and does not represent an actual company or investment recommendation.

---

## Overview

The project demonstrates a complete growth-capital origination workflow, end to end:

1. **Source.** 32 real, privately held, independently operating B2B enterprise software companies, each entering through a specific dated public signal rather than through a ranking of well-known names. The universe splits into 22 benchmark growth companies that calibrate the underwriting reference points and 10 emerging origination targets where a differentiated conversation is more plausible.
2. **Qualify.** Every material claim is classified by provenance before it is used. A transparent 0 to 100 Origination Priority Score is built from nine weighted factors with visible evidence, sources, and reasoning.
3. **Contact.** Executive outreach drafted against each company's actual product, financing history, and publicly visible capital position, with three qualification questions and a defined next diligence step.
4. **Underwrite.** A hypothetical SaaS company modelled end to end across growth equity, private credit, and blended structures, delivered as a live Excel model and a written investment memorandum.

### Why it was built

Growth-capital sourcing is usually presented as a list of companies with scores attached. The interesting problem is the opposite one: deciding what a framework should refuse to conclude when the public record does not support it.

Private companies disclose almost nothing a credit investor needs. This project makes that constraint the centre of the design rather than an inconvenience to work around. Claims that cannot be traced to a dated primary or independent source are classified as not sufficiently supported, and the scoring engine refuses to award them positive weight. Debt suitability is capped by what the evidence can actually carry. Several companies score respectably and still carry a private credit fit of 0 or 1, which is the framework working rather than failing.

Two records are retained deliberately as tests of that standard. Monte Carlo is included because widely syndicated sources report a 2025 financing whose amount and valuation are identical to its 2022 round; the record holds at what a primary source supports and says so. Gladly is included because a modest late-letter round in a category being repriced by AI is a set of facts worth stating plainly rather than screening out.

---

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Overview dashboard: workflow, top six origination priorities, sector, stage, freshness and capital-solution distributions, downloads |
| `/universe` | Origination workstation: saved views, search with highlighted matches, sticky headers, column controls, compact and expanded density, mobile cards, plus the emerging targets section and the exclusion register |
| `/companies/[slug]` | Full company record across eleven sections with sticky in-page navigation: investment snapshot, sourcing signal, private-status verification, evidence with provenance, score breakdown, three capital-fit assessments, underwriting readiness, risks, outreach, missing information, sources |
| `/pipeline` | Browser-local origination pipeline in table or kanban view, with statuses, priorities, notes, next actions, readiness indicators, filtering, sorting and CSV export |
| `/underwriting` | Hypothetical SaaS underwriting case: assumptions, ARR bridge, operating forecast, SaaS metrics, downside case, recommendation |
| `/structures` | Growth equity, private credit and blended capital compared on the same company, with debt schedules, returns and four sensitivities |
| `/compare` | Side-by-side comparison of up to four real private companies across 20 attributes |
| `/methodology` | Discovery, verification, source classification, scoring mechanics, missing-information rules, and the AI-assisted development disclosure |
| `/sources` | Complete source registry grouped by company, with publisher, date, primary or corroborating role, and press-release-reproduction flags |
| `/about` | Project disclosure, data policy, security design, limitations, and contact details |

---

## Architecture

```
src/
  app/                      Next.js App Router pages, one directory per route
  components/               Presentational and interactive components
    NavBar.tsx              Responsive navigation
    UniverseTable.tsx       Origination workstation: presets, search, columns
    PipelineBoard.tsx       localStorage pipeline, table and kanban views
    CompareTool.tsx         Up-to-four company comparison
    ReadinessPanel.tsx      Underwriting readiness, derived from evidence
    SectionNav.tsx          Sticky in-page navigation for long research pages
    CapitalFlowBackground.tsx  Generated SVG hero background, no assets
    motion.tsx              Reveal, count-up, score bar, crossfade, collapse
    primitives.tsx          Badges, panels, disclosure banners, tooltips
  data/
    companies.*.ts          Benchmark records, split by sector cluster
    companies.emerging.ts   Emerging origination targets
    companies.ts            Universe aggregation, classification, exclusions
    hypothetical.ts         Northstar Workflow Systems model, isolated
    helpers.ts              Claim, rating and source constructors
  lib/
    types.ts                Domain types with the disclosure sentinel
    scoring.ts              Origination scoring engine and debt-fit caps
    readiness.ts            Evidence-derived underwriting readiness
    motion.ts               Central motion config and reduced-motion handling
    derived.ts              Distributions and formatting
    site.ts                 Site constants and disclosure strings
scripts/
  build_model.py            Generates the Excel workbook
  build_memo.py             Generates the PDF memorandum
tests/                      Automated integrity, artefact and security tests
public/downloads/           The two generated artefacts
```

**Stack:** Next.js 16 (App Router, static export), React 19, TypeScript (strict), Tailwind CSS 3. Documents are generated locally with openpyxl and reportlab.

---

## Data policy

**What the data contains**

- 32 real, privately held, independently operating B2B enterprise software companies verified against dated public sources: 22 benchmark growth companies and 10 emerging origination targets, held to the same standard.
- Dated, linked sources for every company, each classified as primary or corroborating, with press-release reproductions flagged.
- A provenance classification on every material claim.
- An explicit enumeration on every record of what public sources do not disclose.
- One clearly labelled hypothetical company, used only in the underwriting case, the structure comparison, the Excel model and the PDF.

**What is deliberately absent**

No estimate of ARR, revenue, net retention, gross retention, gross margin, EBITDA, cash burn, runway, valuation, customer concentration, debt balance, covenants, profitability, founder ownership, or exit value for any real company. Where public sources do not disclose something, the record says `Not publicly disclosed` and nothing more.

Missing information reduces data confidence by at most three score points. It never becomes a fabricated negative fact.

---

## Research methodology

Companies enter through a dated origination signal: a financing announcement, a disclosed credit facility, an executive appointment, a product launch, a named enterprise customer win, a market expansion, a regulatory development, or independent analyst research.

**Source classification**

| Class | Definition | Effect on scoring |
| --- | --- | --- |
| Independently verified | First-party fact corroborated by an independent publication or evaluator | Can support any rating |
| Company reported | Stated by the company in a dated announcement | Can support a positive score |
| Investor reported | Stated by an investor; useful for round terms, inherently interested | Can support a positive score, not treated as operating evidence |
| Government reported | Regulatory filing or public procurement record | Can support a positive score |
| Analyst judgment | A conclusion drawn from disclosed facts | Always labelled as opinion |
| Not sufficiently supported | Not established by public sources | **Cannot** support a positive score; the engine forces the rating to zero |

No record rests solely on Crunchbase, a PitchBook summary, LinkedIn, a search snippet, a social post, or an AI-generated summary. A press-release reproduction does not satisfy the independent-corroboration requirement.

**Verification and exclusions**

Candidates that failed verification were removed rather than retained, and none was replaced with a weaker company to preserve a target count. The exclusion register on `/universe` records each one with evidence: Laudio (acquired September 2025), ServiceTitan and Hinge Health (publicly listed), Moveworks (acquired, now a subsidiary), AuditBoard (private-equity owned).

---

## Scoring methodology

The Origination Priority Score is a weighted average of nine coarse 0 to 5 factor ratings on a 0 to 100 scale, plus a capped data-confidence modifier.

| Factor | Weight |
| --- | --- |
| Enterprise software mandate fit | 15% |
| Commercial maturity | 15% |
| Growth quality | 15% |
| Recurring revenue quality | 10% |
| Customer durability | 10% |
| Market attractiveness | 10% |
| Capital efficiency | 10% |
| Capital need and timing | 10% |
| Executive outreach potential | 5% |

Three constraints are enforced in code rather than left to discipline:

1. **The score is a pure function of factor ratings.** Nothing keys off a company name, slug, or list position. Swapping two companies' factor blocks swaps their scores exactly, which an automated test asserts.
2. **Unsupported evidence earns nothing.** Where a factor rests on evidence classified as not sufficiently supported, the engine forces its effective rating to zero and the company page marks it as suppressed.
3. **The confidence modifier is capped at plus or minus three points**, so a well-documented weak company cannot outrank a clearly stronger one on disclosure alone.

**Capital-solution fit** is assessed three times independently, for growth equity, private credit and blended capital, each 0 to 5 and each typed as analyst judgment. Private credit fit is capped by evidence: no usable recurring-revenue evidence caps it at 2; recurring-revenue evidence with no revenue scale or capital-efficiency signal caps it at 3. Only two companies reach the top of the debt ranking, and both because a third-party lender has already underwritten them and disclosed the facility.

---

## Underwriting readiness

Every company carries a readiness status derived from its evidence, never from its identity:

`Insufficient public evidence` → `Outreach worthy` → `Preliminary qualification possible` → `Underwriting data required` → `Potentially underwritable`

The derivation distinguishes a claim that *mentions* a metric from one that *carries* it. A record can state that no retention figure is published, which is useful context and not a disclosed number. Only claims flagged as quantified, backed by provenance that can support a positive conclusion, count.

Each company page shows four panels: what the public record already supports, the thirteen metrics that must come from management, the twelve standard data room materials, and exactly what evidence would move each rating. An automated test asserts that swapping two companies' evidence swaps their readiness.

## Design system

The ground is white. Hierarchy comes from type and rule weight rather than from
stacked dark panels, which is what makes the site read as investment research
rather than as a dashboard.

| Token | Value | Use |
| --- | --- | --- |
| Page and card ground | `#FFFFFF` | Set on `html`, `body`, and `main` |
| Secondary neutral | `#F7F8FA` | Sections that sit back from the page, toolbars, kanban columns |
| Tertiary analytical | `#F2F4F7` | Table header rows, derived-figure grounds |
| Primary text | `#172033` | Headings and body |
| Secondary text | `#667085` | Supporting copy and labels |
| Muted | `#8A94A6` | Rules and decorative marks only, never text |
| Primary accent | `#2F6BB3` | Interactive and structural emphasis |
| Secondary accent | `#347C82` | Analytical highlights |
| Border / strong border | `#E4E7EC` / `#D0D5DD` | Hairlines and dividers |
| Positive | `#287A57` on `#EDF7F2` | Verified evidence, headroom |
| Warning | `#946319` on `#FFF8E7` | Analyst judgment, covenant breach |
| Risk | `#A64444` on `#FFF1F1` | Unsupported evidence, funding shortfall |
| Analyst ground | `#F0F5FB` | Preliminary capital views, selected rows |

Blue is an accent only. It never carries a page, hero, section, table, or
navigation background. Dark navy survives in three places where a dark ground
genuinely helps: the footer, small labels, and a single recommendation banner.
At least 90% of the visible surface on every route is white or neutral light
grey, and an end-to-end test measures that rather than assuming it.

| Layer | Choice |
| --- | --- |
| Type | Editorial serif display for major headlines, system sans for interface copy, monospaced tabular numerals for every financial value |
| Motion | Central config in `src/lib/motion.ts`; entrances 320 to 620ms, stagger at most 85ms, hover travel 2px |

No font is fetched. The display stack resolves to families already installed on the operating system, so the site makes zero network requests of any kind.

The hero background is a generated SVG lattice of capital-flow paths with
low-opacity nodes travelling along them over a white ground. Every stroke sits
below 10% opacity and the radial lighting resolves no darker than `#F7F9FC`, so
the hero stays visibly white. There is no video, image, or remote animation
file. It goes static under `prefers-reduced-motion`, on viewports below 768px,
and when the tab is hidden.

Motion is optional rather than load bearing. `useReducedMotion` returns true during server rendering, so the prerendered HTML is always the finished state: a reader with animation disabled sees identical content immediately, and a reader with JavaScript disabled sees the whole page.

---

## Underwriting model

`Enterprise Software Growth Capital Model.xlsx` underwrites **Northstar Workflow Systems**, a hypothetical B2B enterprise SaaS company with USD 12 million beginning ARR, 30% growth, 110% net revenue retention, 88% gross retention, 78% gross margin, negative EBITDA, and a requirement for approximately USD 20 million of growth capital.

Sixteen sheets: Read Me, IC Summary, Assumptions, Historical Financials, Operating Forecast, SaaS Metrics, Capital Structures, Growth Equity Case, Private Credit Case, Blended Capital Case, Debt Schedule, Returns Analysis, Sensitivities, Downside Case, Model Checks, Sources and Disclosures.

Editable assumptions feed formula-driven operating, capitalization, debt, return, and sensitivity schedules. Inputs are intentionally hardcoded on the Assumptions sheet; the derived outputs are formulas. There are no macros. Change an assumption and the SaaS metrics, debt schedules, returns, sensitivities, and downside case all recalculate. The workbook distinguishes editable assumptions, formula outputs, scenario controls, linked calculations, and integrity checks.

### Capital sizing

The raise is larger than the cumulative operating burn, so the bridge is shown
rather than asserted. Product, sales hiring, international expansion, and
working capital are operating drivers already inside the forecast and are never
counted a second time as separate uses. Acquisition spend is not modelled.

| | USD m |
| --- | --- |
| Base case gross capital required | 16.9 |
| Gross capital raised | 20.0 |
| Base case excess headroom | 3.1 |
| Downside gross capital required | 24.6 |
| Downside funding shortfall | 4.6 |

### The result

A blended structure of USD 8 million primary equity plus a USD 12 million senior
secured recurring-revenue facility dilutes existing holders by 7.7% rather than
17.2%, ends year five with USD 8.1 million of cash, and delivers a 2.54x equity
MOIC at a 20.5% IRR against 2.44x and 19.5% for all equity. The debt investor
IRR is 11.4%. The all-debt structure is rejected on arithmetic: cash breaches
the minimum level in year four.

Existing holders keep USD 243.5 million under the blend against USD 233.8
million under all equity, a difference of **USD 9.7 million**. An earlier draft
stated USD 25 million; that figure applied the dilution difference to a common
exit equity value and ignored the cash and remaining debt each structure
carries, so it overstated the benefit and has been corrected throughout.

The debt is framed as a **recurring-revenue facility, not a conventional
cash-flow loan**. EBITDA is negative through year four and DSCR stays below 1.0x
across the modelled period, so the facility is sized against recurring revenue
durability, the liquidity floor, and contracted base quality rather than
earnings. Contracted ARR, retention, and customer concentration all have to be
confirmed, and refinancing risk at maturity remains material.

### Where the recommendation stops

The 8 / 12 blend maximises base-case returns and does **not** preserve the USD 5
million minimum cash level in the downside case: downside year five cash is USD
0.4 million and the threshold is breached in year four.

| Equity | Debt | Dilution | Base Y5 cash | Downside Y5 cash | Status |
| --- | --- | --- | --- | --- | --- |
| USD 0m | USD 20m | 0.0% | USD 2.9m | USD (4.8)m | FAIL |
| USD 4m | USD 16m | 4.0% | USD 5.5m | USD (2.2)m | FAIL |
| **USD 8m** | **USD 12m** | **7.7%** | **USD 8.1m** | **USD 0.4m** | **BREACH** |
| USD 12m | USD 8m | 11.1% | USD 10.8m | USD 3.1m | BREACH |
| USD 16m | USD 4m | 14.3% | USD 13.4m | USD 5.7m | Headroom |
| USD 20m | USD 0m | 17.2% | USD 16.0m | USD 8.4m | Headroom |

At whole-dollar increments roughly USD 15 million of equity is required to
preserve minimum downside liquidity. At the four-million-dollar steps tested,
the first structure with downside headroom is USD 16 million equity plus USD 4
million debt. That tension is the boundary of the recommendation, and it is
stated on the page rather than buried.

---

## Walkthrough

A 45 to 60 second read of what this is, for someone opening it cold.

> This is an origination engine, so it starts with sourcing rather than with a
> screen. Thirty-two private B2B software companies each entered through one
> specific dated public event: a financing, a disclosed credit facility, an
> executive appointment, a named customer win, or independent analyst research.
> Roughly a third would not surface on a screen ordered by valuation.
>
> The universe splits two ways. Benchmark growth companies calibrate the
> underwriting reference points. Emerging origination targets are the ten
> sourced specifically because a differentiated conversation is plausible there.
> That split is a sourcing classification and nothing else: it is stamped during
> aggregation, never reaches the scoring engine, and several emerging records
> score below the benchmark set. The ordering is left as it falls.
>
> Every company carries an underwriting-readiness level derived from its
> evidence rather than its name. The top level is "potentially underwritable",
> and almost nothing reaches it, because private companies do not publish gross
> margin, retention, burn, or existing leverage. Three hundred and seventy-five
> data gaps are enumerated across the universe rather than estimated around, and
> a claim classified as not sufficiently supported cannot carry positive scoring
> weight. That rule is enforced in code, not by convention. One example: a
> widely repeated ARR figure for one company could not be traced to any primary
> source during the final audit, so it was removed rather than narrowed, and the
> company's credit rating fell from 3 to 1 with it.
>
> Because the public record cannot support a credit view, the underwriting case
> is run on a hypothetical company that is fully disclosed as hypothetical. The
> same USD 20 million is put through growth equity, private credit, and a blend
> against an identical operating forecast, so every difference in outcome is
> caused by the structure. The blend cuts dilution from 17.2% to 7.7% and keeps
> USD 9.7 million more with existing holders.
>
> The part worth reading is where that recommendation stops. The blend does not
> hold the minimum cash level in the downside case; it breaches in year four and
> ends with USD 0.4 million. Preserving downside liquidity takes about USD 15
> million of equity. That is on the page, next to the recommendation, because a
> structure you cannot state the failure condition for is not underwritten.

---

## Installation

```bash
git clone https://github.com/smodi13/growth-capital-origination-engine.git
cd growth-capital-origination-engine
npm install
npm run dev            # http://localhost:3000
```

No environment variables, API keys, database or account are required. `.env.example` contains comments and no assignments, and documents that the expected number of required variables is zero.

## Build commands

```bash
npm run build          # Static export to out/
npm run typecheck      # tsc --noEmit
npm run lint           # ESLint
```

Regenerating the documents requires Python with `openpyxl` and `reportlab`:

```bash
python3 scripts/build_model.py    # Excel workbook
python3 scripts/build_memo.py     # PDF memorandum
```

## Testing

```bash
npm run build          # Required first: several tests inspect out/
npm test               # Vitest, 100 tests
npm run test:e2e       # Chromium: computed styles and rendered pixels
```

Accessibility and performance are verified with axe-core and Lighthouse against the built output at four breakpoints and in both motion modes.

The suite covers 100 checks across five files:

- `tests/integrity.test.ts` (1 to 19) research standards, scoring mechanics, record completeness, outreach tone
- `tests/artifacts.test.ts` (20 to 24) Excel sheets and formula count, PDF sections and disclosures, download links, repository links
- `tests/security.test.ts` (25 to 34) firm names, em dashes, API routes, fetch calls, environment variables, credential patterns, link safety, static rendering, authentication, third-party origins
- `tests/redesign.test.ts` (1 to 20 of the design pass) reduced-motion handling, interaction blocking, keyboard access, navigation at both sizes, background dependencies, third-party requests, console errors, layout overflow, card data, structure-switch integrity, emerging-target verification, classification visibility, evidence-derived readiness, data requirements, pipeline defaults, artefact hashes, link safety, firm names, em dashes, credential absence
- `tests/audit.test.ts` (20 to 26 of the investment-quality audit) measurement dating on every quantified claim, withdrawn figures staying withdrawn, classification neutrality, emerging-target origination angles, the white ground, supplied-file naming, and every underwriting output against the workbook
- `tests/e2e/white-background.mjs` drives Chromium over the export, reads computed styles on `html`, `body`, `main`, and the navigation, scans for any full-width dark or blue surface, and samples the rendered pixels of ten routes at two viewports

The Excel workbook and PDF are parsed directly, including a ZIP reader and an ASCII85 plus Flate PDF stream decoder, rather than trusted through a manifest a failed build could still write.

---

## Security design

| Property | How it is guaranteed |
| --- | --- |
| No API routes | No `app/api` directory, no route handlers, no server actions; asserted by test 27 |
| No environment variables | Nothing reads `process.env` or `import.meta.env`; asserted by test 29 |
| No credentials | No keys, tokens, database URLs or secrets in the tree or in build output; nine credential patterns scanned by test 30 |
| No third-party API calls | No `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource` or `sendBeacon` in the application; asserted by test 28 |
| No database, no login | Pipeline state lives in browser `localStorage`, read through `useSyncExternalStore`; nothing is transmitted |
| No analytics or telemetry | No tracking script on any page; asserted against both source and build output |
| No external resources | Build output loads no script, style, font, or image from another origin; asserted by test 34 |

Runtime dependencies are exactly `next`, `react` and `react-dom`. The motion system is hand written against the platform: `useSyncExternalStore` for media queries and browser storage, `IntersectionObserver` for scroll reveals, and declarative SVG for the background. No animation library is installed.

**Measured results:** Lighthouse performance 96 to 99 and accessibility 100 on desktop, cumulative layout shift 0, total blocking time 0ms, and zero axe-core violations across every route in both normal and reduced motion.

## Static deployment

`next.config.mjs` sets `output: 'export'`, so the build produces a directory of static HTML, CSS and JavaScript with no server runtime. Every route, including all 22 company pages, is prerendered at build time. Viewing the deployed site consumes zero third-party API credits, and the Vercel project has zero environment variables configured.

---

## Limitations

The company records are a snapshot as at 5 August 2026 and will age. Private-company facts change without announcement, and a record accurate on the review date can be wrong a month later.

The scoring framework compresses substantial judgment into coarse ratings. That is deliberate, because a finer scale would imply precision the evidence does not support, but it means small score differences should not be read as meaningful rankings.

No conclusion here is an investment recommendation. The origination score measures whether a company is worth a conversation. The capital-fit ratings describe what the public record can and cannot support. The underwriting case is hypothetical throughout.

---

## Development disclosure

Sahil Modi designed the research framework, scoring logic, underwriting structure, and investment analysis. AI-assisted development tools were used to support coding, research organization, testing, and document production. Every company record and material claim was reviewed against dated public sources.

The tools did not choose which companies enter or leave the universe, set the factors, weights, rating anchors or evidence caps, decide any capital-solution fit rating or the recommended structure, or make an investment decision of any kind.

---

## Contact

Built by **Sahil Modi**

- Email: modi.sahil@gmail.com
- LinkedIn: https://www.linkedin.com/in/sahil-modi-/
- GitHub: https://github.com/smodi13/growth-capital-origination-engine
