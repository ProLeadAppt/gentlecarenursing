import { SkeletonHero, SkeletonCard } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="animate-in fade-in duration-300">
      <SkeletonHero />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
