'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { base44, APP_URL } from '../../lib/base44Client';
import AuthShell from './AuthShell';
import GoogleIcon from '../icons/GoogleIcon';
import { MicrosoftIcon, FacebookIcon, AppleIcon } from '../icons/ProviderIcons';

const inputStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#fafafa',
};

const pillWhite = { background: '#ffffff', color: '#0a0a0a' };
const pillOutline = { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fafafa' };
const pillPrimary = { background: '#4ADE80', color: '#06170c' };

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { access_token } = await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = `${APP_URL}/?access_token=${encodeURIComponent(access_token)}`;
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };

  const handleProvider = (provider) => {
    base44.auth.loginWithProvider(provider, `${APP_URL}/`);
  };

  return (
    <AuthShell
      title="Welcome back"
      footer={
        <>
          New to Langsi?{' '}
          <a href="/register/" className="font-semibold hover:underline" style={{ color: '#4ADE80' }}>
            Create account
          </a>
        </>
      }
    >
      <div className="space-y-3 mb-6">
        <button
          type="button"
          className="w-full h-14 rounded-full text-base font-semibold flex items-center justify-center transition-opacity hover:opacity-90"
          style={pillWhite}
          onClick={() => handleProvider('google')}
        >
          <GoogleIcon className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        <button
          type="button"
          className="w-full h-14 rounded-full text-base font-semibold flex items-center justify-center transition-opacity hover:opacity-90"
          style={pillWhite}
          onClick={() => handleProvider('apple')}
        >
          <AppleIcon className="w-5 h-5 mr-2" />
          Continue with Apple
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-14 rounded-full text-sm font-medium flex items-center justify-center transition-colors hover:bg-white/5"
            style={pillOutline}
            onClick={() => handleProvider('microsoft')}
          >
            <MicrosoftIcon className="w-5 h-5 mr-2" />
            Microsoft
          </button>
          <button
            type="button"
            className="h-14 rounded-full text-sm font-medium flex items-center justify-center transition-colors hover:bg-white/5"
            style={pillOutline}
            onClick={() => handleProvider('facebook')}
          >
            <FacebookIcon className="w-5 h-5 mr-2" />
            Facebook
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full" style={{ borderTop: '1px solid rgba(74,222,128,0.3)' }} />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3" style={{ background: '#050505', color: '#4ADE80' }}>or</span>
        </div>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} aria-hidden="true" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl pl-10 pr-3 text-sm placeholder:text-white/30 focus:outline-none"
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <a href={`${APP_URL}/forgot-password`} className="text-xs hover:underline" style={{ color: '#4ADE80' }}>
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} aria-hidden="true" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-xl pl-10 pr-10 text-sm placeholder:text-white/30 focus:outline-none"
              style={inputStyle}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-14 rounded-full font-semibold flex items-center justify-center disabled:opacity-60"
          style={pillPrimary}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </AuthShell>
  );
}
