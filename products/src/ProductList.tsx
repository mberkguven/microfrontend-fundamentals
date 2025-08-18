import React from 'react';
// @ts-ignore
import { useStore } from 'host/store';
import ProductCard from './ProductCard';
import './index.css';

export default function ProductList() {
  const products = useStore((s) => s.products);
  return (
    <div className="space-y-3">
      {products.map((p: any) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


