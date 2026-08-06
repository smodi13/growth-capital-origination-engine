/**
 * Artefact and disclosure tests, checks 20 to 24.
 *
 * The Excel workbook and the PDF memorandum are parsed directly rather than
 * trusted through a manifest, because a build script that failed silently would
 * still write a manifest.
 */

import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  PDF_PATH,
  XLSX_PATH,
  pdfPageCount,
  pdfText,
  xlsxFormulaCount,
  xlsxSheetNames,
  xlsxText,
} from './helpers/artifacts';
import { DOWNLOADS, SITE } from '@/lib/site';
import { HYPOTHETICAL_NAME } from '@/data/hypothetical';

const ROOT = resolve(__dirname, '..');

const REQUIRED_SHEETS = [
  'Read Me',
  'Assumptions',
  'Historical Financials',
  'Operating Forecast',
  'SaaS Metrics',
  'Capital Structures',
  'Growth Equity Case',
  'Private Credit Case',
  'Blended Capital Case',
  'Debt Schedule',
  'Returns Analysis',
  'Sensitivities',
  'Downside Case',
  'Sources and Disclosures',
];

/** Pages that present the hypothetical case must carry its disclosure. */
const HYPOTHETICAL_PAGES = [
  'src/app/underwriting/page.tsx',
  'src/app/structures/page.tsx',
];

describe('artefacts', () => {
  it('21. the Excel file exists and contains the required sheets', () => {
    expect(existsSync(XLSX_PATH)).toBe(true);
    expect(statSync(XLSX_PATH).size).toBeGreaterThan(20_000);

    const sheets = xlsxSheetNames();
    expect(sheets).toHaveLength(14);
    REQUIRED_SHEETS.forEach((s) => expect(sheets, `missing sheet ${s}`).toContain(s));
    expect(sheets).toEqual(REQUIRED_SHEETS);
  });

  it('the Excel model is built from formulas rather than hardcoded outputs', () => {
    // A workbook of pasted values would have almost no <f> elements.
    expect(xlsxFormulaCount()).toBeGreaterThan(300);
  });

  it('the Excel workbook carries the illustrative disclosure and no macros', () => {
    const text = xlsxText();
    expect(text).toContain('All figures are hypothetical and illustrative.');
    expect(text).toContain(HYPOTHETICAL_NAME);
    expect(text).toContain('hypothetical company created solely for an illustrative underwriting exercise');

    // No macro parts may exist in the container.
    const raw = readFileSync(XLSX_PATH);
    expect(raw.includes(Buffer.from('vbaProject.bin'))).toBe(false);
    expect(XLSX_PATH.endsWith('.xlsx')).toBe(true);
  });

  it('22. the PDF file exists and contains the required disclosure and sections', () => {
    expect(existsSync(PDF_PATH)).toBe(true);
    expect(statSync(PDF_PATH).size).toBeGreaterThan(10_000);
    expect(readFileSync(PDF_PATH).subarray(0, 5).toString()).toBe('%PDF-');

    const pages = pdfPageCount();
    expect(pages).toBeGreaterThanOrEqual(4);
    expect(pages).toBeLessThanOrEqual(6);

    const text = pdfText();
    expect(text).toContain('Northstar Workflow Systems is hypothetical');
    expect(text).toContain('All operating, financial, and transaction assumptions are illustrative');
    expect(text).toContain('All figures are hypothetical and illustrative');

    [
      'Executive Summary',
      'Company Overview',
      'Market and Product',
      'SaaS Quality',
      'Capital Need',
      'Structure Alternatives',
      'Growth Equity Case',
      'Private Credit Case',
      'Blended Capital Case',
      'Key Risks',
      'Preliminary Recommendation',
      'Additional Diligence Required',
      'Disclosure',
    ].forEach((s) => expect(text, `PDF missing section ${s}`).toContain(s));
  });

  it('the PDF recommends one structure and states where it could be wrong', () => {
    const text = pdfText();
    expect(text).toContain('Recommendation');
    expect(text.toLowerCase()).toContain('blended');
    expect(text).toContain('Where this conclusion could be wrong');
    // The recommendation must engage each balancing consideration.
    ['dilution', 'runway', 'downside', 'flexibility'].forEach((k) =>
      expect(text.toLowerCase(), `PDF must address ${k}`).toContain(k),
    );
  });

  it('20. the hypothetical disclosure appears on every page that presents the case', () => {
    HYPOTHETICAL_PAGES.forEach((p) => {
      const src = readFileSync(resolve(ROOT, p), 'utf8');
      expect(
        src.includes('HYPOTHETICAL_DISCLOSURE') || src.includes('HYPOTHETICAL_LONG_DISCLOSURE'),
        `${p} must render a hypothetical disclosure`,
      ).toBe(true);
    });

    // The homepage links to the case, so it must disclose too.
    const home = readFileSync(resolve(ROOT, 'src/app/page.tsx'), 'utf8');
    expect(home).toContain('HYPOTHETICAL_DISCLOSURE');

    // The about page carries the long form.
    const about = readFileSync(resolve(ROOT, 'src/app/about/page.tsx'), 'utf8');
    expect(about).toContain('HYPOTHETICAL_LONG_DISCLOSURE');
  });

  it('23. download links point at files that exist', () => {
    [DOWNLOADS.model, DOWNLOADS.memo].forEach((d) => {
      expect(d.href.startsWith('/downloads/')).toBe(true);
      const onDisk = resolve(ROOT, 'public', d.href.replace(/^\//, ''));
      expect(existsSync(onDisk), `${d.href} is missing from public/`).toBe(true);
      expect(d.href.endsWith(d.label)).toBe(true);
    });

    // Both artefacts must be the only things in the downloads directory, so a
    // stale file cannot be shipped by accident.
    const files = readdirSync(resolve(ROOT, 'public/downloads')).filter((f) => !f.startsWith('.'));
    expect(files.sort()).toEqual([
      'Enterprise_Software_Growth_Capital_Model.xlsx',
      'Enterprise_Software_Origination_and_Underwriting_Case.pdf',
    ]);
  });

  it('24. the GitHub repository link is present and well formed on the required pages', () => {
    expect(SITE.github).toMatch(/^https:\/\/github\.com\/[\w.-]+\/growth-capital-origination-engine$/);

    const mustLink = [
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'src/app/methodology/page.tsx',
      'src/app/about/page.tsx',
    ];
    mustLink.forEach((p) => {
      const src = readFileSync(resolve(ROOT, p), 'utf8');
      expect(
        src.includes('SITE.github'),
        `${p} must link to the GitHub repository`,
      ).toBe(true);
    });
  });
});
