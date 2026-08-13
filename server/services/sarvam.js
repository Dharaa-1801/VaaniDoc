import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

/**
 * Sends recorded audio buffer to Sarvam AI (Saaras v3 STT)
 * @param {string} filePath - Path to temporary audio file on disk
 * @param {string} languageCode - Selected Indian language code (e.g. 'hi-IN', 'gu-IN')
 */
export async function transcribeAudioSarvam(filePath, languageCode = 'hi-IN') {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey || apiKey === 'your_sarvam_api_key_here') {
    console.warn('[Sarvam AI] API Key not configured. Using Fallback Local Mock Transcribe.');
    // Robust Mock Transcribe for offline/testing development
    return {
      transcript: "મૂળભૂત રીતે મને છેલ્લા ૩ દિવસથી તાવ આવે છે અને માથું દુખે છે.",
      translatedText: "I have had a fever and a headache for the last 3 days.",
      languageDetected: languageCode,
      provider: "mock-sarvam-v3"
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('model', 'saaras:v3');
    formData.append('language_code', languageCode);
    formData.append('with_translation', 'true');

    const response = await fetch('https://api.sarvam.ai/speech-to-text-translate', {
      method: 'POST',
      headers: {
        'api-subscription-key': apiKey,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Sarvam STT API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return {
      transcript: data.transcript || '',
      translatedText: data.translated_text || data.transcript || '',
      languageDetected: data.language_code || languageCode,
      provider: 'sarvam-saaras-v3'
    };
  } catch (error) {
    console.error('[Sarvam Service Error]:', error);
    throw error;
  }
}