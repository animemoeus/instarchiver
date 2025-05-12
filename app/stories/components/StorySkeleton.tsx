'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StorySkeleton() {
  return (
    <Card className="overflow-hidden border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full bg-gray-300 p-3 border-b-4 border-black z-10">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full border-2 border-black" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>
        </div>

        <div className="pt-20">
          <Skeleton className="w-full h-[300px]" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </Card>
  );
}
