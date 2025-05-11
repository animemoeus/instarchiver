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
      <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <CardHeader className={`border-b-2 border-black ${bgColorClass}`}>
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 border-2 border-black rounded-full overflow-hidden" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 border-2 border-black" />
              <Skeleton className="h-4 w-20 border-2 border-black" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Skeleton className="mb-4 h-[120px] border-2 border-black rounded-base" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border-2 border-black p-3 bg-green-200 rounded-base">
              <Skeleton className="h-4 w-20 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-6 w-12 border-2 border-black rounded-base" />
            </div>
            <div className="border-2 border-black p-3 bg-yellow-200 rounded-base">
              <Skeleton className="h-4 w-20 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-6 w-12 border-2 border-black rounded-base" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-2 border-black bg-gray-100 flex-col gap-2">
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
