'use client';

import { StoryCard } from './StoryCard';
import { InstagramStory } from '@/app/types/instagram/story';
import { Card } from '@/components/ui/card';

interface StoriesGridProps {
  stories: InstagramStory[];
}

export function StoriesGrid({ stories }: StoriesGridProps) {
  if (stories.length === 0) {
    return (
      <Card className="mt-10 p-12 text-center border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-yellow-200">
        <h3 className="text-4xl font-black mb-6 text-black">NO STORIES FOUND</h3>
        <p className="text-xl font-bold text-black">
          Try a different search query or check back later.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {stories.map(story => (
        <StoryCard key={story.story_id} story={story} />
      ))}
    </div>
  );
}
