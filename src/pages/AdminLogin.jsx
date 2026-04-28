import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.token && data.role === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/admin-dashboard");
      } else if (data.token) {
        setError("Access denied. Admin credentials required.");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("Server unreachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => e.key === "Enter" && handleLogin();

  return (
    <div className="min-h-screen flex bg-slate-950">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-slate-900 border-r border-slate-800 p-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-sm font-bold">NX</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">NX-Desk</span>
        </div>

        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6">
            <ShieldCheck size={22} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
            Admin control<br />centre
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Restricted access. Manage users, roles, and workspace configuration from one place.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { label: "User management", sub: "Create and manage workspace accounts" },
            { label: "Role permissions", sub: "Control module-level access per user" },
            { label: "Audit logs", sub: "Full activity history across the platform" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-slate-500 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-xs">v1.0 · NX Workspace · Admin Portal</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">NX</span>
            </div>
            <span className="text-white font-semibold">NX-Desk Admin</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-1">Admin sign in</h2>
            <p className="text-slate-400 text-sm">Restricted to authorised administrators only.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-950 border border-red-800 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-slate-400 text-xs font-medium mb-1.5 tracking-wide">Email address</label>
            <input
              type="email"
              placeholder="admin@company.com"
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKey}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-slate-400 text-xs font-medium mb-1.5 tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••••"
                className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onKeyDown={handleKey}
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300 transition"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading || !form.email || !form.password}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <KeyRound size={15} />
                Sign in as admin
              </>
            )}
          </button>

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-slate-500 text-xs hover:text-slate-300 transition"
            >
              ← Back to user login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}