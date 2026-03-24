// path: src/components/BaseComponent.ts

import { Locator } from '@playwright/test';
import logger from '@utils/logger';

/**
 * Base component class for Component Object Model pattern
 * Provides common interaction methods for reusable UI components
 */
export class BaseComponent {
  protected locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  /**
   * Check if component is visible
   * @returns True if component is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  /**
   * Scroll component into view
   */
  async scrollIntoView(): Promise<void> {
    logger.debug('Scrolling component into view');
    await this.locator.scrollIntoViewIfNeeded();
  }

  /**
   * Perform click action
   */
  async click(): Promise<void> {
    await this.scrollIntoView();
    await this.locator.click();
  }
}
