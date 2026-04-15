// src/components/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Database,
  MessageSquare,
} from "lucide-react";

const CATEGORIES = [
  { name: "Sales", icon: FileText, color: "#0ea5e9", disabled: false },
  { name: "Operations", icon: Database, color: "#d1d5db", disabled: true },
  { name: "Support", icon: MessageSquare, color: "#d1d5db", disabled: true },
];

const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      <style>{`
        .landing-root {
          max-width: 1250px;
          margin: 0 auto;
          padding: 40px 26px 100px;
          font-family: "IBM Plex Sans", Inter, system-ui, sans-serif;
          color: #0f172a;
        }

        .landing-grid {
          margin-top: 28px;
          display: grid;
          gap: 34px;
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 720px) {
          .landing-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (min-width: 1060px) {
          .landing-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .category-card {
          background: #fff;
          padding: 26px;
          border-radius: 16px;
          border: 1px solid rgba(15,23,42,0.06);
          box-shadow: 0 10px 26px rgba(15,23,42,0.06);
          transition: all .18s ease;
          min-height: 165px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .category-card:hover {
          transform: translateY(-6px);
          border-color: rgba(14,165,233,0.25);
          box-shadow: 0 28px 60px rgba(15,23,42,0.13);
        }

        .category-top {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-start;
        }

        .category-left {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .icon-pill {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 24px rgba(0,0,0,0.05);
        }

        .category-name {
          font-weight: 800;
          font-size: 16px;
        }

        .category-sub {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }

        .category-open {
          color: #6b7280;
          font-size: 14px;
          font-weight: 700;
        }

        .category-desc {
          margin-top: 14px;
          font-size: 13px;
          line-height: 1.45;
          color: #6b7280;
        }

        .landing-note {
          margin-top: 40px;
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
        }
      `}</style>

      {/* Grid */}
      <section className="landing-grid" aria-label="Category selection">
        {CATEGORIES.map(({ name, icon: Icon, color, disabled }) => (
          <article
            key={name}
            className="category-card"
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={() => !disabled && navigate(`/category/${slugify(name)}`)}
            style={{
              opacity: disabled ? 0.45 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
              pointerEvents: disabled ? "none" : "auto",
            }}
          >
            <div>
              <div className="category-top">
                <div className="category-left">
                  <div
                    className="icon-pill"
                    style={{ background: disabled ? "#e5e7eb" : color }}
                  >
                    <Icon size={24} color={disabled ? "#9ca3af" : "#fff"} />
                  </div>

                  <div>
                    <div className="category-name">{name}</div>
                    <div className="category-sub">
                      {disabled
                        ? "Coming soon"
                        : `Manage ${name.toLowerCase()} workflows`}
                    </div>
                  </div>
                </div>

                {!disabled && <div className="category-open">Open →</div>}
              </div>

              <div className="category-desc">
                {disabled
                  ? `${name} workspace will be available soon.`
                  : `Click to open the ${name} workspace.`}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
