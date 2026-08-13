/**
 * Transparent Conservative Urgency Classification Engine
 * Categories:
 * RED: Potentially urgent — immediate clinical assessment recommended
 * YELLOW: Needs clinical assessment
 * GREEN: Routine clinical review
 */
export function classifyUrgency(extractedData) {
  const symptomsStr = (extractedData.symptoms || []).join(' ').toLowerCase();
  const severityStr = (extractedData.severity || '').toLowerCase();
  const historyStr = (extractedData.medical_history || []).join(' ').toLowerCase();

  // RED Flag keywords (Urgent)
  const redFlags = [
    'chest pain', 'breathlessness', 'shortness of breath', 'difficulty breathing',
    'unconscious', 'fainting', 'heavy bleeding', 'severe head injury',
    'sudden paralysis', 'slurred speech', 'seizure', 'stiff neck with high fever'
  ];

  for (const flag of redFlags) {
    if (symptomsStr.includes(flag) || severityStr.includes('severe')) {
      return {
        level: 'RED',
        label: 'Potentially urgent — immediate clinical assessment recommended',
        color: '#EF4444',
        reasons: [`Flagged for critical indicator: "${flag}" or severe presentation.`]
      };
    }
  }

  // YELLOW Flag keywords (Moderate)
  const yellowFlags = [
    'fever', 'vomiting', 'diarrhea', 'abdominal pain', 'persistent pain',
    'dizziness', 'infection', 'swelling', 'high blood pressure', 'diabetes'
  ];

  for (const flag of yellowFlags) {
    if (symptomsStr.includes(flag) || historyStr.includes(flag)) {
      return {
        level: 'YELLOW',
        label: 'Needs clinical assessment',
        color: '#EAB308',
        reasons: [`Moderate clinical symptom detected: "${flag}".`]
      };
    }
  }

  // Default GREEN (Routine)
  return {
    level: 'GREEN',
    label: 'Routine clinical review',
    color: '#22C55E',
    reasons: ['No acute emergency indicators detected. Routine intake preview.']
  };
}