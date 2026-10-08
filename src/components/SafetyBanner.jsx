import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="safety-banner-wrapper">
      <div className="safety-banner-card">
        <div className="safety-banner-icon-col">
          <ShieldAlert className="safety-shield-icon" size={24} />
        </div>
        <div className="safety-banner-content">
          <h4 className="safety-banner-title">Medical Safety & Educational Notice</h4>
          <p className="safety-banner-p">
            <strong>Important:</strong> MediExplain AI helps you understand medical terminology and provides 
            visual anatomical references for educational comprehension. 
            <strong> It does not provide medical diagnosis, prescribe treatments, stage illnesses, or substitute for a qualified healthcare professional.</strong> Always review your diagnostic findings directly with your treating physician.
          </p>
        </div>
      </div>
    </div>
  );
}
