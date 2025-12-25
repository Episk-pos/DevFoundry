/**
 * Order processing module for Lemonade Stand
 *
 * Handles creating order items and calculating totals.
 * Notice how types make the function contracts explicit.
 */

import { MenuItem, OrderItem, DiscountResult, OrderSummary } from "./types";
import { findItem } from "./menu";

// Configuration - could be loaded from environment or config file
const DISCOUNT_THRESHOLD = 10;
const DISCOUNT_PERCENT = 10;

/**
 * Create an order item from a menu item and quantity
 *
 * @param menuItem - The menu item to order
 * @param quantity - How many to order
 * @returns A complete order item with calculated subtotal
 */
export function createOrderItem(
  menuItem: MenuItem,
  quantity: number
): OrderItem {
  return {
    id: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    quantity: quantity,
    subtotal: menuItem.price * quantity,
  };
}

/**
 * Calculate the subtotal for an array of order items
 *
 * @param items - The order items
 * @returns The sum of all subtotals
 */
export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Calculate discount based on subtotal
 *
 * @param subtotal - The order subtotal
 * @returns Discount result with all relevant info
 *
 * The DiscountResult type includes both the discount amount AND
 * the metadata (threshold, percent, whether it was applied).
 * This makes it easy for display code to show relevant messages.
 */
export function calculateDiscount(subtotal: number): DiscountResult {
  const applied = subtotal >= DISCOUNT_THRESHOLD;
  const amount = applied ? subtotal * (DISCOUNT_PERCENT / 100) : 0;

  return {
    applied,
    percent: DISCOUNT_PERCENT,
    threshold: DISCOUNT_THRESHOLD,
    amount,
  };
}

/**
 * Process order items and calculate complete summary
 *
 * @param requestedItems - Array of {id, quantity} from parsed arguments
 * @returns Complete order summary, or null if any item is invalid
 *
 * This function returns OrderSummary | null. The null case happens
 * when an invalid menu item ID is requested. Calling code must
 * check for null before using the result.
 */
export function processOrder(
  requestedItems: Array<{ id: number; quantity: number }>
): OrderSummary | null {
  const orderItems: OrderItem[] = [];

  for (const request of requestedItems) {
    const menuItem = findItem(request.id);

    // If any item is not found, the whole order fails
    if (menuItem === null) {
      return null;
    }

    orderItems.push(createOrderItem(menuItem, request.quantity));
  }

  const subtotal = calculateSubtotal(orderItems);
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount.amount;

  return {
    items: orderItems,
    subtotal,
    discount,
    total,
  };
}
