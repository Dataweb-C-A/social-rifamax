import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './reducers/themeSlice'
import userReducer from './reducers/userSlice'
import cartReducer from './reducers/cartSlice'
import languageSlice from './reducers/languageSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    cart: cartReducer,
    language: languageSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch