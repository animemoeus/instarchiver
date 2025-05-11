import React from 'react';
import { SearchBar } from './SearchBar';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserHeaderProps {
  totalUsers: number;
  currentPage: number;
}

export function UserHeader({ totalUsers, currentPage }: UserHeaderProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Instagram User Archive</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Badge variant="default">Total Users: {totalUsers}</Badge>
            <Badge variant="default">Page: {currentPage}</Badge>
            {searchQuery && <Badge variant="default">Search: {searchQuery}</Badge>}
          </div>

          {/* Add the search bar component */}
          <SearchBar initialQuery={searchQuery} />
        </CardContent>
      </Card>
    </div>
  );
}

export default UserHeader;
