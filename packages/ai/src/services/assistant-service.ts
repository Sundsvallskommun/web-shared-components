import { useAssistantStore } from '../assistant-store';
import { ChatEntryReference, ChatHistory, ChatHistoryEntry } from '../types';
import { AssistantSettings, SkHeaders } from '../types/assistant';
import {
  ConversationRequestDto,
  CursorPaginatedResponseSessionMetadataPublic,
  InfoBlobPublicNoText,
  Message,
  ModelId,
  PaginatedResponseAssistantPublic,
  SessionFeedback,
} from '../types/intric-backend';

export const getSkHeaders = (options?: AssistantSettings, settings?: AssistantSettings): SkHeaders => {
  const assistantId = options?.assistantId || settings?.assistantId || '';
  const user = options?.user || settings?.user || '';
  const hash = options?.hash || settings?.hash || '';
  const app = options?.app || settings?.app || '';
  const apikey = useAssistantStore?.getState?.()?.apikey;

  if (apikey && apikey !== 'undefined') {
    return { _apikey: apikey };
  }

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

export const getAssistantSessions = async (
  options?: AssistantSettings
): Promise<CursorPaginatedResponseSessionMetadataPublic> => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);

  const is_group_chat = options?.is_group_chat ?? settings?.is_group_chat ?? false;
  const assistant_id = options?.assistantId || settings?.assistantId;

  if (!assistant_id) {
    throw new Error('No assistant id provided.');
  }

  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = new URL(`${apiBaseUrl}/conversations`);

  if (is_group_chat) {
    url.searchParams.append('group_chat_id', assistant_id);
  } else {
    url.searchParams.append('assistant_id', assistant_id);
  }

  return fetch(url.toString(), {
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

  const url = `${apiBaseUrl}/conversations/${sessionId}`;

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

  const is_group_chat = options?.is_group_chat ?? settings?.is_group_chat ?? false;

  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const body: ConversationRequestDto = {
    question: query,
    session_id: sessionId || undefined,
    assistant_id: is_group_chat ? undefined : skHeaders._skassistant,
    group_chat_id: is_group_chat ? skHeaders._skassistant : undefined,
    stream: false,
    files: files || undefined,
  };

  const url = `${apiBaseUrl}/conversations`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
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

export const giveFeedback = async (feedback: SessionFeedback, sessionId: string, options?: AssistantSettings) => {
  const { settings, apiBaseUrl } = useAssistantStore.getState();
  const skHeaders = getSkHeaders(options, settings);
  if (!apiBaseUrl) {
    throw new Error('No api url provided');
  }

  const url = `${apiBaseUrl}/conversations/${sessionId}/feedback`;

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

export const mapReferencesToChatEntryReferences = (references: InfoBlobPublicNoText[]): ChatEntryReference[] => {
  return references?.map((reference) => ({ title: reference.metadata.title || '', url: reference.metadata.url || '' }));
};
export const mapSessionMessagesToChatHistory = (messages: Message[]): ChatHistory => {
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
