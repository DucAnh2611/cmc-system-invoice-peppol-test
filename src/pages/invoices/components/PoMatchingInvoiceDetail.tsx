import { FileDown, LoaderCircle, Mail, PencilLine, Trash } from 'lucide-react';
import NotImplement from '../../../components/NotImplement';
import type { Invoice } from '../../../types/invoice';
import { generateMockTable } from '../../../data/mockInvoices';
import InvoiceDetailTable from './InvoiceDetailTable';
import { cn } from '../../../utils/cn';
import { useEffect, useState } from 'react';
import Suspend from '../../../components/Suspend';
import { PdfViewer } from '../../../components/PdfViewer';

interface PoMatchingInvoiceDetailProps {
  invoice: Invoice;
}

interface InvoiceDataRow extends Record<string, unknown> {
  poId: string;
  description: string;
  quantity: number;
  piExclVAT: number;
  piinclVAT: number;
}

interface OrderDataRow extends Record<string, unknown> {
  poId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  orderTotal: number;
}

const PoMatchingInvoiceDetail = ({ invoice }: PoMatchingInvoiceDetailProps) => {
  const [loadingInvoiceData, setLoadingInvoiceData] = useState(true);
  const [loadingOrderData, setLoadingOrderData] = useState(true);

  const [invoiceData, setInvoiceData] = useState<InvoiceDataRow[]>([]);
  const [orderData, setOrderData] = useState<OrderDataRow[]>([]);

  useEffect(() => {
    setLoadingInvoiceData(true);
    setLoadingOrderData(true);

    const timeoutInvoiceDuration = Math.floor(Math.random() * 3000 + 1000);
    const timeoutOrderDuration = Math.floor(Math.random() * 3000 + 1000);

    const timeoutInvoiceData = setTimeout(() => {
      setLoadingInvoiceData(false);
      setInvoiceData(
        generateMockTable<InvoiceDataRow>(10, {
          poId: 'string',
          description: 'string',
          quantity: 'number',
          piExclVAT: 'number',
          piinclVAT: 'number',
        })
      );
    }, timeoutInvoiceDuration);

    const timeoutOrderData = setTimeout(() => {
      setLoadingOrderData(false);
      setOrderData(
        generateMockTable<OrderDataRow>(10, {
          poId: 'string',
          description: 'string',
          quantity: 'number',
          unitPrice: 'number',
          orderTotal: 'number',
        })
      );
    }, timeoutOrderDuration);

    return () => {
      clearTimeout(timeoutInvoiceData);
      clearTimeout(timeoutOrderData);
    };
  }, [invoice]);

  return (
    <div className="w-full h-full flex bg-white">
      <div className="flex-1 flex flex-col gap-4 p-8 overflow-y-auto">
        <div className="flex flex-col gap-8">
          <Suspend
            loading={loadingInvoiceData}
            element={
              <div className="w-full h-full flex items-center justify-center gap-2 bg-gray-100 rounded-md p-3">
                <LoaderCircle size={16} className="text-gray-500 animate-spin" />
                <p className="text-gray-500 text-sm">Loading invoice data...</p>
              </div>
            }
          >
            <InvoiceDetailTable
              title="Invoice data"
              actionBar={
                <NotImplement>
                  <FunctionalButton icon={<PencilLine size={16} />} text="Edit" />
                </NotImplement>
              }
              tables={[
                {
                  name: 'Order #01',
                  cols: [
                    { label: 'PO #', key: 'poId' },
                    { label: 'Description', key: 'description' },
                    { label: 'Quantity', key: 'quantity' },
                    { label: ' PI (excl. VAT)', key: 'piExclVAT' },
                    { label: ' PI (incl. VAT)', key: 'piinclVAT' },
                  ],
                  data: invoiceData,
                },
              ]}
            />
          </Suspend>
          <Suspend
            loading={loadingOrderData}
            element={
              <div className="w-full h-full flex items-center justify-center gap-2 bg-gray-100 rounded-md p-3">
                <LoaderCircle size={16} className="text-gray-500 animate-spin" />
                <p className="text-gray-500 text-sm">Loading order data...</p>
              </div>
            }
          >
            <InvoiceDetailTable
              title="Order data"
              tables={[
                {
                  name: 'Order #01',
                  cols: [
                    { label: 'PO #', key: 'poId' },
                    { label: 'Description', key: 'description' },
                    { label: 'Quantity', key: 'quantity' },
                    { label: 'Unit price', key: 'unitPrice' },
                    { label: 'Order total', key: 'orderTotal' },
                  ],
                  data: orderData,
                },
              ]}
            />
          </Suspend>
        </div>

        <div className="w-full h-px bg-gray-200" />

        <div className="flex justify-between">
          <div className="flex gap-2">
            <NotImplement>
              <FunctionalButton
                icon={<Trash size={16} />}
                text="Delete"
                className="border border-red-300"
              />
            </NotImplement>
            <NotImplement>
              <FunctionalButton
                icon={<Mail size={16} />}
                text="Protest"
                className="border border-amber-300"
              />
            </NotImplement>
          </div>

          <NotImplement>
            <FunctionalButton
              icon={<FileDown size={16} />}
              text="Export"
              className="border border-green-300"
            />
          </NotImplement>
        </div>
      </div>

      <PDFPReviewer invoice={invoice} />
    </div>
  );
};

interface PDFPReviewerProps {
  invoice: Invoice;
}

const PDFPReviewer = ({ invoice }: PDFPReviewerProps) => {
  return (
    <div className="flex-1 overflow-hidden bg-gray-700">
      <PdfViewer url={invoice.pdfUrl} />
    </div>
  );
};

const FunctionalButton = ({
  icon,
  text,
  className,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(
        'flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-150 px-5 py-2.5 rounded-md cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default PoMatchingInvoiceDetail;
