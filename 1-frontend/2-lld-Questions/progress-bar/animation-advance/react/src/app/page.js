"use client";

import { useState, useEffect } from "react";

function ProgressBar({index, currentPos, updateCurrentPos}){
    // console.log("index : " + index);

    const [startTransition, setStartTransition] = useState(false);

    /**
     1. We need to use `currentPos` in `useEffect` since
     `currentPos` is updated in `updateCurrentPos` function
     which help us check if `index` is greater than `currentPos`
     whenever `currentPos` is updated
     **/
    useEffect(() => {
        /**Using `startTransition` here is imp since without it
        we will keep increasing `currentPos` infinitely
        **/
        if(index > currentPos || startTransition){
            return
        }
        setStartTransition(true);

        setTimeout(() => {
            updateCurrentPos();
            // console.log("currentPos : " + currentPos)
        }, 2000)

    }, [currentPos])



    return (
        <div className="bar">
            <div
                className="fill"
                style={{transform: startTransition ? "scaleX(1)" : "scaleX(0)"}}
            >
                {index}
            </div>
        </div>
    )
}

export default function App() {
    const [count, setCount] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);

    return (
        <div>
            <button onClick={() => {setCount(count + 1)}}>Add</button>
            <div className="list">
                {
                    Array(count).fill(null).map((_, index) => (
                        <ProgressBar
                            key={index}
                            index={index}
                            currentPos={currentPos}
                            updateCurrentPos = {() => {
                                setCurrentPos(currentPos + 1);
                            }} />
                    ))

                }
            </div>
            <div>
                {currentPos}
            </div>
        </div>
    );
}

