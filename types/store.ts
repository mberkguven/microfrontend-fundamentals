import type { Product } from "./product";
import type { CartItem } from "./cart";

export type Store = {
  products: Product[];
  cart: {
    items: CartItem[];
    total: number;
  };
  setProducts: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};
