import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import cartReducer from "./features/cart/CartSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
