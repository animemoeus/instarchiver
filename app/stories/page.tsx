'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StoriesGrid, StorySkeleton, StoryPage, StoryPreviewModal } from './components';
import { useStoriesQueryWithOptions, API_CONSTANTS } from '@/hooks/useStories';
import { InstagramStory } from '@/app/types/instagram/story';
import { useIsMobile } from '@/hooks/use-mobile';
import { useViewMode } from '@/hooks/useViewMode';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useViewMode();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);
  const [previewStory, setPreviewStory] = useState<InstagramStory | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Reset state when navigating away
  useEffect(() => {
    // Clean up function runs when component unmounts
    return () => {
      setSearchQuery('');
      setCurrentPage(1);
    };
  }, []);

  // Update maxVisiblePages when screen size changes
  useEffect(() => {
    setMaxVisiblePages(isMobile ? 3 : 5);
  }, [isMobile]);

  // Initialize state from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');

    console.log(`[URL Effect] URL params - search: "${search}", page: "${page}"`);
    console.log(
      `[URL Effect] Current state - searchQuery: "${searchQuery}", currentPage: ${currentPage}`
    );

    if (search && search !== searchQuery) {
      console.log(`[URL Effect] Setting search query from URL: "${search}"`);
      setSearchQuery(search);
    }

    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum !== currentPage) {
        console.log(`[URL Effect] Setting page from URL: ${pageNum}`);
        setCurrentPage(pageNum);
      }
    }
  }, [searchParams, currentPage, searchQuery]); // Include all dependencies

  const { data, isLoading } = useStoriesQueryWithOptions({
    page: currentPage,
    searchQuery,
  });

  const totalPages = data ? Math.ceil(data.count / API_CONSTANTS.COUNT_PER_PAGE) : 1;
  const stories = data ? data.results : [];

  console.log(
    `[Stories Render] isLoading: ${isLoading}, stories count: ${stories.length}, currentPage: ${currentPage}, searchQuery: "${searchQuery}"`
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoryPreview = (story: InstagramStory) => {
    setPreviewStory(story);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewStory(null);
  };

  const handleSearch = (query: string) => {
    console.log(`[handleSearch] Searching for: "${query}"`);
    setSearchQuery(query);
    setCurrentPage(1);

    // Build URL with search
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());

    const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
    router.push(url);
    scrollToTop();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      console.log(`[handlePrevPage] Moving to page: ${newPage}`);
      setCurrentPage(newPage);

      // Build URL with current search and new page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (newPage > 1) params.set('page', newPage.toString());

      const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
      router.push(url);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      console.log(`[handleNextPage] Moving to page: ${newPage}`);
      setCurrentPage(newPage);

      // Build URL with current search and new page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      params.set('page', newPage.toString());

      router.push(`/stories?${params.toString()}`);
      scrollToTop();
    }
  };

  const handlePageClick = (targetPage: number) => {
    if (targetPage !== currentPage) {
      console.log(`[handlePageClick] Moving to page: ${targetPage}`);
      setCurrentPage(targetPage);

      // Build URL with current search and target page
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (targetPage > 1) params.set('page', targetPage.toString());

      const url = params.toString() ? `/stories?${params.toString()}` : '/stories';
      router.push(url);
      scrollToTop();
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    // Use the state value that is updated based on screen size

    pages.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 2);

    if (currentPage <= Math.floor(maxVisiblePages / 2)) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
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
    <StoryPage
      totalStories={data?.count || 0}
      currentPage={currentPage}
      searchQuery={searchQuery}
      viewMode={viewMode}
      onSearch={handleSearch}
      onViewModeChange={setViewMode}
      storiesContent={
        isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
            {[...Array(8)].map((_, index) => (
              <StorySkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <StoriesGrid
              stories={stories}
              viewMode={viewMode}
              onStoryPreview={handleStoryPreview}
            />
            <StoryPreviewModal
              story={previewStory}
              isOpen={isPreviewOpen}
              onClose={handleClosePreview}
            />
          </>
        )
      }
      pagination={
        !isLoading && (
          <Pagination className="mt-12">
            <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <PaginationItem className="min-w-9 sm:min-w-10">
                <PaginationPrevious
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage > 1) handlePrevPage();
                  }}
                  aria-disabled={currentPage === 1}
                  className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''} px-2 sm:px-3`}
                />
              </PaginationItem>

              {pageNumbers.map((page, index) => {
                if (page === 'start-ellipsis' || page === 'end-ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={page} className="min-w-9 sm:min-w-10">
                    <PaginationLink
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        if (typeof page === 'number') handlePageClick(page);
                      }}
                      isActive={currentPage === page}
                      className="px-2 sm:px-3 h-9 sm:h-10"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem className="min-w-9 sm:min-w-10">
                <PaginationNext
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (currentPage < totalPages) handleNextPage();
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''} px-2 sm:px-3`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )
      }
    />
  );
}
