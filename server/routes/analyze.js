import express from 'express';
import { extractClinicalData } from '../services/extraction.js';
import { classifyUrgency } from '../services/urgency.js';
import { sessionStore } from '../utils/sessionStore.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sessionId, transcript, language = 'hi-IN' } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript text is required' });
  }

  try {
    // 1. Extract structured clinical data
    const extractedData = await extractClinicalData(transcript, language);

    // 2. Classify urgency using rules
    const urgency = classifyUrgency(extractedData);

    // 3. Save into volatile memory session
    if (sessionId) {
      sessionStore.updateSession(sessionId, {
        transcript,
        extractedData,
        urgency,
        status: 'pending_doctor'
      });
    }

    res.status(200).json({
      success: true,
      extractedData,
      urgency
    });
  } catch (err) {
    console.error('[Analyze Route Error]:', err);
    res.status(500).json({ error: 'Failed to process clinical analysis' });
  }
});

export default router;