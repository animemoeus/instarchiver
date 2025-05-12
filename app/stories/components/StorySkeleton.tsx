'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StorySkeleton() {
  return (
    <Card>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full bg-gray-300 p-3 z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        <CardContent>
          <div className="pt-20 relative">
            <Skeleton className="w-full h-[300px]" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="absolute top-2 right-2">
              <div className="bg-white text-black font-bold px-2 py-1 rounded-md">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
