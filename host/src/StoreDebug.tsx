import React from "react";
import { useStore } from "./store";

export default function StoreDebug() {
  const products = useStore((s) => s.products);
  const cart = useStore((s) => s.cart);

  const itemCount = cart.items.reduce((n, i) => n + i.quantity, 0);

  return (
    <div>
      <div className="text-sm font-semibold mb-2">Shared Store (Host)</div>
      <div className="text-sm text-gray-100 grid grid-cols-2 gap-2">
        <div>Products: {products.length}</div>
        <div>Cart Items: {itemCount}</div>
        <div className="col-span-2">Total: ${cart.total.toFixed(2)}</div>
      </div>
      <pre className="mt-2 text-xs bg-slate-900/70 backdrop-blur-md rounded-lg shadow-card border border-slate-800 p-2 overflow-auto max-h-96">
        {JSON.stringify({ products, cart }, null, 2)}
      </pre>
    </div>
  );
}
