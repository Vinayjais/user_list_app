import { configureStore } from "@reduxjs/toolkit";
import listReducer from './slices/list'

export const store = configureStore({
    reducer: {
        list: listReducer
    }   
})