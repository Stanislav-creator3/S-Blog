import { takePosts } from "@/shared/constants";
import { IDiscussionPosts, IPost } from "../model/types";
import { baseApi } from "@/shared/baseApi/baseApi";

type CreatePost = {
  imageUrl?: string;
  content: string;
  title: string;
  tags: string[];
};

type UpdatePost = CreatePost & {
  id: string;
};

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.infiniteQuery<{posts:IPost[]; nextId: string}, string, string>({
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
        url: `/posts?take=${takePosts}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts",],
    }),
    getPostsPopular: builder.infiniteQuery<{posts:IPost[]; nextId: string}, string, string>({
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
        url: `/posts/popular?take=${takePosts}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    getPost: builder.query<IPost, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<IPost, CreatePost>({
      query: (credentials) => ({
        url: "/posts",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Posts", "User"],
    }),
    updatePost: builder.mutation<IPost, UpdatePost>({
      query: (credentials) => ({
        url: `/posts/${credentials.id}`,
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Posts", "User"],
    }),
    deletePost: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
      async onQueryStarted({ id }, lifecycleApi) {
        const postsDeleteResult = await lifecycleApi.dispatch(
          postsApi.util.updateQueryData("getPosts", "", (draft) => {
            draft.pages = draft.pages.map((page) => ({
              posts: page.posts.filter((post) => post.id !== id),
              nextId: page.nextId,
            }));
          })
        );
        try {
          await lifecycleApi.queryFulfilled;
        } catch {
          postsDeleteResult.undo();
        }
      },
    }),
    getDiscussionPosts: builder.query<IDiscussionPosts[], void>({
      query: () => "/posts/discussion",
      providesTags: ["PostsDiscussion"],
    }),
  }),
});


export const {
  useGetPostQuery,
  useLazyGetPostQuery,
  useGetPostsInfiniteQuery,
  useGetPostsPopularInfiniteQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetDiscussionPostsQuery,
} = postsApi;
