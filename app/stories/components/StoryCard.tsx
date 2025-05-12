'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InstagramStory } from '@/app/types/instagram/story';
import { downloadStoryMedia } from '../services/api';
import { toast } from 'sonner';

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
  const isVideo = story.media.includes('.mp4');

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
    if (isVideo && videoRef.current) {
      if (isHovered) {
        // First, set the volume and muted state
        videoRef.current.volume = volume;
        videoRef.current.muted = localMuted;

        // Start playing the video
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playing, muted:', localMuted, 'volume:', volume);
            })
            .catch(error => {
              console.error('Error playing video:', error);
              // If autoplay fails, force muted play (browser policy workaround)
              if (videoRef.current) {
                // Save the original mute state
                const wasOriginiallyMuted = localMuted;

                // Try to play muted
                videoRef.current.muted = true;
                videoRef.current
                  .play()
                  .then(() => {
                    // If successful and should be unmuted, try to unmute after user interaction
                    console.log('Playing muted due to autoplay restrictions');
                    if (!wasOriginiallyMuted) {
                      toast.info('Click the sound icon to enable audio', {
                        duration: 2000,
                        id: 'sound-toast',
                      });
                    }
                  })
                  .catch(e => console.error('Failed to play even with mute:', e));
              }
            });
        }
      } else {
        // When not hovering
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
        videoRef.current.currentTime = 0;
        videoRef.current.muted = localMuted; // Maintain the local mute setting
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

  // Generate a vibrant color based on the username
  const generateColor = (username: string) => {
    const colors = [
      'bg-pink-500',
      'bg-purple-500',
      'bg-blue-500',
      'bg-teal-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-indigo-500',
    ];

    const sum = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  const userColor = generateColor(story.user.username);

  return (
    <Card>
      <div className="relative">
        <div className={`absolute top-0 left-0 w-full ${userColor} p-3 z-10`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-black">
              <Image
                src={story.user.profile_picture}
                alt={story.user.username}
                width={40}
                height={40}
                className="object-cover"
                onError={() => console.error('Error loading profile picture')}
              />
            </div>
            <div>
              <h3 className="font-bold text-white">@{story.user.username}</h3>
              <p className="text-xs text-white/90">{story.user.full_name}</p>
            </div>
          </div>
          {isVideo && (
            <div className="absolute top-2 right-2">
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
                className={`${isMuted ? 'bg-gray-400 cursor-not-allowed' : 'bg-black cursor-pointer'} text-white p-1 rounded-full hover:bg-gray-800 transition-colors`}
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

        <CardContent>
          <div
            className="pt-20 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                  className={`w-full h-[300px] object-cover ${!isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
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
                    width={400}
                    height={600}
                    objectFit="cover"
                    className={`absolute inset-0 w-full h-[300px] object-cover transition-opacity duration-300`}
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
                width={400}
                height={600}
                objectFit="cover"
                className={`w-full h-[300px] object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
              <p className="text-white text-sm">{formatDate(story.story_created_at)}</p>
            </div>

            <div className="absolute top-2 right-2">
              <Badge className="bg-white text-black font-bold">{isVideo ? 'VIDEO' : 'IMAGE'}</Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-2">
          <span className="text-sm">
            Followers: <strong>{story.user.follower_count.toLocaleString()}</strong>
          </span>

          <div className="flex gap-2">
            <Button
              onClick={async (e: React.MouseEvent) => {
                e.preventDefault();
                try {
                  await downloadStoryMedia(story);
                  toast.success('Story downloaded successfully!');
                } catch (error) {
                  toast.error('Failed to download story');
                  console.error('Download error:', error);
                }
              }}
              className="bg-green-500 text-white font-bold"
            >
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
              Save
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white font-bold">View</Button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-3xl overflow-hidden">
                <div className="bg-black p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-black">
                      <Image
                        src={story.user.profile_picture}
                        alt={story.user.username}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-white">@{story.user.username}</h3>
                  </div>
                </div>
                <div className="flex justify-center bg-gray-100">
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
                <div className="p-4 bg-white">
                  <p className="text-sm">
                    <strong>Posted:</strong> {formatDate(story.story_created_at)}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Story ID:</strong> {story.story_id}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
