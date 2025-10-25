"use client";

import { useState, useEffect} from 'react';

function ProgressBar() {
    const [startTransition, setStartTransition] = useState(false);

    useEffect(() => {
        if (!startTransition) {
            setStartTransition(true);
        }
    }, [startTransition]);

    return (
        <div className="progress">
            <div className={['fill', startTransition && 'filled'].filter(Boolean).join(" ")}></div>
        </div>
    );

}

export default function Home() {
    const [progressBarList, setProgressBarList] = useState([]);

    const addProgressBar = () => {
        const newProgressBarList = [...progressBarList, <ProgressBar/>];
        setProgressBarList(newProgressBarList);
    }

    return (
        <div className="main">
            <div>
                <button onClick={addProgressBar} >Add</button>
            </div>
            <div className="progress-bar-list">
                {
                    progressBarList.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        )
                    )
                }
            </div>
        </div>
    );
}
