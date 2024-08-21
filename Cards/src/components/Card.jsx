import React, { useState, useEffect } from "react";

const Card = ({ img, text, state, degree }) => {

    console.log(state)
    const [position, setPosition] = useState(state);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [rotate, setRotate] = useState(degree)

    const onMouseDown = (e) => {
        // Only start dragging if it's a left-click
        if (e.button !== 0) return;
    
        setDragging(true);
        // Calculate the offset of the cursor inside the card
        setOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      };
    
      const onMouseMove = (e) => {
        if (dragging) {
          setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
          });
        }
      };
    
      const onMouseUp = () => {
        setDragging(false);
      };

      useEffect(() => {
        // Add and remove event listeners for dragging
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
      }, [dragging]);
      
    return (
        <>
            <div className={`w-[400px] absolute bg-gray-100 p-5 shadow-md bg-[url(images/paper.png)] flex flex-col justify-center items-center select-none`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${degree}deg)`,
                    cursor: dragging ? "grabbing" : "grab",
                }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            >
                <h1 className="text-[#1D3557] text-4xl text-center">{text}</h1>
                <img src={img} className="w-full aspect-square mt-5" draggable="false" />
            </div>
        </>
    )
}


export default Card