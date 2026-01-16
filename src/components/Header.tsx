import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            SPOT BUY CENTER
          </Link>
        </div>
      </div>
    </header>
  );
};
