// path: src/pages/BasePage.ts

import { Page, Locator } from '@playwright/test';
import { WaitStrategies } from '@utils/waitStrategies';
import logger from '@utils/logger';

/**
 * Base page class for Page Object Model pattern
 * Provides common navigation, wait, and utility methods for all page objects
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for page to load (network idle)
   */
  async waitForPageLoad(): Promise<void> {
    logger.debug('Waiting for page to load');
    await WaitStrategies.waitForPageLoad(this.page);
  }

  /**
   * Fill a field with a value
   * @param locator - Locator element
   * @param value - Value to fill
   * @param fieldName - Name of the field for logging
   */
  async fill(locator: Locator, value: string, fieldName: string): Promise<void> {
    logger.info(`Filling ${fieldName} with value: ${value}`);
    await locator.fill(value);
  }

  /**
   * Click an element
   * @param locator - Locator element
   * @param elementName - Name of the element for logging
   */
  async click(locator: Locator, elementName: string): Promise<void> {
    logger.info(`Clicking ${elementName}`);
    await locator.click();
  }
}
