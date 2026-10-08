import React, { useState } from 'react';
import { Users, Copy, Check, Share2, MessageCircle } from 'lucide-react';
import VoiceButton from './VoiceButton';

export default function FamilySummaryCard({ summaryText, language = 'en' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!summaryText) return;
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    if (!summaryText) return;
    const msg = encodeURIComponent(`MediExplain AI Family Summary:\n\n${summaryText}\n\n(Explained simply for family members)`);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <div className="family-summary-card">
      <div className="family-card-header">
        <div className="family-title-group">
          <div className="family-icon-pill">
            <Users size={18} />
          </div>
          <div>
            <h3 className="family-card-title">Explain this to My Family</h3>
            <span className="family-card-subtitle">Gentle, non-technical words for parents, spouses & caregivers</span>
          </div>
        </div>

        <VoiceButton 
          text={summaryText} 
          lang={language} 
          label="Listen for Family"
        />
      </div>

      <div className="family-quote-box">
        <p className="family-summary-text">
          “{summaryText || "The medical report highlights a localized area under physician evaluation. It does not indicate an acute emergency by itself. We will discuss the finding directly with our doctor."}”
        </p>
      </div>

      <div className="family-card-actions">
        <button 
          type="button" 
          onClick={handleCopy} 
          className="btn-action-outline"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
        </button>

        <button 
          type="button" 
          onClick={handleWhatsAppShare} 
          className="btn-action-whatsapp"
        >
          <MessageCircle size={16} />
          <span>Share on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
