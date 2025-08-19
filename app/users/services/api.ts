'use client';

import { InstagramUser, InstagramUsersResponse } from '@/app/types/instagram';

// Constants for the API
const BASE_API_URL = process.env.NEXT_PUBLIC_INSTAGRAM_API_BASE_URL || 'https://api.animemoe.us';
const API_ENDPOINT = '/instagram/users/';
const COUNT_PER_PAGE = 12;

// Function to parse URL params from API URLs
export const extractPageFromUrl = (url: string | null): number => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

// Interface for flexible API parameters
interface FetchUsersParams {
  page?: number;
  search?: string;
  ordering?: string;
  [key: string]: string | number | boolean | undefined; // For additional filters
}

// Function to create API URL with flexible parameters
export const createApiUrl = (params: FetchUsersParams): string => {
  const { page = 1, search, ordering, ...filters } = params;

  const urlParams = new URLSearchParams();
  urlParams.set('count', COUNT_PER_PAGE.toString());
  urlParams.set('format', 'json');
  urlParams.set('page', page.toString());

  if (search) {
    urlParams.set('search', search);
  }

  if (ordering) {
    urlParams.set('ordering', ordering);
  }

  // Add additional filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlParams.set(key, value.toString());
    }
  });

  return `${BASE_API_URL}${API_ENDPOINT}?${urlParams.toString()}`;
};

// Legacy function for backwards compatibility
export const createApiUrlLegacy = (page: number, search?: string): string => {
  return createApiUrl({ page, search });
};

// Function to fetch Instagram users with flexible parameters
export const fetchInstagramUsers = async (
  params: FetchUsersParams | number,
  legacySearch?: string
): Promise<InstagramUsersResponse> => {
  // Handle legacy call signature for backwards compatibility
  let apiParams: FetchUsersParams;
  if (typeof params === 'number') {
    apiParams = { page: params, search: legacySearch };
  } else {
    apiParams = params;
  }

  const url = createApiUrl(apiParams);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
};

// Function to fetch a single user by UUID
export const fetchUserById = async (uuid: string): Promise<InstagramUser> => {
  const url = `${BASE_API_URL}${API_ENDPOINT}${uuid}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
};

// Export constants for reuse
export const API_CONSTANTS = {
  BASE_API_URL,
  API_ENDPOINT,
  COUNT_PER_PAGE,
};
