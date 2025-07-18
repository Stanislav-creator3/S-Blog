import { setAuth, setAvatar } from "@/entities/auth/model/auth.slice";
import { baseApi } from "@/shared/baseApi/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (credentials) => ({
        url: "/account/change-avatar",
        method: "POST",
        body: credentials,
        formatDate: true,
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAvatar(data.avatar));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    removeAvatar: builder.mutation<void, void>({
      query: () => ({
        url: "/account/remove-avatar",
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch }) => {
        try {
          dispatch(setAvatar(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    changeInfoUser: builder.mutation({
      query: (credentials) => ({
        url: "/account/change-info",
        method: "POST",
        body: credentials,
        formatDate: true,
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useRemoveAvatarMutation,
  useChangeInfoUserMutation,
} = profileApi;
