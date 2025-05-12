'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
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
}

export function StoryCard({ story, volume, isLooping }: StoryCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = story.media.includes('.mp4');

  // Play/pause video on hover
  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isHovered) {
        videoRef.current.muted = false; // Unmute the video
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true; // Mute the video when not hovered
      }
    }
  }, [isHovered, isVideo, videoRef]);

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
    <Card className="overflow-hidden border-4 border-black transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          {/* Removed individual volume and loop controls */}
        </div>
      </div>

      <div className="relative">
        <div
          className={`absolute top-0 left-0 w-full ${userColor} p-3 border-b-4 border-black z-10`}
        >
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
        </div>

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
                muted
                loop
                playsInline
                preload="auto"
                className={`w-full h-[300px] object-cover ${isLoading || !isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoadedData={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
              {(!isHovered || isLoading) && (
                <Image
                  src={story.thumbnail}
                  alt="Story thumbnail"
                  width={400}
                  height={600}
                  objectFit="cover"
                  className={`absolute inset-0 w-full h-[300px] object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
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

          {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

          <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
            <p className="text-white text-sm">{formatDate(story.story_created_at)}</p>
          </div>

          <div className="absolute top-2 right-2">
            <Badge className="bg-white text-black border-2 border-black font-bold">
              {isVideo ? 'VIDEO' : 'IMAGE'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
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
              className="bg-green-500 text-white hover:bg-green-600 font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
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
                <Button className="bg-black text-white hover:bg-gray-800 font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="border-4 border-black p-0 max-w-3xl overflow-hidden">
                <div className="bg-black p-4 border-b-4 border-black">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
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
                    <video src={story.media} controls autoPlay className="max-h-[80vh] max-w-full">
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
                <div className="p-4 bg-white border-t-4 border-black">
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
        </div>
      </div>
    </Card>
  );
}
