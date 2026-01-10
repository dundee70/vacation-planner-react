import { supabase } from '../services/supabase';

export default function Header({ user, profile }) {
  return (
    <header style={styles.header}>
      <div>
        <strong>{profile?.name}</strong>
        <span style={styles.role}>
          ({profile?.role === 'manager' ? 'Responsabile' : 'Collaboratore'})
        </span>
      </div>

      <button onClick={() => supabase.auth.signOut()} style={styles.logout}>
        Logout
      </button>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    background: '#111827',
    color: '#f9fafb'
  },
  role: {
    marginLeft: 8,
    fontSize: 12,
    opacity: 0.7
  },
  logout: {
    background: '#ef4444',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer'
  }
};
