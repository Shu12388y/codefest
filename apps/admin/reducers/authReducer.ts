import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface authState{
    email:string
    password:string
}

const initialState:authState = {
    email:'',
    password:''
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        
    }
})