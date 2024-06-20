import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './reducers/themeSlice'
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'
import languageReducer from './reducers/languageSlice'
import clientReducer from './reducers/clientSlice'
import addressReducer from './reducers/addressSlice'
import influencerReducer from './reducers/influencerSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    cart: cartReducer,
    language: languageReducer,
    influencer: influencerReducer,
    client: clientReducer,
    address: addressReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch