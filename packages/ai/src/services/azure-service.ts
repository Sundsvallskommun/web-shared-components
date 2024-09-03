import Cookie from 'universal-cookie';
import { useAssistantStore } from '../assistant-store';
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
  const settings = useAssistantStore.getState().settings;

  const apiBaseUrl = baseUrl || settings.apiBaseUrl;

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
