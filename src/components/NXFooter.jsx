// src/components/NXFooter.jsx
import React from "react";

const logoSrc = "/assets/tech9labs_logo.png";

export default function NXFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(15,23,42,0.06)",
        padding: "24px 0",
        marginTop: 32,
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logoSrc}
        alt="logo"
        style={{
          height: 40,
          borderRadius: 6,
          background: "#fff",
          padding: 6,
          boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
        }}
      />

      <div>
        <div style={{ fontWeight: 800 }}>NX-Desk</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          © {new Date().getFullYear()} Tech9 Labs • All rights reserved
        </div>
      </div>
    </footer>
  );
}
