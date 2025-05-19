import { StorySkeleton } from './components/StorySkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="h-14 w-96 mb-4 border-2 border-[var(--border)] bg-[var(--main)] animate-pulse rounded-md"></div>
        <div className="h-6 w-80 mt-4 border-2 border-[var(--border)] bg-[var(--secondary-background)] animate-pulse rounded-md"></div>
      </div>

      <div className="h-12 w-full rounded-md border-2 border-[var(--border)] bg-[var(--secondary-background)] animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {[...Array(8)].map((_, index) => (
          <StorySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
