import type { CartItem } from "../types";

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((acc, i) => acc + i.quantity, 0);
}
