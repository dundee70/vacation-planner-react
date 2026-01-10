import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import VacationGrid from '../components/VacationGrid';
import Header from '../components/Header';
import { getCurrentUserProfile } from '../services/userService';

export default function Dashboard({ user }) {
  const [employees, setEmployees] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [profile, setProfile] = useState(null);

  async function load() {
    setEmployees((await supabase.from('employees').select()).data);
    setWeeks((await supabase.from('weeks').select()).data);
    setVacations((await supabase.from('vacations').select('*, weeks(*)')).data);
  }

  useEffect(() => {
    getCurrentUserProfile(user.id).then(setProfile);
    load();

    const channel = supabase
      .channel('vacations-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vacations' },
        load
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);
  
  async function toggle(employeeId, week) {
    const existing = vacations.find(v =>
      v.employee_id === employeeId && v.week_id === week.id
    );

    try {
      if (existing) {
        await supabase.from('vacations').delete().eq('id', existing.id);
      } else {
        const { error } = await supabase.from('vacations').insert({
          employee_id: employeeId,
          week_id: week.id
        });
        if (error) throw error;
      }
    } catch (e) {
      alert(e.message);
    }
    load();
  }

  return (
    <>
      <Header user={user} profile={profile} />
      <VacationGrid
        employees={employees}
        weeks={weeks}
        vacations={vacations}
        userId={user.id}
        onChange={toggle}
      />
    </>
  );
}
