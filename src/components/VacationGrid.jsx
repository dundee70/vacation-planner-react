import { AgGridReact } from 'ag-grid-react';
import WeekHeader from './WeekHeader';
import { canToggle } from '../utils/rules';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function VacationGrid({
  employees, weeks, vacations, userId, onChange
}) {

  const isWeekOverbooked = (weekId) =>
    vacations.filter(v => v.week_id === weekId).length >= 2;

  const columns = [
    {
      headerName: "Collaboratore",
      field: "name",
      pinned: "left",
      width: 140
    },
    ...weeks.map(w => ({
      headerComponent: () => <WeekHeader week={w} />,
      field: `w_${w.id}`,
      width: 55,
      suppressSizeToFit: true,
      cellRenderer: params => (
        <input
          type="checkbox"
          checked={params.value || false}
          disabled={!canToggle(vacations, params.data.id, w)}
          onChange={() => onChange(params.data.id, w)}
        />
      ),
      cellStyle: params => {
        if (params.value) return { background: "#c8f7c5" };
        if (w.is_summer) return { background: "#fff3cd" };
        if (isWeekOverbooked(w.id)) return { background: "#f8d7da" };
        return null;
      }
    }))
  ];

  const rows = employees.map(e => {
    const row = { id: e.id, name: e.name };
    vacations
      .filter(v => v.employee_id === e.id)
      .forEach(v => row[`w_${v.week_id}`] = true);
    return row;
  });

  return (
    <div className="ag-theme-alpine" style={{ height: '80vh' }}>
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        suppressHorizontalScroll={false}
      />
    </div>
  );
}
