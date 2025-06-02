'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstagramUserHistory } from '@/app/types/instagram/history';
import { UserHistoryCard } from './UserHistoryCard';
import { UserHistorySkeleton } from './UserHistorySkeleton';

interface UserHistoryListProps {
  historyRecords: InstagramUserHistory[];
  isLoading: boolean;
  error: Error | null;
}

export function UserHistoryList({ historyRecords, isLoading, error }: UserHistoryListProps) {
  return (
    <>
      {/* Error display */}
      {error && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="font-[var(--font-weight-heading)] mb-4">Failed to load history records</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Display history records when available, otherwise show skeletons */}
        {!isLoading && historyRecords.length > 0
          ? historyRecords.map((record, index) => (
              <UserHistoryCard
                key={record.history_id}
                record={record}
                index={index}
                previousRecord={historyRecords[index + 1]}
              />
            ))
          : isLoading &&
            [...Array(6)].map((_, index) => <UserHistorySkeleton key={index} index={index} />)}

        {/* No records message */}
        {!isLoading && historyRecords.length === 0 && (
          <div className="col-span-3">
            <Card className="border-2 border-[var(--border)] shadow-[var(--shadow)]">
              <CardContent className="p-6 text-center">
                <p className="text-base font-[var(--font-weight-heading)] text-[var(--foreground)]">
                  No history records found
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
