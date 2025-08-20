'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StoriesGrid, StorySkeleton } from './components';
import { SearchBar } from '../users/components/SearchBar';
import { useStoriesQueryWithOptions, API_CONSTANTS, ORDERING_OPTIONS } from '@/hooks/useStories';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);
  const [ordering, setOrdering] = useState<string>(ORDERING_OPTIONS.NEWEST_FIRST);

  // Reset state when navigating away
  useEffect(() => {
    // Clean up function runs when component unmounts
    return () => {
      setSearchQuery('');
      setCurrentPage(1);
    };
  }, []);

  // Update maxVisiblePages when screen size changes
  useEffect(() => {
    setMaxVisiblePages(isMobile ? 3 : 5);
  }, [isMobile]);

  // Initialize state from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const orderingParam = searchParams.get('ordering');

    console.log(
      `[URL Effect] URL params - search: "${search}", page: "${page}", ordering: "${orderingParam}"`
    );
    console.log(
      `[URL Effect] Current state - searchQuery: "${searchQuery}", currentPage: ${currentPage}, ordering: "${ordering}"`
    );

    if (search && search !== searchQuery) {
      console.log(`[URL Effect] Setting search query from URL: "${search}"`);
      setSearchQuery(search);
    }

    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum !== currentPage) {
        console.log(`[URL Effect] Setting page from URL: ${pageNum}`);
        setCurrentPage(pageNum);
      }
    }

    if (orderingParam && orderingParam !== ordering) {
      console.log(`[URL Effect] Setting ordering from URL: "${orderingParam}"`);
      setOrdering(orderingParam);
    }
  }, [searchParams, currentPage, searchQuery, ordering]); // Include all dependencies

  const { data, isLoading } = useStoriesQueryWithOptions({
    page: currentPage,
    searchQuery,
    ordering,
  });

  const totalPages = data ? Math.ceil(data.count / API_CONSTANTS.COUNT_PER_PAGE) : 1;
  const stories = data ? data.results : [];

  console.log(
    `[Stories Render] isLoading: ${isLoading}, stories count: ${stories.length}, currentPage: ${currentPage}, searchQuery: "${searchQuery}", ordering: "${ordering}"`
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    console.log(`[handleSearch] Searching for: "${query}"`);
    setSearchQuery(query);
    setCurrentPage(1);

    // Build URL with search and current ordering
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (ordering !== ORDERING_OPTIONS.NEWEST_FIRST) params.set('ordering', ordering);

    const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
    router.push(url);
    scrollToTop();
  };

  const handleOrderingChange = (newOrdering: string) => {
    console.log(`[handleOrderingChange] Changing ordering to: "${newOrdering}"`);
    setOrdering(newOrdering);
    setCurrentPage(1);

    // Build URL with current search and new ordering
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (newOrdering !== ORDERING_OPTIONS.NEWEST_FIRST) params.set('ordering', newOrdering);

    const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
    router.push(url);
    scrollToTop();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      console.log(`[handlePrevPage] Moving to page: ${newPage}`);
      setCurrentPage(newPage);

      // Build URL with current search, ordering, and new page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (ordering !== ORDERING_OPTIONS.NEWEST_FIRST) params.set('ordering', ordering);
      if (newPage > 1) params.set('page', newPage.toString());

      const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
      router.push(url);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      console.log(`[handleNextPage] Moving to page: ${newPage}`);
      setCurrentPage(newPage);

      // Build URL with current search, ordering, and new page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (ordering !== ORDERING_OPTIONS.NEWEST_FIRST) params.set('ordering', ordering);
      params.set('page', newPage.toString());

      router.push(`/stories?${params.toString()}`);
      scrollToTop();
    }
  };

  const handlePageClick = (targetPage: number) => {
    if (targetPage !== currentPage) {
      console.log(`[handlePageClick] Moving to page: ${targetPage}`);
      setCurrentPage(targetPage);

      // Build URL with current search, ordering, and target page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (ordering !== ORDERING_OPTIONS.NEWEST_FIRST) params.set('ordering', ordering);
      if (targetPage > 1) params.set('page', targetPage.toString());

      const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
      router.push(url);
      scrollToTop();
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    // Use the state value that is updated based on screen size

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

      <div className="mt-8 space-y-4">
        <SearchBar onSearch={handleSearch} placeholder="Search by username..." />

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label htmlFor="ordering-select" className="text-sm font-medium text-text shrink-0">
            Sort by:
          </label>
          <Select value={ordering} onValueChange={handleOrderingChange}>
            <SelectTrigger className="w-full sm:w-48 min-h-[44px]">
              <SelectValue placeholder="Select ordering" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ORDERING_OPTIONS.NEWEST_FIRST}>
                <span className="sm:hidden">Newest</span>
                <span className="hidden sm:inline">Newest First</span>
              </SelectItem>
              <SelectItem value={ORDERING_OPTIONS.OLDEST_FIRST}>
                <span className="sm:hidden">Oldest</span>
                <span className="hidden sm:inline">Oldest First</span>
              </SelectItem>
              <SelectItem value={ORDERING_OPTIONS.UPLOAD_NEWEST}>
                <span className="sm:hidden">Upload ↓</span>
                <span className="hidden sm:inline">Upload Date (Newest)</span>
              </SelectItem>
              <SelectItem value={ORDERING_OPTIONS.UPLOAD_OLDEST}>
                <span className="sm:hidden">Upload ↑</span>
                <span className="hidden sm:inline">Upload Date (Oldest)</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {[...Array(8)].map((_, index) => (
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
