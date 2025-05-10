'use client';

import React from 'react';

interface UserHeaderProps {
  totalUsers: number;
  currentPage: number;
}

export function UserHeader({ totalUsers, currentPage }: UserHeaderProps) {
  return (
    <div className="mb-12 relative">
      <div className="absolute -top-2 -left-2 w-full h-full bg-yellow-400 border-4 border-black -z-10 transform rotate-1"></div>
      <div className="bg-white border-4 border-black p-6 relative z-10">
        <h1 className="text-4xl font-black tracking-tight mb-4">Instagram Users</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-purple-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <p className="text-lg font-black text-black">Total Users: {totalUsers}</p>
          </div>
          <div className="bg-cyan-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <p className="text-lg font-black text-black">Page: {currentPage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
