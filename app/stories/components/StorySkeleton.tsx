'use client';

import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export function StorySkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="py-3 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image skeleton */}
          <div className="relative min-w-[48px] min-h-[48px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            <Skeleton className="h-full w-full" />
          </div>
          <div>
            <CardTitle className="text-lg text-[var(--foreground)] font-[var(--font-weight-heading)]">
              <Skeleton className="h-6 w-32" /> {/* Username */}
            </CardTitle>
            <CardDescription className="text-sm font-[var(--font-weight-base)] text-[var(--foreground)]">
              <Skeleton className="h-4 w-24" /> {/* Full name */}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Full-width media section - no padding */}
      <div className="relative w-full border-t-2 group aspect-[9/16]">
        <Skeleton className="h-full w-full !rounded-none border-0" />
      </div>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <div className="flex w-full justify-between items-center">
          {/* Using div instead of p to avoid hydration issues with block elements inside p */}
          <div className="text-sm font-[var(--font-weight-heading)] text-[var(--foreground)]">
            <Skeleton className="h-4 w-32" /> {/* Date */}
          </div>
        </div>
        <div className="flex w-full">
          <Button disabled className="relative overflow-hidden">
            <span className="opacity-0">VIEW FULL STORY</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
