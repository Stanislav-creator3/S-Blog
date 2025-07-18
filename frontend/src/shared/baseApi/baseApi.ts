import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: [
    "Posts",
    "PostsDiscussion",
    "Post",
    "Comments",
    "Tags",
    "Social",
    "Follower",
    "Following",
    "LikePosts",
    "Subscriptions",
    "Users",
    "User",
  ],

  endpoints: () => ({}),
});
