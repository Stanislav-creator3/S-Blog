import { createSlice } from "@reduxjs/toolkit";


export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: window.localStorage.getItem("sidebar") === "true" ? true : false,
  },
  reducers: {
    open: (state) => {
      window.localStorage.setItem("sidebar", "true");
      state.isOpen = true;
    },
    close: (state) => {
      window.localStorage.setItem("sidebar", "false");
      state.isOpen = false;
    },
  },
});

export const { close, open } = sidebarSlice.actions;

export default sidebarSlice.reducer;
