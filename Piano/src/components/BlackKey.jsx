import React from "react";

const BlackKey = ({skey, sound, className, showKey, volume}) => {
    function playAudio(target){
        const audio = new Audio(`src/assets/sound/${sound}.wav`)
        audio.volume = volume
        audio.play()
        target.classList.add('active')
        setTimeout(()=>{
            target.classList.remove('active')
        }, 150)
    }
    
    return (
        <>
            <div className={`black-key w-[44px] h-[140px] rounded-bl-md rounded-br-md flex justify-center items-end text-gray-500 pb-5 cursor-pointer select-none absolute top-0 left-12 uppercase ${className}`} onClick={(e) => playAudio(e.target)}>
                {showKey && sound}
            </div>
        </>
    )
}

export default BlackKey