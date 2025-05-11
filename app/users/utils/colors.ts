'use client';

// Consistent Neo Brutalist color palette for UI components
export const neoBrutalistColors = {
  header: [
    'bg-pink-300',
    'bg-purple-300',
    'bg-blue-300',
    'bg-green-300',
    'bg-yellow-300',
    'bg-orange-300',
    'bg-red-300',
    'bg-indigo-300',
    'bg-cyan-300',
    'bg-lime-300',
  ],
  stats: {
    posts: 'bg-pink-200',
    followers: 'bg-green-200',
    following: 'bg-yellow-200',
  },
  bio: 'bg-blue-100',
  footer: 'bg-gray-100',
};

// Get a consistent color from the palette based on any string identifier
export function getConsistentColor(
  identifier: string,
  palette: string[] = neoBrutalistColors.header
): string {
  // Generate a hash from the string to ensure consistency
  const hash = identifier.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  return palette[hash % palette.length];
}
