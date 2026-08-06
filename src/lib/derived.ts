import { companies } from '@/data/companies';
import { rankByOriginationScore, scoreOf } from './scoring';
import type { CompanyRecord } from './types';

export function countBy<K extends string>(
  items: CompanyRecord[],
  key: (c: CompanyRecord) => K,
): { label: K; count: number }[] {
  const map = new Map<K, number>();
  items.forEach((c) => {
    const k = key(c);
    map.set(k, (map.get(k) ?? 0) + 1);
  });
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || String(a.label).localeCompare(String(b.label)));
}

export const ranked = rankByOriginationScore(companies);

export const sectorDistribution = countBy(companies, (c) => c.sector);
export const stageDistribution = countBy(companies, (c) => c.financingStage);
export const freshnessDistribution = countBy(companies, (c) => c.signalFreshness);
export const channelDistribution = countBy(companies, (c) => c.discoveryChannel);
export const confidenceDistribution = countBy(companies, (c) => c.dataConfidence);

/**
 * Capital solution distribution: which of the three fit assessments is
 * strongest for each company. Ties resolve toward the more conservative
 * instrument, because claiming a debt lead on a tie would overstate it.
 */
export function leadingCapitalSolution(c: CompanyRecord): 'Growth equity' | 'Private credit' | 'Blended capital' {
  const { equity, debt, blended } = c.capitalFit;
  const max = Math.max(equity.rating, debt.rating, blended.rating);
  if (equity.rating === max) return 'Growth equity';
  if (blended.rating === max) return 'Blended capital';
  return 'Private credit';
}

export const capitalSolutionDistribution = countBy(companies, leadingCapitalSolution);

export const topPriorities = ranked.slice(0, 6);
export const topTen = ranked.slice(0, 10);

export function leadersBy(kind: 'equity' | 'debt' | 'blended', n = 5): CompanyRecord[] {
  return [...companies]
    .sort((a, b) => {
      const d = b.capitalFit[kind].rating - a.capitalFit[kind].rating;
      if (d !== 0) return d;
      return scoreOf(b) - scoreOf(a) || a.name.localeCompare(b.name);
    })
    .slice(0, n);
}

export const totalSources = companies.reduce((s, c) => s + c.sources.length, 0);

export const notDisclosedCount = companies.reduce((s, c) => s + c.missingInformation.length, 0);

/** Formats a 0 to 1 fraction as a percentage string. */
export function pct(n: number, dp = 1): string {
  return `${(n * 100).toFixed(dp)}%`;
}

/** Formats a USD million figure. */
export function usdm(n: number, dp = 1): string {
  return `USD ${n.toFixed(dp)}m`;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  if (!y || !m || !d) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}
