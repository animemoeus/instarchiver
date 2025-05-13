'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from './button';
import { Card } from './card';

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Neo Brutalism color palette
  const colors = ['bg-yellow-400', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];

  const navLinks = [
    { name: 'Home', path: '/', color: colors[0] },
    { name: 'Users', path: '/users', color: colors[1] },
    { name: 'Stories', path: '/stories', color: colors[2] },
  ];

  return (
    <Card className="w-full border-b-4 border-black bg-white rounded-none shadow-none mb-6">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center">
          <span className="font-black text-xl bg-yellow-400 px-3 py-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            INSTA ARCHIVER
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="noShadow"
          className="md:hidden border-2 border-black p-2 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
        </Button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2">
          {navLinks.map((link, index) => (
            <Button
              key={link.path}
              variant={isActive(link.path) ? 'default' : 'neutral'}
              asChild
              className={`font-bold px-4 py-2 border-2 border-black transition-all ${
                isActive(link.path)
                  ? `${link.color} text-white shadow-[4px_4px_0px_rgba(0,0,0,1)]`
                  : 'bg-white hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100'
              } hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]`}
            >
              <Link href={link.path}>{link.name.toUpperCase()}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-white">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block font-bold px-4 py-3 transition-all ${
                isActive(link.path)
                  ? `${link.color} text-white border-l-4 border-black`
                  : 'hover:bg-gray-100 hover:border-l-4 hover:border-black'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
