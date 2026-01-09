import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import VacationGrid from '../components/VacationGrid';

export default function Dashboard({ user }) {
  const [employees, setEmployees] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [vacations, setVacations] = useState([]);

  async function load() {
    setEmployees((await supabase.from('employees').select()).data);
    setWeeks((await supabase.from('weeks').select()).data);
    setVacations((await supabase.from('vacations').select('*, weeks(*)')).data);
  }

  useEffect(() => { load(); }, []);

  async function toggle(employeeId, week) {
    const existing = vacations.find(v =>
      v.employee_id === employeeId && v.week_id === week.id
    );

    if (existing) {
      await supabase.from('vacations').delete().eq('id', existing.id);
    } else {
      await supabase.from('vacations').insert({
        employee_id: employeeId,
        week_id: week.id
      });
    }
    load();
  }

  return (
    <VacationGrid
      employees={employees}
      weeks={weeks}
      vacations={vacations}
      userId={user.id}
      onChange={toggle}
    />
  );
}
