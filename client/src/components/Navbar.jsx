import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <LockClosedIcon className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-semibold tracking-tight">GenLock</span>
        </div>

        {/* Search Input with Icon */}
        <div className="relative flex-1 sm:max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by website..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-md text-gray-800 bg-gray-100 placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            aria-label="Search passwords by website"
          />
        </div>

        {/* Logout Button with Icon */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-5 py-2 rounded-md 
            transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
