import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export type Package = { id: string; title: string; slug: string; price: number }


const initialState = { items: [] as Package[], loading: false }


export const fetchPackages = createAsyncThunk('packages/fetch', async () => {
const res = await axios.get('/api/packages')
return res.data as Package[]
})


const packagesSlice = createSlice({
name: 'packages',
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchPackages.pending, (s) => { s.loading = true })
.addCase(fetchPackages.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
.addCase(fetchPackages.rejected, (s) => { s.loading = false })
},
})


export default packagesSlice.reducer