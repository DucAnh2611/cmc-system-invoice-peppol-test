import { createContext, useCallback, useEffect, useState } from 'react';
import type { InvoiceTabItems, TInvoiceTab } from '../types/invoice';
import { useLocation } from 'react-router-dom';
import { mockInvoiceTabs } from '../data/mockInvoiceTabs';

export const InvoiceTabContext = createContext<{
  selectedTab: TInvoiceTab;
  tabs: InvoiceTabItems[];
  handleChangeTabs: (tabs: InvoiceTabItems[]) => void;
}>({
  selectedTab: 'master-data',
  tabs: [],
  handleChangeTabs: () => {},
});

export const InvoiceTabProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const [tabs, setTabs] = useState<InvoiceTabItems[]>(mockInvoiceTabs);

  const [selectedTab, setSelectedTab] = useState<TInvoiceTab>((): TInvoiceTab => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('tab') as TInvoiceTab) || tabs[0].key;
  });

  const handleChangeTabs = useCallback((tabs: InvoiceTabItems[]) => {
    setTabs(tabs);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') ?? tabs[0].key;

    if (tab && tab !== selectedTab && tabs.some(t => t.key === tab)) {
      setSelectedTab(tab as TInvoiceTab);
    }
  }, [location.search, selectedTab, tabs]);

  return (
    <InvoiceTabContext.Provider value={{ selectedTab, tabs, handleChangeTabs }}>
      {children}
    </InvoiceTabContext.Provider>
  );
};
