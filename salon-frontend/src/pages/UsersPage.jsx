import { useState, useEffect } from 'react';
import { getAllUsers, registerUser } from '../services/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try { setUsers(await getAllUsers() || []); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) return setMsg({ type: 'error', text: 'Please fill all required fields.' });
    setSubmitting(true);
    try {
      await registerUser(form);
      setMsg({ type: 'success', text: 'User registered successfully!' });
      setForm({ name: '', email: '', password: '', role: 'USER' });
      setShowForm(false);
      load();
    } catch (e) {
      setMsg({ type: 'error', text: 'Failed to register user. Check the backend.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Manage registered customers</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setMsg(null); }}>
          {showForm ? '✕ Cancel' : '+ Register User'}
        </button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {showForm && (
        <div className="form-card">
          <h3 className="form-title">Register New User</h3>
          <div className="form-grid">
            <div className="field">
              <label>Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="field">
              <label>Email *</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="field">
              <label>Password *</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
            </div>
            <div className="field">
              <label>Role</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
          <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Registering...' : 'Register User'}
          </button>
        </div>
      )}

      <div className="section-card">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading users...</p></div>
        ) : users.length === 0 ? (
          <div className="empty-state">No users found. Register the first user above.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td><strong>{u.name}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`badge badge-${u.role?.toLowerCase()}`}>{u.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
