'use client';

import { InstagramUsersResponse } from '@/app/types/instagram';

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

// Function to create API URL from page number and search query
export const createApiUrl = (page: number, search?: string): string => {
  let url = `${BASE_API_URL}${API_ENDPOINT}?count=${COUNT_PER_PAGE}&format=json&page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  return url;
};

// Function to fetch Instagram users
export const fetchInstagramUsers = async (
  page: number,
  search?: string
): Promise<InstagramUsersResponse> => {
  const url = createApiUrl(page, search);
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
