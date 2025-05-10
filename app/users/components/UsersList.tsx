'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { InstagramUser } from '@/app/types/instagram';
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';
import StreamedUserCard from './StreamedUserCard';

interface UsersListProps {
  users: InstagramUser[];
  isLoading: boolean;
  error: Error | null;
  count: number;
  onRetry: () => void;
}

export function UsersList({ users, isLoading, error, count, onRetry }: UsersListProps) {
  // Optimized rendering to support partial loading and streaming
  return (
    <>
      {/* Error display */}
      {error && (
        <div className="mb-8 bg-red-400 border-4 border-black p-4 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <p className="font-bold text-black">{error.message}</p>
          <Button
            onClick={onRetry}
            className="mt-2 bg-white text-black border-4 border-black font-bold hover:bg-gray-100"
          >
            Try Again
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Display users when available, otherwise show skeletons */}
        {!isLoading && users.length > 0
          ? users.map((user: InstagramUser, index: number) => (
              <StreamedUserCard key={user.uuid} user={user} index={index} />
            ))
          : isLoading &&
            [...Array(count)].map((_, index: number) => (
              <UserSkeleton key={`skeleton-${index}`} index={index} />
            ))}

        {/* Display message when no users are found */}
        {!isLoading && users.length === 0 && !error && (
          <div className="col-span-3 text-center p-8 bg-gray-100 border-4 border-black">
            <p className="text-xl font-bold">No Instagram users found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersList;
