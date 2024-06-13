import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWish } from "../../Functionality/wishlistSlice";
import { addItems } from "../../Functionality/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { prodErrorMap } from "firebase/auth";

const Wishlist = () => {

    const navigator = useNavigate()
    const isLogin = useSelector(state => state.authSlice.isLoggedIn)
    if (!isLogin) {
        navigator('/login')
    }
    const cartData = useSelector(state => state.cartSlice.cartItem)
    let product = useSelector(state => state.wishlistSlice.wish)
    // console.log("Wishlist ", product)

    product = product?.filter((item) => !(cartData?.includes(item.id)))

    const dispatch = useDispatch()



    const addToCart = (product) => {
        if (isLogin) {
            dispatch(addItems(product))
            navigator(`/cart/${JSON.parse(sessionStorage.getItem('userInfo'))?.uid}`)
        }
        else {
            alert('Please Login First!')
            navigator('/login')
        }
    }

    const removeFromWish = (product) => {
        dispatch(removeWish(product))
    }


    return (
        <>
            <div className="container mx-auto p-4">
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b bg-white">
                    <h1 className="text-2xl font-bold text-green-400">Wishlist</h1>
                    <Link to='/' className="text-blue-400 text-lg hover:text-blue-500">Continue Shopping</Link>
                </header>

                {/* Main Content */}
                <div className="flex flex-col mt-8 space-y-8">
                    {/* Wishlist Items */}
                    {product === undefined || product.length === 0? <span className="text-lg mx-3"> Wishlist is Empty</span> : ""}
                    {product?.map((data) => (
                        <div className="bg-white shadow-lg rounded-lg p-4" key={data.id}>
                            <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
                                <img src={data?.image} alt="Product Image" className="w-full min-w-[250px] max-w-[300px] h-auto  object-cover rounded-lg mb-4 md:mb-0 m-auto" />
                                <div className="flex-1 ml-0 md:ml-4">
                                    <h2 className="text-lg font-semibold">{data?.title}</h2>
                                    <p className="text-gray-600 my-5">{data?.description}</p>
                                    <div className="flex items-center mt-2">
                                        <button className={`bg-blue-400 hover:bg-blue-600 text-white py-2 px-3 rounded-lg mr-2 `} onClick={() => addToCart(data)}>Add to Cart</button>
                                        <button className="bg-red-400 py-2 px-3 text-white rounded-md hover:bg-red-600" onClick={() => removeFromWish(data)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Wishlist;