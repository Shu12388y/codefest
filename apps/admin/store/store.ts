import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import blogReducer from "../reducers/blogReducer";
import jobReducer from "../reducers/jobReducer";
import analyticsReducer from "../reducers/analyticsReducer";
import questionReducer from "../reducers/questionReducer";
import submissionReducer from "../reducers/submissionReducer";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        blogs: blogReducer,
        jobs: jobReducer,
        analytics: analyticsReducer,
        questions: questionReducer,
        submissions: submissionReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch