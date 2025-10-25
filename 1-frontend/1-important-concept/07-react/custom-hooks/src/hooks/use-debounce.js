// Custom hook for debouncing text input
import React, { useState, useEffect } from "react";

const useDebounce = (text, delay) => {

    // State to store the debounced text
    const [debouncedText, setDebouncedText] = useState(text);


    useEffect(() => {
        // Create a timer that will execute the callback after the specified delay
        console.log("use Effect called")
        const debounceTimer = setTimeout(() => {
            setDebouncedText(text); // Update the debounced text with the latest input
        }, delay);

        // Cleanup function: Clear the timer if the component unmounts or the input changes
        return () => {
            console.log("clear timeout")
            clearTimeout(debounceTimer);
        };
    }, [text, delay]);

    console.log("use debounce created")

    return debouncedText; // Return the debounced text
};

export default useDebounce;
