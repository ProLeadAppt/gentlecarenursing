import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageOverlayProps {
  src: string;
  alt: string;
  /** Apply brand gradient overlay to unify mixed-quality photos */
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Image with a subtle brand-tinted gradient overlay.
 * Unifies Instagram/stock photos into a cohesive visual language
 * without needing Photoshop on every image.
 */
export function ImageOverlay({
  src,
  alt,
  className,
  fill = true,
  width,
  height,
  priority = false,
  sizes,
}: ImageOverlayProps) {
  return (
    <div
      className={cn(
        "image-brand-overlay relative overflow-hidden",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
