'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StoriesGrid, StorySkeleton } from './components';
import { SearchBar } from '../users/components/SearchBar';
import { API_CONSTANTS } from './services/api';
import { useStoriesQuery } from './hooks/useStories';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export default function StoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset state when navigating away
  useEffect(() => {
    // Clean up function runs when component unmounts
    return () => {
      setSearchQuery('');
      setCurrentPage(1);
    };
  }, []);

  // Only update URL when we have a search query or specific page
  useEffect(() => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');

    // On initial load, update state from URL if we have search params
    if (!searchQuery && search) {
      setSearchQuery(search);
      return;
    }

    // Don't update URL if we're just loading the page fresh
    if (!searchQuery && (!page || page === '1')) {
      return;
    }

    // Only include search and page in URL if they have non-default values
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/stories';
    router.push(newUrl);
  }, [searchParams, searchQuery, currentPage, router]);

  const { data, isLoading, isError } = useStoriesQuery(currentPage, searchQuery);

  const totalPages = data ? Math.ceil(data.count / API_CONSTANTS.COUNT_PER_PAGE) : 1;
  const stories = data ? data.results : [];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    router.push(`/stories?search=${encodeURIComponent(query)}&page=1`);
    scrollToTop();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${newPage}`);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${newPage}`);
      scrollToTop();
    }
  };

  const handlePageClick = (targetPage: number) => {
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${targetPage}`);
      scrollToTop();
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = window.innerWidth < 640 ? 3 : 5; // Reduced pages for mobile

    pages.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

    if (currentPage <= Math.floor(maxVisiblePages / 2)) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    if (startPage > 2) {
      pages.push('start-ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1 && totalPages > 1) {
      pages.push('end-ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div>
        <h1 className="font-black text-5xl mb-4">INSTAGRAM STORIES ARCHIVE</h1>
        <p className="text-xl mt-4 font-medium">
          Browse and discover the latest Instagram stories. Search by username to find stories from
          specific users.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search by username..." className="mt-8" />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[...Array(6)].map((_, index) => (
            <StorySkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <StoriesGrid stories={stories} />
          <Pagination className="mt-12">
            <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <PaginationItem className="min-w-9 sm:min-w-10">
                <PaginationPrevious
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage > 1) handlePrevPage();
                  }}
                  aria-disabled={currentPage === 1}
                  className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''} px-2 sm:px-3`}
                />
              </PaginationItem>

              {pageNumbers.map((page, index) => {
                if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={page} className="min-w-9 sm:min-w-10">
                    <PaginationLink
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        if (typeof page === 'number') handlePageClick(page);
                      }}
                      isActive={currentPage === page}
                      className="px-2 sm:px-3 h-9 sm:h-10"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem className="min-w-9 sm:min-w-10">
                <PaginationNext
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage < totalPages) handleNextPage();
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''} px-2 sm:px-3`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
