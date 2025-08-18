import React from "react";
import StoreDebug from "./StoreDebug";
import "./index.css";

// Remote components
// @ts-ignore
const ProductList = React.lazy(() => import("products/ProductList"));
// @ts-ignore
const Cart = React.lazy(() => import("cart/Cart"));

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-slate-800">
      <h1 className="text-2xl font-bold mb-4">
        Microfrontend Fundamentals Showcase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 backdrop-blur-md rounded-lg shadow-card border border-slate-800 p-4">
          <h2 className="text-xl font-semibold mb-3">Products</h2>
          <React.Suspense fallback={<div>Loading products…</div>}>
            <ProductList />
          </React.Suspense>
        </div>
        <div className="bg-slate-900/70 backdrop-blur-md rounded-lg shadow-card border border-slate-800 p-4">
          <h2 className="text-xl font-semibold mb-3">Cart</h2>
          <React.Suspense fallback={<div>Loading cart…</div>}>
            <Cart />
          </React.Suspense>
        </div>
      </div>
      <div className="bg-slate-900/70 backdrop-blur-md rounded-lg shadow-card border border-slate-800 p-4 mt-6">
        <StoreDebug />
      </div>
    </div>
  );
}
