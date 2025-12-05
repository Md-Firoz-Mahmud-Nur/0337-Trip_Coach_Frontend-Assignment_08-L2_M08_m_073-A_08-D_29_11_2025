import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from './slices/authSlice'
import packagesReducer from './slices/packagesSlice'


export const store = configureStore({
reducer: {
auth: authReducer,
packages: packagesReducer,
},
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()