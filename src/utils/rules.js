export function canToggle(vacations, employeeId, week) {
  const mine = vacations.filter(v => v.employee_id === employeeId);
  const already = mine.find(v => v.week_id === week.id);

  if (!already && mine.length >= 5) return false;

  if (week.is_summer && !already) {
    if (mine.some(v => v.is_summer)) return false;
  }

  return true;
}
