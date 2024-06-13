import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from './assets/components/Footer'

const Root = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root;