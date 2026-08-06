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

export const PIPELINE_DISCLOSURE =
  'Pipeline statuses are demonstration workflow data and do not imply actual contact, meetings, or investment activity.';

export const DOWNLOADS = {
  model: {
    href: '/downloads/Enterprise_Software_Growth_Capital_Model.xlsx',
    label: 'Enterprise_Software_Growth_Capital_Model.xlsx',
    title: 'Excel underwriting model',
    description:
      'Fourteen sheets of live formulas covering the ARR bridge, operating forecast, SaaS metrics, three capital structures, debt schedule, returns, sensitivities, and a downside case.',
  },
  memo: {
    href: '/downloads/Enterprise_Software_Origination_and_Underwriting_Case.pdf',
    label: 'Enterprise_Software_Origination_and_Underwriting_Case.pdf',
    title: 'PDF investment memorandum',
    description:
      'A structured memorandum covering the origination framework, the hypothetical SaaS quality assessment, three structure alternatives, key risks, and a preliminary recommendation.',
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
