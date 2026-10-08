import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Camera, 
  Eye, 
  Volume2, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Activity,
  CheckCircle,
  Users
} from 'lucide-react';
import { sampleReports } from '../data/sampleReports';

export default function Home() {
  const navigate = useNavigate();

  const handleLaunchSample = (sample) => {
    localStorage.setItem('mediexplain_active_report', JSON.stringify(sample));
    navigate('/result');
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-col">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-sparkle" />
            <span>Healthcare AI Innovation — 3D Anatomy Mapping</span>
          </div>

          <h1 className="hero-title">
            Medical reports are complicated. <br />
            <span className="hero-highlight">Understanding them shouldn’t be.</span>
          </h1>

          <p className="hero-description">
            MediExplain AI turns complex medical reports and diagnostic scans into simple, 
            understandable explanations — visually pinpointed on a 3D human anatomy model, 
            and narrated in your own regional language.
          </p>

          <div className="hero-actions-row">
            <Link to="/analyze" className="btn-hero-primary">
              <FileText size={18} />
              <span>Analyze Report</span>
              <ArrowRight size={16} />
            </Link>

            <Link to="/scan" className="btn-hero-secondary">
              <Camera size={18} />
              <span>Scan Report</span>
            </Link>
          </div>

          <div className="hero-trust-indicators">
            <div className="trust-item">
              <CheckCircle size={15} className="text-emerald-500" />
              <span>Non-Diagnostic Safety First</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={15} className="text-emerald-500" />
              <span>10 Indian & Global Languages</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={15} className="text-emerald-500" />
              <span>38+ Anatomical Regions Mapped</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Column with AI Doctor & Interactive Preview Card */}
        <div className="hero-visual-col">
          <div className="hero-card-stack">
            <div className="hero-main-card">
              <div className="hero-doctor-badge-row">
                <img 
                  src="/ai-doctor-avatar.png" 
                  alt="Dr. Alex AI Avatar" 
                  className="hero-avatar-circle"
                />
                <div>
                  <h4 className="hero-avatar-name">Dr. Alex AI</h4>
                  <span className="hero-avatar-role">Clinical Communication Assistant</span>
                </div>
                <div className="live-status-pill">
                  <span className="pulse-green"></span>
                  <span>Active</span>
                </div>
              </div>

              <div className="hero-preview-anatomy-box">
                <img 
                  src="/human-anatomy-full-body.png" 
                  alt="Human anatomy visual preview" 
                  className="hero-anatomy-img"
                />
                <div className="hero-anatomy-glow-point">
                  <span className="glow-ping"></span>
                  <span className="glow-tag">DYNAMIC PINPOINT</span>
                </div>
              </div>

              <div className="hero-preview-quote">
                “Upload any report — Knee, Spine, Chest, Brain or Abdomen. I'll show you exactly where the finding is located.”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Value Pillars Section */}
      <section className="value-pillars-section">
        <div className="section-header-centered">
          <h2 className="section-title">Designed for Patient Empowerment</h2>
          <p className="section-subtitle">
             Bridging the gap between complex clinical terminology and everyday human understanding
          </p>
        </div>

        <div className="value-cards-grid">
          <div className="value-card">
            <div className="value-icon-box bg-blue-50 text-blue-600">
              <FileText size={24} />
            </div>
            <h3 className="value-card-title">1. Understand Your Report</h3>
            <p className="value-card-desc">
              Transform dense radiology impressions and confusing acronyms into simple, plain-language insights.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon-box bg-cyan-50 text-cyan-600">
              <Eye size={24} />
            </div>
            <h3 className="value-card-title">2. See Where It Is</h3>
            <p className="value-card-desc">
              Interactive 3D anatomy visualization dynamically highlights the exact body part mentioned in your scan.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon-box bg-emerald-50 text-emerald-600">
              <Volume2 size={24} />
            </div>
            <h3 className="value-card-title">3. Listen in Your Language</h3>
            <p className="value-card-desc">
              Full translation and natural audio narration across 10 languages including Tamil, Hindi, Telugu, and English.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon-box bg-purple-50 text-purple-600">
              <HelpCircle size={24} />
            </div>
            <h3 className="value-card-title">4. Prepare for Your Doctor Visit</h3>
            <p className="value-card-desc">
              Get context-aware questions tailored to your report findings so you can talk with your doctor with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header-centered">
          <span className="section-eyebrow">4-STEP WORKFLOW</span>
          <h2 className="section-title">How MediExplain AI Works</h2>
          <p className="section-subtitle">From physical paper scan or PDF to clear anatomical understanding in seconds</p>
        </div>

        <div className="steps-cards-grid">
          <div className="step-card">
            <span className="step-num">01</span>
            <div className="step-icon-circle">
              <UploadCloudIcon />
            </div>
            <h4 className="step-card-title">Upload or Scan</h4>
            <p className="step-card-text">
              Drop a digital PDF/image or use your phone camera to capture paper medical reports.
            </p>
          </div>

          <div className="step-card">
            <span className="step-num">02</span>
            <div className="step-icon-circle">
              <Sparkles size={20} />
            </div>
            <h4 className="step-card-title">AI Understands</h4>
            <p className="step-card-text">
              Identifies document modality (MRI, CT, X-Ray) and extracts localized clinical observations.
            </p>
          </div>

          <div className="step-card">
            <span className="step-num">03</span>
            <div className="step-icon-circle">
              <Eye size={20} />
            </div>
            <h4 className="step-card-title">Simple Explanation</h4>
            <p className="step-card-text">
              Shows the finding directly on a realistic human body model with clear, friendly explanations.
            </p>
          </div>

          <div className="step-card">
            <span className="step-num">04</span>
            <div className="step-icon-circle">
              <Users size={20} />
            </div>
            <h4 className="step-card-title">Family & Doctor Tools</h4>
            <p className="step-card-text">
              Listen in your mother tongue, share simplified summaries with family, and print doctor checklists.
            </p>
          </div>
        </div>
      </section>

      {/* Fast Demo Sample Launcher Bar */}
      <section className="fast-samples-section">
        <div className="samples-box-inner">
          <div className="samples-box-text">
            <h3 className="samples-box-title">Explore Ready Diagnostic Demos</h3>
            <p className="samples-box-desc">
              Test MediExplain AI across different anatomical scans with a single click:
            </p>
          </div>

          <div className="samples-buttons-row">
            {sampleReports.slice(0, 4).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLaunchSample(sample)}
                className="btn-sample-quick"
              >
                <span>{sample.name}</span>
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
