import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  render: (row: T) => ReactNode;
  /** Highlights the column visually without relying on colour alone. */
  emphasis?: boolean;
}

export function DataTable<T>({
  columns,
  rows,
  caption,
  minWidth = '48rem',
  rowKey,
  footnote,
}: {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  minWidth?: string;
  rowKey: (row: T, i: number) => string;
  footnote?: string;
}) {
  return (
    <div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
        <table className="w-full border-collapse text-left" style={{ minWidth }}>
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`whitespace-nowrap px-3 py-2 ${c.align === 'right' ? 'text-right' : ''}`}
                >
                  <span className="label">{c.header}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={rowKey(row, i)} className="border-b border-slate-100 align-top">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-3 py-2.5 text-xs ${c.align === 'right' ? 'text-right' : ''} ${
                      c.emphasis ? 'font-semibold text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote ? <p className="mt-2 text-2xs leading-relaxed text-slate-600">{footnote}</p> : null}
    </div>
  );
}
