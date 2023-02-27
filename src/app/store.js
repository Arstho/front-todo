import { configureStore } from "@reduxjs/toolkit";
import todosReduser from '../features/todoSlice'

export const store = configureStore ({
  reducer: {
    todosReduser,
  },
}) 
