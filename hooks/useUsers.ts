'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { InstagramUsersResponse } from '@/app/types/instagram';
import { fetchInstagramUsers, fetchUserById } from '@/app/users/services/api';

/**
 * Parameters for the main useUsers hook
 */
export interface UseUsersParams {
  page?: number;
  search?: string;
  ordering?: string;
  filters?: Record<string, string | number | boolean | undefined>;
}

/**
 * Main hook for fetching users with flexible parameter support
 */
export function useUsers(params: UseUsersParams = {}) {
  const { page = 1, search, ordering, filters } = params;

  return useQuery({
    queryKey: ['users', page, search, ordering, filters],
    queryFn: () => fetchInstagramUsers({ page, search, ordering, ...filters }),
    staleTime: 60 * 1000, // 1 minute
    retry: 2,
  });
}

/**
 * Hook for fetching a single user by UUID
 */
export function useUserById(uuid: string) {
  return useQuery({
    queryKey: ['user', uuid],
    queryFn: () => fetchUserById(uuid),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!uuid,
  });
}

/**
 * Optimized hook for user search with debouncing support
 */
export function useUsersSearch(searchQuery: string, page: number = 1, ordering?: string) {
  return useQuery({
    queryKey: ['users', 'search', searchQuery, page, ordering],
    queryFn: () => fetchInstagramUsers({ page, search: searchQuery, ordering }),
    staleTime: 30 * 1000, // 30 seconds for search results
    enabled: searchQuery.length > 0,
    retry: 1,
  });
}

/**
 * Hook for infinite scroll of users
 */
export function useUsersInfinite(params: Omit<UseUsersParams, 'page'> = {}) {
  const { search, ordering, filters } = params;

  return useInfiniteQuery<InstagramUsersResponse, Error>({
    queryKey: ['users', 'infinite', search, ordering, filters],
    queryFn: ({ pageParam }) =>
      fetchInstagramUsers({ page: pageParam as number, search, ordering, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: InstagramUsersResponse) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get('page');
      return page ? parseInt(page, 10) : undefined;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook for common filter combinations
 */
export function useUsersWithFilters(
  filters: {
    hasStories?: boolean;
    hasHistory?: boolean;
    isVerified?: boolean;
    isPrivate?: boolean;
    ordering?: string;
    search?: string;
  },
  page: number = 1
) {
  const queryFilters: Record<string, boolean> = {};

  if (filters.hasStories !== undefined) {
    queryFilters.has_stories = filters.hasStories;
  }
  if (filters.hasHistory !== undefined) {
    queryFilters.has_history = filters.hasHistory;
  }
  if (filters.isVerified !== undefined) {
    queryFilters.is_verified = filters.isVerified;
  }
  if (filters.isPrivate !== undefined) {
    queryFilters.is_private = filters.isPrivate;
  }

  return useUsers({
    page,
    search: filters.search,
    ordering: filters.ordering,
    filters: queryFilters,
  });
}
