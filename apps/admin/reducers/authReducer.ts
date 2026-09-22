import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginHandler, signupHandler } from "../handlers/handler";

export interface AuthState {
    email: string;
    password: string;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    email: "",
    password: "",
    token: null,
    loading: false,
    error: null,
};

export const signup = createAsyncThunk(
    "auth/signup",
    async ({ email, password }: { email: string; password: string }) => {
        return signupHandler({ email, password });
    },
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {
        return loginHandler({ email, password });
    },
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.email = "";
            state.password = "";
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.email = action.meta.arg.email;
                state.password = "";
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unable to create account";
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.email = action.meta.arg.email;
                state.password = "";
                state.token = action.payload.data;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Unable to log in";
            });
    },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;