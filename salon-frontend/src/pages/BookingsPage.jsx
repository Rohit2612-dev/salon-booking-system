import { useState, useEffect } from 'react';
import { getAllBookings, addBooking, updateBooking, deleteBooking } from '../services/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ userId: '', serviceId: '', staffId: '', bookingDate: '', bookingTime: '', status: 'BOOKED' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllBookings() || [];
      console.log('📋 Raw booking data from API:', data[0]); // shows field names in browser console
      setBookings(data); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditItem(null); setForm({ userId: '', serviceId: '', staffId: '', bookingDate: '', bookingTime: '', status: 'BOOKED' }); setShowForm(true); setMsg(null); };
  const openEdit = (b) => {
    setEditItem(b);
    setForm({
      userId: b.userId ?? '',
      serviceId: b.serviceId ?? '',
      staffId: b.staffId ?? '',
      bookingDate: b.bookingDate ?? '',
      bookingTime: b.bookingTime ?? '',
      status: b.status || 'BOOKED'
    });
    setShowForm(true);
    setMsg(null);
  };
  const closeForm = () => { setShowForm(false); setEditItem(null); };

  const handleSubmit = async () => {
    if (!form.userId || !form.serviceId || !form.staffId) return setMsg({ type: 'error', text: 'User ID, Service ID, and Staff ID are required.' });
    setSubmitting(true);
    try {
      const payload = { ...form, userId: Number(form.userId), serviceId: Number(form.serviceId), staffId: Number(form.staffId) };
      if (editItem) { await updateBooking(editItem.id, payload); setMsg({ type: 'success', text: 'Booking updated!' }); }
      else { await addBooking(payload); setMsg({ type: 'success', text: 'Booking created!' }); }
      closeForm();
      load();
    } catch { setMsg({ type: 'error', text: 'Operation failed.' }); }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try { await deleteBooking(id); setMsg({ type: 'success', text: 'Booking deleted.' }); load(); }
    catch { setMsg({ type: 'error', text: 'Delete failed.' }); }
  };

  const statusColor = (s) => s === 'BOOKED' ? 'booked' : s === 'CANCELLED' ? 'cancelled' : s === 'COMPLETED' ? 'completed' : 'default';

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">Track and manage all appointments</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ New Booking</button>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text} <button className="alert-close" onClick={() => setMsg(null)}>✕</button></div>}

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal modal-wide" onClick={e => e.stopPropagation()}>
            <h3 className="form-title">{editItem ? 'Edit Booking' : 'Create New Booking'}</h3>
            <div className="form-grid">
              <div className="field">
                <label>User ID *</label>
                <input type="number" value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} placeholder="1" />
              </div>
              <div className="field">
                <label>Service ID *</label>
                <input type="number" value={form.serviceId} onChange={e => setForm({ ...form, serviceId: e.target.value })} placeholder="1" />
              </div>
              <div className="field">
                <label>Staff ID *</label>
                <input type="number" value={form.staffId} onChange={e => setForm({ ...form, staffId: e.target.value })} placeholder="1" />
              </div>
              <div className="field">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="BOOKED">BOOKED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div className="field">
                <label>Booking Date</label>
                <input type="date" value={form.bookingDate} onChange={e => setForm({ ...form, bookingDate: e.target.value })} />
              </div>
              <div className="field">
                <label>Booking Time</label>
                <input type="time" value={form.bookingTime} onChange={e => setForm({ ...form, bookingTime: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeForm}>Cancel</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Saving...' : editItem ? 'Update' : 'Create Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section-card">
        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading bookings...</p></div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">No bookings yet. Create the first appointment!</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>User</th><th>Service</th><th>Staff</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.userName ?? '—'}</td>
                  <td>{b.serviceName ?? '—'}</td>
                  <td>{b.staffName ?? '—'}</td>
                  <td>{b.bookingDate ?? '—'}</td>
                  <td>{b.bookingTime ?? '—'}</td>
                  <td><span className={`badge badge-${statusColor(b.status)}`}>{b.status || 'PENDING'}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => openEdit(b)}>✏</button>
                      <button className="btn-delete" onClick={() => handleDelete(b.id)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}