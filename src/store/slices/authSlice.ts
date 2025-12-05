import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type User = { id: string; name: string; email: string } | null


const initialState = {
user: null as User,
token: null as string | null,
loading: false,
}


const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
setUser(state, action: PayloadAction<User>) {
state.user = action.payload
},
setToken(state, action: PayloadAction<string | null>) {
state.token = action.payload
},
logout(state) {
state.user = null
state.token = null
},
setLoading(state, action: PayloadAction<boolean>) {
state.loading = action.payload
},
},
})


export const { setUser, setToken, logout, setLoading } = authSlice.actions
export default authSlice.reducer