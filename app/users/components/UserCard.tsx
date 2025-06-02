'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { InstagramUser } from '@/app/types/instagram';

interface UserCardProps {
  user: InstagramUser;
  index?: number; // Optional index for consistent color matching with skeleton
}

// Helper functions
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function UserCard({ user, index }: UserCardProps) {
  return (
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)] flex flex-col h-full">
      <CardHeader className="border-b-2 border-[var(--border)] py-2 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image */}
          <div className="relative w-10 h-10 min-w-[40px] min-h-[40px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            {user.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt={user.username}
                fill
                sizes="40px"
                className="object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-lg font-[var(--font-weight-heading)] text-[var(--foreground)]">${user.username.charAt(0).toUpperCase()}</span></div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-[var(--secondary-background)] flex items-center justify-center">
                <span className="text-lg font-[var(--font-weight-heading)] text-[var(--foreground)]">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-base text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{user.username}
            </CardTitle>
            {user.full_name && (
              <CardDescription className="font-[var(--font-weight-base)] text-[var(--foreground)] text-xs">
                {user.full_name}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex flex-col flex-grow">
        {/* User Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              POSTS
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">--</p>
          </div>
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWERS
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(user.follower_count)}
            </p>
          </div>
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWING
            </p>
            <p className="text-sm text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(user.following_count)}
            </p>
          </div>
        </div>

        {/* User Bio */}
        {user.biography ? (
          <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex-grow">
            <ScrollArea className="h-[80px] w-full p-2 text-[var(--foreground)] rounded-[var(--radius-base)]">
              <p className="font-[var(--font-weight-base)] text-xs">{user.biography}</p>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-2 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] h-[80px] flex-grow flex items-center justify-center">
            <p className="font-[var(--font-weight-base)] text-[var(--foreground)] italic text-xs">
              No biography available
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-1 p-2 mt-auto">
        <p className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)] w-full">
          Last Update: {formatDate(user.updated_at)}
        </p>
        <div className="flex w-full gap-1">
          <Link href={`/users/${user.uuid}`} className="flex-1">
            <Button className="w-full font-[var(--font-weight-heading)] text-xs py-1 h-auto">
              VIEW PROFILE
            </Button>
          </Link>
          <Button
            variant="neutral"
            className="flex-1 font-[var(--font-weight-heading)] text-xs py-1 h-auto"
          >
            ARCHIVE POSTS
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserCard;
