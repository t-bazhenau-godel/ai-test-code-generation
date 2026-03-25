You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal: Add a Filtering search flow to existing Test Framework

Project & framework:
- Stack: TypeScript + Playwright
- Pattern: Page Object Model
- Structure:
  - tests/e2e/search.spec.ts
  - src/pages/SearchPage.ts, src/pages/ResultsPage.ts

DOM context (outerHTML):
```
<div role="list" data-testid="results">
  <div data-testid="result-item">
    <span class="title">Laptop</span>
    <span class="price">$999</span>
  </div>
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

1. Generate pageswith methods:
    -  SearchPage: queryInput(), submit(), applyFilter(filterName)
    - ResultsPage: items(), titleOf(index), priceOf(index)
2. Test (search.spec):
   - // Initialization: open search page
   - // User actions: type "Laptop", apply filter "Price < $1000"
   - // Verification: each result price < 1000

Output format:
- Only final code blocks with file headers.