import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FileText, type LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useEffect } from 'react';

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [{ to: '/invoices', icon: FileText, label: 'PEPPOL Invoices' }];

const findNavItemByPath = (
  items: NavItem[],
  path: string,
  parentPath: string = ''
): NavItem | null => {
  for (const item of items) {
    const fullPath = item.to.startsWith('/') ? item.to : `${parentPath}${item.to}`;

    if (fullPath === path) {
      return item;
    }

    if (item.children) {
      const found = findNavItemByPath(item.children, path, fullPath);
      if (found) return found;
    }
  }
  return null;
};

const renderNavItem = (
  item: NavItem,
  depth: number = 0,
  parentPath: string = ''
): React.ReactNode => {
  const fullPath = item.to.startsWith('/') ? item.to : `${parentPath}${item.to}`;

  return (
    <li key={fullPath}>
      <NavLink
        to={fullPath}
        className={({ isActive }) =>
          cn(
            'flex flex-col justify-center items-center gap-1 px-4 py-4 transition-colors relative',
            isActive
              ? 'bg-blue-100 text-blue-600 font-medium before:content-[""] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-blue-500'
              : 'text-gray-700 hover:bg-gray-100',
            depth > 0 && 'pl-8'
          )
        }
      >
        <item.icon size={20} />
        <span className="font-medium">{item.label}</span>
      </NavLink>
      {item.children && item.children.length > 0 && (
        <ul className="flex flex-col">
          {item.children.map(child => renderNavItem(child, depth + 1, fullPath))}
        </ul>
      )}
    </li>
  );
};

export const LeftNav = (): React.ReactNode => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const path = searchParams.get('path');

    if (path) {
      const matchedItem = findNavItemByPath(navItems, path);

      if (matchedItem) {
        navigate(path);
      }
    }
  }, [location.search, navigate]);

  return (
    <nav className="flex-1">
      <ul className="flex flex-col py-2">{navItems.map(item => renderNavItem(item))}</ul>
    </nav>
  );
};
