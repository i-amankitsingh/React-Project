import { createSlice } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";


const uid = JSON.parse(sessionStorage.getItem('userInfo'))?.uid

const initialState = {
    wish : JSON.parse(localStorage.getItem(uid?.concat('wish')))
}

export const wishlistSlice = createSlice({
    name : 'Wishlist',
    initialState,
    reducers : {
        addWish : (state, action) => {
            const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid
            if(!(JSON.parse(localStorage.getItem(userId.concat('wish'))))){
                localStorage.setItem(userId.concat('wish'), JSON.stringify([]))
            }

            const wishItem = JSON.parse(localStorage.getItem(userId.concat('wish')))
            console.log(wishItem)
            wishItem.push(action.payload);
            state.wish = wishItem;
            localStorage.setItem(userId.concat('wish'), JSON.stringify(state.wish))
        },
        removeWish : (state, action) => {
            const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid
            state.wish = state.wish.filter((row) => row.id !== action.payload.id)
            localStorage.setItem(userId.concat('wish'), JSON.stringify(state.wish))
        },
    }
})

export const {addWish, removeWish} = wishlistSlice.actions
export default wishlistSlice.reducer