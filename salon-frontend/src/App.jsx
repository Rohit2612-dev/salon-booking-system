import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ServicesPage from './pages/ServicesPage';
import StaffPage from './pages/StaffPage';
import BookingsPage from './pages/BookingsPage';
import UserApp from './UserApp';

export default function App() {
  const [mode, setMode] = useState('select');
  const [activePage, setActivePage] = useState('dashboard');
  const [showHelp, setShowHelp] = useState(false);

  const pages = {
    dashboard: <Dashboard setActivePage={setActivePage} />,
    users: <UsersPage />,
    services: <ServicesPage />,
    staff: <StaffPage />,
    bookings: <BookingsPage />,
  };

  if (mode === 'user') return <UserApp onSwitchToAdmin={() => setMode('select')} />;

  if (mode === 'admin') {
    return (
      <div className="app-shell">
        <Sidebar activePage={activePage} setActivePage={setActivePage} onBack={() => setMode('select')} />
        <main className="main-content">{pages[activePage]}</main>
      </div>
    );
  }

  const cardStyle = (bg, border) => ({
    padding: '1.4rem 2.4rem',
    background: bg, color: 'white', border: border,
    borderRadius: '14px', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: '600',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '0.5rem', minWidth: '160px', transition: 'transform 0.2s, box-shadow 0.2s',
  });

  const steps = [
    { icon: '1', title: 'Create an Account', desc: 'Click "Customer Portal" and register with your name, email and password.' },
    { icon: '2', title: 'Sign In', desc: 'Log in with your registered email and password to access the booking system.' },
    { icon: '3', title: 'Browse Services', desc: 'Explore all available salon services with pricing and duration details.' },
    { icon: '4', title: 'Book an Appointment', desc: 'Click "Book Now" on any service, choose your preferred stylist, date and time slot.' },
    { icon: '5', title: 'Confirm Booking', desc: 'Review your appointment details and confirm. You\'re all set!' },
  ];

  // Free-to-use Unsplash salon/barber images
  const salonImages = [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80', // barber
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80', // haircut
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80', // barber shop
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80', // beard trim
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80', // hair salon
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80', // salon chair
    'https://images.unsplash.com/photo-1512864084360-7c0d0f1e8e7e?w=400&q=80', // scissors
    'https://images.unsplash.com/photo-1634302086498-42bde7383c2e?w=400&q=80', // beard styling
  ];

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Outfit', sans-serif", position: 'relative', overflowX: 'hidden' }}>

      <style>{`
        @keyframes helpFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .salon-grid-img {
          width: 100%; height: 100%;
          object-fit: cover;
          animation: slowZoom 8s ease-in-out infinite alternate;
          display: block;
        }
        .portal-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4) !important;
        }
      `}</style>

      {/* ── Background Photo Grid ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '3px',
      }}>
        {salonImages.map((src, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img
              src={src}
              alt=""
              className="salon-grid-img"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
          </div>
        ))}
      </div>

      {/* ── Dark overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(10,6,2,0.85) 0%, rgba(15,10,5,0.78) 50%, rgba(20,12,4,0.88) 100%)',
      }} />

      {/* ── Gold vignette edges ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,0.6) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>

        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.2rem 2.5rem' }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{
              background: showHelp ? 'rgba(184,146,42,0.25)' : 'rgba(255,255,255,0.08)',
              border: `1px solid ${showHelp ? 'rgba(184,146,42,0.5)' : 'rgba(255,255,255,0.15)'}`,
              color: showHelp ? '#d4a84b' : 'rgba(255,255,255,0.8)',
              padding: '0.5rem 1.4rem', borderRadius: '20px', cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', fontWeight: '500',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s',
            }}
          >
            ? Help
          </button>
        </nav>

        {/* Hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4rem', gap: '2.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            {/* Gold line above */}
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a84b, transparent)', margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '2.5rem', color: '#d4a84b', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(212,168,75,0.4)' }}>✦</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'white', margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              letterSpacing: '-0.01em',
            }}>LuxeCut</h1>
            <p style={{
              color: 'rgba(212,168,75,0.7)', fontSize: '0.78rem',
              letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: '0.6rem',
            }}>
              Salon Management System
            </p>
            {/* Gold line below */}
            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a84b, transparent)', margin: '1rem auto 0' }} />
          </div>

          {/* Tagline */}
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', textAlign: 'center', maxWidth: '360px', lineHeight: 1.6 }}>
            Premium salon experience — book your perfect look today
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="portal-card"
              onClick={() => setMode('user')}
              style={{
                ...cardStyle('rgba(184,146,42,0.9)', 'none'),
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(184,146,42,0.3)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '2rem' }}>👤</span>
              <span>Customer Portal</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 400 }}>Book appointments</span>
            </button>

            <button
              className="portal-card"
              onClick={() => setMode('admin')}
              style={{
                ...cardStyle('rgba(255,255,255,0.08)', '1.5px solid rgba(255,255,255,0.2)'),
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '2rem' }}>⚙️</span>
              <span>Admin Panel</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 400 }}>Manage salon</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        {showHelp && (
          <div style={{ maxWidth: '780px', margin: '3rem auto 0', padding: '0 1.5rem 4rem', animation: 'helpFadeIn 0.3s ease' }}>
            <div style={{
              background: 'rgba(15,10,5,0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(184,146,42,0.25)',
              borderRadius: '20px',
              padding: '2.5rem',
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'white', margin: '0 0 0.5rem' }}>
                  How to Use LuxeCut
                </h2>
                <p style={{ color: 'rgba(212,168,75,0.6)', fontSize: '0.85rem' }}>
                  Follow these simple steps to book your salon appointment
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {steps.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
                    padding: '1.2rem',
                    background: 'rgba(184,146,42,0.06)',
                    borderRadius: '12px',
                    border: '1px solid rgba(184,146,42,0.12)',
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: '#b8922a', color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', fontSize: '0.9rem', flexShrink: 0,
                    }}>{step.icon}</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{step.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.84rem', lineHeight: 1.6 }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ height: '1px', background: 'rgba(184,146,42,0.15)', marginBottom: '2rem' }} />

              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                  Need Assistance?
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>📞</span>
                    <div>
                      <div style={{ color: '#d4a84b', fontWeight: '600', fontSize: '1.05rem' }}>+91 98765 43210</div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Mon – Sat, 9am – 7pm</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>✉️</span>
                    <div>
                      <div style={{ color: '#d4a84b', fontWeight: '600', fontSize: '1.05rem' }}>support@luxecut.com</div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>We reply within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}