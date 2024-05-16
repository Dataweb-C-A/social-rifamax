import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: {
    identifier: string;
    raffle_id: number;
    product_id: number;
    price: number;
  }[];
}

const initialState: CartState = {
  products: JSON.parse(localStorage.getItem("cart") || '{ "products": [] }').products,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<CartState>) => {
      const data = JSON.parse(
        localStorage.getItem("cart") || '{ "products": [] }'
      );

      const combinedData = {
        products: [...action.payload.products, ...data.products],
      };

      state.products = combinedData.products;

      localStorage.setItem("cart", JSON.stringify(combinedData));
    },
    addProduct: (state) => {
      state.products.push(
        {
          identifier: "1",
          raffle_id: 1,
          product_id: 1,
          price: 5,
        },
      );

      const data = JSON.parse(
        localStorage.getItem("cart") || '{ "products": [] }'
      );

      const combinedData = {
        products: [
          ...data.products,
          {
            identifier: "3",
            raffle_id: 3,
            product_id: 3,
            price: 10,
          },
        ],
      };

      localStorage.setItem("cart", JSON.stringify(combinedData));
    },
    removeProduct: (state) => {
      // state.cart.products = state.cart.products.filter(
      //   (product) => product.identifier !== action.payload.cart.products[0].identifier
      // );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearProducts: (state) => {
      localStorage.removeItem("cart");

      state.products = [];
    },
  },
});

export const { setProducts, clearProducts, addProduct } = cartSlice.actions;

export default cartSlice.reducer;
