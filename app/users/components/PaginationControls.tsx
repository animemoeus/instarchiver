'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPrevPage,
  onNextPage,
}: PaginationControlsProps) {
  return (
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
        disabled={!hasPrevious}
        onClick={onPrevPage}
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
        disabled={!hasNext}
        onClick={onNextPage}
        className="bg-cyan-400 border-4 border-black text-black font-bold shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-300"
      >
        Next Page →
      </Button>
    </div>
  );
}

export default PaginationControls;
