// path: src/utils/envHelper.ts

/**
 * Test user credentials for application testing
 * All users share the same password
 */
const Users = {
  STANDARD_USER: 'standard_user',
  LOCKED_OUT_USER: 'locked_out_user',
  PROBLEM_USER: 'problem_user',
  PERFORMANCE_GLITCH_USER: 'performance_glitch_user',
  ERROR_USER: 'error_user',
  VISUAL_USER: 'visual_user',
} as const;

/**
 * Test user password (same for all test accounts)
 */
const TEST_PASSWORD = 'secret_sauce';

/**
 * Environment helper utility for managing environment variables
 * Provides typed access to configuration values with defaults
 */
class EnvHelper {
  /**
   * Get base URL for test environment
   * @returns Base URL string
   */
  getBaseUrl(): string {
    return process.env.BASE_URL || 'https://www.saucedemo.com/';
  }
}

export default new EnvHelper();
export { Users, TEST_PASSWORD };
