import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
} from "recharts";

import StatCard from "../components/ui/StatCard";
import Card from "../components/ui/Card";

const data = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 300 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 200 },
  { name: "Fri", sales: 600 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 text-gray-300">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-gray-200">
        <StatCard title="Revenue" value="$12,400" />
        <StatCard title="Users" value="1,240" />
        <StatCard title="Orders" value="320" />
      </div>

      {/* Chart */}
      <Card>
        <h2 className="font-semibold mb-4">Sales Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

    </div>
  );
}