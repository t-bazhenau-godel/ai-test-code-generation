import { test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { CheckoutInfoPage } from '@pages/CheckoutInfoPage';
import { AuthService } from '@services/AuthService';
import { Users, TEST_PASSWORD } from '@utils/envHelper';
import logger from '@utils/logger';

/**
 * Page fixtures for all pages in the application
 * Provides page object instances to tests with proper setup and teardown
 */
type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  checkoutPage: CheckoutPage;
  checkoutInfoPage: CheckoutInfoPage;
  authenticatedPage: void;
};

export const test = baseTest.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPageInstance = new LoginPage(page);
    logger.info('LoginPage fixture initialized');
    
    await use(loginPageInstance);
    
    // Teardown if needed
    logger.info('LoginPage fixture cleanup completed');
  },

  productsPage: async ({ page }, use) => {
    const productsPageInstance = new ProductsPage(page);
    logger.info('ProductsPage fixture initialized');
    
    await use(productsPageInstance);
    
    // Teardown if needed
    logger.info('ProductsPage fixture cleanup completed');
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPageInstance = new CheckoutPage(page);
    logger.info('CheckoutPage fixture initialized');
    
    await use(checkoutPageInstance);
    
    // Teardown if needed
    logger.info('CheckoutPage fixture cleanup completed');
  },

  checkoutInfoPage: async ({ page }, use) => {
    const checkoutInfoPageInstance = new CheckoutInfoPage(page);
    logger.info('CheckoutInfoPage fixture initialized');
    
    await use(checkoutInfoPageInstance);
    
    // Teardown if needed
    logger.info('CheckoutInfoPage fixture cleanup completed');
  },

  authenticatedPage: async ({ page }, use) => {
    try {
      // Perform login before test using centralized AuthService
      await AuthService.login(page, Users.STANDARD_USER, TEST_PASSWORD);
      logger.info('User authenticated via fixture');
      await use();
    } catch (error) {
      logger.error('Authentication failed', error instanceof Error ? error : new Error(String(error)));
      throw error;
    } finally {
      // Cleanup: Optional logout after test
      logger.info('Authentication fixture cleanup completed');
    }
  },
});

export { expect } from '@playwright/test';
