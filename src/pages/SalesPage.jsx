import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Zap, TrendingUp, Clock, CheckCircle2, BarChart2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────
const agents = [
  {
    id: 1,
    initials: "PG",
    name: "Proposal Generator",
    desc: "AI-powered PSO proposals for client requirements, concise and detailed versions.",
    version: "v2.1.0",
    status: "live",
    runs: 0,
    successRate: 0,
    avgTime: "0",
    url: "https://nutanix-pso-app.azurewebsites.net",
    category: "Proposals",
  },
  {
    id: 2,
    initials: "QG",
    name: "Quote Generator",
    desc: "Automated Nutanix pricing and quote assembly from product configurations.",
    version: "v1.4.0",
    status: "live",
    runs: 0,
    successRate: 0,
    avgTime: "0",
    url: "#",
    category: "Pricing",
  },
  {
    id: 3,
    initials: "OA",
    name: "Outreach AI",
    desc: "Personalised email drafting for cold outreach and follow-up sequences.",
    version: "v1.0.2",
    status: "live",
    runs: 0,
    successRate: 0,
    avgTime: "0",
    url: "#",
    category: "Outreach",
  },
  {
    id: 4,
    initials: "LD",
    name: "Lead Enrichment",
    desc: "Enriches CRM contacts with firmographic and technographic data automatically.",
    version: "v0.9.1",
    status: "draft",
    runs: 0,
    successRate: 0,
    avgTime: "0",
    url: "#",
    category: "CRM",
  },
];

const chartData = [
  { day: "Mon", runs: 0 },
  { day: "Tue", runs: 0 },
  { day: "Wed", runs: 0 },
  { day: "Thu", runs: 0 },
  { day: "Fri", runs: 0 },
  { day: "Sat", runs: 0 },
  { day: "Sun", runs: 0 },
];

const TEAL = "#0F6E56";
const AMBER = "#BA7517";

const STATUS_STYLE = {
  live:  "bg-teal-50 text-teal-700 border border-teal-200",
  draft: "bg-amber-50 text-amber-700 border border-amber-200",
};

const CATEGORY_COLORS = {
  Proposals: "bg-teal-50 text-teal-700",
  Pricing:   "bg-sky-50 text-sky-700",
  Outreach:  "bg-purple-50 text-purple-700",
  CRM:       "bg-amber-50 text-amber-700",
};

const INITIALS_BG = {
  PG: "bg-teal-600",
  QG: "bg-sky-600",
  OA: "bg-purple-600",
  LD: "bg-amber-600",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-background border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className="font-semibold text-gray-800">{payload[0].value} runs</p>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────
export default function SalesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Open the agent inside the main layout via AgentViewer (iframe)
  // Falls back to /login if no token found
  const handleOpen = (url, title = "Agent") => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/agent?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
  };

  const totalRuns = agents.reduce((s, a) => s + a.runs, 0);
  const avgSuccess = Math.round(agents.reduce((s, a) => s + a.successRate, 0) / agents.length);
  const liveCount = agents.filter((a) => a.status === "live").length;

  return (
    <div className="space-y-6 text-gray-800">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Sales</h1>
          <p className="text-sm text-gray-400 mt-0.5">{liveCount} agents live · workspace tools for your sales team</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs text-teal-600 font-medium">{liveCount} live</span>
        </div>
      </div>

      {/* ── KPI strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total runs", value: totalRuns, icon: <Zap size={15} />, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Avg success", value: `${avgSuccess}%`, icon: <CheckCircle2 size={15} />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active agents", value: liveCount, icon: <TrendingUp size={15} />, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Avg latency", value: "0", icon: <Clock size={15} />, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((k) => (
          <div key={k.label} className="bg-background rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-8 h-8 rounded-xl ${k.bg} ${k.color} flex items-center justify-center mb-3`}>
              {k.icon}
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{k.label}</p>
            <p className="text-xl font-semibold text-gray-900">{k.value}</p>
          </div>
        ))}
      </div>

      {/* ── Agent grid + chart ── */}
      <div className="bg-card text-card-foreground border border-border rounded-lg grid grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Agent cards — 2/3 width */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelected(selected?.id === agent.id ? null : agent)}
              className={`bg-background rounded-2xl border transition-all cursor-pointer group ${
                selected?.id === agent.id
                  ? "border-teal-400 shadow-md ring-1 ring-teal-400/30"
                  : "border-gray-100 shadow-sm hover:shadow-md hover:border-border"
              }`}
            >
              <div className="p-5">
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${INITIALS_BG[agent.initials]} text-white flex items-center justify-center text-sm font-semibold shadow-sm`}>
                    {agent.initials}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[agent.status]}`}>
                      {agent.status === "live" ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Name + desc */}
                <p className="font-semibold text-gray-900 text-sm mb-1">{agent.name}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{agent.desc}</p>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><BarChart2 size={11} />{agent.runs} runs</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={11} className="text-teal-500" />{agent.successRate}%</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{agent.avgTime}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[agent.category]}`}>
                    {agent.category}
                  </span>
                  {agent.status === "live" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpen(agent.url, agent.name); }}
                      className="bg-primary text-primary-foreground hover:opacity-90 flex items-center gap-1 text-xs text-teal-600 font-medium hover:text-teal-700 transition-colors"
                    >
                      Open <ExternalLink size={11} />
                    </button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                    style={{ width: `${agent.successRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column — chart + selected detail */}
        <div className="flex flex-col gap-4">

          {/* Weekly chart */}
          <div className="bg-background rounded-2xl border border-gray-100 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">Weekly runs</p>
                <p className="text-xs text-gray-400 mt-0.5">All agents combined</p>
              </div>
              <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">This week</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData} barSize={18}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0fdf4" }} />
                <Bar dataKey="runs" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={i === 4 ? TEAL : "#e5e7eb"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Selected agent detail panel */}
          {selected ? (
            <div className="bg-background rounded-2xl border border-teal-200 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-xl ${INITIALS_BG[selected.initials]} text-white flex items-center justify-center text-sm font-semibold`}>
                  {selected.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.version}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{selected.desc}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Runs", value: selected.runs },
                  { label: "Success", value: `${selected.successRate}%` },
                  { label: "Avg time", value: selected.avgTime },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{s.value}</p>
                  </div>
                ))}
              </div>
              {selected.status === "live" && (
                <button
                  onClick={() => handleOpen(selected.url, selected.name)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  Open agent <ExternalLink size={13} />
                </button>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border border-dashed border-border p-5 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-mutedflex items-center justify-center">
                <Zap size={15} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-400">Click an agent card to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}