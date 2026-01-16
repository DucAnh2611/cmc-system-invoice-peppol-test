import { useInvoiceTab } from '../../hooks/useInvoiceTab';
import { memo, useEffect } from 'react';
import MasterDataTab from './MasterDataTab';
import POMatchingTab from './POMatchingTab';
import ProtestedTab from './ProtestedTab';
import DeletedTab from './DeletedTab';
import ProcessedTab from './ProcessedTab';

const Page = () => {
  const { selectedTab, tabs } = useInvoiceTab();

  useEffect(() => {
    document.title = `PEPPOL invoices - ${tabs.find(tab => tab.key === selectedTab)?.label}`;
  }, [selectedTab, tabs]);

  return (
    <>
      {selectedTab === 'master-data' && <MasterDataTab />}
      {selectedTab === 'po-matching' && <POMatchingTab />}
      {selectedTab === 'protested' && <ProtestedTab />}
      {selectedTab === 'processed' && <ProcessedTab />}
      {selectedTab === 'deleted' && <DeletedTab />}
    </>
  );
};

const InvoicePage = memo(Page);

export default InvoicePage;
