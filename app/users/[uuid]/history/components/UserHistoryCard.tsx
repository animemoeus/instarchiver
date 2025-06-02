'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InstagramUserHistory } from '@/app/types/instagram/history';
import { formatNumber, formatDate } from '../../../utils/formatters';

type HistoryChangeField = Extract<
  keyof InstagramUserHistory,
  | 'follower_count'
  | 'following_count'
  | 'media_count'
  | 'biography'
  | 'full_name'
  | 'is_private'
  | 'is_verified'
  | 'profile_picture'
>;

interface HistoryChange {
  field: HistoryChangeField;
  old: InstagramUserHistory[HistoryChangeField];
  new: InstagramUserHistory[HistoryChangeField];
}

interface UserHistoryCardProps {
  record: InstagramUserHistory;
  previousRecord?: InstagramUserHistory;
  index: number;
}

// Function to calculate differences between consecutive history records
const getChanges = (current: InstagramUserHistory, prev?: InstagramUserHistory) => {
  if (!prev) return null;

  const changes: HistoryChange[] = [];
  const fieldsToCheck: HistoryChangeField[] = [
    'follower_count',
    'following_count',
    'media_count',
    'biography',
    'full_name',
    'is_private',
    'is_verified',
    'profile_picture',
  ];

  fieldsToCheck.forEach(field => {
    if (current[field] !== prev[field]) {
      changes.push({
        field,
        old: prev[field],
        new: current[field],
      });
    }
  });

  return changes;
};

export function UserHistoryCard({ record, previousRecord, index }: UserHistoryCardProps) {
  const changes = getChanges(record, previousRecord);

  return (
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)] flex flex-col h-full">
      {/* Header with profile info */}
      <CardHeader className="border-b-2 border-[var(--border)] py-2 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image */}
          <div className="relative w-10 h-10 min-w-[40px] min-h-[40px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            {record.profile_picture ? (
              <Image
                src={record.profile_picture}
                alt={record.username}
                fill
                sizes="40px"
                className="object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-lg font-[var(--font-weight-heading)] text-[var(--foreground)]">${record.username.charAt(0).toUpperCase()}</span></div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-[var(--secondary-background)] flex items-center justify-center">
                <span className="text-lg font-[var(--font-weight-heading)] text-[var(--foreground)]">
                  {record.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-base text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{record.username}
            </CardTitle>
            {record.full_name && (
              <p className="font-[var(--font-weight-base)] text-[var(--foreground)] text-xs">
                {record.full_name}
              </p>
            )}
          </div>
          <Badge className="ml-auto text-xs font-[var(--font-weight-base)]">
            {formatDate(record.history_date)}
          </Badge>
        </div>
      </CardHeader>

      {/* Card content with changes */}
      <CardContent className="p-4 flex flex-col flex-grow">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              POSTS
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(record.media_count)}
            </p>
          </div>
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWERS
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(record.follower_count)}
            </p>
          </div>
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWING
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(record.following_count)}
            </p>
          </div>
        </div>

        {/* Biography */}
        {record.biography ? (
          <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] mb-4">
            <ScrollArea className="h-[80px] w-full p-2 text-[var(--foreground)] rounded-[var(--radius-base)]">
              <p className="font-[var(--font-weight-base)] text-xs">{record.biography}</p>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] h-[80px] mb-4 flex items-center justify-center">
            <p className="font-[var(--font-weight-base)] text-[var(--foreground)] italic text-xs">
              No biography available
            </p>
          </div>
        )}

        {/* Changes from previous record */}
        {previousRecord && (
          <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] p-3 flex-grow">
            <p className="font-[var(--font-weight-heading)] mb-2 text-xs text-[var(--foreground)]">
              Changes from previous record:
            </p>
            {changes && changes.length > 0 ? (
              <div className="space-y-2">
                {changes.map((change, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap gap-2 items-center bg-[var(--background)] border-2 border-[var(--border)] rounded-[var(--radius-base)] p-2"
                  >
                    <Badge className="font-[var(--font-weight-heading)] text-xs">
                      {change.field.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                    <span className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)]">
                      {(() => {
                        switch (change.field) {
                          case 'follower_count':
                          case 'following_count':
                          case 'media_count':
                            return (
                              <span className="font-[var(--font-weight-heading)]">
                                {formatNumber(change.old as number)} →{' '}
                                {formatNumber(change.new as number)}
                              </span>
                            );
                          case 'is_private':
                          case 'is_verified':
                            return (
                              <span>
                                {(change.old as boolean) ? 'Yes' : 'No'} →{' '}
                                {(change.new as boolean) ? 'Yes' : 'No'}
                              </span>
                            );
                          case 'profile_picture':
                            return 'Changed profile picture';
                          default:
                            return (
                              <span className="font-[var(--font-weight-base)]">
                                {(change.old as string) || 'none'} →{' '}
                                {(change.new as string) || 'none'}
                              </span>
                            );
                        }
                      })()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)] italic">
                No changes
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] p-2 mt-auto">
        <p className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)] w-full">
          History Date: {formatDate(record.history_date)}
        </p>
      </CardFooter>
    </Card>
  );
}
