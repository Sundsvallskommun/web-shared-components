import { useAssistantStore } from '../assistant-store';
import {
  ChatEntryReference,
  ChatHistory,
  ChatHistoryEntry,
  PaginatedResponseAssistantPublic,
  Reference,
  SessionMessage,
  SessionsResponse,
} from '../types';
import { AssistantFeedback, AssistantSettings, ModelId, SkHeaders } from '../types/assistant';

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
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }
  const url = `${apiBaseUrl}/assistants/`;
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
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/assistants/${skHeaders._skassistant}`;

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

export const getAssistantSessions = async (options?: AssistantSettings): Promise<SessionsResponse> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/`;
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
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/${sessionId}/`;

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

export const batchQuery = async (query: string, sessionId?: string, options?: AssistantSettings, files?: ModelId[]) => {
  const { apiBaseUrl, settings } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/${sessionId || ''}?stream=false`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ body: query, files }),
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

export const giveFeedback = async (feedback: AssistantFeedback, sessionId: string, options?: AssistantSettings) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/assistants/${skHeaders._skassistant}/sessions/${sessionId || ''}/feedback`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(feedback),
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

export const mapReferencesToChatEntryReferences = (references: Reference[]): ChatEntryReference[] => {
  return references?.map((reference) => ({ title: reference.metadata.title || '', url: reference.metadata.url || '' }));
};
export const mapSessionMessagesToChatHistory = (messages: SessionMessage[]): ChatHistory => {
  return messages?.reduce((history: ChatHistory, message) => {
    const question: ChatHistoryEntry = {
      id: `${message.id}-1`,
      text: message.question,
      origin: 'user',
      done: true,
    };
    const answer: ChatHistoryEntry = {
      id: `${message.id}-2`,
      text: message.answer,
      origin: 'assistant',
      done: true,
      references: mapReferencesToChatEntryReferences(message.references),
    };
    return [...history, question, answer];
  }, []);
};
