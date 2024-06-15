import React, { useEffect, useState } from "react";
import { Link, json, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../Functionality/authSlice";
import { removeItems } from "../../Functionality/cartSlice";
import { setProduct } from "../../Functionality/viewSlice";
import viewProduct from "../FeatureFunction/viewProduct";

const Cart = () => {

    const navigator = useNavigate()
    const isLogin = useSelector(state => state.authSlice.isLoggedIn)
    if (!isLogin) {
        navigator('/login')
    }

    const userId = JSON.parse(sessionStorage.getItem('userInfo'))?.uid

    const userCartArr = 'cartArr' + userId

    const productData = useLoaderData();
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [qty, setQty] = useState(1)




    const dispatch = useDispatch()

    const cardData = useSelector(state => state.cartSlice.cartItem)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        if (cardData) {

            const filterProducts = productData.filter((data) => cardData?.includes(data.id))
            const updateProducts = filterProducts.map((obj) => ({ ...obj, qty: 1 }))
            const cartDataArr = JSON.parse(localStorage.getItem(userCartArr));
            if (updateProducts?.length > cartDataArr?.length) {
                let isAdded = false;
                for (let i = 0; i < updateProducts?.length; i++) {
                    for (let j = 0; j < cartDataArr?.length; j++) {
                        if (updateProducts[i]?.id !== cartDataArr[j]?.id) {
                            isAdded = false;
                        }
                        else {
                            isAdded = true;
                            break;
                        }
                    }
                    if (!isAdded) {
                        cartDataArr.push(updateProducts[i])
                    }
                }
            }

            if (!cartDataArr?.length > 0) {
                localStorage.setItem(userCartArr, JSON.stringify(updateProducts))
            }
            else {
                localStorage.setItem(userCartArr, JSON.stringify(cartDataArr))
            }
            const userCartItem = JSON.parse(localStorage.getItem(userCartArr))?.filter((items) => (JSON.parse(localStorage.getItem(userId).includes(items.id))))
            setCart(userCartItem)
        }

    }, [cardData, productData]);


    useEffect(() => {
        calculateSubtotal()
    }, [cart])

    const removeCartItem = (product) => {
        dispatch(removeItems(product))
        const oldCardDataArr = JSON.parse(localStorage.getItem(userCartArr))
        const newCardDataArr = oldCardDataArr.filter((items) => product.id !== items.id)
        localStorage.setItem(userCartArr, JSON.stringify(newCardDataArr))
        setCart(JSON.parse(localStorage.getItem(userCartArr)))
    }



    const increaseQty = (id) => {
        const cartItemsData = JSON.parse(localStorage.getItem(userCartArr))
        const updateCartItemsQty = cartItemsData.map((items) => (items.id === id ? { ...items, qty: items.qty + 1 } : { ...items }))
        localStorage.setItem(userCartArr, JSON.stringify(updateCartItemsQty))
        setCart(JSON.parse(localStorage.getItem(userCartArr)))
    }

    const decreaseQty = (id) => {
        const cartItemsData = JSON.parse(localStorage.getItem(userCartArr))
        const updateCartItemsQty = cartItemsData.map((items) => (items.id === id ? { ...items, qty: items.qty - 1 } : { ...items }))
        localStorage.setItem(userCartArr, JSON.stringify(updateCartItemsQty))
        setCart(JSON.parse(localStorage.getItem(userCartArr)))
    }

    const calculateSubtotal = () => {
        const subTotal = cart.reduce((acc, product) => {
            return acc + product.price * product.qty
        }, 0)
        const taxAmount = 20;
        const totalAmount = subTotal + taxAmount;
        setSubtotal(subTotal)
        setTax(taxAmount)
        setTotal(totalAmount)
    }

    const setProductData = () => {
        sessionStorage.setItem('orderData', JSON.stringify(cart))
    }

    return (
        <>
            <div className="container mx-auto p-4">
                {/* Header */}
                <header className="flex items-center justify-between p-4 bg-white">
                    <h1 className="text-2xl font-bold text-green-400">Shopping Cart</h1>
                    <Link to='/' className="text-blue-400 text-lg hover:text-blue-600">Continue Shopping</Link>
                </header>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
                    {/* Cart Items */}
                    <div className="flex-1 border border-blue-400 rounded-md">
                        {cart.length === 0 ? <span className="text-lg mx-3">Cart is Empty</span> : ""}
                        {cart?.map((row) => (
                            <div className="flex-1" key={row.id}>
                                <div className="bg-white shadow-lg rounded-lg p-4">
                                    <div className="flex flex-col md:flex-row  border-b border-blue-400 pb-4 mb-4">
                                        <img src={row.image} alt="Product Image" className="w-full md:w-24 min-w-[250px] aspect-square rounded-lg mb-4 md:mb-0" />
                                        <div className="flex-1 ml-0 md:ml-4 h-auto flex flex-col justify-between">
                                            <div>
                                                <Link to={`/product-details/${row.id}`}>
                                                    <h2 className="text-lg font-semibold cursor-pointer" onClick={() => viewProduct(dispatch, row)}>{row.title}</h2>
                                                </Link>
                                                <p className="text-gray-600 mt-2 mb-3">{row.description}</p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <span className="text-gray-900 font-semibold">Quantity:</span>
                                                <div className="mx-3">
                                                    <button className="bg-blue-400 w-10 text-3xl text-center active:bg-green-400 text-white h-10 rounded-md cursor-pointer" onClick={() => decreaseQty(row.id)}>-</button>
                                                    <span className="px-2 text-2xl">{row.qty}</span>
                                                    <button className="bg-blue-400 w-10 text-3xl text-center active:bg-green-400 text-white h-10 rounded-md cursor-pointer" onClick={() => increaseQty(row.id)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right h-auto mt-4 md:mt-0 md:ml-3 flex flex-col justify-between md:items-end items-start">
                                            <p className="text-lg font-semibold md:mb-0 mb-3">${row.price}</p>
                                            <button className="bg-red-500 text-white text-lg px-5 py-2 rounded-md md:w-auto w-full" onClick={() => removeCartItem(row)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-4 border border-green-400">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>{cart.length} Items</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${tax}</span>
                        </div>
                        <div className="flex justify-between font-semibold mb-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Link to={`/order`}>
                            <button className="w-full bg-green-400 text-white p-2 rounded-lg" onClick={setProductData}>Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;

export const fetchProduct = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const result = await res.json();
    return result;
};
