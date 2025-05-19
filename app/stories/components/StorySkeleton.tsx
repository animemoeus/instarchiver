'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StorySkeleton() {
  return (
    <Card className="w-full border-2 border-[var(--border)] shadow-[var(--shadow)] bg-[var(--background)] overflow-hidden">
      <CardHeader className="border-b-2 border-[var(--border)] py-3 bg-[var(--main)]">
        <div className="flex items-center gap-3">
          {/* Profile image skeleton */}
          <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            <Skeleton className="h-full w-full" />
          </div>
          <div>
            <Skeleton className="h-6 w-32 mb-1" /> {/* Username */}
            <Skeleton className="h-4 w-24" /> {/* Full name */}
          </div>
        </div>
      </CardHeader>

      {/* Full-width media section - matches aspect ratio */}
      <div className="relative w-full border-t-2 border-b-2 border-[var(--border)] overflow-hidden aspect-[9/16]">
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--overlay)] p-3 border-t-2 border-[var(--border)]">
          <Skeleton className="h-4 w-32 bg-[var(--secondary-background)]" />
        </div>
      </div>

      <CardContent className="p-3">{/* Empty content area */}</CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex w-full">
          <div className="w-full rounded-md border-2 border-[var(--border)] bg-[var(--main)]">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
