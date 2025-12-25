/**
 * Menu data module for Lemonade Stand
 *
 * This file contains the menu items and helper functions.
 * Note how types are imported and used throughout.
 */

import { MenuItem } from "./types";

/**
 * The menu data
 * Type annotation ensures each item has the correct shape
 */
const items: MenuItem[] = [
  {
    id: 1,
    name: "Lemonade",
    price: 2.5,
    description: "Classic fresh-squeezed",
  },
  {
    id: 2,
    name: "Pink Lemonade",
    price: 3.0,
    description: "With a splash of raspberry",
  },
  {
    id: 3,
    name: "Lavender Lemonade",
    price: 3.5,
    description: "Infused with lavender",
  },
  {
    id: 4,
    name: "Chocolate Chip Cookie",
    price: 1.5,
    description: "Fresh baked",
  },
];

/**
 * Find a menu item by its ID
 *
 * @param id - The item ID to find
 * @returns The menu item, or null if not found
 *
 * Note: The return type `MenuItem | null` explicitly tells AI
 * that this function might not find the item, and calling code
 * must handle that case.
 */
export function findItem(id: number): MenuItem | null {
  const item = items.find((item) => item.id === id);
  return item ?? null; // Convert undefined to null for consistency
}

/**
 * Get all menu items
 *
 * @returns Array of all menu items (readonly to prevent modification)
 */
export function getAllItems(): readonly MenuItem[] {
  return items;
}
