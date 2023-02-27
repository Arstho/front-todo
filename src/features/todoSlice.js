import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk('fetch/todos', async (_, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3222/');
    const todos = await res.json()
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const completeTodo = createAsyncThunk('complete/todo', async ({ id, completed }, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3222/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    })
    const todos = await res.json()
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const addTodo = createAsyncThunk('add/todo', async (data, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:3222/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: data }),
    })
    const todos = await res.json()
    if (todos.error) {
      return thunkAPI.rejectWithValue(todos.error)
    }
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk('delete/todo', async ({id}, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3222/${id}`, {
      method: 'DELETE',
    })
    const todos = await res.json()
    if (todos.error) {
      return thunkAPI.rejectWithValue(todos.error)
    }
    return thunkAPI.fulfillWithValue(todos)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

const todosSlice = createSlice({
  name: 'todos',
  loading: false,
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false
      state.todos = action.payload
    })
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    //patch
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo._id === action.payload._id) {
          todo.completed = !todo.completed
        }
        return todo
      })
      state.loading = false
    })
    builder.addCase(completeTodo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(completeTodo.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
    //post
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload)
      state.loading = false
    })
    builder.addCase(addTodo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addTodo.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    //del
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo._id !== action.payload._id
      })
      state.loading = false
    })
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  }
})

export default todosSlice.reducer;
