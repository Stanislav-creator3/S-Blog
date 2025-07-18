import { IPost } from "@/entities/posts/model/types";
import { IUser } from "@/entities/users/model/types";
import { baseApi } from "@/shared/baseApi/baseApi";
import { takePosts } from "@/shared/constants";

export interface IFollow {
  id: string;
  follower: {
    id: string;
    username: string;
    avatar: string | undefined;
    displayName: string;
    _count: {
      followers: number;
    };
  };
  followerId: string;
  followingId: string;
  following: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export const followApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeFollow: builder.query<IFollow[], void>({
      query: () => ({
        url: "/follow/followers",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Follower"],
    }),
    getMyFollowings: builder.query<IFollow[], void>({
      query: () => ({
        url: "/follow/followings",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Following"],
    }),
    follow: builder.mutation<boolean, { followId: string }>({
      query: (credentials) => ({
        url: "/follow/follow",
        method: "POST",
        body: credentials,
        credentials: "include",
        invalidatesTags: ["Follower"],
      }),
    }),
    unFollow: builder.mutation<boolean, { followId: string }>({
      query: (credentials) => ({
        url: "/follow/unfollow",
        method: "POST",
        body: credentials,
        credentials: "include",
        invalidatesTags: ["Follower"],
      }),
    }),
    getSubscription: builder.infiniteQuery<
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
        url: `/follow/subscriptions?take=${takePosts}&cursor=${pageParam}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
    getByIdSubscription: builder.infiniteQuery<
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
        url: `/posts/users/${queryArg}?take=${takePosts}&cursor=${pageParam}`,
        credentials: "include",
      }),
      providesTags: ["Posts"],
    }),
  }),
});

export const {
  useFollowMutation,
  useUnFollowMutation,
  useGetMeFollowQuery,
  useGetMyFollowingsQuery,
  useGetSubscriptionInfiniteQuery,
  useGetByIdSubscriptionInfiniteQuery,
} = followApi;
