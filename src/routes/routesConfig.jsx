import Dashboard from "../pages/Dashboard";
import Sales from "../pages/SalesPage";
import Operations from "../pages/Operations";
import Support from "../pages/Support";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

export const ROUTES = [
  { name: "Dashboard", path: "dashboard", element: <Dashboard /> },
  { name: "Sales", path: "Sales", element: <Sales /> },
  { name: "Operations", path: "operations", element: <Operations /> },
  { name: "Support", path: "support", element: <Support /> },
  { name: "Reports", path: "reports", element: <Reports /> },
  { name: "Settings", path: "settings", element: <Settings /> },
];