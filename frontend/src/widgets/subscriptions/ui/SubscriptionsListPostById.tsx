import { useGetByIdSubscriptionInfiniteQuery } from "@/features/follow/api/followApi";
import { cn } from "@/shared/utils/tw-merge";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";
import { useParams } from "react-router";

interface Props {
  className?: string;
}

const SubscriptionsListPostById = ({ className }: Props) => {
  const { id } = useParams();
  const idParam = id !== undefined ? id : "";

  const { data, isFetching, fetchNextPage, isLoading } =
    useGetByIdSubscriptionInfiniteQuery(idParam);

  return (
    <div className={cn(className, "flex flex-col gap-4")}>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))
        : (
          <InfinitePostsList
            data={data}
            fetchNextPage={fetchNextPage}
            isFetching={isFetching}
            isNotPostTitle="Посты не найдены" 
            />
        )}
    </div>
  );
};

export default SubscriptionsListPostById;
