import {useState, useEffect} from 'react';
import './App.css';

export default function Clock() {
    const [second, setSecond] = useState(0);
    const [min, setMin] = useState(0);
    const [hour, setHour] = useState(0);

    useEffect(() => {

        setTimeout(() => {
            setHour(new Date().getHours());
            setMin(new Date().getMinutes());
            setSecond(new Date().getSeconds());
        }, 1000)

    }, [second])


    return (
        <>
            {hour} : {min} : {second} |||
            {(hour % 12) * 30 + min * 0.6} :
            {min * 6 + second * 0.1} :
            {second * 6}
            <div>Analog clock</div>
            <div className="clock">
                <div
                    style={{"rotate" : `${second * 6}deg`}}
                    className="secondHand"
                >
                    <div className="secondHand-top"></div>
                    <div className="secondHand-bottom"></div>
                </div>
                <div
                    style={{"rotate" : `${min * 6 + second * 0.1}deg`}}
                    className="minHand"
                >
                    <div className="minHand-top"></div>
                    <div className="minHand-bottom"></div>
                </div>
                <div
                    style={{"rotate" : `${(hour % 12) * 30 + min * 0.6}deg`}}
                    className="hourHand"
                >
                    <div className="hourHand-top"></div>
                    <div className="hourHand-bottom"></div>
                </div>
            </div>
        </>
    );
}
