import React from "react";
// @ts-ignore
import { useStore } from "host/store";
import { formatPrice, getCartItemCount } from "../../helpers";

export default function CartSummary() {
  const total = useStore((s) => s.cart.total);
  const items = useStore((s) => s.cart.items);
  return (
    <div className="mt-4">
      <div className="text-sm text-gray-600">
        Items: {getCartItemCount(items)}
      </div>
      <div className="text-lg font-semibold">Total: ${formatPrice(total)}</div>
    </div>
  );
}
