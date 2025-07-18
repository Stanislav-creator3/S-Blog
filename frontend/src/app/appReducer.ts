import { combineReducers } from "@reduxjs/toolkit";
import postsReducer from "@/entities/posts/model/post.slice";
import authReducer from "@/entities/auth/model/auth.slice";
import sidebarReducer from "@/widgets/sidebar/model/sidebarSlice";

import { baseApi } from "@/shared/baseApi/baseApi";

export const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
