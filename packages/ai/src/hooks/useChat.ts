import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import React from 'react';
import { useAssistantStore } from '../assistant-store';
import { batchQuery } from '../services/assistant-service';
import { SkHeaders } from '../types/assistant';
import { ChatEntryReference, ChatHistory, ChatHistoryEntry, Origin } from '../types/history';
import { ResponseData } from '../types/response';

const MAX_REFERENCE_COUNT = 3;

export const useChat = () => {
  const [history, setHistory, clearHistory, done, setDone, sessionId, setSessionId, settings] = useAssistantStore(
    (state) => [
      state.history,
      state.setHistory,
      state.clearHistory,
      state.done,
      state.setDone,
      state.sessionId,
      state.setSessionId,
      state.settings,
    ]
  );
  const { assistantId, user: _user, hash, apiBaseUrl, app, stream: _stream } = settings;
  const user = _user || '';
  const stream = _stream === undefined ? true : _stream;

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
    setHistory((history) => [...(history || []), historyEntry]);
  };

  const streamQuery = React.useCallback(
    (query: string, assistantId: string, session_id: string, user: string, hash: string) => {
      const myController = new AbortController();
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry('user', query, questionId, true);
      setDone(false);
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
          setDone(false);
          if (res.ok && res.status === 200) {
            setHistory((history: ChatHistory) => {
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
            addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', answerId, done);
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
          if (!sessionId) {
            _id = parsedData.session_id;
          }

          (references =
            parsedData.references
              ?.filter((reference) => !!reference.metadata.url)
              .map((reference) => ({
                title: reference.metadata.title || reference.metadata.url || '',
                url: reference.metadata.url || '',
              })) || []),
            setHistory((history: ChatHistory) => {
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
          if (!sessionId) {
            setSessionId(_id);
          }
          let answer = '';
          setHistory((history: ChatHistory) => {
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
          setDone(true);
        },
        onerror(err: unknown) {
          console.error('There was an error from server', err);
          addHistoryEntry('system', 'Ett fel inträffade, kunde inte kommunicera med assistent.', '0', true);
          setDone(true);
        },
      });
    },

    []
  );

  const sendQuery = (query: string) => {
    if (!assistantId || !hash) {
      addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', '0', true);
      setDone(true);
      return;
    }
    if (stream) {
      streamQuery(query, assistantId, sessionId, user, hash);
    } else {
      setDone(false);
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry('user', query, questionId, true);
      addHistoryEntry('assistant', '', answerId, false);
      return batchQuery(query, sessionId, settings)
        .then((res: ResponseData) => {
          if (!sessionId) {
            setSessionId(res.session_id);
          }
          setHistory((history) => {
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
          setDone(true);
          return res;
        })
        .catch((e) => {
          console.error('Error occured:', e);
          setHistory((history) => {
            const newHistory = [...history];
            const index = history.findIndex((entry) => entry.id === answerId);
            newHistory[index].origin = 'system';
            newHistory[index].text = 'Ett fel inträffade, assistenten gav inget svar';
            newHistory[index].done = true;
            return newHistory;
          });
          setDone(true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
    done,
    sendQuery,
    setSessionId,
  };
};
