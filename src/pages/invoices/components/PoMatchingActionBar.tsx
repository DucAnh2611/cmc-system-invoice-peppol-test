import { MessageSquare } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../../../components/Dropdown';
import { SearchInput } from '../../../components/SearchInput';
import { mockInvoiceStatus } from '../../../data/mockInvoices';
import type { Invoice } from '../../../types/invoice';
import NotImplement from '../../../components/NotImplement';

export type TPoMatchingSearch = {
  key: string;
  status: string;
};

interface PoMatchingActionBarProps {
  search: TPoMatchingSearch;
  onSearchChange: (search: TPoMatchingSearch) => void;
  selectedInvoice: Invoice | null;
}

const PoMatchingActionBar = ({
  search,
  onSearchChange,
  selectedInvoice,
}: PoMatchingActionBarProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setSearchParams = useCallback(
    ({ key, status }: TPoMatchingSearch) => {
      searchParams.set('key', key);
      if (status) searchParams.set('status', status);

      navigate(`?${searchParams.toString()}`);
    },
    [navigate, searchParams]
  );

  const handleSearchChange = (search: TPoMatchingSearch) => {
    setSearchParams(search);
  };

  useEffect(() => {
    const key = searchParams.get('key') ?? '';
    const status = searchParams.get('status') ?? '';

    onSearchChange({ key, status });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="w-full h-fit p-5 flex justify-between items-center relative">
      <div className="flex gap-2 flex-1">
        <SearchInput
          value={search.key}
          onChange={value => handleSearchChange({ ...search, key: value })}
          placeholder="Search invoices ..."
        />

        <Dropdown
          selected={search.status || mockInvoiceStatus[0]?.value}
          options={mockInvoiceStatus}
          onSelectionChange={option => handleSearchChange({ ...search, status: option.value })}
        />

        {selectedInvoice && <SelectedInvoice invoice={selectedInvoice} />}
      </div>

      <div className="flex gap-2">
        <NotImplement>
          <button className="px-7 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex gap-2 items-center justify-center font-mediu cursor-pointer">
            <MessageSquare size={16} />
            Notes
          </button>
        </NotImplement>
      </div>
    </div>
  );
};

interface SelectedInvoiceProps {
  invoice: Invoice;
}

const InvoiceBadge = ({
  textColor,
  backgroundColor,
  text,
  className,
}: {
  textColor: string;
  backgroundColor: string;
  text: string;
  className?: string;
}) => {
  return (
    <span
      className={`rounded-md w-fit text-center px-1.5 py-1 text-xs ${textColor} ${backgroundColor} whitespace-nowrap shrink-0 ${className}`}
    >
      {text}
    </span>
  );
};

const SelectedInvoice = ({ invoice }: SelectedInvoiceProps) => {
  return (
    <div className="w-fit flex items-center gap-2">
      <InvoiceBadge
        textColor="text-gray-800"
        backgroundColor="bg-amber-300"
        text={invoice.type}
        className="font-semibold"
      />

      <InvoiceBadge
        textColor="text-white"
        backgroundColor="bg-blue-400"
        className="px-4 font-semibold"
        text={`PEPPOL: ${invoice.id}`}
      />

      <InvoiceBadge
        textColor="text-white"
        backgroundColor="bg-gray-400"
        className="px-4 font-semibold"
        text={invoice.businessCode}
      />

      <InvoiceBadge
        textColor="text-gray-400"
        backgroundColor="bg-transparent"
        className="p-0"
        text={invoice.code}
      />
    </div>
  );
};

export default PoMatchingActionBar;
