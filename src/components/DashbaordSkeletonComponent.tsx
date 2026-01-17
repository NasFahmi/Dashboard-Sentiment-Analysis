import { Skeleton } from "./ui/skeleton"

export const DashbaordSkeletonComponent = () => {
  return (
    <div className="space-y-6">
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>

      <Skeleton className="h-60 w-full" />
      <Skeleton className="h-60 w-full" />
    </div>
  )
}
