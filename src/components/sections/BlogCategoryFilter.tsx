"use client";

import { cn } from "@/lib/utils";
import type { BlogCategory } from "@/content/blog";
import { BLOG_CATEGORIES } from "@/content/blog";

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  activeCategory: BlogCategory | null;
  onChange: (category: BlogCategory | null) => void;
}

export function BlogCategoryFilter({
  categories,
  activeCategory,
  onChange,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter blog posts by category">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null}
        onClick={() => onChange(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          activeCategory === null
            ? "bg-primary text-white shadow-sm"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        All
      </button>
      {categories.map((cat) => {
        const meta = BLOG_CATEGORIES[cat];
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => onChange(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
