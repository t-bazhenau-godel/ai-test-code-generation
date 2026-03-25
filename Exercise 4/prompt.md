You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal: Update a single locator in the existing Page Object. Do not modify any other code

Project & framework:
- Stack: TypeScript + Playwright
- File to fix: // path: src/pages/CartPage.ts

Buggy Locator Code: ```'[data-test="continue-buying"]'```

Problem:

Locator is outdated. The element now has data-testid="continue-shopping".
Our convention is to use stable selectors in Page Objects.

Fix:
- Replace locator with data-testid equivalent.
- Keep class & method signatures unchanged.
- Output corrected code only.
- Do not modify unrelated code