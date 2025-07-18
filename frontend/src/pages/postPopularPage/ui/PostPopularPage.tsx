import { useGetPostsPopularInfiniteQuery } from "@/entities/posts/api/posts.api";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";

const PostPopularPage = () => {
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetPostsPopularInfiniteQuery("");

  return isLoading ? (
    Array.from({ length: 5 }).map((_, index) => (
      <PostCardSkeleton className="mb-5" key={index} />
    ))
  ) : (
    <InfinitePostsList
      data={data}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      title="Популярные посты:"
      isNotPostTitle={"Здесь будет популярные посты"}
    />
  );
};

export default PostPopularPage;
