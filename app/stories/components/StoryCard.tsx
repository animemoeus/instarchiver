'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { InstagramStory } from '@/app/types/instagram/story';
import { useDownloadStoryMedia } from '../hooks/useStories';
import { toast } from 'sonner';
import { getConsistentColor, neoBrutalistColors } from '@/app/users/utils/colors';

interface StoryCardProps {
  story: InstagramStory;
  volume: number; // Volume control passed from parent
  isLooping: boolean; // Loop control passed from parent
  isMuted: boolean; // Mute control passed from parent
}

export function StoryCard({ story, volume, isLooping, isMuted }: StoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [localMuted, setLocalMuted] = useState(isMuted); // Local mute state that can be toggled by the button
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = story.media.match(/\.(mp4|webm)$/i) !== null;
  const downloadMutation = useDownloadStoryMedia();

  // Update local mute state when global setting changes
  useEffect(() => {
    setLocalMuted(isMuted);
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Initialize video element when component mounts
  useEffect(() => {
    if (isVideo && videoRef.current) {
      // Initial setup for the video
      videoRef.current.muted = localMuted;
      videoRef.current.loop = isLooping;
      videoRef.current.volume = volume;
      videoRef.current.preload = 'metadata'; // Preload metadata for faster playback

      // Force load the video in background
      videoRef.current.load();
    }
  }, [isVideo, isLooping, volume, localMuted]);

  // Play/pause video on hover
  useEffect(() => {
    const currentVideo = videoRef.current;
    let isPlaying = false;

    const playVideo = async () => {
      if (!currentVideo || isPlaying) return;

      try {
        // Set initial properties
        currentVideo.volume = volume;
        currentVideo.muted = localMuted;

        isPlaying = true;
        await currentVideo.play();
        console.log('Video playing, muted:', localMuted, 'volume:', volume);
      } catch (error) {
        if (error instanceof Error && error.name === 'NotAllowedError') {
          // Browser requires user interaction - try muted playback
          try {
            currentVideo.muted = true;
            await currentVideo.play();
            console.log('Playing muted due to autoplay restrictions');
            if (!localMuted) {
              toast.info('Click the sound icon to enable audio', {
                duration: 2000,
                id: 'sound-toast',
              });
            }
          } catch (e) {
            console.warn('Failed to play even with mute:', e);
          }
        } else if (error instanceof Error && error.name !== 'AbortError') {
          // Log errors other than abort errors (which are expected during normal operation)
          console.warn('Video playback error:', error);
        }
      }
    };

    const stopVideo = () => {
      if (!currentVideo) return;

      isPlaying = false;
      // Only pause if the video is actually playing
      if (!currentVideo.paused) {
        currentVideo.pause();
      }
      currentVideo.currentTime = 0;
      currentVideo.muted = localMuted;
    };

    if (isVideo && currentVideo) {
      if (isHovered) {
        playVideo();
      } else {
        stopVideo();
      }
    }
  }, [isHovered, isVideo, volume, localMuted]);

  // Update video settings when volume or looping changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume; // Set video volume
      videoRef.current.loop = isLooping; // Set looping
    }
  }, [volume, isLooping]);

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

  // Get a consistent color for this user
  const userColor = getConsistentColor(story.user.username);

  return (
    <Card className="w-full shadow-[var(--shadow)] bg-[var(--background)]">
      <CardHeader className="border-b-2 border-[var(--border)] py-3 bg-[var(--main)]">
        <div className="flex items-center gap-3">
          {/* Profile image */}
          <div className="relative w-14 h-14 border-2 border-[var(--border)] rounded-full overflow-hidden bg-[var(--secondary-background)]">
            <Image
              src={story.user.profile_picture}
              alt={story.user.username}
              fill
              sizes="(max-width: 768px) 56px, 56px"
              className="object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-2xl font-[var(--font-weight-heading)] text-[var(--foreground)]">${story.user.username.charAt(0).toUpperCase()}</span></div>`;
              }}
            />
          </div>
          <div>
            <CardTitle className="text-xl text-[var(--foreground)] font-[var(--font-weight-heading)]">
              @{story.user.username}
            </CardTitle>
            <CardDescription className="font-[var(--font-weight-base)] text-[var(--foreground)]">
              {story.user.full_name}
            </CardDescription>
          </div>

          {isVideo && (
            <div className="ml-auto">
              <button
                onClick={e => {
                  e.stopPropagation();
                  if (videoRef.current && !isMuted) {
                    // Toggle the local muted state only if global mute is off
                    const newMutedState = !localMuted;
                    setLocalMuted(newMutedState);
                    videoRef.current.muted = newMutedState;

                    if (!newMutedState) {
                      videoRef.current.volume = volume;
                    }
                    toast.success(newMutedState ? 'Sound off' : 'Sound on');
                  }
                }}
                className={`${isMuted ? 'bg-gray-400 cursor-not-allowed' : 'bg-black cursor-pointer'} text-white p-2 rounded-full hover:bg-gray-800 transition-colors border-2 border-[var(--border)]`}
                title={
                  isMuted
                    ? 'Sound disabled globally'
                    : localMuted
                      ? 'Turn sound on'
                      : 'Turn sound off'
                }
                disabled={isMuted}
              >
                {isMuted || localMuted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Story Media Wrapper */}
        <div
          className="relative border-2 border-[var(--border)] rounded-[var(--radius-base)] overflow-hidden mb-4"
          style={{ height: '300px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {' '}
          {isVideo ? (
            <>
              <video
                ref={videoRef}
                src={story.media}
                muted={localMuted}
                playsInline
                preload="auto"
                loop
                poster={story.thumbnail}
                className={`absolute inset-0 w-full h-full object-cover ${!isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoadedData={() => {
                  setIsLoading(false);
                  // Set initial volume when loaded
                  if (videoRef.current) {
                    videoRef.current.volume = volume;
                    videoRef.current.muted = localMuted;
                  }
                }}
                onError={() => {
                  console.error('Error loading video:', story.media);
                  setIsLoading(false);
                }}
              />
              {(!isHovered || (isHovered && isLoading)) && (
                <Image
                  src={story.thumbnail}
                  alt="Story thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={`object-cover transition-opacity duration-300`}
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    console.error('Error loading thumbnail:', story.thumbnail);
                    setIsLoading(false);
                  }}
                />
              )}
            </>
          ) : (
            <Image
              src={story.thumbnail}
              alt="Story thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-[var(--secondary-background)] animate-pulse flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[var(--border)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className="bg-[var(--secondary-background)] text-[var(--foreground)] font-[var(--font-weight-heading)] border-2 border-[var(--border)]">
              {isVideo ? 'VIDEO' : 'IMAGE'}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--secondary-background)] p-2 border-t-2 border-[var(--border)]">
            <p className="text-[var(--foreground)] text-sm font-[var(--font-weight-base)]">
              {formatDate(story.story_created_at)}
            </p>
          </div>
        </div>

        {/* Story Stats */}
        <div className="p-3 border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)] flex items-center justify-center mb-4">
          <p className="text-[var(--foreground)] font-[var(--font-weight-heading)]">
            <span className="text-xs mr-1">FOLLOWERS:</span>
            <span className="text-lg">{story.user.follower_count.toLocaleString()}</span>
          </p>
        </div>

        {/* Story ID display */}
        <div className="border-2 border-[var(--border)] rounded-[var(--radius-base)] bg-[var(--secondary-background)]">
          <ScrollArea className="h-[50px] w-full p-3 text-[var(--foreground)] rounded-[var(--radius-base)]">
            <p className="font-[var(--font-weight-base)] text-sm">
              <strong>Story ID:</strong> {story.story_id}
            </p>
          </ScrollArea>
        </div>
      </CardContent>

      <CardFooter className="border-t-2 border-[var(--border)] bg-[var(--secondary-background)] flex-col gap-2 p-3">
        <p className="text-xs font-[var(--font-weight-base)] text-[var(--foreground)] w-full">
          Created: {formatDate(story.story_created_at)}
        </p>
        <div className="flex w-full gap-2">
          <Button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              downloadMutation.mutate(story);
            }}
            disabled={downloadMutation.isPending}
            className="flex-1 font-[var(--font-weight-heading)] text-xs py-2 h-auto"
          >
            {downloadMutation.isPending ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                SAVING...
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                DOWNLOAD
              </>
            )}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="neutral"
                className="flex-1 font-[var(--font-weight-heading)] text-xs py-2 h-auto"
              >
                VIEW STORY
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 max-w-3xl overflow-hidden border-2 border-[var(--border)] shadow-[var(--shadow)]">
              <div className="bg-[var(--main)] p-4 border-b-2 border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[var(--border)] bg-[var(--secondary-background)]">
                    <Image
                      src={story.user.profile_picture}
                      alt={story.user.username}
                      width={40}
                      height={40}
                      className="object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[var(--secondary-background)]"><span class="text-2xl font-[var(--font-weight-heading)] text-[var(--foreground)]">${story.user.username.charAt(0).toUpperCase()}</span></div>`;
                      }}
                    />
                  </div>
                  <h3 className="font-[var(--font-weight-heading)] text-[var(--foreground)]">
                    @{story.user.username}
                  </h3>
                </div>
              </div>
              <div className="flex justify-center bg-[var(--secondary-background)] border-b-2 border-[var(--border)]">
                {isVideo ? (
                  <video
                    src={story.media}
                    controls
                    autoPlay
                    muted={isMuted}
                    className="max-h-[80vh] max-w-full"
                    onLoadedData={e => {
                      // Set volume and muted state on the dialog video
                      e.currentTarget.volume = volume;
                      e.currentTarget.muted = isMuted;
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={story.media}
                    alt="Story media"
                    width={800}
                    height={1000}
                    className="max-h-[80vh] object-contain"
                  />
                )}
              </div>
              <div className="p-4 bg-[var(--background)]">
                <p className="text-sm font-[var(--font-weight-base)] text-[var(--foreground)]">
                  <strong>Posted:</strong> {formatDate(story.story_created_at)}
                </p>
                <p className="text-sm mt-1 font-[var(--font-weight-base)] text-[var(--foreground)]">
                  <strong>Story ID:</strong> {story.story_id}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
