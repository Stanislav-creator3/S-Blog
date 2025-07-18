import { useGetBookMarksInfiniteQuery } from "@/features/bookMarks/api/bookMarkApi";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";

const BookMarksPage = () => {
  const { data, isFetching, fetchNextPage, isLoading } =
    useGetBookMarksInfiniteQuery("", { refetchOnMountOrArgChange: true });

  return isLoading ? (
    Array.from({ length: 5 }).map((_, index) => (
      <PostCardSkeleton className="mb-5" key={index} />
    ))
  ) : (
    <InfinitePostsList
      data={data}
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      title="Закладки"
      isNotPostTitle="Здесь будут ваши закладки"
    />
  );
};

export default BookMarksPage;
