'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import { Card } from './card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { Menu } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Navigation links configuration
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Users', path: '/users' },
    { name: 'Stories', path: '/stories' },
  ];

  return (
    <Card
      className="w-full border-b-4 border-border bg-background rounded-none shadow-none sticky top-0 z-50"
      role="banner"
    >
      <nav
        className="container mx-auto px-4 flex justify-between items-center h-16"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center" aria-label="Instagram Archiver Home">
          <Button variant="default" size="lg" className="font-heading text-xl">
            INSTA ARCHIVER
          </Button>
        </Link>

        {/* Mobile Menu Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="noShadow"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu strokeWidth={3} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="font-heading text-xl">
                <Button variant="default" size="lg" className="w-fit">
                  INSTA ARCHIVER
                </Button>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-6">
              {navLinks.map(link => (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? 'default' : 'neutral'}
                  size="lg"
                  className="justify-start font-heading"
                  asChild
                >
                  <Link
                    href={link.path}
                    aria-current={isActive(link.path) ? 'page' : undefined}
                    aria-label={`Navigate to ${link.name} page`}
                  >
                    {link.name.toUpperCase()}
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-2">
          {navLinks.map(link => (
            <Button
              key={link.path}
              variant={isActive(link.path) ? 'default' : 'neutral'}
              className="font-heading"
              asChild
            >
              <Link
                href={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                aria-label={`Navigate to ${link.name} page`}
              >
                {link.name.toUpperCase()}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    </Card>
  );
}
