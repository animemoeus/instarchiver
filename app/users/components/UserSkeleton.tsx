'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getConsistentColor, neoBrutalistColors } from '../utils/colors';

interface UserSkeletonProps {
  index: number;
}

export function UserSkeleton({ index }: UserSkeletonProps) {
  // Use the position index to get a consistent color that will match UserCard
  // Each page will have skeletons at indices 0-N, matching the eventual user positions
  // This ensures skeleton colors will match user colors when they load
  const headerColorClass = neoBrutalistColors.header[index % neoBrutalistColors.header.length];

  return (
    <div className="relative">
      <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
        {/* Instagram-style header with a more condensed layout */}
        <CardHeader className={`border-b-2 border-black py-3 ${headerColorClass}`}>
          <div className="flex items-center gap-3">
            {/* Profile image skeleton */}
            <Skeleton className="w-14 h-14 border-2 border-black rounded-full overflow-hidden" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 border-2 border-black" />
              <Skeleton className="h-4 w-20 border-2 border-black" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Instagram-style statistics */}
          <div className="grid grid-cols-3 gap-2 mb-4 border-2 border-black rounded-base overflow-hidden">
            <div
              className={`p-3 ${neoBrutalistColors.stats.posts} flex flex-col items-center justify-center`}
            >
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
            <div
              className={`p-3 ${neoBrutalistColors.stats.followers} flex flex-col items-center justify-center`}
            >
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
            <div
              className={`p-3 ${neoBrutalistColors.stats.following} flex flex-col items-center justify-center`}
            >
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
          </div>

          {/* Instagram-style bio */}
          <Skeleton
            className={`mb-4 h-[100px] border-2 border-black rounded-base ${neoBrutalistColors.bio}`}
          />
        </CardContent>

        <CardFooter
          className={`border-t-2 border-black ${neoBrutalistColors.footer} flex-col gap-2 p-3`}
        >
          <div className="w-full flex justify-start">
            <Skeleton className="h-4 w-1/2 border-2 border-black rounded-base" />
          </div>
          <div className="flex w-full gap-2">
            <Skeleton className="h-8 w-full border-2 border-black rounded-base" />
            <Skeleton className="h-8 w-full border-2 border-black rounded-base" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserSkeleton;
