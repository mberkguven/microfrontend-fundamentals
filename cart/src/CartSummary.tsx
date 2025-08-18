import React from 'react';
// @ts-ignore
import { useStore } from 'host/store';

export default function CartSummary() {
  const total = useStore((s) => s.cart.total);
  const items = useStore((s) => s.cart.items);
  return (
    <div className="mt-4">
      <div className="text-sm text-gray-600">Items: {items.reduce((acc, i) => acc + i.quantity, 0)}</div>
      <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
    </div>
  );
}


