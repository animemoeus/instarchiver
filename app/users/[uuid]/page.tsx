'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { InstagramUser } from '@/app/types/instagram';
import { neoBrutalistColors } from '../utils/colors';
import { formatNumber, formatDate } from '../utils/formatters';

interface UserDetailPageProps {
  params: Promise<{
    uuid: string;
  }>;
}

async function fetchUserDetail(uuid: string): Promise<InstagramUser> {
  const response = await fetch(`https://api.animemoe.us/instagram/users/${uuid}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  // Properly unwrap params using React.use()
  const resolvedParams = React.use(params);
  const { uuid } = resolvedParams;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<InstagramUser>({
    queryKey: ['user', uuid],
    queryFn: () => fetchUserDetail(uuid),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <CardHeader className={`border-b-2 border-black bg-gray-100 p-4 sm:p-6`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Profile Image Skeleton */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-black rounded-full overflow-hidden bg-gray-200 animate-pulse shrink-0" />

              {/* User Info Skeleton */}
              <div className="flex-1 w-full">
                <div className="flex flex-col items-center sm:items-start">
                  <div className="text-center sm:text-left space-y-2 w-full">
                    <div className="h-8 bg-gray-200 rounded-base border-2 border-black w-48 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-32 animate-pulse" />
                  </div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                  <div className="border-2 border-black rounded-base p-2 sm:p-4 text-center bg-gray-100">
                    <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-12 mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-16 mx-auto animate-pulse" />
                  </div>
                  <div className="border-2 border-black rounded-base p-2 sm:p-4 text-center bg-gray-100">
                    <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-12 mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-16 mx-auto animate-pulse" />
                  </div>
                  <div className="border-2 border-black rounded-base p-2 sm:p-4 text-center bg-gray-100">
                    <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-12 mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-16 mx-auto animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-8">
            {/* Biography Skeleton */}
            <div className="mb-6 sm:mb-8">
              <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-24 mb-3 sm:mb-4 animate-pulse" />
              <div className="border-2 border-black rounded-base bg-gray-100 p-3 sm:p-4 h-[100px] sm:h-[120px]">
                <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-full mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-3/4 animate-pulse" />
              </div>
            </div>

            {/* Account Info Skeleton */}
            <div>
              <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-40 mb-3 sm:mb-4 animate-pulse" />
              <div className="grid gap-3 sm:gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-24 animate-pulse" />
                    <div className="h-5 bg-gray-200 rounded-base border-2 border-black w-16 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t-2 border-black bg-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <div className="h-9 bg-gray-200 rounded-base border-2 border-black flex-1 animate-pulse" />
              <div className="h-9 bg-gray-200 rounded-base border-2 border-black flex-1 animate-pulse" />
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <CardHeader className="border-b-2 border-black bg-red-400">
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-lg font-bold">Failed to load user details</p>
            <Link href="/users">
              <Button className="mt-4">Back to Users</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        {/* Profile Header */}
        <CardHeader
          className={`border-b-2 border-black ${neoBrutalistColors.header[0]} p-4 sm:p-6`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Profile Image */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-black rounded-full overflow-hidden bg-white shrink-0">
              {user.profile_picture ? (
                <Image
                  src={user.profile_picture}
                  alt={user.username}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-4xl font-black">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-center sm:text-left">
                  <CardTitle className="text-2xl sm:text-3xl font-black mb-2">
                    @{user.username}
                  </CardTitle>
                  {user.full_name && (
                    <p className="text-lg sm:text-xl font-bold mb-4">{user.full_name}</p>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                <div
                  className={`${neoBrutalistColors.stats.posts} border-2 border-black rounded-base p-2 sm:p-4 text-center`}
                >
                  <p className="text-xs sm:text-sm font-black">POSTS</p>
                  <p className="text-lg sm:text-2xl font-black">{formatNumber(user.media_count)}</p>
                </div>
                <div
                  className={`${neoBrutalistColors.stats.followers} border-2 border-black rounded-base p-2 sm:p-4 text-center`}
                >
                  <p className="text-xs sm:text-sm font-black">FOLLOWERS</p>
                  <p className="text-lg sm:text-2xl font-black">
                    {formatNumber(user.follower_count)}
                  </p>
                </div>
                <div
                  className={`${neoBrutalistColors.stats.following} border-2 border-black rounded-base p-2 sm:p-4 text-center`}
                >
                  <p className="text-xs sm:text-sm font-black">FOLLOWING</p>
                  <p className="text-lg sm:text-2xl font-black">
                    {formatNumber(user.following_count)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-8">
          {/* Biography */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">Biography</h2>
            {user.biography ? (
              <div className={`border-2 border-black rounded-base ${neoBrutalistColors.bio}`}>
                <ScrollArea className="h-[100px] sm:h-[120px] w-full p-3 sm:p-4">
                  <p className="font-medium text-sm sm:text-base">{user.biography}</p>
                </ScrollArea>
              </div>
            ) : (
              <div className="border-2 border-black rounded-base bg-gray-100 p-3 sm:p-4">
                <p className="font-medium text-sm sm:text-base text-gray-500 italic">
                  No biography available
                </p>
              </div>
            )}
          </div>

          {/* Account Info */}
          <div>
            <h2 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">Account Information</h2>
            <div className="grid gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                <Badge variant="neutral" className="font-bold w-fit">
                  LAST UPDATED
                </Badge>
                <span className="font-medium text-sm sm:text-base">
                  {formatDate(user.updated_at)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                <Badge variant="neutral" className="font-bold w-fit">
                  VERIFIED
                </Badge>
                <span className="font-medium text-sm sm:text-base">
                  {user.is_verified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                <Badge variant="neutral" className="font-bold w-fit">
                  PRIVATE
                </Badge>
                <span className="font-medium text-sm sm:text-base">
                  {user.is_private ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className={`border-t-2 border-black ${neoBrutalistColors.footer} p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Button disabled={user.is_private} className="flex-1 font-black">
              VIEW STORIES
            </Button>
            <Button disabled={user.is_private} variant="neutral" className="flex-1 font-black">
              ARCHIVE POSTS
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
