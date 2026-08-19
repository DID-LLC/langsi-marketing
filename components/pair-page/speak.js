// Client-side-only TTS helper, extracted from the old MicroDemo.jsx (PROMPT-18)
// so AdsDemoStep2Flashcard.jsx and AdsDemoStep3Example.jsx can both use it
// without duplicating the same ~30 lines. Mirrors the app repo's
// src/lib/tts/webSpeechService.js speak() behavior (voice-loading race
// workaround, Google/Enhanced/Premium voice preference) closely enough for
// this site's purposes.
function getBestVoice(langCode) {
  const voices = window.speechSynthesis.getVoices();
  const base = langCode.split('-')[0];
  const langVoices = voices.filter((v) => v.lang.startsWith(base));
  const priority = ['Google', 'Enhanced', 'Premium'];
  for (const keyword of priority) {
    const match = langVoices.find((v) => v.name.includes(keyword));
    if (match) return match;
  }
  return langVoices[0] || null;
}

export function speak(text, langCode, onDone) {
  if (!text || !('speechSynthesis' in window)) {
    onDone?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.85;

  const doSpeak = () => {
    const voice = getBestVoice(langCode);
    if (voice) u.voice = voice;
    u.onend = () => onDone?.();
    u.onerror = () => onDone?.();
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      doSpeak();
    };
  }
}
