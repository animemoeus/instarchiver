'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { neoBrutalistColors } from '../../../utils/colors';

interface UserHistorySkeletonProps {
  index: number;
}

export function UserHistorySkeleton({ index }: UserHistorySkeletonProps) {
  const headerColorClass = neoBrutalistColors.header[index % neoBrutalistColors.header.length];

  return (
    <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
      {/* Header Skeleton */}
      <CardHeader className={`border-b-2 border-black py-3 ${headerColorClass}`}>
        <div className="flex items-center gap-3">
          {/* Profile image skeleton */}
          <Skeleton className="w-14 h-14 border-2 border-black rounded-full overflow-hidden" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 border-2 border-black" />
            <Skeleton className="h-4 w-20 border-2 border-black" />
          </div>
          <Skeleton className="h-6 w-24 border-2 border-black ml-auto" />
        </div>
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-4">
        {/* Statistics Skeleton */}
        <div className="grid grid-cols-3 gap-2 mb-4 border-2 border-black rounded-base overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`p-3 ${
                neoBrutalistColors.stats[Object.keys(neoBrutalistColors.stats)[i]]
              } flex flex-col items-center justify-center`}
            >
              <Skeleton className="h-3 w-12 border-2 border-black mb-2 rounded-base" />
              <Skeleton className="h-5 w-8 border-2 border-black rounded-base" />
            </div>
          ))}
        </div>

        {/* Biography Skeleton */}
        <Skeleton
          className={`mb-4 h-[100px] border-2 border-black rounded-base ${neoBrutalistColors.bio}`}
        />

        {/* Changes Skeleton */}
        <div className="border-2 border-black rounded-base p-3 bg-yellow-100">
          <Skeleton className="h-4 w-48 border-2 border-black mb-2" />
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white border-2 border-black rounded-base p-2"
              >
                <Skeleton className="h-6 w-20 border-2 border-black" />
                <Skeleton className="h-4 w-32 border-2 border-black" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
