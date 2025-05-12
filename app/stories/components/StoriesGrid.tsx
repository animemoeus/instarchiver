'use client';

import { StoryCard } from './StoryCard';
import { InstagramStory } from '@/app/types/instagram/story';

interface StoriesGridProps {
  stories: InstagramStory[];
}

export function StoriesGrid({ stories }: StoriesGridProps) {
  if (stories.length === 0) {
    return (
      <div className="mt-12 text-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-bold">No stories found</h3>
        <p className="mt-2">Try a different search query or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {stories.map(story => (
        <StoryCard key={story.story_id} story={story} />
      ))}
    </div>
  );
}
