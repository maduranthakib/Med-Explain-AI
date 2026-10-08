import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadBox from '../components/UploadBox';
import ProcessingSteps from '../components/ProcessingSteps';
import SafetyBanner from '../components/SafetyBanner';
import { aiService } from '../services/aiService';

export default function Analyze() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const runAnalysisWorkflow = async (reportPromise) => {
    setIsProcessing(true);
    setCurrentStep(1);

    // Staged step progression
    const timer1 = setTimeout(() => setCurrentStep(2), 500);
    const timer2 = setTimeout(() => setCurrentStep(3), 1000);
    const timer3 = setTimeout(() => setCurrentStep(4), 1600);
    const timer4 = setTimeout(() => setCurrentStep(5), 2200);

    try {
      const analyzedReport = await reportPromise;
      // Save report in localStorage for result and history
      localStorage.setItem('mediexplain_active_report', JSON.stringify(analyzedReport));
      
      // Save in history list
      saveToHistory(analyzedReport);

      setTimeout(() => {
        setIsProcessing(false);
        navigate('/result');
      }, 2600);
    } catch (err) {
      console.error('Analysis error:', err);
      setIsProcessing(false);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      alert('An error occurred while processing the report. Please try again.');
    }
  };

  const saveToHistory = (rep) => {
    try {
      const existing = JSON.parse(localStorage.getItem('mediexplain_history') || '[]');
      const filtered = existing.filter(item => item.id !== rep.id);
      filtered.unshift({
        id: rep.id || 'hist_' + Date.now(),
        name: rep.name || rep.documentType,
        documentType: rep.documentType,
        date: rep.date || new Date().toISOString().split('T')[0],
        source: rep.source || '📄 Uploaded Report',
        summaryFinding: rep.summaryFinding,
        rawReport: rep,
      });
      localStorage.setItem('mediexplain_history', JSON.stringify(filtered.slice(0, 15)));
    } catch (e) {
      console.warn('History save warning:', e);
    }
  };

  const handleFileSelected = (file) => {
    runAnalysisWorkflow(aiService.analyzeReport(file));
  };

  const handleSelectSample = (sample) => {
    runAnalysisWorkflow(Promise.resolve(sample));
  };

  return (
    <div className="analyze-page-container">
      <div className="analyze-header-section">
        <h1 className="page-main-title">Upload Your Medical Report</h1>
        <p className="page-main-subtitle">
          Upload any radiology scan (MRI, CT, X-Ray) or medical report. MediExplain AI will locate 
          the anatomical area and provide a clear, non-technical explanation.
        </p>
      </div>

      {isProcessing ? (
        <div className="processing-wrapper-view">
          <ProcessingSteps currentStep={currentStep} />
        </div>
      ) : (
        <div className="upload-main-content">
          <UploadBox 
            onFileSelected={handleFileSelected} 
            onSelectSample={handleSelectSample} 
          />
        </div>
      )}

      <SafetyBanner />
    </div>
  );
}
