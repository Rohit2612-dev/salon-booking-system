import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus } from '../../services/api';
import '../../user.css';

export default function MyBookingsPage({ user, onBack, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [msg, setMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const all = await getAllBookings() || [];
      const mine = all.filter(b => (b.userId ?? b.user?.id) === user.id);
      setBookings(mine);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [user.id]);

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);
    try {
      await updateBookingStatus(bookingId, 'CANCELLED');
      setMsg({ type: 'success', text: 'Booking cancelled successfully.' });
      await load();
    } catch {
      setMsg({ type: 'error', text: 'Failed to cancel. Please try again.' });
    }
    setCancelling(null);
  };

  const booked    = bookings.filter(b => b.status === 'BOOKED');
  const completed = bookings.filter(b => b.status === 'COMPLETED');
  const cancelled = bookings.filter(b => b.status === 'CANCELLED');
  const tabBookings = { all: bookings, booked, completed, cancelled };

  const tabs = [
    { key: 'all',       label: 'All',       count: bookings.length,  color: '#b8922a' },
    { key: 'booked',    label: 'Pending',   count: booked.length,    color: '#3b82f6' },
    { key: 'completed', label: 'Completed', count: completed.length, color: '#16a34a' },
    { key: 'cancelled', label: 'Cancelled', count: cancelled.length, color: '#ef4444' },
  ];

  const statusIcon = s => s === 'BOOKED' ? '⏳' : s === 'COMPLETED' ? '✅' : '❌';
  const statusStyle = s => ({
    BOOKED:    { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    COMPLETED: { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    CANCELLED: { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  }[s] || { bg: '#f3f4f6', color: '#4b5563', border: '#e5e7eb' });

  return (
    <div className="u-portal">
      {/* Header */}
      <header className="u-portal-header">
        <div className="u-portal-brand">
          <span className="u-brand-symbol-sm">✦</span>
          <span className="u-portal-brand-name">LuxeCut</span>
        </div>
        <div className="u-portal-user">
          <div className="u-user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <span className="u-user-name">{user.name?.split(' ')[0]}</span>
          <button
            onClick={onBack}
            style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', fontWeight: '500', marginRight: '0.5rem' }}
          >
            ✂ Services
          </button>
          <button className="u-logout-btn" onClick={onLogout}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 2rem 4rem', fontFamily: "'Outfit', sans-serif" }}>

        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#1c1208', margin: '0 0 0.3rem' }}>My Bookings</h1>
          <p style={{ color: '#7a5c35', fontSize: '0.88rem' }}>View and manage your appointments</p>
        </div>

        {msg && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.2rem', fontSize: '0.88rem', background: msg.type === 'success' ? '#f0fdf4' : '#fef2f2', color: msg.type === 'success' ? '#166534' : '#991b1b', border: `1px solid ${msg.type === 'success' ? '#bbf7d0' : '#fecaca'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {msg.text}
            <button onClick={() => setMsg(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>✕</button>
          </div>
        )}

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.8rem' }}>
          {[
            { label: 'Total', value: bookings.length, icon: '📋', color: '#b8922a' },
            { label: 'Pending', value: booked.length, icon: '⏳', color: '#3b82f6' },
            { label: 'Completed', value: completed.length, icon: '✅', color: '#16a34a' },
            { label: 'Cancelled', value: cancelled.length, icon: '❌', color: '#ef4444' },
          ].map(c => (
            <div key={c.label} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e8d8be', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 12px rgba(28,18,8,0.05)' }}>
              <div style={{ fontSize: '1.3rem' }}>{c.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: '700', color: c.color, lineHeight: 1, margin: '0.2rem 0' }}>{c.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#7a5c35' }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: activeTab === tab.key ? `1.5px solid ${tab.color}` : '1.5px solid #e8d8c8', background: activeTab === tab.key ? `${tab.color}15` : 'white', color: activeTab === tab.key ? tab.color : '#7a5c35', fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', fontWeight: activeTab === tab.key ? '600' : '400', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {tab.label}
              <span style={{ background: activeTab === tab.key ? tab.color : '#e8d8c8', color: activeTab === tab.key ? 'white' : '#7a5c35', borderRadius: '10px', padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: '700' }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '3rem', color: '#7a5c35' }}>
            <div className="u-spinner" style={{ borderColor: '#e8d8be', borderTopColor: '#b8922a', width: '20px', height: '20px' }}></div>
            <span>Loading your bookings...</span>
          </div>
        ) : tabBookings[activeTab].length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7a5c35', background: 'white', borderRadius: '16px', border: '1px solid #e8d8be' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📅</div>
            <p>No {activeTab === 'all' ? '' : activeTab} bookings found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tabBookings[activeTab].map(b => {
              const ss = statusStyle(b.status);
              return (
                <div key={b.id} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e8d8be', padding: '1.4rem', boxShadow: '0 2px 16px rgba(28,18,8,0.05)', display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                  {/* Service icon */}
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#0f0a05', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>✂</div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: '600', color: '#1c1208', marginBottom: '0.3rem' }}>
                      {b.serviceName ?? 'Service'}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#7a5c35', display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                      <span>👤 {b.staffName ?? '—'}</span>
                      <span>📅 {b.bookingDate ?? '—'}</span>
                      <span>⏰ {b.bookingTime ?? '—'}</span>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>Booking #{b.id}</div>
                  </div>

                  {/* Status + Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                    <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: '20px', padding: '0.25rem 0.8rem', fontSize: '0.78rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {statusIcon(b.status)} {b.status}
                    </span>

                    {b.status === 'BOOKED' && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        disabled={cancelling === b.id}
                        style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.4rem 0.9rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}
                      >
                        {cancelling === b.id ? 'Cancelling...' : '✕ Cancel Booking'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}