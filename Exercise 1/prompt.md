You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal: Generate a base Playwright E2E project for an Authentication flow

Project & framework:
- Stack: TypeScript + Playwright
- Pattern: Page Object Model
- Structure:
  - tests/e2e/auth.spec.ts
  - src/pages/AuthPage.ts, src/pages/HomePage.ts
  - src/pages/HomePage.ts
  - src/fixtures/testData.ts
- Selectors: getByRole/getByLabel/getByTestId only

Rules:
- Descriptive test names reflecting expected behavior; 
- Use Playwright fixtures (test, page, expect); ensure isolation.
- Use test.beforeEach/test.afterEach if setup/teardown is needed.
- Keep tests DRY: extract reusable logic into helpers or page/component methods.
- Reuse Playwright locators via getters/fields; no raw page.locator in tests.
- Use web-first assertions (toBeVisible, toHaveText, toHaveURL, etc.).
- Avoid hard-coded timeouts; no hard waits.
- Ensure parallel-safe code, no shared mutable state.
- Add JSDoc for helper functions and reusable logic.
- If a Page Object already exists in the repo, import it instead of creating a duplicate.
- Follow https://playwright.dev/docs/writing-tests guidance.


DOM context to inform locators:
```
<form><div class="form_group"><input class="input_error form_input" placeholder="Username" type="text" data-test="username" id="user-name" name="user-name" autocorrect="off" autocapitalize="none" value=""></div><div class="form_group"><input class="input_error form_input" placeholder="Password" type="password" data-test="password" id="password" name="password" autocorrect="off" autocapitalize="none" value=""></div><div class="error-message-container"></div><input type="submit" class="submit-button btn_action" data-test="login-button" id="login-button" name="login-button" value="Login"></form>
```
Task:
Generate:
1) Page Objects:
   - LoginPage: open(), username(), password(), clickLogin(), login(email, rassword)
   - HomePage: avatar()
2) Test file: tests/e2e/login.spec.ts with comments:
   - // Initialization: open login
   - // User actions: fill fields, login
   - // Verification: dashboard URL, avatar visible

3) Test scenarios:

Positive login flow:

    - Navigate to Login Page
    - Input Valid Credantials 
    - Expect Avatar Visible

Negative login flow:

    - Navigate to Login Page
    - Input Invalid Credantials 
    - ERROR Message Visible

Output format:
- Only final code blocks with file headers.