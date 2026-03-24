# Test Automation Framework

A clean, maintainable Playwright test automation framework built with TypeScript.

## Stack

- **Test Framework**: Playwright Test
- **Language**: TypeScript
- **Patterns**: Page Object Model (POM) & Component Object Model (COM)

## Project Structure

```
src/
├── pages/           # Page objects (BasePage, HomePage, etc.)
├── components/      # Reusable components (Button, Input, etc.)
├── utils/          # Utilities (logger, envHelper)
└── fixtures/       # Test fixtures and setup/teardown hooks
tests/
└── e2e/            # End-to-end test specs
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
# Headless mode
npm test

# Headed mode
npm run test:headed

# UI mode (interactive)
npm run test:ui

# Debug mode
npm run test:debug
```

### 3. View Test Reports
```bash
npm run test:report
```

## Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=http://localhost:3000
ENVIRONMENT=dev
API_TOKEN=your_token_here
TIMEOUT=30000
CI=false
```

## Framework Conventions

### Page Objects
- Extend `BasePage`
- Use PascalCase for class names
- Use camelCase for methods
- Use `getByRole()`, `getByLabel()`, `getByTestId()` only
- Include JSDoc comments for public methods

Example:
```typescript
export class LoginPage extends BasePage {
  async login(email: string, password: string): Promise<void> {
    // Implementation
  }
}
```

### Components
- Extend `BaseComponent`
- Encapsulate selector logic
- Reuse across multiple pages
- Include static factory methods

Example:
```typescript
const button = Button.fromPageRole(page, 'Submit');
await button.click();
```

### Tests
- Use `test` from `@fixtures/BaseTest`
- Follow Arrange-Act-Assert pattern
- Group related tests with `test.describe()`
- Use semantic test names

Example:
```typescript
test('should submit form successfully', async ({ page }) => {
  // Arrange
  const form = new LoginForm(page);
  
  // Act
  await form.fillAndSubmit('user@test.com', 'password');
  
  // Assert
  await expect(page).toHaveURL('/dashboard');
});
```

## Best Practices

1. **DRY Principle**: Create reusable components and utilities
2. **Explicit Waits**: Use appropriate Playwright wait methods
3. **Logging**: Use the logger utility for better debugging
4. **Environment Config**: Use envHelper for configuration
5. **Type Safety**: Leverage TypeScript's strict mode
6. **Error Handling**: Add meaningful error messages

## Path Aliases

TypeScript path aliases are configured for cleaner imports:

```typescript
import { BasePage } from '@pages/BasePage';
import { Button } from '@components/Button';
import logger from '@utils/logger';
import { test } from '@fixtures/BaseTest';
```

## Contributing

- Follow the naming conventions (PascalCase for classes, camelCase for methods)
- Add JSDoc comments for all public methods
- Keep components focused and reusable
- Run tests locally before committing
