'use client';

import { useState, useEffect } from 'react';
import { StoriesGrid, StorySkeleton } from './components';
import { SearchBar } from '../users/components/SearchBar';
import { fetchStories } from './services/api';
import { InstagramStory } from '@/app/types/instagram/story';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export default function StoriesPage() {
  const [stories, setStories] = useState<InstagramStory[]>([]); // Correct type for stories
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(1); // Default volume at 100%
  const [isLooping, setIsLooping] = useState(true); // Default looping enabled
  const [isMuted, setIsMuted] = useState(true); // Default muted (sound disabled)

  useEffect(() => {
    const getStories = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStories(currentPage, searchQuery);
        setStories(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getStories();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);
  }, [currentPage, totalPages]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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

  const handlePageClick = (targetPage: number) => {
    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-black text-5xl mb-4">INSTAGRAM STORIES ARCHIVE</h1>
        <p className="text-xl mt-4 font-medium">
          Browse and discover the latest Instagram stories across all users.
        </p>

        <div className="mt-6 flex items-center gap-6">
          <label className="text-lg font-bold">
            Volume:
            <Input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className={`${isMuted ? 'opacity-50' : 'opacity-100'}`}
              disabled={isMuted}
            />
          </label>
          <label className="text-lg font-bold flex items-center gap-2">
            <Input
              type="checkbox"
              checked={isLooping}
              onChange={e => setIsLooping(e.target.checked)}
            />
            Loop
          </label>
          <label className="text-lg font-bold flex items-center gap-2">
            <Input type="checkbox" checked={isMuted} onChange={e => setIsMuted(e.target.checked)} />
            Mute
          </label>
        </div>
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
