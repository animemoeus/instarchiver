/**
 * API service functions for Instagram User History
 */
import { InstagramUserHistoryResponse } from '@/app/types/instagram/history';

// Constants for the API
const BASE_API_URL = process.env.NEXT_PUBLIC_INSTAGRAM_API_BASE_URL || 'https://api.animemoe.us';
const COUNT_PER_PAGE = 10;

/**
 * Fetch history records for an Instagram user
 */
export async function fetchUserHistory(
  uuid: string,
  page = 1
): Promise<InstagramUserHistoryResponse> {
  try {
    const response = await fetch(
      `${BASE_API_URL}/instagram/users/${uuid}/history/?page=${page}&count=${COUNT_PER_PAGE}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user history:', error);
    throw error;
  }
}
