import Cookie from 'universal-cookie';
import { useAssistantStore } from '../assistant-store';

const azureLogin = (baseUrl?: string) => {
  return fetch(`${baseUrl}/azure/login`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
};

export const getAzureToken = async () => {
  const cookie = new Cookie();
  const speechToken = cookie.get('speech-token');
  const settings = useAssistantStore((state) => state.settings);

  if (speechToken === undefined) {
    try {
      const res = await azureLogin(settings.apiBaseUrl);
      const token = res.data.token;
      const region = res.data.region;
      cookie.set('speech-token', region + ':' + token, {
        maxAge: 540,
        path: '/',
      });

      return { authToken: token, region: region };
    } catch (err) {
      console.log(err);
      return { authToken: null, region: null };
    }
  } else {
    const index = speechToken.indexOf(':');
    return {
      authToken: speechToken.slice(index + 1),
      region: speechToken.slice(0, index),
    };
  }
};
