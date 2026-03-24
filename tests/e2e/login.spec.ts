// path: tests/e2e/login.spec.ts

import { test, expect } from '@fixtures/PageFixtures';
import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import logger from '@utils/logger';
import { Users, TEST_PASSWORD } from '@utils/envHelper';

/**
 * Login test suite
 * Tests login functionality with standard user credentials
 */
test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize login page object
    loginPage = new LoginPage(page);
    
    // Navigate to login page before each test
    await loginPage.navigate();
    logger.info('Login page loaded and ready for test');
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Arrange
    const username = Users.STANDARD_USER;
    
    // Act
    await loginPage.inputUsername(username);
    await loginPage.inputPassword(TEST_PASSWORD);
    await loginPage.clickLoginButton();

    // Assert
    await expect(page).toHaveURL(/.*inventory/i);
    logger.info('Login successful - user redirected to inventory page');
  });

  test('should display error for locked out user', async ({ page }) => {
    // Arrange
    const username = Users.LOCKED_OUT_USER;
    
    // Act
    await loginPage.inputUsername(username);
    await loginPage.inputPassword(TEST_PASSWORD);
    await loginPage.clickLoginButton();

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    logger.info('Locked out user cannot login - error message displayed');
  });

  test('should logout successfully after login', async ({ page }) => {
    // Arrange
    const username = Users.STANDARD_USER;
    const productsPage = new ProductsPage(page);

    // Act - Login process
    await loginPage.inputUsername(username);
    await loginPage.inputPassword(TEST_PASSWORD);
    await loginPage.clickLoginButton();

    // Assert - I'm on Product page
    await expect(page).toHaveURL(/.*inventory/i);
    logger.info('User logged in successfully - on products page');

    // Act - Click 'Open menu' and 'Logout'
    await productsPage.logout();
    logger.info('User logged out');

    // Assert - I'm on Login page
    await expect(page).toHaveURL(/.*\//i);
    logger.info('Logout successful - user redirected to login page');
  });
});
