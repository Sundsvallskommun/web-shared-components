import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { ResultReason, TranslationRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { getAzureToken } from '../services/azure-service';
import { AzureToken } from '../types/azure';

export interface SpeechToTextError {
  code: 'BROWSER_NOT_SUPPORTED' | 'MIC_NOT_AVAILABLE' | 'UNKOWN';
  message: string;
}

interface SpeechToTextData {
  transcript: string;
  translation: string;
  listening: boolean;
  error?: SpeechToTextError;
  start: () => void;
  stop: () => void;
  toggleListening: () => void;
  reset: () => void;
  done: boolean;
}

type UseSpeechToText = (
  sourceLanguage?: string,
  targetLAnguage?: string,
  continuous?: boolean,
  token?: AzureToken
) => SpeechToTextData;

export const useSpeechToTextTranslation: UseSpeechToText = (
  sourceLanguage = 'sv-SE',
  targetLanguage = 'en-GB',
  continuous = false,
  token
) => {
  const [delayedStart, setDelayedstart] = useState<boolean>(false);
  const [error, setError] = useState<SpeechToTextError | undefined>(undefined);
  const [transcripts, setTranscripts] = useState<string[]>(['']);
  const [translations, setTranslations] = useState<string[]>(['']);
  const recognizer = React.useRef<TranslationRecognizer | undefined>();
  const [done, setDone] = useState<boolean>(false);
  const [listening, setListening] = useState(false);

  const transcript = transcripts.join(' ');
  const translation = translations.join(' ');

  const startStt = async () => {
    let tokenObj = token;
    if (!tokenObj) {
      tokenObj = await getAzureToken();
    }
    const speechConfig = speechsdk.SpeechTranslationConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = sourceLanguage;
    speechConfig.addTargetLanguage(targetLanguage);

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const myRecognizer = new speechsdk.TranslationRecognizer(speechConfig, audioConfig);

    myRecognizer.recognizing = (sender, event) => {
      if (event.result.errorDetails) {
        setError({ code: 'UNKOWN', message: event.result.errorDetails });
      }
      if (event.result.translations.get(targetLanguage) && event.result.reason === ResultReason.TranslatingSpeech) {
        setTranscripts((transcripts) => {
          const newTranscripts = [...transcripts];
          newTranscripts[transcripts.length - 1] = event.result.text;
          return newTranscripts;
        });
      }

      if (event.result.text && event.result.reason === ResultReason.RecognizingSpeech) {
        setTranslations((translations) => {
          const newTranslations = [...translations];
          newTranslations[translations.length - 1] = event.result.translations.get(targetLanguage);
          return newTranslations;
        });
      }

      sender.speechEndDetected = () => {
        if (!continuous) {
          setDone(true);
        }
      };
    };

    myRecognizer.recognized = (sender, event) => {
      if (event.result.translations.get(targetLanguage) && event.result.reason === ResultReason.TranslatedSpeech) {
        setTranslations((translations) => {
          const newTranslations = [...translations];
          newTranslations[translations.length - 1] = event.result.translations.get(targetLanguage);
          if (continuous) {
            newTranslations.push('');
          }
          return newTranslations;
        });
      }
      if (event.result.text && event.result.reason === ResultReason.RecognizedSpeech) {
        setTranscripts((transcripts) => {
          const newTranscripts = [...transcripts];
          newTranscripts[transcripts.length - 1] = event.result.text;
          if (continuous) {
            newTranscripts.push('');
          }
          return newTranscripts;
        });
      }

      sender.sessionStopped = () => {
        setListening(false);
      };
    };

    recognizer.current = myRecognizer;
  };

  useEffect(() => {
    startStt();
  }, [targetLanguage, sourceLanguage]);

  const start = async () => {
    if (recognizer.current && !listening) {
      if (continuous) {
        recognizer.current.startContinuousRecognitionAsync();
      } else {
        recognizer.current.recognizeOnceAsync();
      }
      setListening(true);
      setDelayedstart(false);
    } else {
      setDelayedstart(true);
    }
  };

  const stop = () => {
    if (listening && recognizer.current) {
      if (continuous) {
        recognizer.current.stopContinuousRecognitionAsync();
        setDone(false);
        setListening(false);
      } else {
        recognizer.current.stopContinuousRecognitionAsync();
        setDone(true);
        setListening(false);
      }
    }
  };

  useEffect(() => {
    if (recognizer.current && delayedStart) {
      start();
    }
  }, [recognizer.current, delayedStart]);

  const toggleListening = () => {
    if (listening) {
      stop();
    } else {
      start();
    }
  };

  const resetTranscript = () => {
    setTranscripts(['']);
    setTranslations(['']);
  };

  return {
    transcript,
    translation,
    listening,
    error,
    start,
    stop,
    toggleListening,
    reset: resetTranscript,
    done,
  };
};
