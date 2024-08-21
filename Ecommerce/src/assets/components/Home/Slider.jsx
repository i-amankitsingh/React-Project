import React from "react";
import { Link } from "react-router-dom";

const Slider = () => {
    return (
        <>
            <section className="w-full md:flex items-center p-10 relative">
                <div className="">
                    <strong className="text-4xl">Discover Your Style</strong>
                    <p className="tracking-wider my-5 md:w-3/4">
                        Find the latest trends in fashion and enjoy exclusive discounts on your favorite items. Shop now and elevate your wardrobe with our curated collections.
                    </p>
                    <Link to='/shop'>
                        <button className="border border-1 border-green-400 px-7 py-3 rounded-sm bg-green-500 font-semibold text-white cursor-pointer hover:bg-green-700">Shop Now</button>
                    </Link>
                </div>
                <div>
                    <img src="/image/hero-bg.avif" className="w-full" />
                </div>
            </section>
        </>
    )
}

export default Slider;