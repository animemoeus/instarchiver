'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  searchQuery?: string;
}

export function UsersList({
  users,
  isLoading,
  error,
  count,
  onRetry,
  searchQuery = '',
}: UsersListProps) {
  // Optimized rendering to support partial loading and streaming
  return (
    <>
      {/* Error display */}
      {error && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="font-bold mb-4">{error.message}</p>
            <Button onClick={onRetry}>Try Again</Button>
          </CardContent>
        </Card>
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
          <div className="col-span-3">
            <Card className="text-center">
              <CardContent className="p-6">
                {searchQuery ? (
                  <>
                    <p className="text-lg font-semibold mb-4">
                      No Users Found for &quot;{searchQuery}&quot;
                    </p>
                    <Button onClick={onRetry}>Clear Search</Button>
                  </>
                ) : (
                  <p className="text-lg font-semibold">No Instagram users found</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersList;
