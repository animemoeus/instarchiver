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
  // If there's a search query, always start at page 1 to ensure we're showing the first page of results
  const [currentPage, setCurrentPage] = useState<number>(searchQuery ? 1 : initialPage);

  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<InstagramUsersResponse, Error>({
    queryKey: ['instagramUsers', currentPage, searchQuery] as QueryKey,
    queryFn: () => {
      // Always use page 1 when searching
      const pageToUse = searchQuery ? 1 : currentPage;
      return fetchInstagramUsers(pageToUse, searchQuery);
    },
    placeholderData: keepPreviousData => keepPreviousData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Prefetch next page data for smoother pagination
  useEffect(() => {
    if (data?.next) {
      const nextPage = extractPageFromUrl(data.next);
      // Don't prefetch if we're searching (we'll stay on page 1)
      if (!searchQuery) {
        queryClient.prefetchQuery({
          queryKey: ['instagramUsers', nextPage, searchQuery] as QueryKey,
          queryFn: () => fetchInstagramUsers(nextPage, searchQuery),
        });
      }
    }
  }, [data, queryClient, searchQuery]);

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams();

    // Add search parameter if present
    if (searchQuery) {
      params.set('search', searchQuery);
      // Don't add page parameter if search is present, even if currentPage > 1
    } else if (currentPage > 1) {
      // Only add page parameter if there's no search query
      params.set('page', currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    router.push(newUrl, { scroll: false });
  }, [currentPage, router, searchQuery]);

  // Reset to page 1 when search query changes from URL
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';

    // Always reset to page 1 when there's any search query
    if (urlSearchQuery && currentPage !== 1) {
      setCurrentPage(1);
    }
    // Handle when search is cleared
    else if (!urlSearchQuery && urlSearchQuery !== searchQuery) {
      setCurrentPage(1);

      // When search is cleared, we can go to page 1 or whatever page is in the URL
      const urlPage = searchParams.get('page');
      if (urlPage) {
        setCurrentPage(parseInt(urlPage, 10));
      }
    }
  }, [searchParams, searchQuery, currentPage]);

  // Next and previous page handlers
  const handleNextPage = (): void => {
    // Don't navigate to next page if we're searching (always stay on page 1)
    if (data?.next && !searchQuery) {
      const nextPage = extractPageFromUrl(data.next);
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // URL will be updated by the useEffect
    }
  };

  const handlePrevPage = (): void => {
    // Don't navigate to previous page if we're searching (always stay on page 1)
    if (data?.previous && !searchQuery) {
      const prevPage = extractPageFromUrl(data.previous);
      setCurrentPage(prevPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // URL will be updated by the useEffect
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / COUNT_PER_PAGE) : 0;

  const handleRetry = () => {
    // Reset page to 1
    setCurrentPage(1);

    // Clear all parameters and go back to the base URL
    router.push(window.location.pathname);
  }; // Add a direct navigation function to go to a specific page
  const goToPage = (page: number) => {
    // Don't navigate to different pages if we're searching (always stay on page 1)
    if (searchQuery) {
      return;
    }

    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update URL with the new page
      const params = new URLSearchParams();

      if (page > 1) {
        params.set('page', page.toString());
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <InstagramPage
      totalCount={data?.count || 0}
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
          {!isLoading && data && !searchQuery && (
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
