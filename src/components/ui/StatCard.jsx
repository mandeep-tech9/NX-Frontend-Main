export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  accentColor = "blue",
  iconBg = "#E6F1FB",
  iconColor = "#185FA5",
}) {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Subtle top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: iconColor }}
      />

      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        {icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: iconBg, color: iconColor }}
          >
            {icon}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight mb-1">
        {value}
      </h2>

      {(trend !== undefined || trendLabel) && (
        <div className="flex items-center gap-1.5 mt-1">
          {trend !== undefined && (
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : isNegative
                  ? "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400"
                  : "text-gray-500 bg-gray-100 dark:bg-slate-700 dark:text-gray-400"
              }`}
            >
              {isPositive ? "↑" : isNegative ? "↓" : "→"}{" "}
              {Math.abs(trend)}%
            </span>
          )}
          {trendLabel && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}