'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface UserSkeletonProps {
  index: number;
}

export function UserSkeleton({ index }: UserSkeletonProps) {
  // Predefined color and rotation classes for Neo Brutalist effect
  const bgColors = [
    'bg-pink-300',
    'bg-cyan-300',
    'bg-yellow-300',
    'bg-purple-300',
    'bg-green-300',
    'bg-orange-300',
  ];
  const rotationClass = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
  const bgColorClass = bgColors[index % bgColors.length];

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

      <Card className="relative border-4 border-black bg-white animate-pulse">
        <CardHeader className="border-b-4 border-black bg-gray-200">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 border-4 border-black rounded-full overflow-hidden bg-gray-300"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-300 border-2 border-black"></div>
              <div className="h-4 w-20 bg-gray-300 border-2 border-black"></div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="mb-4 bg-gray-200 h-20 p-3 border-2 border-black"></div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="border-2 border-black p-3 bg-gray-200 transform rotate-1">
              <div className="h-4 w-20 bg-gray-300 border-2 border-black mb-2"></div>
              <div className="h-6 w-12 bg-gray-300 border-2 border-black"></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-200 transform -rotate-1">
              <div className="h-4 w-20 bg-gray-300 border-2 border-black mb-2"></div>
              <div className="h-6 w-12 bg-gray-300 border-2 border-black"></div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-4 border-black bg-gray-100 justify-between">
          <div className="h-4 w-24 bg-gray-300 border-2 border-black"></div>
          <div className="h-8 w-20 bg-gray-300 border-2 border-black"></div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserSkeleton;
