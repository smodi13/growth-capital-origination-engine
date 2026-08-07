/**
 * Security, copy, and static deployment tests, checks 25 to 34.
 *
 * Several of these inspect the production build output in `out/`. They fail
 * loudly rather than skipping when it is absent, because a security assertion
 * that silently does not run is worse than no assertion.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

import { companies, exclusions } from '@/data/companies';
import { ROUTES } from '@/lib/site';

const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'out');
const SRC = resolve(ROOT, 'src');

function walk(dir: string, filter: (p: string) => boolean, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  });
  return acc;
}

const srcFiles = walk(SRC, (p) => /\.(ts|tsx|css)$/.test(p));
const trackedTextFiles = [
  ...srcFiles,
  ...walk(resolve(ROOT, 'scripts'), (p) => /\.py$/.test(p)),
  ...walk(resolve(ROOT, 'tests'), (p) => /\.ts$/.test(p)),
  ...['package.json', 'next.config.mjs', 'tailwind.config.ts', 'tsconfig.json', '.env.example', 'README.md']
    .map((f) => resolve(ROOT, f))
    .filter(existsSync),
];

const outExists = existsSync(OUT);
const outHtml = outExists ? walk(OUT, (p) => p.endsWith('.html')) : [];
const outJs = outExists ? walk(OUT, (p) => p.endsWith('.js')) : [];

/**
 * Firms and employers that must never appear anywhere in the project.
 *
 * These are matched on a word boundary because none of them is an ordinary
 * English word.
 */
const BANNED_NAMES = [
  'Numeta',
  'BMP',
  'Plug and Play',
  'Plug N Play',
  'Magid',
  'Centerfield',
  'K Street',
  'Forester',
  'Matchstick',
  'LDV',
  'Cerberus',
];

/**
 * Firm names that collide with ordinary English words.
 *
 * "Headline" appears legitimately in analytical prose, as in "the headline
 * ratio" or "headline adoption". Banning the bare word would force the copy to
 * avoid a normal word, so only firm-qualified forms are prohibited. That is
 * what an accidental reintroduction would actually look like.
 */
const BANNED_QUALIFIED = [
  /\bHeadline\s+(VC|Ventures|Capital|Partners|Fund)\b/i,
  /\b(at|with|for|joined|from)\s+Headline\b/,
];

describe('secret and credential hygiene', () => {
  it('30. no credential patterns appear in tracked files', () => {
    const patterns: [string, RegExp][] = [
      ['bearer token', /\bBearer\s+[A-Za-z0-9_\-.]{16,}/],
      ['github token', /\bgh[pousr]_[A-Za-z0-9]{20,}/],
      ['aws access key', /\bAKIA[0-9A-Z]{16}\b/],
      ['anthropic key', /\bsk-ant-[A-Za-z0-9_-]{16,}/],
      ['openai key', /\bsk-[A-Za-z0-9]{32,}/],
      ['slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
      ['private key block', /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/],
      ['jwt', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./],
      ['x api bearer', /AAAAAAAAAA[A-Za-z0-9%]{30,}/],
    ];

    const scan = [...trackedTextFiles, ...outJs, ...outHtml];
    scan.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      patterns.forEach(([label, re]) => {
        const m = text.match(re);
        expect(m, `${label} found in ${relative(ROOT, f)}`).toBeNull();
      });
    });
  });

  it('29. no environment variables are required', () => {
    // Nothing in the application may read process.env.
    srcFiles.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      expect(text, `${relative(ROOT, f)} reads process.env`).not.toMatch(/process\.env\./);
      expect(text).not.toMatch(/import\.meta\.env/);
    });

    // .env.example must document the absence: comments only, no assignments.
    const example = readFileSync(resolve(ROOT, '.env.example'), 'utf8');
    example
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((line) => {
        expect(line.startsWith('#'), `.env.example contains a non-comment line: ${line}`).toBe(true);
      });
    expect(example).not.toMatch(/^[A-Z_][A-Z0-9_]*=/m);

    // No real env files may be present.
    ['.env', '.env.local', '.env.production'].forEach((f) =>
      expect(existsSync(resolve(ROOT, f)), `${f} must not exist`).toBe(false),
    );
  });

  it('27. no API routes exist', () => {
    const apiDirs = [
      resolve(ROOT, 'src/app/api'),
      resolve(ROOT, 'src/pages/api'),
      resolve(ROOT, 'pages/api'),
    ];
    apiDirs.forEach((d) => expect(existsSync(d), `${relative(ROOT, d)} must not exist`).toBe(false));

    // Route handlers and server actions are equally disallowed.
    srcFiles.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      expect(text, `${relative(ROOT, f)} defines a route handler`).not.toMatch(
        /export\s+(async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE)\s*\(/,
      );
      expect(text).not.toContain("'use server'");
    });
  });

  it('28. no production fetch or network calls exist in the application', () => {
    const banned: [string, RegExp][] = [
      ['fetch(', /\bfetch\s*\(/],
      ['XMLHttpRequest', /XMLHttpRequest/],
      ['WebSocket', /new\s+WebSocket/],
      ['EventSource', /new\s+EventSource/],
      ['axios', /\baxios\b/],
      ['navigator.sendBeacon', /sendBeacon/],
    ];
    srcFiles.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      banned.forEach(([label, re]) =>
        expect(re.test(text), `${relative(ROOT, f)} uses ${label}`).toBe(false),
      );
    });
  });

  it('the project declares no runtime dependencies beyond the framework', () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
    expect(Object.keys(pkg.dependencies).sort()).toEqual(['next', 'react', 'react-dom']);
    // No database, auth, analytics, or HTTP client anywhere in the tree.
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    ['axios', 'prisma', 'mongoose', 'pg', 'mysql2', 'next-auth', 'firebase', 'posthog-js',
      '@vercel/analytics', 'mixpanel-browser', 'segment', 'twitter-api-v2'].forEach((d) =>
      expect(all[d], `${d} must not be a dependency`).toBeUndefined(),
    );
  });

  it('no analytics or telemetry is embedded', () => {
    const banned = [
      'google-analytics', 'googletagmanager', 'gtag(', 'plausible.io', 'posthog',
      'mixpanel', 'segment.com', 'hotjar', 'fullstory', 'clarity.ms', '@vercel/analytics',
    ];
    const scan = [...srcFiles, ...outHtml, ...outJs];
    scan.forEach((f) => {
      const text = readFileSync(f, 'utf8').toLowerCase();
      banned.forEach((b) =>
        expect(text.includes(b.toLowerCase()), `${relative(ROOT, f)} contains ${b}`).toBe(false),
      );
    });
  });

  it('33. the site requires no authentication', () => {
    srcFiles.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      expect(text).not.toMatch(/next-auth|getServerSession|withAuth|requireAuth/);
    });
    expect(existsSync(resolve(ROOT, 'middleware.ts'))).toBe(false);
    expect(existsSync(resolve(ROOT, 'src/middleware.ts'))).toBe(false);
  });
});

describe('visible copy rules', () => {
  it('25. no employer or investment firm name appears anywhere', () => {
    // The test files themselves hold the ban list, so they are not scanned.
    const scan = [...trackedTextFiles, ...outHtml].filter(
      (f) => !relative(ROOT, f).startsWith('tests'),
    );
    scan.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      BANNED_NAMES.forEach((n) => {
        // Word boundary match so ordinary words are not caught.
        const re = new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        expect(re.test(text), `${relative(ROOT, f)} mentions "${n}"`).toBe(false);
      });
      BANNED_QUALIFIED.forEach((re) => {
        expect(re.test(text), `${relative(ROOT, f)} matches ${re}`).toBe(false);
      });
    });
  });

  it('26. no em dashes appear in visible copy', () => {
    // Em dash and en dash are both excluded from prose to keep the house style.
    const bad = /[—–]/;
    srcFiles.forEach((f) => {
      const text = readFileSync(f, 'utf8');
      const m = text.match(bad);
      expect(m, `${relative(ROOT, f)} contains a dash at index ${text.search(bad)}`).toBeNull();
    });

    if (outExists) {
      outHtml.forEach((f) => {
        const text = readFileSync(f, 'utf8');
        // HTML entities are the other way an em dash could reach the page.
        expect(text.includes('&mdash;'), `${relative(ROOT, f)} contains &mdash;`).toBe(false);
        expect(text.includes('&ndash;'), `${relative(ROOT, f)} contains &ndash;`).toBe(false);
        expect(bad.test(text), `${relative(ROOT, f)} contains an em or en dash`).toBe(false);
      });
    }
  });

  it('31. all external links use safe new tab attributes', () => {
    // In source, every external anchor must go through the ExternalLink helper.
    srcFiles
      .filter((f) => f.endsWith('.tsx'))
      .forEach((f) => {
        const text = readFileSync(f, 'utf8');
        for (const m of text.matchAll(/<a\s[^>]*href=\{?["'`]?https?:/g)) {
          const tag = text.slice(m.index!, text.indexOf('>', m.index!) + 1);
          expect(tag, `${relative(ROOT, f)} raw external anchor`).toContain('target="_blank"');
          expect(tag).toContain('rel="noopener noreferrer"');
        }
      });

    // In the built output, every external anchor must carry both attributes.
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/<a\b[^>]*href="https?:\/\/[^"]*"[^>]*>/g)) {
        const tag = m[0];
        expect(tag, `${relative(ROOT, f)}: ${tag.slice(0, 120)}`).toContain('target="_blank"');
        expect(tag).toMatch(/rel="[^"]*noopener[^"]*"/);
        expect(tag).toMatch(/rel="[^"]*noreferrer[^"]*"/);
      }
    });
  });

  it('the required disclosure text is present verbatim', () => {
    const site = readFileSync(resolve(ROOT, 'src/lib/site.ts'), 'utf8');
    [
      'This is an independent work sample built by Sahil Modi.',
      'It is not affiliated with or endorsed by any investment firm.',
      'Missing information is identified as not publicly disclosed.',
      'Pipeline statuses are demonstration workflow data',
    ].forEach((s) => expect(site).toContain(s));
    expect(site).toContain('modi.sahil@gmail.com');
    expect(site).toContain('https://www.linkedin.com/in/sahil-modi-/');
  });
});

describe('static deployment', () => {
  it('the build is configured for static export with no server runtime', () => {
    const cfg = readFileSync(resolve(ROOT, 'next.config.mjs'), 'utf8');
    expect(cfg).toContain("output: 'export'");
    expect(cfg).toContain('unoptimized: true');
  });

  it('34. the built output contains no third party origins', () => {
    expect(outExists, 'run `npm run build` before the security suite').toBe(true);

    const allowedHosts = [
      'github.com', 'www.linkedin.com', 'cribl.io', 'grafana.com', 'www.sigmacomputing.com',
      'montecarlo.ai', 'www.montecarlodata.com', 'www.cyera.com', 'www.chainguard.dev',
      'torq.io', 'www.vanta.com', 'www.logicgate.com', 'www.harness.io', 'www.workato.com',
      'www.tines.com', 'zip.com', 'www.moderntreasury.com', 'highnote.com', 'www.clio.com',
      'www.project44.com', 'www.commure.com', 'www.qventus.com', 'altana.ai', 'www.shippeo.com',
      'www.gladly.com',
    ];

    // Anchor hrefs are fine, they are user initiated. What must not exist is any
    // resource the browser loads automatically from another origin.
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*>/g)) {
        const tag = m[0];
        const url = tag.match(/(?:src|href)="(https?:\/\/[^"]+)"/);
        if (url) {
          throw new Error(
            `${relative(ROOT, f)} loads an external resource: ${url[1]}`,
          );
        }
      }
      // No preconnect or dns-prefetch hints to third parties either.
      expect(html).not.toMatch(/rel="(preconnect|dns-prefetch)"/);
    });

    // Sanity: the allow list documents which external hosts appear as links.
    const hosts = new Set<string>();
    outHtml.forEach((f) => {
      const html = readFileSync(f, 'utf8');
      for (const m of html.matchAll(/href="https?:\/\/([^/"]+)/g)) hosts.add(m[1]);
    });
    hosts.forEach((h) => {
      const known = allowedHosts.includes(h) ||
        companies.some((c) => c.sources.some((s) => s.url.includes(h))) ||
        exclusions.some((e) => e.sourceUrl.includes(h)) ||
        c_website_hosts.has(h);
      expect(known, `unexpected external host in output: ${h}`).toBe(true);
    });
  });

  it('32. every route renders to a static HTML file', () => {
    expect(outExists, 'run `npm run build` before the security suite').toBe(true);

    ROUTES.forEach((r) => {
      const p = r.href === '/' ? 'index.html' : `${r.href.replace(/^\//, '')}/index.html`;
      expect(existsSync(resolve(OUT, p)), `missing static page for ${r.href}`).toBe(true);
    });

    companies.forEach((c) => {
      const p = resolve(OUT, 'companies', c.slug, 'index.html');
      expect(existsSync(p), `missing static page for /companies/${c.slug}`).toBe(true);
      const html = readFileSync(p, 'utf8');
      expect(html).toContain(c.name);
      expect(html.length).toBeGreaterThan(10_000);
    });

    // The downloads must be copied into the deployable output.
    ['Enterprise Software Growth Capital Model.xlsx',
      'Enterprise Software Origination and Underwriting Case.pdf'].forEach((f) => {
      const p = resolve(OUT, 'downloads', f);
      expect(existsSync(p), `${f} missing from build output`).toBe(true);
      expect(statSync(p).size).toBeGreaterThan(10_000);
    });
  });

  it('the build output contains no server bundle', () => {
    expect(outExists).toBe(true);
    ['app', 'server', 'api'].forEach((d) => {
      const p = resolve(OUT, d);
      if (existsSync(p)) {
        // A directory named app is fine only if it holds html, not handlers.
        const handlers = walk(p, (x) => /\.(mjs|cjs)$/.test(x));
        expect(handlers, `${d}/ contains server modules`).toEqual([]);
      }
    });
  });
});

/** Hosts of the official company websites in the universe. */
const c_website_hosts = new Set(
  companies.map((c) => new URL(c.website).host),
);
