'use client';

// Ported from the app repo's src/components/landing/InteractiveMicroDemo.jsx,
// kept as close to the original as possible. Two adaptations for the static
// marketing site: `getLang(code)` (which read from the app's live language
// registry) is replaced by LANG_META below — a fixed lookup for exactly the
// codes InteractiveMicroDemo's own TARGET_WORDS ever needs, values taken
// verbatim from src/components/config/languages.jsx's LANGUAGES array — and
// `onComplete` (originally wired to the app's own signup flow) now just
// navigates to content.app_deep_link.

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Check, ChevronRight, Sparkles } from 'lucide-react';

const LANG_META = {
  th: { flag: '🇹🇭', nativeName: 'ไทย' },
  ja: { flag: '🇯🇵', nativeName: '日本語' },
  es: { flag: '🇪🇸', nativeName: 'Español' },
  ko: { flag: '🇰🇷', nativeName: '한국어' },
  en: { flag: '🇬🇧', nativeName: 'English' },
  fr: { flag: '🇫🇷', nativeName: 'Français' },
  de: { flag: '🇩🇪', nativeName: 'Deutsch' },
  it: { flag: '🇮🇹', nativeName: 'Italiano' },
  zh: { flag: '🇨🇳', nativeName: '简体中文' },
  ar: { flag: '🇸🇦', nativeName: 'العربية' },
  tr: { flag: '🇹🇷', nativeName: 'Türkçe' },
};
const getLang = (code) => LANG_META[code] || { flag: '', nativeName: code };

// ---------------------------------------------------------------------------
// All visitor-facing text for the demo — quiz-answer meanings, word-structure
// morpheme glosses, and surrounding UI chrome — keyed by the visitor's UI
// language. TARGET_WORDS below holds the actual foreign words, which are
// inherent to the target language and don't change with the visitor's
// language.
// ---------------------------------------------------------------------------
const MICRODEMO_T = {
  en: {
    hello: 'Hello', thankYou: 'Thank you', goodbye: 'Goodbye', please: 'Please',
    goodMorning: 'Good morning', goodEvening: 'Good evening', excuseMe: 'Excuse me', formalHello: 'Hello (formal)',
    gratitude: 'Gratitude', greetingBlessing: 'Greeting / Blessing', good: 'Good', day: 'Day',
    peaceSafety: 'Peace / Safety', politenessForm: 'Polite form', you: 'You',
    stepListen: 'Listen', stepChoose: 'Choose', stepUnderstand: 'Understand', wordLabel: 'Word #1',
    playIdle: 'Listen & continue', playPlaying: 'Playing…', playHint: 'Tap to hear the word',
    choosePrompt: 'What does this mean…', wrongFeedback: 'Try again! 💪', correctFlash: 'Correct! 🎉',
    methodLabel: 'Langsi Method', ctaButton: 'Save progress — free →', resetButton: 'Play again',
    progressHint: '1 word learned · Daily goal: 10% reached 🔥',
  },
  de: {
    hello: 'Hallo', thankYou: 'Danke', goodbye: 'Auf Wiedersehen', please: 'Bitte',
    goodMorning: 'Guten Morgen', goodEvening: 'Guten Abend', excuseMe: 'Entschuldigung', formalHello: 'Hallo (formell)',
    gratitude: 'Dankbarkeit', greetingBlessing: 'Gruß / Segen', good: 'Gute(r/s)', day: 'Tag(e)',
    peaceSafety: 'Frieden / Sicherheit', politenessForm: 'Höflichkeitsform', you: 'Du',
    stepListen: 'Anhören', stepChoose: 'Auswählen', stepUnderstand: 'Verstehen', wordLabel: 'Wort #1',
    playIdle: 'Anhören & weiter', playPlaying: 'Spielt ab…', playHint: 'Klicke, um das Wort zu hören',
    choosePrompt: 'Was bedeutet…', wrongFeedback: 'Nochmal versuchen! 💪', correctFlash: 'Richtig! 🎉',
    methodLabel: 'Langsi-Methode', ctaButton: 'Fortschritt speichern — kostenlos →', resetButton: 'Nochmal spielen',
    progressHint: '1 Wort gelernt · Tagesziel: 10% erreicht 🔥',
  },
  es: {
    hello: 'Hola', thankYou: 'Gracias', goodbye: 'Adiós', please: 'Por favor',
    goodMorning: 'Buenos días', goodEvening: 'Buenas tardes', excuseMe: 'Disculpe', formalHello: 'Hola (formal)',
    gratitude: 'Gratitud', greetingBlessing: 'Saludo / Bendición', good: 'Buen(o/a)', day: 'Día(s)',
    peaceSafety: 'Paz / Seguridad', politenessForm: 'Forma de cortesía', you: 'Tú',
    stepListen: 'Escuchar', stepChoose: 'Elegir', stepUnderstand: 'Entender', wordLabel: 'Palabra #1',
    playIdle: 'Escuchar y continuar', playPlaying: 'Reproduciendo…', playHint: 'Toca para escuchar la palabra',
    choosePrompt: 'Qué significa…', wrongFeedback: '¡Inténtalo de nuevo! 💪', correctFlash: '¡Correcto! 🎉',
    methodLabel: 'Método Langsi', ctaButton: 'Guardar progreso — gratis →', resetButton: 'Jugar de nuevo',
    progressHint: '1 palabra aprendida · Meta diaria: 10% alcanzado 🔥',
  },
  fr: {
    hello: 'Bonjour', thankYou: 'Merci', goodbye: 'Au revoir', please: "S'il vous plaît",
    goodMorning: 'Bonjour', goodEvening: 'Bonsoir', excuseMe: 'Excusez-moi', formalHello: 'Bonjour (formel)',
    gratitude: 'Gratitude', greetingBlessing: 'Salutation / Bénédiction', good: 'Bon(ne)', day: 'Jour',
    peaceSafety: 'Paix / Sécurité', politenessForm: 'Forme de politesse', you: 'Tu',
    stepListen: 'Écouter', stepChoose: 'Choisir', stepUnderstand: 'Comprendre', wordLabel: 'Mot n°1',
    playIdle: 'Écouter et continuer', playPlaying: 'Lecture…', playHint: 'Touchez pour entendre le mot',
    choosePrompt: 'Que signifie…', wrongFeedback: 'Réessayez ! 💪', correctFlash: 'Correct ! 🎉',
    methodLabel: 'Méthode Langsi', ctaButton: 'Enregistrer ma progression — gratuit →', resetButton: 'Rejouer',
    progressHint: '1 mot appris · Objectif quotidien : 10 % atteint 🔥',
  },
  it: {
    hello: 'Ciao', thankYou: 'Grazie', goodbye: 'Arrivederci', please: 'Per favore',
    goodMorning: 'Buongiorno', goodEvening: 'Buonasera', excuseMe: 'Mi scusi', formalHello: 'Salve (formale)',
    gratitude: 'Gratitudine', greetingBlessing: 'Saluto / Benedizione', good: 'Buon(o/a)', day: 'Giorno',
    peaceSafety: 'Pace / Sicurezza', politenessForm: 'Forma di cortesia', you: 'Tu',
    stepListen: 'Ascoltare', stepChoose: 'Scegliere', stepUnderstand: 'Capire', wordLabel: 'Parola #1',
    playIdle: 'Ascolta e continua', playPlaying: 'In riproduzione…', playHint: 'Tocca per ascoltare la parola',
    choosePrompt: 'Cosa significa…', wrongFeedback: 'Riprova! 💪', correctFlash: 'Corretto! 🎉',
    methodLabel: 'Metodo Langsi', ctaButton: 'Salva i progressi — gratis →', resetButton: 'Rigioca',
    progressHint: '1 parola imparata · Obiettivo giornaliero: 10% raggiunto 🔥',
  },
  ru: {
    hello: 'Привет', thankYou: 'Спасибо', goodbye: 'До свидания', please: 'Пожалуйста',
    goodMorning: 'Доброе утро', goodEvening: 'Добрый вечер', excuseMe: 'Извините', formalHello: 'Здравствуйте (формально)',
    gratitude: 'Благодарность', greetingBlessing: 'Приветствие / Благословение', good: 'Добр(ый/ое)', day: 'День',
    peaceSafety: 'Мир / Безопасность', politenessForm: 'Вежливая форма', you: 'Ты',
    stepListen: 'Слушать', stepChoose: 'Выбрать', stepUnderstand: 'Понять', wordLabel: 'Слово №1',
    playIdle: 'Слушать и продолжить', playPlaying: 'Воспроизведение…', playHint: 'Нажмите, чтобы услышать слово',
    choosePrompt: 'Что означает…', wrongFeedback: 'Попробуйте ещё раз! 💪', correctFlash: 'Правильно! 🎉',
    methodLabel: 'Метод Langsi', ctaButton: 'Сохранить прогресс — бесплатно →', resetButton: 'Играть снова',
    progressHint: '1 слово выучено · Дневная цель: 10% достигнуто 🔥',
  },
  zh: {
    hello: '你好', thankYou: '谢谢', goodbye: '再见', please: '请',
    goodMorning: '早上好', goodEvening: '晚上好', excuseMe: '不好意思', formalHello: '您好（正式）',
    gratitude: '感激', greetingBlessing: '问候 / 祝福', good: '好', day: '天',
    peaceSafety: '和平 / 安全', politenessForm: '敬语形式', you: '你',
    stepListen: '聆听', stepChoose: '选择', stepUnderstand: '理解', wordLabel: '单词 #1',
    playIdle: '听一听，继续', playPlaying: '播放中…', playHint: '点击聆听这个词',
    choosePrompt: '这是什么意思…', wrongFeedback: '再试一次！💪', correctFlash: '正确！🎉',
    methodLabel: 'Langsi 学习法', ctaButton: '保存进度 — 免费 →', resetButton: '再玩一次',
    progressHint: '已学会 1 个单词 · 每日目标完成 10% 🔥',
  },
  ja: {
    hello: 'こんにちは', thankYou: 'ありがとう', goodbye: 'さようなら', please: 'お願いします',
    goodMorning: 'おはよう', goodEvening: 'こんばんは', excuseMe: 'すみません', formalHello: 'こんにちは（丁寧）',
    gratitude: '感謝', greetingBlessing: '挨拶 / 祝福', good: '良い', day: '日',
    peaceSafety: '平和 / 安全', politenessForm: '敬語表現', you: 'あなた',
    stepListen: '聞く', stepChoose: '選ぶ', stepUnderstand: '理解する', wordLabel: '単語 #1',
    playIdle: '聞いて次へ', playPlaying: '再生中…', playHint: 'タップして単語を聞く',
    choosePrompt: '意味は…', wrongFeedback: 'もう一度！💪', correctFlash: '正解！🎉',
    methodLabel: 'Langsiメソッド', ctaButton: '進捗を保存 — 無料 →', resetButton: 'もう一度プレイ',
    progressHint: '1単語学習 · 今日の目標10%達成 🔥',
  },
  ur: {
    hello: 'ہیلو', thankYou: 'شکریہ', goodbye: 'خدا حافظ', please: 'براہ کرم',
    goodMorning: 'صبح بخیر', goodEvening: 'شام بخیر', excuseMe: 'معاف کیجیے', formalHello: 'السلام علیکم (رسمی)',
    gratitude: 'شکرگزاری', greetingBlessing: 'سلام / دعا', good: 'اچھا', day: 'دن',
    peaceSafety: 'امن / حفاظت', politenessForm: 'مؤدبانہ صیغہ', you: 'آپ',
    stepListen: 'سنیں', stepChoose: 'منتخب کریں', stepUnderstand: 'سمجھیں', wordLabel: 'لفظ #1',
    playIdle: 'سنیں اور آگے بڑھیں', playPlaying: 'چل رہا ہے…', playHint: 'لفظ سننے کے لیے ٹیپ کریں',
    choosePrompt: 'اس کا مطلب کیا ہے…', wrongFeedback: 'دوبارہ کوشش کریں! 💪', correctFlash: 'درست! 🎉',
    methodLabel: 'Langsi طریقہ', ctaButton: 'پیش رفت محفوظ کریں — مفت ←', resetButton: 'دوبارہ کھیلیں',
    progressHint: '1 لفظ سیکھا · روزانہ ہدف: 10% مکمل 🔥',
  },
  ar: {
    hello: 'مرحباً', thankYou: 'شكراً', goodbye: 'مع السلامة', please: 'من فضلك',
    goodMorning: 'صباح الخير', goodEvening: 'مساء الخير', excuseMe: 'المعذرة', formalHello: 'مرحباً (رسمي)',
    gratitude: 'امتنان', greetingBlessing: 'تحية / بركة', good: 'خير', day: 'يوم',
    peaceSafety: 'سلام / أمان', politenessForm: 'صيغة التبجيل', you: 'أنتَ',
    stepListen: 'استمع', stepChoose: 'اختر', stepUnderstand: 'افهم', wordLabel: 'كلمة رقم 1',
    playIdle: 'استمع وتابع', playPlaying: 'قيد التشغيل…', playHint: 'اضغط لسماع الكلمة',
    choosePrompt: 'ماذا تعني…', wrongFeedback: 'حاول مرة أخرى! 💪', correctFlash: 'صحيح! 🎉',
    methodLabel: 'طريقة Langsi', ctaButton: 'احفظ تقدمك — مجاناً ←', resetButton: 'العب مرة أخرى',
    progressHint: 'تم تعلم كلمة واحدة · الهدف اليومي: تحقيق 10% 🔥',
  },
  hi: {
    hello: 'नमस्ते', thankYou: 'धन्यवाद', goodbye: 'अलविदा', please: 'कृपया',
    goodMorning: 'सुप्रभात', goodEvening: 'शुभ संध्या', excuseMe: 'माफ़ कीजिए', formalHello: 'नमस्ते (औपचारिक)',
    gratitude: 'कृतज्ञता', greetingBlessing: 'अभिवादन / आशीर्वाद', good: 'अच्छा', day: 'दिन',
    peaceSafety: 'शांति / सुरक्षा', politenessForm: 'सम्मानसूचक रूप', you: 'आप',
    stepListen: 'सुनें', stepChoose: 'चुनें', stepUnderstand: 'समझें', wordLabel: 'शब्द #1',
    playIdle: 'सुनें और आगे बढ़ें', playPlaying: 'चल रहा है…', playHint: 'शब्द सुनने के लिए टैप करें',
    choosePrompt: 'इसका क्या मतलब है…', wrongFeedback: 'फिर से कोशिश करें! 💪', correctFlash: 'सही! 🎉',
    methodLabel: 'Langsi तरीका', ctaButton: 'प्रगति सहेजें — मुफ़्त →', resetButton: 'फिर से खेलें',
    progressHint: '1 शब्द सीखा · दैनिक लक्ष्य: 10% पूरा 🔥',
  },
};

// ---------------------------------------------------------------------------
// Which target languages are most relevant to showcase for each UI language,
// ordered by relevance (index 0 is pre-selected). Deliberately excludes the
// visitor's own language. This is a marketing showcase of the Langsi Method
// across different scripts — not a live course catalog.
// ---------------------------------------------------------------------------
const RELEVANT_LANGS = {
  en: ['es', 'fr', 'ja', 'zh'],
  zh: ['en', 'ja', 'ko', 'fr'],
  es: ['en', 'fr', 'de', 'it'],
  hi: ['en', 'fr', 'de', 'ja'],
  ar: ['en', 'fr', 'tr', 'de'],
  fr: ['en', 'es', 'de', 'it'],
  de: ['th', 'ja', 'es', 'ko'],
  ru: ['en', 'de', 'fr', 'es'],
  ja: ['en', 'ko', 'zh', 'es'],
  ur: ['en', 'ar', 'tr', 'zh'],
  it: ['en', 'es', 'fr', 'de'],
};

// Latin-script targets get the display font; wide-glyph scripts get extra tracking.
const LATIN_SCRIPT_TARGETS = ['en', 'es', 'fr', 'de', 'it'];
const WIDE_SCRIPT_TARGETS = ['ko', 'ja', 'zh'];

// The word/phonetic/structure content below is inherent to the target language
// and stays fixed; only the meanings/labels (via MICRODEMO_T) are translated
// per visitor language.
const TARGET_WORDS = {
  th: {
    word: 'สวัสดี', phonetic: 'sa-wàt-dii', audioLang: 'th-TH',
    meaningKey: 'hello', choiceKeys: ['thankYou', 'hello', 'goodbye', 'please'],
    structure: [{ part: 'สวัสดี', morphemeKey: 'greetingBlessing' }],
  },
  ja: {
    word: 'ありがとう', phonetic: 'a-ri-ga-tō', audioLang: 'ja-JP',
    meaningKey: 'thankYou', choiceKeys: ['hello', 'thankYou', 'please', 'excuseMe'],
    structure: [{ part: 'ありがとう', morphemeKey: 'gratitude' }],
  },
  es: {
    word: 'Buenos días', phonetic: 'bwé-nos dí-as', audioLang: 'es-ES',
    meaningKey: 'goodMorning', choiceKeys: ['goodEvening', 'goodMorning', 'goodbye', 'please'],
    structure: [{ part: 'Buenos', morphemeKey: 'good' }, { part: 'días', morphemeKey: 'day' }],
  },
  ko: {
    word: '안녕하세요', phonetic: 'an-nyeong-ha-se-yo', audioLang: 'ko-KR',
    meaningKey: 'formalHello', choiceKeys: ['thankYou', 'goodbye', 'formalHello', 'please'],
    structure: [{ part: '안녕', morphemeKey: 'peaceSafety' }, { part: '하세요', morphemeKey: 'politenessForm' }],
  },
  en: {
    word: 'Thank you', phonetic: 'thehnk-yoo', audioLang: 'en-US',
    meaningKey: 'thankYou', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: 'Thank', morphemeKey: 'gratitude' }, { part: 'you', morphemeKey: 'you' }],
  },
  fr: {
    word: 'Bonjour', phonetic: 'bon-schuur', audioLang: 'fr-FR',
    meaningKey: 'hello', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: 'Bon', morphemeKey: 'good' }, { part: 'jour', morphemeKey: 'day' }],
  },
  de: {
    word: 'Guten Tag', phonetic: 'GOO-ten-tahk', audioLang: 'de-DE',
    meaningKey: 'hello', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: 'Guten', morphemeKey: 'good' }, { part: 'Tag', morphemeKey: 'day' }],
  },
  it: {
    word: 'Buongiorno', phonetic: 'bwohn-JOR-no', audioLang: 'it-IT',
    meaningKey: 'goodMorning', choiceKeys: ['goodEvening', 'goodMorning', 'goodbye', 'please'],
    structure: [{ part: 'Buon', morphemeKey: 'good' }, { part: 'giorno', morphemeKey: 'day' }],
  },
  zh: {
    word: '你好', phonetic: 'nǐ hǎo', audioLang: 'zh-CN',
    meaningKey: 'hello', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: '你', morphemeKey: 'you' }, { part: '好', morphemeKey: 'good' }],
  },
  ar: {
    word: 'مرحبا', phonetic: 'mar-ha-ban', audioLang: 'ar-SA',
    meaningKey: 'hello', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: 'مرحبا', morphemeKey: 'greetingBlessing' }],
  },
  tr: {
    word: 'Merhaba', phonetic: 'mer-ha-ba', audioLang: 'tr-TR',
    meaningKey: 'hello', choiceKeys: ['hello', 'thankYou', 'goodbye', 'please'],
    structure: [{ part: 'Merhaba', morphemeKey: 'greetingBlessing' }],
  },
};

export default function MicroDemo({ content }) {
  const uiLang = content.base_language;
  const onComplete = () => {
    window.location.href = content.app_deep_link;
  };

  const T = MICRODEMO_T[uiLang] || MICRODEMO_T.en;
  const relevantCodes = RELEVANT_LANGS[uiLang] || RELEVANT_LANGS.en;
  const LANGUAGES = relevantCodes.map((code) => ({ code, ...getLang(code) }));

  const STEPS = [
    { num: 1, label: T.stepListen, icon: Volume2 },
    { num: 2, label: T.stepChoose, icon: ChevronRight },
    { num: 3, label: T.stepUnderstand, icon: Check },
  ];

  const [selectedLang, setSelectedLang] = useState(relevantCodes[0]);
  const [step, setStep] = useState(1); // 1=listen, 2=choose, 3=reveal
  const [playing, setPlaying] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [wrong, setWrong] = useState(false);
  const utteranceRef = useRef(null);

  const target = TARGET_WORDS[selectedLang];
  const langMeta = getLang(selectedLang);
  const demo = {
    word: target.word,
    phonetic: target.phonetic,
    audioLang: target.audioLang,
    translation: T[target.meaningKey],
    correctChoice: T[target.meaningKey],
    choices: target.choiceKeys.map((k) => T[k]),
    structure: target.structure.map((s) => ({ part: s.part, meaning: T[s.morphemeKey] })),
  };

  const handleLangChange = (code) => {
    setSelectedLang(code);
    setStep(1);
    setSelectedChoice(null);
    setWrong(false);
    setPlaying(false);
  };

  const getBestVoice = (lang) => {
    const voices = window.speechSynthesis.getVoices();
    const langVoices = voices.filter((v) => v.lang.startsWith(lang.split('-')[0]));
    // Prefer high-quality voices: Google > Enhanced > Premium > any
    const priority = ['Google', 'Enhanced', 'Premium'];
    for (const keyword of priority) {
      const match = langVoices.find((v) => v.name.includes(keyword));
      if (match) return match;
    }
    return langVoices[0] || null;
  };

  const handlePlay = () => {
    if (playing) return;
    setPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(demo.word);
      u.lang = demo.audioLang;
      u.rate = 0.85;

      // Assign best available voice, with fallback to voices-loaded retry
      const speak = () => {
        const bestVoice = getBestVoice(demo.audioLang);
        if (bestVoice) u.voice = bestVoice;
        u.onend = () => {
          setPlaying(false);
          setTimeout(() => setStep(2), 400);
        };
        u.onerror = () => setPlaying(false);
        utteranceRef.current = u;
        window.speechSynthesis.speak(u);
      };

      // Voices may not be loaded yet — wait for the event if list is empty
      if (window.speechSynthesis.getVoices().length > 0) {
        speak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          speak();
        };
      }
    } else {
      setTimeout(() => {
        setPlaying(false);
        setStep(2);
      }, 1200);
    }
  };

  const handleChoice = (choice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    if (choice === demo.correctChoice) {
      setTimeout(() => setStep(3), 600);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setSelectedChoice(null);
      }, 900);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedChoice(null);
    setWrong(false);
    setPlaying(false);
  };

  return (
    <section className="py-16 px-5" style={{ background: '#161f19' }}>
      <div className="w-full max-w-sm mx-auto select-none">
        {/* Language Picker */}
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLangChange(l.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                selectedLang === l.code
                  ? 'bg-[#50C878] text-[#1C3A27] border-[#50C878]'
                  : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
              }`}
            >
              <span>{l.flag}</span>
              <span className="hidden sm:inline">{l.nativeName}</span>
            </button>
          ))}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-1 mb-5">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className={`flex items-center gap-1 transition-all ${step >= s.num ? 'text-[#50C878]' : 'text-white/20'}`}>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all ${
                    step >= s.num ? 'border-[#50C878] bg-[#50C878]/15' : 'border-white/15'
                  }`}
                >
                  {step > s.num ? <Check className="w-2.5 h-2.5" /> : s.num}
                </div>
                <span className="text-[10px] font-medium hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 transition-all ${step > s.num ? 'bg-[#50C878]/50' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Demo Card */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
            border: '1px solid rgba(80,200,120,0.25)',
            boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
            minHeight: 240,
          }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: LISTEN */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-7 flex flex-col items-center text-center gap-5"
              >
                <div className="text-white/40 text-xs font-semibold tracking-widest uppercase">
                  {langMeta.flag} {langMeta.nativeName} · {T.wordLabel}
                </div>
                <div
                  className="text-5xl font-bold text-white leading-none"
                  style={{
                    fontFamily: LATIN_SCRIPT_TARGETS.includes(selectedLang) ? 'Poppins' : 'inherit',
                    letterSpacing: WIDE_SCRIPT_TARGETS.includes(selectedLang) ? '0.05em' : '0',
                  }}
                >
                  {demo.word}
                </div>
                <div className="text-[#50C878]/80 text-sm font-mono tracking-wide">{demo.phonetic}</div>

                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: playing ? 1 : 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm transition-all ${
                    playing ? 'bg-[#50C878]/30 text-[#50C878] cursor-default' : 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
                  }`}
                  style={{ fontFamily: 'Poppins' }}
                >
                  <Volume2 className={`w-4 h-4 ${playing ? 'animate-pulse' : ''}`} />
                  {playing ? T.playPlaying : T.playIdle}
                </motion.button>
                <p className="text-white/25 text-xs">{T.playHint}</p>
              </motion.div>
            )}

            {/* STEP 2: CHOOSE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-7 flex flex-col gap-4"
              >
                <div className="text-center text-white/40 text-xs font-semibold tracking-widest uppercase mb-1">
                  {T.choosePrompt}
                </div>
                <div className="text-center text-3xl font-bold text-white mb-2">{demo.word}</div>
                <div className="grid grid-cols-2 gap-2">
                  {demo.choices.map((choice) => {
                    const isCorrect = choice === demo.correctChoice;
                    const isSelected = choice === selectedChoice;
                    return (
                      <motion.button
                        key={choice}
                        onClick={() => handleChoice(choice)}
                        whileTap={{ scale: 0.97 }}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition-all border ${
                          isSelected && isCorrect
                            ? 'bg-[#50C878] text-[#1C3A27] border-[#50C878]'
                            : isSelected && !isCorrect
                              ? 'bg-red-500/20 text-red-400 border-red-500/40'
                              : 'border-white/10 text-white/70 hover:border-[#50C878]/40 hover:text-white hover:bg-[#50C878]/8'
                        }`}
                      >
                        {choice}
                      </motion.button>
                    );
                  })}
                </div>
                {wrong && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs text-center">
                    {T.wrongFeedback}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* STEP 3: REVEAL (Langsi-Methode) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-7 flex flex-col gap-4"
              >
                {/* Success flash */}
                <div className="flex items-center justify-center gap-2 text-[#50C878] font-bold text-sm mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#50C878] flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#1C3A27]" />
                  </div>
                  {T.correctFlash}
                </div>

                {/* Word + translation */}
                <div className="rounded-xl bg-[#50C878]/8 border border-[#50C878]/20 p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{demo.word}</div>
                  <div className="text-[#50C878]/80 text-xs font-mono mb-2">{demo.phonetic}</div>
                  <div className="text-white font-semibold text-base">{demo.translation}</div>
                </div>

                {/* Langsi-Methode: Struktur */}
                {demo.structure.length > 1 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-semibold tracking-widest uppercase mb-2">
                      <Sparkles className="w-3 h-3 text-[#50C878]" /> {T.methodLabel}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {demo.structure.map((s, i) => (
                        <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center min-w-[70px]">
                          <div className="text-white font-bold text-sm">{s.part}</div>
                          <div className="text-white/40 text-[10px] mt-0.5">{s.meaning}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA or reset */}
                <div className="flex flex-col gap-2 mt-1">
                  <motion.button
                    onClick={onComplete}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-full bg-[#50C878] text-[#1C3A27] font-bold py-3 text-sm"
                    style={{ fontFamily: 'Poppins', boxShadow: '0 4px 24px rgba(80,200,120,0.3)' }}
                  >
                    {T.ctaButton}
                  </motion.button>
                  <button onClick={handleReset} className="text-white/25 text-xs text-center hover:text-white/50 transition-colors">
                    {T.resetButton}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress hint */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-center text-xs text-white/30">
            {T.progressHint}
          </motion.div>
        )}
      </div>
    </section>
  );
}
