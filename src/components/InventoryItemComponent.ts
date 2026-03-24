// path: src/components/InventoryItemComponent.ts

import { Locator, Page } from '@playwright/test';
import { BaseItemComponent } from './BaseItemComponent';
import logger from '@utils/logger';

/**
 * Inventory item component encapsulating a single product item
 * Includes product details, image, price, and add to cart functionality
 */
export class InventoryItemComponent extends BaseItemComponent {
  private addToCartButtonLocator: Locator;

  constructor(page: Page, itemLocator: Locator) {
    super(page, itemLocator);

    // Child element locators relative to the inventory item
    this.addToCartButtonLocator = itemLocator.locator('button[data-test*="add-to-cart"]');
  }

  /**
   * Get name locator for base class use
   */
  protected getNameLocator(): Locator {
    return this.locator.locator('[data-test="inventory-item-name"]');
  }

  /**
   * Get price locator for base class use
   */
  protected getPriceLocator(): Locator {
    return this.locator.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Get description locator for base class use
   */
  protected getDescriptionLocator(): Locator {
    return this.locator.locator('[data-test="inventory-item-desc"]');
  }

  /**
   * Get product name (convenience method matching existing API)
   * @returns Product name text
   */
  async getProductName(): Promise<string | null> {
    return await this.getItemName();
  }

  /**
   * Get product description (convenience method matching existing API)
   * @returns Product description text
   */
  async getProductDescription(): Promise<string | null> {
    return await this.getItemDescription();
  }

  /**
   * Get product price (convenience method matching existing API)
   * @returns Product price (e.g., "$29.99")
   */
  async getProductPrice(): Promise<string | null> {
    return await this.getItemPrice();
  }

  /**
   * Click add to cart button
   */
  async addToCart(): Promise<void> {
    logger.info('Adding product to cart');
    await this.addToCartButtonLocator.click();
  }
}
