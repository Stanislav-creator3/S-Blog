import { cn } from "@/shared/utils/tw-merge";
import { LabelHTMLAttributes } from "react";

interface FormProps {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

export function Form({ className, children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-3", className)}>
      {children}
    </form>
  );
}

Form.Label = function FormLabel({
  className,
  children,
  ...props
}: FormProps extends LabelHTMLAttributes<HTMLLabelElement> ? LabelHTMLAttributes<HTMLLabelElement> : never) {
  return (
    <label {...props} className={cn("font-bold text-xl", className)}>
      {children}
    </label>
  );
};  

Form.Description = function FormDescription({
  className,
  children,
}: FormProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};
