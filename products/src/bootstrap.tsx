import React from "react";
import { createRoot } from "react-dom/client";
import ProductList from "./ProductList";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.Suspense fallback={<div>Loading…</div>}>
      <ProductList />
    </React.Suspense>
  );
}
