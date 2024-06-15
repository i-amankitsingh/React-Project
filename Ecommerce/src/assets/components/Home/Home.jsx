import React, { useEffect, useState } from "react";
import Slider from "./Slider.jsx";
import Ad from "./Ad.jsx"
import Product from "./Product.jsx";
import Chat from "./Chat.jsx";
import Loader from "../../../Loader.jsx";


const Home = () => {

    const [loading, setLoading] = useState(true)

    const handleLoader = () => {
        setLoading(false)
    }


    return (
        <>
            {loading && <Loader loadingImg='/icon/loader.svg' toggle={true} cls="flex justify-center items-center top-0" />}
            <Slider />
            <section className="w-full md:flex justify-center gap-10 md:px-10 px-4 my-10">
                <Ad heading='Unbeatable Discounts on Your Favorite Styles!' imgSrc='image/ad1.jpg' btnBg='bg-blue-400' />
                <Ad heading='Fashion-Forward Clothing for Every Occasion!' imgSrc='image/ad2.jpg' btnBg='bg-green-400' />
            </section>
            {/* <Chat /> */}
            <Product handleParentLoader={handleLoader} />
        </>
    )
}

export default Home;