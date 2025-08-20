'use client';

import { StoryCard } from './StoryCard';
import { CompactStoryCard } from './CompactStoryCard';
import { ListStoryCard } from './ListStoryCard';
import { InstagramStory } from '@/app/types/instagram/story';
import { Card } from '@/components/ui/card';

export type ViewMode = 'grid' | 'compact' | 'list';

interface StoriesGridProps {
  stories: InstagramStory[];
  viewMode?: ViewMode;
  onStoryPreview?: (story: InstagramStory) => void;
}

export function StoriesGrid({ stories, viewMode = 'grid', onStoryPreview }: StoriesGridProps) {
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

  const getGridClasses = () => {
    switch (viewMode) {
      case 'compact':
        return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-10';
      case 'list':
        return 'flex flex-col gap-3 mt-10';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10';
    }
  };

  const renderStoryCard = (story: InstagramStory) => {
    switch (viewMode) {
      case 'compact':
        return <CompactStoryCard key={story.story_id} story={story} onPreview={onStoryPreview} />;
      case 'list':
        return <ListStoryCard key={story.story_id} story={story} onPreview={onStoryPreview} />;
      case 'grid':
      default:
        return <StoryCard key={story.story_id} story={story} onPreview={onStoryPreview} />;
    }
  };

  return <div className={getGridClasses()}>{stories.map(renderStoryCard)}</div>;
}
