import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportSummary from '../components/ReportSummary';
import AnatomyViewer from '../components/AnatomyViewer';
import BodyRegionInfo from '../components/BodyRegionInfo';
import AIDoctor from '../components/AIDoctor';
import ExplanationCard from '../components/ExplanationCard';
import LanguageSelector from '../components/LanguageSelector';
import FamilySummaryCard from '../components/FamilySummaryCard';
import DoctorQuestionsList from '../components/DoctorQuestionsList';
import SafetyBanner from '../components/SafetyBanner';
import { sampleReports } from '../data/sampleReports';
import { aiService } from '../services/aiService';

export default function Result() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [activeFindingIndex, setActiveFindingIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [anatomyFocused, setAnatomyFocused] = useState(false);
  const [customRegionId, setCustomRegionId] = useState(null);

  // Load active report from localStorage or default to sample
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mediexplain_active_report');
      if (stored) {
        const parsed = JSON.parse(stored);
        setReport(parsed);
      } else {
        // Default to Left Knee MRI (or first sample)
        const def = sampleReports[0];
        setReport(def);
        localStorage.setItem('mediexplain_active_report', JSON.stringify(def));
      }
    } catch (e) {
      setReport(sampleReports[0]);
    }
  }, []);

  if (!report) {
    return (
      <div className="result-loading-state">
        <div className="spinner-border"></div>
        <p>Loading report analysis...</p>
      </div>
    );
  }

  const currentFinding = report.findings && report.findings.length > 0 
    ? report.findings[activeFindingIndex] 
    : { title: report.summaryFinding, bodyPart: 'left_knee', side: 'left' };

  // "Show Me Where" handler
  const handleShowMeWhere = () => {
    setAnatomyFocused(true);
    // Smooth scroll to anatomy viewport
    const elem = document.getElementById('anatomy-stage-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setAnatomyFocused(false), 3000);
  };

  const handleSelectFinding = (idx) => {
    setActiveFindingIndex(idx);
    setCustomRegionId(null);
  };

  const handleSelectRegionFromHotspot = (regionId) => {
    setCustomRegionId(regionId);
  };

  const currentExplanation = aiService.getSimpleExplanation(report, currentLanguage);
  const currentFamilySummary = aiService.getFamilySummary(report, currentLanguage);
  const doctorQuestions = aiService.getDoctorQuestions(report);

  return (
    <div className="result-page-container">
      {/* Top Report Summary Card & Modality Bar */}
      <ReportSummary 
        report={report} 
        activeFindingIndex={activeFindingIndex} 
        onSelectFinding={handleSelectFinding} 
      />

      {/* Main 2-Column Split: LEFT Anatomy Viewer, RIGHT AI Doctor & Explanation */}
      <div className="result-main-grid">
        {/* LEFT COLUMN: 3D Anatomical Visualization & Location Breakdown */}
        <div className="result-anatomy-column">
          <div className="column-card-wrapper">
            <div className="column-header-row">
              <h3 className="column-heading">3D Human Anatomy Visualization</h3>
              <span className="live-pinpoint-badge">Dynamic Highlight Active</span>
            </div>

            <AnatomyViewer 
              activeFinding={currentFinding} 
              focused={anatomyFocused}
              customRegionId={customRegionId}
              onSelectRegion={handleSelectRegionFromHotspot}
            />

            <BodyRegionInfo 
              activeFinding={currentFinding} 
              language={currentLanguage} 
            />
          </div>
        </div>

        {/* RIGHT COLUMN: AI Doctor & Plain Language Explanation */}
        <div className="result-explanation-column">
          <div className="column-card-wrapper">
            {/* AI Doctor Avatar Card */}
            <AIDoctor 
              currentFinding={currentFinding} 
              language={currentLanguage} 
              onShowMeWhere={handleShowMeWhere}
            />

            {/* Plain Language Explanation with Audio Voice Player */}
            <ExplanationCard 
              explanationText={currentExplanation} 
              language={currentLanguage} 
              activeFinding={currentFinding} 
            />

            {/* 10-Language Selector */}
            <LanguageSelector 
              currentLang={currentLanguage} 
              onSelectLang={setCurrentLanguage} 
            />
          </div>
        </div>
      </div>

      {/* LOWER SECTION: Family Summary & Doctor Questions Checklist */}
      <div className="result-secondary-grid">
        <FamilySummaryCard 
          summaryText={currentFamilySummary} 
          language={currentLanguage} 
        />

        <DoctorQuestionsList 
          questions={doctorQuestions} 
        />
      </div>

      {/* Medical Safety & Compliance Banner */}
      <SafetyBanner />
    </div>
  );
}
