'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UserHistorySkeletonProps {
  index: number;
}

export function UserHistorySkeleton({ index }: UserHistorySkeletonProps) {
  return (
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)]">
      {/* Header Skeleton */}
      <CardHeader className="border-b-2 border-[var(--border)] py-2 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image skeleton */}
          <Skeleton className="w-10 h-10 border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-28 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
            <Skeleton className="h-3 w-16 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
          </div>
          <Skeleton className="h-4 w-20 bg-[var(--secondary-background)] border-2 border-[var(--border)] ml-auto" />
        </div>
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-4">
        {/* Statistics Skeleton */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center"
            >
              <Skeleton className="h-3 w-10 bg-[var(--background)] border-2 border-[var(--border)] mb-1 rounded-[var(--radius-base)]" />
              <Skeleton className="h-4 w-6 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
            </div>
          ))}
        </div>

        {/* Biography Skeleton */}
        <Skeleton className="h-[80px] w-full mb-4 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]" />

        {/* Changes Skeleton */}
        <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] p-3 flex-grow">
          <Skeleton className="h-3 w-48 mb-3 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
          <div className="space-y-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)] p-2"
              >
                <Skeleton className="h-4 w-20 bg-[var(--secondary-background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
                <Skeleton className="h-3 w-32 bg-[var(--secondary-background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] p-2">
        <Skeleton className="h-3 w-1/2 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
      </CardFooter>
    </Card>
  );
}
