import React from 'react';
import { HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import VoiceButton from './VoiceButton';

export default function ExplanationCard({ 
  explanationText, 
  language = 'en', 
  activeFinding 
}) {
  return (
    <div className="explanation-card">
      <div className="explanation-card-header">
        <div className="explanation-title-row">
          <div className="explanation-icon-pill">
            <HelpCircle size={18} />
          </div>
          <div>
            <h3 className="explanation-main-heading">What does this mean?</h3>
            <span className="explanation-subheading">Plain-language medical overview</span>
          </div>
        </div>

        {/* Embedded Voice Button */}
        <VoiceButton 
          text={explanationText} 
          lang={language} 
          label="Listen in Audio"
        />
      </div>

      <div className="explanation-body">
        <p className="explanation-text">
          {explanationText || "Your report mentions a localized finding for physician evaluation. Review the detailed anatomical location on the left."}
        </p>

        {activeFinding && (
          <div className="finding-highlight-strip">
            <CheckCircle2 size={16} className="strip-check-icon" />
            <div className="strip-text-block">
              <strong>Specific finding:</strong> {activeFinding.simpleExplanation || activeFinding.title}
            </div>
          </div>
        )}
      </div>

      <div className="explanation-footer-note">
        <Sparkles size={14} className="sparkle-icon" />
        <span>Generated for patient comprehension. Always review diagnostic results with your doctor.</span>
      </div>
    </div>
  );
}
