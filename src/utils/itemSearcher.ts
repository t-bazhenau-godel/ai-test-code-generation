// path: src/utils/itemSearcher.ts

import { BaseItemComponent } from '@components/BaseItemComponent';
import logger from './logger';

/**
 * Item searcher utility for finding items in collections
 * Provides reusable logic for searching items by name across pages and components
 */
export class ItemSearcher {
  /**
   * Find an item by its name from a collection of items
   * @param items - Array of items to search through
   * @param name - Name or partial name of the item to find
   * @returns Item if found, null otherwise
   */
  static async findByName<T extends BaseItemComponent>(
    items: T[],
    name: string
  ): Promise<T | null> {
    logger.debug(`Searching for item with name: ${name}`);

    for (const item of items) {
      const itemName = await item.getItemName();
      if (itemName?.includes(name)) {
        logger.debug(`Item found: ${itemName}`);
        return item;
      }
    }

    logger.warn(`Item not found: ${name}`);
    return null;
  }

  /**
   * Find multiple items by a partial name pattern
   * @param items - Array of items to search through
   * @param namePattern - Partial name pattern to match
   * @returns Array of matching items (empty array if none found)
   */
  static async findAllByName<T extends BaseItemComponent>(
    items: T[],
    namePattern: string
  ): Promise<T[]> {
    logger.debug(`Searching for all items matching: ${namePattern}`);

    const foundItems: T[] = [];
    for (const item of items) {
      const itemName = await item.getItemName();
      if (itemName?.includes(namePattern)) {
        foundItems.push(item);
      }
    }

    logger.debug(`Found ${foundItems.length} items matching: ${namePattern}`);
    return foundItems;
  }
}
