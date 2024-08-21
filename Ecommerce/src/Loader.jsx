import React, {useEffect} from "react";

const Loader = ({loadingText, loadingImg, toggle, cls}) => {
    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';
    
        // Re-enable scrolling when the component unmounts
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, []);

      
    return (
        <>
            <div className={`w-full h-full bg-white absolute z-20 p-5 ${cls}`}>
                {toggle? <img src={loadingImg} className="w-36" /> : <span className="text-xl">{loadingText}</span>}
            </div>
        </>
    )
}

export default Loader;