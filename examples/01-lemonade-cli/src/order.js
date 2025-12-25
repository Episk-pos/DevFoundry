/**
 * Order processing logic
 *
 * This module handles creating orders and calculating totals.
 * It demonstrates the Processing part of Input → Processing → Output.
 */

const { findItem } = require('./menu');

/**
 * Create an order item
 * @param {number} itemId - The menu item ID
 * @param {number} quantity - How many to order
 * @returns {object|null} Order item with calculated subtotal, or null if invalid
 */
function createOrderItem(itemId, quantity) {
  const menuItem = findItem(itemId);

  if (!menuItem) {
    return null; // Item not found
  }

  if (quantity < 1) {
    return null; // Invalid quantity
  }

  return {
    name: menuItem.name,
    price: menuItem.price,
    quantity: quantity,
    subtotal: menuItem.price * quantity
  };
}

/**
 * Calculate the total for all order items
 * @param {array} orderItems - Array of order items
 * @returns {number} The total price
 */
function calculateTotal(orderItems) {
  return orderItems.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Apply discount if total exceeds threshold
 * @param {number} total - The order total
 * @param {number} threshold - Minimum for discount (default $10)
 * @param {number} discountPercent - Discount percentage (default 10%)
 * @returns {object} Object with discount amount and final total
 */
function applyDiscount(total, threshold = 10, discountPercent = 10) {
  if (total >= threshold) {
    const discount = total * (discountPercent / 100);
    return {
      discount: discount,
      finalTotal: total - discount,
      applied: true
    };
  }

  return {
    discount: 0,
    finalTotal: total,
    applied: false
  };
}

module.exports = { createOrderItem, calculateTotal, applyDiscount };
