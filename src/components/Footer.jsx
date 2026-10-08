import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <div className="footer-brand-logo">
              <div className="footer-icon-pill">
                <Activity size={18} />
              </div>
              <span className="footer-brand-text">MediExplain<span className="brand-accent">AI</span></span>
            </div>
            <p className="footer-tagline">“See it. Understand it. Explain it.”</p>
            <p className="footer-desc">
              Transforming intricate medical reports and diagnostic scans into clear, intuitive, 
              visually mapped explanations for patients and families.
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/home">Dashboard</Link></li>
              <li><Link to="/analyze">Analyze Report</Link></li>
              <li><Link to="/scan">Scan with Camera</Link></li>
              <li><Link to="/history">Report History</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Patient Resources</h4>
            <ul className="footer-nav-list">
              <li><Link to="/family-mode">Family Mode</Link></li>
              <li><Link to="/doctor-questions">Questions for Doctor</Link></li>
              <li><Link to="/privacy">Privacy & Safety Policy</Link></li>
              <li><Link to="/login">Account Sign In</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Medical Safety</h4>
            <div className="safety-mini-box">
              <ShieldCheck className="safety-mini-icon" size={20} />
              <p className="safety-mini-text">
                For educational comprehension only. MediExplain AI does not diagnose conditions, 
                prescribe medications, or replace licensed physician care.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {new Date().getFullYear()} MediExplain AI. Built for Healthcare AI Hackathon.
          </p>
          <div className="footer-credits">
            <span>Powered by Clinical AI & 3D Anatomy Mapping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
