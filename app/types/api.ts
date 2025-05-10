// Common API response interfaces that can be reused across different endpoints

/**
 * Generic API response interface for paginated results
 * T represents the type of items in the results array
 */
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
