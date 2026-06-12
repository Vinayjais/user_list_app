import { createSlice } from "@reduxjs/toolkit";

const list = createSlice({
    name: "list",
    initialState: {
        data: []
    },
    reducers: {
        addData(state, action) {
            state.data.push(action.payload)
        }
    }
})

export const { addData } = list.actions;
export default list.reducer;