import { useState, useEffect } from 'react';
import PublicSite from './PublicSite';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

type View = 'public' | 'login' | 'admin';

function App() {
  const [view, setView] = useState<View>('public');

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('hydraforge_auth');
    if (auth === 'true' && view === 'login') {
      setView('admin');
    }
  }, [view]);

  switch (view) {
    case 'login':
      return (
        <AdminLogin
          onLogin={() => setView('admin')}
          onBack={() => setView('public')}
        />
      );
    case 'admin':
      return (
        <AdminDashboard
          onLogout={() => setView('login')}
          onBack={() => setView('public')}
        />
      );
    default:
      return <PublicSite onAdminClick={() => setView('login')} />;
  }
}

export default App;
