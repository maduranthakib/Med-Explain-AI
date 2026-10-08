import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Square, Loader2, VolumeX } from 'lucide-react';
import { ttsService } from '../services/ttsService';
import { supportedLanguages } from '../data/translations';

export default function VoiceButton({ text, lang = 'en', label = 'Listen to Explanation' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Subscribe to TTS state changes
  useEffect(() => {
    ttsService.onStateChange = (state) => {
      setIsPlaying(state.isPlaying);
      setIsPaused(state.isPaused);
    };

    return () => {
      ttsService.stop();
    };
  }, []);

  // When text or lang changes, stop any previous audio
  useEffect(() => {
    ttsService.stop();
  }, [text, lang]);

  const handlePlay = () => {
    if (isPaused) {
      ttsService.resume();
    } else {
      ttsService.speak(text, lang, (state) => {
        setIsPlaying(state.isPlaying);
        setIsPaused(state.isPaused);
      });
    }
  };

  const handlePause = () => {
    ttsService.pause();
  };

  const handleStop = () => {
    ttsService.stop();
  };

  const currentLangObj = supportedLanguages.find(l => l.code === lang) || { name: 'English', native: 'English' };

  return (
    <div className="voice-player-widget">
      <div className="voice-widget-main">
        {!isPlaying ? (
          <button 
            type="button" 
            onClick={handlePlay} 
            className="btn-voice-play"
            title={`Listen in ${currentLangObj.name} (${currentLangObj.native})`}
          >
            <Play size={16} fill="currentColor" />
            <span>{label}</span>
            <span className="voice-lang-badge">{currentLangObj.native}</span>
          </button>
        ) : (
          <div className="voice-active-controls">
            {isPaused ? (
              <button 
                type="button" 
                onClick={handlePlay} 
                className="btn-voice-action btn-voice-resume"
                title="Resume reading"
              >
                <Play size={15} fill="currentColor" />
                <span>Resume</span>
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handlePause} 
                className="btn-voice-action btn-voice-pause"
                title="Pause reading"
              >
                <Pause size={15} />
                <span>Pause</span>
              </button>
            )}

            <button 
              type="button" 
              onClick={handleStop} 
              className="btn-voice-action btn-voice-stop"
              title="Stop audio"
            >
              <Square size={14} fill="currentColor" />
              <span>Stop</span>
            </button>

            {/* Audio Wave Visualizer animation */}
            <div className={`audio-waveform ${isPaused ? 'audio-waveform-paused' : ''}`}>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>
          </div>
        )}
      </div>

      <div className="voice-engine-tag">
        <Volume2 size={12} />
        <span>Voice Narration: {currentLangObj.name}</span>
      </div>
    </div>
  );
}
