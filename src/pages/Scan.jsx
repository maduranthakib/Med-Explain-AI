import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanCamera from '../components/ScanCamera';
import ProcessingSteps from '../components/ProcessingSteps';
import SafetyBanner from '../components/SafetyBanner';
import { aiService } from '../services/aiService';

export default function Scan() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleCompleteScan = async (scannedImages) => {
    setIsProcessing(true);
    setCurrentStep(1);

    const timer1 = setTimeout(() => setCurrentStep(2), 500);
    const timer2 = setTimeout(() => setCurrentStep(3), 1000);
    const timer3 = setTimeout(() => setCurrentStep(4), 1600);
    const timer4 = setTimeout(() => setCurrentStep(5), 2200);

    try {
      const analyzedReport = await aiService.analyzeScannedPages(scannedImages);
      analyzedReport.source = '📷 Scanned Report';
      
      localStorage.setItem('mediexplain_active_report', JSON.stringify(analyzedReport));

      // Save to history
      try {
        const existing = JSON.parse(localStorage.getItem('mediexplain_history') || '[]');
        existing.unshift({
          id: analyzedReport.id || 'scan_' + Date.now(),
          name: analyzedReport.name || 'Scanned Document',
          documentType: analyzedReport.documentType,
          date: new Date().toISOString().split('T')[0],
          source: '📷 Scanned Report',
          summaryFinding: analyzedReport.summaryFinding,
          rawReport: analyzedReport,
        });
        localStorage.setItem('mediexplain_history', JSON.stringify(existing.slice(0, 15)));
      } catch (e) {}

      setTimeout(() => {
        setIsProcessing(false);
        navigate('/result');
      }, 2600);
    } catch (err) {
      console.error('Scan error:', err);
      setIsProcessing(false);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      alert('Unable to process scan. Please try again.');
    }
  };

  return (
    <div className="scan-page-container">
      <div className="scan-header-section">
        <h1 className="page-main-title">Scan Your Medical Report</h1>
        <p className="page-main-subtitle">
          Point your camera at your report and capture it for analysis. 
          Scan up to 5 pages of physical documents.
        </p>
      </div>

      {isProcessing ? (
        <div className="processing-wrapper-view">
          <div className="ai-doctor-scan-note">
            <img src="/ai-doctor-avatar.png" alt="Dr. Alex" className="mini-doctor-avatar" />
            <p>“I've captured your scanned report. Now I'll organize the important findings and map the body location so it's simple to understand.”</p>
          </div>
          <ProcessingSteps currentStep={currentStep} />
        </div>
      ) : (
        <div className="scanner-main-content">
          <ScanCamera onCompleteScan={handleCompleteScan} />
        </div>
      )}

      <SafetyBanner />
    </div>
  );
}
