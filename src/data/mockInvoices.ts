import type { Invoice } from '../types/invoice';

interface InvoiceSection {
  id: string;
  name: string;
  items: number;
  invoices: Invoice[];
}

const INVOICE_TYPES = ['INV', 'CM', 'DM', 'PRO', 'CRM', 'DMO', 'CR', 'DB'];
const COMPANY_NAMES = [
  'Acme Corp',
  'Beta Ltd.',
  'Gamma LLC',
  'Delta AG',
  'Epsilon Inc.',
  'Zeta GMBH',
  'Theta GmbH',
  'Eta BV',
  'Iota Co.',
  'Kappa Ltd',
  'Lambda Corp',
  'Mu Inc',
  'Nu LLC',
  'Xi AG',
  'Omicron GmbH',
  'Pi BV',
  'Rho Ltd.',
  'Sigma Corp',
  'Tau Inc.',
  'Upsilon LLC',
];

const PDF_DUMMIES = [
  'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
  'https://www.orimi.com/pdf-test.pdf',
  'https://www.sec.gov/about/forms/form10-k.pdf',
  'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
];

const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateUniqueCode = (usedCodes: Set<string>): string => {
  let code: string;
  do {
    const prefix = generateRandomString(4);
    const type = INVOICE_TYPES[Math.floor(Math.random() * INVOICE_TYPES.length)];
    const number = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, '0');
    code = `${prefix}-${type}-${number}`;
  } while (usedCodes.has(code));
  usedCodes.add(code);
  return code;
};

export const generateMockInvoices = (length: number): InvoiceSection[] => {
  const sections: InvoiceSection[] = [];
  const numberOfInvoices = Math.floor(Math.random() * length);
  const usedCodes = new Set<string>();

  const status = mockInvoiceStatus.filter(s => s.value !== 'all');

  for (let sectionIndex = 0; sectionIndex < numberOfInvoices; sectionIndex++) {
    const invoiceCount = Math.floor(Math.random() * 50);
    const invoices: Invoice[] = [];

    for (let invoiceIndex = 0; invoiceIndex < invoiceCount; invoiceIndex++) {
      const type = INVOICE_TYPES[Math.floor(Math.random() * INVOICE_TYPES.length)];
      const companyName = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
      const businessCodePrefix = companyName
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .substring(0, 6);
      const businessCodeNumber = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0');
      const businessCode = `${businessCodePrefix}-${type}-${businessCodeNumber}`;
      const uniqueCode = generateUniqueCode(usedCodes);

      invoices.push({
        id: `inv-${sectionIndex}-${invoiceIndex + 1}`,
        type,
        name: companyName,
        businessCode,
        code: uniqueCode,
        status: status[Math.floor(Math.random() * status.length)].value,
        pdfUrl: PDF_DUMMIES[Math.floor(Math.random() * PDF_DUMMIES.length)],
      });
    }

    sections.push({
      id: `section-${sectionIndex}`,
      name: `Section ${sectionIndex}`,
      items: invoices.length,
      invoices,
    });
  }

  return sections;
};

const generateTableRandomString = (minLength = 5, maxLength = 15): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateTableRandomNumber = (min = 0, max = 10000): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateMockTable = <T = Record<string, unknown>>(
  length: number,
  schema: Record<keyof T, 'string' | 'number' | 'boolean'>
): T[] => {
  const result: T[] = [];
  const numberOfItems = Math.floor(Math.random() * length);

  for (let i = 0; i < numberOfItems; i++) {
    const row = {} as T;

    for (const [key, type] of Object.entries(schema)) {
      switch (type) {
        case 'string':
          (row as Record<string, unknown>)[key] = generateTableRandomString();
          break;
        case 'number':
          (row as Record<string, unknown>)[key] = generateTableRandomNumber();
          break;
        case 'boolean':
          (row as Record<string, unknown>)[key] = Math.random() > 0.5;
          break;
        default:
          (row as Record<string, unknown>)[key] = null;
      }
    }

    result.push(row);
  }

  return result;
};

export const mockInvoiceStatus: Array<{ label: string; value: string }> = [
  { label: 'All status', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
];
