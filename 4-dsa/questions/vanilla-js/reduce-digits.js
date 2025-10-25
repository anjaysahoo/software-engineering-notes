export function reduceDigits(str) {
  if (!str) return '';
  
  let result = '';
  let count = 1;
  let i = 0;
  
  while (i < str.length) {
    // Count consecutive same digits
    while (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
      i++;
    }
    
    // Add count if more than 1, then add digit
    if (count > 1) {
      result += count;
    }
    result += str[i];
    
    // Reset for next sequence
    count = 1;
    i++;
  }
  
  return result;
} 