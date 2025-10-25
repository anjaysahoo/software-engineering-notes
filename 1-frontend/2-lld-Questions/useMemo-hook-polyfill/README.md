## `useMemo()` Hook Polyfill

1. Refer this video & repo for in depth understanding 
of `useMemo()` hook

- Video: https://youtu.be/THL1OPn72vo?si=SpAAottNHlGRoDAe
- Video Summary:  https://github.com/anjaysahoo/frontend-machine-coding-lld/tree/main/important-concept/react/react-hooks

2. 
```jsx
import { useRef, useEffect } from "react";

const areEqual = (prevDeps, nextDeps) => {
  if (prevDeps === null) return false;
  if (prevDeps.length !== nextDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) {
      return false;
    }
  }

  return true;
};

const useCustomMemo = (cb, deps) => {
  // variable or state -> cached Value
  const memoizedRef = useRef(null);

  // Changes in deps
  if (!memoizedRef.current || !areEqual(memoizedRef.current.deps, deps)) {
    memoizedRef.current = {
      value: cb(),
      deps
    };
  }

  // cleanup logic
   /**
    * Whenever the component unmounts this cleanup function will run
    */
  useEffect(() => {
    return () => {
      memoizedRef.current = null;
    };
  }, []);

  // return the memoised value (if any)
  return memoizedRef.current.value;
};

export default useCustomMemo;
```

Referred Video: https://youtu.be/2fEW-5ZyQMc?si=3lU7MCy8iO18U3Me
Github Repo: https://github.com/piyush-eon/frontend-interview-questions/tree/master/reactjs-interview-questions/use-memo-hook-polyfill
