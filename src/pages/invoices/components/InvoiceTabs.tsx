import { NavLink } from 'react-router-dom';
import { useInvoiceTab } from '../../../hooks/useInvoiceTab';
import { cn } from '../../../utils/cn';

const InvoicesTabs = () => {
  const { selectedTab, tabs } = useInvoiceTab();

  return (
    <div className="w-full h-fit flex">
      {tabs.map(tab => (
        <NavLink
          key={tab.key}
          to={`?tab=${tab.key}`}
          className={cn(
            'px-4 py-2 cursor-pointer translate-y-px text-gray-500 relative block',
            selectedTab === tab.key
              ? 'font-medium text-gray-900 border rounded-tl-md rounded-tr-md border-b-white border-gray-200 bg-white'
              : 'border-b-2 border-transparent'
          )}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default InvoicesTabs;
