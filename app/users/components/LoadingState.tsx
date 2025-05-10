'use client';

import React from 'react';
import UserSkeleton from './UserSkeleton';

export function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 relative">
        <div className="absolute -top-2 -left-2 w-full h-full bg-yellow-400 border-4 border-black -z-10 transform rotate-1"></div>
        <div className="bg-white border-4 border-black p-6 relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-4">Instagram Users</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-purple-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <p className="text-lg font-black text-black">Loading...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(9)].map((_, index) => (
          <UserSkeleton key={`skeleton-${index}`} index={index} />
        ))}
      </div>
    </div>
  );
}

export default LoadingState;
