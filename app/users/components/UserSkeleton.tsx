'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UserSkeletonProps {
  index: number;
}

export function UserSkeleton({ index }: UserSkeletonProps) {
  return (
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)]">
      <CardHeader className="border-b-2 border-[var(--border)] py-2 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image skeleton */}
          <Skeleton className="w-10 h-10 border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-28 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
            <Skeleton className="h-3 w-16 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* User Statistics */}
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

        {/* Biography skeleton */}
        <Skeleton className="h-[80px] w-full border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]" />
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-1 p-2">
        <Skeleton className="h-3 w-1/2 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
        <div className="flex w-full gap-1">
          <Skeleton className="h-6 w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
          <Skeleton className="h-6 w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserSkeleton;
