import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : JSON.parse(sessionStorage.getItem('isLogin')),
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.isLoggedIn = true;
        },
        logout : (state, action) => {
            state.isLoggedIn = false;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;