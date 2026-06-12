import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const fetchData = createAsyncThunk(
    'list/fetchData',
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
            if (!response.ok) throw new Error('Network response was not ok');
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
        addData(state, action) {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const newData = action.payload ?? [];
            state.data = state.page === 1 ? newData : [...state.data, ...newData];
            state.hasMore = newData.length >= state.limit;
            state.page = state.page + 1;
            state.laoding = false;
            state.haseMoreLoading = false;
        })
        builder.addCase(fetchData.pending, (state, action) => {
            if (action.meta.arg.page === 1) {
                state.laoding = true;
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