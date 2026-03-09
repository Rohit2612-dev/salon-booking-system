import { useState } from 'react';
import { registerUser } from '../../services/api';
import '../../user.css';

export default function RegisterPage({ onRegistered, onGoLogin, onBack }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password, role: 'USER' });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => onRegistered(), 1500);
    } catch {
      setError('Registration failed. Email may already be in use.');
    }
    setLoading(false);
  };

  return (
    <div className="u-auth-bg">
      <div className="u-auth-left">
        <div className="u-brand-block">
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(212,168,75,0.6)', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', padding: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            ← Back to Home
          </button>
          <div className="u-brand-symbol">✦</div>
          <h1 className="u-brand-title">LuxeCut</h1>
          <p className="u-brand-tagline">Premium Salon Experience</p>
        </div>
        <div className="u-decorative-circles">
          <div className="u-circle u-c1"></div>
          <div className="u-circle u-c2"></div>
          <div className="u-circle u-c3"></div>
        </div>
        <div className="u-quote">"Every great look starts with a great cut."</div>
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <div className="u-auth-header">
            <h2 className="u-auth-title">Create account</h2>
            <p className="u-auth-sub">Join LuxeCut and book your first appointment</p>
          </div>

          {error && <div className="u-alert u-alert-error">{error}</div>}
          {success && <div className="u-alert u-alert-success">{success}</div>}

          <div className="u-field">
            <label>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Rohit Sharma"
            />
          </div>

          <div className="u-field">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="rohit@gmail.com"
            />
          </div>

          <div className="u-field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Min. 4 characters"
            />
          </div>

          <div className="u-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Re-enter password"
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
            />
          </div>

          <button className="u-btn-primary" onClick={handleRegister} disabled={loading}>
            {loading ? <span className="u-spinner"></span> : 'Create Account'}
          </button>

          <div className="u-divider"><span>or</span></div>

          <p className="u-switch-text">
            Already have an account?{' '}
            <button className="u-link-btn" onClick={onGoLogin}>
              Sign in →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}