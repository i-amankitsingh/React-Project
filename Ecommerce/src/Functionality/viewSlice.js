import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    product : null,
}


export const viewProductSlice = createSlice({
    name: 'viewProduct',
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
    }
})

export const {setProduct} = viewProductSlice.actions;
export default viewProductSlice.reducer