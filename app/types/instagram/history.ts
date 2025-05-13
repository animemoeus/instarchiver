import { InstagramUser } from './user';

/**
 * Represents a history record of an Instagram user's changes
 */
export interface InstagramUserHistory extends InstagramUser {
  history_id: number;
  history_date: string;
}

/**
 * Type for the Instagram User History API response
 */
export interface InstagramUserHistoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InstagramUserHistory[];
}
