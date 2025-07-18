import { IPost } from "@/entities/posts/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPostsByTag: builder.infiniteQuery<
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
        url: `/tags/${queryArg}?take=${5}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    getPopularTags: builder.query<string[], void>({
      query: () => "/tags/popular",
      providesTags: ["Tags"],
    }),
  }),
});

export const { useGetPostsByTagInfiniteQuery, useGetPopularTagsQuery } =
  tagsApi;
