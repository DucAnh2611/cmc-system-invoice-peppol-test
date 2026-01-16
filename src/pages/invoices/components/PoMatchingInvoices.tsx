import { useEffect, useMemo, useState } from 'react';
import type { Invoice } from '../../../types/invoice';
import type { TPoMatchingSearch } from './PoMatchingActionBar';
import { generateMockInvoices } from '../../../data/mockInvoices';
import { cn } from '../../../utils/cn';
import { ChevronDown } from 'lucide-react';

interface PoMatchingInvoicesProps {
  search: TPoMatchingSearch;
  selectedInvoice: Invoice | null;
  onSelectInvoice: (invoice: Invoice | null) => void;
}

interface InvoiceSection {
  id: string;
  name: string;
  items: number;
  invoices: Invoice[];
}
const mockInvoices = generateMockInvoices(20);

const PoMatchingInvoices = ({
  search,
  onSelectInvoice,
  selectedInvoice,
}: PoMatchingInvoicesProps) => {
  const [invoices, setInvoices] = useState<InvoiceSection[]>([]);

  const searchInvoices = (search: TPoMatchingSearch) => {
    const filteredInvoices = mockInvoices.map(section => {
      const filteredSectionInvoices = section.invoices.filter(invoice => {
        const matchesKey =
          search.key === '' ||
          invoice.name.toLowerCase().includes(search.key.toLowerCase()) ||
          invoice.businessCode.toLowerCase().includes(search.key.toLowerCase()) ||
          invoice.code.toLowerCase().includes(search.key.toLowerCase());

        const matchesStatus =
          search.status === 'all' ||
          search.status === '' ||
          invoice.status.toLowerCase() === search.status.toLowerCase();

        return matchesKey && matchesStatus;
      });

      return {
        ...section,
        items: filteredSectionInvoices.length,
        invoices: filteredSectionInvoices,
      };
    });

    setInvoices(filteredInvoices);
  };

  useEffect(() => {
    searchInvoices(search);
  }, [search]);

  return (
    <div
      className="w-[300px] h-full overflow-y-auto border-r border-gray-200 bg-white p-3 py-4 flex flex-col gap-3 relative shrink-0"
      role="navigation"
      aria-label="Invoice list"
    >
      {invoices.length === 0 && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md p-3">
          <p className="text-gray-500 text-sm">No invoices found</p>
        </div>
      )}
      {invoices.map(invoice => (
        <InvoiceSections
          key={invoice.id}
          section={invoice}
          onSelectInvoice={onSelectInvoice}
          selectedInvoice={selectedInvoice}
        />
      ))}
    </div>
  );
};

interface InvoiceSectionProps {
  section: InvoiceSection;
  selectedInvoice: Invoice | null;
  onSelectInvoice: (invoice: Invoice | null) => void;
}

const InvoiceSections = ({ section, onSelectInvoice, selectedInvoice }: InvoiceSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-fit w-full flex flex-col gap-2">
      <button
        className="h-fit cursor-pointer rounded-md w-full py-1 bg-gray-300 relative px-3 pr-10 flex items-center justify-start"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={`section-${section.id}`}
        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${section.name} section with ${section.items} items`}
      >
        <span className="text-gray-800 font-bold text-sm text-left text-ellipsis overflow-hidden whitespace-nowrap">
          {section.name}
        </span>
        <span className="ml-1 px-1.5 py-0 rounded-full bg-gray-200 text-gray-500 font-bold text-sm">
          ({section.items})
        </span>

        <ChevronDown
          size={16}
          className={cn(
            'duration-300 absolute right-3 top-1/2 -translate-y-1/2',
            expanded ? 'rotate-180' : 'rotate-0'
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={`section-${section.id}`}
        className={cn(
          'overflow-hidden transition-all duration-300 flex-col gap-2 w-full overflow-y-auto',
          expanded ? 'flex' : 'hidden'
        )}
        role="region"
        aria-label={`${section.name} invoices`}
      >
        {section.invoices.length === 0 && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md p-3">
            <p className="text-gray-500 text-sm">No invoices found</p>
          </div>
        )}

        {section.invoices.length > 0 &&
          section.invoices.map(invoice => (
            <InvoiceItem
              key={invoice.id}
              invoice={invoice}
              selectedInvoice={selectedInvoice}
              onSelectInvoice={onSelectInvoice}
            />
          ))}
      </div>
    </div>
  );
};

interface InvoiceItemProps {
  invoice: Invoice;
  selectedInvoice: Invoice | null;
  onSelectInvoice: (invoice: Invoice | null) => void;
}

const InvoiceItem = ({ invoice, selectedInvoice, onSelectInvoice }: InvoiceItemProps) => {
  const isSelected = useMemo(() => selectedInvoice?.id === invoice.id, [selectedInvoice, invoice]);

  return (
    <div
      className="w-full h-fit shadow-xs"
      onClick={() => onSelectInvoice(isSelected ? null : invoice)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectInvoice(isSelected ? null : invoice);
        }
      }}
      aria-pressed={isSelected}
      aria-label={`${invoice.type} invoice for ${invoice.name}, ${invoice.businessCode}`}
    >
      <div
        className={cn(
          'w-full p-3 py-2 rounded-md cursor-pointer transition-all duration-150 flex gap-2 items-center',
          isSelected ? 'bg-blue-500 hover:bg-blue-600' : 'hover:bg-gray-100'
        )}
      >
        <p className="bg-amber-300 rounded-md w-10 text-center px-1 py-0.5 text-xs text-gray-800 font-semibold shrink-0">
          {invoice.type}
        </p>

        <div className="flex-1">
          <p
            className={cn(
              'text-sm font-bold text-ellipsis overflow-hidden whitespace-nowrap',
              isSelected ? 'text-white' : 'text-gray-800'
            )}
          >
            {invoice.name}
          </p>
          <p
            className={cn(
              'text-[0.7rem] text-ellipsis overflow-hidden whitespace-nowrap',
              isSelected ? 'text-white' : 'text-gray-500'
            )}
          >
            {invoice.businessCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoMatchingInvoices;
