import { useState } from 'react';
import {
  hubCredentialsConfigured,
  validateHubCredentials,
  setHubAuthenticated,
} from '../auth/hubAuth';
import Footer from './Footer';

function HubLogin({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const configured = hubCredentialsConfigured();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!configured) {
      setError('Hub sign-in is not configured. Add VITE_HUB_USERNAME and VITE_HUB_PASSWORD to .env.');
      return;
    }
    if (!validateHubCredentials(username.trim(), password)) {
      setError('Invalid username or password.');
      return;
    }
    setHubAuthenticated(true);
    onSuccess();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-100 shadow-2xl p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <img src="/logos/Elva.svg" alt="" className="w-14 h-14 object-contain" width={56} height={56} />
          </div>
          <h1 className="text-center text-xl sm:text-2xl font-black text-[#1e293b] uppercase tracking-tight italic">
            Privacy policies hub
          </h1>
          <p className="mt-3 text-center text-sm text-slate-500 font-semibold leading-relaxed">
            Sign in to view the internal directory of company privacy policy pages.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="hub-user" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Username
              </label>
              <input
                id="hub-user"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[#1e293b] font-semibold outline-none focus:border-[#4b6f9e] focus:ring-2 focus:ring-[#4b6f9e]/20"
              />
            </div>
            <div>
              <label htmlFor="hub-pass" className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                Password
              </label>
              <input
                id="hub-pass"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[#1e293b] font-semibold outline-none focus:border-[#4b6f9e] focus:ring-2 focus:ring-[#4b6f9e]/20"
              />
            </div>

            {error ? (
              <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#1e293b] py-3.5 text-[11px] font-black uppercase tracking-widest text-white hover:bg-[#4b6f9e] transition-colors shadow-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HubLogin;
