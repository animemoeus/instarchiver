'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { InstagramUser, InstagramUsersResponse } from '@/app/types/instagram';
import { fetchInstagramUsers, extractPageFromUrl, API_CONSTANTS } from './services/api';

const { COUNT_PER_PAGE } = API_CONSTANTS;

// Import components from the components directory
import { UserHeader, UsersList, PaginationControls, LoadingState } from './components';

// Main content component
function InstagramUsersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Get the current page from the URL parameters or default to 1
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string, 10)
    : 1;

  // Local state to manage pagination and animations
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<InstagramUsersResponse, Error>({
    queryKey: ['instagramUsers', currentPage] as QueryKey,
    queryFn: () => fetchInstagramUsers(currentPage),
    placeholderData: keepPreviousData => keepPreviousData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Prefetch next page data for smoother pagination
  useEffect(() => {
    if (data?.next) {
      const nextPage = extractPageFromUrl(data.next);
      queryClient.prefetchQuery({
        queryKey: ['instagramUsers', nextPage] as QueryKey,
        queryFn: () => fetchInstagramUsers(nextPage),
      });
    }
  }, [data, queryClient]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage === 1) {
      params.delete('page');
    } else {
      params.set('page', currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    router.push(newUrl, { scroll: false });
  }, [currentPage, router, searchParams]);

  // Animation effect after data loads
  useEffect(() => {
    if (!isLoading && data) {
      // No delay, immediate display
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [isLoading, data]);

  // Next and previous page handlers
  const handleNextPage = (): void => {
    if (data?.next) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / COUNT_PER_PAGE) : 0;

  const handleRetry = () => {
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with neo-brutalist design */}
      <UserHeader totalUsers={data?.count || 0} currentPage={currentPage} />

      {/* User list with error handling and loading states */}
      <UsersList
        users={data?.results || []}
        isLoading={isLoading}
        error={error instanceof Error ? error : null}
        count={COUNT_PER_PAGE}
        onRetry={handleRetry}
      />

      {/* Pagination controls */}
      {!isLoading && data && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasPrevious={!!data.previous}
          hasNext={!!data.next}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
}

// Default export with Suspense boundary
export default function InstagramUsersList() {
  return (
    <Suspense fallback={<LoadingState />}>
      <InstagramUsersContent />
    </Suspense>
  );
}
