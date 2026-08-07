/**
 * Minimal readers for the two generated artefacts.
 *
 * These deliberately parse the real files rather than trusting a manifest the
 * build script could have written optimistically. A test that only checks a
 * side channel is not checking the artefact.
 */

import { readFileSync, existsSync } from 'node:fs';
import { inflateRawSync, inflateSync } from 'node:zlib';
import { resolve } from 'node:path';

export const ROOT = resolve(__dirname, '..', '..');
export const XLSX_PATH = resolve(ROOT, 'public/downloads/Enterprise Software Growth Capital Model.xlsx');
export const PDF_PATH = resolve(ROOT, 'public/downloads/Enterprise Software Origination and Underwriting Case.pdf');

/* -------------------------------------------------------------------------- */
/* ZIP (xlsx is a zip container)                                              */
/* -------------------------------------------------------------------------- */

interface ZipEntry {
  name: string;
  data: Buffer;
}

/**
 * Read a zip archive by walking the central directory.
 *
 * Only the two compression methods xlsx actually uses are supported: stored (0)
 * and deflate (8). Anything else throws rather than returning silently wrong
 * bytes.
 */
export function readZip(path: string): ZipEntry[] {
  const buf = readFileSync(path);

  // Locate the end-of-central-directory record, scanning back from the tail.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0 && i > buf.length - 66000; i -= 1) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error(`Not a zip archive: ${path}`);

  const count = buf.readUInt16LE(eocd + 10);
  let ptr = buf.readUInt32LE(eocd + 16);
  const entries: ZipEntry[] = [];

  for (let i = 0; i < count; i += 1) {
    if (buf.readUInt32LE(ptr) !== 0x02014b50) break;
    const method = buf.readUInt16LE(ptr + 10);
    const compressedSize = buf.readUInt32LE(ptr + 20);
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const localOffset = buf.readUInt32LE(ptr + 42);
    const name = buf.subarray(ptr + 46, ptr + 46 + nameLen).toString('utf8');

    // Local header: the name and extra field lengths differ from the central one.
    const lNameLen = buf.readUInt16LE(localOffset + 26);
    const lExtraLen = buf.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + lNameLen + lExtraLen;
    const raw = buf.subarray(dataStart, dataStart + compressedSize);

    let data: Buffer;
    if (method === 0) data = Buffer.from(raw);
    else if (method === 8) data = inflateRawSync(raw);
    else throw new Error(`Unsupported zip compression method ${method} for ${name}`);

    entries.push({ name, data });
    ptr += 46 + nameLen + extraLen + commentLen;
  }

  return entries;
}

let xlsxCache: ZipEntry[] | null = null;

export function xlsxEntries(): ZipEntry[] {
  if (!xlsxCache) xlsxCache = readZip(XLSX_PATH);
  return xlsxCache;
}

/** Worksheet names, in workbook order. */
export function xlsxSheetNames(): string[] {
  const wb = xlsxEntries().find((e) => e.name === 'xl/workbook.xml');
  if (!wb) throw new Error('xl/workbook.xml missing from workbook');
  const xml = wb.data.toString('utf8');
  return [...xml.matchAll(/<sheet[^>]*name="([^"]+)"/g)].map((m) =>
    m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'),
  );
}

/** All shared strings plus all inline text, concatenated. */
export function xlsxText(): string {
  const parts: string[] = [];
  xlsxEntries().forEach((e) => {
    if (e.name.startsWith('xl/') && e.name.endsWith('.xml')) {
      parts.push(e.data.toString('utf8'));
    }
  });
  return parts.join('\n');
}

/** Count of cells holding a formula, across all worksheets. */
export function xlsxFormulaCount(): number {
  let n = 0;
  xlsxEntries().forEach((e) => {
    if (/^xl\/worksheets\/sheet\d+\.xml$/.test(e.name)) {
      // Formula elements carry attributes in some writers, so match the tag
      // opening rather than the bare `<f>` form.
      n += (e.data.toString('utf8').match(/<f[ >\/]/g) ?? []).length;
    }
  });
  return n;
}

/* -------------------------------------------------------------------------- */
/* PDF                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Decode an ASCII85 stream. reportlab writes content streams with the filter
 * chain /ASCII85Decode /FlateDecode, so the base85 layer has to come off before
 * the data can be inflated.
 */
function ascii85Decode(input: Buffer): Buffer {
  let s = input.toString('latin1');
  const end = s.indexOf('~>');
  if (end >= 0) s = s.slice(0, end);
  s = s.replace(/\s/g, '');
  if (s.startsWith('<~')) s = s.slice(2);

  const out: number[] = [];
  let tuple = 0;
  let count = 0;

  for (const ch of s) {
    if (ch === 'z' && count === 0) {
      out.push(0, 0, 0, 0);
      continue;
    }
    const v = ch.charCodeAt(0) - 33;
    if (v < 0 || v > 84) continue;
    tuple = tuple * 85 + v;
    count += 1;
    if (count === 5) {
      out.push((tuple >>> 24) & 0xff, (tuple >>> 16) & 0xff, (tuple >>> 8) & 0xff, tuple & 0xff);
      tuple = 0;
      count = 0;
    }
  }
  if (count > 0) {
    for (let i = count; i < 5; i += 1) tuple = tuple * 85 + 84;
    const bytes = [(tuple >>> 24) & 0xff, (tuple >>> 16) & 0xff, (tuple >>> 8) & 0xff, tuple & 0xff];
    out.push(...bytes.slice(0, count - 1));
  }
  return Buffer.from(out);
}

/** Try every decoding path a reportlab content stream might use. */
function decodeStream(raw: Buffer): string {
  const attempts: (() => Buffer)[] = [
    () => inflateSync(ascii85Decode(raw)),
    () => inflateRawSync(ascii85Decode(raw)),
    () => inflateSync(raw),
    () => inflateRawSync(raw),
    () => ascii85Decode(raw),
    () => raw,
  ];
  for (const fn of attempts) {
    try {
      const out = fn();
      if (out.length > 0 && /BT|Tj|TJ|Td/.test(out.toString('latin1'))) {
        return out.toString('latin1');
      }
    } catch {
      // Try the next decoding path.
    }
  }
  return '';
}

/**
 * Extract readable text from a PDF by decoding its content streams and
 * pulling the string literals out of the text-showing operators.
 */
export function pdfText(path = PDF_PATH): string {
  const buf = readFileSync(path);
  const out: string[] = [];

  // Inflate every FlateDecode stream we can, then harvest text operands.
  let idx = 0;
  while (true) {
    const s = buf.indexOf('stream', idx);
    if (s < 0) break;
    let start = s + 6;
    if (buf[start] === 0x0d) start += 1;
    if (buf[start] === 0x0a) start += 1;
    const e = buf.indexOf('endstream', start);
    if (e < 0) break;
    const raw = buf.subarray(start, e);
    const text = decodeStream(raw);
    if (text) {
      for (const m of text.matchAll(/\(((?:\\.|[^\\()])*)\)\s*Tj/g)) {
        out.push(m[1].replace(/\\([()\\])/g, '$1'));
      }
      for (const m of text.matchAll(/\[((?:\\.|[^\]\\])*)\]\s*TJ/g)) {
        for (const p of m[1].matchAll(/\(((?:\\.|[^\\()])*)\)/g)) {
          out.push(p[1].replace(/\\([()\\])/g, '$1'));
        }
      }
    }
    idx = e + 9;
  }

  return out.join(' ').replace(/\s+/g, ' ');
}

export function pdfPageCount(path = PDF_PATH): number {
  const buf = readFileSync(path).toString('latin1');
  const counts = [...buf.matchAll(/\/Type\s*\/Page[^s]/g)];
  return counts.length;
}

export const artifactsExist = () => existsSync(XLSX_PATH) && existsSync(PDF_PATH);
