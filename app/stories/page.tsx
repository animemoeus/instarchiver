'use client';

import { useState, useEffect } from 'react';
import { StoriesGrid } from './components/StoriesGrid';
import { StorySkeleton } from './components/StorySkeleton';
import { PaginationControls } from '../users/components/PaginationControls';
import { SearchBar } from '../users/components/SearchBar';
import { fetchStories } from './services/api';

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-black text-5xl mb-4 bg-yellow-400 inline-block px-4 py-2 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          INSTAGRAM STORIES ARCHIVE
        </h1>
        <p className="text-xl mt-4 font-medium">
          Browse and discover the latest Instagram stories across all users.
        </p>
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
          <StoriesGrid stories={stories} />
          <div className="mt-12">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
