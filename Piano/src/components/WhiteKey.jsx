import React from "react";

const WhiteKey = ({ skey, sound, showKey, volume }) => {
    function playAudio(target) {
        const audio = new Audio(`src/assets/sound/${sound}.wav`)
        audio.volume = volume
        audio.play()
        target.classList.add('active')
        setTimeout(() => {
            target.classList.remove('active')
        }, 150)
    }

    // window.addEventListener("keypress", (e) => {
    //     try {
    //         console.log(e.key)
    //         const audio = new Audio(`src/assets/sound/${e.key}.wav`)
    //         if(!audio){
    //             throw "Please Press Correct Key"
    //         }
    //         console.log(audio)
    //         audio.volume = volume
    //         audio.play()
    //         e.target.classList.add('active')
    //         setTimeout(() => {
    //             e.target.classList.remove('active')
    //         }, 150)
    //     }
    //     catch(err) {
    //         alert(err);
    //     }
    // })

    return (
        <>
            <div className="white-key w-[70px] h-[230px] rounded-md flex justify-center items-end text-black pb-5 cursor-pointer select-none uppercase" onClick={(e) => playAudio(e.target)}>
                {showKey && sound}
            </div>
        </>
    )
}

export default WhiteKey