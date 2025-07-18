import { baseApi } from "@/shared/baseApi/baseApi";


interface CreateComment {
  content: string;
  postId: string;
}

interface UpdateComment {
  content: string;
  id: string;
}

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<boolean, CreateComment>({
      query: (credentials) => ({
        url: "/comments",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    deleteComment: builder.mutation<boolean, string>({
      query: (credentials) => ({
        url: `/comments/${credentials}`,
        method: "DELETE",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    updateComment: builder.mutation<boolean, UpdateComment>({
      query: (credentials) => ({
        url: `/comments/${credentials.id}`,
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
