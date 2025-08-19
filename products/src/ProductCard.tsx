import React from "react";
// @ts-ignore
import { useStore } from "host/store";
import type { Product } from "../../types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useStore((s) => s.addToCart);
  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-lg shadow-card border border-slate-800 p-4 flex items-center justify-between">
      <div>
        <div className="font-medium">{product.name}</div>
        <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
      </div>
      <button
        className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-brand text-white hover:bg-brand-dark transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
