import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const initialState = {
  user: Cookies.get("full_name"),
  token: Cookies.get("token"),

  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload.full_name;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.user = undefined;
      state.token = undefined;
    },
  },
});
export const { signIn, logOut } = userSlice.actions;
export default userSlice.reducer;
