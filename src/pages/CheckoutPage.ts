// path: src/pages/CheckoutPage.ts

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '@utils/selectors';
import { HeaderComponent } from '@components/HeaderComponent';
import { CartItemComponent } from '@components/CartItemComponent';
import { ItemSearcher } from '@utils/itemSearcher';
import logger from '@utils/logger';

/**
 * Checkout page object encapsulating selectors and actions for checkout page
 * Includes cart review, proceed to checkout, and related functionality
 */
export class CheckoutPage extends BasePage {
  // ==================== Components ====================
  private headerComponent: HeaderComponent;

  // ==================== Locators - Cart Container ====================
  private cartContentsContainerLocator = this.page.locator(SELECTORS.CART_CONTENTS_CONTAINER);

  // ==================== Locators - Buttons ====================
  private continueShoppingButtonLocator = this.page.locator(SELECTORS.CONTINUE_SHOPPING);
  private checkoutButtonLocator = this.page.locator(SELECTORS.CHECKOUT_BUTTON);

  // ==================== Locators - Labels ====================
  private cartQuantityLabelLocator = this.page.locator(SELECTORS.CART_QUANTITY_LABEL);
  private cartDescLabelLocator = this.page.locator(SELECTORS.CART_DESC_LABEL);

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
  }

  // ==================== Navigation ====================

  /**
   * Navigate to checkout page
   */
  async navigate(): Promise<void> {
    logger.info('Navigating to checkout page');
    await this.page.goto('/cart.html');
    await this.waitForPageLoad();
  }

  // ==================== Components ====================

  /**
   * Get header component instance
   * @returns HeaderComponent instance
   */
  getHeaderComponent(): HeaderComponent {
    return this.headerComponent;
  }

  // ==================== Cart Item Operations ====================

  /**
   * Get all cart items as CartItemComponent instances
   * @returns Array of CartItemComponent instances
   */
  async getCartItems(): Promise<CartItemComponent[]> {
    logger.debug('Getting cart items');
    const itemLocators = await this.page.locator(SELECTORS.INVENTORY_ITEM).all();
    return itemLocators.map(locator => new CartItemComponent(this.page, locator));
  }

  /**
   * Get cart item count
   * @returns Number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    logger.debug('Getting cart item count');
    const items = await this.getCartItems();
    return items.length;
  }

  /**
   * Get cart item by name
   * @param itemName - Name of the item
   * @returns CartItemComponent instance or null if not found
   */
  async getCartItemByName(itemName: string): Promise<CartItemComponent | null> {
    logger.debug(`Getting cart item by name: ${itemName}`);
    const items = await this.getCartItems();
    return ItemSearcher.findByName(items, itemName);
  }

  /**
   * Remove item from cart by name
   * @param itemName - Name of the item to remove
   */
  async removeCartItemByName(itemName: string): Promise<void> {
    logger.info(`Removing cart item: ${itemName}`);
    const item = await this.getCartItemByName(itemName);
    if (item) {
      await item.removeFromCart();
    } else {
      throw new Error(`Cart item not found: ${itemName}`);
    }
  }

  // ==================== Button Interactions ====================

  /**
   * Click continue shopping button to go back to products
   */
  async clickContinueShopping(): Promise<void> {
    logger.info('Clicking continue shopping button');
    await this.continueShoppingButtonLocator.click();
    await this.waitForPageLoad();
  }

  /**
   * Click checkout button to proceed to checkout
   */
  async clickCheckout(): Promise<void> {
    logger.info('Clicking checkout button');
    await this.checkoutButtonLocator.click();
    await this.waitForPageLoad();
  }

  // ==================== Visibility Checks ====================

  /**
   * Check if cart contents container is visible
   * @returns True if container is visible
   */
  async isCartContentsVisible(): Promise<boolean> {
    logger.debug('Checking if cart contents is visible');
    return await this.cartContentsContainerLocator.isVisible();
  }

  /**
   * Check if checkout button is visible
   * @returns True if button is visible
   */
  async isCheckoutButtonVisible(): Promise<boolean> {
    logger.debug('Checking if checkout button is visible');
    return await this.checkoutButtonLocator.isVisible();
  }

  /**
   * Check if continue shopping button is visible
   * @returns True if button is visible
   */
  async isContinueShoppingButtonVisible(): Promise<boolean> {
    logger.debug('Checking if continue shopping button is visible');
    return await this.continueShoppingButtonLocator.isVisible();
  }

  // ==================== Label Getters ====================

  /**
   * Get cart quantity label text
   * @returns QTY label text
   */
  async getCartQuantityLabel(): Promise<string | null> {
    logger.debug('Getting cart quantity label');
    return await this.cartQuantityLabelLocator.textContent();
  }

  /**
   * Get cart description label text
   * @returns Description label text
   */
  async getCartDescriptionLabel(): Promise<string | null> {
    logger.debug('Getting cart description label');
    return await this.cartDescLabelLocator.textContent();
  }
}
