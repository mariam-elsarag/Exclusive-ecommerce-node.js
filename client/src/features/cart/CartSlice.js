import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = action.payload;
    },
    removeFromCart(state, action) {
      state.cart = action.payload;
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
