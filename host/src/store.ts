import { create } from "zustand";
import type { Store } from "../../types";
import { calculateTotal } from "../../helpers";

const initializer = (set: any, get: any): Store => ({
  products: [
    { id: "1", name: "Wireless Mouse", price: 25 },
    { id: "2", name: "Mechanical Keyboard", price: 85 },
    { id: "3", name: "USB-C Hub", price: 45 },
    { id: "4", name: "Noise-cancelling Headphones", price: 199 },
  ],
  cart: {
    items: [],
    total: 0,
  },
  setProducts: (products) => set({ products }),
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.items.find((i) => i.id === product.id);
      const items = existing
        ? state.cart.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.cart.items, { ...product, quantity: 1 }];
      const total = calculateTotal(items);
      return { cart: { items, total } };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const items = state.cart.items.filter((i) => i.id !== id);
      const total = calculateTotal(items);
      return { cart: { items, total } };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const items = state.cart.items
        .map((i) => (i.id === id ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0);
      const total = calculateTotal(items);
      return { cart: { items, total } };
    }),
});

// Global singleton to ensure one store instance across host/remotes
// even if the module is evaluated multiple times in different graphs.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useStore =
  (globalThis as any).__MFE_STORE__ || create<Store>(initializer);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__MFE_STORE__ = useStore;

export type { Store };
