export function compose(...fns) {
  return (...args) => {
    // Start with the rightmost function and its arguments
    let result = fns[fns.length - 1](...args);
    
    // Execute remaining functions from right to left
    for (let i = fns.length - 2; i >= 0; i--) {
      result = fns[i](result);
    }
    
    return result;
  };
}

// Example functions
export const mul = (a, b) => a * b;
export const div = (x) => x / 2;
export const sub = (y) => y - 3;
export const sum = (z) => z + 5; 