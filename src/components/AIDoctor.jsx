import React, { useState, useEffect } from 'react';
import { Sparkles, HeartPulse, Stethoscope, Volume2, Play, Pause, Square } from 'lucide-react';
import { uiTranslations, supportedLanguages } from '../data/translations';
import { ttsService } from '../services/ttsService';

export default function AIDoctor({ currentFinding, language = 'en', onShowMeWhere }) {
  const t = uiTranslations[language] || uiTranslations.en;
  const currentLangObj = supportedLanguages.find(l => l.code === language) || { name: 'English', native: 'English' };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Subscribe to speech state changes
  useEffect(() => {
    const originalListener = ttsService.onStateChange;
    ttsService.onStateChange = (state) => {
      setIsSpeaking(state.isPlaying);
      setIsPaused(state.isPaused);
      if (originalListener) originalListener(state);
    };

    return () => {
      ttsService.stop();
    };
  }, []);

  // When language changes, stop audio
  useEffect(() => {
    ttsService.stop();
  }, [language, currentFinding]);

  // Build doctor message based on current finding
  const getDoctorMessage = () => {
    if (!currentFinding) {
      return t.doctorGreeting;
    }

    const partName = currentFinding.title || currentFinding.bodyPart;
    if (language === 'ta') {
      return `வணக்கம்! உங்கள் மருத்துவ அறிக்கையில் "${partName}" பகுதி குறிப்பிடப்பட்டுள்ளது. இதை நீங்கள் எளிதாகப் புரிந்துகொள்ள உடற்கூறியல் வரைபடத்தில் துல்லியமாக சுட்டிக்காட்டியுள்ளேன். இதன் மருத்துவ விளக்கம் மற்றும் அடுத்தகட்ட ஆலோசனையை இங்கே கவனிக்கவும்.`;
    }
    if (language === 'hi') {
      return `नमस्ते! आपकी रिपोर्ट में "${partName}" के बारे में जानकारी दी गई है। मैंने इस हिस्से को शरीर के मॉडल पर चिह्नित किया है ताकि आप समझ सकें कि यह कहाँ स्थित है।`;
    }
    if (language === 'te') {
      return `నమస్కారం! మీ నివేదికలో "${partName}" భాగం గురించి పేర్కొన్నారు. మీరు సులభంగా అర్థం చేసుకోవడానికి దీన్ని శరీర నమూనాపై గుర్తించాను.`;
    }

    return `I have reviewed your diagnostic report. The finding refers to "${partName}". I've highlighted this exact region on your anatomical visual so you can clearly see where it is located.`;
  };

  const message = getDoctorMessage();

  const handleToggleSpeak = () => {
    if (!isSpeaking) {
      ttsService.speak(message, language, (state) => {
        setIsSpeaking(state.isPlaying);
        setIsPaused(state.isPaused);
      });
    } else if (isPaused) {
      ttsService.resume();
    } else {
      ttsService.pause();
    }
  };

  const handleStopSpeaking = () => {
    ttsService.stop();
  };

  const handleShowMeWhereClicked = () => {
    if (onShowMeWhere) onShowMeWhere();
    // Auto-speak doctor's guidance when Show Me Where is triggered
    ttsService.speak(message, language, (state) => {
      setIsSpeaking(state.isPlaying);
      setIsPaused(state.isPaused);
    });
  };

  return (
    <div className={`ai-doctor-card ${isSpeaking ? 'doctor-card-active-speaking' : ''}`}>
      <div className="ai-doctor-header">
        <div className={`doctor-avatar-container ${isSpeaking ? 'doctor-avatar-talking' : ''}`}>
          {/* Animated voice soundwave aura rings when Dr. Alex speaks */}
          {isSpeaking && !isPaused && (
            <>
              <div className="voice-ripple-ring ring-1"></div>
              <div className="voice-ripple-ring ring-2"></div>
            </>
          )}

          <img 
            src="/ai-doctor-avatar.png" 
            alt="Dr. Alex — AI Medical Explainer Avatar" 
            className={`doctor-avatar-img ${isSpeaking && !isPaused ? 'avatar-anim-talking' : ''}`}
            onClick={handleToggleSpeak}
            title={isSpeaking ? "Click to pause Dr. Alex" : "Click to hear Dr. Alex speak"}
          />
          <div className="doctor-pulse-dot" title="AI Medical Explainer Online"></div>
        </div>

        <div className="doctor-title-block">
          <div className="doctor-name-row">
            <h3 className="doctor-name">Dr. Alex</h3>
            <span className="doctor-badge">
              <Sparkles size={12} />
              <span>AI Assistant</span>
            </span>
          </div>
          <p className="doctor-sub">Medical Communication & Diagnostic Explainer</p>

          {/* Real-time speaking status pill with equalizer animation */}
          {isSpeaking && (
            <div className="doctor-live-speaking-indicator">
              <div className="speaking-eq-bars">
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
                <span className="eq-bar bar-4"></span>
              </div>
              <span className="speaking-status-text">
                {isPaused ? 'Dr. Alex Paused' : `Dr. Alex is Speaking (${currentLangObj.native})`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Speech bubble with glow animation when Dr. Alex is talking */}
      <div className={`doctor-speech-bubble ${isSpeaking && !isPaused ? 'speech-bubble-glowing' : ''}`}>
        <p className="doctor-speech-text">
          “{message}”
        </p>
        <div className="speech-tail"></div>
      </div>

      <div className="doctor-action-row">
        {/* Voice control buttons */}
        <div className="doctor-voice-controls-bar">
          <button 
            type="button" 
            onClick={handleToggleSpeak}
            className={`btn-doctor-speak ${isSpeaking && !isPaused ? 'btn-doctor-speak-active' : ''}`}
            title={`Listen to Dr. Alex speak in ${currentLangObj.name}`}
          >
            {!isSpeaking ? (
              <>
                <Volume2 size={16} />
                <span>Speak Explanation</span>
                <span className="doctor-lang-pill">{currentLangObj.native}</span>
              </>
            ) : isPaused ? (
              <>
                <Play size={15} fill="currentColor" />
                <span>Resume Voice</span>
              </>
            ) : (
              <>
                <Pause size={15} />
                <span>Pause Voice</span>
              </>
            )}
          </button>

          {isSpeaking && (
            <button 
              type="button" 
              onClick={handleStopSpeaking}
              className="btn-doctor-stop"
              title="Stop Dr. Alex's voice"
            >
              <Square size={13} fill="currentColor" />
              <span>Stop</span>
            </button>
          )}
        </div>

        {onShowMeWhere && (
          <button 
            type="button" 
            onClick={handleShowMeWhereClicked} 
            className="btn-show-me-where"
          >
            <HeartPulse size={16} />
            <span>Show Me Where on Anatomy</span>
          </button>
        )}
      </div>

      <div className="doctor-footer-notice">
        <Stethoscope size={13} />
        <span>Educational clinical communication • Non-diagnostic guidance</span>
      </div>
    </div>
  );
}
