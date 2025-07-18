import { Variants } from "motion/react";
import styles from "./styles.module.css";
import { cn } from "@/shared/utils/tw-merge";
import { DiscussionPosts, PostCardSkeleton } from "@/widgets/post";
import { TagsPopular } from "@/widgets/TagsPopular";
import {
  useGetDiscussionPostsQuery,
  useGetPostsInfiniteQuery,
} from "@/entities/posts/api/posts.api";
import { ScrollRestoration } from "react-router";
import { InfinitePostsList } from "@/widgets/PostsList";

interface Props {
  className?: string;
}

export const tabContentVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};

const MainPages: React.FC<Props> = () => {
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetPostsInfiniteQuery("");

  const { data: discussionData, isLoading: isDiscussionLoading } =
    useGetDiscussionPostsQuery();

  return (
    <div className={cn(styles.container, "gap-5")}>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <PostCardSkeleton className="mb-5" key={index} />
        ))
      ) : (
        <InfinitePostsList
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          data={data}
          isNotPostTitle="Постов нету 🥺"
        />
      )}
      <div className="w-full sticky top-25 max-h-[90vh] p-2 overflow-y-scroll self-start">
        <h3 className="text-2xl font-bold mb-2">Популярные теги</h3>{" "}
        <TagsPopular className="p-2 mb-4" />
        {isDiscussionLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton className="mb-5" key={index} />
          ))
        ) : (
          <div className="flex flex-col gap-2">
            {discussionData && discussionData.length > 0 && (
              <h4 className="text-2xl font-bold mb-2"> Обсуждаемые</h4>
            )}
            {discussionData?.map((item) => (
              <DiscussionPosts
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                countComments={item._count.comments}
              />
            ))}
          </div>
        )}
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default MainPages;
