import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const fetchData = createAsyncThunk(
    'list/fetchData',
    async (params, {rejectWithValue}) => {
        try {
              const response = await fetch('https://jsonplaceholder.typicode.com/users')
              console.log("====response==",response)
        const data = await response.json()
        return data;
        } catch (error) {
            Alert.alert('Error', error.message)
        }
      
    }
)
const list = createSlice({
    name: "list",
    initialState: {
        data: [],
        laoding:false
    },
    reducers: {
        addData(state, action) {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload ?? []
            state.laoding = false
        })
        builder.addCase(fetchData.pending, (state) => {
            state.laoding = true
        })
        builder.addCase(fetchData.rejected, (state) => {
            state.laoding = false
        })
    }
})

export const { addData } = list.actions;
export default list.reducer;