import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../routes/routesConfig";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-5">
        <div className="text-xl font-bold mb-8">NX-Desk</div>
<button className="md:hidden p-2">☰</button>
        {ROUTES.map((item) => (
          <NavLink
            key={item.path}
            to={`/${item.path}`}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg mb-2 transition ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-slate-800 shadow flex items-center justify-between px-6">
          <h1 className="font-semibold text-lg">Workspace</h1>
          <div className="text-sm text-gray-500">Welcome</div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}