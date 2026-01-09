import { supabase } from '../services/supabase';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    await supabase.auth.signInWithPassword({ email, password });
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Accedi</button>
    </div>
  );
}
