import React from 'react';
import { 
  FileText, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Camera, 
  ListFilter,
  Eye,
  Sparkles
} from 'lucide-react';

export default function ReportSummary({ 
  report, 
  activeFindingIndex = 0, 
  onSelectFinding 
}) {
  if (!report) return null;

  const isScanned = report.source && report.source.includes('Scanned');

  return (
    <div className="report-summary-card">
      <div className="summary-top-banner">
        <div className="summary-title-col">
          <div className="doc-type-badge-row">
            <span className="doc-type-badge">
              <FileText size={15} />
              <span>{report.documentType || 'Medical Report'}</span>
            </span>
            <span className={`source-badge ${isScanned ? 'source-scanned' : 'source-uploaded'}`}>
              {isScanned ? <Camera size={14} /> : <FileText size={14} />}
              <span>{report.source || '📄 Uploaded Report'}</span>
            </span>
            <span className="status-badge status-ready">
              <CheckCircle2 size={14} />
              <span>Explanation Ready</span>
            </span>
          </div>
          <h2 className="report-main-title">{report.name || report.documentType}</h2>
        </div>

        <div className="summary-meta-row">
          {report.facility && (
            <div className="meta-item">
              <Building2 size={14} className="meta-icon" />
              <span>{report.facility}</span>
            </div>
          )}
          {report.date && (
            <div className="meta-item">
              <Calendar size={14} className="meta-icon" />
              <span>Date: {report.date}</span>
            </div>
          )}
        </div>
      </div>

      {/* Multiple Findings Interactive Selector */}
      {report.findings && report.findings.length > 0 && (
        <div className="report-findings-selector-section">
          <div className="findings-section-header">
            <div className="findings-title-group">
              <ListFilter size={16} />
              <span className="findings-section-title">
                Findings Identified in This Report ({report.findings.length})
              </span>
            </div>
            <span className="findings-hint">Click finding to focus anatomy</span>
          </div>

          <div className="findings-pill-list">
            {report.findings.map((f, idx) => {
              const isActive = activeFindingIndex === idx;
              return (
                <button
                  key={f.id || idx}
                  type="button"
                  onClick={() => onSelectFinding && onSelectFinding(idx)}
                  className={`finding-selector-pill ${isActive ? 'active-finding' : ''}`}
                >
                  <div className="finding-pill-header">
                    <span className="finding-number">{idx + 1}</span>
                    <span className="finding-title">{f.title || f.bodyPart}</span>
                    {isActive && <Eye size={14} className="finding-active-eye" />}
                  </div>
                  {f.side && (
                    <span className="finding-side-tag">
                      {f.side === 'left' ? 'Left Side' : f.side === 'right' ? 'Right Side' : 'Central'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
