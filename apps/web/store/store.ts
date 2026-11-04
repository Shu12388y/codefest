import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./workspaceReducer";
import quizReducer from "./quizReducer";

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
