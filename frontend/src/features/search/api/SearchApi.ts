import { IPost } from "@/entities/posts/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";
import { takePosts } from "@/shared/constants";

const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPosts: builder.infiniteQuery<
      { posts: IPost[]; nextId: string },
      string,
      string
    >({
      infiniteQueryOptions: {
        initialPageParam: "",
        getNextPageParam: (lastPage) => {
          if (lastPage.nextId) {
            return lastPage.nextId;
          }
          return undefined;
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: `/posts/search/${queryArg}?take=${takePosts}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
  }),
});

export const { useSearchPostsInfiniteQuery } = searchApi;
