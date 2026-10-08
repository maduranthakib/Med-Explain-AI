import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  FileText, 
  Camera, 
  Clock, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';
import { authService } from '../services/authService';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/home', icon: Activity },
    { name: 'Analyze Report', path: '/analyze', icon: FileText },
    { name: 'Scan Report', path: '/scan', icon: Camera },
    { name: 'Report History', path: '/history', icon: Clock },
    { name: 'Family Mode', path: '/family-mode', icon: Users },
    { name: 'Doctor Questions', path: '/doctor-questions', icon: HelpCircle },
    { name: 'Privacy', path: '/privacy', icon: ShieldCheck },
  ];

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/home' || location.pathname === '/')) return true;
    if (path !== '/home' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // On Login page, render a clean focused navigation bar
  const isLoginPage = location.pathname === '/login' || (!currentUser && location.pathname === '/');

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo - Perfectly centered vertically */}
        <Link 
          to={currentUser ? "/home" : "/login"} 
          className="brand-link" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="brand-icon-wrapper">
            <Activity className="brand-icon" size={20} />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">MediExplain<span className="brand-accent">AI</span></span>
            <span className="brand-badge">2.0</span>
          </div>
        </Link>

        {/* Desktop Navigation Links with consistent vertical alignment and gaps */}
        {!isLoginPage && currentUser && (
          <nav className="desktop-nav">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${active ? 'nav-item-active' : ''}`}
                >
                  <Icon className="nav-icon" size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Desktop User Profile / Auth Actions */}
        <div className="navbar-actions">
          {currentUser ? (
            <div className="user-profile-menu">
              <div className="user-avatar-badge" title={currentUser.email}>
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-img" />
                ) : (
                  <User size={16} />
                )}
                <span className="user-display-name">{currentUser.name}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="btn-logout"
                title="Sign out of MediExplain AI"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login-nav">
              <LogIn size={15} />
              <span>Log In</span>
            </Link>
          )}

          {/* Mobile hamburger button */}
          {!isLoginPage && currentUser && (
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isLoginPage && currentUser && (
        <div className="mobile-menu-drawer">
          <div className="mobile-links-list">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-item ${active ? 'mobile-nav-item-active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="mobile-auth-divider">
              <div className="mobile-user-actions">
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>{currentUser.name}</span>
                </div>
                <button onClick={handleLogout} className="mobile-btn-logout">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
