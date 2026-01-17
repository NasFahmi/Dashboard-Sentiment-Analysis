import { Skeleton } from "@/components/ui/skeleton";

export const ScraperLoadingComponent = () => {
  return (
    <div className="space-y-6">
      {/* Search Input Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:max-w-md rounded-lg" />
      </div>

      {/* Data Count Text Skeleton */}
      <Skeleton className="h-4 w-48 rounded" />

      {/* List Skeletons */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col bg-gray-50 sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl p-4 "
          >
            {/* Left Side: Info */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>

            {/* Right Side: Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Analysis Button */}
              <Skeleton className="h-9 w-32 rounded-lg" />
              {/* Download Button */}
              <Skeleton className="h-9 w-24 rounded-lg" />
              {/* Delete Button */}
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button Skeleton */}
      <div className="flex justify-center">
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
    </div>
  );
};
