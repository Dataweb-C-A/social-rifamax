import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  address: string;
  province: string;
  country: string;
  zip_code: string;
}

const initialState: AddressState = {
  address: '',
  province: '',
  country: '',
  zip_code: '',
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state.address = action.payload.address;
      state.province = action.payload.province;
      state.country = action.payload.country;
      state.zip_code = action.payload.zip_code;
    }
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;