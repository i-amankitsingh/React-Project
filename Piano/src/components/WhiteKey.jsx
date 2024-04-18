import React from "react";

const WhiteKey = ({skey, sound, showKey, volume}) => {
    function playAudio(target){
        const audio = new Audio(`src/assets/sound/${sound}.mp3`)
        audio.volume = volume
        audio.play()
        target.classList.add('active')
        setTimeout(()=>{
            target.classList.remove('active')
        }, 150)
    }
    
    return (
        <>
            <div className="white-key w-[70px] h-[230px] rounded-md flex justify-center items-end text-black pb-5 cursor-pointer select-none" onClick={(e) => playAudio(e.target)}>
                {showKey && sound}
            </div>
        </>
    )
}

export default WhiteKey