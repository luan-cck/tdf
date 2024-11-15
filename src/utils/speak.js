export const getVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

export const speakText = (text, selectedVoice, onEndCallback) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onend = onEndCallback;
  utterance.oncancel = onEndCallback;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};
