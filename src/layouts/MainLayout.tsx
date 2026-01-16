import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { LeftNav } from '../components/LeftNav';

export const MainLayout = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1">
        <aside className="h-full w-48 bg-gray-100 border-r border-gray-200 transition-transform duration-300 flex flex-col">
          <LeftNav />
        </aside>

        <main className="flex-1 h-full shrink-0 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
