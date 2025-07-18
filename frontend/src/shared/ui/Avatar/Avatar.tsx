import React from "react";
import { TAvatar } from "./Avatar.types";
import { cn } from "@/shared/utils/tw-merge";
import { cva } from "cva";
import { getMediaSource } from "@/shared/utils/get-media-source";

export const avatarVariants = cva({
  base: "rounded-full",
  variants: {
    size: {
      1: "h-8 w-8",
      2: "h-10 w-10",
      3: "h-12 w-12",
      4: "h-16 w-16",
      5: "h-18 w-18",
      6: "h-24 w-24",
      7: "h-28 w-28",
      8: "h-32 w-32",
    },
  },
  defaultVariants: {
    size: 4,
  },
});

export const Avatar: React.FC<TAvatar> = ({
  className,
  src,
  username,
  size,
}) => {
  const isImageUrlNotAavilable = !src && username;

  return (
    <div className={cn(className, "flex items-center rounded-full")}>
      {src && (
        <img
          className={cn("object-cover", avatarVariants({ size }))}
          src={getMediaSource(src)}
          alt={username}
        />
      )}
      {isImageUrlNotAavilable && (
        <p
          className={cn(
            "flex bg-white items-center justify-center text-2xl border border-border-hover",
            avatarVariants({ size })
          )}
        >
          {username?.charAt(0).toUpperCase()}
        </p>
      )}
    </div>
  );
};
