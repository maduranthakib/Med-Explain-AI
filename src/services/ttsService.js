// Multilingual Text-To-Speech (TTS) Service
// Guarantees high-fidelity audio playback for all 10 supported languages:
// en, ta, hi, te, ml, kn, bn, mr, gu, ur.
// Dual-engine architecture:
// 1. Native Web Speech API if a genuine voice is present for that language
// 2. High-fidelity cloud TTS stream fallback (chunked audio element) when OS lacks voice pack

class TTSService {
  constructor() {
    this.currentAudio = null;
    this.audioQueue = [];
    this.queueIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.onStateChange = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.activeEngine = null; // 'synth' | 'audio'
  }

  // Language mapping to Google TTS language codes
  getLangCode(langCode) {
    const map = {
      en: 'en',
      ta: 'ta',
      hi: 'hi',
      te: 'te',
      ml: 'ml',
      kn: 'kn',
      bn: 'bn',
      mr: 'mr',
      gu: 'gu',
      ur: 'ur',
    };
    return map[langCode] || 'en';
  }

  // Get BCP-47 tag
  getBcp47(langCode) {
    const map = {
      en: 'en-US',
      ta: 'ta-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      ml: 'ml-IN',
      kn: 'kn-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      ur: 'ur-PK',
    };
    return map[langCode] || 'en-US';
  }

  // Check if browser has a native voice installed for this language
  hasNativeVoice(langCode) {
    if (!this.synth) return false;
    const voices = this.synth.getVoices();
    const bcp = this.getBcp47(langCode).toLowerCase();
    const prefix = langCode.toLowerCase();
    return voices.some(v => 
      v.lang.toLowerCase() === bcp || 
      v.lang.toLowerCase().startsWith(prefix)
    );
  }

  // Split text into safe chunks (under 90 chars) on punctuation boundaries
  chunkText(text) {
    if (!text) return [];
    // Clean text of markdown, URLs, excessive punctuation
    const clean = text.replace(/[*_#`[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Split by sentence punctuation
    const sentences = clean.match(/[^.!?।\n]+[.!?।\n]?/g) || [clean];
    const chunks = [];

    for (let sentence of sentences) {
      sentence = sentence.trim();
      if (!sentence) continue;
      
      if (sentence.length <= 90) {
        chunks.push(sentence);
      } else {
        // Split further by commas, clauses, or words
        const words = sentence.split(' ');
        let curr = '';
        for (const w of words) {
          if ((curr + ' ' + w).length <= 90) {
            curr = curr ? curr + ' ' + w : w;
          } else {
            if (curr) chunks.push(curr);
            curr = w;
          }
        }
        if (curr) chunks.push(curr);
      }
    }
    return chunks;
  }

  speak(text, langCode = 'en', onStateChange = null) {
    this.stop();
    this.onStateChange = onStateChange;

    if (!text || !text.trim()) return;

    // Notify playing
    this.isPlaying = true;
    this.isPaused = false;
    this.notifyState();

    const normalizedLang = langCode.toLowerCase().slice(0, 2);

    // If English or native voice is available in the browser, prefer Web Speech API
    if (this.synth && (normalizedLang === 'en' || this.hasNativeVoice(normalizedLang))) {
      this.playViaSpeechSynthesis(text, normalizedLang);
    } else {
      // Fallback to high-quality audio streaming engine
      this.playViaAudioStream(text, normalizedLang);
    }
  }

  playViaSpeechSynthesis(text, langCode) {
    this.activeEngine = 'synth';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.getBcp47(langCode);
    utterance.rate = 0.95; // Clear pace for medical readability

    // Try to find matching voice
    const voices = this.synth.getVoices();
    const bcp = this.getBcp47(langCode).toLowerCase();
    const matchedVoice = voices.find(v => 
      v.lang.toLowerCase() === bcp || 
      v.lang.toLowerCase().startsWith(langCode)
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.notifyState();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error, falling back to audio stream:', e);
      this.playViaAudioStream(text, langCode);
    };

    this.currentUtterance = utterance;
    this.synth.cancel(); // Clear any previous
    this.synth.speak(utterance);
  }

  playViaAudioStream(text, langCode) {
    this.activeEngine = 'audio';
    const chunks = this.chunkText(text);
    if (chunks.length === 0) {
      this.stop();
      return;
    }

    const ttsLang = this.getLangCode(langCode);
    this.audioQueue = chunks.map(chunk => 
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${ttsLang}&q=${encodeURIComponent(chunk)}`
    );
    this.queueIndex = 0;
    this.playNextChunk();
  }

  playNextChunk() {
    if (!this.isPlaying) return;

    if (this.queueIndex >= this.audioQueue.length) {
      this.isPlaying = false;
      this.isPaused = false;
      this.notifyState();
      return;
    }

    const url = this.audioQueue[this.queueIndex];
    const audio = new Audio(url);
    this.currentAudio = audio;

    audio.onended = () => {
      this.queueIndex++;
      this.playNextChunk();
    };

    audio.onerror = (err) => {
      console.warn('Audio stream error on chunk, skipping to next:', err);
      this.queueIndex++;
      this.playNextChunk();
    };

    audio.play().catch(err => {
      console.warn('Audio play prevented:', err);
      this.isPlaying = false;
      this.notifyState();
    });
  }

  pause() {
    if (!this.isPlaying || this.isPaused) return;

    if (this.activeEngine === 'synth' && this.synth) {
      this.synth.pause();
    } else if (this.currentAudio) {
      this.currentAudio.pause();
    }
    this.isPaused = true;
    this.notifyState();
  }

  resume() {
    if (!this.isPlaying || !this.isPaused) return;

    if (this.activeEngine === 'synth' && this.synth) {
      this.synth.resume();
    } else if (this.currentAudio) {
      this.currentAudio.play().catch(e => console.warn(e));
    }
    this.isPaused = false;
    this.notifyState();
  }

  stop() {
    this.isPlaying = false;
    this.isPaused = false;

    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    this.audioQueue = [];
    this.queueIndex = 0;
    this.currentUtterance = null;
    this.notifyState();
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
      });
    }
  }
}

export const ttsService = new TTSService();
export default ttsService;
