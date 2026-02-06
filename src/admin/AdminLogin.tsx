import { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../store/dataStore';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('hydraforge_auth', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Site
        </button>

        <div className="rounded-2xl bg-[#2a2a2a] p-8 border border-gray-800">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 mb-4" />
            <h1 className="text-2xl font-bold text-white">HydraForge Admin</h1>
            <p className="text-gray-400 mt-2">Sign in to manage your platforms</p>
          </div>

          {/* Credentials hint */}
          <div className="mb-6">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="w-full text-left rounded-lg bg-gray-900/50 border border-gray-700 px-4 py-3 text-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-medium">🔑 Show Login Credentials</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showCredentials ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {showCredentials && (
                <div className="mt-3 pt-3 border-t border-gray-700 space-y-1">
                  <p className="text-gray-300"><span className="text-gray-500">Email:</span> {ADMIN_CREDENTIALS.email}</p>
                  <p className="text-gray-300"><span className="text-gray-500">Password:</span> {ADMIN_CREDENTIALS.password}</p>
                </div>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder="admin@hydraforge.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                placeholder="••••••••••••"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Protected admin area • HydraForge Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
