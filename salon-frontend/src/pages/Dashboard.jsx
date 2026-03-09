import { useState, useEffect } from 'react';
import { getAllUsers, getAllServices, getAllStaff, getAllBookings } from '../services/api';

export default function Dashboard({ setActivePage }) {
  const [stats, setStats] = useState({ users: 0, services: 0, staff: 0, bookings: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [users, services, staff, bookings] = await Promise.allSettled([
          getAllUsers(), getAllServices(), getAllStaff(), getAllBookings()
        ]);
        setStats({
          users: users.value?.length || 0,
          services: services.value?.length || 0,
          staff: staff.value?.length || 0,
          bookings: bookings.value?.length || 0,
        });
        setRecentBookings((bookings.value || []).slice(0, 5));
        console.log('🔍 Booking fields:', JSON.stringify(bookings.value?.[0], null, 2));
      } catch (e) {}
      setLoading(false);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: '👥', color: '#c9a96e', page: 'users' },
    { label: 'Services', value: stats.services, icon: '✂', color: '#8B6F47', page: 'services' },
    { label: 'Staff Members', value: stats.staff, icon: '👤', color: '#A0522D', page: 'staff' },
    { label: 'Bookings', value: stats.bookings, icon: '📅', color: '#6B4226', page: 'bookings' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back to LuxeCut Management</p>
        </div>
        <div className="date-badge">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            {statCards.map((card) => (
              <div key={card.label} className="stat-card" onClick={() => setActivePage(card.page)} style={{ cursor: 'pointer' }}>
                <div className="stat-icon" style={{ color: card.color }}>{card.icon}</div>
                <div className="stat-value">{card.value}</div>
                <div className="stat-label">{card.label}</div>
                <div className="stat-arrow">→</div>
              </div>
            ))}
          </div>

          <div className="section-card">
            <h2 className="section-title">Recent Bookings</h2>
            {recentBookings.length === 0 ? (
              <div className="empty-state">No bookings yet. <button className="link-btn" onClick={() => setActivePage('bookings')}>Add one →</button></div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Service ID</th>
                    <th>Staff ID</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => {
                    return (
                    <tr key={b.id}>
                      <td>#{b.id}</td>
                      <td>{b.userName ?? '—'}</td>
                      <td>{b.serviceName ?? '—'}</td>
                      <td>{b.staffName ?? '—'}</td>
                      <td>{b.bookingDate ?? '—'}</td>
                      <td><span className={`badge badge-${b.status?.toLowerCase()}`}>{b.status || 'PENDING'}</span></td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}