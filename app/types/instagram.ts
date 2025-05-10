// Interfaces for Instagram API entities
import { ApiResponse } from './api';

/**
 * Represents an Instagram user from the API
 */
export interface InstagramUser {
  uuid: string;
  instagram_id: string;
  username: string;
  full_name: string;
  profile_picture: string;
  biography: string;
  follower_count: number;
  following_count: number;
  allow_auto_update_stories: boolean;
  updated_from_api_datetime: string;
  created_at: string;
  updated_at: string;
}

/**
 * Type alias for an Instagram users API response
 */
export type InstagramUsersResponse = ApiResponse<InstagramUser>;
