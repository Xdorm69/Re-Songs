import { Skeleton } from "@/components/ui/skeleton";

export default function SongTableSkeleton() {
  // Create 10 skeleton rows
  const rows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="w-full space-y-6">
      {/* Search bar skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border">
        <div className="border-b">
          {/* Header */}
          <div className="flex">
            {['Artist', 'Category', 'Song'].map((header) => (
              <div key={header} className="px-4 py-3 w-1/3">
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        <div className="divide-y">
          {rows.map((row) => (
            <div key={row} className="flex p-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="w-1/3 px-4">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-16" />
        </div>
      </div>

      {/* Statistics skeleton */}
      <div className="space-y-2 pt-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-5/6" />
      </div>
    </div>
  );
}
