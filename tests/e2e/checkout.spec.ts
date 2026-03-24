// path: tests/e2e/checkout.spec.ts

import { test, expect } from '@fixtures/PageFixtures';
import logger from '@utils/logger';
import { checkoutData } from '@test-data/checkoutData';

/**
 * Checkout flow test suite
 * Tests end-to-end checkout process including cart review and user information entry
 */
test.describe('Checkout', () => {
  test('should complete full checkout flow with valid information', async ({
    page,
    authenticatedPage,
    productsPage,
    checkoutPage,
    checkoutInfoPage,
  }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    const { firstName, lastName, postalCode } = checkoutData.validCheckout;

    logger.info('Checkout test: Navigating to products page');
    await productsPage.navigate();

    // Act: Add product to cart
    await productsPage.addProductToCart(productName);
    logger.info(`Product added to cart: ${productName}`);

    // Navigate to cart
    await productsPage.getHeaderComponent().clickShoppingCart();

    // Proceed to checkout
    await checkoutPage.clickCheckout();

    // Fill checkout information
    await checkoutInfoPage.fillAndContinue(firstName, lastName, postalCode);
    logger.info('Checkout information submitted successfully');

    // Assert: Verify navigation to checkout overview page
    await expect(page).toHaveURL(/.*checkout-step-two/i);
    logger.info('User successfully proceeded past checkout info step');

    // Assert: Verify finish button is visible
    const isFinishVisible = await checkoutInfoPage.isFinishButtonVisible();
    expect(isFinishVisible).toBe(true);
    logger.info('Finish button is displayed on checkout overview page');

    // Act: Click finish button to complete checkout
    await checkoutInfoPage.clickFinish();
    logger.info('Clicked finish button to complete order');

    // Assert: Verify complete header text
    const completeHeaderText = await checkoutInfoPage.getCompleteHeaderText();
    expect(completeHeaderText).toContain('Thank you for your order!');
    logger.info(`Complete header text verified: ${completeHeaderText}`);
  });

  test('should allow user to continue shopping from cart', async ({ page, authenticatedPage, productsPage, checkoutPage }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';

    logger.info('Continue shopping test: Navigating to products page');
    await productsPage.navigate();

    // Act
    await productsPage.addProductToCart(productName);
    await productsPage.getHeaderComponent().clickShoppingCart();
    await checkoutPage.clickContinueShopping();

    // Assert: Verify user is back on products page
    await expect(page).toHaveURL(/.*inventory/i);
    logger.info('User returned to products page from cart');
  });
});