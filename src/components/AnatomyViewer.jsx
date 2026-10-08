import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  User, 
  Compass, 
  Info, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { anatomicalRegions, findAnatomicalRegion } from '../data/anatomicalRegions';

export default function AnatomyViewer({ 
  activeFinding, 
  onSelectRegion,
  focused = false,
  customRegionId = null
}) {
  const [currentView, setCurrentView] = useState('front'); // 'front' | 'back' | 'side'
  const [genderModel, setGenderModel] = useState('male'); // 'male' | 'female'
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // When active finding changes, auto-switch to recommended view if specified
  useEffect(() => {
    if (activeFinding) {
      const region = findAnatomicalRegion(activeFinding.bodyPart);
      if (region && region.defaultView && region.defaultView !== currentView) {
        setCurrentView(region.defaultView);
      }
    }
  }, [activeFinding]);

  // If external focus requested, toggle zoom
  useEffect(() => {
    if (focused) {
      setIsZoomed(true);
      const timer = setTimeout(() => setIsZoomed(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [focused]);

  // Determine active region
  const activeRegionKey = customRegionId || activeFinding?.bodyPart;
  const activeRegion = findAnatomicalRegion(activeRegionKey);

  // Determine image source based on view and gender
  const getImageSrc = () => {
    if (currentView === 'back') {
      return '/human-anatomy-back.png';
    }
    if (currentView === 'side') {
      return '/human-anatomy-side.png';
    }
    // Front view
    return genderModel === 'female' 
      ? '/human-anatomy-female.png' 
      : '/human-anatomy-full-body.png';
  };

  // Get active coordinates for current view
  const coords = activeRegion?.coordinates?.[currentView] || activeRegion?.coordinates?.front;

  // Zoom transform style based on coordinates
  const getStageTransform = () => {
    if (!isZoomed || !coords) return 'scale(1) translate(0, 0)';
    // Calculate translate offset towards target
    const xOffset = (50 - coords.x) * 1.5;
    const yOffset = (40 - coords.y) * 1.5;
    return `scale(1.4) translate(${xOffset}%, ${yOffset}%)`;
  };

  return (
    <div className="anatomy-viewer-card" id="anatomy-stage-section">
      {/* Viewer Header Controls */}
      <div className="viewer-controls-bar">
        {/* View Angle Switcher */}
        <div className="controls-group">
          <span className="control-label">View:</span>
          <div className="toggle-btn-group">
            <button
              type="button"
              className={`toggle-pill-btn ${currentView === 'front' ? 'active' : ''}`}
              onClick={() => setCurrentView('front')}
            >
              Front
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${currentView === 'back' ? 'active' : ''}`}
              onClick={() => setCurrentView('back')}
            >
              Back
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${currentView === 'side' ? 'active' : ''}`}
              onClick={() => setCurrentView('side')}
            >
              Side
            </button>
          </div>
        </div>

        {/* Gender Model Switcher */}
        {currentView === 'front' && (
          <div className="controls-group">
            <span className="control-label">Model:</span>
            <div className="toggle-btn-group">
              <button
                type="button"
                className={`toggle-pill-btn ${genderModel === 'male' ? 'active' : ''}`}
                onClick={() => setGenderModel('male')}
              >
                👨 Male
              </button>
              <button
                type="button"
                className={`toggle-pill-btn ${genderModel === 'female' ? 'active' : ''}`}
                onClick={() => setGenderModel('female')}
              >
                👩 Female
              </button>
            </div>
          </div>
        )}

        {/* Zoom & Reset */}
        <div className="controls-group zoom-actions">
          <button
            type="button"
            className="btn-icon-control"
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Reset Zoom' : 'Focus on Finding'}
          >
            {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          </button>
        </div>
      </div>

      {/* Anatomy Stage Container */}
      <div className="anatomy-stage-viewport">
        <div 
          className="anatomy-stage-canvas"
          style={{ transform: getStageTransform(), transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Real Human Anatomy Image */}
          <img
            src={getImageSrc()}
            alt={`Full body human anatomy — ${currentView} view (${genderModel})`}
            className="anatomy-image"
          />

          {/* DYNAMIC HIGHLIGHT OVERLAY */}
          {coords && (
            <div
              className="dynamic-region-highlight"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                width: `${coords.width}%`,
                height: `${coords.height}%`,
              }}
            >
              {/* Pulsing ring aura */}
              <div className="highlight-pulse-aura"></div>
              <div className="highlight-boundary"></div>

              {/* Floating tag label */}
              <div className="highlight-tag-badge">
                <span className="tag-pulse-dot"></span>
                <span className="tag-text">{activeRegion.label.toUpperCase()}</span>
                {activeFinding?.side && (
                  <span className="tag-sub">
                    ({activeFinding.side.toUpperCase()})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Hover / Click Hotspots for Interactive Exploration */}
          {Object.values(anatomicalRegions).map((reg) => {
            const regCoord = reg.coordinates?.[currentView] || reg.coordinates?.front;
            if (!regCoord) return null;
            const isSelf = activeRegion?.id === reg.id;
            if (isSelf) return null; // already highlighted above

            return (
              <div
                key={reg.id}
                className="interactive-hotspot-zone"
                style={{
                  left: `${regCoord.x}%`,
                  top: `${regCoord.y}%`,
                  width: `${regCoord.width}%`,
                  height: `${regCoord.height}%`,
                }}
                onClick={() => onSelectRegion && onSelectRegion(reg.id)}
                onMouseEnter={() => setHoveredRegion(reg)}
                onMouseLeave={() => setHoveredRegion(null)}
                title={reg.label}
              />
            );
          })}
        </div>

        {/* Orientation & Rule Indicator Note */}
        <div className="anatomy-stage-footer-note">
          <div className="orientation-pill">
            <Compass size={13} />
            <span>
              {currentView === 'front' 
                ? 'Clinical View: Patient Right = Viewer Left' 
                : `${currentView.toUpperCase()} ANATOMICAL VIEW`}
            </span>
          </div>
          {hoveredRegion && (
            <div className="hovered-region-tooltip">
              <Sparkles size={12} />
              <span>{hoveredRegion.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
