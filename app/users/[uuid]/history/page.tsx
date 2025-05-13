'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InstagramUserHistoryResponse } from '@/app/types/instagram/history';
import { fetchUserHistory } from '../services/history';
import { UserHistoryList } from './components/UserHistoryList';
import { InstagramPage } from '../../components/InstagramPage';
import { PaginationControls } from '../../components/PaginationControls';
import { useSearchParams, useRouter } from 'next/navigation';

interface UserHistoryPageProps {
  params: {
    uuid: string;
  };
}

export default function UserHistoryPage({ params }: UserHistoryPageProps) {
  const { uuid } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Get the current page from the URL parameters or default to 1
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string, 10)
    : 1;

  // Local state to manage pagination
  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);

  // Fetch history data using React Query
  const { data, isLoading, error } = useQuery<InstagramUserHistoryResponse>({
    queryKey: ['userHistory', uuid, currentPage],
    queryFn: () => fetchUserHistory(uuid, currentPage),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Prefetch next page data for smoother pagination
  React.useEffect(() => {
    if (data?.next) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['userHistory', uuid, nextPage],
        queryFn: () => fetchUserHistory(uuid, nextPage),
      });
    }
  }, [data, queryClient, uuid, currentPage]);

  // Navigation handlers
  const handleNextPage = () => {
    if (data?.next) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (data?.previous) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / 10) : 0;

  return (
    <InstagramPage
      title="Profile History"
      subtitle={`Showing history records for user (${data?.results[0]?.username || '...'})`}
      totalCount={data?.count || 0}
      currentPage={currentPage}
      usersList={
        <UserHistoryList
          historyRecords={data?.results || []}
          isLoading={isLoading}
          error={error instanceof Error ? error : null}
        />
      }
      pagination={
        !isLoading && data && totalPages > 1 ? (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasPrevious={!!data.previous}
            hasNext={!!data.next}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        ) : null
      }
    />
  );
}
