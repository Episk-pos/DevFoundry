/**
 * Type definitions for Lemonade Stand
 *
 * This file defines all the data shapes used in the application.
 * By centralizing types here:
 * - All modules share the same definitions
 * - AI has complete context about your data
 * - Changes to types are made in one place
 */

/**
 * A menu item available for purchase
 */
export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

/**
 * An item in a customer's order
 */
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

/**
 * Discount calculation result
 */
export interface DiscountResult {
  applied: boolean;
  percent: number;
  threshold: number;
  amount: number;
}

/**
 * Complete order summary with totals
 */
export interface OrderSummary {
  items: OrderItem[];
  subtotal: number;
  discount: DiscountResult;
  total: number;
}

/**
 * Parsed command-line arguments
 */
export interface ParsedArguments {
  items: Array<{
    id: number;
    quantity: number;
  }>;
}

/**
 * Result of parsing - either success with data or failure with error
 * This is a discriminated union - the 'success' field determines the shape
 */
export type ParseResult =
  | { success: true; data: ParsedArguments }
  | { success: false; error: string };
