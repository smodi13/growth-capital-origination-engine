import type { CompanyClassification, CompanyInput, CompanyRecord } from '@/lib/types';
import { dataInfrastructureCompanies } from './companies.data-infrastructure';
import { securityGrcCompanies } from './companies.security-grc';
import { automationFintechCompanies } from './companies.automation-fintech';
import { verticalIndustryCompanies } from './companies.vertical-industry';
import { emergingCompanies } from './companies.emerging';

/**
 * Stamp a sourcing classification onto a set of records.
 *
 * Classification is applied here rather than authored per record, so an
 * individual company cannot assign its own label and the classification can
 * never leak into the scoring inputs.
 */
function classify(
  records: CompanyInput[],
  classification: CompanyClassification,
): CompanyRecord[] {
  return records.map((r) => ({ ...r, classification }));
}

/**
 * The real private company sourcing universe.
 *
 * Every record here is a real, independently operating, privately held B2B
 * enterprise software company verified against dated public sources as of the
 * review date. The hypothetical underwriting company lives in a separate module
 * and is deliberately never imported here.
 *
 * The universe holds two sourcing classifications. Benchmark growth companies
 * calibrate what a mature private software business looks like and provide the
 * underwriting reference points. Emerging origination targets are where a
 * differentiated conversation is more plausible. Neither classification affects
 * the score.
 */
export const companies: CompanyRecord[] = [
  ...classify(dataInfrastructureCompanies, 'Benchmark growth company'),
  ...classify(securityGrcCompanies, 'Benchmark growth company'),
  ...classify(automationFintechCompanies, 'Benchmark growth company'),
  ...classify(verticalIndustryCompanies, 'Benchmark growth company'),
  ...classify(emergingCompanies, 'Emerging origination target'),
].sort((a, b) => a.name.localeCompare(b.name));

export const benchmarkCompanies = companies.filter(
  (c) => c.classification === 'Benchmark growth company',
);
export const emergingTargets = companies.filter(
  (c) => c.classification === 'Emerging origination target',
);

export function getCompany(slug: string): CompanyRecord | undefined {
  return companies.find((c) => c.slug === slug);
}

export const companySlugs = companies.map((c) => c.slug);

/**
 * Companies researched and then removed from the universe, with the reason.
 *
 * Recording exclusions matters as much as recording inclusions: it shows the
 * verification step actually rejected candidates rather than rubber stamping a
 * target count.
 */
export interface ExclusionRecord {
  name: string;
  sector: string;
  reason: string;
  evidence: string;
  sourceUrl: string;
  sourceDate: string;
}

export const exclusions: ExclusionRecord[] = [
  {
    name: 'Laudio',
    sector: 'Healthcare enterprise software',
    reason: 'No longer independently operating',
    evidence:
      'Researched as a less obvious healthcare workforce management candidate on the strength of its 2023 Series B. Verification found that Ascend Learning announced its acquisition of Laudio on 9 September 2025, so the company is no longer independently operating and fails the private status test.',
    sourceUrl:
      'https://laudio.com/press-releases-media/ascend-learning-acquires-laudio-to-accelerate-innovation-in-frontline-healthcare-leadership',
    sourceDate: '2025-09-09',
  },
  {
    name: 'ServiceTitan',
    sector: 'Vertical SaaS',
    reason: 'Publicly listed',
    evidence:
      'An obvious vertical SaaS candidate on product and scale, excluded because the company completed an initial public offering in December 2024 and is now listed. Public companies are outside the mandate of a private company sourcing universe.',
    sourceUrl: 'https://www.servicetitan.com/',
    sourceDate: '2024-12-12',
  },
  {
    name: 'Moveworks',
    sector: 'AI-enabled enterprise applications',
    reason: 'No longer independently operating',
    evidence:
      'Considered as an AI enabled enterprise application candidate, excluded because ServiceNow announced its acquisition of Moveworks in March 2025. The company is now a subsidiary rather than an independent private company.',
    sourceUrl: 'https://www.servicenow.com/',
    sourceDate: '2025-03-10',
  },
  {
    name: 'Hinge Health',
    sector: 'Healthcare enterprise software',
    reason: 'Publicly listed',
    evidence:
      'Reviewed as a healthcare enterprise candidate and excluded because the company completed an initial public offering in 2025 and now trades publicly.',
    sourceUrl: 'https://www.hingehealth.com/',
    sourceDate: '2025-05-22',
  },
  {
    name: 'Metronome',
    sector: 'Financial technology infrastructure',
    reason: 'No longer independently operating',
    evidence:
      'Researched as an emerging origination target on the strength of its USD 50 million Series C in February 2025 and its usage based billing position with AI infrastructure customers. Verification found that Stripe acquired the company, so it is no longer independently operating and fails the private status test.',
    sourceUrl:
      'https://www.thisweekinfintech.com/p/stripe-acquires-usage-based-billing-software-startup-metronome',
    sourceDate: '2025-11-19',
  },
  {
    name: 'Rootly',
    sector: 'Enterprise infrastructure software',
    reason: 'Below the commercial maturity threshold',
    evidence:
      'Researched as an emerging incident management candidate alongside incident.io. Excluded because the most recent disclosed financing is a USD 12 million Series A and total disclosed funding is approximately USD 15 million, which sits below the Series B or later commercial maturity bar this universe applies. It was not added to increase the count.',
    sourceUrl:
      'https://rootly.com/blog/rootly-raises-12-million-from-renegade-partners-google-gradient-ventures-xyz-ventures',
    sourceDate: '2023-08-10',
  },
  {
    name: 'AuditBoard',
    sector: 'Governance, risk, and compliance',
    reason: 'Private status could not be verified as independent',
    evidence:
      'A strong GRC candidate on product and scale. Excluded because the company was acquired by Hg in 2024 and now operates under private equity ownership rather than as an independently financed private company, which changes both the origination question and the capital structure question this project addresses.',
    sourceUrl: 'https://www.auditboard.com/',
    sourceDate: '2024-05-21',
  },
];
