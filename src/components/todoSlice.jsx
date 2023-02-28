import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {  
  todos: [],
};

export const fetchTodos = createAsyncThunk(         
  "fetch/todos",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todo");   
      const todos = await res.json();

      return todos;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteTodos = createAsyncThunk(           
  "delete/todos",
  async (id, { rejecWithValue }) => {
    try {
      await fetch(`http://localhost:4000/todo/${id}`, {   
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejecWithValue(error.message);
    }
  }
);

export const completeTodos = createAsyncThunk(
  "update/Todos",
  async ({ id, completed }, { rejecWithValue }) => {  
    try {
      await fetch(`http://localhost:4000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),  
      });
      return id;
    } catch (error) {
      return rejecWithValue(error.message); 
    }
  }
);

export const addTodo = createAsyncThunk(
  "add/Todo",
  async (text, { rejecWithValue }) => {   
    try {
      const res = await fetch("http://localhost:4000/todo", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),             
      });
      return res.json(); 
    } catch (error) {
      return rejecWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {   
      state.todos = action.payload;
    });

    builder.addCase(deleteTodos.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);           
    });

    builder.addCase(completeTodos.fulfilled, (state, action) => {  
      state.todos = state.todos.map((todo) => {   
        if (todo._id === action.payload) {   
          todo.completed = !todo.completed; 
        }
        return todo;
      });
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {                  
      state.todos.push(action.payload);  
    });
  },
});

export default todoSlice.reducer;             
