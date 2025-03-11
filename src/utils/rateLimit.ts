export class RateLimit {
  private static requests: { [key: string]: number[] } = {};
  private static limit = 50; // requests per minute
  private static interval = 60 * 1000; // 1 minute in milliseconds

  static async check(ip: string): Promise<boolean> {
    const now = Date.now();
    const userRequests = this.requests[ip] || [];
    
    // Remove requests older than the interval
    const recentRequests = userRequests.filter(time => now - time < this.interval);
    
    // Update requests for this IP
    this.requests[ip] = recentRequests;

    // Check if user has exceeded limit
    if (recentRequests.length >= this.limit) {
      return false;
    }

    // Add current request
    this.requests[ip].push(now);
    return true;
  }
} 