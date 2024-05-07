import { useAssistantContext } from '../assistant-context';
import { AssistantSettings, PaginatedResponseAssistantPublic, SkHeaders } from '../types/assistant';

export const getSkHeaders = (options: AssistantSettings | undefined, settings: AssistantSettings): SkHeaders => {
  const assistantId = options?.assistantId || settings.assistantId || '';
  const user = options?.user || settings.user || '';
  const hash = options?.hash || settings.hash || '';
  const app = options?.app || settings.app || '';
  if (!assistantId) {
    throw new Error('No assistant Id. Either provide one in options, or add one to AssistantContext / Settings');
  }
  if (!hash) {
    throw new Error('No hash. Either provide one in options, or add one to AssistantContext / Settings');
  }
  return {
    _skuser: user,
    _skassistant: assistantId,
    _skhash: hash,
    _skapp: app,
  };
};

export const getAssistants: (options?: AssistantSettings) => Promise<PaginatedResponseAssistantPublic> = async (
  options
) => {
  const { settings } = useAssistantContext();

  const url = `${settings.apiBaseUrl}/assistants/`;
  const skHeaders = getSkHeaders(options, settings);

  return fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json', ...skHeaders },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error('Error when fetching assistants');
    });
};

export const getAssistantById = async (options?: AssistantSettings) => {
  const { settings } = useAssistantContext();
  const skHeaders = getSkHeaders(options, settings);
  const url = `${settings.apiBaseUrl}/assistants/${skHeaders._skassistant}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error('Error when fetching assistant');
    });
};

export const getAssistantSessions = async (options?: AssistantSettings) => {
  const { settings } = useAssistantContext();
  const skHeaders = getSkHeaders(options, settings);
  const url = `${settings.apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error('Error when fetching sessions');
    });
};

export const getAssistantSessionById = async (sessionId: string, options?: AssistantSettings) => {
  const { settings } = useAssistantContext();
  const skHeaders = getSkHeaders(options, settings);
  const url = `${settings.apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/${sessionId}/`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...skHeaders,
    },
  })
    .then((res) => res.json())
    .catch(() => {
      console.error('Error when fetching session');
    });
};

export const batchQuery = async (query: string, sessionId?: string, options?: AssistantSettings) => {
  const { settings } = useAssistantContext();
  const skHeaders = getSkHeaders(options, settings);
  const url = `${settings.apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/${sessionId || ''}?stream=false`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ body: query }),
    headers: {
      Accept: 'application/json',
      ...skHeaders,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error('401 Not authorized');
    }
    return res.json();
  });
};
