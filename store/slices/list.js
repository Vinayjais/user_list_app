import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const fetchData = createAsyncThunk(
    'list/fetchData',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            console.log("=dsada=====",page,limit)
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
            const data = await response.json();
            return data;
        } catch (error) {
            Alert.alert('Error', error.message);
            return rejectWithValue(error.message);
        }
    }
)
const list = createSlice({
    name: "list",
    initialState: {
        data: [],
        laoding: false,
        page: 1,
        limit: 6,
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
            state.haseMoreLoading = false;
        })
        builder.addCase(fetchData.pending, (state, action) => {
            if (action.meta.arg.page === 1) {
                state.laoding = true;
                state.data = [];
                state.page = 1;
            } else {
                state.haseMoreLoading = true;
            }
        })
        builder.addCase(fetchData.rejected, (state) => {
            state.laoding = false;
            state.haseMoreLoading = false;
        })
    }
})

export const { addData } = list.actions;
export default list.reducer;