## `useThrottleHook` 

```jsx
const useThrottle = (value, delay) => {
    const [throttledValue, setThrottledValue] = useState(value);

    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            const now = Date.now();
            const timeElapsed = now - lastExecuted.current;

            if (timeElapsed >= delay) {
                setThrottledValue(value);
                lastExecuted.current = now;
            }
        }, delay - (Date.now() - lastExecuted.current));

        return () => {
            clearTimeout(handler);
        };
    }, [delay, value]);

    return throttledValue;
};

export default useThrottle;

```

Referred Video: https://youtu.be/VDKMODA168A?si=MLb7WP9ysgFJ5a2A
Github: https://github.com/piyush-eon/frontend-interview-questions/tree/master/reactjs-interview-questions/use-throttle-custom-hook
