'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUserHistory } from '@/app/users/[uuid]/services/history';
import { InstagramUserHistoryResponse } from '@/app/types/instagram/history';

/**
 * Hook for fetching user history with pagination
 */
export function useUserHistory(uuid: string, page: number = 1) {
  return useQuery<InstagramUserHistoryResponse>({
    queryKey: ['userHistory', uuid, page],
    queryFn: () => fetchUserHistory(uuid, page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!uuid,
  });
}
