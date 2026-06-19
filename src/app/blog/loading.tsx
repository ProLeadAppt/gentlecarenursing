import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Header skeleton */}
        <Skeleton className="h-3 w-32 mb-6" />
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-96 mb-10" />

        {/* Filter pills skeleton */}
        <div className="flex gap-2 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-full" />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-white overflow-hidden">
              <Skeleton className="h-40 rounded-none" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-3 w-32 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
