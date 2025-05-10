'use client';

import { Suspense } from 'react';
import { InstagramUser } from '@/app/types/instagram';
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';

interface StreamedUserCardProps {
  user: InstagramUser;
  index: number;
}

// This component enables streaming user cards one by one
export function StreamedUserCard({ user, index }: StreamedUserCardProps) {
  return (
    <Suspense fallback={<UserSkeleton index={index} />}>
      <UserCard user={user} />
    </Suspense>
  );
}

export default StreamedUserCard;
