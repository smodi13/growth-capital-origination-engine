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

1. **Source.** 22 real, privately held, independently operating B2B enterprise software companies, each entering through a specific dated public signal rather than through a ranking of well-known names.
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
| `/universe` | The full sourcing universe as a sortable, filterable table, plus researched-and-excluded companies with evidence |
| `/companies/[slug]` | Full company record: snapshot, private-status verification, origination signal, evidence with provenance, full score breakdown, three capital-fit assessments, risks, outreach, missing information, sources |
| `/pipeline` | Browser-local origination pipeline with statuses, priorities, notes, next actions, filtering, sorting and CSV export |
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
    UniverseTable.tsx       Sortable and filterable universe table
    PipelineBoard.tsx       localStorage pipeline with CSV export
    CompareTool.tsx         Up-to-four company comparison
    primitives.tsx          Badges, tables, panels, disclosure banners
  data/
    companies.*.ts          Company records, split by sector cluster
    companies.ts            Universe aggregation and exclusion register
    hypothetical.ts         Northstar Workflow Systems model, isolated
    helpers.ts              Claim, rating and source constructors
  lib/
    types.ts                Domain types with the disclosure sentinel
    scoring.ts              Origination scoring engine and debt-fit caps
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

- 22 real, privately held, independently operating B2B enterprise software companies, verified as at 5 August 2026.
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

## Underwriting model

`Enterprise_Software_Growth_Capital_Model.xlsx` underwrites **Northstar Workflow Systems**, a hypothetical B2B enterprise SaaS company with USD 12 million beginning ARR, 30% growth, 110% net revenue retention, 88% gross retention, 78% gross margin, negative EBITDA, and a requirement for approximately USD 20 million of growth capital.

Fourteen sheets: Read Me, Assumptions, Historical Financials, Operating Forecast, SaaS Metrics, Capital Structures, Growth Equity Case, Private Credit Case, Blended Capital Case, Debt Schedule, Returns Analysis, Sensitivities, Downside Case, Sources and Disclosures.

Every input is an editable amber cell on the Assumptions sheet, and every output is a live formula. There are no macros and no hardcoded results. Change an assumption and the SaaS metrics, debt schedules, returns, sensitivities and downside case all recalculate.

**The result:** a blended structure of USD 8 million equity plus a USD 12 million senior secured facility dilutes existing holders by 7.7% rather than 17.2%, never breaches the minimum cash covenant, and delivers a higher equity MOIC (2.54x against 2.44x). The all-debt structure is rejected on arithmetic: interest coverage stays negative until year five and cash breaches the covenant in year four. In the downside case the blended structure survives only narrowly, which the memorandum states as the boundary of the recommendation rather than a footnote to it.

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
npm test               # Vitest
```

The suite covers 34 numbered checks across three files:

- `tests/integrity.test.ts` (1 to 19) research standards, scoring mechanics, record completeness, outreach tone
- `tests/artifacts.test.ts` (20 to 24) Excel sheets and formula count, PDF sections and disclosures, download links, repository links
- `tests/security.test.ts` (25 to 34) firm names, em dashes, API routes, fetch calls, environment variables, credential patterns, link safety, static rendering, authentication, third-party origins

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

Runtime dependencies are exactly `next`, `react` and `react-dom`.

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
