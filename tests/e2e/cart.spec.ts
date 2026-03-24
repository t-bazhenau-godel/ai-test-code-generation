// path: tests/e2e/cart.spec.ts

import { test, expect } from '@fixtures/PageFixtures';
import logger from '@utils/logger';

/**
 * Cart test suite
 * Tests shopping cart functionality including item display and removal operations
 */
test.describe('Cart', () => {
  test('should display cart items correctly after adding products', async ({
    page,
    authenticatedPage,
    productsPage,
    checkoutPage,
  }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    const secondProductName = 'Sauce Labs Bolt T-Shirt';

    logger.info('Cart visibility test: Navigating to products page');
    await productsPage.navigate();

    // Act: Add first product to cart
    await productsPage.addProductToCart(productName);
    logger.info(`Product added to cart: ${productName}`);

    // Add second product to cart
    await productsPage.addProductToCart(secondProductName);
    logger.info(`Product added to cart: ${secondProductName}`);

    // Navigate to cart
    await productsPage.getHeaderComponent().clickShoppingCart();
    await checkoutPage.waitForPageLoad();

    // Assert: Verify both items are in cart
    const cartItemCount = await checkoutPage.getCartItemCount();
    expect(cartItemCount).toBe(2);
    logger.info(`Cart displays correct item count: ${cartItemCount}`);

    // Assert: Verify first product is displayed in cart
    const firstItem = await checkoutPage.getCartItemByName(productName);
    expect(firstItem).not.toBeNull();
    const firstName = await firstItem?.getItemName();
    expect(firstName).toContain(productName);
    logger.info(`First product verified in cart: ${productName}`);

    // Assert: Verify second product is displayed in cart
    const secondItem = await checkoutPage.getCartItemByName(secondProductName);
    expect(secondItem).not.toBeNull();
    const secondName = await secondItem?.getItemName();
    expect(secondName).toContain(secondProductName);
    logger.info(`Second product verified in cart: ${secondProductName}`);
  });

  test('should remove item from cart successfully', async ({ page, authenticatedPage, productsPage, checkoutPage }) => {
    // Arrange
    const productName = 'Sauce Labs Bike Light';

    logger.info('Cart removal test: Navigating to products page');
    await productsPage.navigate();

    // Act: Add product to cart
    await productsPage.addProductToCart(productName);
    logger.info(`Product added to cart: ${productName}`);

    // Navigate to cart
    await productsPage.getHeaderComponent().clickShoppingCart();
    await checkoutPage.waitForPageLoad();

    // Verify item is in cart
    let currentCartCount = await checkoutPage.getCartItemCount();
    expect(currentCartCount).toBe(1);
    logger.info(`Initial cart count verified: ${currentCartCount}`);

    // Remove item from cart
    await checkoutPage.removeCartItemByName(productName);
    logger.info(`Removed item from cart: ${productName}`);

    // Assert: Verify item is removed from cart
    const cartItemCountAfterRemoval = await checkoutPage.getCartItemCount();
    expect(cartItemCountAfterRemoval).toBe(0);
    logger.info(`Cart is empty after removal - count verified: ${cartItemCountAfterRemoval}`);

    // Assert: Verify the specific item is no longer in cart
    const removedItem = await checkoutPage.getCartItemByName(productName);
    expect(removedItem).toBeNull();
    logger.info(`Removed item is no longer found in cart: ${productName}`);
  });

  test('should display cart UI elements visibility', async ({ page, authenticatedPage, productsPage, checkoutPage }) => {
    // Arrange
    const productName = 'Sauce Labs Fleece Jacket';

    logger.info('Cart UI test: Navigating to products page');
    await productsPage.navigate();

    // Act: Add product to cart
    await productsPage.addProductToCart(productName);
    logger.info(`Product added to cart: ${productName}`);

    // Navigate to cart
    await productsPage.getHeaderComponent().clickShoppingCart();
    await checkoutPage.waitForPageLoad();

    // Assert: Verify cart contents container is visible
    const isCartVisible = await checkoutPage.isCartContentsVisible();
    expect(isCartVisible).toBe(true);
    logger.info('Cart contents container is visible');

    // Assert: Verify checkout button is visible
    const isCheckoutVisible = await checkoutPage.isCheckoutButtonVisible();
    expect(isCheckoutVisible).toBe(true);
    logger.info('Checkout button is visible');

    // Assert: Verify continue shopping button is visible
    const isContinueVisible = await checkoutPage.isContinueShoppingButtonVisible();
    expect(isContinueVisible).toBe(true);
    logger.info('Continue shopping button is visible');
  });
});
