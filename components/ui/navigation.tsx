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
              <Menu strokeWidth={2} className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b-2 border-border bg-secondary-background">
                <h2 className="font-heading text-lg font-bold text-foreground">NAVIGATION</h2>
              </div>
              <nav className="flex-1 p-4" aria-label="Mobile navigation">
                <div className="flex flex-col space-y-3">
                  {navLinks.map(link => (
                    <Button
                      key={link.path}
                      variant={isActive(link.path) ? 'default' : 'neutral'}
                      size="lg"
                      className="justify-start font-heading text-left h-12 px-4"
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
              <div className="p-4 border-t-2 border-border bg-secondary-background">
                <p className="text-sm text-foreground/70 font-heading">INSTA ARCHIVER</p>
              </div>
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
