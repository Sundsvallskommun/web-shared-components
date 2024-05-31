import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import React from 'react';
import { useAssistantStore } from '../assistant-store';
import { batchQuery } from '../services/assistant-service';
import { AssistantSettings, SkHeaders } from '../types/assistant';
import { ChatEntryReference, ChatHistory, ChatHistoryEntry, Origin } from '../types/history';
import { ResponseData } from '../types/response';
import { useSessions } from '../session-store';

const MAX_REFERENCE_COUNT = 3;

interface useChatOptions {
  settings?: AssistantSettings;
  sessionId?: string;
}

export const useChat = (options?: useChatOptions) => {
  const sessionId = React.useMemo(() => options?.sessionId || '', [options?.sessionId]);
  const _incomingSettings = React.useMemo(() => options?.settings, [options?.settings]);

  const [currentSession, setCurrentSession] = React.useState<string>(sessionId || '');
  const _settings = useAssistantStore((state) => state.settings);
  const settings = _incomingSettings || _settings;
  const { assistantId, user: _user, hash, apiBaseUrl, app, stream: _stream } = settings;
  const user = _user || '';
  const stream = _stream === undefined ? true : _stream;

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

  const setSessionName = () => {
    const name = history.at(0)?.text || '';
    updateSession(currentSession, (session) => ({ ...session, name }));
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

  const streamQuery = React.useCallback(
    (query: string, assistantId: string, session_id: string, user: string, hash: string) => {
      const myController = new AbortController();
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry('user', query, questionId, true);
      setDone(currentSession, false);
      const url = `${apiBaseUrl}/assistants/${assistantId}/sessions/${session_id || ''}?stream=true`;

      let _id = '';
      let references: ChatEntryReference[];

      const skHeaders: SkHeaders = {
        _skuser: user,
        _skassistant: assistantId,
        _skhash: hash,
        _skapp: app || '',
      };

      fetchEventSource(url, {
        method: 'POST',
        signal: myController.signal,
        body: JSON.stringify({ body: query }),
        headers: {
          Accept: 'text/event-stream',
          ...skHeaders,
        },
        onopen(res: Response) {
          setDone(currentSession, false);
          if (res.ok && res.status === 200) {
            updateHistory(currentSession, (history: ChatHistory) => {
              return [
                ...history,
                {
                  origin: 'assistant',
                  text: '',
                  id: answerId,
                  done: false,
                },
              ];
            });
          } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
            addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', answerId, done || false);
            console.error('Client-side error ', res);
          }
          return Promise.resolve();
        },
        onmessage(event: EventSourceMessage) {
          let parsedData: ResponseData;

          try {
            parsedData = JSON.parse(event.data);
          } catch (error) {
            console.error('Error when parsing response as json. Returning.');
            return;
          }
          if (currentSession !== parsedData.session_id && isNew) {
            _id = parsedData.session_id;
          }

          (references =
            parsedData.references
              ?.filter((reference) => !!reference.metadata.url)
              .map((reference) => ({
                title: reference.metadata.title || reference.metadata.url || '',
                url: reference.metadata.url || '',
              })) || []),
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
        },
        onclose() {
          if ((!session?.name || currentSession !== _id) && isNew) {
            setSessionName();
            updateSessionId(_id);
          }
          let answer = '';
          updateHistory(currentSession, (history: ChatHistory) => {
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
          setDone(currentSession, true);
        },
        onerror(err: unknown) {
          console.error('There was an error from server', err);
          addHistoryEntry('system', 'Ett fel inträffade, kunde inte kommunicera med assistent.', '0', true);
          setDone(currentSession, true);
        },
      });
    },

    []
  );

  const sendQuery = (query: string) => {
    if (!assistantId || !hash) {
      addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', '0', true);
      setDone(currentSession, true);
      return;
    }
    if (stream) {
      streamQuery(query, assistantId, isNew ? '' : currentSession, user, hash);
    } else {
      setDone(currentSession, false);
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry('user', query, questionId, true);
      addHistoryEntry('assistant', '', answerId, false);
      return batchQuery(query, isNew ? '' : currentSession, settings)
        .then((res: ResponseData) => {
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
          setDone(currentSession, true);
          if ((!session?.name || session.id !== res.session_id) && isNew) {
            setSessionName();
            updateSessionId(res.session_id);
          }
          return res;
        })
        .catch((e) => {
          console.error('Error occured:', e);
          updateHistory(currentSession, (history) => {
            const newHistory = [...history];
            const index = history.findIndex((entry) => entry.id === answerId);
            newHistory[index].origin = 'system';
            newHistory[index].text = 'Ett fel inträffade, assistenten gav inget svar';
            newHistory[index].done = true;
            return newHistory;
          });
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
