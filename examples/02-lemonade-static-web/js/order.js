/**
 * Order processing module for Lemonade Stand
 *
 * Handles order state and calculations.
 * In the browser, this creates a global `Order` object.
 */

const Order = (function() {
  // The current order - array of order items
  let orderItems = [];

  // Discount configuration
  const DISCOUNT_THRESHOLD = 10; // Minimum order for discount
  const DISCOUNT_PERCENT = 10;   // Percentage off

  /**
   * Add an item to the order
   * @param {number} itemId - The menu item ID
   * @param {number} quantity - How many to add (default 1)
   * @returns {object|null} - The order item or null if item not found
   */
  function addItem(itemId, quantity = 1) {
    const menuItem = Menu.findItem(itemId);
    if (!menuItem) {
      return null;
    }

    // Check if item already in order
    const existingItem = orderItems.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
      return existingItem;
    }

    // Create new order item
    const orderItem = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: quantity,
      subtotal: menuItem.price * quantity
    };

    orderItems.push(orderItem);
    return orderItem;
  }

  /**
   * Remove one quantity of an item from the order
   * @param {number} itemId - The menu item ID
   * @returns {boolean} - True if item was removed
   */
  function removeItem(itemId) {
    const index = orderItems.findIndex(item => item.id === itemId);
    if (index === -1) {
      return false;
    }

    const item = orderItems[index];
    item.quantity -= 1;
    item.subtotal = item.quantity * item.price;

    // Remove completely if quantity is 0
    if (item.quantity <= 0) {
      orderItems.splice(index, 1);
    }

    return true;
  }

  /**
   * Get all items in the current order
   * @returns {array} - Array of order items
   */
  function getItems() {
    return orderItems;
  }

  /**
   * Calculate the subtotal (before discount)
   * @returns {number} - The subtotal
   */
  function calculateSubtotal() {
    return orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  /**
   * Calculate the discount amount
   * @returns {object} - { discount, applied }
   */
  function calculateDiscount() {
    const subtotal = calculateSubtotal();

    if (subtotal >= DISCOUNT_THRESHOLD) {
      return {
        discount: subtotal * (DISCOUNT_PERCENT / 100),
        applied: true,
        percent: DISCOUNT_PERCENT,
        threshold: DISCOUNT_THRESHOLD
      };
    }

    return {
      discount: 0,
      applied: false,
      percent: DISCOUNT_PERCENT,
      threshold: DISCOUNT_THRESHOLD
    };
  }

  /**
   * Calculate the final total
   * @returns {object} - { subtotal, discount, total, discountApplied }
   */
  function calculateTotal() {
    const subtotal = calculateSubtotal();
    const discountInfo = calculateDiscount();

    return {
      subtotal: subtotal,
      discount: discountInfo.discount,
      total: subtotal - discountInfo.discount,
      discountApplied: discountInfo.applied,
      discountPercent: discountInfo.percent,
      discountThreshold: discountInfo.threshold
    };
  }

  /**
   * Clear the entire order
   */
  function clear() {
    orderItems = [];
  }

  /**
   * Check if order is empty
   * @returns {boolean}
   */
  function isEmpty() {
    return orderItems.length === 0;
  }

  // Public API
  return {
    addItem,
    removeItem,
    getItems,
    calculateSubtotal,
    calculateDiscount,
    calculateTotal,
    clear,
    isEmpty
  };
})();
