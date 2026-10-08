import React from 'react';
import { CheckCircle2, Loader2, Sparkles, Activity } from 'lucide-react';

export default function ProcessingSteps({ currentStep = 1 }) {
  const steps = [
    { id: 1, title: 'Reading medical document', desc: 'Optical character scanning & text extraction' },
    { id: 2, title: 'Identifying report type', desc: 'Classifying imaging modality (MRI, CT, X-Ray)' },
    { id: 3, title: 'Extracting key findings', desc: 'Detecting clinical observations & descriptions' },
    { id: 4, title: 'Mapping anatomical region', desc: 'Matching body coordinates & 3D orientation' },
    { id: 5, title: 'Synthesizing simple explanation', desc: 'Generating patient-friendly multilingual insights' },
  ];

  return (
    <div className="processing-modal-card">
      <div className="processing-header">
        <div className="processing-spinner-box">
          <Loader2 className="processing-spin-icon" size={28} />
        </div>
        <div>
          <h3 className="processing-title">MediExplain AI Processing</h3>
          <p className="processing-subtitle">Analyzing report findings and mapping anatomical location...</p>
        </div>
      </div>

      <div className="processing-steps-list">
        {steps.map((s) => {
          const isDone = currentStep > s.id;
          const isCurrent = currentStep === s.id;
          return (
            <div 
              key={s.id} 
              className={`processing-step-row ${isDone ? 'step-done' : ''} ${isCurrent ? 'step-current' : ''}`}
            >
              <div className="step-indicator">
                {isDone ? (
                  <CheckCircle2 size={18} className="step-icon-done" />
                ) : isCurrent ? (
                  <Loader2 size={18} className="step-icon-spinning" />
                ) : (
                  <span className="step-dot"></span>
                )}
              </div>
              <div className="step-text-col">
                <span className="step-title">{s.title}</span>
                <span className="step-desc">{s.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="processing-progress-bar-container">
        <div 
          className="processing-progress-fill" 
          style={{ width: `${Math.min(100, (currentStep / 5) * 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
