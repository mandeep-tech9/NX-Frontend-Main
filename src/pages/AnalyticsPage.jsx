// src/pages/AnalyticsPage.jsx
import React from "react";

const AnalyticsPage = () => {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ background: "#fff", padding: 18, borderRadius: 12, border: "1px solid rgba(15,23,42,0.06)" }}>
        <div style={{ fontWeight: 800 }}>Data Analytics Agent</div>
        <div style={{ marginTop: 8, color: "#6b7280" }}>
          Place analytics dashboards, charts, and data connectors here.
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
