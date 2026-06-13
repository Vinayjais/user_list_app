import { createSlice } from "@reduxjs/toolkit";

interface Item {
  id: string;
  text: string;
  done: boolean;
}

interface DeletedItem {
    item: Item;
    index: number;
}

interface State {
    data: Item[];
    deleted: DeletedItem[];
}

const initialState: State = {
  data: [],
  deleted: []
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
            const index = state.data.findIndex(t => t.id === action.payload);
            if (index !== -1) {
                state.deleted.unshift({ item: state.data[index], index });
                state.data.splice(index, 1);
            }
        },
        undoDelete: (state, action) => {
            const index = state.deleted.findIndex(d => d.item.id === action.payload);
            if (index !== -1) {
                const [deleted] = state.deleted.splice(index, 1);
                state.data.splice(deleted.index, 0, deleted.item);
            }
        },
        removeDeleted: (state, action) => {
            state.deleted = state.deleted.filter(d => d.item.id !== action.payload);
        },
    }
});

export const { addTodo, editTodo, toggleTodo, deleteTodo, undoDelete, removeDeleted } = todo.actions;
export default todo.reducer;