import { configureStore } from "@reduxjs/toolkit";
import listReducer from './slices/list';
import todoReducer from './slices/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistTodoReducer = persistReducer(persistConfig, todoReducer)

export const store = configureStore({
    reducer: {
        list: listReducer,
        todo: persistTodoReducer,
    }   
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;