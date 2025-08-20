// This file provides an instant loading state that Next.js will automatically
// use when navigating to this route, using its automatic Suspense boundary.

import { LoadingState } from './components/LoadingState';

// Next.js will automatically wrap the page with this loading component
// when the route is loading
export default function Loading() {
  // Using the same LoadingState component for consistency
  return <LoadingState />;
}
