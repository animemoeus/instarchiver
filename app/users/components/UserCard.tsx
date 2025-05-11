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

interface UserCardProps {
  user: InstagramUser;
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

// Generate a consistent vibrant color for each user card header
const getRandomPastelColor = (seed: string): string => {
  // Use the hash of the username to generate a consistent color
  const hash = seed.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);

  const colors = [
    'bg-pink-300',
    'bg-purple-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-orange-300',
    'bg-red-300',
    'bg-indigo-300',
    'bg-cyan-300',
    'bg-lime-300',
  ];

  return colors[hash % colors.length];
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="relative">
      <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <CardHeader className={`border-b-2 border-black ${getRandomPastelColor(user.username)}`}>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 border-2 border-black rounded-full overflow-hidden bg-white">
              {user.profile_picture ? (
                <Image
                  src={user.profile_picture}
                  alt={user.username}
                  fill
                  sizes="(max-width: 768px) 64px, 64px"
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
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {user.biography ? (
            <div className="mb-4 border-2 border-black rounded-base bg-blue-100">
              <ScrollArea className="h-[120px] w-full p-4 text-black rounded-base">
                <p className="font-medium">{user.biography}</p>
              </ScrollArea>
            </div>
          ) : (
            <div className="mb-4 p-3 border-2 border-black rounded-base bg-gray-100 h-[120px] flex items-center justify-center">
              <p className="font-medium text-gray-500 italic">No biography available</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border-2 border-black p-3 bg-green-200 transform rotate-1 rounded-base">
              <p className="text-sm font-bold">FOLLOWERS</p>
              <p className="text-xl font-black">{formatNumber(user.follower_count)}</p>
            </div>
            <div className="border-2 border-black p-3 bg-yellow-200 transform -rotate-1 rounded-base">
              <p className="text-sm font-bold">FOLLOWING</p>
              <p className="text-xl font-black">{formatNumber(user.following_count)}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-2 border-black bg-gray-100 flex-col gap-2">
          <p className="text-xs font-bold w-full">Updated: {formatDate(user.updated_at)}</p>
          <div className="flex w-full gap-2">
            <Button variant="default" className="flex-1">
              View Profile
            </Button>
            <Button variant="neutral" className="flex-1">
              Archive Posts
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserCard;
