'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { InstagramUsersResponse } from '@/app/types/instagram';
import { fetchInstagramUsers, extractPageFromUrl, API_CONSTANTS } from './services/api';

const { COUNT_PER_PAGE } = API_CONSTANTS;

// Import components from the components directory
import { UserSkeleton, UsersList, PaginationControls, InstagramPage } from './components';

// Main Instagram Users page component
export default function InstagramUsersList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Get the current page from the URL parameters or default to 1
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string, 10)
    : 1;

  // Get search query from URL parameters
  const searchQuery = searchParams.get('search') || '';

  // Local state to manage pagination
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<InstagramUsersResponse, Error>({
    queryKey: ['instagramUsers', currentPage, searchQuery] as QueryKey,
    queryFn: () => fetchInstagramUsers(currentPage, searchQuery),
    placeholderData: keepPreviousData => keepPreviousData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Prefetch next page data for smoother pagination
  useEffect(() => {
    if (data?.next) {
      const nextPage = extractPageFromUrl(data.next);
      queryClient.prefetchQuery({
        queryKey: ['instagramUsers', nextPage, searchQuery] as QueryKey,
        queryFn: () => fetchInstagramUsers(nextPage, searchQuery),
      });
    }
  }, [data, queryClient, searchQuery]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle page parameter
    if (currentPage === 1) {
      params.delete('page');
    } else {
      params.set('page', currentPage.toString());
    }

    // Preserve search parameter
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    router.push(newUrl, { scroll: false });
  }, [currentPage, router, searchParams, searchQuery]);

  // Reset to page 1 when search query changes from URL
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    if (urlSearchQuery !== searchQuery && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchParams, searchQuery, currentPage]);

  // Next and previous page handlers
  const handleNextPage = (): void => {
    if (data?.next) {
      // Option 1: Use the next URL directly
      const nextPage = extractPageFromUrl(data.next);
      setCurrentPage(nextPage);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      // Option 1: Use the previous URL directly
      const prevPage = extractPageFromUrl(data.previous);
      setCurrentPage(prevPage);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / COUNT_PER_PAGE) : 0;

  const handleRetry = () => {
    setCurrentPage(1);

    // Clear search and reset to the first page
    const params = new URLSearchParams();
    const newUrl = window.location.pathname;
    router.push(newUrl);
  };

  // Add a direct navigation function to go to a specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update URL with the new page while preserving search
      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', page.toString());
      }

      // Preserve search parameter
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <InstagramPage
      totalUsers={data?.count || 0}
      currentPage={currentPage}
      usersList={
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(COUNT_PER_PAGE)].map((_, index) => (
                <UserSkeleton key={`skeleton-${index}`} index={index} />
              ))}
            </div>
          }
        >
          <UsersList
            users={data?.results || []}
            isLoading={isLoading}
            error={error instanceof Error ? error : null}
            count={COUNT_PER_PAGE}
            onRetry={handleRetry}
            searchQuery={searchQuery}
          />
        </Suspense>
      }
      pagination={
        <Suspense
          fallback={
            <div className="mt-12 flex justify-center">
              <div className="bg-gray-200 border-4 border-black h-12 w-64 animate-pulse"></div>
            </div>
          }
        >
          {!isLoading && data && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              hasPrevious={!!data.previous}
              hasNext={!!data.next}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              goToPage={goToPage}
            />
          )}
        </Suspense>
      }
    />
  );
}
