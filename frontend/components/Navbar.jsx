import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, User, LogOut, History, Settings } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('volt_user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('volt_user');
    navigate('/landing');
  };

  if (location.pathname === '/landing' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/auth') return null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-xl">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Mobi-Charge</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-600 border border-yellow-400/30' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  Recharge
                </span>
              </Link>
              <Link
                to="/history"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === '/history' 
                    ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-600 border border-yellow-400/30' 
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </span>
              </Link>
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === '/admin' 
                      ? 'bg-gradient-to-r from-amber-300/20 to-amber-400/20 text-amber-400 border border-amber-300/30' 
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 backdrop-blur-md">
                    <User className="h-4 w-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-800">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-lg bg-white/50 hover:bg-red-100 text-gray-700 hover:text-red-600 transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-white/50 focus:outline-none transition-all"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/80 border-b border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                location.pathname === '/' 
                  ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-600' 
                  : 'text-gray-700 hover:bg-white/50'
              }`}
            >
              Recharge
            </Link>
            <Link
              to="/history"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                location.pathname === '/history' 
                  ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-600' 
                  : 'text-gray-700 hover:bg-white/50'
              }`}
            >
              History
            </Link>
            <div className="border-t border-white/20 my-2"></div>
            {user && (
              <div className="px-3 py-2 flex items-center gap-2 text-sm text-gray-700 bg-white/30 rounded-lg">
                <User className="h-4 w-4" />
                {user.name}
              </div>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium hover:bg-red-100 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
