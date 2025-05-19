'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InstagramStory } from '@/app/types/instagram/story';

interface StoryCardProps {
  story: InstagramStory;
}

export function StoryCard({ story }: StoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full border-2 border-[var(--border)] shadow-[var(--shadow)] bg-[var(--background)] overflow-hidden">
      <CardHeader className="border-b-2 border-[var(--border)] py-4 bg-[var(--main)]">
        <div className="flex items-center gap-4">
          {/* Profile image */}
          <div className="relative w-16 h-16 min-w-[64px] min-h-[64px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            <Image
              src={story.user.profile_picture}
              alt={story.user.username}
              fill
              sizes="(max-width: 768px) 64px, 64px"
              className="object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-2xl font-[var(--font-weight-heading)] text-[var(--foreground)]">${story.user.username.charAt(0).toUpperCase()}</span></div>`;
              }}
            />
          </div>
          <div>
            <CardTitle className="text-xl text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{story.user.username}
            </CardTitle>
            <CardDescription className="font-[var(--font-weight-base)] text-[var(--foreground)]">
              {story.user.full_name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Full-width media section - no padding */}
      <div
        className="relative w-full border-t-2 border-b-2 border-[var(--border)] overflow-hidden"
        style={{ height: '400px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={story.thumbnail}
          alt="Story thumbnail"
          fill
          sizes="100vw"
          className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-[var(--secondary-background)] animate-pulse flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[var(--border)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--overlay)] p-3 border-t-2 border-[var(--border)]">
          <p className="text-[var(--secondary-background)] text-sm font-[var(--font-weight-base)]">
            {formatDate(story.story_created_at)}
          </p>
        </div>
      </div>

      <CardContent className="p-4">{/* Additional content if needed */}</CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-3 p-4">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-[var(--font-weight-heading)] text-[var(--foreground)]">
            {formatDate(story.story_created_at)}
          </p>
        </div>
        <div className="flex w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="w-full font-[var(--font-weight-heading)] text-base py-3 h-auto bg-[var(--main)] hover:bg-[var(--main)]/90 text-[var(--main-foreground)] border-2 border-[var(--border)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                VIEW FULL STORY
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 max-w-4xl overflow-hidden border-2 border-[var(--border)] shadow-[var(--shadow)]">
              <div className="bg-[var(--main)] p-4 border-b-2 border-[var(--border)]">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 min-h-[48px] min-w-[48px] rounded-full overflow-hidden border-2 border-[var(--border)] bg-[var(--secondary-background)]">
                    <Image
                      src={story.user.profile_picture}
                      alt={story.user.username}
                      fill
                      sizes="48px"
                      className="object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-2xl font-[var(--font-weight-heading)]">${story.user.username.charAt(0).toUpperCase()}</span></div>`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-[var(--font-weight-heading)] text-xl text-[var(--foreground)]">
                      @{story.user.username}
                    </h3>
                    {story.user.full_name && (
                      <p className="text-sm font-[var(--font-weight-base)] text-[var(--foreground)]">
                        {story.user.full_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Full width media container */}
              <div className="w-full bg-[var(--border)] border-b-2 border-[var(--border)] flex items-center justify-center">
                <div className="w-full h-full max-h-[75vh] flex items-center justify-center">
                  <Image
                    src={story.media}
                    alt="Story media"
                    width={1200}
                    height={1200}
                    className="max-h-[75vh] w-full object-contain"
                  />
                </div>
              </div>

              <div className="p-6 bg-[var(--background)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--main)]">
                    <p className="text-sm font-[var(--font-weight-heading)] text-[var(--main-foreground)]">
                      <strong>Posted:</strong> {formatDate(story.story_created_at)}
                    </p>
                  </div>
                  <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]">
                    <p className="text-sm font-[var(--font-weight-heading)] text-[var(--foreground)]">
                      <strong>Story ID:</strong> {story.story_id}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
