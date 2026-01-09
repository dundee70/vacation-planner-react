import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(r => setUser(r.data.user));
    supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user));
  }, []);

  return user ? <Dashboard user={user} /> : <Login />;
}
