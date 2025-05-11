import React from 'react';
import { SearchBar } from './SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserHeaderProps {
  totalUsers: number;
  currentPage: number;
}

export function UserHeader({ totalUsers, currentPage }: UserHeaderProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const router = useRouter();

  const handleResetFilters = () => {
    router.push('/users');
  };

  return (
    <div className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Instagram Users</CardTitle>
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
        {(searchQuery || currentPage > 1) && (
          <CardFooter className="flex justify-end">
            <Button variant="neutral" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default UserHeader;
