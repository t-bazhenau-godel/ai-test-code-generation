// path: src/pages/CheckoutInfoPage.ts

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '@components/HeaderComponent';
import { CheckoutInfoComponent } from '@components/CheckoutInfoComponent';
import logger from '@utils/logger';

/**
 * Checkout info page object encapsulating selectors and actions for checkout information page
 * Handles user information collection (first name, last name, postal code)
 */
export class CheckoutInfoPage extends BasePage {
  private headerComponent: HeaderComponent;
  private checkoutInfoComponent: CheckoutInfoComponent;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.checkoutInfoComponent = new CheckoutInfoComponent(page);
  }

  /**
   * Navigate to checkout info page
   */
  async navigate(): Promise<void> {
    logger.info('Navigating to checkout info page');
    await this.page.goto('/checkout-step-one.html');
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
   * Get checkout info component instance
   * @returns CheckoutInfoComponent instance
   */
  getCheckoutInfoComponent(): CheckoutInfoComponent {
    return this.checkoutInfoComponent;
  }

  /**
   * Fill checkout information and proceed
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @param postalCode - User's postal code
   */
  async fillAndContinue(firstName: string, lastName: string, postalCode: string): Promise<void> {
    logger.info('Filling checkout info and continuing');
    await this.checkoutInfoComponent.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.checkoutInfoComponent.clickContinue();
    await this.waitForPageLoad();
  }

  /**
   * Check if finish button is visible
   * @returns True if finish button is visible
   */
  async isFinishButtonVisible(): Promise<boolean> {
    return await this.checkoutInfoComponent.isFinishButtonVisible();
  }

  /**
   * Click finish button to complete checkout
   */
  async clickFinish(): Promise<void> {
    await this.checkoutInfoComponent.clickFinish();
    await this.waitForPageLoad();
  }

  /**
   * Get complete header text
   * @returns Complete header text
   */
  async getCompleteHeaderText(): Promise<string> {
    return await this.checkoutInfoComponent.getCompleteHeaderText();
  }
}

