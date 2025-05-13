'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { StoriesGrid, StorySkeleton } from './components';
import { SearchBar } from '../users/components/SearchBar';
import { fetchStories, API_CONSTANTS } from './services/api';
import { InstagramStory, InstagramStoriesResponse } from '@/app/types/instagram/story';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function StoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get('page') ?? '1'));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['stories', currentPage, searchQuery],
    queryFn: () => fetchStories(currentPage, searchQuery),
    staleTime: 5000,
  });

  const totalPages = data ? Math.ceil(data.count / API_CONSTANTS.COUNT_PER_PAGE) : 1;
  const stories = data ? data.results : [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    router.push(`/stories?search=${encodeURIComponent(query)}&page=1`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${newPage}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${newPage}`);
    }
  };

  const handlePageClick = (targetPage: number) => {
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      router.push(`/stories?search=${encodeURIComponent(searchQuery)}&page=${targetPage}`);
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 1);
    }

    if (startPage > 2) {
      pages.push('start-ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1 && totalPages > 1) {
      pages.push('end-ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div>
        <h1 className="font-black text-5xl mb-4">INSTAGRAM STORIES ARCHIVE</h1>
        <p className="text-xl mt-4 font-medium">
          Browse and discover the latest Instagram stories across all users.
        </p>

        <Card className="mt-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-fuchsia-100">
          <CardHeader className="border-b-4 border-black bg-amber-300">
            <CardTitle className="text-3xl font-black uppercase">Media Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <label className="text-lg font-bold flex items-center gap-2 border-2 border-black p-3 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <Input
                    type="checkbox"
                    checked={isMuted}
                    onChange={e => setIsMuted(e.target.checked)}
                    className="w-6 h-6 border-2 border-black rounded"
                  />
                  <span className="uppercase">Mute Audio</span>
                </label>

                <label className="text-lg font-bold flex items-center gap-2 border-2 border-black p-3 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                  <Input
                    type="checkbox"
                    checked={isLooping}
                    onChange={e => setIsLooping(e.target.checked)}
                    className="w-6 h-6 border-2 border-black rounded"
                  />
                  <span className="uppercase">Loop Videos</span>
                </label>
              </div>

              <div
                className={`p-4 border-2 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isMuted ? 'opacity-50 bg-gray-100' : 'bg-blue-100'}`}
              >
                <label className="text-lg font-black block mb-3 uppercase">Volume Control:</label>
                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[volume]}
                  onValueChange={values => setVolume(values[0])}
                  disabled={isMuted}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm font-bold mt-2">
                  <span className="px-2 py-1 bg-black text-white rounded">0%</span>
                  <span className="px-2 py-1 bg-black text-white rounded">
                    {Math.round(volume * 100)}%
                  </span>
                  <span className="px-2 py-1 bg-black text-white rounded">100%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search by username..." />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[...Array(6)].map((_, index) => (
            <StorySkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <StoriesGrid stories={stories} volume={volume} isLooping={isLooping} isMuted={isMuted} />
          <Pagination className="mt-12">
            <PaginationContent className="flex-wrap gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage > 1) handlePrevPage();
                  }}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
                />
              </PaginationItem>

              {pageNumbers.map((page, index) => {
                if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`} className="hidden sm:flex">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        if (typeof page === 'number') handlePageClick(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage < totalPages) handleNextPage();
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
