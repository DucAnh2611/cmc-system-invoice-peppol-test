export interface Invoice {
  id: string;
  type: string;
  name: string;
  businessCode: string;
  code: string;
  status: string;
  pdfUrl: string;
}

export type TInvoiceTab = 'master-data' | 'po-matching' | 'protested' | 'processed' | 'deleted';

export type InvoiceTabItems = {
  key: TInvoiceTab;
  label: string;
};
