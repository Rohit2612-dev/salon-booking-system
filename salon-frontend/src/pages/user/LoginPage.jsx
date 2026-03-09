import { useState } from 'react';
import { getAllUsers } from '../../services/api';
import '../../user.css';

export default function LoginPage({ onLoginSuccess, onGoRegister, onBack }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const users = await getAllUsers();
      const match = users?.find(
        (u) => u.email === form.email && String(u.password) === String(form.password)
      );
      if (match) {
        onLoginSuccess(match);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('Could not connect to server. Make sure backend is running.');
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
        <div className="u-quote">"Style is a way to say who you are without having to speak."</div>
      </div>

      <div className="u-auth-right">
        <div className="u-auth-card">
          <div className="u-auth-header">
            <h2 className="u-auth-title">Welcome back</h2>
            <p className="u-auth-sub">Sign in to book your appointment</p>
          </div>

          {error && <div className="u-alert u-alert-error">{error}</div>}

          <div className="u-field">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="rohit@gmail.com"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div className="u-field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button className="u-btn-primary" onClick={handleLogin} disabled={loading}>
            {loading ? <span className="u-spinner"></span> : 'Sign In'}
          </button>

          <div className="u-divider"><span>or</span></div>

          <p className="u-switch-text">
            Don't have an account?{' '}
            <button className="u-link-btn" onClick={onGoRegister}>
              Create one →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}