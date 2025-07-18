import { setAuth } from "../model/auth.slice";
import { IUser } from "@/entities/users/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";
import Cookies from "js-cookie";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<IUser, void>({
      query: () => ({
        url: "/account",
        method: "GET",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
          dispatch(setAuth(null));
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/session/login",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
          dispatch(setAuth(null));
        }
      },
    }),
    create: builder.mutation({
      query: (credentials) => ({
        url: "/account/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
          dispatch(setAuth(null));
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/session/logout",
        method: "POST",
        credentials: "include",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(setAuth(null));
          Cookies.remove("session");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateMutation,
  useMeQuery,
  useLazyMeQuery,
  useLogoutMutation
} = authApi;
