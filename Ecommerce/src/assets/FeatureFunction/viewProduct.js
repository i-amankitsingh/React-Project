import { setProduct } from "../../Functionality/viewSlice"



const viewProduct = (dispatch, product) => {
    dispatch(setProduct(product))
    localStorage.setItem('pid', product.id)
    localStorage.setItem('product', JSON.stringify(product))
}

export default viewProduct;