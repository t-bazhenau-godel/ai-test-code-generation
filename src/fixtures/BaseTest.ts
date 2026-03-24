import { test as baseTest, expect } from '@playwright/test';

/**
 * Extended Playwright test fixture
 * Provides base test setup with page fixture
 */
export const test = baseTest;
export { expect };
