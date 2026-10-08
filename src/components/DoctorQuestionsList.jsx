import React, { useState } from 'react';
import { HelpCircle, CheckSquare, Square, Copy, Check, Printer, FileDown } from 'lucide-react';

export default function DoctorQuestionsList({ questions = [] }) {
  const [checkedMap, setCheckedMap] = useState({});
  const [copiedAll, setCopiedAll] = useState(false);

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
    <div className="doctor-questions-card">
      <div className="questions-card-header">
        <div className="questions-title-group">
          <div className="questions-icon-pill">
            <HelpCircle size={18} />
          </div>
          <div>
            <h3 className="questions-card-title">Questions to Ask Your Doctor</h3>
            <span className="questions-card-subtitle">
              Prepare for a productive consultation with tailored questions
            </span>
          </div>
        </div>

        <div className="questions-header-actions">
          <button 
            type="button" 
            onClick={handleCopyAll} 
            className="btn-action-outline"
          >
            {copiedAll ? <Check size={15} /> : <Copy size={15} />}
            <span>{copiedAll ? 'Questions Copied!' : 'Copy All'}</span>
          </button>
          <button 
            type="button" 
            onClick={handlePrint} 
            className="btn-action-outline"
          >
            <Printer size={15} />
            <span>Print Checklist</span>
          </button>
        </div>
      </div>

      <div className="questions-checklist-box">
        {questions.map((q, idx) => {
          const isChecked = !!checkedMap[idx];
          return (
            <div 
              key={idx} 
              className={`question-item-row ${isChecked ? 'question-item-checked' : ''}`}
              onClick={() => toggleCheck(idx)}
            >
              <div className="question-checkbox">
                {isChecked ? (
                  <CheckSquare size={18} className="text-primary-blue" />
                ) : (
                  <Square size={18} className="text-slate-400" />
                )}
              </div>
              <div className="question-content">
                <span className="question-number">Q{idx + 1}:</span>
                <span className="question-text">{q}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="questions-card-footer">
        <span className="questions-footer-tip">
          💡 Tip: You can check off questions during your appointment or hand this printed sheet to your doctor.
        </span>
      </div>
    </div>
  );
}
