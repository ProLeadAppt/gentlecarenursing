import { cn } from "@/lib/utils";
import { Label } from "./Label";
import { FORM_FIELD_GAP } from "@/design-system/tokens";
import { Check } from "lucide-react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /** When true, shows a green checkmark beside the label */
  valid?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  valid,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn(FORM_FIELD_GAP, className)}>
      <div className="flex items-center gap-2">
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
        {valid && !error && (
          <Check
            className="h-4 w-4 text-pw-sage shrink-0"
            strokeWidth={3}
            aria-label="Valid"
          />
        )}
      </div>
      {children}
      {hint && !error && (
        <p className="text-sm text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
