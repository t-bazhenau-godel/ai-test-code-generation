// path: src/pages/ProductsPage.ts

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '@utils/selectors';
import { HeaderComponent } from '@components/HeaderComponent';
import { InventoryItemComponent } from '@components/InventoryItemComponent';
import { ItemSearcher } from '@utils/itemSearcher';
import logger from '@utils/logger';

/**
 * Products page object encapsulating selectors and actions for products page
 * Includes header component and product listing functionality
 */
export class ProductsPage extends BasePage {
  private headerComponent: HeaderComponent;
  private inventoryContainerLocator = this.page.locator(SELECTORS.INVENTORY_CONTAINER);
  private inventoryListLocator = this.page.locator(SELECTORS.INVENTORY_LIST);

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
  }

  /**
   * Navigate to products page
   */
  async navigate(): Promise<void> {
    logger.info('Navigating to products page');
    await this.page.goto('/inventory.html');
    await this.waitForPageLoad();
  }

  /**
   * Get header component instance
   * @returns HeaderComponent instance
   */
  getHeaderComponent(): HeaderComponent {
    return this.headerComponent;
  }

  /**
   * Get page title
   * @returns Products page title
   */
  async getPageTitle(): Promise<string> {
    logger.debug('Getting products page title');
    const title = await this.page.locator(SELECTORS.PAGE_TITLE).textContent();
    return title || '';
  }

  /**
   * Get all product items as InventoryItemComponent instances
   * @returns Array of InventoryItemComponent instances
   */
  async getProductItems(): Promise<InventoryItemComponent[]> {
    logger.debug('Getting product items');
    const itemLocators = await this.page.locator(SELECTORS.INVENTORY_ITEM).all();
    return itemLocators.map(locator => new InventoryItemComponent(this.page, locator));
  }

  /**
   * Get product count
   * @returns Number of products displayed
   */
  async getProductCount(): Promise<number> {
    logger.debug('Getting product count');
    const items = await this.getProductItems();
    return items.length;
  }

  /**
   * Get product component by name
   * @param productName - Name of the product
   * @returns InventoryItemComponent instance or null if not found
   */
  async getProductByName(productName: string): Promise<InventoryItemComponent | null> {
    logger.debug(`Getting product by name: ${productName}`);
    const items = await this.getProductItems();
    return ItemSearcher.findByName(items, productName);
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product
   */
  async addProductToCart(productName: string): Promise<void> {
    logger.info(`Adding product to cart: ${productName}`);
    const product = await this.getProductByName(productName);
    if (product) {
      await product.addToCart();
    } else {
      throw new Error(`Product not found: ${productName}`);
    }
  }

  /**
   * Logout from the application by opening menu and clicking logout
   */
  async logout(): Promise<void> {
    logger.info('Logging out from application');
    await this.headerComponent.openMenu();
    await this.headerComponent.clickMenuItem('Logout');
    await this.waitForPageLoad();
  }
}

