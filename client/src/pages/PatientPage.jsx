import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import VoiceRecorder from '../components/VoiceRecorder';

export default function PatientPage({ sessionId }) {
  const [selectedLang, setSelectedLang] = useState('hi-IN');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [transcriptResult, setTranscriptResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleAudioRecorded = async (audioBlob) => {
    setIsProcessing(true);
    setApiError(null);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('sessionId', sessionId);
    formData.append('language', selectedLang);

    try {
      const res = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to process recording');

      const data = await res.json();
      setTranscriptResult({
        original: data.transcript,
        english: data.englishTranscript
      });
    } catch (err) {
      console.error(err);
      setApiError('Something went wrong processing your recording. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!typedInput.trim()) return;

    setTranscriptResult({
      original: typedInput,
      english: typedInput
    });
  };

  return (
    <div className="patient-page">
      <div className="patient-hero">
        <h1 className="hero-title">VaaniDoc</h1>
        <p className="hero-subtitle">Tell us what you're feeling / તમને શું થાય છે તે જણાવો.</p>
      </div>

      <LanguageSelector
        selectedLang={selectedLang}
        onLanguageChange={setSelectedLang}
      />

      {apiError && <div className="error-banner">{apiError}</div>}

      {!transcriptResult ? (
        <>
          {!isTypingMode ? (
            <>
              <VoiceRecorder
                language={selectedLang}
                onRecordingComplete={handleAudioRecorded}
              />
              <div className="toggle-mode">
                <button
                  className="link-button"
                  onClick={() => setIsTypingMode(true)}
                >
                  ⌨ Type instead / લખીને જણાવો
                </button>
              </div>
            </>
          ) : (
            <div className="card typing-card">
              <h3>Describe your symptoms:</h3>
              <form onSubmit={handleTextSubmit}>
                <textarea
                  className="symptom-textarea"
                  rows="4"
                  placeholder="e.g. I have had a high fever for 3 days and headache since morning..."
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                />
                <div className="action-row">
                  <button type="submit" className="btn primary-btn">
                    Confirm Symptoms
                  </button>
                  <button
                    type="button"
                    className="btn secondary-btn"
                    onClick={() => setIsTypingMode(false)}
                  >
                    🎤 Switch to Voice
                  </button>
                </div>
              </form>
            </div>
          )}

          {isProcessing && (
            <div className="processing-overlay">
              <div className="spinner"></div>
              <p>Understanding your symptoms / તમારી સમસ્યા સમજી રહ્યા છીએ...</p>
            </div>
          )}
        </>
      ) : (
        <div className="card transcript-preview-card">
          <div className="card-header">
            <h3>Recorded Symptoms / નોંધાયેલ માહિતી</h3>
            <span className="verified-badge">✓ Captured</span>
          </div>

          <div className="transcript-box">
            <label>Original Statement ({selectedLang}):</label>
            <p className="statement-text">"{transcriptResult.original}"</p>

            {transcriptResult.english && transcriptResult.original !== transcriptResult.english && (
              <div className="translation-box">
                <label>English Translation:</label>
                <p className="statement-text">"{transcriptResult.english}"</p>
              </div>
            )}
          </div>

          <div className="action-row">
            <button
              className="btn secondary-btn"
              onClick={() => setTranscriptResult(null)}
            >
              🔄 Re-record / ફરીથી બોલો
            </button>
            <button
              className="btn primary-btn"
              onClick={() => alert("Proceeding to Step 3: AI Extraction")}
            >
              Continue to AI Intake ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}