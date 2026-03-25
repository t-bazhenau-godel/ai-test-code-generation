You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal: Generate Checkout flow components and test

Project & framework:
- Stack: TypeScript + Playwright
- Pattern: Page Object Model
- Structure:
  - tests/e2e/checkout.spec.ts
  - src/pages/SearchPage.ts, src/pages/ProductPage.ts, src/pages/CartPage.ts, src/pages/CheckoutPage.ts
  - src/components/Header.ts
  - src/fixtures/testData.ts

DOM context:
```
<div data-testid="cart-summary">
  <span data-testid="cart-total">$100</span>
  <button data-testid="checkout-btn">Checkout</button>
</div>
```
Rules:
- Descriptive test names reflecting expected behavior; 
- Use Playwright fixtures (test, page, expect); ensure isolation.
- Keep tests DRY: extract reusable logic into helpers or page/component methods.
- Reuse Playwright locators via getters/fields; no raw page.locator in tests.
- Use web-first assertions (toBeVisible, toHaveText, toHaveURL, etc.).
- Avoid hard-coded timeouts; no hard waits.
- Ensure parallel-safe code, no shared mutable state.
- Add JSDoc for helper functions and reusable logic.
- If a Page Object already exists in the repo, import it instead of creating a duplicate.


Task:

1. Generate pages with methods:
- SearchPage: queryInput(), submit(), productResult(name)
- ProductPage: addToCart(), title(), price()
- CartPage: items(), proceedToCheckout()
- CheckoutPage: total(), placeOrder()
- Header: cartBadge()

2. Test (checkout.spec):
   - // Initialization: open search page
   - // User actions: search, select product, add to cart
   - // Verification: cart badge increments
   - // User actions: proceed to checkout
   - // Verification: total matches expected

Output format:
- Only final code blocks with file headers.