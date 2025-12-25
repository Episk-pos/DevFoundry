/**
 * Lemonade Stand - TypeScript CLI Version
 *
 * Entry point that ties together all modules.
 * Notice how types flow through the entire application.
 */

import { ParseResult, ParsedArguments } from "./types";
import { getAllItems } from "./menu";
import { processOrder } from "./order";
import {
  showWelcome,
  showMenu,
  showOrderSummary,
  showError,
  showUsage,
} from "./display";

/**
 * Parse command-line arguments into order requests
 *
 * @param args - Raw command-line arguments (process.argv.slice(2))
 * @returns ParseResult - either success with data or failure with error
 *
 * This function returns a discriminated union. The caller must check
 * result.success before accessing result.data or result.error.
 * This pattern makes error handling explicit and type-safe.
 */
function parseArguments(args: string[]): ParseResult {
  if (args.length === 0) {
    return { success: false, error: "No items specified" };
  }

  const items: ParsedArguments["items"] = [];

  for (const arg of args) {
    // Expected format: "id:quantity" (e.g., "1:2" for 2 of item 1)
    const parts = arg.split(":");

    if (parts.length !== 2) {
      return {
        success: false,
        error: `Invalid format: "${arg}". Use id:quantity (e.g., 1:2)`,
      };
    }

    const id = parseInt(parts[0], 10);
    const quantity = parseInt(parts[1], 10);

    if (isNaN(id) || isNaN(quantity)) {
      return {
        success: false,
        error: `Invalid numbers in: "${arg}"`,
      };
    }

    if (quantity <= 0) {
      return {
        success: false,
        error: `Quantity must be positive: "${arg}"`,
      };
    }

    items.push({ id, quantity });
  }

  return { success: true, data: { items } };
}

/**
 * Main application entry point
 *
 * Orchestrates the flow:
 * 1. Show welcome and menu
 * 2. Parse arguments
 * 3. Process order
 * 4. Display result
 *
 * Note: This function has no return type annotation (void is implicit).
 * In a larger application, you might return an exit code.
 */
function main(): void {
  // Get command-line arguments (skip node and script path)
  const args = process.argv.slice(2);

  // Always show welcome and menu
  showWelcome();
  showMenu(getAllItems());

  // Parse arguments
  const parseResult = parseArguments(args);

  // Handle parse failure - TypeScript knows parseResult.error exists here
  if (!parseResult.success) {
    showError(parseResult.error);
    showUsage();
    process.exit(1);
  }

  // TypeScript now knows parseResult.success is true,
  // so parseResult.data is available
  const orderSummary = processOrder(parseResult.data.items);

  // Handle invalid menu items
  if (orderSummary === null) {
    showError("One or more items not found on menu");
    process.exit(1);
  }

  // Display the order
  showOrderSummary(orderSummary);
}

// Run the application
main();
