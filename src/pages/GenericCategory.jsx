// src/pages/GenericCategory.jsx
import React from "react";

const GenericCategory = ({ slug }) => {
  return (
    <div style={{ background: "#fff", padding: 18, borderRadius: 12, border: "1px solid rgba(15,23,42,0.06)" }}>
      <div style={{ fontWeight: 800, textTransform: "capitalize" }}>{slug.replace(/-/g, " ")}</div>
      <div style={{ marginTop: 8, color: "#6b7280" }}>This category page is scaffolded — add your custom code here.</div>
    </div>
  );
};

export default GenericCategory;
