// path: tests/e2e/products.spec.ts

import { test, expect } from '@fixtures/PageFixtures';
import logger from '@utils/logger';

/**
 * Products page test suite
 * Tests product listing, filtering, and cart operations on the products page
 */
test.describe('Products', () => {
  test('should display all available products', async ({ page, authenticatedPage, productsPage }) => {
    // Arrange
    logger.info('Products test: Navigating to products page');
    await productsPage.navigate();

    // Act
    const productCount = await productsPage.getProductCount();

    // Assert
    expect(productCount).toBeGreaterThan(0);
    logger.info(`Total products displayed: ${productCount}`);
  });

  test('should find product by name', async ({ page, authenticatedPage, productsPage }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';

    logger.info('Find product test: Navigating to products page');
    await productsPage.navigate();

    // Act
    const product = await productsPage.getProductByName(productName);

    // Assert
    expect(product).not.toBeNull();
    const foundProductName = await product?.getProductName();
    expect(foundProductName).toContain(productName);
    logger.info(`Product found: ${productName}`);
  });

  test('should display product details with name, description, and price', async ({
    page,
    authenticatedPage,
    productsPage,
  }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';

    logger.info('Product details test: Navigating to products page');
    await productsPage.navigate();

    // Act
    const product = await productsPage.getProductByName(productName);

    // Assert
    expect(product).not.toBeNull();
    const name = await product?.getProductName();
    const description = await product?.getProductDescription();
    const price = await product?.getProductPrice();

    expect(name).toBeTruthy();
    expect(description).toBeTruthy();
    expect(price).toBeTruthy();
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
    logger.info(`Product details verified - Name: ${name}, Price: ${price}`);
  });
});
