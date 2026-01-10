export default function WeekHeader({ week }) {
  const start = new Date(week.start_date);
  const end = new Date(week.end_date);

  return (
    <div style={{ textAlign: 'center', fontSize: 10 }}>
      <strong>W{week.week_number}</strong>
      <div>{week.month}</div>
      <div>
        {start.getDate()}–{end.getDate()}
      </div>
    </div>
  );
}
