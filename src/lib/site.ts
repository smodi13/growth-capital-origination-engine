export const SITE = {
  name: 'Growth Capital Origination Engine',
  tagline: 'Source, qualify, and underwrite B2B software companies.',
  description:
    'An independent growth-capital research platform for identifying enterprise software companies, prioritizing founder outreach, evaluating SaaS quality, and comparing equity, debt, and blended financing structures.',
  author: 'Sahil Modi',
  email: 'modi.sahil@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sahil-modi-/',
  github: 'https://github.com/smodi13/growth-capital-origination-engine',
} as const;

export const DISCLOSURE =
  'This is an independent work sample built by Sahil Modi. It is not affiliated with or endorsed by any investment firm. The private-company universe is based on dated public sources. Missing information is identified as not publicly disclosed. The underwriting case is hypothetical and illustrative and does not represent an actual company or investment recommendation.';

export const DEVELOPMENT_DISCLOSURE =
  'Sahil Modi designed the research framework, scoring logic, underwriting structure, and investment analysis. AI-assisted development tools were used to support coding, research organization, testing, and document production. Every company record and material claim was reviewed against dated public sources.';

/**
 * What the emerging classification does and does not mean.
 *
 * Held as a single constant because it appears verbatim on the universe page,
 * the homepage priority section, the methodology page, and the classification
 * badge on every company page. A test asserts all four render this exact text,
 * so the four surfaces cannot drift into saying four different things.
 */
export const CLASSIFICATION_NOTE =
  'Emerging targets are selected for origination relevance and timeliness. The classification does not increase their investment score or imply stronger publicly observable fundamentals than established benchmark companies.';

export const PIPELINE_DISCLOSURE =
  'Pipeline statuses are demonstration workflow data and do not imply actual contact, meetings, or investment activity.';

/**
 * The two downloadable work products.
 *
 * The files on disk carry spaces in their names, so `href` is percent-encoded
 * for the URL while `label` stays exactly as the file is named. Those two must
 * not be conflated: a reader saving the file should see the same name the
 * repository holds, and a browser requesting it needs the encoded form.
 */
export const DOWNLOADS = {
  model: {
    href: '/downloads/Enterprise%20Software%20Growth%20Capital%20Model.xlsx',
    label: 'Enterprise Software Growth Capital Model.xlsx',
    title: 'Excel underwriting model',
    description:
      'A formula-driven SaaS growth-capital model covering the ARR bridge, operating forecast, SaaS metrics, capital sizing, growth equity, recurring-revenue credit, blended capital, debt schedules, returns, sensitivities, downside analysis, and model-control checks.',
  },
  memo: {
    href: '/downloads/Enterprise%20Software%20Origination%20and%20Underwriting%20Case.pdf',
    label: 'Enterprise Software Origination and Underwriting Case.pdf',
    title: 'PDF investment memorandum',
    description:
      'A six-page underwriting memorandum covering the operating case, SaaS quality, capital sizing, structure economics, existing-holder value, downside sensitivity, key risks, and additional diligence.',
  },
} as const;

export const ROUTES = [
  { href: '/', label: 'Overview' },
  { href: '/universe', label: 'Universe' },
  { href: '/pipeline', label: 'Pipeline' },
  { href: '/compare', label: 'Compare' },
  { href: '/underwriting', label: 'Underwriting' },
  { href: '/structures', label: 'Structures' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/sources', label: 'Sources' },
  { href: '/about', label: 'About' },
] as const;
