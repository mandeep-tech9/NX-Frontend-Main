export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div>{icon}</div>
    </div>
  );
}