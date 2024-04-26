import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: number;
    name: string;
    dni: string | null;
    is_active: boolean;
    phone: string;
    role: string;
    content_code: string | null;
    is_authenticated: boolean;
  } | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
