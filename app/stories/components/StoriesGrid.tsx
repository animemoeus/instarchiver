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
      <Card className="mt-8 p-12 text-center border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
        <h3 className="text-4xl font-black mb-4">NO STORIES FOUND</h3>
        <p className="text-xl font-medium">Try a different search query or check back later.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-8">
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
