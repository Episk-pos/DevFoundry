/**
 * Lemonade Stand CLI - Main Entry Point
 *
 * This is the first file that runs when you start the program.
 * It coordinates between the other modules:
 * - menu.js: What items are available
 * - order.js: How to process orders
 * - display.js: How to show output
 *
 * Run with: node src/index.js [item1:qty] [item2:qty] ...
 * Example: node src/index.js 1:2 4:1
 *          (Orders 2 Lemonades and 1 Cookie)
 */

const { createOrderItem, calculateTotal, applyDiscount } = require('./order');
const { showWelcome, showMenu, showOrderSummary, showError, showGoodbye } = require('./display');

/**
 * Parse command line arguments into order items
 * Format: itemId:quantity (e.g., "1:2" means 2 of item #1)
 * @param {array} args - Command line arguments
 * @returns {array} Array of {itemId, quantity} objects
 */
function parseArguments(args) {
  return args.map(arg => {
    const [itemId, quantity] = arg.split(':').map(Number);
    return { itemId, quantity };
  });
}

/**
 * Main program function
 * Orchestrates the entire order flow
 */
function main() {
  // Get command line arguments (skip 'node' and 'index.js')
  const args = process.argv.slice(2);

  // Always show welcome and menu
  showWelcome();
  showMenu();

  // If no arguments, show usage and exit
  if (args.length === 0) {
    console.log("=== HOW TO ORDER ===\n");
    console.log("  node src/index.js [item:qty] [item:qty] ...\n");
    console.log("  Example: node src/index.js 1:2 4:1");
    console.log("           (Orders 2 Lemonades and 1 Cookie)\n");
    showGoodbye();
    return;
  }

  // Parse the order from command line
  const orderRequests = parseArguments(args);

  // Process each order request
  const orderItems = [];
  for (const request of orderRequests) {
    const item = createOrderItem(request.itemId, request.quantity);

    if (item === null) {
      showError(`Invalid order: item ${request.itemId} with quantity ${request.quantity}`);
      continue;
    }

    orderItems.push(item);
  }

  // Calculate totals
  const subtotal = calculateTotal(orderItems);
  const { discount, finalTotal, applied } = applyDiscount(subtotal);

  // Display the order summary
  showOrderSummary(orderItems, {
    subtotal,
    discount,
    finalTotal,
    discountApplied: applied
  });

  showGoodbye();
}

// Run the program
main();
