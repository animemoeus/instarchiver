'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InstagramUserHistory } from '@/app/types/instagram/history';
import { neoBrutalistColors } from '../../../utils/colors';
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
  const headerColorClass = neoBrutalistColors.header[index % neoBrutalistColors.header.length];
  const changes = getChanges(record, previousRecord);

  return (
    <Card className="w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)] overflow-hidden">
      {/* Header with profile info */}
      <CardHeader className={`border-b-2 border-black py-3 ${headerColorClass}`}>
        <div className="flex items-center gap-3">
          {/* Profile image */}
          <div className="relative w-14 h-14 border-2 border-black rounded-full overflow-hidden bg-white">
            {record.profile_picture ? (
              <Image
                src={record.profile_picture}
                alt={record.username}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl font-black">
                  {record.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-xl font-black">@{record.username}</CardTitle>
            {record.full_name && (
              <p className="font-medium text-black text-sm">{record.full_name}</p>
            )}
          </div>
          <Badge variant="neutral" className="ml-auto">
            {formatDate(record.history_date)}
          </Badge>
        </div>
      </CardHeader>

      {/* Card content with changes */}
      <CardContent className="p-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4 border-2 border-black rounded-base overflow-hidden">
          <div
            className={`p-3 ${neoBrutalistColors.stats.posts} flex flex-col items-center justify-center`}
          >
            <p className="text-xs font-black">POSTS</p>
            <p className="text-lg font-black">{formatNumber(record.media_count)}</p>
          </div>
          <div
            className={`p-3 ${neoBrutalistColors.stats.followers} flex flex-col items-center justify-center`}
          >
            <p className="text-xs font-black">FOLLOWERS</p>
            <p className="text-lg font-black">{formatNumber(record.follower_count)}</p>
          </div>
          <div
            className={`p-3 ${neoBrutalistColors.stats.following} flex flex-col items-center justify-center`}
          >
            <p className="text-xs font-black">FOLLOWING</p>
            <p className="text-lg font-black">{formatNumber(record.following_count)}</p>
          </div>
        </div>

        {/* Biography */}
        {record.biography ? (
          <div className={`mb-4 border-2 border-black rounded-base ${neoBrutalistColors.bio}`}>
            <ScrollArea className="h-[100px] w-full p-3 text-black rounded-base">
              <p className="font-medium text-sm">{record.biography}</p>
            </ScrollArea>
          </div>
        ) : (
          <div className="mb-4 p-3 border-2 border-black rounded-base bg-gray-100 h-[100px] flex items-center justify-center">
            <p className="font-medium text-gray-500 italic text-sm">No biography available</p>
          </div>
        )}

        {/* Changes from previous record */}
        {previousRecord && (
          <div className="border-2 border-black rounded-base p-3 bg-yellow-100">
            <p className="font-black mb-2 text-sm">Changes from previous record:</p>
            {changes && changes.length > 0 ? (
              <div className="space-y-2">
                {changes.map((change, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap gap-2 items-center bg-white border-2 border-black rounded-base p-2"
                  >
                    <Badge variant="neutral" className="font-bold">
                      {change.field.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">
                      {(() => {
                        switch (change.field) {
                          case 'follower_count':
                          case 'following_count':
                          case 'media_count':
                            return (
                              <span className="font-black">
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
                              <span className="font-medium">
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
              <p className="text-sm font-medium text-gray-500 italic">No changes</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
