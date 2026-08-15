import React, { useState, useEffect, useRef } from "react";
import "./index.css";

// 🌐 Multi-Language UI Translations Object
const UI_TRANSLATIONS = {
  "gu-IN": {
    title: "તમારી સ્વાસ્થ્ય સમસ્યા જણાવો",
    subtitle: "તમારી પ્રાદેશિક ભાષામાં બોલો અથવા ટાઈપ કરો. સત્ર પછી ડેટા આપમેળે ભૂંસાઈ જશે.",
    selectLang: "ભાષા પસંદ કરો (Select Language):",
    tapToSpeak: "આઇકન પર ટેપ કરો અને બોલો",
    listening: "સાંભળી રહ્યું છે... બોલવાનું ચાલુ રાખો",
    yourInput: "તમારું ઈનપુટ (તમે બોલેલું કે લખેલું):",
    placeholder: "અહીં બોલેલું લખાશે અથવા તમે પણ લખી શકો છો...",
    sendBtn: "ડૉક્ટર ટેબ પર મોકલો ➔",
    processing: "ઇન્ટેક પ્રોસેસ થઈ રહ્યું છે..."
  },
  "hi-IN": {
    title: "अपनी स्वास्थ्य समस्या बताइए",
    subtitle: "अपनी क्षेत्रीय भाषा में बोलें या टाइप करें। सत्र के बाद डेटा स्वतः हट जाएगा।",
    selectLang: "भाषा चुनें (Select Language):",
    tapToSpeak: "आइकन पर टैप करें और बोलें",
    listening: "सुन रहा है... बोलना जारी रखें",
    yourInput: "आपका इनपुट (आपका बोला या लिखा हुआ):",
    placeholder: "यहाँ बोला हुआ लिखा जाएगा या आप टाइप भी कर सकते हैं...",
    sendBtn: "डॉक्टर को भेजें ➔",
    processing: "प्रोसेस हो रहा है..."
  },
  "mr-IN": {
    title: "तुमची आरोग्य समस्या सांगा",
    subtitle: "तुमच्या प्रादेशिक भाषेत बोला किंवा टाइप करा. सत्रानंतर डेटा आपोआप हटवला जाईल.",
    selectLang: "भाषा निवडा (Select Language):",
    tapToSpeak: "આયકૉનવર ટેપ કરો અને બોલો",
    listening: "ऐकत आहे... बोलायला सुरुवात करा",
    yourInput: "तुमचे इनपुट (तुमचे बोललेले किंवा लिहिलेले):",
    placeholder: "येथे बोललेले दिसेल किंवा तुम्ही टाइप देखील करू शकता...",
    sendBtn: "डॉक्टरांकडे पाठवा ➔",
    processing: "प्रक्रिया सुरू आहे..."
  },
  "bn-IN": {
    title: "আপনার স্বাস্থ্য সমস্যা বলুন",
    subtitle: "আপনার আঞ্চলিক ভাষায় বলুন বা টাইপ করুন। সেশনের পরে ডেটা মুছে যাবে।",
    selectLang: "ভাষা নির্বাচন করুন (Select Language):",
    tapToSpeak: "আইকনটিতে আলতো চাপুন এবং বলুন",
    listening: "শুনছে... বলতে থাকুন",
    yourInput: "আপনার ইনপুট (আপনার বলা বা লেখা):",
    placeholder: "এখানে বলা লেখা হবে বা আপনি টাইপও করতে পারেন...",
    sendBtn: "ডাক্তারের কাছে পাঠান ➔",
    processing: "প্রক্রিয়াকরণ হচ্ছে..."
  },
  "ta-IN": {
    title: "உங்கள் சுகாதார பிரச்சனையை சொல்லுங்கள்",
    subtitle: "உங்கள் பிராந்திய மொழியில் பேசுங்கள் அல்லது தட்டச்சு செய்க.",
    selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்:",
    tapToSpeak: "பேச ஐகானைத் தட்டவும்",
    listening: "கேட்கிறது... பேசுங்கள்",
    yourInput: "உங்கள் உள்ளீடு:",
    placeholder: "இங்கே பேசுங்கள் அல்லது தட்டச்சு செய்க...",
    sendBtn: "மருத்துவருக்கு அனுப்பு ➔",
    processing: "செயலாக்கப்படுகிறது..."
  },
  "te-IN": {
    title: "మీ ఆరోగ్య సమస్యను చెప్పండి",
    subtitle: "మీ ప్రాంతీయ భాషలో మాట్లాడండి లేదా టైప్ చేయండి.",
    selectLang: "భాషను ఎంచుకోండి:",
    tapToSpeak: "మాట్లాడటానికి చిహ్నాన్ని నొక్కండి",
    listening: "వింటోంది... మాట్లాడండి",
    yourInput: "మీ ఇన్ పుట్:",
    placeholder: "ఇక్కడ మాట్లాడండి లేదా టైప్ చేయండి...",
    sendBtn: "డాక్టర్ కు పంపండి ➔",
    processing: "ప్రాసెస్ అవుతోంది..."
  },
  "en-IN": {
    title: "Describe Your Health Symptoms",
    subtitle: "Speak or type in your language. Data auto-purges after session ends.",
    selectLang: "Select Language:",
    tapToSpeak: "Tap Icon & Speak",
    listening: "Listening... Start speaking now",
    yourInput: "Your Input (Spoken or Typed):",
    placeholder: "Spoken text will appear here or you can type...",
    sendBtn: "Send to Doctor Desk ➔",
    processing: "Processing Intake..."
  }
};

export default function App() {
  const [lang, setLang] = useState("gu-IN");
  const [isListening, setIsListening] = useState(false);
  const [patientInput, setPatientInput] = useState("");
  const [activeTab, setActiveTab] = useState("patient");
  const [isProcessing, setIsProcessing] = useState(false);

  // Shared state between Patient & Doctor
  const [clinicalForm, setClinicalForm] = useState(null);

  const recognitionRef = useRef(null);

  const currentUI = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS["en-IN"];

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

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Please use Google Chrome for Voice Input.");
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

  // Free Live Translation Engine (Low Bandwidth <100KB/s)
  const translateToEnglish = async (text, sourceLang) => {
    try {
      const sourceCode = sourceLang.split("-")[0];
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceCode}&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url);
      const data = await res.json();
      let translatedText = "";
      if (data && data[0]) {
        data[0].forEach((item) => {
          if (item[0]) translatedText += item[0];
        });
      }
      return translatedText || text;
    } catch {
      return text;
    }
  };

  // Helper Function for Fully Dynamic Duration Extraction
  const extractDynamicDuration = (textEn, rawText) => {
    const combined = `${rawText} ${textEn}`.toLowerCase();
    
    // Normalize Gujarati and Devanagari numerals to English digits
    const gujaratiDigits = {'૦':'0','૧':'1','૨':'2','૩':'3','૪':'4','૫':'5','૬':'6','૭':'7','૮':'8','૯':'9'};
    const devanagariDigits = {'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','૮':'8','९':'9'};
    
    let normalized = combined
      .replace(/[૦-૯]/g, d => gujaratiDigits[d] || d)
      .replace(/[०-९]/g, d => devanagariDigits[d] || d);

    // Common phrase normalizations (ranges & written numbers)
    normalized = normalized
      .replace(/૨-૩|૨૩|બે\s*ત્રણ|બે-ત્રણ|do\s*teen|दो\s*तीन|two\s*to\s*three|2\s*to\s*3/g, '2-3')
      .replace(/૩-૪|ત્રણ\s*ચાર|teen\s*chaar|तीन\s*चार|three\s*to\s*four|3\s*to\s*4/g, '3-4')
      .replace(/૪-૫|ચાર\s*પાંચ|chaar\s*paanch|four\s*to\s*five|4\s*to\s*5/g, '4-5')
      .replace(/૧-૨|એક\s*બે|ek\s*do|एक\s*दो|one\s*to\s*two|1\s*to\s*2/g, '1-2');

    // Time point markers
    if (normalized.includes('since morning') || normalized.includes('સવારથી') || normalized.includes('subah se') || normalized.includes('सकाळपासून') || normalized.includes('morning')) {
      return 'Since Morning';
    }
    if (normalized.includes('since yesterday') || normalized.includes('કાલથી') || normalized.includes('ગઈકાલથી') || normalized.includes('kal se') || normalized.includes('kalpasun') || normalized.includes('yesterday')) {
      return 'Since Yesterday';
    }
    if (normalized.includes('since today') || normalized.includes('આજથી') || normalized.includes('aaj se') || normalized.includes('today')) {
      return 'Since Today';
    }
    if (normalized.includes('few days') || normalized.includes('કેટલાક દિવસ') || normalized.includes('kuch din') || normalized.includes('काही दिवस')) {
      return 'Few Days';
    }

    // 1. Check Range + Unit (e.g. 2-3 days, 2-3 diwas, 2-3 din, 2-3 weeks, 2-3 mahina)
    const rangeMatch = normalized.match(/(\d+\s*-\s*\d+)\s*(days?|diwas|divas|din|dino|દહાડા|દિવસ|દિવસો|दिन|दिवस|weeks?|hafta|hafte|aathwadia|અઠવાડિયા|અઠવાડિયું|हफ्ते|हफ्ता|सप्ताह|months?|mahina|mahine|મહિના|મહિનો|महीने|महीना|years?|varsh|varas|saal|વર્ષ|વરસ|साल|वर्ष|hours?|ghante|kalak|કલાક|घंटे)/i);
    if (rangeMatch) {
      const range = rangeMatch[1].replace(/\s+/g, '');
      const unitRaw = rangeMatch[2].toLowerCase();
      let unit = 'Days';
      if (/week|haft|aathwad|સપ્તાહ/i.test(unitRaw)) unit = 'Weeks';
      else if (/month|mahin|મહિન|महीन/i.test(unitRaw)) unit = 'Months';
      else if (/year|varsh|varas|saal|વર્ષ|साल/i.test(unitRaw)) unit = 'Years';
      else if (/hour|ghant|kalak|કલાક|घंट/i.test(unitRaw)) unit = 'Hours';
      return `${range} ${unit}`;
    }

    // 2. Check Number + Unit (e.g. 50 days, 50 diwas, 50 divas, 5 days, 2 weeks, 1 month, 3 months, 1 year)
    const singleMatch = normalized.match(/(\d+)\s*(days?|diwas|divas|din|dino|દહાડા|દિવસ|દિવસો|दिन|दिवस|weeks?|hafta|hafte|aathwadia|અઠવાડિયા|અઠવાડિયું|हफ्ते|हफ्ता|सप्ताह|months?|mahina|mahine|મહિના|મહિનો|महीने|महीना|years?|varsh|varas|saal|વર્ષ|વરસ|साल|वर्ष|hours?|ghante|kalak|કલાક|घंटे)/i);
    if (singleMatch) {
      const count = parseInt(singleMatch[1], 10);
      const unitRaw = singleMatch[2].toLowerCase();
      let unit = count === 1 ? 'Day' : 'Days';
      if (/week|haft|aathwad|સપ્તાહ/i.test(unitRaw)) unit = count === 1 ? 'Week' : 'Weeks';
      else if (/month|mahin|મહિન|महीन/i.test(unitRaw)) unit = count === 1 ? 'Month' : 'Months';
      else if (/year|varsh|varas|saal|વર્ષ|साल/i.test(unitRaw)) unit = count === 1 ? 'Year' : 'Years';
      else if (/hour|ghant|kalak|કલાક|घंट/i.test(unitRaw)) unit = count === 1 ? 'Hour' : 'Hours';
      return `${count} ${unit}`;
    }

    // 3. Standalone words like "a week", "a month", "a year", "one day", "1 week"
    if (/one day|1 day|એક દિવસ|ek din|एक दिन/i.test(normalized)) return '1 Day';
    if (/one week|1 week|a week|એક અઠવાડિયું|ek hafta|एक हफ्ता/i.test(normalized)) return '1 Week';
    if (/one month|1 month|a month|એક મહિનો|ek mahina|एक महीना/i.test(normalized)) return '1 Month';
    if (/one year|1 year|a year|એક વર્ષ|ek saal|एक साल/i.test(normalized)) return '1 Year';

    // If no duration is mentioned at all
    return 'Not Specified';
  };

  // 🩺 Comprehensive Patient Syndromes & Urgency Classification Engine
  const extractClinicalSyndromes = (translatedEn, rawText) => {
    const combined = `${rawText} ${translatedEn}`.toLowerCase();
    const symptoms = [];
    let isUrgent = false;
    let isModerate = false;
    let specialty = "General Physician";

    // --- 1. CARDIOVASCULAR & EMERGENCY (HIGH URGENCY) ---
    if (/chest\s*pain|angina|tightness\s*in\s*chest|chest\s*pressure|heart\s*pain|pain\s*in\s*chest|છાતીમાં\s*દુખાવો|છાતી\s*ભીંસ|સીને\s*મેં\s*દર્દ|छाती\s*में\s*दर्द|छातीत\s*दुखणे/i.test(combined)) {
      symptoms.push("Chest Pain");
      isUrgent = true;
      specialty = "Cardiology";
    }
    if (/shortness\s*of\s*breath|difficulty\s*breathing|breathlessness|gasping|asthma\s*attack|suffocation|શ્વાસ\s*લેવામાં\s*તકલીફ|શ્વાસ\s*ચડવો|सांस\s*लेने\s*में\s*तकलीफ|श्वास\s*घेण्यास\s*त्रास/i.test(combined)) {
      symptoms.push("Shortness of Breath");
      isUrgent = true;
      if (specialty === "General Physician") specialty = "Pulmonology";
    }
    if (/palpitation|racing\s*heart|irregular\s*heartbeat|धड़कन\s*तेज|ધબકારા\s*તેજ/i.test(combined)) {
      symptoms.push("Palpitations");
      isModerate = true;
      if (specialty === "General Physician") specialty = "Cardiology";
    }
    if (/fainted|syncope|passed\s*out|loss\s*of\s*consciousness|ચક્કર\s*ખાઈને\s*પડી\s*જવું|બેભાન|बेहोश/i.test(combined)) {
      symptoms.push("Loss of Consciousness");
      isUrgent = true;
      specialty = "Emergency";
    }
    if (/seizure|convulsion|epilepsy|fits|આંચકી|मिर्गी|झटके/i.test(combined)) {
      symptoms.push("Seizures");
      isUrgent = true;
      specialty = "Neurology";
    }

    // --- 2. RESPIRATORY & ENT ---
    if (/coughing\s*blood|hemoptysis|કફમાં\s*લોહી|खांसी\s*में\s*खून/i.test(combined)) {
      symptoms.push("Coughing up Blood");
      isUrgent = true;
      specialty = "Pulmonology";
    } else if (/cough|coughing|phlegm|khansi|khokla|ઉધરસ|ખોખલી|કફ|खांसी|कफ|खोकला/i.test(combined)) {
      symptoms.push("Cough");
      if (specialty === "General Physician") specialty = "Pulmonology";
    }
    if (/cold|runny\s*nose|blocked\s*nose|nasal\s*congestion|sneezing|shardi|zukam|શરદી|છિંક|છીંક|સળેખમ|सर्दी|जुकाम|शिंका/i.test(combined)) {
      symptoms.push("Cold & Runny Nose");
      if (specialty === "General Physician") specialty = "ENT";
    }
    if (/sore\s*throat|throat\s*pain|throat\s*infection|tonsil|gale\s*me\s*dard|ગળામાં\s*દુખાવો|ગળામાં\s*ખરાશ|ગળું|गले\s*में\s*दर्द|गले\s*में\s*खराश|घसा\s*दुखणे/i.test(combined)) {
      symptoms.push("Sore Throat");
      if (specialty === "General Physician") specialty = "ENT";
    }
    if (/wheezing|wheeze|dama|દમ\s*લાગવો|દમ|अस्थमा/i.test(combined)) {
      symptoms.push("Wheezing");
      isModerate = true;
      if (specialty === "General Physician") specialty = "Pulmonology";
    }
    if (/ear\s*pain|earache|ear\s*discharge|કાનમાં\s*દુખાવો|કાનમાંથી\s*રસી|कान\s*में\s*दर्द/i.test(combined)) {
      symptoms.push("Ear Pain");
      if (specialty === "General Physician") specialty = "ENT";
    }

    // --- 3. INFECTIOUS & FEVER / FLU ---
    if (/high\s*fever|fever|feverish|temperature|bukhar|taap|તાવ|ગરમી|ताप|बुखार/i.test(combined)) {
      symptoms.push("Fever");
      if (specialty === "General Physician") specialty = "General Physician";
    }
    if (/chills|shivering|feeling\s*cold|thandi|kampari|ઠંડી\s*લાગવી|કંપારી|ઠંડી|कपकपी|ठंड\s*लगना|थंडी/i.test(combined)) {
      symptoms.push("Chills & Shivering");
      isModerate = true;
    }
    if (/weakness|fatigue|exhaustion|tiredness|kamzori|thakva|થાક|નબળાઈ|અશક્તિ|कमजोरी|थकान/i.test(combined)) {
      symptoms.push("Weakness & Fatigue");
    }
    if (/body\s*ache|body\s*pain|badan\s*dard|શરીર\s*દુખ|આખા\s*શરીરમાં\s*દુખાવો|બદન\s*દર્દ|बदन\s*दर्द|अंगदुखी/i.test(combined)) {
      symptoms.push("Body Aches");
    }

    // --- 4. GASTROINTESTINAL & ABDOMINAL ---
    if (/severe\s*stomach\s*pain|intense\s*abdominal\s*pain|પેટમાં\s*અસહ્ય\s*દુખાવો|पेट\s*में\s*भयंकर\s*दर्द/i.test(combined)) {
      symptoms.push("Severe Stomach Pain");
      isModerate = true;
      specialty = "Gastroenterology";
    } else if (/stomach\s*pain|abdominal\s*pain|belly\s*pain|pet\s*dard|pet\s*ma\s*dukh|પેટમાં\s*દુખાવો|પેટ\s*દુખ|પેટ|पेट\s*दर्द|पोटदुखी|पोटात\s*दुखणे/i.test(combined)) {
      symptoms.push("Stomach Pain");
      if (specialty === "General Physician") specialty = "Gastroenterology";
    }
    if (/vomiting|vomit|throwing\s*up|nausea|nauseous|ulti|ubka|ઉલટી|ઉબકા|उल्टी|जी\s*मिचलाना|उलटी/i.test(combined)) {
      symptoms.push("Vomiting & Nausea");
      if (specialty === "General Physician") specialty = "Gastroenterology";
    }
    if (/diarrhea|loose\s*motion|loose\s*stools|dast|zhada|ઝાડા|ઝાડો|ઝાડા-ઉલટી|दस्त|जुलाब|पातळ\s*शौच/i.test(combined)) {
      symptoms.push("Loose Motions / Diarrhea");
      if (specialty === "General Physician") specialty = "Gastroenterology";
    }
    if (/acidity|heartburn|acid\s*reflux|gerd|burning\s*in\s*stomach|baltara|બળતરા|એસિડિટી|ગેસ|गैस|एसिडिटी|सीने\s*में\s*जलन|पोटात\s*जळजळ/i.test(combined)) {
      symptoms.push("Acidity & Heartburn");
      if (specialty === "General Physician") specialty = "Gastroenterology";
    }
    if (/constipation|hard\s*stools|kabjiyat|kabz|કબજિયાત|कब्ज/i.test(combined)) {
      symptoms.push("Constipation");
      if (specialty === "General Physician") specialty = "Gastroenterology";
    }
    if (/blood\s*in\s*stool|rectal\s*bleeding|ઝાડામાં\s*લોહી|मल\s*में\s*खून/i.test(combined)) {
      symptoms.push("Blood in Stool");
      isUrgent = true;
      specialty = "Gastroenterology";
    }
    if (/jaundice|yellow\s*skin|yellow\s*eyes|કમળો|पीलिया/i.test(combined)) {
      symptoms.push("Jaundice (Yellow Eyes/Skin)");
      isModerate = true;
      specialty = "Gastroenterology";
    }

    // --- 5. NEUROLOGICAL ---
    if (/migraine|severe\s*headache|head\s*pain|headache|માથું\s*દુખ|માથાનો\s*દુખાવો|માથુ\s*દુખ|सिरदर्द|सिर\s*में\s*दर्द|डोके\s*दुख/i.test(combined)) {
      symptoms.push("Headache");
      if (specialty === "General Physician") specialty = "Neurology";
    }
    if (/dizziness|dizzy|vertigo|lightheaded|giddiness|room\s*spinning|ચક્કર|ચક્કર\s*આવવા|चक्कर\s*आना|चक्कर|भोवळ/i.test(combined)) {
      symptoms.push("Dizziness / Vertigo");
      if (specialty === "General Physician") specialty = "Neurology";
    }

    // --- 6. MUSCULOSKELETAL & ORTHOPEDICS ---
    if (/knee\s*pain|ghuntan|ઘૂંટણ|ઘૂંટણનો\s*દુખાવો|घुटने\s*का\s*दर्द/i.test(combined)) {
      symptoms.push("Knee Pain");
      if (specialty === "General Physician") specialty = "Orthopedics";
    } else if (/joint\s*pain|arthritis|shoulder\s*pain|elbow\s*pain|ankle\s*pain|sandha|સાંધા|जोड़ों\s*का\s*दर्द/i.test(combined)) {
      symptoms.push("Joint Pain");
      if (specialty === "General Physician") specialty = "Orthopedics";
    }
    if (/back\s*pain|lower\s*back|lumbago|sciatica|spine\s*pain|kamar\s*dard|pith\s*no\s*dukh|kamarno\s*dukh|કમરનો\s*દુખાવો|પીઠનો\s*દુખાવો|વાંસો|कमर\s*दर्द|पीठ\s*दर्द|पाठदुखी/i.test(combined)) {
      symptoms.push("Back Pain");
      if (specialty === "General Physician") specialty = "Orthopedics";
    }
    if (/neck\s*pain|stiff\s*neck|ડોકનો\s*દુખાવો|ગરદન\s*દર્દ|मान\s*दुखणे/i.test(combined)) {
      symptoms.push("Neck Pain");
      if (specialty === "General Physician") specialty = "Orthopedics";
    }
    if (/fracture|broken\s*bone|severe\s*injury|હાડકું\s*ભાંગવું|हड्डी\s*टूटना/i.test(combined)) {
      symptoms.push("Fracture / Severe Bone Injury");
      isUrgent = true;
      specialty = "Orthopedics";
    } else if (/sprain|swelling\s*in\s*leg|swelling\s*in\s*foot|swollen\s*ankle|ચોટ|મોચ|સોજો|मोच/i.test(combined)) {
      symptoms.push("Sprain & Swelling");
      if (specialty === "General Physician") specialty = "Orthopedics";
    }

    // --- 7. DERMATOLOGY & ALLERGY ---
    if (/skin\s*rash|rash|itching|itchy\s*skin|red\s*spots|allergy|hives|khujli|khanjval|chakama|ખંજવાળ|ચકામા|ફોલ્લી|દાહ|ચામડી\s*પર|खुजली|चकत्ते|पुरळ/i.test(combined)) {
      symptoms.push("Skin Rash & Itching");
      if (specialty === "General Physician") specialty = "Dermatology";
    }
    if (/boil|abscess|pimple|gumadu|ગુમડું|ચીરા|ફોલ્લો|फोड़ा/i.test(combined)) {
      symptoms.push("Skin Boil / Abscess");
      if (specialty === "General Physician") specialty = "Dermatology";
    }

    // --- 8. UROLOGY & NEPHROLOGY ---
    if (/blood\s*in\s*urine|hematuria|પેશાબમાં\s*લોહી|पेशाब\s*में\s*खून/i.test(combined)) {
      symptoms.push("Blood in Urine");
      isUrgent = true;
      specialty = "Urology";
    }
    if (/burning\s*urination|pain\s*in\s*urine|uti|dysuria|peshab\s*ma\s*baltara|peshab\s*me\s*jalan|પેશાબમાં\s*બળતરા|पेशाब\s*में\s*जलन/i.test(combined)) {
      symptoms.push("Burning Urination (UTI)");
      isModerate = true;
      specialty = "Urology";
    }
    if (/kidney\s*stone|renal\s*pain|flank\s*pain|પથરીનો\s*દુખાવો|પથરી|पथरी/i.test(combined)) {
      symptoms.push("Kidney Stone Pain");
      isModerate = true;
      specialty = "Urology";
    }

    // --- 9. OPHTHALMOLOGY (EYE) ---
    if (/eye\s*pain|red\s*eyes|watery\s*eyes|burning\s*eyes|aankh\s*ma\s*dukh|આંખમાં\s*દુખાવો|આંખ\s*લાલ|આંખ|आंखों\s*में\s*दर्द|आंख\s*लाल/i.test(combined)) {
      symptoms.push("Eye Pain & Redness");
      specialty = "Ophthalmology";
    }
    if (/blurred\s*vision|sudden\s*loss\s*of\s*vision|ઝાંખું\s*દેખાવું|धुंधला\s*दिखना/i.test(combined)) {
      symptoms.push("Blurred Vision");
      isModerate = true;
      specialty = "Ophthalmology";
    }

    // --- 10. DENTAL & ORAL ---
    if (/toothache|tooth\s*pain|gum\s*pain|gum\s*swelling|daant\s*ma\s*dukh|દાંતનો\s*દુખાવો|દાંત|દાઢ|दांत\s*दर्द/i.test(combined)) {
      symptoms.push("Toothache");
      specialty = "Dentistry";
    }
    if (/mouth\s*ulcer|canker\s*sore|chaala|મોઢામાં\s*ચાંદા|મુખપાક|मुंह\s*में\s*छाले/i.test(combined)) {
      symptoms.push("Mouth Ulcers");
      specialty = "Dentistry";
    }

    // --- 11. DYNAMIC ANATOMICAL EXTRACTION ---
    if (symptoms.length === 0) {
      const bodyParts = [
        { regex: /head|forehead|scalp|માથું|કપાળ|सिर/i, name: "Head", spec: "Neurology" },
        { regex: /throat|neck|ગળું|ગરદન|गला/i, name: "Throat / Neck", spec: "ENT" },
        { regex: /chest|ribs|છાતી|સીનો|छाती/i, name: "Chest", spec: "Cardiology" },
        { regex: /stomach|belly|abdomen|પેટ|पेट/i, name: "Stomach", spec: "Gastroenterology" },
        { regex: /back|spine|waist|પીઠ|કમર|पीठ|कमर/i, name: "Back", spec: "Orthopedics" },
        { regex: /shoulder|ખભો|कंधा/i, name: "Shoulder", spec: "Orthopedics" },
        { regex: /elbow|કોણી|कोहनी/i, name: "Elbow", spec: "Orthopedics" },
        { regex: /wrist|hand|palm|fingers|કાંડું|હાથ|આંગળી|कलाई|हाथ/i, name: "Hand & Wrist", spec: "Orthopedics" },
        { regex: /hip|pelvis|થાપો|कमर|कूल्हा/i, name: "Hip", spec: "Orthopedics" },
        { regex: /leg|thigh|calf|સાથળ|પગ|ટાંગ|जांघ|पैर/i, name: "Leg", spec: "Orthopedics" },
        { regex: /knee|ઘૂંટણ|घुटने/i, name: "Knee", spec: "Orthopedics" },
        { regex: /ankle|foot|heel|toe|ઘૂંટી|પગનો\s*પંજો|પાની|एड़ी|पैर/i, name: "Foot & Ankle", spec: "Orthopedics" },
        { regex: /skin|ચામડી|ત્વચા|त्वचा|चमड़ी/i, name: "Skin", spec: "Dermatology" },
        { regex: /eye|vision|આંખ|आंख/i, name: "Eye", spec: "Ophthalmology" },
        { regex: /ear|hearing|કાન|कान/i, name: "Ear", spec: "ENT" }
      ];

      const matchedBody = bodyParts.find(b => b.regex.test(combined));
      
      let problem = "Pain";
      if (/burning|બળતરા|जलन/i.test(combined)) problem = "Burning Sensation";
      else if (/swelling|સોજો|सूजन/i.test(combined)) problem = "Swelling";
      else if (/itching|ખંજવાળ|खुजली/i.test(combined)) problem = "Itching";
      else if (/stiffness|કડક|કડતર|जकड़न/i.test(combined)) problem = "Stiffness";
      else if (/cramp|ખેંચાણ|खिंचाव/i.test(combined)) problem = "Cramps";

      if (matchedBody) {
        symptoms.push(`${matchedBody.name} ${problem}`);
        specialty = matchedBody.spec;
      } else {
        const cleaned = translatedEn.replace(/^(i have|i feel|i am having|there is|patient has|suffering from)\s*/i, '').trim();
        const cap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        symptoms.push(cap || "Primary Health Symptom");
        specialty = "General Physician";
      }
    }

    // --- URGENCY LEVEL CALCULATION ---
    let urgency = {
      level: "Low",
      class: "badge-low",
      label: "Routine Assessment"
    };

    if (isUrgent) {
      urgency = {
        level: "HIGH (URGENT)",
        class: "badge-high",
        label: "Immediate Doctor Attention"
      };
    } else if (isModerate || (symptoms.length >= 2 && combined.includes("severe"))) {
      urgency = {
        level: "Moderate",
        class: "badge-medium",
        label: "Priority Check"
      };
    }

    return {
      symptoms: Array.from(new Set(symptoms)),
      specialty,
      urgency
    };
  };

  // Process and Generate Structured Intake Form
  const handleSubmitIntake = async (text) => {
    if (!text.trim()) return;
    setIsProcessing(true);

    // Preprocessing number ranges
    let preprocessedText = text
      .replace(/૨૩/g, "2-3")
      .replace(/\b23\b/g, "2-3")
      .replace(/બે ત્રણ/g, "2-3")
      .replace(/બે-ત્રણ/g, "2-3");

    const translatedEn = await translateToEnglish(preprocessedText, lang);

    // Patient Syndromes & Urgency Analysis
    const clinicalAnalysis = extractClinicalSyndromes(translatedEn, preprocessedText);

    // Dynamic Duration Extraction
    const dynamicDuration = extractDynamicDuration(translatedEn, preprocessedText);

    const generatedForm = {
      patientRawInput: preprocessedText,
      englishTranscript: translatedEn,
      extractedSymptoms: clinicalAnalysis.symptoms,
      urgency: clinicalAnalysis.urgency,
      category: clinicalAnalysis.specialty,
      duration: dynamicDuration,
      timestamp: new Date().toLocaleTimeString(),
    };

    setClinicalForm(generatedForm);
    setIsProcessing(false);
    setActiveTab("doctor");
  };

  const clearSession = () => {
    setClinicalForm(null);
    setPatientInput("");
    setActiveTab("patient");
  };

  return (
    <div className="container">
      {/* Top Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="brand-name">🩺 VaaniDoc AI Intake</h1>
          <span className="brand-badge">Low Bandwidth Mode</span>
        </div>

        <div className="header-actions">
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
            👨‍⚕️ Doctor Dashboard {clinicalForm && "● (1 New)"}
          </button>
        </div>
      </header>

      {/* PATIENT VIEW */}
      {activeTab === "patient" && (
        <div className="card">
          <div className="patient-hero-icon">🏥</div>
          <h2 className="patient-title">
            {currentUI.title}
          </h2>
          <p className="patient-subtitle">
            {currentUI.subtitle}
          </p>

          <div className="form-group">
            <label>{currentUI.selectLang}</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="gu-IN">ગુજરાતી (Gujarati)</option>
              <option value="hi-IN">हिन्दी (Hindi)</option>
              <option value="mr-IN">मराठी (Marathi)</option>
              <option value="bn-IN">বাংলা (Bengali)</option>
              <option value="ta-IN">தமிழ் (Tamil)</option>
              <option value="te-IN">తెలుగు (Telugu)</option>
              <option value="en-IN">English</option>
            </select>
          </div>

          <div className="mic-container">
            <button
              className={`mic-btn-glowing ${isListening ? "recording" : ""}`}
              onClick={toggleListening}
            >
              🎤
            </button>
            <p className={`mic-status ${isListening ? "active" : "idle"}`}>
              {isListening ? currentUI.listening : currentUI.tapToSpeak}
            </p>
          </div>

          <div className="form-group">
            <label>{currentUI.yourInput}</label>
            <textarea
              rows="3"
              value={patientInput}
              onChange={(e) => setPatientInput(e.target.value)}
              placeholder={currentUI.placeholder}
            />
          </div>

          {patientInput && (
            <button
              className="btn primary-btn submit-btn"
              onClick={() => handleSubmitIntake(patientInput)}
              disabled={isProcessing}
            >
              {isProcessing ? currentUI.processing : currentUI.sendBtn}
            </button>
          )}
        </div>
      )}

      {/* DOCTOR VIEW */}
      {activeTab === "doctor" && (
        <div className="card">
          {clinicalForm ? (
            <div>
              <div className="doctor-header">
                <h2>Structured Clinical Intake Form</h2>
                <span className="session-badge">
                  🔒 Ephemeral Session
                </span>
              </div>

              <div className="specialty-box">
                <small>Suggested Specialty</small>
                <div className="specialty-value">
                  {clinicalForm.category}
                </div>
              </div>

              <div className="clinical-panel">
                <div className="clinical-meta-row">
                  <span className="clinical-time">Recorded Time: {clinicalForm.timestamp}</span>
                  <span className={`urgency-badge ${clinicalForm.urgency.class}`}>
                    Triage: {clinicalForm.urgency.level}
                  </span>
                </div>

                <div className="clinical-field">
                  <small>Patient Verbal Input (Original Language):</small>
                  <p className="field-value">
                    "{clinicalForm.patientRawInput}"
                  </p>
                </div>

                <div className="clinical-field">
                  <small>Translated Clinical Narrative (English):</small>
                  <p className="field-value translation">
                    "{clinicalForm.englishTranscript}"
                  </p>
                </div>

                <div className="clinical-grid">
                  <div className="clinical-grid-item">
                    <small>Extracted Syndromes / Symptoms:</small>
                    <div className="grid-value symptoms">
                      {clinicalForm.extractedSymptoms.join(", ")}
                    </div>
                  </div>
                  <div className="clinical-grid-item">
                    <small>Reported Duration:</small>
                    <div className="grid-value duration">
                      {clinicalForm.duration}
                    </div>
                  </div>
                </div>

                <button
                  className="purge-btn"
                  onClick={clearSession}
                >
                  🗑️ Complete Consultation & Purge Patient Session
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👨‍⚕️</div>
              <h3>No Active Patient Intake</h3>
              <p>
                Waiting for patient to submit symptoms from mobile interface.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}