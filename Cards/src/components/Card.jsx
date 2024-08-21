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
        <div className="group w-full h-[400px] mt-5 border-8 border-red-500 flex justify-center items-center relative">
          <img src={img} className="w-full h-full" draggable="false" />
          <div className="w-3/4 bg-white px-3 py-2 text-center text-[#1D3557] rounded-sm absolute shadow-2xl -rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-2xl">Sunday, July </span>
            <span className="text-xl">03 2024</span>
          </div>
        </div>
      </div>
    </>
  )
}


export default Card