'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export interface UrlParams {
  search?: string;
  page?: number;
}

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;

  const updateParams = useCallback(
    (newParams: UrlParams) => {
      const params = new URLSearchParams();

      // Handle search parameter
      const search = newParams.search !== undefined ? newParams.search : currentSearch;
      if (search) {
        params.set('search', search);
      }

      // Handle page parameter
      // If search is present, don't add page parameter (always page 1)
      // If no search and page > 1, add page parameter
      const page = newParams.page !== undefined ? newParams.page : currentPage;
      if (!search && page > 1) {
        params.set('page', page.toString());
      }

      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, currentSearch, currentPage]
  );

  const resetParams = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  return {
    search: currentSearch,
    page: currentPage,
    updateParams,
    resetParams,
  };
}
