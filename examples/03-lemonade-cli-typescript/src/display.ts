/**
 * Display module for Lemonade Stand
 *
 * Handles all terminal output.
 * Types ensure we only display valid data structures.
 */

import { MenuItem, OrderSummary } from "./types";

/**
 * Display welcome message
 */
export function showWelcome(): void {
  console.log("\n=== Welcome to the Lemonade Stand! ===\n");
}

/**
 * Display the menu
 *
 * @param items - Array of menu items to display
 *
 * The `readonly MenuItem[]` parameter means this function
 * promises not to modify the array.
 */
export function showMenu(items: readonly MenuItem[]): void {
  console.log("MENU:");
  console.log("-".repeat(40));

  for (const item of items) {
    console.log(`  ${item.id}. ${item.name} - $${item.price.toFixed(2)}`);
    console.log(`     ${item.description}`);
  }

  console.log("-".repeat(40));
}

/**
 * Display order summary
 *
 * @param summary - The complete order summary
 *
 * Because OrderSummary includes the discount metadata,
 * we can show contextual messages about discounts.
 */
export function showOrderSummary(summary: OrderSummary): void {
  console.log("\n=== YOUR ORDER ===\n");

  // Show each item
  for (const item of summary.items) {
    const itemLine = `${item.name} x${item.quantity}`;
    const priceLine = `$${item.subtotal.toFixed(2)}`;
    console.log(`${itemLine.padEnd(30)} ${priceLine}`);
  }

  console.log("-".repeat(40));

  // Show subtotal
  console.log(`${"Subtotal".padEnd(30)} $${summary.subtotal.toFixed(2)}`);

  // Show discount (or hint about it)
  if (summary.discount.applied) {
    const discountLine = `Discount (${summary.discount.percent}% off)`;
    console.log(
      `${discountLine.padEnd(30)} -$${summary.discount.amount.toFixed(2)}`
    );
  } else {
    const remaining = summary.discount.threshold - summary.subtotal;
    console.log(
      `  (Add $${remaining.toFixed(2)} more for ${summary.discount.percent}% off!)`
    );
  }

  console.log("-".repeat(40));

  // Show total
  console.log(`${"TOTAL".padEnd(30)} $${summary.total.toFixed(2)}`);

  console.log("\nThank you for your order!\n");
}

/**
 * Display an error message
 *
 * @param message - The error message to display
 */
export function showError(message: string): void {
  console.error(`\nError: ${message}\n`);
}

/**
 * Display usage instructions
 */
export function showUsage(): void {
  console.log("Usage: npx ts-node src/index.ts <id:quantity> [id:quantity...]");
  console.log("");
  console.log("Examples:");
  console.log("  npx ts-node src/index.ts 1:2       # 2 Lemonades");
  console.log("  npx ts-node src/index.ts 1:2 4:1   # 2 Lemonades, 1 Cookie");
  console.log("");
}
