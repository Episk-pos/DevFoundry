/**
 * Menu data for the lemonade stand
 *
 * This module exports the available items and their prices.
 * Separating data from logic makes the code easier to modify.
 */

const menu = [
  { id: 1, name: "Lemonade", price: 2.50, description: "Classic fresh-squeezed" },
  { id: 2, name: "Pink Lemonade", price: 3.00, description: "With a hint of raspberry" },
  { id: 3, name: "Strawberry Lemonade", price: 3.50, description: "Blended with real strawberries" },
  { id: 4, name: "Cookie", price: 1.50, description: "Fresh-baked chocolate chip" },
];

/**
 * Find a menu item by its ID
 * @param {number} id - The item ID to find
 * @returns {object|undefined} The menu item or undefined if not found
 */
function findItem(id) {
  return menu.find(item => item.id === id);
}

/**
 * Get all menu items
 * @returns {array} All menu items
 */
function getAllItems() {
  return menu;
}

// Export functions for use in other files
module.exports = { findItem, getAllItems };
