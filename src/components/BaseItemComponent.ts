// path: src/components/BaseItemComponent.ts

import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import logger from '@utils/logger';

/**
 * Base item component for common item operations
 * Provides shared functionality for both inventory and cart items
 */
export abstract class BaseItemComponent extends BaseComponent {
  protected page: Page;

  constructor(page: Page, itemLocator: Locator) {
    super(itemLocator);
    this.page = page;
  }

  /**
   * Get the item name locator - must be implemented by subclasses
   * @returns Locator for item name element
   */
  protected abstract getNameLocator(): Locator;

  /**
   * Get the item price locator - must be implemented by subclasses
   * @returns Locator for item price element
   */
  protected abstract getPriceLocator(): Locator;

  /**
   * Get the item description locator - must be implemented by subclasses
   * @returns Locator for item description element
   */
  protected abstract getDescriptionLocator(): Locator;

  /**
   * Get item name
   * @returns Item name text
   */
  async getItemName(): Promise<string | null> {
    logger.debug('Getting item name');
    return await this.getNameLocator().textContent();
  }

  /**
   * Get item price
   * @returns Item price (e.g., "$29.99")
   */
  async getItemPrice(): Promise<string | null> {
    logger.debug('Getting item price');
    return await this.getPriceLocator().textContent();
  }

  /**
   * Get item description
   * @returns Item description text
   */
  async getItemDescription(): Promise<string | null> {
    logger.debug('Getting item description');
    return await this.getDescriptionLocator().textContent();
  }

  /**
   * Check if item is visible
   * @returns True if item is visible
   */
  async isItemVisible(): Promise<boolean> {
    logger.debug('Checking if item is visible');
    return await this.locator.isVisible();
  }
}
