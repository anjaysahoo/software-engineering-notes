// import {useRef} from "react";
//
// function useDebounce(func, wait = 100){
//     const timeoutId = useRef(null);
//
//     function debounce(func, wait){
//         return function(...args){
//             clearTimeout(timeoutId.current);
//
//             timeoutId.current = setTimeout(() => {
//                 return func.apply(this, args)
//             }, wait);
//         }
//     }
//
//     return debounce(func, wait);
// }
//
// export default useDebounce;

import { useCallback, useEffect, useRef } from "react";

function useDebounce(func, wait = 100) {
    const timeoutId = useRef(null);

    const debouncedFunc = useCallback(
        (...args) => {

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                console.log("debounce called")
                func.apply(this, args);
            }, wait);
        },
        [func, wait],
    );


    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    return debouncedFunc;
}

export default useDebounce;
