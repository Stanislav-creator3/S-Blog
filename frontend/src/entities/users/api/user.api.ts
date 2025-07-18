import { IUser } from "../model/types";
import { baseApi } from "@/shared/baseApi/baseApi";

interface IGetPopularUsersResponse extends IUser {
  display_name: string;
  count: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularUsers: builder.query<IGetPopularUsersResponse[], void>({
      query: () => ({
        url: "/users/popular",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUser: builder.query<IUser, string>({
      query: (username) => ({
        url: `/users/${username}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetPopularUsersQuery, useGetUserQuery, useLazyGetUserQuery } = usersApi;
