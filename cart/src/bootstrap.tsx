import React from "react";
import { createRoot } from "react-dom/client";
import Cart from "./Cart";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.Suspense fallback={<div>Loading…</div>}>
      <Cart />
    </React.Suspense>
  );
}
