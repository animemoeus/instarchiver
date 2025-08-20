'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstagramStory } from '@/app/types/instagram/story';

interface ListStoryCardProps {
  story: InstagramStory;
  onPreview?: (story: InstagramStory) => void;
}

export function ListStoryCard({ story, onPreview }: ListStoryCardProps) {
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
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Story Thumbnail */}
          <div
            className="relative w-12 h-16 bg-secondary border-2 border-border flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onPreview?.(story)}
          >
            <Image
              src={story.thumbnail}
              alt="Story thumbnail"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Profile Picture */}
            <div className="relative w-10 h-10 border-2 border-border rounded-full overflow-hidden bg-secondary flex-shrink-0">
              <Image
                src={story.user.profile_picture}
                alt={story.user.username}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            {/* User Details */}
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-text truncate">@{story.user.username}</h3>
              <p className="text-sm text-text/70 truncate">{story.user.full_name}</p>
            </div>
          </div>

          {/* Date */}
          <div className="hidden sm:block text-sm font-medium text-text/80 flex-shrink-0">
            {formatDate(story.story_created_at)}
          </div>

          {/* Action */}
          <Button className="flex-shrink-0" onClick={() => onPreview?.(story)}>
            VIEW STORY
          </Button>
        </div>

        {/* Mobile date */}
        <div className="sm:hidden mt-2 text-xs font-medium text-text/80">
          {formatDate(story.story_created_at)}
        </div>
      </CardContent>
    </Card>
  );
}
