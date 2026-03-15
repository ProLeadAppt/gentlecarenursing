import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { FORM_INPUT_BASE } from "@/design-system/tokens";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(FORM_INPUT_BASE, className)}
      {...props}
    />
  );
});
