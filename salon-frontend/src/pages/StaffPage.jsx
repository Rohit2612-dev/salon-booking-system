import { useState, useEffect } from 'react';
import { getAllStaff, addStaff, updateStaff, deleteStaff } from '../services/api';
import StaffDashboard from './StaffDashboard';

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', specialization: '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const load = async () => {
    setLoading(true);
    try { setStaff(await getAllStaff() || []); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (selectedStaff) {
    return <StaffDashboard staff={selectedStaff} onBack={() => setSelectedStaff(null)} />;
  }

  const openAdd = () => { setEditItem(null); setForm({ name: '', specialization: '' }); setShowForm(true); setMsg(null); };
  const openEdit = (s, e) => { e.stopPropagation(); setEditItem(s); setForm({ name: s.name, specialization: s.specialization }); setShowForm(true); setMsg(null); };
  const closeForm = () => { setShowForm(false); setEditItem(null); };

  const handleSubmit = async () => {
    if (!form.name || !form.specialization) return setMsg({ type: 'error', text: 'Please fill all fields.' });
    setSubmitting(true);
    try {
      if (editItem) { await updateStaff(editItem.id, form); setMsg({ type: 'success', text: 'Staff updated!' }); }
      else { await addStaff(form); setMsg({ type: 'success', text: 'Staff added!' }); }
      closeForm(); load();
    } catch { setMsg({ type: 'error', text: 'Operation failed.' }); }
    setSubmitting(false);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Delete this staff member?')) return;
    try { await deleteStaff(id); setMsg({ type: 'success', text: 'Staff deleted.' }); load(); }
    catch { setMsg({ type: 'error', text: 'Delete failed.' }); }
  };

  const headerColors = ['#2d1b0e','#1a2d0e','#0e1a2d','#2d0e1a','#1a0e2d','#2d1a0e'];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff</h1>
          <p className="page-subtitle">Click on a profile card to view booking dashboard</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Staff</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text} <button className="alert-close" onClick={() => setMsg(null)}>✕</button></div>}

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="form-title">{editItem ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
            <div className="field">
              <label>Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Staff name" />
            </div>
            <div className="field" style={{ marginTop: '1rem' }}>
              <label>Specialization *</label>
              <input value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} placeholder="e.g. Hair Stylist" />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeForm}>Cancel</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Saving...' : editItem ? 'Update' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state"><div className="spinner"></div><p>Loading staff...</p></div>
      ) : staff.length === 0 ? (
        <div className="empty-state">No staff added yet. Add your first team member!</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {staff.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setSelectedStaff(s)}
              style={{ background: 'white', borderRadius: '16px', border: '1px solid #e8d8c8', boxShadow: '0 4px 20px rgba(45,27,14,0.07)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,27,14,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,27,14,0.07)'; }}
            >
              {/* Colored header */}
              <div style={{ background: headerColors[i % headerColors.length], height: '90px', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0 1.4rem 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a96e, #e8d5b0)', color: '#2d1b0e', fontSize: '1.4rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', position: 'relative', bottom: '-30px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', flexShrink: 0 }}>
                  {s.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ marginLeft: 'auto', padding: '0.6rem 0' }}>
                  <span style={{ background: 'rgba(201,169,110,0.2)', color: '#c9a96e', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>#{s.id}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '2rem 1.4rem 1.4rem' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: '#2d1b0e', margin: '0 0 0.3rem' }}>{s.name}</h3>
                <span className="tag" style={{ fontSize: '0.75rem' }}>{s.specialization}</span>
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #f0e8dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#7a5c3a' }}>📊 View Dashboard →</span>
                  <div className="action-btns">
                    <button className="btn-edit" onClick={e => openEdit(s, e)}>✏</button>
                    <button className="btn-delete" onClick={e => handleDelete(s.id, e)}>🗑</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}