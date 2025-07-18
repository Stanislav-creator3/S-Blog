import { IPost } from "@/entities/posts/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";

export const bookMarkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookMarks: builder.infiniteQuery<
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
      query: ({ pageParam }) => ({
        url: `/bookmarks?take=${5}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    createBookMark: builder.mutation({
      query: ({ id }) => ({
        url: `/bookmarks/${id}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Post", "User"],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;

          const postsCache = baseApi.util.selectInvalidatedBy(getState(), [
            { type: "Posts" },
          ]);

          postsCache.forEach(({ originalArgs, endpointName }) => {
            dispatch(
              baseApi.util.updateQueryData(
                // @ts-expect-error should be fixed
                endpointName,
                originalArgs,
                (draft) => {
                  draft.pages.flatMap(
                    (page: { posts: IPost[]; nextId: string }) => {
                      return {
                        posts: page.posts.map((post) => {
                          if (post.id === args.id) {
                            post.bookMarkedByUser = true;
                            return;
                          }
                        }),
                        nextId: page.nextId,
                      };
                    }
                  );
                }
              )
            );
          });
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteBookMark: builder.mutation({
      query: ({ id }) => ({
        url: `/bookmarks/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post", "User"],
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;

          const postsCache = baseApi.util.selectInvalidatedBy(getState(), [
            { type: "Posts" },
          ]);

          postsCache
            .forEach(({ originalArgs, endpointName }) => {
              dispatch(
                baseApi.util.updateQueryData(
                  // @ts-expect-error should be fixed
                  endpointName,
                  originalArgs,
                  (draft) => {
                    draft.pages.flatMap(
                      (page: { posts: IPost[]; nextId: string }) => {
                        return {
                          posts: page.posts.map((post) => {
                            if (post.id === args.id) {
                              post.bookMarkedByUser = false;
                              return;
                            }
                          }),
                          nextId: page.nextId,
                        };
                      }
                    );
                  }
                )
              );
            });
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetBookMarksInfiniteQuery,
  useCreateBookMarkMutation,
  useDeleteBookMarkMutation,
} = bookMarkApi;
