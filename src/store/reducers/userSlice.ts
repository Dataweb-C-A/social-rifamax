import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TokenState {
  token: string | null;
}

interface TrustState {
  trustInDevice: boolean;
}

interface UserState {
  user: {
    id: number;
    avatar: string | null;
    name: string;
    email: string;
    dni: string | null;
    influencer_id: number | null;
    is_active: boolean;
    phone: string;
    role: "Admin" | "Influencer";
    content_code: string | null;
    is_first_entry: boolean;
  } | null;
}

const initialState: UserState & TokenState & TrustState = {
  user: await axios.get('http://localhost:3000/shared/users/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then((res) => {
    return res.data;
  }).catch(() => {
    return null;
  }),
  token: localStorage.getItem("token"),
  trustInDevice: Boolean(localStorage.getItem("trusted")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    trustInDevice: (state, action: PayloadAction<boolean>) => {
      state.user !== null && (state.trustInDevice = action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("trust");
      state.user = null;
      state.token = null;
      state.trustInDevice = false;
    },
  },
});

export const { trustInDevice, setUser, clearUser, setToken } =
  userSlice.actions;

export default userSlice.reducer;
