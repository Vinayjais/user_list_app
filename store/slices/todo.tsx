import { createSlice } from "@reduxjs/toolkit";

interface Item {
  id: string;
  text: string;
  done: boolean;
}

interface State {
    data: Item[];
}

const initialState: State = {
  data: [],
};


const todo = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.data.push({ id: Date.now().toString(), text: action.payload, done: false });
        },
        editTodo: (state, action) => {
            const item = state.data.find(t => t.id === action.payload.id);
            if (item) item.text = action.payload.text;
        },
        toggleTodo: (state, action) => {
            const item = state.data.find(t => t.id === action.payload);
            if (item) item.done = !item.done;
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(t => t.id !== action.payload);
        },
    }
});

export const { addTodo, editTodo, toggleTodo, deleteTodo } = todo.actions;
export default todo.reducer;