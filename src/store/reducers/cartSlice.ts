import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cart: {
    products: {
      identifier: string;
      raffle_id: number;
      product_id: number;
      price: number;
    }[];
  }
}

const initialState: CartState = {
  cart: {
    products: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<CartState>) => {
      state.cart = action.payload.cart;
    },
    addProduct: (state) => {
      // state.cart.products.push(action.payload.cart.products[0]);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeProduct: (state) => {
      // state.cart.products = state.cart.products.filter(
      //   (product) => product.identifier !== action.payload.cart.products[0].identifier
      // );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearProduts: (state) => {
      localStorage.removeItem("cart");  
      state.cart = {
        products: [],
      };
    },
  },
});

export const { setProducts, clearProduts } = cartSlice.actions;

export default cartSlice.reducer;
