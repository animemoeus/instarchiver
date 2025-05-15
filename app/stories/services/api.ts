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

/**
 * Fetch stories with optional filtering
 */
export async function fetchStories(
  page = 1,
  searchQuery?: string,
  userId?: string
): Promise<InstagramStoriesResponse> {
  try {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('count', API_CONSTANTS.COUNT_PER_PAGE.toString());

    if (searchQuery) {
      params.set('user__username', searchQuery);
    }

    if (userId) {
      params.set('user', userId);
    }

    const response = await fetch(`${API_BASE_URL}/instagram/stories/?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
}

/**
 * Fetch a single story by ID
 */
export async function fetchStoryById(storyId: string): Promise<InstagramStory> {
  try {
    const response = await fetch(`${API_BASE_URL}/instagram/stories/${storyId}/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching story ${storyId}:`, error);
    throw error;
  }
}

/**
 * Download a story media to the user's device
 */
export async function downloadStoryMedia(story: InstagramStory): Promise<void> {
  try {
    // Get file extension from the media URL
    const fileExtension = story.media.split('.').pop() || 'jpg';
    const fileName = `story_${story.story_id}.${fileExtension}`;

    // Create a temporary anchor element for downloading the file
    const link = document.createElement('a');
    link.href = story.media;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading story media:', error);
    throw error;
  }
}
