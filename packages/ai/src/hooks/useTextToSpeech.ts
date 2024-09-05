import { useEffect } from 'react';
import { textToSpeech, type TextToSpeech } from '../services/azure-service';

export const useTextToSpeech: TextToSpeech = (text, options) => {
  useEffect(() => {
    textToSpeech(text, options);
  }, [text, options]);
};
