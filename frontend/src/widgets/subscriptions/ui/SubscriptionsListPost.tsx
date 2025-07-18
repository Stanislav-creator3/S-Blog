import { useGetSubscriptionInfiniteQuery } from "@/features/follow/api/followApi";
import { cn } from "@/shared/utils/tw-merge";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";

interface Props {
  className?: string;
}

const SubscriptionsListPost = ({ className }: Props) => {
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetSubscriptionInfiniteQuery("");

  return (
    <div className={cn(className, "flex flex-col gap-4")}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))
      ) : (
        <InfinitePostsList
          data={data}
          isNotPostTitle="Посты не найдены"
          isFetching={isFetching}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  );
};

export default SubscriptionsListPost;
