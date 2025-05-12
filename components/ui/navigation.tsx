'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
    { name: 'Stories', path: '/stories' },
  ];

  return (
    <nav className="w-full border-b-4 border-black bg-white">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center">
          <span className="font-black text-xl bg-yellow-400 px-2 py-1 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            INSTA ARCHIVER
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border-2 border-black p-2 bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
              </>
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-0">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-bold px-4 py-2 transition-transform transform hover:-translate-y-1 ${
                isActive(link.path)
                  ? 'bg-pink-500 text-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                  : 'hover:bg-gray-100 border-2 border-transparent hover:border-black hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`block font-bold px-4 py-3 transition-colors ${
                isActive(link.path) ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
