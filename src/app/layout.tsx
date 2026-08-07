import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { DISCLOSURE, ROUTES, SITE } from '@/lib/site';
import { ExternalLink } from '@/components/primitives';
import { NavBar } from '@/components/NavBar';

export const metadata: Metadata = {
  title: {
    default: SITE.name,
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
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <NavBar routes={ROUTES} />

          <main id="main" className="flex-1">
            {children}
          </main>

          <footer className="mt-24 border-t border-slate-100 bg-ivory-100">
            <div className="mx-auto w-full max-w-[86rem] px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-display text-base font-semibold text-slate-900">{SITE.name}</p>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{SITE.tagline}</p>
                </div>

                <div>
                  <p className="label">Routes</p>
                  <ul className="mt-3.5 space-y-2">
                    {ROUTES.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="text-xs text-slate-600 hover:text-slate-800">
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="label">Work product</p>
                  <ul className="mt-3.5 space-y-2">
                    <li>
                      <a
                        href="/downloads/Enterprise%20Software%20Growth%20Capital%20Model.xlsx"
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        Excel underwriting model
                      </a>
                    </li>
                    <li>
                      <a
                        href="/downloads/Enterprise%20Software%20Origination%20and%20Underwriting%20Case.pdf"
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        PDF investment memorandum
                      </a>
                    </li>
                    <li>
                      <ExternalLink
                        href={SITE.github}
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        Source code on GitHub
                      </ExternalLink>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="label">Built by {SITE.author}</p>
                  <ul className="mt-3.5 space-y-2">
                    <li>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        {SITE.email}
                      </a>
                    </li>
                    <li>
                      <ExternalLink
                        href={SITE.linkedin}
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        LinkedIn
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink
                        href={SITE.github}
                        className="text-xs text-slate-600 hover:text-slate-800"
                      >
                        GitHub repository
                      </ExternalLink>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-12 border-t border-slate-100 pt-7 text-2xs leading-relaxed text-slate-600">
                {DISCLOSURE}
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
