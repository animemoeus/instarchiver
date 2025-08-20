'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchInstagramUsers, extractPageFromUrl, API_CONSTANTS } from './services/api';
import { useUsers } from '@/hooks/useUsers';
import { useUrlState } from '@/hooks/useUrlState';

const { COUNT_PER_PAGE } = API_CONSTANTS;

// Import components from the components directory
import { UserSkeleton, UsersList, PaginationControls, InstagramPage } from './components';

// Main Instagram Users page component
export default function InstagramUsersList() {
  const queryClient = useQueryClient();
  const { search: searchQuery, page: currentPage, updateParams, resetParams } = useUrlState();
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('detailed');

  const { data, isLoading, error } = useUsers({
    page: searchQuery ? 1 : currentPage,
    search: searchQuery,
  });

  useEffect(() => {
    if (data?.next && !searchQuery) {
      const nextPage = extractPageFromUrl(data.next);
      queryClient.prefetchQuery({
        queryKey: ['users', nextPage, searchQuery, undefined, undefined],
        queryFn: () => fetchInstagramUsers({ page: nextPage, search: searchQuery }),
      });
    }
  }, [data, queryClient, searchQuery]);

  const handleNextPage = (): void => {
    if (data?.next && !searchQuery) {
      const nextPage = extractPageFromUrl(data.next);
      updateParams({ page: nextPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous && !searchQuery) {
      const prevPage = extractPageFromUrl(data.previous);
      updateParams({ page: prevPage });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / COUNT_PER_PAGE) : 0;

  const handleRetry = () => {
    resetParams();
  };

  const goToPage = (page: number) => {
    if (searchQuery || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    updateParams({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <InstagramPage
      totalCount={data?.count || 0}
      currentPage={currentPage}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      usersList={
        <Suspense
          fallback={
            <div
              className={
                viewMode === 'compact'
                  ? 'space-y-3'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              }
            >
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
            viewMode={viewMode}
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
