import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/todoSlice";

export const store =  configureStore({
    reducer: todoReducer 
    
})