'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { InstagramStory, InstagramStoriesResponse } from '@/app/types/instagram/story';

// Base URL for the API
const API_BASE_URL = 'https://api.animemoe.us';

// Constants
export const API_CONSTANTS = {
  COUNT_PER_PAGE: 12,
};

// Ordering options for stories
export const ORDERING_OPTIONS = {
  NEWEST_FIRST: '-story_created_at',
  OLDEST_FIRST: 'story_created_at',
  UPLOAD_NEWEST: '-created_at',
  UPLOAD_OLDEST: 'created_at',
} as const;

export type OrderingOption = (typeof ORDERING_OPTIONS)[keyof typeof ORDERING_OPTIONS];

// Query options interface
export interface StoriesQueryOptions {
  page?: number;
  searchQuery?: string;
  userId?: string;
  ordering?: OrderingOption | string;
  dateFrom?: string;
  dateTo?: string;
}

// API error class
export class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Make an API request with error handling
 */
async function makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new APIError(response.status, `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error('Failed to fetch data from API');
  }
}

/**
 * Create API URL with query parameters
 */
function createApiUrl(endpoint: string, params: Record<string, string>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  return `${endpoint}?${searchParams.toString()}`;
}

/**
 * Fetch stories with optional filtering - Legacy function for backward compatibility
 */
export async function fetchStories(
  page = 1,
  searchQuery?: string,
  userId?: string
): Promise<InstagramStoriesResponse> {
  return fetchStoriesWithOptions({
    page,
    searchQuery,
    userId,
  });
}

/**
 * Fetch stories with comprehensive options
 */
export async function fetchStoriesWithOptions(
  options: StoriesQueryOptions = {}
): Promise<InstagramStoriesResponse> {
  const { page = 1, searchQuery, userId, ordering, dateFrom, dateTo } = options;

  const params: Record<string, string> = {
    page: page.toString(),
    count: API_CONSTANTS.COUNT_PER_PAGE.toString(),
  };

  // Add optional parameters
  if (searchQuery) params.user__username = searchQuery;
  if (userId) params.user = userId;
  if (ordering) params.ordering = ordering;
  if (dateFrom) params.story_created_at__gte = dateFrom;
  if (dateTo) params.story_created_at__lte = dateTo;

  const endpoint = createApiUrl('/instagram/stories/', params);
  return makeRequest<InstagramStoriesResponse>(endpoint);
}

/**
 * Fetch a single story by ID
 */
export async function fetchStoryById(storyId: string): Promise<InstagramStory> {
  return makeRequest<InstagramStory>(`/instagram/stories/${storyId}/`);
}

/**
 * Download a story media to the user's device
 */
export async function downloadStoryMedia(story: InstagramStory): Promise<void> {
  try {
    const fileExtension = story.media.split('.').pop() || 'jpg';
    const fileName = `story_${story.story_id}.${fileExtension}`;

    // Create a temporary anchor element for downloading the file
    const link = document.createElement('a');
    link.href = story.media;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading story media:', error);
    throw new Error('Failed to download story media');
  }
}

// Legacy hook for backward compatibility
export function useStoriesQuery(page: number = 1, searchQuery?: string, userId?: string) {
  return useStoriesQueryWithOptions({
    page,
    searchQuery,
    userId,
  });
}

// Enhanced hook with full options support
export function useStoriesQueryWithOptions(options: StoriesQueryOptions = {}) {
  const { page = 1, searchQuery, userId, ordering, dateFrom, dateTo } = options;

  console.log(`[useStoriesQueryWithOptions] Fetching:`, {
    page,
    searchQuery,
    userId,
    ordering,
    dateFrom,
    dateTo,
  });

  return useQuery({
    queryKey: ['stories', page, searchQuery, userId, ordering, dateFrom, dateTo],
    queryFn: async () => {
      console.log(`[API Call] Fetching stories with options:`, options);
      const result = await fetchStoriesWithOptions(options);
      console.log(
        `[API Response] Received ${result.results.length} stories, total count: ${result.count}`
      );
      return result;
    },
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    retry: 2, // Retry failed requests twice
  });
}

export function useStoryByIdQuery(storyId: string) {
  return useQuery({
    queryKey: ['story', storyId],
    queryFn: () => fetchStoryById(storyId),
    staleTime: 5 * 60 * 1000,
    enabled: !!storyId, // Only run query if storyId is provided
  });
}

export function useDownloadStoryMedia() {
  return useMutation({
    mutationFn: (story: InstagramStory) => downloadStoryMedia(story),
    onSuccess: () => {
      toast.success('Story downloaded successfully!');
    },
    onError: error => {
      toast.error('Failed to download story');
      console.error('Download error:', error);
    },
  });
}
