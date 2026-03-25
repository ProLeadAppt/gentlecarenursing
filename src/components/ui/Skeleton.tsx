import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      aria-hidden
    />
  );
}

/** Pre-built skeleton compositions */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/50 bg-white p-7 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="min-h-[40rem] flex items-center px-6 sm:px-8">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-1 w-10 rounded-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
        <Skeleton className="h-[32rem] rounded-[3rem]" />
      </div>
    </div>
  );
}
