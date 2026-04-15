// src/layouts/MainLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/routesConfig";

export default function MainLayout() {
  return (
    <div className="app-container">
      <style>{`
        .app-container {
          display: flex;
          height: 100vh;
          font-family: Inter, sans-serif;
          background: #f8fafc;
        }

        .sidebar {
          width: 240px;
          background: #0f172a;
          color: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-weight: 800;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .menu-item {
          padding: 12px 14px;
          border-radius: 10px;
          margin-bottom: 8px;
          color: #cbd5f5;
          text-decoration: none;
          display: block;
          transition: 0.2s;
        }

        .menu-item:hover {
          background: rgba(255,255,255,0.08);
        }

        .menu-item.active {
          background: #0ea5e9;
          color: white;
        }

        .content {
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }

        .topbar {
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 18px;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">NX-Desk</div>
        {ROUTES.map((item) => (
          <NavLink
            key={item.path}
            to={`/${item.path}`}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </aside>

      {/* Content */}
      <main className="content">
        <div className="topbar">Workspace</div>
        <Outlet />
      </main>
    </div>
  );
}
