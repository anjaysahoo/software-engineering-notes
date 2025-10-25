export function unflattenObject(obj) {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      
      // If it's the last key, set the value
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        // Create nested object if doesn't exist
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
} 