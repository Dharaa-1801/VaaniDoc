import React, { useState, useRef, useEffect } from 'react';

export default function VoiceRecorder({ onRecordingComplete, language }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    setErrorMsg(null);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
      setErrorMsg('Microphone access denied. Please allow microphone permissions or use typing mode.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="voice-recorder-card">
      {errorMsg && <div className="error-banner">{errorMsg}</div>}

      <div className="mic-container">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="mic-button idle"
            aria-label="Start Voice Recording"
          >
            <span className="mic-icon">🎤</span>
            <span className="mic-text">Speak in your language</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="mic-button recording"
            aria-label="Stop Voice Recording"
          >
            <span className="recording-pulse"></span>
            <span className="mic-icon">⏹️</span>
            <span className="mic-text">Stop Recording ({formatTime(recordingTime)})</span>
          </button>
        )}
      </div>

      {isRecording && (
        <div className="recording-status">
          🔴 Recording active... Tell your doctor how you are feeling.
        </div>
      )}
    </div>
  );
}