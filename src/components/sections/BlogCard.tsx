import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog";
import { BLOG_CATEGORIES } from "@/content/blog";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const cat = BLOG_CATEGORIES[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-border/50 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-border",
        className
      )}
    >
      {/* Gradient header (placeholder for featured image) */}
      <div className="h-40 bg-gradient-to-br from-muted via-accent/5 to-muted relative">
        {post.featuredImageSrc ? (
          <Image
            src={post.featuredImageSrc}
            alt={post.featuredImageAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // No featured image: show the Gentle Care heart-handshake mark
          // as a soft, on-brand placeholder. Uses the favicon webp so the
          // browser can lazy-load it from cache once it's fetched once.
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/gentle care nursing favicon.webp"
              alt="Gentle Care Nursing Services"
              width={88}
              height={88}
              className="h-20 w-20 opacity-60 select-none"
            />
          </div>
        )}
        {/* Category badge */}
        <span
          className={cn(
            "absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
            cat.color
          )}
        >
          {cat.label}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
