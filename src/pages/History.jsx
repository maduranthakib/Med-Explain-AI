import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  FileText, 
  ArrowRight, 
  Calendar, 
  Camera, 
  Trash2, 
  Plus, 
  Eye, 
  CheckCircle2, 
  Activity,
  Layers,
  Building2
} from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';
import { sampleReports } from '../data/sampleReports';

export default function History() {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mediexplain_history');
      if (stored) {
        setHistoryList(JSON.parse(stored));
      } else {
        // Pre-populate with realistic samples for rich display
        const initial = sampleReports.slice(0, 4).map((s) => ({
          id: s.id,
          name: s.name,
          documentType: s.documentType,
          date: s.date,
          source: s.source,
          summaryFinding: s.summaryFinding,
          facility: s.facility,
          rawReport: s,
        }));
        setHistoryList(initial);
        localStorage.setItem('mediexplain_history', JSON.stringify(initial));
      }
    } catch (e) {
      setHistoryList([]);
    }
  }, []);

  const handleViewReport = (item) => {
    localStorage.setItem('mediexplain_active_report', JSON.stringify(item.rawReport || item));
    navigate('/result');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your saved reports history?')) {
      localStorage.removeItem('mediexplain_history');
      setHistoryList([]);
    }
  };

  return (
    <div className="history-page-main">
      <div className="history-content-container">
        {/* Page Header with Proper Alignment and Consistent Gaps */}
        <div className="history-header-card">
          <div className="history-header-text-block">
            <div className="history-badge-pill">
              <Clock size={14} />
              <span>Medical Report Archive</span>
            </div>
            <h1 className="history-main-title">Report History</h1>
            <p className="history-main-subtitle">
              Review and revisit your previously uploaded diagnostic scans, anatomical visualizations, and AI explanations.
            </p>
          </div>

          {/* Action Buttons: Perfectly aligned horizontally with consistent heights and padding */}
          <div className="history-actions-bar">
            <button 
              type="button" 
              onClick={() => navigate('/analyze')} 
              className="btn-history-upload"
            >
              <Plus size={16} />
              <span>Upload New Report</span>
            </button>

            {historyList.length > 0 && (
              <button 
                type="button" 
                onClick={handleClearHistory} 
                className="btn-history-clear"
                title="Clear local report history"
              >
                <Trash2 size={16} />
                <span>Clear History</span>
              </button>
            )}
          </div>
        </div>

        {/* Report History Cards Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        {historyList.length > 0 ? (
          <div className="history-cards-grid-layout">
            {historyList.map((item, index) => {
              const isScanned = item.source && item.source.includes('Scanned');
              return (
                <div key={item.id || index} className="history-report-card">
                  {/* Top Badges Row */}
                  <div className="history-card-badges-row">
                    <span className="history-modality-badge">
                      <FileText size={13} />
                      <span>{item.documentType || 'Medical Report'}</span>
                    </span>
                    <span className={`history-source-pill ${isScanned ? 'source-scanned' : 'source-uploaded'}`}>
                      {isScanned ? <Camera size={12} /> : <FileText size={12} />}
                      <span>{item.source || 'Uploaded Report'}</span>
                    </span>
                  </div>

                  {/* Card Title & Facility */}
                  <div className="history-card-title-section">
                    <h3 className="history-card-heading" title={item.name}>
                      {item.name || item.documentType}
                    </h3>
                    {item.facility && (
                      <span className="history-facility-sub">
                        <Building2 size={13} />
                        <span>{item.facility}</span>
                      </span>
                    )}
                  </div>

                  {/* Finding Summary Box with Text Wrapping */}
                  <div className="history-finding-box">
                    <div className="history-finding-label">
                      <Activity size={13} className="text-primary-600" />
                      <span>Key Finding:</span>
                    </div>
                    <p className="history-finding-desc">
                      {item.summaryFinding || "Localized anatomical finding identified for clinical correlation."}
                    </p>
                  </div>

                  {/* Date Meta Row with Aligned Icon */}
                  <div className="history-card-meta-row">
                    <div className="meta-date-badge">
                      <Calendar size={14} className="meta-date-icon" />
                      <span>Date: {item.date || 'Recent'}</span>
                    </div>
                    <div className="meta-status-tag">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <span>Ready</span>
                    </div>
                  </div>

                  {/* Card Footer Button with Clean Hover Effect */}
                  <div className="history-card-footer-action">
                    <button 
                      type="button" 
                      onClick={() => handleViewReport(item)} 
                      className="btn-card-view-result"
                    >
                      <span>View Result & Anatomy</span>
                      <ArrowRight size={15} className="arrow-hover-shift" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="history-empty-placeholder-card">
            <div className="empty-icon-circle">
              <Clock size={40} />
            </div>
            <h3 className="empty-heading">No Reports Saved in History</h3>
            <p className="empty-subtext">
              When you upload medical reports or scan documents with your camera, they will be archived here for easy future access.
            </p>
            <button 
              type="button" 
              onClick={() => navigate('/analyze')} 
              className="btn-history-upload mt-3"
            >
              <Plus size={16} />
              <span>Upload Your First Report</span>
            </button>
          </div>
        )}

        {/* Medical Safety Notice Alert Panel */}
        <SafetyBanner />
      </div>
    </div>
  );
}
