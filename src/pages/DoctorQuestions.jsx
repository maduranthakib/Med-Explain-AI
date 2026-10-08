import React, { useState, useEffect } from 'react';
import { HelpCircle, ArrowLeft, Printer, Copy, Check, CheckSquare, Square, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafetyBanner from '../components/SafetyBanner';
import { sampleReports } from '../data/sampleReports';
import { aiService } from '../services/aiService';

export default function DoctorQuestions() {
  const [report, setReport] = useState(null);
  const [checkedMap, setCheckedMap] = useState({});
  const [copiedAll, setCopiedAll] = useState(false);

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

  const questions = report ? aiService.getDoctorQuestions(report) : [];

  const toggleCheck = (idx) => {
    setCheckedMap(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyAll = () => {
    if (!questions.length) return;
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="questions-page-container">
      <div className="page-nav-back">
        <Link to="/result" className="btn-back-link">
          <ArrowLeft size={16} />
          <span>Back to Result Dashboard</span>
        </Link>
      </div>

      <div className="page-hero-banner">
        <div className="banner-icon-badge">
          <Stethoscope size={28} />
        </div>
        <div>
          <h1 className="page-main-title">Questions to Ask Your Doctor</h1>
          <p className="page-main-subtitle">
            Personalized question checklist tailored to your report findings for your next clinical appointment.
          </p>
        </div>
      </div>

      <div className="questions-content-card">
        <div className="questions-card-toolbar">
          <div>
            <span className="doc-reference-tag">Current Scan: {report?.name || report?.documentType}</span>
            <h3 className="toolbar-heading">Interactive Checklist</h3>
          </div>
          <div className="toolbar-buttons">
            <button type="button" onClick={handleCopyAll} className="btn-action-outline">
              {copiedAll ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedAll ? 'Copied All!' : 'Copy All Questions'}</span>
            </button>
            <button type="button" onClick={handlePrint} className="btn-action-outline">
              <Printer size={16} />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>

        <div className="checklist-items-container">
          {questions.map((q, idx) => {
            const isChecked = !!checkedMap[idx];
            return (
              <div 
                key={idx} 
                className={`checklist-item-card ${isChecked ? 'item-checked' : ''}`}
                onClick={() => toggleCheck(idx)}
              >
                <div className="item-checkbox">
                  {isChecked ? (
                    <CheckSquare size={20} className="text-primary-blue" />
                  ) : (
                    <Square size={20} className="text-slate-400" />
                  )}
                </div>
                <div className="item-text-col">
                  <span className="item-num">Question {idx + 1}:</span>
                  <p className="item-question">{q}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="consultation-guidance-box">
          <h4 className="guidance-title">Doctor Consultation Strategy:</h4>
          <p className="guidance-text">
            Doctors appreciate organized patients. You can show this screen on your mobile phone or hand the printed checklist to your doctor at the start of your consultation so all your questions are systematically addressed.
          </p>
        </div>
      </div>

      <SafetyBanner />
    </div>
  );
}
