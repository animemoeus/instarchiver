'use client';

import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { InstagramUser } from '@/app/types/instagram';
import { getConsistentColor, neoBrutalistColors } from '../utils/colors';

interface UserCardProps {
  user: InstagramUser;
  index?: number; // Optional index for consistent color matching with skeleton
}

// Helper functions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function UserCard({ user, index }: UserCardProps) {
  // If index is provided, use it to get the same color as the skeleton
  // Otherwise fall back to username-based color for backward compatibility
  const headerColorClass =
    index !== undefined
      ? neoBrutalistColors.header[index % neoBrutalistColors.header.length]
      : getConsistentColor(user.username);
  return (
    <div className="relative">
      <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
        {/* Instagram-style header with a more condensed layout */}
        <CardHeader className={`border-b-2 border-black py-3 ${headerColorClass}`}>
          <div className="flex items-center gap-3">
            {/* Profile image with Instagram-style border */}
            <div className="relative w-14 h-14 border-2 border-black rounded-full overflow-hidden bg-white">
              {user.profile_picture ? (
                <Image
                  src={user.profile_picture}
                  alt={user.username}
                  fill
                  sizes="(max-width: 768px) 56px, 56px"
                  className="object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    // Fallback on image error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-300"><span class="text-2xl font-black">${user.username.charAt(0).toUpperCase()}</span></div>`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-2xl font-black">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-xl font-black">@{user.username}</CardTitle>
              {user.full_name && (
                <CardDescription className="font-medium text-black">
                  {user.full_name}
                </CardDescription>
              )}
            </div>

            {/* Instagram-style verified badge (if needed) */}
            {/* <div className="ml-auto border-2 border-black rounded-md px-2 py-1 bg-blue-400">
              <span className="text-xs font-black">VERIFIED</span>
            </div> */}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Instagram-style statistics */}
          <div className="grid grid-cols-3 gap-2 mb-4 border-2 border-black rounded-base overflow-hidden">
            <div
              className={`p-3 ${neoBrutalistColors.stats.posts} flex flex-col items-center justify-center`}
            >
              <p className="text-xs font-black">POSTS</p>
              <p className="text-lg font-black">--</p>
            </div>
            <div
              className={`p-3 ${neoBrutalistColors.stats.followers} flex flex-col items-center justify-center`}
            >
              <p className="text-xs font-black">FOLLOWERS</p>
              <p className="text-lg font-black">{formatNumber(user.follower_count)}</p>
            </div>
            <div
              className={`p-3 ${neoBrutalistColors.stats.following} flex flex-col items-center justify-center`}
            >
              <p className="text-xs font-black">FOLLOWING</p>
              <p className="text-lg font-black">{formatNumber(user.following_count)}</p>
            </div>
          </div>

          {/* Instagram-style bio */}
          {user.biography ? (
            <div className={`mb-4 border-2 border-black rounded-base ${neoBrutalistColors.bio}`}>
              <ScrollArea className="h-[100px] w-full p-3 text-black rounded-base">
                <p className="font-medium text-sm">{user.biography}</p>
              </ScrollArea>
            </div>
          ) : (
            <div className="mb-4 p-3 border-2 border-black rounded-base bg-gray-100 h-[100px] flex items-center justify-center">
              <p className="font-medium text-gray-500 italic text-sm">No biography available</p>
            </div>
          )}
        </CardContent>

        <CardFooter
          className={`border-t-2 border-black ${neoBrutalistColors.footer} flex-col gap-2 p-3`}
        >
          <p className="text-xs font-bold w-full">Last Update: {formatDate(user.updated_at)}</p>
          <div className="flex w-full gap-2">
            <Button variant="default" className="flex-1 font-black text-xs py-2 h-auto">
              VIEW PROFILE
            </Button>
            <Button variant="neutral" className="flex-1 font-black text-xs py-2 h-auto">
              ARCHIVE POSTS
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserCard;
