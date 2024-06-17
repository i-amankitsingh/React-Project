import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "../../Functionality/cartSlice";
import { useNavigate } from "react-router-dom";
import { addWish } from "../../Functionality/wishlistSlice";

const ProductDetails = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const isLogin = useSelector(state => state.authSlice.isLoggedIn);
  let isAdded = false;
  let isWishAdded = false;
  const dispatch = useDispatch()
  const navigator = useNavigate()

  const cartData = useSelector(state => state.cartSlice.cartItem)
  const wishData = useSelector(state => state.wishlistSlice.wish)



  let { id } = useParams()
  id = id === null ? localStorage.getItem('pid') : id;
  let product = useSelector(state => state.viewProduct.product)
  product = product === null ? JSON.parse(localStorage.getItem('product')) : product;
  // console.log(product)

  if (!product || product.id !== parseInt(id)) {
    return (
      <>
        <div className="py-32 w-full text-center">
          <h1 className="text-4xl">No Product Found!</h1>
        </div>
      </>
    )
  }


  if (cartData?.includes(product.id)) {
    isAdded = true;
  }
  else {
    isAdded = false;
  }

  wishData?.map((item) => {
    if (item.id === product.id) {
      isWishAdded = true;
    }
  })


  const addToCart = (product) => {
    if (isAdded) {
      alert("Already added to cart!");
    }
    else {
      if (isLogin) {
        dispatch(addItems(product))
        navigator(`/cart/${JSON.parse(sessionStorage.getItem('userInfo'))?.uid}`)
      }
      else {
        alert('Please Login First!')
        navigator('/login')
      }
    }

  }

  const addToWish = (product) => {
    if (isWishAdded) {
      alert('The item is already added to your wishlist!')
    }
    else {
      if (isLogin) {
        dispatch(addWish(product))
        navigator(`/wishlist/${JSON.parse(sessionStorage.getItem('userInfo'))?.uid}`)
      }
      else {
        alert("Please Login Firs!")
        navigator('/login')
      }
    }
  }

  const handleOrder = (product) => {
    product =  ({...product, qty: 1, disPrice: product.price})
    sessionStorage.setItem('orderData', JSON.stringify([product]))
    navigator('/order')
  }

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <div className="flex flex-col items-center">
            <img src={product?.image} className="max-w-[400px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <h2 className="text-xl text-gray-500 capitalize">{product.category}</h2>
          <p className="text-gray-700 text-lg">{product?.description}</p>
          <p className="text-2xl font-semibold">${product?.price.toFixed(2)}</p>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <button className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600 transition flex-1 min-w-[150px]" onClick={() => addToWish(product)}>Add To Wishlist</button>
            <button className={`${isAdded ? "bg-gray-300" : "bg-blue-400"} text-white px-4 py-2 rounded ${isAdded ? "hover:bg-gray-300" : "hover:bg-blue-600"} transition flex-1 min-w-[150px]`} onClick={() => addToCart(product)}>{isAdded ? "Added To Cart" : "Add To Cart"}</button>
          </div>
          <div>
            <button className="w-full bg-gradient-to-r hover:bg-gradient-to-l from-blue-400 to-green-400  text-white rounded-md py-2" onClick={() => handleOrder(product)}>Order</button>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="sm:flex justify-between items-center">
              <p className="text-3xl text-orange-500">
                {'★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate))}
                <span className="text-gray-500 text-xl mx-5">{product.rating.rate}</span>
              </p>
              <p className="text-xl text-gray-500 sm:mt-0 mt-5">
                {product.rating.count} ratings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
