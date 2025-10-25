import { useState} from "react";

export default function App() {
    const [celsius, setCelsius] = useState();
    const [fahrenheit, setFahrenheit] = useState();

    const handleChange = (event, setInput, setOutput, isItToFahrenheit) => {
        const val = event.target.value;
        setInput(val);

        if(val === "" || (val !== '0' && !Number(val))){
            setOutput("");
        }
        else{
            let updatedValue;

            if(isItToFahrenheit){
                updatedValue = parseFloat((val * 1.8).toFixed(4)) + 32;
            }
            else{
                updatedValue = parseFloat((((val - 32) * 5) / 9).toFixed(4));
            }
            setOutput(updatedValue);
        }
    }

    return <>
        <h1>Temperature Converter</h1>
        <section>
            <input
                type="number"
                onChange={(event) => handleChange(event, setCelsius, setFahrenheit, true)}
                value={celsius}
                id="celsius"
            />
            <label> Celsius</label>


            &nbsp;=&nbsp;
            <input
                type="number"
                onChange={(event) => handleChange(event, setFahrenheit, setCelsius, false)}
                value={fahrenheit}
                id="fahrenheit"
            />
            <label> Fahrenheit</label>
        </section>
    </>;
}
