// src/components/NXHeader.jsx
import React from "react";
import { Link } from "react-router-dom";

const logoSrc = "/assets/tech9labs_logo.png";

export default function NXHeader() {
  return (
    <header
      style={{
        background: "linear-gradient(180deg,#ffffffee,#ffffff)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", display: "flex", gap: 12, alignItems: "center" }}
        >
          <img src={logoSrc} alt="NX-Desk logo" style={{ height: 32 }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>NX-Desk</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>AI Workspace Portal</div>
          </div>
        </Link>

        <Link
          to="/"
          style={{
            fontSize: 14,
            color: "#374151",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Home
        </Link>
      </div>
    </header>
  );
}
