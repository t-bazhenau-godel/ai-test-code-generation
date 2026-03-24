// path: src/components/CartItemComponent.ts

import { Locator, Page } from '@playwright/test';
import { BaseItemComponent } from './BaseItemComponent';
import logger from '@utils/logger';

/**
 * Cart item component encapsulating a single item in the shopping cart
 * Includes item details, quantity, and removal functionality
 */
export class CartItemComponent extends BaseItemComponent {
  private removeButtonLocator: Locator;

  constructor(page: Page, itemLocator: Locator) {
    super(page, itemLocator);

    // Child element locators relative to the cart item
    this.removeButtonLocator = itemLocator.locator('button[data-test*="remove"]');
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
   * Click remove button to remove item from cart
   */
  async removeFromCart(): Promise<void> {
    logger.info('Removing item from cart');
    await this.removeButtonLocator.click();
  }
}
