import React, { useEffect, useState } from "react";
import Logo from '/image/logo.png';
import { Link, NavLink } from "react-router-dom";
import WishlistIcon from '/icon/favorite.png';
import CartIcon from '/icon/shopping-cart.png';
import MyAccount from "./MyAccount";
import { useSelector } from "react-redux";

const Navbar = () => {

    const [nav, setNav] = useState(false)
    const isLogin = useSelector(state => state.authSlice.isLoggedIn)
    const [cartItemCount, setCartItemCount] = useState(0)
    const [wishlistItemCount, setWishlistItemCount] = useState(0)
    const cartItems = useSelector(state => state.cartSlice.cartItem)
    const wishlistItem = useSelector(state => state.wishlistSlice.wish)
    const [userId, setUserId] = useState(null)
    
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userInfo'))
        setUserId(userData?.uid)
        
    }, [])
    
    useEffect(() => {
        setCartItemCount(cartItems? cartItems.length : 0)
        setWishlistItemCount(wishlistItem? wishlistItem.length : 0)
    }, [cartItems, wishlistItem]) 

    return (
        <>
            <nav className="w-full px-5 bg-white flex md:justify-start justify-between items-center sticky top-0 z-10 shadow-md">
                <div className="flex items-center w-1/4">
                    <img src={Logo} className="w-20" />
                    {/* <span className="text-2xl text-green-400">Logo</span> */}
                </div>
                <div className={`md:static absolute bg-white top-0 md:w-auto w-[250px] md:h-auto h-screen md:flex justify-around flex-1 md:px-0 px-3 ${nav ? 'left-0' : 'left-[-250px]'} transition-all duration-200`}>
                    <ul className="md:flex">
                        <li>
                            <NavLink 
                                to="/"
                                className={({isActive}) => `${isActive? "text-green-400" : "text-gray-500"} text-lg cursor-pointer block px-3 py-2 hover:text-green-300 transition-colors duration-100` }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about"
                                className={({isActive}) => `${isActive? "text-green-400" : "text-gray-500"} text-lg cursor-pointer block px-3 py-2 hover:text-green-300 transition-colors duration-100`}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/shop"
                                className={({isActive}) => `${isActive? "text-green-400" : "text-gray-500"} text-lg cursor-pointer block px-3 py-2 hover:text-green-300 transition-colors duration-100`}
                            >
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/sale"
                                className={({isActive}) => `${isActive? "text-green-400" : "text-gray-500"} text-lg cursor-pointer block px-3 py-2 hover:text-green-300 transition-colors duration-100`}
                            >
                                Sale
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contact"
                                className={({isActive}) => `${isActive? "text-green-400" : "text-gray-500"} text-lg cursor-pointer block px-3 py-2 hover:text-green-300 transition-colors duration-100`}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    <div className="flex items-center gap-8 md:mt-0 mt-10">
                    <Link to={isLogin? `/wishlist/${userId}` : `/login`}>
                    <img src={WishlistIcon} className="w-9 cursor-pointer" />
                    {
                      isLogin && <span className="rounded-full bg-green-400 text-white w-6 h-6 grid place-items-center absolute mt-[-45px] ml-[25px]">{wishlistItemCount}</span>
                    }
                    </Link>
                    <Link to={isLogin? `/cart/${userId}` : `/login`}>
                    <img src={CartIcon} className="w-7 cursor-pointer" />
                    {
                        isLogin && <span className="rounded-full bg-green-400 text-white w-6 h-6 grid place-items-center absolute mt-[-38px] ml-[25px]">{cartItemCount}</span>
                    }
                    </Link>
                    {isLogin === true? <MyAccount /> : <Link to='/login'>
                        <button className="bg-green-400 cursor-pointer px-5 py-3 text-white text-semibold rounded-sm hover:bg-green-700">SIGN IN</button>
                    </Link>}
                </div>
                </div>
                
                <i className={`fa ${nav? 'fa-times' : 'fa-bars'} text-2xl cursor-pointer text-black md:hidden`} onClick={() => setNav(nav? false : true)}></i>
            </nav>
        </>
    )
}

export default Navbar;