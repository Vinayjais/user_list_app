import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const fetchData = createAsyncThunk(
    'list/fetchData',
    async ({ page, limit } : any, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
            const data = await response.json();
            return data;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Something went wrong';
            Alert.alert('Error', message);
            return rejectWithValue(message);
        }
    }
)
const list = createSlice({
    name: "list",
    initialState: {
        data: [],
        laoding: false,
        isRefreshing: false,
        page: 1,
        limit: 5,
        hasMore: true,
        haseMoreLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const newData = action.payload ?? [];
            state.data = action.meta.arg.page === 1 ? newData : [...state.data, ...newData];
            state.hasMore = newData.length >= state.limit;
            state.page = action.meta.arg.page + 1;
            state.laoding = false;
            state.isRefreshing = false;
            state.haseMoreLoading = false;
        })
        builder.addCase(fetchData.pending, (state, action) => {
            if (action.meta.arg.page === 1) {
                state.isRefreshing = true;
                state.laoding = true;
                state.data = [];
                state.page = 1;
            } else {
                state.haseMoreLoading = true;
            }
        })
        builder.addCase(fetchData.rejected, (state) => {
            state.laoding = false;
            state.isRefreshing = false;
            state.haseMoreLoading = false;
        })
    }
})

export default list.reducer;