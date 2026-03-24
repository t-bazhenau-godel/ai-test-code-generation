// path: src/components/HeaderComponent.ts

import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { SELECTORS } from '@utils/selectors';
import logger from '@utils/logger';

/**
 * Header component encapsulating header UI elements and interactions
 * Includes menu navigation, logo, shopping cart, and product sorting
 */
export class HeaderComponent extends BaseComponent {
  private page: Page;
  private headerContainer: Locator;
  private menuButton: Locator;
  private closeMenuButton: Locator;
  private menuOverlay: Locator;
  private shoppingCartLink: Locator;
  private productSortContainer: Locator;

  constructor(page: Page) {
    const headerContainer = page.locator(SELECTORS.HEADER_CONTAINER);
    super(headerContainer);
    this.page = page;
    this.headerContainer = headerContainer;
    this.menuButton = page.locator(SELECTORS.OPEN_MENU);
    this.closeMenuButton = page.locator(SELECTORS.CLOSE_MENU);
    this.menuOverlay = page.locator(SELECTORS.MENU_OVERLAY);
    this.shoppingCartLink = page.locator(SELECTORS.SHOPPING_CART_LINK);
    this.productSortContainer = page.locator(SELECTORS.PRODUCT_SORT_CONTAINER);
  }

  /**
   * Click the menu button to open navigation
   */
  async openMenu(): Promise<void> {
    logger.info('Opening menu');
    await this.menuButton.click();
    await this.menuOverlay.waitFor({ state: 'visible' });
  }

  /**
   * Click the close button to close navigation menu
   */
  async closeMenu(): Promise<void> {
    logger.info('Closing menu');
    await this.closeMenuButton.click();
    await this.menuOverlay.waitFor({ state: 'hidden' });
  }

  /**
   * Click on a menu item by name
   * @param menuItemName - Name of the menu item (e.g., 'All Items', 'About', 'Logout', 'Reset App State')
   */
  async clickMenuItem(menuItemName: string): Promise<void> {
    logger.info(`Clicking menu item: ${menuItemName}`);
    await this.page.locator(`[data-test="${this.getMenuItemTestId(menuItemName)}"]`).click();
  }

  /**
   * Get menu item test ID based on menu item name
   * @param menuItemName - Name of the menu item
   * @returns Test ID for the menu item
   */
  private getMenuItemTestId(menuItemName: string): string {
    const menuMap: { [key: string]: string } = {
      'All Items': 'inventory-sidebar-link',
      'About': 'about-sidebar-link',
      'Logout': 'logout-sidebar-link',
      'Reset App State': 'reset-sidebar-link',
    };
    return menuMap[menuItemName] || menuItemName.toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Click on shopping cart link
   */
  async clickShoppingCart(): Promise<void> {
    logger.info('Clicking shopping cart');
    await this.shoppingCartLink.click();
  }

  /**
   * Get shopping cart badge count
   * @returns Cart item count or empty string if no items
   */
  async getCartItemCount(): Promise<string> {
    logger.debug('Getting cart item count');
    const cartLink = this.shoppingCartLink;
    const badge = cartLink.locator(SELECTORS.SHOPPING_CART_BADGE);
    try {
      return await badge.textContent() || '';
    } catch {
      return '';
    }
  }

  /**
   * Select a sorting option from the product sort dropdown
   * @param sortOption - Sorting option (e.g., 'az', 'za', 'lohi', 'hilo')
   */
  async selectSortOption(sortOption: string): Promise<void> {
    logger.info(`Selecting sort option: ${sortOption}`);
    await this.productSortContainer.selectOption(sortOption);
  }

  /**
   * Get the currently selected sort option text
   * @returns Current sort option text
   */
  async getSelectedSortOption(): Promise<string | null> {
    logger.debug('Getting selected sort option');
    return await this.page.locator('[data-test="active-option"]').textContent();
  }
}

