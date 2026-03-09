export default function Sidebar({ activePage, setActivePage, onBack }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'services', label: 'Services', icon: '✂' },
    { id: 'staff', label: 'Staff', icon: '👤' },
    { id: 'users', label: 'Users', icon: '👥' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">✦</span>
        <div>
          <div className="brand-name">LuxeCut</div>
          <div className="brand-sub">Salon Management</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
          <button className="nav-item" onClick={onBack} style={{ color: 'rgba(201,169,110,0.5)', width: '100%' }}>
            <span className="nav-icon">←</span>
            <span>Back to Home</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="status-dot"></div>
        <span>Backend Connected</span>
      </div>
    </aside>
  );
}