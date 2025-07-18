import { cn } from "@/shared/utils/tw-merge";

interface Props {
  className?: string;
}

const PostCardSkeleton = ({ className }: Props) => {
  return (
    <div
      className={cn("animate-pulse h-51.5 w-full bg-gray-200", className)}
    ></div>
  );
};

export default PostCardSkeleton;
