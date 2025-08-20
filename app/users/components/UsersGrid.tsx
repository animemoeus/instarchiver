'use client';

import { Suspense } from 'react';
import { UsersList } from './UsersList';
import { InstagramUser } from '@/app/types/instagram';
import UserSkeleton from './UserSkeleton';

interface UsersGridProps {
  users: InstagramUser[];
  isLoading: boolean;
  error: Error | null;
  count: number;
  onRetry: () => void;
  viewMode?: 'compact' | 'detailed';
}

// This component wraps the UsersList with a Suspense boundary for streaming
export function UsersGrid({
  users,
  isLoading,
  error,
  count,
  onRetry,
  viewMode = 'detailed',
}: UsersGridProps) {
  return (
    <Suspense
      fallback={
        <div
          className={
            viewMode === 'compact'
              ? 'space-y-3'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          {[...Array(count)].map((_, index) => (
            <UserSkeleton key={`skeleton-${index}`} index={index} variant={viewMode} />
          ))}
        </div>
      }
    >
      <UsersList
        users={users}
        isLoading={isLoading}
        error={error}
        count={count}
        onRetry={onRetry}
        viewMode={viewMode}
      />
    </Suspense>
  );
}

export default UsersGrid;
