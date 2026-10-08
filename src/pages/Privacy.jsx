import React from 'react';
import { ShieldCheck, Lock, Camera, AlertCircle, FileCheck, Stethoscope } from 'lucide-react';
import SafetyBanner from '../components/SafetyBanner';

export default function Privacy() {
  return (
    <div className="privacy-page-container">
      <div className="privacy-hero-banner">
        <div className="privacy-icon-badge">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 className="page-main-title">Privacy Policy & Medical Transparency</h1>
          <p className="page-main-subtitle">
            Clear, honest principles about data handling, camera access, and clinical safety.
          </p>
        </div>
      </div>

      <div className="privacy-cards-grid">
        <div className="privacy-card">
          <div className="privacy-card-icon text-blue-600 bg-blue-50">
            <Camera size={22} />
          </div>
          <h3 className="privacy-card-title">Camera Permission & Video Feed</h3>
          <p className="privacy-card-text">
            Camera permission is requested exclusively when you choose to scan a physical medical report. 
            The video stream is processed strictly in your local browser window. 
            <strong> All camera hardware tracks are immediately stopped</strong> as soon as you capture the photo, retake, or navigate to another page. The camera is never left active in the background.
          </p>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-icon text-teal-600 bg-teal-50">
            <Lock size={22} />
          </div>
          <h3 className="privacy-card-title">Document & Personal Data Handling</h3>
          <p className="privacy-card-text">
            For this hackathon release, uploaded reports and image scans are analyzed locally using client-side processing and localized services. We do not permanently store, sell, or monetize patient identification. Please ensure you have permission to upload or scan any third-party medical documents.
          </p>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-icon text-amber-600 bg-amber-50">
            <Stethoscope size={22} />
          </div>
          <h3 className="privacy-card-title">Strict Medical Safety Boundaries</h3>
          <p className="privacy-card-text">
            MediExplain AI is an assistive communication and educational tool designed to help patients understand complex radiology reports in plain language. 
            <strong> MediExplain AI does not:</strong>
          </p>
          <ul className="privacy-boundary-list">
            <li>Diagnose illnesses or determine clinical condition severity</li>
            <li>Prescribe medications or recommend pharmacological treatments</li>
            <li>Stage cancer, tumors, or complex pathology</li>
            <li>Invent or hallucinate clinical findings absent from the report</li>
            <li>Replace the licensed judgment of a qualified medical doctor</li>
          </ul>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-icon text-purple-600 bg-purple-50">
            <FileCheck size={22} />
          </div>
          <h3 className="privacy-card-title">Compliance Honesty</h3>
          <p className="privacy-card-text">
            In compliance with ethical AI development guidelines, we do not claim formal HIPAA or GDPR certification for this demonstration prototype. Users should redact private identifiers (social security numbers, insurance IDs) prior to uploading if sensitive confidentiality is required.
          </p>
        </div>
      </div>

      <SafetyBanner />
    </div>
  );
}
