import type { Metadata } from 'next';
import Link from 'next/link';
import { companies } from '@/data/companies';
import { formatDate, totalSources } from '@/lib/derived';
import { NOT_DISCLOSED } from '@/lib/types';
import { DisclosureBanner, PageHeader, Section, StatTile, ExternalLink } from '@/components/primitives';
import { DISCLOSURE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Source registry',
  description:
    'Every source behind every company record, with publisher, publication date, primary or corroborating role, and a flag on press release reproductions.',
};

interface RegistryRow {
  company: string;
  slug: string;
  id: string;
  publisher: string;
  title: string;
  url: string;
  published: string;
  role: 'primary' | 'corroborating';
  isReproduction: boolean;
}

const registry: RegistryRow[] = companies
  .flatMap((c) =>
    c.sources.map((s) => ({
      company: c.name,
      slug: c.slug,
      id: s.id,
      publisher: s.publisher,
      title: s.title,
      url: s.url,
      published: s.published,
      role: s.role,
      isReproduction: Boolean(s.isPressReleaseReproduction),
    })),
  )
  .sort((a, b) => a.company.localeCompare(b.company) || a.role.localeCompare(b.role));

const primaryCount = registry.filter((r) => r.role === 'primary').length;
const corroboratingCount = registry.filter((r) => r.role === 'corroborating').length;
const reproductionCount = registry.filter((r) => r.isReproduction).length;
const publishers = new Set(registry.map((r) => r.publisher)).size;

export default function SourcesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Source registry"
        title={`${totalSources} dated sources across ${companies.length} companies`}
        lede="Every source relied upon anywhere in this project, grouped by company. Primary sources are first party. Corroborating sources are independent publications. Press release reproductions are flagged because reproducing an announcement is not verifying it."
      />

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Total sources" value={String(totalSources)} sub="All linked and dated" />
        <StatTile label="Primary" value={String(primaryCount)} sub="First party company sources" />
        <StatTile label="Corroborating" value={String(corroboratingCount)} sub="Independent publications" />
        <StatTile
          label="Press release reproductions"
          value={String(reproductionCount)}
          sub="Flagged, not counted as verification"
        />
      </section>

      <Section
        title="Registry"
        description={`Sources span ${publishers} distinct publishers. Every company carries at least one primary source and at least one independent corroborating source.`}
      >
        <div className="space-y-6">
          {companies.map((c) => {
            const rows = registry.filter((r) => r.slug === c.slug);
            return (
              <div key={c.slug} className="panel p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <Link href={`/companies/${c.slug}/`} className="text-sm font-semibold text-ink-50 hover:text-accent-300">
                    {c.name}
                  </Link>
                  <p className="text-2xs text-ink-500">
                    {rows.filter((r) => r.role === 'primary').length} primary ·{' '}
                    {rows.filter((r) => r.role === 'corroborating').length} corroborating · last
                    reviewed {formatDate(c.lastReviewed)}
                  </p>
                </div>

                <ul className="mt-3 space-y-2.5">
                  {rows.map((r) => (
                    <li key={`${r.slug}-${r.id}`} className="border-t border-ink-800/60 pt-2.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span
                          className={`rounded border px-1.5 py-0.5 text-2xs font-medium ${
                            r.role === 'primary'
                              ? 'border-accent-600/50 bg-accent-600/15 text-accent-300'
                              : 'border-ink-700 bg-ink-850 text-ink-400'
                          }`}
                        >
                          {r.role === 'primary' ? 'Primary' : 'Corroborating'}
                        </span>
                        {r.isReproduction ? (
                          <span className="rounded border border-amber-800/50 bg-amber-950/30 px-1.5 py-0.5 text-2xs font-medium text-amber-300">
                            Press release reproduction
                          </span>
                        ) : null}
                        <span className="num text-ink-600">
                          {r.published === NOT_DISCLOSED ? 'Undated' : formatDate(r.published)}
                        </span>
                      </div>
                      <p className="mt-1">
                        <ExternalLink href={r.url} className="text-xs font-medium text-accent-300 hover:text-accent-200">
                          {r.title}
                        </ExternalLink>
                      </p>
                      <p className="mt-0.5 text-2xs text-ink-500">{r.publisher}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="What was not relied upon">
        <div className="prose-research max-w-3xl">
          <p>
            No record in this universe rests solely on Crunchbase, a PitchBook summary, LinkedIn, a
            search result snippet, a social media post, or an AI generated summary. Aggregator pages
            surfaced candidates during discovery, and every material claim was then traced to a first
            party announcement or an independent publication before entering a record.
          </p>
          <p>
            Where that trace failed, the claim was dropped rather than downgraded. The clearest case
            is Monte Carlo, where several syndicated sources report a 2025 Series E whose amount and
            valuation are identical to the 2022 Series D. The record holds at the 2022 round, the
            discrepancy is stated on the company page, and resolving it is the first qualification
            question.
          </p>
          <p>
            Third party revenue estimates were also excluded throughout. Several companies here have
            widely circulated ARR estimates on aggregator sites. None is used, because an estimate
            presented alongside disclosed figures would make the disclosed ones less trustworthy.
          </p>
        </div>
      </Section>

      <div className="mt-12">
        <DisclosureBanner>{DISCLOSURE}</DisclosureBanner>
      </div>
    </div>
  );
}
