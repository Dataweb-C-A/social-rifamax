import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const initialState: ClientState = {
  id: 0,
  name: "",
  phone: "",
  email: "",
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<ClientState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

export const { setClient } = clientSlice.actions;

export default clientSlice.reducer;
