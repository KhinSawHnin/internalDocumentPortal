/**
 * Generic table shell. Pass `columns` (array of { key, header, render? })
 * and `rows` (array of data objects). `render(row)` overrides default
 * rows[row][key] rendering — used for action buttons, badges, etc.
 */
export default function Table({ columns, rows, emptyMessage = 'No records found.', getRowKey }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="border border-slate-200 rounded-lg p-8 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={getRowKey ? getRowKey(row) : row.id} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-slate-700">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
