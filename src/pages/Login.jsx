import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // Role-based redirect
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch {
      setError("Cannot reach server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => e.key === "Enter" && handleLogin();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #dbeafe 0%, transparent 50%), radial-gradient(circle at 75% 75%, #e0f2fe 0%, transparent 50%)",
        }}
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-md mx-4 z-10">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">NX</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 leading-tight">NX-Desk</div>
            <div className="text-xs text-gray-400 leading-tight">Workspace Portal</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Sign in to your workspace account.</p>

        {/* Microsoft SSO */}
        <button className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors mb-4 font-medium">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="0.5" y="0.5" width="7" height="7" fill="#F25022"/>
            <rect x="8.5" y="0.5" width="7" height="7" fill="#7FBA00"/>
            <rect x="0.5" y="8.5" width="7" height="7" fill="#00A4EF"/>
            <rect x="8.5" y="8.5" width="7" height="7" fill="#FFB900"/>
          </svg>
          Continue with Microsoft
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">or sign in with email</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKey}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="w-full pl-9 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={handleKey}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-xs mb-5">
          <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
            <input type="checkbox" className="accent-blue-600 rounded" />
            Remember me
          </label>
          <button className="text-blue-600 hover:underline font-medium">Forgot password?</button>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {loading ? "Signing in…" : "Sign in"}
        </button>

        {/* Admin portal link */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Administrator?{" "}
          <a href="/admin" className="text-blue-600 hover:underline font-medium">
            Go to admin portal →
          </a>
        </p>
      </div>
    </div>
  );
}