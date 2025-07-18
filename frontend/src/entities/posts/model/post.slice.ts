import { IPost } from "./types";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  posts: IPost[];
  currentPost: IPost | null;
}

const initialState: State = {
  posts: [],
  currentPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setCurrentPost(state, action) {
      state.currentPost = action.payload;
    },
  },
});

export const { setPosts, setCurrentPost } = postsSlice.actions;

export default postsSlice.reducer;
