import { cva, VariantProps } from "cva";
import { FC } from "react";

interface Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof variants> {
  className?: string;
}

const variants = cva({
  base: "flex min-h-[60px] w-full rounded-md bg-transparent px-3 py-2 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    border: {
      default:
        "border border-border  focus-visible:ring-1 focus-visible:ring-base-accent",
      error: "border border-red-500",
      success: "border border-green-500",
      noBorder: "border-0",
    },
  },
  defaultVariants: {
    border: "default",
  },
});

export const Textarea: FC<Props> = ({ className, border, ...props }) => {
  return <textarea className={variants({ className, border })} {...props} />;
};
