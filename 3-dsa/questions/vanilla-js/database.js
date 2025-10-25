export class Database {
  constructor() {
    this.records = new Map();
    this.ttls = new Map(); // Map<key, Map<field, expirationTime>>
    this.history = new Map(); // Map<key, Map<field, Array<{timestamp, value, ttl}>>>
  }

  // Helper to check if a field has expired
  isExpired(timestamp, key, field) {
    if (!this.ttls.has(key)) return false;
    const fieldTTLs = this.ttls.get(key);
    if (!fieldTTLs.has(field)) return false;
    return timestamp >= fieldTTLs.get(field);
  }

  // Helper to clean expired fields
  cleanExpired(timestamp, key, field) {
    if (this.isExpired(timestamp, key, field)) {
      this.records.get(key).delete(field);
      this.ttls.get(key).delete(field);
      return true;
    }
    return false;
  }

  // Add to history helper
  addToHistory(timestamp, key, field, value, ttl = Infinity) {
    if (!this.history.has(key)) {
      this.history.set(key, new Map());
    }
    if (!this.history.get(key).has(field)) {
      this.history.get(key).set(field, []);
    }
    this.history.get(key).get(field).push({ timestamp, value, ttl });
  }

  set(timestamp, key, field, value) {
    if (!this.records.has(key)) {
      this.records.set(key, new Map());
    }
    // Remove any TTL when using regular set
    if (this.ttls.has(key)) {
      this.ttls.get(key).delete(field);
    }
    this.records.get(key).set(field, value);
    this.addToHistory(timestamp, key, field, value);
  }

  compareAndSet(timestamp, key, field, expectedValue, newValue) {
    if (!this.records.has(key)) return false;
    const record = this.records.get(key);
    
    // Add TTL check before comparison
    if (this.cleanExpired(timestamp, key, field)) return false;
    
    if (!record.has(field) || record.get(field) !== expectedValue) return false;
    
    record.set(field, newValue);
    return true;
  }

  compareAndDelete(timestamp, key, field, expectedValue) {
    if (!this.records.has(key)) return false;
    const record = this.records.get(key);
    
    // Add TTL check before comparison
    if (this.cleanExpired(timestamp, key, field)) return false;
    
    if (!record.has(field) || record.get(field) !== expectedValue) return false;

    record.delete(field);
    return true;
  }

  setWithTTL(timestamp, key, field, value, ttl) {
    // Initialize both records and ttls maps if key doesn't exist
    if (!this.records.has(key)) {
      this.records.set(key, new Map());
    }
    if (!this.ttls.has(key)) {
      this.ttls.set(key, new Map());
    }

    // Clean any existing expired fields first
    this.cleanExpired(timestamp, key, field);

    // Now safely set both value and TTL
    this.records.get(key).set(field, value);
    this.ttls.get(key).set(field, timestamp + ttl);
    this.addToHistory(timestamp, key, field, value, timestamp + ttl);
  }

  compareAndSetWithTTL(timestamp, key, field, expectedValue, newValue, ttl) {
    if (!this.records.has(key)) return false;
    const record = this.records.get(key);
    
    // Check TTL before comparison
    if (this.cleanExpired(timestamp, key, field)) return false;
    
    if (!record.has(field) || record.get(field) !== expectedValue) return false;

    record.set(field, newValue);
    if (!this.ttls.has(key)) {
      this.ttls.set(key, new Map());
    }
    this.ttls.get(key).set(field, timestamp + ttl);
    this.addToHistory(timestamp, key, field, newValue, timestamp + ttl);
    return true;
  }

  // Override existing methods to handle TTL
  get(timestamp, key, field) {
    if (!this.records.has(key)) return null;
    if (this.cleanExpired(timestamp, key, field)) return null;
    const record = this.records.get(key);
    return record.has(field) ? record.get(field) : null;
  }

  scan(timestamp, key) {
    if (!this.records.has(key)) return [];
    
    const record = this.records.get(key);
    // Clean expired fields first
    if (this.ttls.has(key)) {
      // Create array to avoid modification during iteration
      const fields = Array.from(record.keys());
      for (const field of fields) {
        this.cleanExpired(timestamp, key, field);
      }
    }
    
    // Return empty if all fields were cleaned
    if (record.size === 0) return [];
    
    return Array.from(record.entries())
      .sort(([field1], [field2]) => field1.localeCompare(field2))
      .map(([field, value]) => `${field}(${value})`);
  }

  scanByPrefix(timestamp, key, prefix) {
    if (!this.records.has(key)) return [];
    
    const record = this.records.get(key);
    // Clean expired fields first
    if (this.ttls.has(key)) {
      for (const [field] of record.entries()) {
        this.cleanExpired(timestamp, key, field);
      }
    }
    
    return Array.from(record.entries())
      .filter(([field]) => field.startsWith(prefix))
      .sort(([field1], [field2]) => field1.localeCompare(field2))
      .map(([field, value]) => `${field}(${value})`);
  }

  getWhen(timestamp, key, field, atTimestamp) {
    if (!this.history.has(key) || !this.history.get(key).has(field)) return null;
    
    const history = this.history.get(key).get(field);
    let value = null;
    
    // Find the most recent value at atTimestamp
    for (let i = history.length - 1; i >= 0; i--) {
      const entry = history[i];
      if (entry.timestamp <= atTimestamp) {
        // Check if the value was still valid at atTimestamp
        if (entry.ttl === Infinity || atTimestamp < entry.ttl) {
          value = entry.value;
        }
        break;
      }
    }
    
    return value;
  }
}

