import {useState, useEffect} from 'react';

export default function StarRating({filledCount, maxCount}) {

    const FILLED_STAR_CLASS = " star-icon-filled";
    const UNFILLED_STAR_CLASS = " star-icon";
    let [currentFilledCount, setCurrentFilledCount] = useState(filledCount);
    const [starList, setStarList] = useState([]);

    const getCustomStar = (starClass) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class={starClass}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        );
    }

    const handleClick = (filledCountParam) => {
        console.log("Before currentFilledCount : " + currentFilledCount);
        setCurrentFilledCount(filledCountParam);
        console.log("After currentFilledCount : " + currentFilledCount);
        highlightStar(currentFilledCount, maxCount);
    }

    const handleMouseOver = (filledCountParam) => {
        highlightStar(filledCountParam, maxCount);
    }

    const handleMouseOut = () => {
        console.log("handleMouseOut currentFilledCount : " + currentFilledCount);
        highlightStar(currentFilledCount, maxCount);
    }


    const highlightStar = (filledCountParam, maxCountParam) => {
        let tempStar = [];
        for(let i = 0; i < maxCountParam; i++){
            if(i < filledCountParam){
                tempStar.push( getCustomStar(UNFILLED_STAR_CLASS + " " + FILLED_STAR_CLASS))
            }
            else{
                tempStar.push( getCustomStar(UNFILLED_STAR_CLASS ))
            }
        }

        setStarList(tempStar);
    }

    useEffect(() => {
        highlightStar(filledCount, maxCount);
    },[])

    return (
        <div id="star">
            {starList.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseOut={() => handleMouseOut(index + 1)}
                >{item}</div>
            ))}
        </div>
    );
}
