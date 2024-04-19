import React, { useState } from "react";
import WhiteKay from "./WhiteKey"
import BlackKey from "./BlackKey";



const Body = () => {
    const soundData = ['a','s','d','f','g','h','j','k','l',';'];
    const soundData2 = ['w','e','t','y','u','o','p'];
    

    const [showKeys, setShowKeys] = useState(false)
    const [volume, setVolume] = useState(0.5)

    const changeKeys = (visibilty) => {
        setShowKeys(visibilty)
    }

    const handleVolume = (v) => {
        setVolume(v)
    }
    
    return (
        <>
            <div className="py-[35px] px-[40px] text-white bg-black rounded-lg">
                <div className="flex justify-around">
                    <div className="text-lg">
                        Playable <span className="font-bold">PIANO</span>
                    </div>
                    <div className="flex items-center gap-5">
                        <span>Volume</span>
                        <input 
                         type="range"
                         min='0' 
                         max='1' 
                         value={volume} 
                         step='any'
                         onChange={(e) => handleVolume(e.target.value)}
                         className="cursor-pointer outline-none border-none" />
                    </div>
                    <div className="flex items-center gap-5">
                        <span>Show Keys</span>
                        <input type="checkbox" id="check" onChange={() => changeKeys(!showKeys)} />
                        <label className="switch cursor-pointer" htmlFor="check">

                        </label>
                    </div>
                </div>
                <div className="relative mt-5 flex gap-1">
                    {
                        soundData.map((ele) => (
                            <WhiteKay skey={ele} sound={ele} key={ele} showKey={showKeys} volume={volume} />
                        ))
                    }
                    <BlackKey skey='C' sound={soundData2[0]} className={`left-[50px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[1]} className={`left-[125px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[2]} className={`left-[270px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[3]} className={`left-[345px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[4]} className={`left-[420px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[5]} className={`left-[570px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[6]} className={`left-[640px]`} showKey={showKeys} volume={volume} />
                </div>
            </div>
        </>
    )
}

export default Body