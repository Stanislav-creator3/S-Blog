import { useGetPostsByTagInfiniteQuery } from "@/features/tags/api/tagsApi";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";
import { useParams } from "react-router";

const TagsPostsPage = () => {
  const { name = "" } = useParams();
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetPostsByTagInfiniteQuery(name, { initialPageParam: "" });

  return isLoading ? (
    Array.from({ length: 5 }).map((_, index) => (
      <PostCardSkeleton className="mb-5" key={index} />
    ))
  ) : (
    <>
      <InfinitePostsList
        title={`Посты по тегу: #${name}`}
        isFetching={isFetching}
        fetchNextPage={fetchNextPage}
        isNotPostTitle="Постов не найдено"
        data={data}
      />
    </>
  );
};

export default TagsPostsPage;
