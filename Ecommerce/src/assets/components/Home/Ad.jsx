import React from "react";

const Ad = ({heading, imgSrc, btnBg}) => {
    return (
        <>
            <div className="flex-1 flex md:flex-row flex-col items-center shadow-md pl-5 py-4 rounded-md my-2">
                <div className="md:order-1 order-2">
                    <strong className="text-xl tracking-wider md:inline block">{heading}</strong>
                    <button className={`px-5 py-3 inline-block ${btnBg} text-white my-3 cursor-pointer`}>Shop Now <i className="fa fa-arrow-right text-white ml-2"></i></button>
                </div>
                <img src={imgSrc} className="md:w-[70%] w-full md:order-2 order-1" />
            </div>
        </>
    )
}

export default Ad;