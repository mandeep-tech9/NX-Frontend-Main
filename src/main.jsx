import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // optional - make sure this exists or remove import
import { ThemeProvider } from "./context/Themecontext";
const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("Could not find #root element in index.html");
} else {
  createRoot(rootEl).render(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
