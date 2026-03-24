// path: src/pages/LoginPage.ts

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SELECTORS } from '@utils/selectors';
import logger from '@utils/logger';

/**
 * Login page object encapsulating selectors and actions for login functionality
 * Extends BasePage with specific login page interactions
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Returns the username input locator. */
  private get usernameInput() {
    return this.page.locator(SELECTORS.USERNAME_INPUT);
  }

  /** Returns the password input locator. */
  private get passwordInput() {
    return this.page.locator(SELECTORS.PASSWORD_INPUT);
  }

  /** Returns the login submit button locator. */
  private get loginButton() {
    return this.page.locator(SELECTORS.LOGIN_BUTTON);
  }

  /** Returns the error message container locator. */
  private get errorMessage() {
    return this.page.locator(SELECTORS.ERROR_MESSAGE);
  }

  /**
   * Navigate to login page
   */
  async navigate(): Promise<void> {
    logger.info('Navigating to login page');
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Input username into the username field
   * @param username - Username to enter
   */
  async inputUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username, 'username');
  }

  /**
   * Input password into the password field
   * @param password - Password to enter
   */
  async inputPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password, 'password');
  }

  /**
   * Click the login button to submit login form
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton, 'login button');
  }

  /**
   * Check if login error message is visible
   * @returns True if error message container is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}
