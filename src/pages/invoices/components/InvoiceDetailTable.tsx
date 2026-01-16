import React from 'react';
import { cn } from '../../../utils/cn';

interface TableData {
  name: string;
  cols: Array<{ label: string; key: string }>;
  data: Array<{ [key: string]: unknown }>;
}

export type TInvoiceDetailTableData = TableData;

interface InvoiceDetailTableProps {
  title: string;
  actionBar?: React.ReactNode;
  tables: TableData[];
  className?: string;
}

const InvoiceDetailTable = ({ title, actionBar, tables, className }: InvoiceDetailTableProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
        <h2 className="flex-1 text-lg font-medium text-gray-900">{title}</h2>
        {actionBar && <div>{actionBar}</div>}
      </div>

      {tables.map((section, idx) => (
        <div key={`${section.name}-${idx}`}>
          <div className="bg-gray-50 font-bold px-4 py-2 border-l-0 border-r-0 border border-gray-300 border-b-0 text-base text-gray-900">
            {section.name}
          </div>
          <div className="border border-l-0 border-r-0 border-gray-300 overflow-hidden bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {section.cols.map(col => (
                    <th
                      key={col.key}
                      className="border-b border border-t-0 first:border-l-0 last:border-r-0 border-gray-300 px-3 py-2 font-bold text-sm text-left text-gray-700"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={section.cols.length}
                      className="text-center py-4 text-gray-500 text-sm"
                    >
                      No data
                    </td>
                  </tr>
                ) : (
                  section.data.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                      {section.cols.map(col => (
                        <td
                          key={col.key}
                          className="border border-b-0 first:border-l-0 last:border-r-0 border-gray-300 px-3 py-2 text-sm text-gray-700"
                        >
                          {row[col.key] != null ? String(row[col.key]) : ''}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceDetailTable;
