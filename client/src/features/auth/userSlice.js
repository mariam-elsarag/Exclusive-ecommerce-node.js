import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const initialState = {
  user: Cookies.get("full_name"),
  token: Cookies.get("token"),
  profile_picture: Cookies.get("profile_picture"),

  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload.full_name;
      state.token = action.payload.token;
      state.profile_picture = action.payload.profile_picture;
    },
    logOut(state) {
      state.user = null;
    },
  },
});
export const { signIn, logOut } = userSlice.actions;
export default userSlice.reducer;
