import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  RotateCcw, 
  Check, 
  Plus, 
  Trash2, 
  Upload, 
  AlertCircle, 
  ScanLine, 
  FileCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ScanCamera({ onCompleteScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [currentCapturedImage, setCurrentCapturedImage] = useState(null);
  const [scannedPages, setScannedPages] = useState([]); // up to 5 pages
  const [isProcessingFrame, setIsProcessingFrame] = useState(false);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraTracks();
    };
  }, []);

  const stopCameraTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try { track.stop(); } catch (e) {}
      });
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    stopCameraTracks();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Prefer mobile rear camera
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setCurrentCapturedImage(null);
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access is unavailable. You can upload a photo of the report instead.');
      setCameraActive(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsProcessingFrame(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCurrentCapturedImage(dataUrl);

    // Stop camera tracks once captured as per requirement
    stopCameraTracks();
    setIsProcessingFrame(false);
  };

  const handleRetake = () => {
    setCurrentCapturedImage(null);
    startCamera();
  };

  const handleUseThisScan = () => {
    if (!currentCapturedImage) return;
    if (scannedPages.length >= 5) {
      alert('Maximum of 5 pages allowed per scan.');
      return;
    }

    const newPages = [...scannedPages, currentCapturedImage];
    setScannedPages(newPages);
    setCurrentCapturedImage(null);
  };

  const handleRemovePage = (index) => {
    const updated = scannedPages.filter((_, i) => i !== index);
    setScannedPages(updated);
  };

  const handleDesktopFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (scannedPages.length < 5) {
          setScannedPages(prev => [...prev, event.target.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinishScan = () => {
    if (scannedPages.length === 0) return;
    stopCameraTracks();
    if (onCompleteScan) {
      onCompleteScan(scannedPages);
    }
  };

  return (
    <div className="scanner-container">
      {/* Hidden canvas for capturing video frames */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleDesktopFileUpload}
      />

      {/* Camera Live View or Idle State */}
      {!currentCapturedImage && (
        <div className="scanner-viewport-box">
          {cameraActive ? (
            <div className="camera-live-wrapper">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="camera-video-element" 
              />
              {/* Document Alignment Frame */}
              <div className="scanner-frame-overlay">
                <div className="scanner-corner top-left"></div>
                <div className="scanner-corner top-right"></div>
                <div className="scanner-corner bottom-left"></div>
                <div className="scanner-corner bottom-right"></div>
                <div className="scanner-scanline"></div>
                <div className="scanner-frame-guide-text">
                  <ScanLine size={16} />
                  <span>Align the report inside the frame</span>
                </div>
              </div>

              {/* Bottom Shutter Controls */}
              <div className="camera-shutter-bar">
                <button
                  type="button"
                  onClick={captureFrame}
                  disabled={isProcessingFrame}
                  className="btn-shutter-capture"
                  title="Capture Document Page"
                >
                  <div className="shutter-inner-circle"></div>
                </button>
              </div>
            </div>
          ) : (
            <div className="camera-idle-prompt">
              {cameraError ? (
                <div className="camera-error-box">
                  <AlertCircle size={36} className="text-amber-500 mb-2" />
                  <h4 className="camera-error-title">Camera Access Unavailable</h4>
                  <p className="camera-error-desc">{cameraError}</p>
                  <div className="camera-fallback-actions">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="btn-primary-upload"
                    >
                      <Upload size={16} />
                      <span>Upload Report Image</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={startCamera} 
                      className="btn-action-outline"
                    >
                      <RotateCcw size={16} />
                      <span>Retry Camera</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="camera-start-box">
                  <div className="scanner-icon-badge">
                    <Camera size={38} />
                  </div>
                  <h3 className="camera-start-title">Point Camera at Medical Report</h3>
                  <p className="camera-start-sub">
                    Use your mobile or desktop webcam to scan a paper diagnostic report.
                  </p>
                  <div className="camera-start-actions">
                    <button 
                      type="button" 
                      onClick={startCamera} 
                      className="btn-start-camera"
                    >
                      <Camera size={18} />
                      <span>Start Camera</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()} 
                      className="btn-action-outline"
                    >
                      <Upload size={16} />
                      <span>Upload Photo Instead</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Review Screen for Captured Snapshot */}
      {currentCapturedImage && (
        <div className="scan-review-wrapper">
          <div className="review-header">
            <h3 className="review-title">Review Your Scan</h3>
            <p className="review-subtitle">Is the medical report clear, sharp, and readable?</p>
          </div>

          <div className="review-image-frame">
            <img 
              src={currentCapturedImage} 
              alt="Captured report scan" 
              className="captured-preview-img" 
            />
          </div>

          <div className="review-actions-row">
            <button 
              type="button" 
              onClick={handleRetake} 
              className="btn-retake-scan"
            >
              <RotateCcw size={16} />
              <span>Retake Photo</span>
            </button>
            <button 
              type="button" 
              onClick={handleUseThisScan} 
              className="btn-use-scan"
            >
              <Check size={16} />
              <span>Use This Scan (Page {scannedPages.length + 1})</span>
            </button>
          </div>
        </div>
      )}

      {/* Scanned Pages Tray & Multi-Page Gallery (Up to 5 Pages) */}
      <div className="scanned-pages-tray">
        <div className="tray-header">
          <div className="tray-title-group">
            <FileCheck size={18} />
            <span className="tray-title">
              Scanned Pages ({scannedPages.length} / 5)
            </span>
          </div>
          {scannedPages.length < 5 && !cameraActive && !currentCapturedImage && (
            <button 
              type="button" 
              onClick={startCamera} 
              className="btn-add-page"
            >
              <Plus size={15} />
              <span>+ Scan Another Page</span>
            </button>
          )}
        </div>

        {scannedPages.length > 0 ? (
          <div className="pages-thumbnails-grid">
            {scannedPages.map((pageSrc, idx) => (
              <div key={idx} className="page-thumbnail-card">
                <img src={pageSrc} alt={`Page ${idx + 1}`} className="page-thumb-img" />
                <div className="page-thumb-footer">
                  <span className="page-thumb-label">Page {idx + 1} ✓</span>
                  <button 
                    type="button" 
                    onClick={() => handleRemovePage(idx)}
                    className="btn-thumb-remove"
                    title="Remove page"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="tray-empty-hint">
            No pages captured yet. Click "Start Camera" above to scan your physical report.
          </p>
        )}

        {/* Finish & Analyze Button */}
        {scannedPages.length > 0 && (
          <div className="tray-submit-row">
            <button
              type="button"
              onClick={handleFinishScan}
              className="btn-analyze-scan-now"
            >
              <Sparkles size={18} />
              <span>Analyze Report ({scannedPages.length} {scannedPages.length === 1 ? 'Page' : 'Pages'})</span>
            </button>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <p className="scanner-privacy-note">
        Your camera is strictly used in your browser to capture the report. Images are processed locally for educational explanation.
      </p>
    </div>
  );
}
