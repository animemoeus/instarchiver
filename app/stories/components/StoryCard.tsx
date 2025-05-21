'use client';

import Image from 'next/image';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InstagramStory } from '@/app/types/instagram/story';

interface StoryCardProps {
  story: InstagramStory;
}

export function StoryCard({ story }: StoryCardProps) {
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
    <Card className="w-full">
      <CardHeader className="py-3 bg-[var(--main)]">
        <div className="flex items-center gap-2">
          {/* Profile image */}
          <div className="relative  min-w-[48px] min-h-[48px] border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            <Image
              src={story.user.profile_picture}
              alt={story.user.username}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-lg text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{story.user.username}
            </CardTitle>
            <CardDescription className="text-sm font-[var(--font-weight-base)] text-[var(--foreground)]">
              {story.user.full_name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Full-width media section - no padding */}
      <div className="relative w-full border-t-2 group aspect-[9/16]">
        <Image
          src={story.thumbnail}
          alt="Story thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority
        />
      </div>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-[var(--font-weight-heading)] text-[var(--foreground)]">
            {formatDate(story.story_created_at)}
          </p>
        </div>
        <div className="flex w-full">
          <Button>VIEW FULL STORY</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
