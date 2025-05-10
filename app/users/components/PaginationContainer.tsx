'use client';

import { Suspense } from 'react';
import PaginationControls from './PaginationControls';

interface PaginationContainerProps {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

// This component wraps the PaginationControls with a Suspense boundary for streaming
export function PaginationContainer({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPrevPage,
  onNextPage,
}: PaginationContainerProps) {
  return (
    <Suspense
      fallback={
        <div className="mt-12 flex justify-center">
          <div className="bg-gray-200 border-4 border-black h-12 w-64 animate-pulse"></div>
        </div>
      }
    >
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    </Suspense>
  );
}

export default PaginationContainer;
