import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  Activity,
  ShieldCheck,
  Check
} from 'lucide-react';
import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Default redirect is to /home (Home/Dashboard page)
  const redirectTarget = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (isSignUp && (!name || name.trim().length < 2)) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address (e.g. patient@mediexplain.org).');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        await authService.signup(name, email, password, rememberMe);
        setSuccessMessage('Account created successfully! Redirecting to Dashboard...');
      } else {
        await authService.login(email, password, rememberMe);
        setSuccessMessage('Logged in successfully! Redirecting to Dashboard...');
      }

      setTimeout(() => {
        setIsLoading(false);
        navigate(redirectTarget, { replace: true });
      }, 600);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      await authService.loginWithGoogle(rememberMe);
      setSuccessMessage('Signed in with Google! Redirecting to Dashboard...');
      setTimeout(() => {
        setIsLoading(false);
        navigate(redirectTarget, { replace: true });
      }, 600);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Google Sign-In was cancelled or failed. Please try again.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-box">
        {/* Brand header */}
        <div className="login-brand-header">
          <div className="login-brand-icon-wrapper">
            <Activity className="login-brand-icon" size={26} />
          </div>
          <h2 className="login-brand-title">
            MediExplain<span className="brand-accent">AI</span>
          </h2>
          <p className="login-tagline">
            {isSignUp ? 'Create your patient account' : 'Sign in to access your reports & 3D anatomy explanations'}
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div className="social-auth-section">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="btn-google-signin"
          >
            <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="login-divider-row">
          <span className="divider-line"></span>
          <span className="divider-label">or with medical account</span>
          <span className="divider-line"></span>
        </div>

        {/* Feedback Alert Banners */}
        {errorMessage && (
          <div className="auth-alert-box auth-alert-error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert-box auth-alert-success">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="auth-form-fields">
          {isSignUp && (
            <div className="form-field-group">
              <label className="field-label" htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input-element"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-field-group">
            <label className="field-label" htmlFor="userEmail">Email or Username</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input
                id="userEmail"
                type="email"
                placeholder="patient@mediexplain.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input-element"
                required
              />
            </div>
          </div>

          <div className="form-field-group">
            <div className="field-label-split">
              <label className="field-label" htmlFor="userPassword">Password</label>
              {!isSignUp && (
                <button 
                  type="button" 
                  onClick={() => alert('Password reset link has been dispatched to your email address.')} 
                  className="btn-forgot-password"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input
                id="userPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input-element"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn-toggle-password"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-checkbox-row">
            <label className="checkbox-container">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
              />
              <span className="checkbox-custom">
                {rememberMe && <Check size={12} strokeWidth={3} />}
              </span>
              <span className="checkbox-label-text">Remember me on this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-submit-auth"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : isSignUp ? (
              <>
                <UserPlus size={18} />
                <span>Create Account</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In to MediExplain AI</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <div className="auth-toggle-footer">
          <p className="toggle-text">
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="btn-toggle-mode"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

        <div className="login-security-badge">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Encrypted patient authentication session.</span>
        </div>
      </div>
    </div>
  );
}
