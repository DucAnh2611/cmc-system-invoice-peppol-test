import { useState } from 'react';
import PoMatchingActionBar, { type TPoMatchingSearch } from './components/PoMatchingActionBar';
import PoMatchingInvoices from './components/PoMatchingInvoices';
import type { Invoice } from '../../types/invoice';
import PoMatchingInvoiceDetail from './components/PoMatchingInvoiceDetail';
import { MousePointerClick } from 'lucide-react';

const POMatchingTab = () => {
  const [search, setSearch] = useState<TPoMatchingSearch>({ key: '', status: '' });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <div className="w-full flex flex-col h-full">
      <PoMatchingActionBar
        search={search}
        onSearchChange={setSearch}
        selectedInvoice={selectedInvoice}
      />

      <div className="w-full h-px bg-gray-200" />

      <div className="w-full flex-1 shrink-0 basis-0 relative flex overflow-hidden">
        <PoMatchingInvoices
          search={search}
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
