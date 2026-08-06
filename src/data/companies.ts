import type { CompanyRecord } from '@/lib/types';
import { dataInfrastructureCompanies } from './companies.data-infrastructure';
import { securityGrcCompanies } from './companies.security-grc';
import { automationFintechCompanies } from './companies.automation-fintech';
import { verticalIndustryCompanies } from './companies.vertical-industry';

/**
 * The real private company sourcing universe.
 *
 * Every record here is a real, independently operating, privately held B2B
 * enterprise software company verified against dated public sources as of the
 * review date. The hypothetical underwriting company lives in a separate module
 * and is deliberately never imported here.
 */
export const companies: CompanyRecord[] = [
  ...dataInfrastructureCompanies,
  ...securityGrcCompanies,
  ...automationFintechCompanies,
  ...verticalIndustryCompanies,
].sort((a, b) => a.name.localeCompare(b.name));

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
    name: 'AuditBoard',
    sector: 'Governance, risk, and compliance',
    reason: 'Private status could not be verified as independent',
    evidence:
      'A strong GRC candidate on product and scale. Excluded because the company was acquired by Hg in 2024 and now operates under private equity ownership rather than as an independently financed private company, which changes both the origination question and the capital structure question this project addresses.',
    sourceUrl: 'https://www.auditboard.com/',
    sourceDate: '2024-05-21',
  },
];
