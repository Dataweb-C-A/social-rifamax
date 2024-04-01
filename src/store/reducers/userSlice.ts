import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

interface UserState {
  user: {
    id: number;
    name: string;
    dni: string | null;
    is_active: boolean;
    phone: string;
    role: string;
    content_code: string | null;
  } | null;
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      axios.get(`${import.meta.env.URL_BASE + '/shared/users/profile'}`,{
        headers: {
          Authorization: `Bearer ${action.payload}`
        }
      })
      .then((response) => {
        state.user = response.data;
      })
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
