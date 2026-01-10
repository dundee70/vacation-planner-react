import { supabase } from '../services/supabase';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 20 }}>Ferie Planner</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button onClick={login} disabled={loading} style={styles.button}>
          {loading ? 'Accesso…' : 'Accedi'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f4f6'
  },
  card: {
    width: 320,
    padding: 24,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    border: '1px solid #d1d5db'
  },
  button: {
    width: '100%',
    padding: 10,
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 10
  }
};
