// path: src/utils/logger.ts

/**
 * Logger utility for consistent console output with timestamps
 * Provides methods for info, warn, error, and debug logging
 */
class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Log info level message
   * @param message - Message to log
   */
  info(message: string): void {
    console.log(`[${this.getTimestamp()}] [INFO] ${message}`);
  }

  /**
   * Log warning level message
   * @param message - Message to log
   */
  warn(message: string): void {
    console.warn(`[${this.getTimestamp()}] [WARN] ${message}`);
  }

  /**
   * Log error level message
   * @param message - Message to log
   * @param error - Optional error object
   */
  error(message: string, error?: Error): void {
    console.error(`[${this.getTimestamp()}] [ERROR] ${message}`);
    if (error) {
      console.error(error.stack);
    }
  }

  /**
   * Log debug level message
   * @param message - Message to log
   */
  debug(message: string): void {
    if (process.env.DEBUG) {
      console.debug(`[${this.getTimestamp()}] [DEBUG] ${message}`);
    }
  }
}

export default new Logger();
