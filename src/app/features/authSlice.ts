import { createSlice } from "@reduxjs/toolkit";

export type authStateType = {
    isLoggedIn: boolean
}
const initialState:authStateType = {
    isLoggedIn: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user_id', action.payload.user_id);
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('phone', action.payload.phone);
        },
        logout: (state) => {
            state.isLoggedIn = false
        }
    }
})

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;