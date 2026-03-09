import { useState } from 'react';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import UserServicesPage from './pages/user/UserServicesPage';
import MyBookingsPage from './pages/user/MyBookingsPage';

export default function UserApp({ onSwitchToAdmin }) {
  const [screen, setScreen] = useState('login'); // 'login' | 'register' | 'services' | 'mybookings'
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setScreen('services');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setScreen('login');
  };

  if (screen === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onGoRegister={() => setScreen('register')} onBack={onSwitchToAdmin} />;
  }

  if (screen === 'register') {
    return <RegisterPage onRegistered={() => setScreen('login')} onGoLogin={() => setScreen('login')} onBack={onSwitchToAdmin} />;
  }

  if (screen === 'mybookings') {
    return <MyBookingsPage user={loggedInUser} onBack={() => setScreen('services')} onLogout={handleLogout} />;
  }

  return (
    <UserServicesPage
      user={loggedInUser}
      onLogout={handleLogout}
      onMyBookings={() => setScreen('mybookings')}
    />
  );
}