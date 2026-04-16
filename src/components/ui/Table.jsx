export default function Table({ columns, data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-slate-700">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left p-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t dark:border-slate-700">
              {Object.values(row).map((val, j) => (
                <td key={j} className="p-3">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}