import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut, ShieldCheck, Users, RefreshCw,
  CheckCircle2, XCircle, Clock,
} from "lucide-react";

const MODULES = ["Dashboard", "Sales", "Operations", "Support", "Reports", "Settings"];

const ROLE_STYLE = {
  admin:   "bg-purple-50 text-purple-700 border-purple-200",
  sales:   "bg-blue-50 text-blue-700 border-blue-200",
  support: "bg-teal-50 text-teal-700 border-teal-200",
  viewer:  "bg-gray-100 text-gray-600 border-gray-200",
  user:    "bg-gray-100 text-gray-600 border-gray-200",
};

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/users", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/admin");
        return;
      }
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Could not reach the server. Make sure Server.js is running on port 5000.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin");
  };

  const filtered = filterRole === "all"
    ? users
    : users.filter((u) => u.role === filterRole);

  const activeCount   = users.filter((u) => u.active).length;
  const inactiveCount = users.length - activeCount;

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xs font-bold">NX</span>
          </div>
          <div>
            <span className="text-white font-semibold text-sm">NX-Desk</span>
            <span className="text-slate-500 text-xs ml-2">Admin Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-blue-400" />
            <span className="text-slate-400 text-xs">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-white mb-1">User Management</h1>
            <p className="text-slate-400 text-sm">
              Users are managed by <code className="text-blue-400 text-xs bg-slate-800 px-1.5 py-0.5 rounded">Admin</code>.
              This view reflects the live server state.
            </p>
          </div>
          <button
            onClick={() => fetchUsers(true)}
            disabled={refreshing}
            className="flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-950 rounded-lg flex items-center justify-center">
              <Users size={15} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{users.length}</p>
              <p className="text-xs text-slate-500">Total users</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-950 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={15} className="text-teal-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{activeCount}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <XCircle size={15} className="text-slate-500" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{inactiveCount}</p>
              <p className="text-xs text-slate-500">Inactive</p>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all", "admin", "sales", "support", "user"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                filterRole === r
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {r === "all" ? "All roles" : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <XCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-slate-800 last:border-0 animate-pulse">
                <div className="w-9 h-9 bg-slate-800 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-800 rounded w-32" />
                  <div className="h-2.5 bg-slate-800 rounded w-48" />
                </div>
                <div className="h-5 bg-slate-800 rounded w-16" />
                <div className="h-4 bg-slate-800 rounded w-20" />
              </div>
            ))}
          </div>
        )}

        {/* User table */}
        {!loading && !error && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium tracking-wider hidden md:table-cell">Module access</th>
                  <th className="text-left px-4 py-3 text-xs text-slate-500 font-medium tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/40 transition-colors"
                  >
                    {/* User info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${ROLE_STYLE[user.role] ?? ROLE_STYLE.user}`}>
                          {initials(user.name)}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm leading-tight">{user.name}</p>
                          <p className="text-slate-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-md border font-medium ${ROLE_STYLE[user.role] ?? ROLE_STYLE.user}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Module chips */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {MODULES.filter((m) => user.modules?.[m]).map((m) => (
                          <span key={m} className="text-xs text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{m}</span>
                        ))}
                        {MODULES.filter((m) => user.modules?.[m]).length === 0 && (
                          <span className="text-xs text-slate-600 italic">No modules</span>
                        )}
                      </div>
                    </td>

                    {/* Active status */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${user.active ? "bg-teal-400" : "bg-slate-600"}`} />
                        <span className={`text-xs ${user.active ? "text-teal-400" : "text-slate-500"}`}>
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-slate-600 text-sm">
                      No users found for this role filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer hint */}
        <p className="text-slate-600 text-xs text-center mt-6">
          To add, edit, or remove users — update the <code className="text-slate-400">users</code> --- <code className="text-slate-400">Contact ADMIN</code>.
        </p>
      </div>
    </div>
  );
}