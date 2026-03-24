// path: src/services/AuthService.ts

import { Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import logger from '@utils/logger';

/**
 * Authentication service for managing login flows
 * Consolidates authentication logic for reuse across fixtures and tests
 */
export class AuthService {
  /**
   * Log in with provided credentials
   * @param page - Playwright page object
   * @param username - Username to use for login
   * @param password - Password to use for login
   */
  static async login(page: Page, username: string, password: string): Promise<void> {
    logger.info(`Logging in with username: ${username}`);
    const loginPage = new LoginPage(page);
    
    try {
      await loginPage.navigate();
      await loginPage.inputUsername(username);
      await loginPage.inputPassword(password);
      await loginPage.clickLoginButton();
      logger.info('Login successful');
    } catch (error) {
      logger.error('Login failed', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  /**
   * Log out the current user
   * @param page - Playwright page object
   */
  static async logout(page: Page): Promise<void> {
    logger.info('Logging out');
    try {
      // Navigate to any page to access the menu
      await page.goto('/inventory.html');
      const headerComponent = page.locator('[data-test="header-container"]');
      await headerComponent.waitFor({ state: 'visible' });
      
      // Open menu and click logout
      const menuButton = page.locator('[data-test="open-menu"]');
      await menuButton.click();
      
      const logoutButton = page.locator('[data-test="logout-sidebar-link"]');
      await logoutButton.click();
      
      logger.info('Logout successful');
    } catch (error) {
      logger.error('Logout failed', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }

  /**
   * Check if user is authenticated (by checking if on login page or beyond)
   * @param page - Playwright page object
   * @returns True if user appears to be authenticated
   */
  static async isAuthenticated(page: Page): Promise<boolean> {
    const url = page.url();
    const isOnLoginPage = url.includes('saucedemo.com') && !url.includes('/inventory');
    return !isOnLoginPage;
  }
}
