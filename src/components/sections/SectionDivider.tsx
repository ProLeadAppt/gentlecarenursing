import { cn } from "@/lib/utils";

export type SectionDividerVariant = "wave" | "curve" | "slant" | "none";

interface SectionDividerProps {
  variant?: SectionDividerVariant;
  color?: string; // Hex or CSS color for the fill
  bgColor?: string; // Hex or CSS color for the background
  position?: "top" | "bottom";
  className?: string;
  flip?: boolean;
}

export function SectionDivider({ 
  variant = "curve", 
  color = "white", 
  bgColor = "transparent",
  position = "bottom",
  className,
  flip = false
}: SectionDividerProps) {
  if (variant === "none") return null;

  const paths = {
    curve: "M0,64 C240,128 480,128 720,64 C960,0 1200,0 1440,64 L1440,128 L0,128 Z",
    wave: "M0,96 C180,48 360,144 540,96 C720,48 900,144 1080,96 C1260,48 1440,144 1440,96 L1440,128 L0,128 Z",
    slant: "M0,128 L1440,0 L1440,128 L0,128 Z"
  };

  const style: React.CSSProperties = {
    fill: color,
    backgroundColor: bgColor,
    transform: `scaleY(${position === "top" ? -1 : 1}) ${flip ? "scaleX(-1)" : ""}`,
  };

  return (
    <div 
      className={cn(
        "relative w-full overflow-hidden leading-[0] z-20", 
        position === "top" ? "-mb-[1px]" : "-mt-[1px]",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-12 sm:h-20 lg:h-32"
        style={style}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
