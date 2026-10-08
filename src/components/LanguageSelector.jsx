import React from 'react';
import { Languages, Check } from 'lucide-react';
import { supportedLanguages } from '../data/translations';

export default function LanguageSelector({ currentLang = 'en', onSelectLang }) {
  return (
    <div className="language-selector-container">
      <div className="language-selector-header">
        <div className="lang-icon-badge">
          <Languages size={18} />
        </div>
        <div className="lang-header-text">
          <span className="lang-title">Explanation Language</span>
          <span className="lang-subtitle">Choose from 10 Indian & Global Languages</span>
        </div>
      </div>

      <div className="language-pills-grid">
        {supportedLanguages.map((lang) => {
          const isSelected = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLang(lang.code)}
              className={`lang-pill-btn ${isSelected ? 'lang-pill-btn-active' : ''}`}
              title={`Switch explanation to ${lang.name} (${lang.native})`}
            >
              <span className="lang-native-name">{lang.native}</span>
              <span className="lang-english-name">({lang.name})</span>
              {isSelected && <Check size={14} className="lang-check-icon" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
