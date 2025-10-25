// Custom hook for throttling text input
import React, { useState, useEffect, useRef } from "react";

const useThrottle = (text, delay) => {
    // State to store the throttled text
    const [throttledText, setThrottledText] = useState(text);
    const lastExecuted = useRef(Date.now()); // A ref to track the last execution time

    useEffect(() => {
        if (Date.now() - lastExecuted.current >= delay) {
            // If enough time has passed since the last execution, update the throttled text immediately
            lastExecuted.current = Date.now();
            setThrottledText(text);
        } else {
            // Otherwise, create a timer to update the throttled text after the delay
            const throttleTimer = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledText(text);
            }, delay);

            // Cleanup function: Clear the timer if the component unmounts or the input changes
            return () => clearTimeout(throttleTimer);
        }
    }, [text, delay]);

    return throttledText; // Return the throttled text
};

export default useThrottle;
