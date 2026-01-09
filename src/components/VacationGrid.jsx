import { AgGridReact } from 'ag-grid-react';
import { canToggle } from '../utils/rules';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function VacationGrid({
  employees, weeks, vacations, userId, onChange
}) {

  const columns = [
    { headerName: "Collaboratore", field: "name", pinned: "left" },
    ...weeks.map(w => ({
      headerName: `W${w.week_number}`,
      field: `w_${w.id}`,
      cellRenderer: params => (
        <input
          type="checkbox"
          checked={params.value || false}
          disabled={!canToggle(vacations, userId, w)}
          onChange={() => onChange(params.data.id, w)}
        />
      ),
      cellStyle: params =>
        params.value ? { backgroundColor: "#c8f7c5" } : null
    }))
  ];

  const rows = employees.map(e => {
    const row = { id: e.id, name: e.name };
    vacations.filter(v => v.employee_id === e.id)
      .forEach(v => row[`w_${v.week_id}`] = true);
    return row;
  });

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact rowData={rows} columnDefs={columns} />
    </div>
  );
}
