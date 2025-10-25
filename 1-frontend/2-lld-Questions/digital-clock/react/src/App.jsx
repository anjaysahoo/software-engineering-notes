import {useEffect, useState } from 'react';
import "./App.css";

function getDigitHtml(config) {
    return (
        <div className="digit">
            <div className="digitTop">
                <div
                    style={{"opacity" : config[0] ? 1 : 0}}
                    className="digit1 horizontal"
                ></div>
            </div>
            <div className="gap digitTopMiddle">
                <div
                    style={{"opacity" : config[1] ? 1 : 0}}
                    className="digit2 vertical"
                ></div>
                <div
                    style={{"opacity" : config[2] ? 1 : 0}}
                    className="digit3 vertical"
                ></div>
            </div>
            <div className="digitMiddle">
                <div
                    style={{"opacity" : config[3] ? 1 : 0}}
                    className="digit4 horizontal"
                ></div>
            </div>
            <div className="gap digitBottomMiddle">
                <div
                    style={{"opacity" : config[4] ? 1 : 0}}
                    className="digit5 vertical"
                ></div>
                <div
                    style={{"opacity" : config[5] ? 1 : 0}}
                    className="digit6 vertical"
                ></div>
            </div>
            <div className="digitBottom">
                <div
                    style={{"opacity" : config[6] ? 1 : 0}}
                    className="digit7 horizontal"
                ></div>
            </div>
        </div>
    )
}

function getDigit(value) {
    switch(value) {
        case 0:
        {return getDigitHtml([true, true, true, false, true, true, true]);}
        case 1:
        {return getDigitHtml([false, false, true, false, false, true, false]);}
        case 2:
        {return getDigitHtml([true, false, true, true, true, false, true]);}
        case 3:
        {return getDigitHtml([true, false, true, true, false, true, true]);}
        case 4:
        {return getDigitHtml([false, true, true, true, false, true, false]);}
        case 5:
        {return getDigitHtml([true, true, false, true, false, true, true]);}
        case 6:
        {return getDigitHtml([true, true, false, true, true, true, true]);}
        case 7:
        {return getDigitHtml([true, false, true, false, false, true, false]);}
        case 8:
        {return getDigitHtml([true, true, true, true, true, true, true]);}
        case 9:
        {return getDigitHtml([true, true, true, true, false, true, true]);}
        default:
        {return getDigitHtml([true, true, true, false, true, true, true]);}
    }
}

export default function Clock() {

    const [firstDigit, setFirstDigit] = useState(0);
    const [secondDigit, setSecondDigit] = useState(0);
    const [thirdDigit, setThirdDigit] = useState(0);
    const [fourthDigit, setFourthDigit] = useState(0);
    const [fifthDigit, setFifthDigit] = useState(0);
    const [sixthDigit, setSixthDigit] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const first = Math.floor((new Date().getHours()) / 10);
            const second = (new Date().getHours()) % 10;

            const third = Math.floor((new Date().getMinutes()) / 10);
            const fourth = (new Date().getMinutes()) % 10;

            const fifth = Math.floor((new Date().getSeconds()) / 10);
            const sixth = (new Date().getSeconds()) % 10;

            setFirstDigit(first);
            setSecondDigit(second);

            setThirdDigit(third);
            setFourthDigit(fourth);

            setFifthDigit(fifth);
            setSixthDigit(sixth);

            console.log("sixth : " + sixth);
            /**
             * Here we need to use 1000ms in timeout because anything less
             * will not set timeout function again as `sixthDigit` change only after 1s, hence
             * UI won't update after 1s
             */
        }, 1000)
    }, [sixthDigit])

    return (
        <>
            <div className="time">
                {getDigit(firstDigit)} {getDigit(secondDigit)} :
                {getDigit(thirdDigit)} {getDigit(fourthDigit)} :
                {getDigit(fifthDigit)} {getDigit(sixthDigit)}
            </div>
        </>
    )
}
