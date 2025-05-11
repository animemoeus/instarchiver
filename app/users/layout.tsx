import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram User Archive',
  description: 'Browse and search through archived Instagram user profiles',
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
