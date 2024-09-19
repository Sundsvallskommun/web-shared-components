import Cookie from 'universal-cookie';
import { useAssistantStore } from '../assistant-store';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { AzureToken } from '../types/azure';

const azureLogin = (baseUrl?: string) => {
  return fetch(`${baseUrl}/azure/login`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
};

export const getAzureToken = async (baseUrl?: string): Promise<AzureToken> => {
  const cookie = new Cookie();
  const speechToken = cookie.get('speech-token');
  const _apiBaseUrl = useAssistantStore.getState().apiBaseUrl;

  const apiBaseUrl = baseUrl || _apiBaseUrl;

  if (speechToken === undefined) {
    try {
      const res = await azureLogin(apiBaseUrl);
      const token = res.data.token;
      const region = res.data.region;
      cookie.set('speech-token', region + ':' + token, {
        maxAge: 540,
        path: '/',
      });

      return { authToken: token, region: region };
    } catch (err) {
      console.log(err);
      return { authToken: '', region: '' };
    }
  } else {
    const index = speechToken.indexOf(':');
    return {
      authToken: speechToken.slice(index + 1),
      region: speechToken.slice(0, index),
    };
  }
};

export interface TextToSpeechOptions {
  /**
   * @default sv-SE
   */

  language?: string;

  voice?: string;
}

export type TextToSpeech = (text: string, options?: TextToSpeechOptions) => void;

export const textToSpeech: TextToSpeech = async (text, options) => {
  const tokens = await getAzureToken();
  const language = options?.language || 'sv-SE';

  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokens.authToken, tokens.region);

  const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
  speechConfig.speechSynthesisLanguage = language;
  if (options?.voice) {
    speechConfig.speechSynthesisVoiceName = options.voice;
  }
  const speechSynthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  speechSynthesizer.speakTextAsync(
    text,
    (result) => {
      if (result) {
        speechSynthesizer.close();
        return result.audioData;
      }
    },
    (error) => {
      console.log(error);
      speechSynthesizer.close();
    }
  );
};
