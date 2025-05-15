/**
 * Represents an Instagram user from the API
 */
export interface InstagramUser {
  uuid: string;
  has_stories: boolean;
  has_history: boolean;
  instagram_id: string;
  username: string;
  full_name: string;
  profile_picture: string;
  biography: string;
  follower_count: number;
  following_count: number;
  allow_auto_update_stories: boolean;
  is_private: boolean;
  is_verified: boolean;
  media_count: number;
  created_at: string;
  updated_at: string;
  updated_at_from_api: string;
}
