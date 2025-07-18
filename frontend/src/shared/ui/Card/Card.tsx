import { cn } from "@/shared/utils/tw-merge";
import { cva, VariantProps } from "cva";
import type { FC, ReactNode } from "react";

export const avatarVariants = cva({
  variants: {
    rounded: {
      default: "rounded-[5px]",
      full: "rounded-full",
      none: "rounded-[0px]",
    },
  },
  defaultVariants: {
    rounded: "default",
  },
});

interface Props extends VariantProps<typeof avatarVariants> {
  className?: string;
  children: ReactNode;
}

export const Card: FC<Props> = ({ className, children, rounded }) => {
  return (
    <div
      className={cn(className, "background p-5", avatarVariants({ rounded }))}
    >
      {children}
    </div>
  );
};
