export function canToggle(vacations, employeeId, week) {
  const mine = vacations.filter(v => v.employee_id === employeeId);

  if (!mine.find(v => v.week_id === week.id) && mine.length >= 5) {
    return false;
  }

  if (week.is_summer) {
    const summer = mine.find(v => v.is_summer);
    if (summer && summer.week_id !== week.id) {
      return false;
    }
  }

  return true;
}
