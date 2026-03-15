import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { FORM_INPUT_BASE } from "@/design-system/tokens";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        FORM_INPUT_BASE,
        "resize-y min-h-[120px]",
        className
      )}
      {...props}
    />
  );
});
