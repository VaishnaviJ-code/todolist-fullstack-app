import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import LoadingOverlay from './LoadingOverlay';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate a small delay for user feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    logout();
    navigate('/login');
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoggingOut} message="Logging out..." />
      
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TaskHub</h1>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, <span className="font-semibold">{user?.name}</span>
              </span>
              <ThemeToggle />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Logout"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
