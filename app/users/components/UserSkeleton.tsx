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
  const containerColors = [
    'bg-pink-200',
    'bg-cyan-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-green-200',
    'bg-orange-200',
  ];
  const rotationClass = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
  const bgColorClass = bgColors[index % bgColors.length];
  const containerColorClass = containerColors[index % containerColors.length];

  return (
    <div
      className="relative transition-all duration-500 ease-in-out"
      style={{
        opacity: 1,
        transform: 'translateY(0)',
      }}
    >
      {/* Offset background for Neo Brutalist effect */}
      <div
        className={`absolute -inset-1 ${bgColorClass} border-4 border-black ${rotationClass}`}
      ></div>

      <Card className="relative border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <CardHeader className={`border-b-4 border-black ${bgColorClass}`}>
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 border-4 border-black rounded-full overflow-hidden shadow-[3px_3px_0_0_rgba(0,0,0,1)]" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
              <Skeleton className="h-4 w-20 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <Skeleton className="mb-4 h-20 p-3 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]" />

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div
              className={`border-2 border-black p-3 ${containerColors[0]} transform rotate-1 shadow-[3px_3px_0_0_rgba(0,0,0,1)]`}
            >
              <Skeleton className="h-4 w-20 border-2 border-black mb-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
              <Skeleton className="h-6 w-12 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
            </div>
            <div
              className={`border-2 border-black p-3 ${containerColors[1]} transform -rotate-1 shadow-[3px_3px_0_0_rgba(0,0,0,1)]`}
            >
              <Skeleton className="h-4 w-20 border-2 border-black mb-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
              <Skeleton className="h-6 w-12 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-4 border-black bg-gray-100 justify-between">
          <Skeleton className="h-4 w-24 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]" />
          <Skeleton className="h-8 w-20 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserSkeleton;
