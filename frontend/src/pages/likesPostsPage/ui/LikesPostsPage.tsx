import { useGetLikedPostsInfiniteQuery } from "@/features/like/api/likeApi";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";

const LikesPostPage = () => {
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetLikedPostsInfiniteQuery("", { refetchOnMountOrArgChange: true });

  return isLoading ? (
    Array.from({ length: 5 }).map((_, index) => (
      <PostCardSkeleton className="mb-5" key={index} />
    ))
  ) : (
    <InfinitePostsList
      data={data}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      title="Понравившиеся посты"
      isNotPostTitle="Здесь будут посты понравившиеся вам 💙"
    />
  );
};

export default LikesPostPage;
