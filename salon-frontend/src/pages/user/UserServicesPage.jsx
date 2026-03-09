import { useState, useEffect } from 'react';
import { getAllServices, getAllStaff, addBooking } from '../../services/api';
import '../../user.css';

export default function UserServicesPage({ user, onLogout, onMyBookings }) {
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1=pick staff, 2=pick time, 3=confirm, 4=success
  const [bookingForm, setBookingForm] = useState({ staffId: '', date: '', time: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [svcs, stf] = await Promise.all([getAllServices(), getAllStaff()]);
        setServices(svcs || []);
        setStaff(stf || []);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const openBooking = (service) => {
    setSelectedService(service);
    setBookingStep(1);
    setBookingForm({ staffId: '', date: '', time: '' });
    setError('');
  };

  const closeModal = () => setSelectedService(null);

  const handleBook = async () => {
    if (!bookingForm.staffId || !bookingForm.date || !bookingForm.time) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addBooking({
        userId: user.id,
        serviceId: selectedService.id,
        staffId: Number(bookingForm.staffId),
        bookingDate: bookingForm.date,
        bookingTime: bookingForm.time,
        status: 'BOOKED',
      });
      setBookingStep(4);
    } catch {
      setError('Booking failed. Please try again.');
    }
    setSubmitting(false);
  };

  const serviceIcons = ['✂', '💈', '🪒', '💆', '🧴', '✨'];
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  const minDate = new Date().toISOString().split('T')[0];

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
          <span className="u-user-name">Hello, {user.name?.split(' ')[0]}</span>
          <button
            onClick={onMyBookings}
            style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', color: '#c9a96e', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', fontWeight: '500', marginRight: '0.5rem' }}
          >
            📋 My Bookings
          </button>
          <button className="u-logout-btn" onClick={onLogout}>Sign Out</button>
        </div>
      </header>

      {/* Hero */}
      <div className="u-hero">
        <div className="u-hero-content">
          <p className="u-hero-eyebrow">Premium Salon Services</p>
          <h1 className="u-hero-title">Book Your Perfect Look</h1>
          <p className="u-hero-sub">Choose a service below and schedule your appointment</p>
        </div>
        <div className="u-hero-deco">
          <div className="u-deco-ring u-r1"></div>
          <div className="u-deco-ring u-r2"></div>
        </div>
      </div>

      {/* Services */}
      <div className="u-services-section">
        <h2 className="u-section-heading">Our Services</h2>
        {loading ? (
          <div className="u-loading">
            <div className="u-spinner"></div>
            <span>Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="u-empty">No services available right now.</div>
        ) : (
          <div className="u-services-grid">
            {services.map((s, i) => (
              <div key={s.id} className="u-service-card" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="u-service-icon-wrap">
                  <span className="u-service-icon">{serviceIcons[i % serviceIcons.length]}</span>
                </div>
                <div className="u-service-body">
                  <h3 className="u-service-name">{s.name}</h3>
                  <p className="u-service-desc">{s.description || 'Professional salon service tailored for you'}</p>
                  <div className="u-service-footer">
                    <div className="u-service-info">
                      <span className="u-price">₹{s.price}</span>
                      <span className="u-duration">⏱ {s.duration} min</span>
                    </div>
                    <button className="u-book-btn" onClick={() => openBooking(s)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="u-modal-overlay" onClick={bookingStep !== 4 ? closeModal : undefined}>
          <div className="u-modal" onClick={(e) => e.stopPropagation()}>

            {/* Step 4: Success */}
            {bookingStep === 4 ? (
              <div className="u-success-screen">
                <div className="u-success-icon">✓</div>
                <h3 className="u-success-title">Booking Confirmed!</h3>
                <p className="u-success-sub">
                  Your <strong>{selectedService.name}</strong> appointment is booked for{' '}
                  <strong>{bookingForm.date}</strong> at <strong>{bookingForm.time}</strong>.
                </p>
                <div className="u-success-detail">
                  <span>Staff: {staff.find(s => s.id === Number(bookingForm.staffId))?.name ?? '—'}</span>
                </div>
                <button className="u-btn-primary" onClick={closeModal} style={{ marginTop: '1.5rem' }}>
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="u-modal-header">
                  <div>
                    <p className="u-modal-service-tag">Booking</p>
                    <h3 className="u-modal-title">{selectedService.name}</h3>
                    <p className="u-modal-meta">₹{selectedService.price} · {selectedService.duration} min</p>
                  </div>
                  <button className="u-modal-close" onClick={closeModal}>✕</button>
                </div>

                {/* Steps indicator */}
                <div className="u-steps">
                  {['Choose Staff', 'Pick Date & Time', 'Confirm'].map((label, idx) => (
                    <div key={label} className={`u-step ${bookingStep === idx + 1 ? 'active' : bookingStep > idx + 1 ? 'done' : ''}`}>
                      <div className="u-step-dot">{bookingStep > idx + 1 ? '✓' : idx + 1}</div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {error && <div className="u-alert u-alert-error" style={{ margin: '0 0 1rem' }}>{error}</div>}

                {/* Step 1: Choose Staff */}
                {bookingStep === 1 && (
                  <div className="u-step-content">
                    <p className="u-step-label">Select your stylist</p>
                    {staff.length === 0 ? (
                      <p className="u-empty">No staff available.</p>
                    ) : (
                      <div className="u-staff-grid">
                        {staff.map((s) => (
                          <div
                            key={s.id}
                            className={`u-staff-card ${bookingForm.staffId === String(s.id) ? 'selected' : ''}`}
                            onClick={() => setBookingForm({ ...bookingForm, staffId: String(s.id) })}
                          >
                            <div className="u-staff-avatar">{s.name?.charAt(0)}</div>
                            <div className="u-staff-name">{s.name}</div>
                            <div className="u-staff-spec">{s.specialization}</div>
                            {bookingForm.staffId === String(s.id) && <div className="u-selected-check">✓</div>}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="u-modal-actions">
                      <button className="u-btn-ghost" onClick={closeModal}>Cancel</button>
                      <button
                        className="u-btn-primary"
                        onClick={() => { if (!bookingForm.staffId) { setError('Please select a staff member.'); return; } setError(''); setBookingStep(2); }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {bookingStep === 2 && (
                  <div className="u-step-content">
                    <div className="u-field-row">
                      <div className="u-field">
                        <label>Select Date</label>
                        <input
                          type="date"
                          min={minDate}
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="u-field" style={{ marginTop: '1.2rem' }}>
                      <label>Select Time Slot</label>
                      <div className="u-timeslots">
                        {timeSlots.map((t) => (
                          <button
                            key={t}
                            className={`u-slot ${bookingForm.time === t ? 'selected' : ''}`}
                            onClick={() => setBookingForm({ ...bookingForm, time: t })}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="u-modal-actions">
                      <button className="u-btn-ghost" onClick={() => { setBookingStep(1); setError(''); }}>← Back</button>
                      <button
                        className="u-btn-primary"
                        onClick={() => { if (!bookingForm.date || !bookingForm.time) { setError('Please select date and time.'); return; } setError(''); setBookingStep(3); }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {bookingStep === 3 && (
                  <div className="u-step-content">
                    <p className="u-step-label">Review your booking</p>
                    <div className="u-confirm-card">
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Service</span>
                        <span className="u-confirm-val">{selectedService.name}</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Price</span>
                        <span className="u-confirm-val">₹{selectedService.price}</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Duration</span>
                        <span className="u-confirm-val">{selectedService.duration} min</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Stylist</span>
                        <span className="u-confirm-val">{staff.find(s => s.id === Number(bookingForm.staffId))?.name ?? '—'}</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Date</span>
                        <span className="u-confirm-val">{bookingForm.date}</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Time</span>
                        <span className="u-confirm-val">{bookingForm.time}</span>
                      </div>
                      <div className="u-confirm-row">
                        <span className="u-confirm-key">Customer</span>
                        <span className="u-confirm-val">{user.name}</span>
                      </div>
                    </div>
                    <div className="u-modal-actions">
                      <button className="u-btn-ghost" onClick={() => { setBookingStep(2); setError(''); }}>← Back</button>
                      <button className="u-btn-primary u-btn-gold" onClick={handleBook} disabled={submitting}>
                        {submitting ? <span className="u-spinner"></span> : '✓ Confirm Booking'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}