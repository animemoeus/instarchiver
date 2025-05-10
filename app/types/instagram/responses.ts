import { ApiResponse } from '../api';
import { InstagramUser } from './user';

/**
 * Type alias for an Instagram users API response
 */
export type InstagramUsersResponse = ApiResponse<InstagramUser>;
