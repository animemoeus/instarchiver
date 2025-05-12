import React from 'react';
import { Pagination } from './pagination';
import { Button } from './button';

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button onClick={onPrevPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <Pagination>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </Pagination>
      <Button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};
