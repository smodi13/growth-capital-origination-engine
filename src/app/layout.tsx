import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { DISCLOSURE, ROUTES, SITE } from '@/lib/site';
import { ExternalLink } from '@/components/primitives';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <NavBar routes={ROUTES} />

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
            {children}
          </main>

          <footer className="border-t border-ink-800 bg-ink-900/40">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm font-semibold text-ink-100">{SITE.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{SITE.tagline}</p>
                </div>

                <div>
                  <p className="label">Routes</p>
                  <ul className="mt-3 space-y-1.5">
                    {ROUTES.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="text-xs text-ink-400 hover:text-ink-200">
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="label">Downloads</p>
                  <ul className="mt-3 space-y-1.5">
                    <li>
                      <a
                        href="/downloads/Enterprise_Software_Growth_Capital_Model.xlsx"
                        className="text-xs text-ink-400 hover:text-ink-200"
                      >
                        Excel underwriting model
                      </a>
                    </li>
                    <li>
                      <a
                        href="/downloads/Enterprise_Software_Origination_and_Underwriting_Case.pdf"
                        className="text-xs text-ink-400 hover:text-ink-200"
                      >
                        PDF investment memorandum
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="label">Built by {SITE.author}</p>
                  <ul className="mt-3 space-y-1.5">
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-xs text-ink-400 hover:text-ink-200"
                      >
                        {SITE.email}
                      </a>
                    </li>
                    <li>
                      <ExternalLink href={SITE.linkedin} className="text-xs text-ink-400 hover:text-ink-200">
                        LinkedIn
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={SITE.github} className="text-xs text-ink-400 hover:text-ink-200">
                        GitHub repository
                      </ExternalLink>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-10 border-t border-ink-800 pt-6 text-2xs leading-relaxed text-ink-600">
                {DISCLOSURE}
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
