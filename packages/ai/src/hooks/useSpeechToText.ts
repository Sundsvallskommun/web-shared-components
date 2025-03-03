import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { ResultReason, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import { getAzureToken } from '../services/azure-service';
import React from 'react';

export interface SpeechToTextError {
  code: 'BROWSER_NOT_SUPPORTED' | 'MIC_NOT_AVAILABLE' | 'UNKOWN';
  message: string;
}

interface SpeechToTextData {
  transcript: string;
  listening: boolean;
  error?: SpeechToTextError;
  start: () => void;
  stop: () => void;
  toggleListening: () => void;
  reset: () => void;
  done: boolean;
}

type UseSpeechToText = (continuous?: boolean, lang?: string) => SpeechToTextData;

export const useSpeechToText: UseSpeechToText = (continuous = false, lang = 'sv-SE') => {
  const [delayedStart, setDelayedstart] = useState<boolean>(false);
  const [error, setError] = useState<SpeechToTextError | undefined>(undefined);
  const [transcripts, setTranscripts] = useState<string[]>(['']);
  const recognizer = React.useRef<SpeechRecognizer | undefined>(undefined);
  const [done, setDone] = useState<boolean>(false);
  const [listening, setListening] = useState(false);

  const transcript = transcripts.join(' ');

  const startStt = async () => {
    const tokenObj = await getAzureToken();
    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = lang;

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const myRecognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
    myRecognizer.recognizing = (sender, event) => {
      if (event.result.errorDetails) {
        setError({ code: 'UNKOWN', message: event.result.errorDetails });
      }
      if (event.result.text && event.result.reason === ResultReason.RecognizingSpeech) {
        setTranscripts((transcripts) => {
          const newTranscripts = [...transcripts];
          newTranscripts[transcripts.length - 1] = event.result.text;
          return newTranscripts;
        });
      }
      sender.speechEndDetected = () => {
        if (!continuous) {
          setDone(true);
        }
      };
    };

    myRecognizer.recognized = (sender, event) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      }
    }
  };

  useEffect(() => {
    if (recognizer.current && delayedStart) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };

  return {
    transcript,
    listening,
    error,
    start,
    stop,
    toggleListening,
    reset: resetTranscript,
    done,
  };
};
