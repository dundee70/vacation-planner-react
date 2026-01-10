export function canToggle(vacations, employeeId, week) {
  const mine = vacations.filter(v => v.employee_id === employeeId);

  const alreadySelected = mine.find(v => v.week_id === week.id);

  // max 5 settimane
  if (!alreadySelected && mine.length >= 5) return false;

  // max 1 estate
  if (week.is_summer && !alreadySelected) {
    const summer = mine.find(v => v.is_summer);
    if (summer) return false;
  }

  return true;
}
