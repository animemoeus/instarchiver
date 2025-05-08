'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define types based on the provided API response
interface InstagramUser {
  uuid: string;
  instagram_id: string;
  username: string;
  full_name: string;
  profile_picture: string;
  biography: string;
  follower_count: number;
  following_count: number;
  allow_auto_update_stories: boolean;
  updated_from_api_datetime: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: InstagramUser[];
}

export default function InstagramUsersList() {
  const [users, setUsers] = useState<InstagramUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string | null>(
    'https://api.animemoe.us/instagram/users/?count=9&format=json&page=1'
  );
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (url: string) => {
    if (!url) return;

    setLoading(true);
    setLoaded(false);
    setError(null);

    try {
      // Extract page number from URL
      const pageMatch = url.match(/page=(\d+)/);
      if (pageMatch && pageMatch[1]) {
        setCurrentPage(parseInt(pageMatch[1], 10));
      }

      // Fetch real data from the API
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      setUsers(data.results);
      setPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setTotalCount(data.count);

      // Add a slight delay before showing content to make the transition more noticeable
      setTimeout(() => {
        setLoaded(true);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.error('Failed to fetch Instagram users:', error);
      setError('Failed to load Instagram users. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageUrl) {
      fetchUsers(pageUrl);
    }
  }, []);

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

  // Generate a random pastel color for each user card header
  const getRandomPastelColor = (seed: string) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with neo-brutalist design */}
      <div className="mb-12 relative">
        <div className="absolute -top-2 -left-2 w-full h-full bg-yellow-400 border-4 border-black -z-10 transform rotate-1"></div>
        <div className="bg-white border-4 border-black p-6 relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-4">Instagram Users</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-purple-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <p className="text-lg font-black text-black">Total Users: {totalCount}</p>
            </div>
            <div className="bg-cyan-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <p className="text-lg font-black text-black">Page: {currentPage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-8 bg-red-400 border-4 border-black p-4 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <p className="font-bold text-black">{error}</p>
          <Button
            onClick={() =>
              fetchUsers('https://api.animemoe.us/instagram/users/?count=9&format=json&page=1')
            }
            className="mt-2 bg-white text-black border-4 border-black font-bold hover:bg-gray-100"
          >
            Try Again
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Skeleton loaders with animations */}
        {loading &&
          [...Array(9)].map((_, index) => {
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
                key={`skeleton-${index}`}
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
          })}

        {/* Real content with animations */}
        {!loading &&
          users.map((user, index) => (
            <div
              key={user.uuid}
              className="opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <Card className="transform transition-all duration-300 hover:-rotate-2 hover:scale-[1.02] border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
                <CardHeader
                  className={`border-b-4 border-black ${getRandomPastelColor(user.username)}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 border-4 border-black rounded-full overflow-hidden bg-white">
                      {user.profile_picture ? (
                        <Image
                          src={user.profile_picture}
                          alt={user.username}
                          fill
                          className="object-cover"
                          onError={e => {
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
                      <CardTitle className="text-2xl font-black text-black">
                        @{user.username}
                      </CardTitle>
                      {user.full_name && (
                        <CardDescription className="text-black font-bold">
                          {user.full_name}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  {user.biography ? (
                    <div className="mb-4 bg-blue-100 p-3 border-2 border-black">
                      <p className="font-medium text-black">{user.biography}</p>
                    </div>
                  ) : (
                    <div className="mb-4 bg-gray-100 p-3 border-2 border-black">
                      <p className="font-medium text-gray-500 italic">No biography available</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="border-2 border-black p-3 bg-green-200 transform rotate-1">
                      <p className="text-sm font-bold">FOLLOWERS</p>
                      <p className="text-xl font-black">{formatNumber(user.follower_count)}</p>
                    </div>
                    <div className="border-2 border-black p-3 bg-yellow-200 transform -rotate-1">
                      <p className="text-sm font-bold">FOLLOWING</p>
                      <p className="text-xl font-black">{formatNumber(user.following_count)}</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t-4 border-black bg-gray-100 justify-between">
                  <p className="text-xs font-bold">Updated: {formatDate(user.updated_at)}</p>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-purple-500 text-white border-2 border-black font-bold transform transition-all hover:translate-y-[-2px] hover:translate-x-[-2px]"
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>

      {/* Pagination controls with animated entrance */}
      {!loading && (
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 opacity-0 transform translate-y-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 500ms ease-in-out',
            transitionDelay: `${users.length * 50}ms`,
          }}
        >
          <Button
            variant="default"
            size="lg"
            disabled={!prevPageUrl}
            onClick={() => prevPageUrl && fetchUsers(prevPageUrl)}
            className="bg-orange-400 border-4 border-black text-black font-bold shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-300"
          >
            ← Previous Page
          </Button>
          <div className="bg-white border-4 border-black px-4 py-2 flex items-center">
            <p className="font-bold">
              Page {currentPage} of {Math.ceil(totalCount / users.length)}
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            disabled={!pageUrl}
            onClick={() => pageUrl && fetchUsers(pageUrl)}
            className="bg-cyan-400 border-4 border-black text-black font-bold shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-300"
          >
            Next Page →
          </Button>
        </div>
      )}
    </div>
  );
}
