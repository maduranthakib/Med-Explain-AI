import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { sampleReports } from '../data/sampleReports';

export default function UploadBox({ onFileSelected, onSelectSample }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
    if (onFileSelected) {
      onFileSelected(file);
    }
  };

  return (
    <div className="upload-box-wrapper">
      {/* Drag & Drop Main Zone */}
      <div 
        className={`upload-dropzone ${isDragging ? 'dropzone-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".pdf,.png,.jpg,.jpeg" 
          onChange={handleFileChange}
        />

        <div className="upload-icon-pulse">
          <UploadCloud className="upload-cloud-icon" size={38} />
        </div>

        <h3 className="upload-drop-title">
          {selectedFile ? selectedFile.name : 'Drag & Drop your Medical Report here'}
        </h3>
        
        <p className="upload-drop-subtitle">
          Supports <strong>PDF, JPG, JPEG, and PNG</strong> reports up to 25MB
        </p>

        <div className="upload-cta-buttons" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button" 
            className="btn-primary-upload"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileText size={16} />
            <span>Choose File</span>
          </button>

          <span className="upload-or-text">or</span>

          <button 
            type="button" 
            className="btn-secondary-scan"
            onClick={() => navigate('/scan')}
          >
            <Camera size={16} />
            <span>Scan with Camera</span>
          </button>
        </div>
      </div>

      {/* One-Click Sample Reports Bar */}
      <div className="sample-reports-selector-card">
        <div className="samples-header">
          <div className="samples-icon-badge">
            <Sparkles size={16} />
          </div>
          <div>
            <h4 className="samples-heading">Or Try Instant Diagnostic Samples</h4>
            <p className="samples-subheading">Test dynamic anatomical mapping across different body regions</p>
          </div>
        </div>

        <div className="sample-chips-grid">
          {sampleReports.map((sample) => (
            <button
              key={sample.id}
              type="button"
              className="sample-report-chip"
              onClick={() => onSelectSample && onSelectSample(sample)}
            >
              <div className="chip-left">
                <span className="chip-title">{sample.name}</span>
                <span className="chip-finding">{sample.summaryFinding}</span>
              </div>
              <ArrowRight size={15} className="chip-arrow" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
