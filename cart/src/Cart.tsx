import React from "react";
// @ts-ignore
import { useStore } from "host/store";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./index.css";

export default function Cart() {
  const items = useStore((s) => s.cart.items);
  return (
    <div>
      <div className="space-y-2">
        {items.length === 0 && (
          <div className="text-gray-500">Your cart is empty.</div>
        )}
        {items.map((item: any) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
