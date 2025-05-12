'use client';

import { StoryCard } from './StoryCard';
import { InstagramStory } from '@/app/types/instagram/story';
import { Card } from '@/components/ui/card';

interface StoriesGridProps {
  stories: InstagramStory[];
  volume: number; // Volume control passed from parent
  isLooping: boolean; // Loop control passed from parent
  isMuted: boolean; // Mute control passed from parent
}

export function StoriesGrid({ stories, volume, isLooping, isMuted }: StoriesGridProps) {
  if (stories.length === 0) {
    return (
      <Card className="text-center">
        <h3 className="text-2xl font-bold">No stories found</h3>
        <p className="mt-2">Try a different search query or check back later.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {stories.map(story => (
        <StoryCard
          key={story.story_id}
          story={story}
          volume={volume}
          isLooping={isLooping}
          isMuted={isMuted}
        />
      ))}
    </div>
  );
}
