import { createSlice, nanoid } from "@reduxjs/toolkit";

const uid = JSON.parse(sessionStorage.getItem('userInfo'))?.uid

const initialState = {
    cartItem : JSON.parse(localStorage.getItem(uid)),
}

export const cartItemSlice = createSlice({
    name : 'cartItem',
    initialState,
    reducers : {
        addItems : (state, action) => {
            const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid;
            if(!(JSON.parse(localStorage.getItem(userId)))){
                localStorage.setItem(userId, JSON.stringify([]))
            }
            const cartData = JSON.parse(localStorage.getItem(userId))
            cartData.push(action.payload.id)
            state.cartItem = cartData;
            localStorage.setItem(userId, JSON.stringify(state.cartItem))
        
        },
        removeItems : (state, action) => {
            const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid;
            state.cartItem = state.cartItem.filter((item) => item !== action.payload.id)
            localStorage.setItem(userId, JSON.stringify(state.cartItem))
        }
    }
}) 

export const {addItems, removeItems} = cartItemSlice.actions;
export default cartItemSlice.reducer