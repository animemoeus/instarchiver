'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { InstagramStory, InstagramStoriesResponse } from '@/app/types/instagram/story';
import { fetchStories, fetchStoryById, downloadStoryMedia } from '../services/api';

export function useStoriesQuery(page: number = 1, searchQuery?: string, userId?: string) {
  return useQuery({
    queryKey: ['stories', page, searchQuery, userId],
    queryFn: () => fetchStories(page, searchQuery, userId),
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    retry: 2, // Retry failed requests twice
  });
}

export function useStoryByIdQuery(storyId: string) {
  return useQuery({
    queryKey: ['story', storyId],
    queryFn: () => fetchStoryById(storyId),
    staleTime: 5 * 60 * 1000,
    enabled: !!storyId, // Only run query if storyId is provided
  });
}

export function useDownloadStoryMedia() {
  return useMutation({
    mutationFn: (story: InstagramStory) => downloadStoryMedia(story),
    onSuccess: () => {
      toast.success('Story downloaded successfully!');
    },
    onError: error => {
      toast.error('Failed to download story');
      console.error('Download error:', error);
    },
  });
}
