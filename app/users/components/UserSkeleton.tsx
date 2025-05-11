'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UserSkeletonProps {
  index: number;
}

export function UserSkeleton({ index }: UserSkeletonProps) {
  // Predefined color classes for Neo Brutalist effect
  const bgColors = [
    'bg-pink-300',
    'bg-cyan-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-green-300',
    'bg-orange-300',
  ];
  const bgColorClass = bgColors[index % bgColors.length];

  return (
    <div className="relative">
      <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
        {/* Instagram-style header with a more condensed layout */}
        <CardHeader className={`border-b-2 border-black py-3 ${bgColorClass}`}>
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
            <div className="p-3 bg-pink-200 flex flex-col items-center justify-center">
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
            <div className="p-3 bg-green-200 flex flex-col items-center justify-center">
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
            <div className="p-3 bg-yellow-200 flex flex-col items-center justify-center">
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
          </div>

          {/* Instagram-style bio */}
          <Skeleton className="mb-4 h-[100px] border-2 border-black rounded-base" />
        </CardContent>

        <CardFooter className="border-t-2 border-black bg-gray-100 flex-col gap-2 p-3">
          <Skeleton className="h-4 w-24 border-2 border-black rounded-base" />
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
