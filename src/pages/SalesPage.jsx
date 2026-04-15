// src/pages/SalesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SalesPage() {
  const navigate = useNavigate();

  const agent = {
    name: "Proposal Generator",
    description:
      "AI-powered proposal generation for client requirements and business documents.",
    version: "v2.1.0",
    status: "active",
    url: "https://nutanix-pso-app.azurewebsites.net",
    color: "#0ea5e9",
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "12px auto 80px",
        padding: "0 20px",
        fontFamily:
          '"IBM Plex Sans", Inter, system-ui, Roboto, sans-serif',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#f3f4f6",
          border: "1px solid rgba(15,23,42,0.08)",
          padding: "8px 14px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 700,
          color: "#374151",
          marginBottom: 16,
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 18,
          color: "#0f172a",
        }}
      >
        Sales • 1 agent
      </h2>

      {/* Card */}
      <article
        aria-labelledby="proposal-title"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.98), #fff)",
          borderRadius: 14,
          border: "1px solid rgba(15,23,42,0.06)",
          boxShadow: "0 20px 38px rgba(15,23,42,0.06)",
          padding: 26,
        }}
      >
        {/* Top content layout */}
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Left side: Icon + title */}
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
              minWidth: 0,
            }}
          >
            <div
              aria-hidden
              style={{
                width: 72,
                height: 72,
                borderRadius: 14,
                background: agent.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 22px rgba(0,0,0,0.06)",
                color: "#fff",
                fontWeight: 900,
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              AI
            </div>

            <div style={{ minWidth: 0 }}>
              <h2
                id="proposal-title"
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                {agent.name}
              </h2>

              <div style={{ marginTop: 6, color: "#9ca3af", fontSize: 13 }}>
                Sales
              </div>

              <p
                style={{
                  marginTop: 14,
                  color: "#6b7280",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {agent.description}
              </p>
            </div>
          </div>

          {/* Right side: version + live + open button */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  padding: "6px 10px",
                  borderRadius: 10,
                  background: "rgba(15,23,42,0.04)",
                  border: "1px solid rgba(15,23,42,0.06)",
                }}
              >
                {agent.version}
              </div>

              {agent.status === "active" && (
                <div
                  style={{
                    fontSize: 13,
                    padding: "6px 10px",
                    borderRadius: 10,
                    background: "rgba(16,185,129,0.12)",
                    color: "#059669",
                    border: "1px solid rgba(16,185,129,0.25)",
                    fontWeight: 700,
                  }}
                >
                  LIVE
                </div>
              )}
            </div>

            <button
              onClick={() => (window.location.href = agent.url)}
              style={{
                background: "#0ea5e9",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: 10,
                border: "none",
                fontWeight: 800,
                boxShadow: "0 8px 20px rgba(14,165,233,0.18)",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Open →
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            margin: "20px 0",
            border: "none",
            borderTop: "1px solid rgba(15,23,42,0.06)",
          }}
        />

        {/* Bottom line: status + metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#34d399",
                display: "inline-block",
              }}
            />
            <div style={{ color: "#6b7280", fontWeight: 700 }}>Live</div>

            <div
              style={{
                marginLeft: 10,
                color: "#9ca3af",
                fontSize: 13,
              }}
            >
              Supports creation of Nutanix PSO proposals, including concise overviews and comprehensive detailed versions.
            </div>
          </div>

          <div style={{ color: "#9ca3af", fontSize: 13 }}>
            Last updated: 2 days ago
          </div>
        </div>
      </article>
    </div>
  );
}
