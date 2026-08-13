import React from 'react';

const INDIAN_LANGUAGES = [
  { code: 'hi-IN', name: 'हिन्दी', label: 'Hindi' },
  { code: 'gu-IN', name: 'ગુજરાતી', label: 'Gujarati' },
  { code: 'mr-IN', name: 'મરાઠી', label: 'Marathi' },
  { code: 'bn-IN', name: 'বাংলা', label: 'Bengali' },
  { code: 'ta-IN', name: 'தமிழ்', label: 'Tamil' },
  { code: 'te-IN', name: 'తెలుగు', label: 'Telugu' },
  { code: 'kn-IN', name: 'કન્નડ', label: 'Kannada' },
  { code: 'ml-IN', name: 'മലയാളം', label: 'Malayalam' },
  { code: 'pa-IN', name: 'પંજાબી', label: 'Punjabi' },
  { code: 'en-IN', name: 'English', label: 'English' }
];

export default function LanguageSelector({ selectedLang, onLanguageChange }) {
  return (
    <div className="language-selector-box">
      <label htmlFor="lang-select" className="lang-label">
        🗣️ Select / તમારી ભાષા પસંદ કરો:
      </label>
      <select
        id="lang-select"
        value={selectedLang}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="lang-dropdown"
      >
        {INDIAN_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({lang.label})
          </option>
        ))}
      </select>
    </div>
  );
}