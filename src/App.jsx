import React from "react";
import NXHeader from "./components/NXHeader";
import NXFooter from "./components/NXFooter";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./routes/routesConfig";
import DynamicPage from "./pages/DynamicPage";

export default function App() {
  return (
    <div>
      <NXHeader />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            {/* Default route */}
            <Route index element={<Navigate to="/dashboard" />} />

            {/* Dynamic routes */}
            {ROUTES.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            {/* Catch unknown routes */}
            <Route path=":slug" element={<DynamicPage />} />

          </Route>
        </Routes>
      </div>

      <NXFooter />
    </div>
  );
}