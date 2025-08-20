'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InstagramStory } from '@/app/types/instagram/story';

interface CompactStoryCardProps {
  story: InstagramStory;
  onPreview?: (story: InstagramStory) => void;
}

export function CompactStoryCard({ story, onPreview }: CompactStoryCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-3">
        <div className="flex gap-3">
          {/* Story Thumbnail */}
          <div
            className="relative w-16 h-20 bg-secondary border-2 border-border flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onPreview?.(story)}
          >
            <Image
              src={story.thumbnail}
              alt="Story thumbnail"
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {/* Profile Picture */}
              <div className="relative w-8 h-8 border border-border rounded-full overflow-hidden bg-secondary flex-shrink-0">
                <Image
                  src={story.user.profile_picture}
                  alt={story.user.username}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              {/* User Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-text truncate">@{story.user.username}</h3>
                <p className="text-xs text-text/70 truncate">{story.user.full_name}</p>
              </div>
            </div>

            {/* Date and Action */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-text/80">
                {formatDate(story.story_created_at)}
              </p>
              <Button
                size="sm"
                className="text-xs px-2 py-1 h-auto"
                onClick={() => onPreview?.(story)}
              >
                VIEW
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
