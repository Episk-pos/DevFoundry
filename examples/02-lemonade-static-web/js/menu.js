/**
 * Menu data module for Lemonade Stand
 *
 * This file contains the menu items and helper functions.
 * In the browser, this creates a global `Menu` object.
 */

const Menu = (function() {
  // The menu data - same structure as CLI version
  const items = [
    {
      id: 1,
      name: "Lemonade",
      price: 2.50,
      description: "Classic fresh-squeezed"
    },
    {
      id: 2,
      name: "Pink Lemonade",
      price: 3.00,
      description: "With a splash of raspberry"
    },
    {
      id: 3,
      name: "Lavender Lemonade",
      price: 3.50,
      description: "Infused with lavender"
    },
    {
      id: 4,
      name: "Chocolate Chip Cookie",
      price: 1.50,
      description: "Fresh baked"
    }
  ];

  /**
   * Find a menu item by its ID
   * @param {number} id - The item ID
   * @returns {object|null} - The menu item or null if not found
   */
  function findItem(id) {
    return items.find(item => item.id === id) || null;
  }

  /**
   * Get all menu items
   * @returns {array} - Array of all menu items
   */
  function getAllItems() {
    return items;
  }

  // Public API
  return {
    findItem,
    getAllItems
  };
})();
