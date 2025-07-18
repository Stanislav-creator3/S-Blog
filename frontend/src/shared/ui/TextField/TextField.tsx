import { cn } from "@/shared/utils/tw-merge";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: string;
  label?: string;
  description?: string;
}

export const TextField = ({
  error,
  className,
  label,
  description,
  ...props
}: Props) => {
  return (
    <div className={cn(className)}>
      <div>
        {label && (
          <label
            className={cn(
              error && "after:text-red-500 after:content-['*']",
              "mb-1 block font-bold text-xl text-gray-700 after:ml-0.5"
            )}
          >
            {label}
          </label>
        )}

        <input
          {...props}
          className="block w-full rounded-md border 
          bg-input shadow-sm px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-accent disabled:cursor-not-allowed disabled:opacity-50"
        />
        {description && (
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};
