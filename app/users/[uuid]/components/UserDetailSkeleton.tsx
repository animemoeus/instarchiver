import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export function UserDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
        <CardHeader className={`border-b-2 border-black bg-gray-100 p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Profile Image Skeleton */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-black rounded-full overflow-hidden bg-gray-200 animate-pulse shrink-0" />

            {/* User Info Skeleton */}
            <div className="flex-1 w-full">
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-center sm:text-left space-y-2 w-full">
                  <div className="h-8 bg-gray-200 rounded-base border-2 border-black w-48 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-32 animate-pulse" />
                </div>
              </div>

              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="border-2 border-black rounded-base p-2 sm:p-4 text-center bg-gray-100"
                  >
                    <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-12 mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-16 mx-auto animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-8">
          {/* Biography Skeleton */}
          <div className="mb-6 sm:mb-8">
            <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-24 mb-3 sm:mb-4 animate-pulse" />
            <div className="border-2 border-black rounded-base bg-gray-100 p-3 sm:p-4 h-[100px] sm:h-[120px]">
              <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-base border-2 border-black w-3/4 animate-pulse" />
            </div>
          </div>

          {/* Account Info Skeleton */}
          <div>
            <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-40 mb-3 sm:mb-4 animate-pulse" />
            <div className="grid gap-3 sm:gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                  <div className="h-6 bg-gray-200 rounded-base border-2 border-black w-24 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded-base border-2 border-black w-16 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t-2 border-black bg-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <div className="h-9 bg-gray-200 rounded-base border-2 border-black flex-1 animate-pulse" />
            <div className="h-9 bg-gray-200 rounded-base border-2 border-black flex-1 animate-pulse" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
