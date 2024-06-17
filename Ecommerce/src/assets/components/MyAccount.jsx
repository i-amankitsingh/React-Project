import React, { useState, useEffect } from "react";
import userIcon from "/icon/user.png"
import { signOutUser } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Functionality/authSlice";
import { onAuthStateChanged } from "../../firebase";
import { auth } from "../../firebase";

const MyAccount = () => {

    
    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate('')
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleSignOut = () => {
        signOutUser()
        sessionStorage.setItem('isLogin', false)
        const isLogin = JSON.parse(sessionStorage.getItem('isLogin'))
        dispatch(logout())
        sessionStorage.removeItem('orderData');
        navigate('/')
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                sessionStorage.setItem('userInfo', JSON.stringify(user))
                // console.log(user);
                setUserDetails(JSON.parse(sessionStorage.getItem('userInfo')))
            }
            else{
                sessionStorage.setItem('userInfo', user)
            }
        }) 

        return () => unsubscribe();
    }, [])

    return (
        <>
            <div className="relative">
                <img src={userDetails.photoURL? userDetails.photoURL : userIcon} className="w-8 cursor-pointer rounded-full" onClick={handleToggle} />
                <div className={`shadow-md w-48 px-5 py-3 absolute  top-14 md:left-[-65px] md:right-auto right-[-30px] bg-white ${toggle? "" : "hidden"}`}>
                    <ul onClick={handleToggle}>
                        <li className="cursor-pointer">{userDetails.displayName}</li>
                        <Link to='/account' className="cursor-pointer">My Account</Link>
                        <li className="cursor-pointer" onClick={handleSignOut}>Log Out</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MyAccount;