'use client';

import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';
import { InstagramStory } from '@/app/types/instagram/story';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDownloadStoryMedia } from '@/hooks/useStories';

interface StoryPreviewModalProps {
  story: InstagramStory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryPreviewModal({ story, isOpen, onClose }: StoryPreviewModalProps) {
  const downloadMutation = useDownloadStoryMedia();

  if (!story) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDownload = () => {
    downloadMutation.mutate(story);
  };

  const handleOpenOriginal = () => {
    window.open(story.media, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            <div className="relative w-12 h-12 border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)] flex-shrink-0">
              <Image
                src={story.user.profile_picture}
                alt={story.user.username}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div className="text-left">
              <DialogTitle className="text-xl font-bold">@{story.user.username}</DialogTitle>
              <DialogDescription className="text-sm">{story.user.full_name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Story Content */}
          <div className="relative w-full max-h-[60vh] bg-black rounded overflow-hidden flex items-center justify-center">
            <Image src={story.media} alt="Story content" fill className="object-contain" priority />
          </div>

          {/* Story Info */}
          <div className="flex flex-col gap-3 p-4 bg-[var(--secondary-background)] rounded border-2 border-[var(--border)]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-sm font-[var(--font-weight-base)] text-[var(--foreground)]/80">
                  Story Date
                </p>
                <p className="text-sm font-[var(--font-weight-heading)]">
                  {formatDate(story.story_created_at)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {downloadMutation.isPending ? 'Downloading...' : 'Download'}
                </Button>

                <Button
                  variant="neutral"
                  size="sm"
                  onClick={handleOpenOriginal}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Original
                </Button>
              </div>
            </div>

            {/* Additional metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-[var(--font-weight-base)] text-[var(--foreground)]/80">
                  Story ID
                </p>
                <p className="font-mono text-[var(--foreground)]">{story.story_id}</p>
              </div>
              <div>
                <p className="font-[var(--font-weight-base)] text-[var(--foreground)]/80">
                  Archived On
                </p>
                <p className="text-[var(--foreground)]">{formatDate(story.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
