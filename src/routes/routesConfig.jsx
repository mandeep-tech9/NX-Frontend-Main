import Dashboard from "../pages/Dashboard";
import Sales from "../pages/SalesPage";
import Operations from "../pages/Operations";
import Support from "../pages/Support";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import AgentViewer from "../pages/AgentViewer";

// Login is a standalone public route in App.jsx — NOT in this list.
// Everything here is inside the protected MainLayout and requires a token.
export const ROUTES = [
  { name: "Dashboard",  path: "dashboard",  element: <Dashboard /> },
  { name: "Sales",      path: "Sales",       element: <Sales /> },
  { name: "Operations", path: "operations",  element: <Operations /> },
  { name: "Support",    path: "support",     element: <Support /> },
  { name: "Reports",    path: "reports",     element: <Reports /> },
  { name: "Settings",   path: "settings",    element: <Settings /> },
  { name: "AgentViewer", path: "agent", element: <AgentViewer /> },
];