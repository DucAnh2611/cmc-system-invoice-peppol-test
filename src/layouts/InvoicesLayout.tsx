import { Outlet } from 'react-router-dom';
import InvoicesTabs from '../pages/invoices/components/InvoiceTabs';
import { InvoiceTabProvider } from '../contexts/InvoiceTabContext';
import { useInvoiceTab } from '../hooks/useInvoiceTab';
import { mockInvoiceTabs } from '../data/mockInvoiceTabs';
import { memo, useEffect } from 'react';

const Layout = memo(() => {
  const { handleChangeTabs } = useInvoiceTab();

  useEffect(() => {
    handleChangeTabs(mockInvoiceTabs);
  }, [handleChangeTabs]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-white h-fit">
        <h1 className="text-3xl font-bold my-5 px-8">Incoming PEPPOL invoices</h1>

        <div className="px-8 h-fit w-full border-b border-gray-200">
          <InvoicesTabs />
        </div>
      </div>

      <div className="w-full flex-1 shrink-0 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
});

const InvoicesLayout = () => {
  return (
    <InvoiceTabProvider>
      <Layout />
    </InvoiceTabProvider>
  );
};

export default InvoicesLayout;
