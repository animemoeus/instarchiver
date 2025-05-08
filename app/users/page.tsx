'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query';
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

const BASE_API_URL = process.env.NEXT_PUBLIC_INSTAGRAM_API_BASE_URL || 'https://api.animemoe.us';
const API_ENDPOINT = '/instagram/users/';
const COUNT_PER_PAGE = 9;

// Function to parse URL params from API URLs
const extractPageFromUrl = (url: string | null): number => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
};

// Function to create API URL from page number
const createApiUrl = (page: number): string => {
  return `${BASE_API_URL}${API_ENDPOINT}?count=${COUNT_PER_PAGE}&format=json&page=${page}`;
};

// Function to fetch Instagram users
const fetchInstagramUsers = async (page: number): Promise<ApiResponse> => {
  const url = createApiUrl(page);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
};

export default function InstagramUsersList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Get the current page from the URL parameters or default to 1
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string, 10)
    : 1;

  // Local state to manage pagination and animations
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery<ApiResponse, Error>({
    queryKey: ['instagramUsers', currentPage] as QueryKey,
    queryFn: () => fetchInstagramUsers(currentPage),
    placeholderData: keepPreviousData => keepPreviousData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Prefetch next page data for smoother pagination
  useEffect(() => {
    if (data?.next) {
      const nextPage = extractPageFromUrl(data.next);
      queryClient.prefetchQuery({
        queryKey: ['instagramUsers', nextPage] as QueryKey,
        queryFn: () => fetchInstagramUsers(nextPage),
      });
    }
  }, [data, queryClient]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage === 1) {
      params.delete('page');
    } else {
      params.set('page', currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

    router.push(newUrl, { scroll: false });
  }, [currentPage, router, searchParams]);

  // Animation effect after data loads
  useEffect(() => {
    if (!isLoading && data) {
      // No delay, immediate display
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [isLoading, data]);

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

  // Generate a consistent pastel color for each user card header
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

  // Next and previous page handlers
  const handleNextPage = (): void => {
    if (data?.next) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = (): void => {
    if (data?.previous) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.count / COUNT_PER_PAGE) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section with neo-brutalist design */}
      <div className="mb-12 relative">
        <div className="absolute -top-2 -left-2 w-full h-full bg-yellow-400 border-4 border-black -z-10 transform rotate-1"></div>
        <div className="bg-white border-4 border-black p-6 relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-4">Instagram Users</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-purple-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <p className="text-lg font-black text-black">Total Users: {data?.count || 0}</p>
            </div>
            <div className="bg-cyan-400 border-4 border-black px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
              <p className="text-lg font-black text-black">Page: {currentPage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error instanceof Error && (
        <div className="mb-8 bg-red-400 border-4 border-black p-4 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          <p className="font-bold text-black">{error.message}</p>
          <Button
            onClick={() => setCurrentPage(1)}
            className="mt-2 bg-white text-black border-4 border-black font-bold hover:bg-gray-100"
          >
            Try Again
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Skeleton loaders with animations */}
        {isLoading &&
          [...Array(COUNT_PER_PAGE)].map((_, index: number) => {
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
        {!isLoading &&
          data?.results.map((user: InstagramUser, index: number) => (
            <div
              key={user.uuid}
              className="relative"
              style={{
                opacity: 1,
                transform: 'none',
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

      {/* Pagination controls */}
      {!isLoading && data && (
        <div
          className="mt-12 flex flex-wrap justify-center gap-6"
          style={{
            opacity: 1,
            transform: 'none',
          }}
        >
          <Button
            variant="default"
            size="lg"
            disabled={!data.previous}
            onClick={handlePrevPage}
            className="bg-orange-400 border-4 border-black text-black font-bold shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-300"
          >
            ← Previous Page
          </Button>
          <div className="bg-white border-4 border-black px-4 py-2 flex items-center">
            <p className="font-bold">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            disabled={!data.next}
            onClick={handleNextPage}
            className="bg-cyan-400 border-4 border-black text-black font-bold shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-300"
          >
            Next Page →
          </Button>
        </div>
      )}
    </div>
  );
}
