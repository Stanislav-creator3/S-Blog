import { cn } from "@/shared/utils/tw-merge";
import { avatarVariants } from "./Avatar";
import { FC } from "react";
import { VariantProps } from "cva";

interface AvatarSkeletonProps extends VariantProps<typeof avatarVariants> {
  className?: string;
}

export const AvatarSkeleton: FC<AvatarSkeletonProps> = ({
  size,
  className,
}) => {
  return (
    <div
      className={cn(
        avatarVariants({ size }),
        "bg-gray-300 animate-pulse",
        className
      )}
    />
  );
};
