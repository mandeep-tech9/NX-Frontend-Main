import React, { useState } from "react";
import {
  Bot,
  FileText,
  MessageSquare,
  BarChart,
  Code,
  Database,
  Mail,
  Calendar,
  Shield,
  Filter,
  X,
  Search,
} from "lucide-react";

/**
 * NX-Desk Professional 3x3 grid (updated)
 * - Proposal Generator now redirects to the provided URL
 * - url field added to agents
 */
const logoSrc = "public/assets/tech9labs_logo.png";

const NXDesk = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const agents = [
    {
      id: 1,
      name: "Proposal Generator",
      description: "AI-powered proposal generation for client requirements and business documents",
      icon: FileText,
      category: "Sales",
      version: "v2.1.0",
      status: "active",
      color: "#0ea5e9",
      url: "https://nutanix-pso-app.azurewebsites.net", // <-- redirect target
    },
    {
      id: 2,
      name: "Document Analyzer",
      description: "Intelligent document processing, analysis and insights extraction",
      icon: Database,
      category: "Operations",
      version: "v1.8.2",
      status: "active",
      color: "#10b981",
    },
    {
      id: 3,
      name: "Customer Support Bot",
      description: "24/7 automated customer service assistant with multi-language support",
      icon: MessageSquare,
      category: "Support",
      version: "v3.0.1",
      status: "active",
      color: "#8b5cf6",
    },
    {
      id: 4,
      name: "Data Analytics Agent",
      description: "Advanced data insights, reporting and predictive analytics",
      icon: BarChart,
      category: "Analytics",
      version: "v2.5.0",
      status: "active",
      color: "#f59e0b",
    },
    {
      id: 5,
      name: "Code Assistant",
      description: "AI-powered coding assistance, code review and optimization",
      icon: Code,
      category: "Development",
      version: "v1.9.5",
      status: "active",
      color: "#6366f1",
    },
    {
      id: 6,
      name: "Email Automation",
      description: "Intelligent email drafting, management and automation workflows",
      icon: Mail,
      category: "Communication",
      version: "v2.2.1",
      status: "active",
      color: "#ef4444",
    },
    {
      id: 7,
      name: "Meeting Scheduler",
      description: "Smart calendar management, scheduling and conflict resolution",
      icon: Calendar,
      category: "Productivity",
      version: "v1.5.0-beta",
      status: "beta",
      color: "#14b8a6",
    },
    {
      id: 8,
      name: "Security Auditor",
      description: "Automated security compliance checking and vulnerability assessment",
      icon: Shield,
      category: "Security",
      version: "v2.0.3",
      status: "active",
      color: "#eab308",
    },
  ];

  const categories = ["all", ...new Set(agents.map((a) => a.category))];

  const filteredAgents = agents.filter((agent) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      agent.name.toLowerCase().includes(q) ||
      agent.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAgentClick = (agent) => {
    // If agent has an explicit URL, redirect to it
    if (agent.url) {
      // replace the current page with the target
      window.location.href = agent.url;
      return;
    }

    // fallback behavior
    alert(`Navigating to ${agent.name}...\n\nIn production this would redirect to the agent's auth/page.`);
  };

  return (
    <div
      className="nxdesk-root"
      style={{ fontFamily: '"IBM Plex Sans", Inter, system-ui, Roboto, sans-serif', minHeight: "100vh", background: "#f3f4f6" }}
    >
      <style>{`
        .nxdesk-header { background: linear-gradient(180deg,#ffffffee,#ffffff); border-bottom:1px solid rgba(15,23,42,0.06); position:sticky; top:0; z-index:40; }
        .nxdesk-header-inner { max-width:1200px; margin:0 auto; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .nxdesk-brand { display:flex; align-items:center; gap:12px; }
        .nxdesk-logo {
          height: 20px;
          width: auto;
          object-fit: contain;
          border-radius: 8px;
          padding: 0;
          background: none;
          box-shadow: none;
        }

        .nxdesk-title { font-size:20px; font-weight:800; margin:0; color:#0f172a; }
        .nxdesk-subtitle { font-size:13px; color:#6b7280; margin-top:2px; }

        .controls { display:flex; gap:8px; align-items:center; }

        .btn { cursor:pointer; border-radius:10px; padding:10px 14px; font-weight:700; font-size:13px; border:1px solid rgba(15,23,42,0.06); background:#fff; color:#374151; transition:all .12s ease; display:flex; align-items:center; gap:8px; }
        .btn-ghost { background:#f9fafb; }
        .filters-panel { margin:14px auto 22px; padding:14px; background:#fff; border-radius:12px; border:1px solid rgba(15,23,42,0.06); box-shadow:0 10px 26px rgba(15,23,42,0.04); max-width:1200px; }
        .filter-row { display:flex; gap:12px; align-items:center; position:relative; }

        .search-input { flex:1; padding:12px 14px 12px 42px; border-radius:10px; border:1px solid rgba(15,23,42,0.06); background:#f3f4f6; font-size:14px; outline:none; }
        .categories { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
        .chip { padding:8px 12px; border-radius:999px; font-weight:700; font-size:12px; cursor:pointer; border:1px solid rgba(15,23,42,0.06); background:#f3f4f6; color:#374151; }
        .chip.active { background:#0ea5e9; color:white; box-shadow:0 6px 18px rgba(14,165,233,0.12); border:none; }

        .nxdesk-container { max-width:1200px; margin:18px auto; padding:0 24px 56px; }

        .agents-grid { display:grid; gap:20px; grid-template-columns: repeat(1, 1fr); }
        @media (min-width:720px) { .agents-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width:1060px) { .agents-grid { grid-template-columns: repeat(3, 1fr); } }

        .agent-card { background: linear-gradient(180deg, rgba(255,255,255,0.96), #fff); border-radius:14px; border:1px solid rgba(15,23,42,0.06); box-shadow:0 10px 26px rgba(15,23,42,0.06); padding:18px; display:flex; flex-direction:column; min-height:170px; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease; cursor:pointer; }
        .agent-card:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(15,23,42,0.12); border-color: rgba(14,165,233,0.3); }

        .agent-head { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .agent-icon { width:56px; height:56px; border-radius:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 22px rgba(0,0,0,0.04); }
        .agent-versions { display:flex; flex-direction:column; gap:6px; align-items:flex-end; }
        .badge { font-size:12px; padding:6px 10px; border-radius:8px; background: rgba(15,23,42,0.04); color:#374151; border:1px solid rgba(15,23,42,0.06); }

        .agent-body { margin-top:12px; flex:1; }
        .agent-title { margin:0; font-weight:800; font-size:16px; }
        .agent-desc { margin:10px 0 0; color:#6b7280; font-size:13px; line-height:1.5; min-height:40px; }

        .agent-footer { display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid rgba(15,23,42,0.04); padding-top:14px; }
        .status { display:flex; align-items:center; gap:8px; font-size:12px; color:#374151; }
        .dot { width:9px; height:9px; border-radius:999px; }

        .actions { display:flex; gap:8px; }
        .btn-sm { padding:8px 12px; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; border:1px solid rgba(15,23,42,0.06); background:#fff; }
        .btn-open { background:#0ea5e9; color:#fff; border:none; box-shadow:0 6px 18px rgba(14,165,233,0.14); }

        .nxdesk-footer { padding:22px 0; text-align:center; color:#6b7280; font-size:13px; margin-top:28px; background:transparent; border-top:1px solid rgba(15,23,42,0.04); display:flex; align-items:center; justify-content:center; gap:12px; }
        .footer-logo { height:36px; width:auto; object-fit:contain; border-radius:6px; background:#fff; padding:6px; box-shadow:0 6px 18px rgba(15,23,42,0.04); }

      `}</style>

      {/* Header */}
      <header className="nxdesk-header">
        <div className="nxdesk-header-inner">
          <div className="nxdesk-brand">
            <img src={logoSrc} alt="NX-Desk logo" className="nxdesk-logo" />
            <div>
              <h1 className="nxdesk-title">NX-Desk</h1>
              <div className="nxdesk-subtitle">AI Agent Management Portal</div>
            </div>
          </div>

          <div className="controls">
            <button
              className="btn btn-ghost"
              onClick={() => setShowFilters((s) => !s)}
              title="Toggle filters"
              aria-pressed={showFilters}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {showFilters ? <X size={14} /> : <Filter size={14} />} {showFilters ? "Close" : "Filter"}
            </button>
          </div>
        </div>
      </header>

      <main className="nxdesk-container">
        {/* Filters panel (collapsible) */}
        {showFilters && (
          <div className="filters-panel" role="region" aria-label="Filters">
            <div className="filter-row">
              <Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                className="search-input"
                placeholder="Search agents by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Categories</div>
              <div className="categories">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`chip ${selectedCategory === c ? "active" : ""}`}
                    onClick={() => setSelectedCategory(c)}
                    aria-pressed={selectedCategory === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agent Grid */}
        <section className="agents-grid" aria-live="polite">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <article
                key={agent.id}
                className="agent-card"
                onClick={() => handleAgentClick(agent)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAgentClick(agent);
                }}
              >
                <div className="agent-head">
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="agent-icon" style={{ background: agent.color }}>
                      <Icon size={22} color="#fff" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 800 }}>{agent.name}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{agent.category}</div>
                    </div>
                  </div>

                  <div className="agent-versions">
                    <span className="badge">{agent.version}</span>
                    {agent.status === "beta" && (
                      <span className="badge" style={{ background: "rgba(234,179,8,0.12)", color: "#b45309", border: "1px solid rgba(234,179,8,0.25)" }}>
                        BETA
                      </span>
                    )}
                  </div>
                </div>

                <div className="agent-body">
                  <h3 className="agent-title">{agent.name}</h3>
                  <p className="agent-desc">{agent.description}</p>
                </div>

                <div className="agent-footer">
                  <div className="status">
                    <span className="dot" style={{ background: agent.status === "active" ? "#34d399" : "#f59e0b" }} />
                    <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>{agent.status === "active" ? "Live" : agent.status.toUpperCase()}</div>
                  </div>

                  <div className="actions">
                    <button
                      className="btn-sm btn-open"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAgentClick(agent);
                      }}
                    >
                      Open →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredAgents.length === 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ background: "#fff", padding: 26, borderRadius: 12, border: "1px solid rgba(15,23,42,0.06)", textAlign: "center" }}>
              <Bot size={64} color="#cbd5e1" />
              <h4 style={{ marginTop: 12, fontSize: 16, color: "#6b7280" }}>No agents found</h4>
              <div style={{ color: "#9ca3af" }}>Try adjusting your search or filters</div>
            </div>
          </div>
        )}

        {/* Footer (fixed content, logo, attribution) */}
        <div style={{ height: 18 }} />
        <footer className="nxdesk-footer">
          <img src={logoSrc} alt="tech9labs logo" className="footer-logo" />
          <div>
            <div style={{ fontWeight: 700 }}>NX-Desk</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>© {new Date().getFullYear()} Tech9 Labs • All rights reserved</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NXDesk;
