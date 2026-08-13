import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { transcribeAudioSarvam } from '../services/sarvam.js';
import { sessionStore } from '../utils/sessionStore.js';

const router = express.Router();

// Multer temporary disk storage - NEVER permanently saved
const upload = multer({
  dest: 'temp_uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});

router.post('/', upload.single('audio'), async (req, res) => {
  const audioFile = req.file;
  const { sessionId, language = 'hi-IN' } = req.body;

  if (!audioFile) {
    return res.status(400).json({ error: 'No audio recording provided' });
  }

  try {
    console.log(`[Audio Upload] Received ${audioFile.size} bytes for session ${sessionId}`);

    // Call Sarvam AI STT
    const result = await transcribeAudioSarvam(audioFile.path, language);

    // Update temporary session in memory
    if (sessionId) {
      sessionStore.updateSession(sessionId, {
        patientLanguage: language,
        transcript: result.transcript,
        englishTranscript: result.translatedText
      });
    }

    // Clean up temporary audio file immediately after processing
    fs.unlink(audioFile.path, (err) => {
      if (err) console.error('[Cleanup Error] Could not delete temp file:', err);
    });

    res.status(200).json({
      success: true,
      transcript: result.transcript,
      englishTranscript: result.translatedText,
      language: result.languageDetected
    });

  } catch (err) {
    // Delete temp file on failure
    if (audioFile && fs.existsSync(audioFile.path)) {
      fs.unlinkSync(audioFile.path);
    }
    console.error('[Transcribe Route Error]:', err);
    res.status(500).json({
      error: 'Failed to process voice recording',
      details: err.message
    });
  }
});

export default router;