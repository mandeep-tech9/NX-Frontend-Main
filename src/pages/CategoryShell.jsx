import React from "react";
import { useParams } from "react-router-dom";
import SalesPage from "./SalesPage";

export default function CategoryShell() {
  const { slug } = useParams();

  if (slug === "sales") return <SalesPage />;

  return (
    <div style={{ textAlign: "center", color: "#6b7280", paddingTop: 80 }}>
      No agents implemented for: {slug}
    </div>
  );
}
