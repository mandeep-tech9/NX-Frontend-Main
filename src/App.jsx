import React from "react";
import NXHeader from "./components/NXHeader";
import NXFooter from "./components/NXFooter";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./routes/routesConfig";
import DynamicPage from "./pages/DynamicPage";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/Adminusers";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <div>
      <NXHeader />

      <div style={{ minHeight: "80vh" }}>
        <Routes>

          {/* ── Public routes — no token needed ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* ── Admin-only route ── */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />

          {/* ── Protected main app — ALL child routes require login ── */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* All sidebar routes inherit the ProtectedRoute above */}
            {ROUTES.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}

            {/* Catch-all for dynamic pages */}
            <Route path=":slug" element={<DynamicPage />} />
          </Route>

          {/* Unknown paths → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>

      <NXFooter />
    </div>
  );
}