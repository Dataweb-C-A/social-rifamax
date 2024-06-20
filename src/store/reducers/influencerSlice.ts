import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfluencerUserState {
  id: number;
  name: string;
  dni: string;
  is_active: boolean;
  phone: string | null;
  influencer_id: number;
  content_code: string;
  role: 'Influencer' | 'Admin'
}

interface InfluencerState {
  content_code: string;
  user?: InfluencerUserState;
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const initialState: InfluencerState = {
  content_code: urlParams.get("content_code") || "",
};

export const influencerSlice = createSlice({
  name: "influencer",
  initialState,
  reducers: {
    setInfluencer: (state, action: PayloadAction<InfluencerUserState>) => {
      state.user = action.payload;
    },
  },
});

export const { setInfluencer } = influencerSlice.actions;

export default influencerSlice.reducer;
