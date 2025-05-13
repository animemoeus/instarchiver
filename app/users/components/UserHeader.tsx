import React from 'react';
import { SearchBar } from './SearchBar';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserHeaderProps {
  totalUsers: number;
  currentPage: number;
}

export function UserHeader({
  totalUsers,
  currentPage,
  title = 'Instagram User Archive',
  subtitle,
}: UserHeaderProps & { title?: string; subtitle?: string }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Badge variant="default">Total: {totalUsers}</Badge>
            <Badge variant="default">Page: {currentPage}</Badge>
            {searchQuery && <Badge variant="default">Search: {searchQuery}</Badge>}
          </div>

          {/* Add the search bar component if showing users list */}
          {title === 'Instagram User Archive' && <SearchBar initialQuery={searchQuery} />}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserHeader;
