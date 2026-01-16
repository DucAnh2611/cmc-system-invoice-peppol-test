import type { InvoiceTabItems } from '../types/invoice';

export const mockInvoiceTabs: InvoiceTabItems[] = [
  { key: 'master-data', label: 'Master Data' },
  { key: 'po-matching', label: 'PO Matching' },
  { key: 'protested', label: 'Protested' },
  { key: 'processed', label: 'Processed' },
  { key: 'deleted', label: 'Deleted' },
];
