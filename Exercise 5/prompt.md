You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal: Update a single locator in the existing Page Object. Do not modify any other code

Project & framework:
- Stack: TypeScript + Playwright
- File to fix:
// path: src/utils/dateHelper.ts

Buggy Code:
```
async getProductCount(): Promise<number> {
    logger.debug('Getting product count');
    const items = await this.getProductItems();
    return items.length;
  }
```
Problem:

Function throws on null/undefined input. Must return empty string in that case.

Fix:
- Add null/undefined guard.
- Keep other behavior unchanged.
- Keep function signature consistent with project.
- Only update this function
- Output corrected code only.
