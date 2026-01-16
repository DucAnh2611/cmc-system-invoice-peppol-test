import { useCallback, useEffect, useState } from 'react';
import PoMatchingActionBar, { type TPoMatchingSearch } from './components/PoMatchingActionBar';
import PoMatchingInvoices, { type InvoiceSection } from './components/PoMatchingInvoices';
import type { Invoice } from '../../types/invoice';
import PoMatchingInvoiceDetail from './components/PoMatchingInvoiceDetail';
import { MousePointerClick } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { generateMockInvoices } from '../../data/mockInvoices';

const POMatchingTab = () => {
  const [mockInvoices, setMockInvoices] = useState<InvoiceSection[]>([]);
  const [search, setSearch] = useState<TPoMatchingSearch>({ key: '', status: '' });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<InvoiceSection[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 200);

  const handleChangeSearch = (search: TPoMatchingSearch) => {
    setSearch(search);
    setLoading(true);
  };

  const searchInvoices = useCallback(
    (search: TPoMatchingSearch) => {
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

      const timeoutDuration = Math.floor(Math.random() * 500);

      const timeout = setTimeout(() => {
        setLoading(false);
        setInvoices(filteredInvoices);
      }, timeoutDuration);

      return () => clearTimeout(timeout);
    },
    [mockInvoices]
  );

  useEffect(() => {
    const newMockInvoices = generateMockInvoices(20);

    setMockInvoices(newMockInvoices);
    setInvoices(newMockInvoices);
  }, []);

  useEffect(() => {
    searchInvoices(debouncedSearch);
  }, [debouncedSearch, searchInvoices]);

  return (
    <div className="w-full flex flex-col h-full">
      <PoMatchingActionBar
        search={search}
        onSearchChange={handleChangeSearch}
        selectedInvoice={selectedInvoice}
      />

      <div className="w-full h-px bg-gray-200" />

      <div className="w-full flex-1 shrink-0 basis-0 relative flex overflow-hidden">
        <PoMatchingInvoices
          loading={loading}
          invoices={invoices}
          selectedInvoice={selectedInvoice}
          onSelectInvoice={setSelectedInvoice}
        />

        {selectedInvoice ? (
          <PoMatchingInvoiceDetail invoice={selectedInvoice} />
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 rounded-md p-3">
            <MousePointerClick size={35} className="text-gray-500" />
            <p className="text-gray-500 text-2xl">No invoice selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default POMatchingTab;
