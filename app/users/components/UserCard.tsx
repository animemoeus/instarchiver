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
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)]">
      <CardHeader className="border-b-2 border-[var(--border)] py-3 bg-[var(--main)]">
        <div className="flex items-center gap-3">
          {/* Profile image */}
          <div className="relative w-14 h-14 min-w-[56px] min-h-[56px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            {user.profile_picture ? (
              <Image
                src={user.profile_picture}
                alt={user.username}
                fill
                sizes="(max-width: 768px) 56px, 56px"
                className="object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-2xl font-[var(--font-weight-heading)] text-[var(--foreground)]">${user.username.charAt(0).toUpperCase()}</span></div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-[var(--secondary-background)] flex items-center justify-center">
                <span className="text-2xl font-[var(--font-weight-heading)] text-[var(--foreground)]">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-xl text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{user.username}
            </CardTitle>
            {user.full_name && (
              <CardDescription className="font-[var(--font-weight-base)] text-[var(--foreground)]">
                {user.full_name}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* User Statistics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              POSTS
            </p>
            <p className="text-lg text-[var(--foreground)] font-[var(--font-weight-heading)]">--</p>
          </div>
          <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWERS
            </p>
            <p className="text-lg text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(user.follower_count)}
            </p>
          </div>
          <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex flex-col items-center">
            <p className="text-xs text-[var(--foreground)] font-[var(--font-weight-heading)]">
              FOLLOWING
            </p>
            <p className="text-lg text-[var(--foreground)] font-[var(--font-weight-heading)]">
              {formatNumber(user.following_count)}
            </p>
          </div>
        </div>

        {/* User Bio */}
        {user.biography ? (
          <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]">
            <ScrollArea className="h-[100px] w-full p-3 text-[var(--foreground)] rounded-[var(--radius-base)]">
              <p className="font-[var(--font-weight-base)] text-sm">{user.biography}</p>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] h-[100px] flex items-center justify-center">
            <p className="font-[var(--font-weight-base)] text-[var(--foreground)] italic text-sm">
              No biography available
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <p className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)] w-full">
          Last Update: {formatDate(user.updated_at)}
        </p>
        <div className="flex w-full gap-2">
          <Link href={`/users/${user.uuid}`} className="flex-1">
            <Button className="w-full font-[var(--font-weight-heading)] text-xs py-2 h-auto">
              VIEW PROFILE
            </Button>
          </Link>
          <Button
            variant="neutral"
            className="flex-1 font-[var(--font-weight-heading)] text-xs py-2 h-auto"
          >
            ARCHIVE POSTS
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserCard;
