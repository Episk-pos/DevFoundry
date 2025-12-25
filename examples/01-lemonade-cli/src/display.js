/**
 * Display functions for terminal output
 *
 * This module handles the Output part of Input → Processing → Output.
 * Separating display logic makes it easy to change how things look.
 */

const { getAllItems } = require('./menu');

/**
 * Display a welcome message
 */
function showWelcome() {
  console.log("\n🍋 Welcome to the Lemonade Stand! 🍋\n");
}

/**
 * Display the menu
 */
function showMenu() {
  console.log("=== MENU ===\n");

  const items = getAllItems();
  items.forEach(item => {
    console.log(`  ${item.id}. ${item.name} - $${item.price.toFixed(2)}`);
    console.log(`     ${item.description}\n`);
  });
}

/**
 * Display an order summary
 * @param {array} orderItems - The items in the order
 * @param {object} totals - Object with total, discount, finalTotal
 */
function showOrderSummary(orderItems, totals) {
  console.log("\n=== YOUR ORDER ===\n");

  if (orderItems.length === 0) {
    console.log("  (No items ordered)\n");
    return;
  }

  orderItems.forEach(item => {
    console.log(`  ${item.quantity}x ${item.name}`);
    console.log(`     $${item.price.toFixed(2)} each = $${item.subtotal.toFixed(2)}\n`);
  });

  console.log("---");
  console.log(`  Subtotal: $${totals.subtotal.toFixed(2)}`);

  if (totals.discountApplied) {
    console.log(`  Discount: -$${totals.discount.toFixed(2)} (10% off orders $10+)`);
  }

  console.log(`  TOTAL: $${totals.finalTotal.toFixed(2)}`);
  console.log("");
}

/**
 * Display an error message
 * @param {string} message - The error message
 */
function showError(message) {
  console.log(`\n❌ Error: ${message}\n`);
}

/**
 * Display a thank you message
 */
function showGoodbye() {
  console.log("Thank you for visiting the Lemonade Stand! 🍋\n");
}

module.exports = { showWelcome, showMenu, showOrderSummary, showError, showGoodbye };
