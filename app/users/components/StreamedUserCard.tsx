'use client';

import { Suspense } from 'react';
import { InstagramUser } from '@/app/types/instagram';
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';

interface StreamedUserCardProps {
  user: InstagramUser;
  index: number;
  variant?: 'compact' | 'detailed';
}

// This component enables streaming user cards one by one
export function StreamedUserCard({ user, index, variant = 'detailed' }: StreamedUserCardProps) {
  return (
    <Suspense fallback={<UserSkeleton index={index} />}>
      <UserCard user={user} index={index} variant={variant} />
    </Suspense>
  );
}

export default StreamedUserCard;
