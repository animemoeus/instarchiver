/**
 * API service functions for Instagram Stories
 */
import { InstagramStory, InstagramStoriesResponse } from '@/app/types/instagram/story';

// Base URL for the API
const API_BASE_URL = 'https://api.animemoe.us';

// Constants
export const API_CONSTANTS = {
  COUNT_PER_PAGE: 12,
};

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
 * Fetch stories with optional filtering
 */
export async function fetchStories(
  page = 1,
  searchQuery?: string,
  userId?: string
): Promise<InstagramStoriesResponse> {
  const params = {
    page: page.toString(),
    count: API_CONSTANTS.COUNT_PER_PAGE.toString(),
    ...(searchQuery && { user__username: searchQuery }),
    ...(userId && { user: userId }),
  };

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
