import React, { useState, useEffect } from 'react';
import { Users, Heart, Share2, Copy, Check, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import VoiceButton from '../components/VoiceButton';
import LanguageSelector from '../components/LanguageSelector';
import SafetyBanner from '../components/SafetyBanner';
import { sampleReports } from '../data/sampleReports';
import { aiService } from '../services/aiService';

export default function FamilyMode() {
  const [report, setReport] = useState(null);
  const [language, setLanguage] = useState('en');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mediexplain_active_report');
      if (stored) {
        setReport(JSON.parse(stored));
      } else {
        setReport(sampleReports[0]);
      }
    } catch (e) {
      setReport(sampleReports[0]);
    }
  }, []);

  const summary = report ? aiService.getFamilySummary(report, language) : '';

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () => {
    if (!summary) return;
    const msg = encodeURIComponent(`MediExplain AI Family Update for ${report?.documentType || 'Medical Report'}:\n\n${summary}\n\n(Explained gently for loved ones)`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <div className="family-page-container">
      <div className="page-nav-back">
        <Link to="/result" className="btn-back-link">
          <ArrowLeft size={16} />
          <span>Back to Result Dashboard</span>
        </Link>
      </div>

      <div className="page-hero-banner">
        <div className="banner-icon-badge">
          <Users size={28} />
        </div>
        <div>
          <h1 className="page-main-title">Family Mode</h1>
          <p className="page-main-subtitle">
            Share gentle, non-alarming explanations with parents, spouses, and caregivers in simple words.
          </p>
        </div>
      </div>

      <div className="family-content-grid">
        <div className="family-card-main">
          <div className="family-card-header-row">
            <div>
              <span className="doc-reference-tag">Current Document: {report?.name || report?.documentType}</span>
              <h3 className="family-summary-heading">Simple Explanation for Loved Ones</h3>
            </div>
            <VoiceButton text={summary} lang={language} label="Listen with Family" />
          </div>

          <div className="family-statement-box">
            <p className="family-quote-text">
              “{summary}”
            </p>
          </div>

          <div className="family-share-actions">
            <button type="button" onClick={handleCopy} className="btn-action-outline">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Explanation'}</span>
            </button>
            <button type="button" onClick={handleWhatsApp} className="btn-action-whatsapp">
              <MessageCircle size={16} />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="family-sidebar-column">
          <LanguageSelector currentLang={language} onSelectLang={setLanguage} />

          <div className="family-tips-box">
            <Heart size={20} className="text-rose-500 mb-2" />
            <h4 className="tips-title">Tips for Talking to Family</h4>
            <ul className="tips-list">
              <li>Keep the tone calm and focused on the doctor's next scheduled visit.</li>
              <li>Explain that medical scans commonly record minor variations that do not signify danger.</li>
              <li>Encourage writing down questions together for the appointment.</li>
            </ul>
          </div>
        </div>
      </div>

      <SafetyBanner />
    </div>
  );
}
