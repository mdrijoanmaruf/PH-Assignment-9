import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Route";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";
import { AuthContext } from "./Provider/AuthProvider";

const App = () => {
  const { authChecked } = useContext(AuthContext);

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
        <Toaster 
          position="top-right"
          toastOptions={{
            // Default options that apply to all toasts
            duration: 3000,
            style: {
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '350px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
