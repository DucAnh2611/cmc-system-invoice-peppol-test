import { useContext } from 'react';
import { InvoiceTabContext } from '../contexts/InvoiceTabContext';
import type { TInvoiceTab, InvoiceTabItems } from '../types/invoice';

interface UseInvoiceTabReturn {
  selectedTab: TInvoiceTab;
  tabs: InvoiceTabItems[];
  handleChangeTabs: (tabs: InvoiceTabItems[]) => void;
}

export const useInvoiceTab = (): UseInvoiceTabReturn => {
  const { selectedTab, tabs, handleChangeTabs } = useContext(InvoiceTabContext);

  return { selectedTab, tabs, handleChangeTabs };
};
