import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/routesConfig";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Settings,
  BarChart3,
  LifeBuoy,
  Menu,
  X,
  KeyRound,
  Mail,
  Bell,
  ChevronRight,
  Search,
} from "lucide-react";

const iconMap = {
  Dashboard: LayoutDashboard,
  Sales: ShoppingCart,
  Operations: BarChart3,
  Support: LifeBuoy,
  Reports: BarChart3,
  Settings: Settings,
  Security: KeyRound,
  Mail: Mail,
};

// Nav sections for grouping
const navGroups = [
  {
    label: "Main",
    items: ["Dashboard", "Sales", "Operations"],
  },
  {
    label: "Manage",
    items: ["Support", "Reports", "Settings"],
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const PAGE_TITLES = {
  sales: "Sales Workspace",
  dashboard: "Dashboard",
  operations: "Operations",
  support: "Support",
  reports: "Reports",
  settings: "Settings",
};

function getPageTitle(pathname) {
  const segment = pathname.split("/")[1]?.toLowerCase();
  return PAGE_TITLES[segment] || "Dashboard";
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "User";
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const notifications = [
    { id: 1, text: "New ticket #1042 assigned to you", time: "5m", unread: true },
    { id: 2, text: "Sales report is ready to review", time: "1h", unread: true },
    { id: 3, text: "System backup completed", time: "2h", unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Build flat nav list from groups
  const allNavItems = navGroups.flatMap((g) => g.items);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-60 
          bg-background dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col shadow-sm
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">NX</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">NX-Desk</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 leading-tight">Workspace</div>
            </div>
          </div>
          <button
            className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {ROUTES.filter((r) => group.items.includes(r.name)).map((item) => {
                  const Icon = iconMap[item.name];
                  return (
                    <NavLink
                      key={item.path}
                      to={`/${item.path}`}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-100"
                        }`
                      }
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          className={`flex-shrink-0`}
                        />
                      )}
                      <span className="flex-1">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom user info */}
        <div className="px-4 py-4 border-t border-gray-100 dark:border-slate-800">
          {token ? (
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                User
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">U</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Sign in
            </button>
          )}
          <p className="text-center text-xs text-gray-300 dark:text-gray-600 mt-2">v1.0 · NX Workspace</p>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <div className="bg-background text-foreground min-h-screen flex-1 flex flex-col min-w-0 h-auto">

        {/* ─── TOPBAR ─── */}
        <header className="h-14 bg-background dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 gap-4 flex-shrink-0">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{pageTitle}</h1>
            </div>
          </div>

          {/* Search (md+) */}
          <div className="hidden md:flex flex-1 max-w-xs items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 outline-none flex-1"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl hover:bg-muted dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Notification dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-background dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">Notifications</span>
                    <span className="text-xs bg-red-100 text-red-600 rounded-full px-1.5 py-0.5 font-medium">{unreadCount} new</span>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 text-sm border-b border-gray-50 dark:border-slate-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer flex gap-2 ${
                        n.unread ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                      }`}
                    >
                      {n.unread && (
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 dark:text-gray-200 leading-snug text-xs">{n.text}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{n.time} ago</p>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-2 text-center">
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            {token && (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold cursor-pointer hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-700 transition-all">
                U
              </div>
            )}
          </div>
        </header>

        {/* ─── PAGE CONTENT ─── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}