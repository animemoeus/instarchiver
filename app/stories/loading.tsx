import { StorySkeleton } from './components/StorySkeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="bg-gray-300 h-14 w-96 mb-4 animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-80 mt-4 animate-pulse"></div>
      </div>

      <div className="bg-gray-200 h-12 w-full rounded-md animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[...Array(6)].map((_, index) => (
          <StorySkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
