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
        <h2 style={{ marginBottom: 10, fontWeight: 600 }}>Vacation Planner</h2>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
          Pianificazione ferie reparto
        </p>
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
    height: 40,
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
    border: '1px solid #d1d5db',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 10
  }
};
