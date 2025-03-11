interface CacheEntry {
  response: string;
  timestamp: number;
}

export class ResponseCache {
  private static cache: { [key: string]: CacheEntry } = {};
  private static TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  static get(key: string): string | null {
    const entry = this.cache[key];
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.TTL) {
      delete this.cache[key];
      return null;
    }

    return entry.response;
  }

  static set(key: string, response: string): void {
    this.cache[key] = {
      response,
      timestamp: Date.now()
    };

    // Clean up old entries if cache gets too large
    if (Object.keys(this.cache).length > 1000) {
      this.cleanup();
    }
  }

  private static cleanup(): void {
    const now = Date.now();
    Object.entries(this.cache).forEach(([key, entry]) => {
      if (now - entry.timestamp > this.TTL) {
        delete this.cache[key];
      }
    });
  }
} 