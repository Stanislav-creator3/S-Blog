import { IPost } from "@/entities/posts/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";
import { takePosts } from "@/shared/constants";

export const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLikedPosts: builder.infiniteQuery<
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
        url: `/like/posts?take=${takePosts}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    likePost: builder.mutation<
      void,
      { id: string; followId?: string; username?: string }
    >({
      query: ({ id }) => ({
        url: `/like/${id}`,
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
                            post.likedByUser = true;
                            post._count.likes += 1;
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
    unlikePost: builder.mutation<
      void,
      { id: string; followId?: string; username?: string }
    >({
      query: ({ id }) => ({
        url: `/like/${id}`,
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
                            post.likedByUser = false;
                            post._count.likes -= 1;
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
  useLikePostMutation,
  useUnlikePostMutation,
  useGetLikedPostsInfiniteQuery,
} = likeApi;
