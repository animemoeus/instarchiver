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
      <CardHeader className="border-b-2 border-[var(--border)] py-3 bg-[var(--main)]">
        <div className="flex items-center gap-3">
          {/* Profile image skeleton */}
          <Skeleton className="w-14 h-14 border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
            <Skeleton className="h-4 w-20 bg-[var(--secondary-background)] border-2 border-[var(--border)]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* User Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center"
            >
              <Skeleton className="h-3 w-12 bg-[var(--background)] border-2 border-[var(--border)] mb-2 rounded-[var(--radius-base)]" />
              <Skeleton className="h-5 w-8 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
            </div>
          ))}
        </div>

        {/* Biography skeleton */}
        <Skeleton className="h-[100px] w-full border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]" />
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <Skeleton className="h-4 w-1/2 bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
        <div className="flex w-full gap-2">
          <Skeleton className="h-8 w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
          <Skeleton className="h-8 w-full bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)]" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserSkeleton;
