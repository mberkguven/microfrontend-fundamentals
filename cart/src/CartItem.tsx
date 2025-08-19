import React from "react";
// @ts-ignore
import { useStore } from "host/store";
import type { CartItem } from "../../types";
import { formatPrice } from "../../helpers";

type Props = {
  item: CartItem;
};

export default function CartItem({ item }: Props) {
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeFromCart = useStore((s) => s.removeFromCart);
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-brand text-white hover:bg-brand-dark transition"
          onClick={() =>
            updateQuantity(item.id, Math.max(0, item.quantity - 1))
          }
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-brand text-white hover:bg-brand-dark transition"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
