export function simulateBallCollisions(speeds) {
  const stack = [];
  
  for (let i = 0; i < speeds.length; i++) {
    const currentSpeed = speeds[i];
    let shouldAdd = true;
    
    while (stack.length > 0 && currentSpeed < 0 && stack[stack.length - 1] > 0) {
      // Collision occurs
      const topSpeed = Math.abs(stack[stack.length - 1]);
      const currentAbsSpeed = Math.abs(currentSpeed);
      
      if (topSpeed === currentAbsSpeed) {
        stack.pop(); // Both balls destroy each other
        shouldAdd = false;
        break;
      } else if (topSpeed > currentAbsSpeed) {
        // Top ball survives, current ball is destroyed
        shouldAdd = false;
        break;
      } else {
        // Current ball survives, remove top ball and continue checking
        stack.pop();
      }
    }
    
    if (shouldAdd) {
      stack.push(currentSpeed);
    }
  }
  
  return stack;
} 
