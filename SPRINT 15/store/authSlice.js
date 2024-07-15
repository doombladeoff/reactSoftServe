import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        login: null,
        token: null,
        refreshToken: null,
    },
    reducers: {
        loginUser(state, action) {
            const { username, accessToken, refreshToken } = action.payload;
            state.isAuthenticated = true;
            state.login = username;
            state.token = accessToken;
            state.refreshToken = refreshToken;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.login = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const authActions = { ...authSlice.actions };

export default authSlice;
