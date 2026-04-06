import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/Authcontext";
import { WishlistProvider } from "./context/WishlistContext"; // Un-comment this!
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider> {/* Wrap it back! */}
        <RouterProvider router={router} />
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>
);