import { useState } from 'react'
import './App.css'
import useDebounce from "./hooks/use-debounce.js";
import useThrottle from "./hooks/use-throttle.js";

function App()  {
    const [inputText, setInputText] = useState(""); // State to store the input text
    const debounceDelay = 1000; // Delay for debouncing
    const throttleDelay = 1000; // Delay for throttling
    const debouncedText = useDebounce(inputText, debounceDelay); // Apply debounce custom hook
    const throttledText = useThrottle(inputText, throttleDelay); // Apply throttle custom hook
    // Event handler to update the input text
    const handleChange = (e) => {
        setInputText(e.target.value);
    };
    return (
        <>
            <input
                type="text"
                placeholder="Type something..."
                value={inputText} // Use 'value' to display the input text
                onChange={handleChange} // Call handleChange on input change
            />
            <p>Default: {inputText}</p>
            <p>Debounced: {debouncedText}</p>
            <p>Throttled: {throttledText}</p>
        </>
    );
};

export default App
