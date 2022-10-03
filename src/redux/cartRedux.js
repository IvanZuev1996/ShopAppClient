import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let isHaveProduct = false;
      state.products = state.products.map((p) => {
        if (p._id === action.payload._id) {
          if (p.size === action.payload.size) {
            isHaveProduct = true;
            return { ...p, quantity: p.quantity + action.payload.quantity };
          }
        }
        return p;
      });
      if (!isHaveProduct) {
        state.products.push({
          ...action.payload,
          productId: action.payload._id + `+size${action.payload.size}`,
        });
        state.quantity += 1;
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        (p) => p.productId !== action.payload.productId
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, action) => {
      let prevQuantity = 0;
      state.products = state.products.map((product) => {
        if (product.productId === action.payload.productId) {
          prevQuantity = product.quantity;
          return { ...product, quantity: action.payload.quantity };
        } else {
          return product;
        }
      });
      state.total +=
        action.payload.price * action.payload.quantity -
        action.payload.price * prevQuantity;
    },
    cleanCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, updateProduct, cleanCart } =
  cartSlice.actions;
export default cartSlice.reducer;
