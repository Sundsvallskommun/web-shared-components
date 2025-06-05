import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import React from 'react';
import { useAssistantStore } from '../assistant-store';
import { batchQuery } from '../services/assistant-service';
import { AssistantSettings, ModelId, SkHeaders } from '../types/assistant';
import { ChatEntryReference, ChatHistory, ChatHistoryEntry, Origin } from '../types/history';
import { ResponseData } from '../types/response';
import { useSessions } from '../session-store';

const MAX_REFERENCE_COUNT = 3;

interface useChatOptions {
  settings?: AssistantSettings;
  sessionId?: string;
  apiBaseUrl?: string;
  stream?: boolean;
}

export const useChat = (options?: useChatOptions) => {
  const sessionId = React.useMemo(() => options?.sessionId || '', [options?.sessionId]);
  const _incomingSettings = React.useMemo(() => options?.settings, [options?.settings]);

  const [currentSession, setCurrentSession] = React.useState<string>(sessionId || '');
  const [_settings, _stream, _apiBaseUrl, apikey] = useAssistantStore((state) => [
    state.settings,
    state.stream,
    state.apiBaseUrl,
    state.apikey,
  ]);
  const settings = _incomingSettings || _settings;
  const { assistantId, user: _user, hash, app } = settings;
  const user = _user || '';
  const stream = (options?.stream || _stream) ?? true;
  const apiBaseUrl = options?.apiBaseUrl || _apiBaseUrl;

  const [session, getSession, newSession, updateHistory, updateSession, setDone, changeSessionId] = useSessions(
    (state) => [
      state.sessions[currentSession],
      state.getSession,
      state.newSession,
      state.updateHistory,
      state.updateSession,
      state.setDone,
      state.changeSessionId,
    ]
  );

  const history = session?.history || [];
  const done = session?.done;
  const isNew = session?.isNew;

  const createNewSession = React.useCallback(() => {
    const id = newSession();
    setCurrentSession(id);
  }, [sessionId]);

  const updateSessionId = (id: string) => {
    changeSessionId(currentSession, id);
    setCurrentSession(id);
  };

  const setSessionName = (name?: string) => {
    const _name = name || history.at(0)?.text || '';
    updateSession(currentSession, (session) => ({ ...session, name: _name, updated_at: new Date() }));
  };

  React.useEffect(() => {
    if (sessionId) {
      if (sessionId !== currentSession)
        getSession(sessionId).then((session) => {
          if (!session) {
            console.log('Session not available. Creating new');
            createNewSession();
          } else {
            setCurrentSession(sessionId);
          }
        });
    } else {
      createNewSession();
    }
  }, [sessionId]);

  const addHistoryEntry = (
    origin: Origin,
    text: string,
    id: string,
    done: boolean,
    references: ChatEntryReference[] = []
  ) => {
    const historyEntry: ChatHistoryEntry = {
      origin: origin,
      text,
      id,
      done,
      ...references,
    };
    updateHistory(currentSession, (history) => [...(history || []), historyEntry]);
  };

  const streamQuery = (
    query: string,
    assistantId: string,
    session_id: string,
    user: string,
    hash: string,
    files?: ModelId[],
    addToHistory: boolean = true
  ) => {
    const answerId = crypto.randomUUID();

    if (!session.name) {
      setSessionName(query);
    }
    setDone(currentSession, false);

    if (addToHistory) {
      addHistoryEntry('assistant', '', answerId, false);
    }

    const url = `${apiBaseUrl}/assistants/${assistantId}/sessions/${session_id || ''}?stream=true`;

    let _id = '';
    let references: ChatEntryReference[];

    const skHeaders: SkHeaders = {
      _skuser: user,
      _skassistant: assistantId,
      _skhash: hash,
      _skapp: app || '',
      _apikey: apikey,
    };

    fetchEventSource(url, {
      method: 'POST',
      body: JSON.stringify({ body: query, files }),
      headers: {
        Accept: 'text/event-stream',
        ...skHeaders,
      },
      onopen(res: Response) {
        if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          if (addToHistory) {
            updateHistory(currentSession, (history: ChatHistory) => {
              const newHistory = [...history];
              const index = history.findIndex((chat) => chat.id === answerId);
              if (index > -1) {
                newHistory[index] = {
                  origin: 'system',
                  text: 'Ett fel inträffade, assistenten gav inget svar.',
                  id: answerId,
                  done: true,
                };
              }
              return newHistory;
            });
          }
          console.error('Client-side error ', res);
        }
        return Promise.resolve();
      },
      onmessage(event: EventSourceMessage) {
        let parsedData: ResponseData;
        if (addToHistory) {
          try {
            parsedData = JSON.parse(event.data);
          } catch {
            console.error('Error when parsing response as json. Returning.');
            return;
          }
          if (currentSession !== parsedData.session_id && isNew) {
            _id = parsedData.session_id;
          }

          references =
            parsedData.references
              ?.filter((reference) => !!reference.metadata.url)
              .map((reference) => ({
                title: reference.metadata.title || reference.metadata.url || '',
                url: reference.metadata.url || '',
              })) || [];
          updateHistory(currentSession, (history: ChatHistory) => {
            const newHistory = [...history];
            const index = history.findIndex((chat) => chat.id === answerId);
            if (index === -1) {
              newHistory.push({
                origin: 'assistant',
                text: parsedData.answer,
                id: answerId,
                done: false,
              });
            } else {
              newHistory[index] = {
                origin: 'assistant',
                text: history[index]?.text + parsedData.answer,
                id: answerId,
                done: false,
              };
            }

            return newHistory;
          });
        }
      },
      onclose() {
        let id = currentSession;
        if (currentSession !== _id && isNew) {
          updateSessionId(_id);
          id = _id;
        }
        if (addToHistory) {
          let answer = '';
          updateHistory(id, (history: ChatHistory) => {
            const newHistory = [...history];
            const index = newHistory.findIndex((chat) => chat.id === answerId);
            answer = history[index].text;

            newHistory[index] = {
              origin: history[index].origin,
              text: answer,
              id: answerId,
              done: true,
              references: references.slice(0, MAX_REFERENCE_COUNT),
            };
            return newHistory;
          });
        }
        setDone(currentSession, true);
      },
      onerror(err: unknown) {
        console.error('There was an error from server', err);
        addHistoryEntry('system', 'Ett fel inträffade, kunde inte kommunicera med assistent.', '0', true);
        setDone(currentSession, true);
        throw err;
      },
    }).catch(() => setDone(currentSession, true));
  };

  const sendQuery = (
    query: string,
    files?: ModelId[],
    addToHistory?: { question: boolean; answer: boolean } | boolean
  ) => {
    const addQuestionToHistory = typeof addToHistory === 'boolean' ? addToHistory : (addToHistory?.question ?? true);
    const addAnswerToHistory = typeof addToHistory === 'boolean' ? addToHistory : (addToHistory?.answer ?? true);

    if (!assistantId || (!apikey && !hash && !app) || (app && !hash) || (hash && !app)) {
      addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', '0', true);
      setDone(currentSession, true);
      return;
    }
    const questionId = crypto.randomUUID();
    if (addQuestionToHistory) {
      addHistoryEntry('user', query, questionId, true);
    }

    if (stream) {
      streamQuery(query, assistantId, isNew ? '' : currentSession, user, hash ?? '', files, addAnswerToHistory);
    } else {
      setDone(currentSession, false);
      const answerId = crypto.randomUUID();
      if (!session.name) {
        setSessionName(query);
      }
      if (addAnswerToHistory) {
        addHistoryEntry('assistant', '', answerId, false);
      }
      return batchQuery(query, isNew ? '' : currentSession, settings, files)
        .then((res: ResponseData) => {
          if (addAnswerToHistory) {
            updateHistory(currentSession, (history) => {
              const newHistory = [...history];
              const index = history.findIndex((entry) => entry.id === answerId);
              newHistory[index].text = res.answer;
              newHistory[index].done = true;

              const refenrences =
                res.references?.slice(0, MAX_REFERENCE_COUNT).map((reference) => ({
                  title: reference.metadata.title || '',
                  url: reference.metadata.url || '',
                })) || [];
              newHistory[index].references = refenrences;

              return newHistory;
            });
          }
          setDone(currentSession, true);
          if (session.id !== res.session_id && isNew) {
            updateSessionId(res.session_id);
          }
          return res;
        })
        .catch((e) => {
          console.error('Error occured:', e);
          if (addAnswerToHistory) {
            updateHistory(currentSession, (history) => {
              const newHistory = [...history];
              const index = history.findIndex((entry) => entry.id === answerId);
              newHistory[index].origin = 'system';
              newHistory[index].text = 'Ett fel inträffade, assistenten gav inget svar';
              newHistory[index].done = true;
              return newHistory;
            });
          }
          setDone(currentSession, true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    newSession: createNewSession,
    done,
    session,
    sendQuery,
  };
};
