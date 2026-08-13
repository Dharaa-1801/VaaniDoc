import React, { useState, useEffect, useRef } from "react";
import "./index.css";

export default function App() {
  const [lang, setLang] = useState("gu-IN");
  const [isListening, setIsListening] = useState(false);
  const [patientInput, setPatientInput] = useState("");
  const [activeTab, setActiveTab] = useState("patient");
  const [translatedData, setTranslatedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef(null);

  // Browser Speech Recognition Engine
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setPatientInput(currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("તમારા Browser માં Voice Recognition Support નથી. કૃપા કરીને Google Chrome વાપરો.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setPatientInput("");
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Universal Free Translation API Function (Converts ANY Language to English)
  const translateToEnglish = async (text, sourceLang) => {
    try {
      const sourceCode = sourceLang.split("-")[0]; // e.g. "gu-IN" -> "gu"
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceCode}&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      // Combine translated chunks
      let translatedText = "";
      if (data && data[0]) {
        data[0].forEach((item) => {
          if (item[0]) translatedText += item[0];
        });
      }
      return translatedText || text;
    } catch (err) {
      console.error("Translation API Error:", err);
      return text; // Fallback to original if network fails
    }
  };

  // Process Intake & Translate
  const processForDoctor = async (text, userLang) => {
    setIsProcessing(true);

    // 1. Live Translate ANY language to English using Free API
    const englishTranslation = await translateToEnglish(text, userLang);

    // 2. Extract Medical Symptoms & Keywords from English Text
    const lowerEn = englishTranslation.toLowerCase();
    let symptoms = [];
    let duration = "Not specified";

    if (lowerEn.includes("cough")) symptoms.push("Cough");
    if (lowerEn.includes("fever")) symptoms.push("Fever");
    if (lowerEn.includes("headache") || lowerEn.includes("head pain")) symptoms.push("Headache");
    if (lowerEn.includes("chest pain")) symptoms.push("Chest Pain");
    if (lowerEn.includes("stomach") || lowerEn.includes("abdominal")) symptoms.push("Abdominal Pain");
    if (lowerEn.includes("cold") || lowerEn.includes("flu") || lowerEn.includes("throat")) symptoms.push("Cold / Sore Throat");

    if (symptoms.length === 0) {
      symptoms.push("General Complaint");
    }

    // Duration extraction
    if (lowerEn.includes("2 days") || lowerEn.includes("two days")) duration = "2 Days";
    else if (lowerEn.includes("3 days") || lowerEn.includes("three days")) duration = "3 Days";
    else if (lowerEn.includes("today") || lowerEn.includes("since today")) duration = "Since Today";
    else if (lowerEn.includes("week")) duration = "1 Week";

    setTranslatedData({
      originalText: text,
      originalLang: userLang,
      englishTranslation: englishTranslation,
      extractedSymptoms: symptoms,
      duration: duration,
      timestamp: new Date().toLocaleTimeString(),
    });

    setIsProcessing(false);
    setActiveTab("doctor"); // Automatically switch to Doctor view
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="app-header">
        <h1 className="brand-name">VaaniDoc</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className={`btn ${activeTab === "patient" ? "primary-btn" : "secondary-btn"}`}
            onClick={() => setActiveTab("patient")}
          >
            👤 Patient View
          </button>
          <button
            className={`btn ${activeTab === "doctor" ? "primary-btn" : "secondary-btn"}`}
            onClick={() => setActiveTab("doctor")}
          >
            🩺 Doctor View (English)
          </button>
        </div>
      </header>

      {/* PATIENT VIEW */}
      {activeTab === "patient" && (
        <div className="card">
          <p className="hero-subtitle">
            તમારી સમસ્યા જણાવો / अपनी समस्या बताइए
          </p>

          <div className="form-group">
            <label>Select Language / ભાષા પસંદ કરો / भाषा चुनें:</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="gu-IN">ગુજરાતી (Gujarati)</option>
              <option value="hi-IN">हिन्दी (Hindi)</option>
              <option value="mr-IN">મરાઠી (Marathi)</option>
              <option value="bn-IN">বাংলা (Bengali)</option>
              <option value="ta-IN">தமிழ் (Tamil)</option>
              <option value="te-IN">తెలుగు (Telugu)</option>
              <option value="kn-IN">કન્નડ (Kannada)</option>
              <option value="ml-IN">മലയാളം (Malayalam)</option>
              <option value="pa-IN">પંજાબી (Punjabi)</option>
              <option value="en-IN">English</option>
            </select>
          </div>

          <div className="voice-section">
            <button
              className={`mic-btn ${isListening ? "recording" : ""}`}
              onClick={toggleListening}
            >
              <span className="mic-icon">{isListening ? "⏹️" : "🎤"}</span>
              <span>{isListening ? "Stop Recording" : "Speak Now (બોલો)"}</span>
            </button>

            {isListening && (
              <p style={{ color: "#14B8A6", textAlign: "center", fontWeight: "bold" }}>
                🔴 Listening in real-time...
              </p>
            )}

            <div style={{ marginTop: "1rem" }}>
              <label>Patient Input / તમારું ઈનપુટ:</label>
              <textarea
                rows="3"
                value={patientInput}
                onChange={(e) => setPatientInput(e.target.value)}
                placeholder="બોલો અથવા લખો... (Speak or type in ANY language)"
              />
            </div>

            {patientInput && (
              <button
                className="btn primary-btn"
                style={{ marginTop: "1rem", width: "100%" }}
                onClick={() => processForDoctor(patientInput, lang)}
                disabled={isProcessing}
              >
                {isProcessing ? "Translating with AI..." : "Send to Doctor (Translate) ➔"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* DOCTOR VIEW (ALWAYS PURE ENGLISH) */}
      {activeTab === "doctor" && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ color: "#14B8A6", margin: 0 }}>Doctor's Clinical Dashboard</h2>
            <span style={{ background: "#22C55E", color: "black", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold" }}>
              Universal Auto-Translated
            </span>
          </div>

          {translatedData ? (
            <div style={{ marginTop: "1.5rem" }}>
              <div className="info-box" style={{ background: "#090D16", padding: "1rem", borderRadius: "8px", border: "1px solid #334155" }}>
                <p><strong>Time Received:</strong> {translatedData.timestamp}</p>
                <p><strong>Original Patient Voice/Text ({translatedData.originalLang}):</strong></p>
                <p style={{ color: "#E2E8F0", fontStyle: "italic", background: "#1E293B", padding: "8px", borderRadius: "4px" }}>
                  "{translatedData.originalText}"
                </p>

                <hr style={{ borderColor: "#334155", margin: "1rem 0" }} />

                <p style={{ color: "#22C55E", fontWeight: "bold", fontSize: "1.1rem" }}>
                  🇬🇧 Full Live English Translation:
                </p>
                <p style={{ background: "#0284C7", color: "white", padding: "10px", borderRadius: "6px", fontSize: "1.05rem" }}>
                  "{translatedData.englishTranslation}"
                </p>

                <p style={{ marginTop: "1rem" }}><strong>Key Medical Symptoms:</strong> {translatedData.extractedSymptoms.join(", ")}</p>
                <p><strong>Duration Identified:</strong> {translatedData.duration}</p>
              </div>

              <button
                className="btn secondary-btn"
                style={{ marginTop: "1rem", width: "100%" }}
                onClick={() => {
                  setPatientInput("");
                  setTranslatedData(null);
                  setActiveTab("patient");
                }}
              >
                + New Patient Intake
              </button>
            </div>
          ) : (
            <p style={{ color: "#94A3B8", textAlign: "center", margin: "2rem 0" }}>
              No active intake received yet. Switch to "Patient View" and speak or type symptoms.
            </p>
          )}
        </div>
      )}
    </div>
  );
}