import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '../services/api';

export default function StaffDashboard({ staff, onBack }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [updating, setUpdating] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const all = await getAllBookings() || [];
      setBookings(all.filter(b => (b.staffId ?? b.staff?.id) === staff.id));
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [staff.id]);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
      setMsg({ type: 'success', text: `Booking #${bookingId} marked as ${newStatus}.` });
      await load();
    } catch {
      setMsg({ type: 'error', text: 'Failed to update status.' });
    }
    setUpdating(null);
  };

  const booked    = bookings.filter(b => b.status === 'BOOKED');
  const completed = bookings.filter(b => b.status === 'COMPLETED');
  const cancelled = bookings.filter(b => b.status === 'CANCELLED');
  const tabBookings = { all: bookings, booked, completed, cancelled };
  const tabs = [
    { key: 'all',       label: 'All',       count: bookings.length,  color: '#6b7280' },
    { key: 'booked',    label: 'Pending',   count: booked.length,    color: '#3b82f6' },
    { key: 'completed', label: 'Completed', count: completed.length, color: '#16a34a' },
    { key: 'cancelled', label: 'Cancelled', count: cancelled.length, color: '#ef4444' },
  ];
  const statCards = [
    { label: 'Total Orders',  value: bookings.length,  icon: '📋', bg: '#fdf6ec', border: '#e8d8be', val: '#b8922a' },
    { label: 'Pending',       value: booked.length,    icon: '⏳', bg: '#eff6ff', border: '#bfdbfe', val: '#1d4ed8' },
    { label: 'Completed',     value: completed.length, icon: '✅', bg: '#f0fdf4', border: '#bbf7d0', val: '#15803d' },
    { label: 'Cancelled',     value: cancelled.length, icon: '❌', bg: '#fef2f2', border: '#fecaca', val: '#dc2626' },
  ];
  const statusColor = s => s === 'BOOKED' ? 'booked' : s === 'COMPLETED' ? 'completed' : s === 'CANCELLED' ? 'cancelled' : 'default';
  const rate = bookings.length > 0 ? Math.round((completed.length / bookings.length) * 100) : 0;

  return (
    <div className="page">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ background: 'white', border: '1px solid #e8d8c8', borderRadius: '8px', padding: '0.5rem 0.9rem', cursor: 'pointer', fontSize: '0.88rem', color: '#7a5c3a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>← Back</button>
          <div>
            <h1 className="page-title">Staff Profile</h1>
            <p className="page-subtitle">Booking history & performance</p>
          </div>
        </div>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text} <button className="alert-close" onClick={() => setMsg(null)}>✕</button></div>}

      {/* Profile */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e8d8c8', padding: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 4px 24px rgba(45,27,14,0.07)', flexWrap: 'wrap' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2d1b0e, #4a2e1a)', color: '#c9a96e', fontSize: '2rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(45,27,14,0.2)' }}>
          {staff.name?.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#2d1b0e', margin: '0 0 0.3rem' }}>{staff.name}</h2>
          <span className="tag" style={{ marginRight: '0.5rem' }}>{staff.specialization}</span>
          <span style={{ fontSize: '0.78rem', color: '#7a5c3a' }}>Staff ID: #{staff.id}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto' }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#f0e8dc" strokeWidth="8"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke={rate >= 70 ? '#16a34a' : rate >= 40 ? '#b8922a' : '#ef4444'} strokeWidth="8" strokeDasharray={`${(rate / 100) * 201} 201`} strokeLinecap="round" transform="rotate(-90 40 40)"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1rem', color: '#2d1b0e' }}>{rate}%</div>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#7a5c3a', marginTop: '0.4rem' }}>Completion Rate</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {statCards.map(card => (
          <div key={card.label} style={{ background: card.bg, borderRadius: '12px', border: `1px solid ${card.border}`, padding: '1.2rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{card.icon}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: '700', color: card.val, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: '0.78rem', color: '#7a5c3a', marginTop: '0.3rem' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="section-card">
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', borderBottom: '1px solid #f0e8dc', paddingBottom: '0.8rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: activeTab === tab.key ? `1.5px solid ${tab.color}` : '1.5px solid #e8d8c8', background: activeTab === tab.key ? `${tab.color}15` : 'white', color: activeTab === tab.key ? tab.color : '#7a5c3a', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: activeTab === tab.key ? '600' : '400', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {tab.label}
              <span style={{ background: activeTab === tab.key ? tab.color : '#e8d8c8', color: activeTab === tab.key ? 'white' : '#7a5c3a', borderRadius: '10px', padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: '700' }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner"></div><p>Loading...</p></div>
        ) : tabBookings[activeTab].length === 0 ? (
          <div className="empty-state">No {activeTab === 'all' ? '' : activeTab} bookings.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Customer</th><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {tabBookings[activeTab].map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.userName ?? '—'}</td>
                  <td>{b.serviceName ?? '—'}</td>
                  <td>{b.bookingDate ?? '—'}</td>
                  <td>{b.bookingTime ?? '—'}</td>
                  <td><span className={`badge badge-${statusColor(b.status)}`}>{b.status}</span></td>
                  <td>
                    {b.status === 'BOOKED' ? (
                      <button
                        onClick={() => handleStatusChange(b.id, 'COMPLETED')}
                        disabled={updating === b.id}
                        style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', padding: '0.35rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        {updating === b.id ? '...' : '✓ Mark Done'}
                      </button>
                    ) : <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>—</span>}
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