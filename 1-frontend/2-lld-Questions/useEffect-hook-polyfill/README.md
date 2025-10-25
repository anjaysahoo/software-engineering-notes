## `useEffect` Hook Polyfill
1. 
```jsx
useEffect(() => {
    // your code
    
    return () => {
        console.log("cleanup invoked")
    }
}, [count]);
```
- Here return is invoked when component unmounts
- Also when count changes

https://youtu.be/tNQuUgmv1Fs?si=B6zYAgqghKk6xMkq&t=595

2. Custom `useEffect` Hook
- First Render
- Deps Changes and No Deps Array
```jsx
import {useRef} from "react";

const useCustomEffect = (effect, deps) => {
    const isFirstRender = useRef(true);
    const prevDeps = useRef([]);

    // First Render
    if (isFirstRender.current) {
        isFirstRender.current = false;
        effect();
        return;
    }

    // Deps Changes and No Deps Array
    const depsChanged = deps
        ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
        : true;

    if (depsChanged) {
        effect();
    }
};

export default useCustomEffect;
```


3. Custom `useEffect` Hook
- With cleanup implementation

```jsx
import {useRef} from "react";

const useCustomEffect = (effect, deps) => {
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);

  // First Render
  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // Deps Changes and No Deps Array
  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (depsChanged) {
    const cleanup = effect();
    // Cleanup
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }

  prevDeps.current = deps || [];
};

export default useCustomEffect;
```
https://youtu.be/tNQuUgmv1Fs?si=Oa0dsJ4ogn2Xywb1&t=1082

- Here we won't be able to handle unmounted scenario because
React does with it own algo 

Referred Video: https://youtu.be/tNQuUgmv1Fs?si=NH0ZUb8c4dseHhz4
Github Repo: https://github.com/piyush-eon/frontend-interview-questions/tree/master/reactjs-interview-questions/use-effect-hook-polyfill

