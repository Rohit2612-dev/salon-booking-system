import { useState, useEffect } from 'react';
import { getAllServices, addService } from '../services/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', duration: '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try { setServices(await getAllServices() || []); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.duration) return setMsg({ type: 'error', text: 'Please fill all required fields.' });
    setSubmitting(true);
    try {
      await addService({ ...form, price: Number(form.price), duration: Number(form.duration) });
      setMsg({ type: 'success', text: 'Service added successfully!' });
      setForm({ name: '', description: '', price: '', duration: '' });
      setShowForm(false);
      load();
    } catch {
      setMsg({ type: 'error', text: 'Failed to add service.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">Manage salon services & pricing</p>
        </div>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setMsg(null); }}>
          {showForm ? '✕ Cancel' : '+ Add Service'}
        </button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      {showForm && (
        <div className="form-card">
          <h3 className="form-title">Add New Service</h3>
          <div className="form-grid">
            <div className="field">
              <label>Service Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Hair Cut" />
            </div>
            <div className="field">
              <label>Description</label>
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
            </div>
            <div className="field">
              <label>Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="200" />
            </div>
            <div className="field">
              <label>Duration (min) *</label>
              <input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="45" />
            </div>
          </div>
          <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      )}

      <div className="services-grid">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading services...</p></div>
        ) : services.length === 0 ? (
          <div className="empty-state">No services yet. Add your first service above.</div>
        ) : (
          services.map(s => (
            <div key={s.id} className="service-card">
              <div className="service-icon">✂</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.description || 'Professional salon service'}</div>
              <div className="service-meta">
                <span className="service-price">₹{s.price}</span>
                <span className="service-duration">⏱ {s.duration} min</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
