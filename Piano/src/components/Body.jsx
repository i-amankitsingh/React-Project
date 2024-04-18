import React, { useState } from "react";
import WhiteKay from "./WhiteKey"
import BlackKey from "./BlackKey";



const Body = () => {
    let soundData = []
    let soundData2 = []
    for (let i = 0; i < 10; i++) {
        if (i < 7) {
            soundData.push({ 'key': 'A', 'sound': 'A' + i })
        }
        else {
            soundData.push({ 'key': 'B', 'sound': 'B' + (i - 7) });
        }
    }
    console.log(soundData)

    for(let i = 1; i <= 7; i++){
        if(i <= 4){
            soundData2.push({ 'key': 'C', 'sound': 'C' + i })
        }
        else{
            soundData2.push({ 'key': 'D', 'sound': 'D' + (i - 4) })
        }
    }

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
                            <WhiteKay skey={ele.key} sound={ele.sound} key={ele.sound} showKey={showKeys} volume={volume} />
                        ))
                    }
                    <BlackKey skey='C' sound={soundData2[0].sound} className={`left-[50px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[1].sound} className={`left-[125px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[2].sound} className={`left-[270px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[3].sound} className={`left-[345px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[4].sound} className={`left-[420px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[5].sound} className={`left-[570px]`} showKey={showKeys} volume={volume} />
                    <BlackKey skey='C' sound={soundData2[6].sound} className={`left-[640px]`} showKey={showKeys} volume={volume} />
                </div>
            </div>
        </>
    )
}

export default Body