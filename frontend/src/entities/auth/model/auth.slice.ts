import { IUser } from "@/entities/users/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  auth: IUser | null;
};

const initialState: State = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser | null>) => {
      state.auth = action.payload;
    },
    setAvatar: (state, action) => {
      if (state.auth) state.auth.avatar = action.payload;
    },

    setReset: (state) => {
      state.auth = null;
    },
  },
});

export const { setAuth, setAvatar, setReset } = authSlice.actions;

export default authSlice.reducer;
