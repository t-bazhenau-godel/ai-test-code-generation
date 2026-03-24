// path: src/components/CheckoutInfoComponent.ts

import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';
import { SELECTORS } from '@utils/selectors';
import logger from '@utils/logger';

/**
 * Checkout info component encapsulating the checkout form
 * Handles user information input: first name, last name, and postal code
 */
export class CheckoutInfoComponent extends BaseComponent {
  private page: Page;
  private firstNameLocator: Locator;
  private lastNameLocator: Locator;
  private postalCodeLocator: Locator;
  private errorMessageContainerLocator: Locator;
  private cartFooterLocator: Locator;
  private cancelButtonLocator: Locator;
  private finishButtonLocator: Locator;
  private continueButtonLocator: Locator;
  private checkoutCompleteContainerLocator: Locator;
  private ponyExpressImageLocator: Locator;
  private completeHeaderLocator: Locator;
  private completeTextLocator: Locator;
  private backToProductsButtonLocator: Locator;

  constructor(page: Page) {
    const containerLocator = page.locator(SELECTORS.CHECKOUT_INFO_CONTAINER);
    super(containerLocator);
    this.page = page;

    this.firstNameLocator = page.locator(SELECTORS.FIRST_NAME_INPUT);
    this.lastNameLocator = page.locator(SELECTORS.LAST_NAME_INPUT);
    this.postalCodeLocator = page.locator(SELECTORS.POSTAL_CODE_INPUT);
    this.errorMessageContainerLocator = page.locator(SELECTORS.ERROR_MESSAGE_CONTAINER);
    this.cartFooterLocator = page.locator(SELECTORS.CART_FOOTER);
    this.cancelButtonLocator = page.locator(SELECTORS.CANCEL_BUTTON);
    this.finishButtonLocator = page.locator(SELECTORS.FINISH_BUTTON);
    this.continueButtonLocator = page.locator(SELECTORS.CONTINUE_BUTTON);
    this.checkoutCompleteContainerLocator = page.locator(SELECTORS.CHECKOUT_COMPLETE_CONTAINER);
    this.ponyExpressImageLocator = page.locator(SELECTORS.PONY_EXPRESS_IMAGE);
    this.completeHeaderLocator = page.locator(SELECTORS.COMPLETE_HEADER);
    this.completeTextLocator = page.locator(SELECTORS.COMPLETE_TEXT);
    this.backToProductsButtonLocator = page.locator(SELECTORS.BACK_TO_PRODUCTS);
  }

  /**
   * Fill all checkout info fields
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal code
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    logger.info('Filling checkout information');
    await this.firstNameLocator.fill(firstName);
    await this.lastNameLocator.fill(lastName);
    await this.postalCodeLocator.fill(postalCode);
  }

  /**
   * Click continue button to proceed
   */
  async clickContinue(): Promise<void> {
    logger.info('Clicking continue button');
    await this.continueButtonLocator.click();
  }

  /**
   * Click finish button to complete checkout
   */
  async clickFinish(): Promise<void> {
    logger.info('Clicking finish button');
    await this.finishButtonLocator.click();
  }

  /**
   * Check if finish button is visible
   * @returns True if finish button is visible
   */
  async isFinishButtonVisible(): Promise<boolean> {
    logger.debug('Checking if finish button is visible');
    return await this.finishButtonLocator.isVisible();
  }

  /**
   * Get complete header text
   * @returns Complete header text
   */
  async getCompleteHeaderText(): Promise<string> {
    logger.debug('Getting complete header text');
    return (await this.completeHeaderLocator.textContent()) ?? '';
  }
}

