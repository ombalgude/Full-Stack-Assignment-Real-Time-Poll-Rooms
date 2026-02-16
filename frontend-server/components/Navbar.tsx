'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setIsLoggedIn(!!localStorage.getItem('token'));

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className={`px-5 py-2 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary hover:text-primary/90 transition-colors flex items-center gap-2">
          {/* Logo Icon could go here */}
          itsmyscreen
        </Link>
        
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost" className="hover:bg-primary/5 text-primary">
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hover:bg-primary/5 text-primary">
                <Link href="/signin">
                  Sign In
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                <Link href="/signup">
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
