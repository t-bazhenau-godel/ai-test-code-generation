// path: src/utils/waitStrategies.ts

import { Locator, Page } from '@playwright/test';
import logger from './logger';

/**
 * Wait strategies for different scenarios
 * Provides flexible waiting mechanisms with specific timeouts for different elements
 */
export class WaitStrategies {
  private static readonly DEFAULT_TIMEOUT = 5000;
  private static readonly NETWORK_TIMEOUT = 10000;
  private static readonly QUICK_TIMEOUT = 2000;

  /**
   * Wait for element visibility
   * @param locator - Element to wait for
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async waitForElement(
    locator: Locator,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<void> {
    logger.debug(`Waiting for element with timeout: ${timeout}ms`);
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param locator - Element to wait for
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async waitForElementHidden(
    locator: Locator,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<void> {
    logger.debug(`Waiting for element to be hidden with timeout: ${timeout}ms`);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for page navigation
   * @param page - Page object
   * @param pattern - URL pattern to match
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async waitForNavigation(
    page: Page,
    pattern: RegExp,
    timeout: number = this.NETWORK_TIMEOUT
  ): Promise<void> {
    logger.debug(`Waiting for navigation to URL matching: ${pattern}`);
    await page.waitForURL(pattern, { timeout });
  }

  /**
   * Wait for page load (network idle)
   * @param page - Page object
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async waitForPageLoad(
    page: Page,
    timeout: number = this.NETWORK_TIMEOUT
  ): Promise<void> {
    logger.debug(`Waiting for page to load with timeout: ${timeout}ms`);
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for DOM content loaded
   * @param page - Page object
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async waitForDOMReady(
    page: Page,
    timeout: number = this.QUICK_TIMEOUT
  ): Promise<void> {
    logger.debug(`Waiting for DOM to be ready with timeout: ${timeout}ms`);
    await page.waitForLoadState('domcontentloaded', { timeout });
  }

  /**
   * Quick wait for element (reduced timeout for responsive apps)
   * @param locator - Element to wait for
   * @param timeout - Optional custom timeout in milliseconds
   */
  static async quickWait(
    locator: Locator,
    timeout: number = this.QUICK_TIMEOUT
  ): Promise<void> {
    logger.debug(`Quick wait for element with timeout: ${timeout}ms`);
    await locator.waitFor({ state: 'visible', timeout });
  }
}
