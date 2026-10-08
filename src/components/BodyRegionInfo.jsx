import React from 'react';
import { MapPin, ShieldCheck, Activity, Layers } from 'lucide-react';
import { findAnatomicalRegion } from '../data/anatomicalRegions';

export default function BodyRegionInfo({ activeFinding, language = 'en' }) {
  const region = findAnatomicalRegion(activeFinding?.bodyPart);

  return (
    <div className="body-region-info-card">
      <div className="region-info-header">
        <div className="region-icon-pill">
          <MapPin size={18} />
        </div>
        <div>
          <h4 className="region-info-title">Where is this located?</h4>
          <span className="region-info-subtitle">Clinical Anatomical Correlation</span>
        </div>
      </div>

      <div className="region-details-box">
        <div className="region-name-badge">
          <span className="region-primary-name">
            {region ? region.label : (activeFinding?.title || 'Identified Region')}
          </span>
          {activeFinding?.side && activeFinding.side !== 'center' && (
            <span className="region-side-tag">
              Side: {activeFinding.side.toUpperCase()}
            </span>
          )}
        </div>

        <div className="region-description-block">
          <h5 className="desc-subheading">Anatomical Function & Importance:</h5>
          <p className="desc-text">
            {region?.roleDescription || 
              "This anatomical structure supports essential physiological function and bodily mobility. Diagnostic imaging visualizes its tissue density, contours, and alignment."}
          </p>
        </div>

        {activeFinding?.findingText && (
          <div className="report-finding-quote-box">
            <span className="quote-label">Excerpt from your report:</span>
            <blockquote className="quote-text">
              “{activeFinding.findingText}”
            </blockquote>
          </div>
        )}
      </div>

      <div className="region-safety-notice">
        <ShieldCheck size={14} className="safety-icon" />
        <span>Location shown is based strictly on findings described in your medical document.</span>
      </div>
    </div>
  );
}
