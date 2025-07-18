import { FormSearch } from "@/features/search";
import {
  useSearchPostsInfiniteQuery,
} from "@/features/search/api/SearchApi";
import { PostCardSkeleton } from "@/widgets/post";
import { InfinitePostsList } from "@/widgets/PostsList";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

const SearchPostsPage = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q")?.trim().toLocaleLowerCase();
  const {
    data: dataSearch,
    isLoading: isLoadingSearch,
    fetchNextPage,
    isFetching,
  } = useSearchPostsInfiniteQuery(q ?? "", { refetchOnMountOrArgChange: true });

  const form = useForm({
    defaultValues: {
      q: q || "",
    },
  });

  const onSubmit = async (data: { q: string }) => {
    if (!data.q) {
      return toast.error("Поле не может быть пустым", {
        position: "top-right",
      });
    }

    setParams({ q: data.q });
  };

  return (
    <div className="flex flex-col gap-4">
      <FormSearch
        onSubmit={form.handleSubmit(onSubmit)}
        register={form.register}
        label="q"
        required
      />
      <p className="text-2xl">Результаты запроса: {params.get("q")}</p>
      {isLoadingSearch ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {dataSearch && (
            <InfinitePostsList
              data={dataSearch}
              isNotPostTitle="Посты не найдены"
              isFetching={isFetching}
              fetchNextPage={fetchNextPage}
            />
          )}
          {isFetching &&
            Array.from({ length: 5 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
        </>
      )}
    </div>
  );
};

export default SearchPostsPage;
