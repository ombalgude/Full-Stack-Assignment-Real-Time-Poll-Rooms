'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          itsmyscreen
        </Link>
        
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
