import { configureStore } from "@reduxjs/toolkit";
import  viewProductReducer  from "../Functionality/viewSlice";
import authSliceReducer from "../Functionality/authSlice";
import cartSliceReducer from "../Functionality/cartSlice";
import wishlistSliceRecuder from "../Functionality/wishlistSlice"

export const store = configureStore({
    reducer : {
        viewProduct : viewProductReducer,
        authSlice : authSliceReducer,
        cartSlice : cartSliceReducer,
        wishlistSlice : wishlistSliceRecuder,
    }
})