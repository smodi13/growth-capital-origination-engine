import type { Metadata } from 'next';
import { companies } from '@/data/companies';
import { totalSources } from '@/lib/derived';
import { DisclosureBanner, ExternalLink, PageHeader, Section, PageShell} from '@/components/primitives';
import { DEVELOPMENT_DISCLOSURE, DISCLOSURE, DOWNLOADS, SITE } from '@/lib/site';
import { HYPOTHETICAL_LONG_DISCLOSURE } from '@/data/hypothetical';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Project disclosure, data policy, security design, and contact details for the Growth Capital Origination Engine.',
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About this project"
        title={SITE.name}
        lede={SITE.description}
      />

      <Section title="Disclosure">
        <div className="panel p-5">
          <p className="text-sm leading-relaxed text-slate-800">{DISCLOSURE}</p>
        </div>
      </Section>

      <Section title="Built by Sahil Modi">
        <div className="panel p-5">
          <p className="text-sm leading-relaxed text-slate-700">
            I built this to demonstrate how I would source, qualify, contact, and underwrite B2B
            enterprise software companies for a growth equity or private credit team. The research
            framework, the scoring logic, the evidence rules, the underwriting structure, and the
            investment analysis are mine. The interesting work was not assembling a list of
            companies; it was deciding what the framework should refuse to conclude when the public
            record does not support it.
          </p>

          <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
            <div>
              <p className="label">Email</p>
              <p className="mt-1.5 text-sm">
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
              </p>
            </div>
            <div>
              <p className="label">LinkedIn</p>
              <p className="mt-1.5 text-sm">
                <ExternalLink href={SITE.linkedin}>sahil-modi-</ExternalLink>
              </p>
            </div>
            <div>
              <p className="label">GitHub repository</p>
              <p className="mt-1.5 break-words text-sm">
                <ExternalLink href={SITE.github}>growth-capital-origination-engine</ExternalLink>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Downloads" description="Both artefacts are static files committed to the repository.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[DOWNLOADS.model, DOWNLOADS.memo].map((d) => (
            <a key={d.href} href={d.href} className="panel block min-w-0 p-4 transition-colors hover:border-slate-100 hover:bg-ivory-100">
              <p className="text-sm font-semibold text-slate-900">{d.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{d.description}</p>
              <p className="num mt-3 break-all text-cobalt-600">{d.label}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section title="Data policy">
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="panel p-4">
            <p className="text-sm font-semibold text-slate-800">What is in the data</p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
              <li>
                {companies.length} real, privately held, independently operating B2B enterprise
                software companies, verified as at 5 August 2026.
              </li>
              <li>
                {totalSources} dated sources, each linked, each classified as primary or
                corroborating, with press release reproductions flagged.
              </li>
              <li>
                A provenance classification on every material claim, and an explicit list on every
                record of what public sources do not disclose.
              </li>
              <li>
                One clearly labelled hypothetical company, used only in the underwriting case, the
                structure comparison, the Excel model, and the PDF memorandum.
              </li>
            </ul>
          </div>

          <div className="panel p-4">
            <p className="text-sm font-semibold text-slate-800">What is deliberately absent</p>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600">
              <li>
                No estimated ARR, revenue, retention, gross margin, EBITDA, burn, runway, valuation,
                customer concentration, debt balance, covenants, profitability, founder ownership, or
                exit value.
              </li>
              <li>
                No fictional company anywhere in the sourcing universe, and no real company anywhere
                in the underwriting case.
              </li>
              <li>
                No claim classified as not sufficiently supported used as positive scoring evidence.
              </li>
              <li>
                No pipeline record defaulting to a contacted, meeting, or diligence status.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Security and privacy design" description="The site is fully static by construction rather than by configuration.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'No API routes', b: 'The application has no server endpoints. It builds to a static export, so there is no request handler to reach.' },
            { t: 'No environment variables', b: 'Nothing is read from the environment at build time or run time. The .env.example file contains comments and no assignments.' },
            { t: 'No credentials of any kind', b: 'No API keys, bearer tokens, database URLs, or authentication secrets exist in the repository, the git history, or the build output.' },
            { t: 'No third party API calls', b: 'Viewing the deployed site consumes zero external API credits. There is no live data fetching in production.' },
            { t: 'No database and no login', b: 'Pipeline state lives in browser localStorage. Nothing is transmitted, stored remotely, or associated with a person.' },
            { t: 'No analytics or telemetry', b: 'No visitor data is collected or transmitted. There is no tracking script on any page.' },
          ].map((x) => (
            <div key={x.t} className="panel p-4">
              <p className="text-sm font-semibold text-slate-800">{x.t}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{x.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-600">
          Each of these properties is asserted by an automated test that inspects the source tree and
          the production build output, so a future change that violated one would fail the test
          suite rather than reach deployment quietly.
        </p>
      </Section>

      <Section title="Development disclosure">
        <div className="panel p-5">
          <p className="text-sm leading-relaxed text-slate-800">{DEVELOPMENT_DISCLOSURE}</p>
        </div>
      </Section>

      <Section title="Limitations">
        <div className="prose-research max-w-3xl">
          <p>
            This is a research artefact, not a live product. The company records are a snapshot as at
            5 August 2026 and will age. Private company facts change without announcement, and a
            record that was accurate on the review date can be wrong a month later.
          </p>
          <p>
            The scoring framework compresses a great deal of judgment into coarse ratings. That is
            deliberate, because a finer scale would imply a precision the underlying evidence does
            not support, but it means small differences in score should not be read as meaningful
            rankings.
          </p>
          <p>
            Most importantly, no conclusion here is an investment recommendation. The origination
            score measures whether a company is worth a conversation. The capital fit ratings
            describe what the public record can and cannot support. The underwriting case is
            hypothetical throughout.
          </p>
        </div>
      </Section>

      <div className="mt-12 space-y-3">
        <DisclosureBanner tone="warning">{HYPOTHETICAL_LONG_DISCLOSURE}</DisclosureBanner>
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </PageShell>
  );
}
