'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ initialQuery = '', onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove the search parameter
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
      // Reset to page 1 when searching
      params.delete('page');
    } else {
      params.delete('search');
    }

    // Build the new URL
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    // Update the URL
    router.push(newUrl);

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users by username..."
            className="pr-10" // Add padding for the clear button
            data-testid="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                // Clear search parameter and submit the form
                const params = new URLSearchParams(searchParams.toString());
                params.delete('search');
                params.delete('page');
                const newUrl = params.toString()
                  ? `?${params.toString()}`
                  : window.location.pathname;
                router.push(newUrl);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Clear search"
              data-testid="clear-search-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <Button type="submit" data-testid="search-button">
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
