import {
    EventSourceMessage,
    fetchEventSource,
} from "@microsoft/fetch-event-source";
import { useCallback } from "react";
import { useAssistantContext } from "../assistant-context";
import { batchQuery } from "../services/assistant-service";
import { SkHeaders } from "../types/assistant";
import {
    ChatEntryReference,
    ChatHistory,
    ChatHistoryEntry,
    Origin,
} from "../types/history";
import { ResponseData } from "../types/response";
 
  
  const MAX_REFERENCE_COUNT = 3;
  
export const useChat = () => {
    const { history, setHistory, clearHistory, done, setDone,  sessionId, setSessionId, settings } = useAssistantContext();
  const { assistantId,  user = '', hash, apiBaseUrl, app, stream = true} = settings;

    const addHistoryEntry = (
      origin: Origin,
      text: string,
      id: string,
      references?: ChatEntryReference[]
    ) => {
      const historyEntry: ChatHistoryEntry = {
        origin: origin,
        text,
        id,
        ...(references && { references }),
      };
      setHistory((history: ChatHistory) => {
        return [...history, historyEntry];
      });
    };
  
    const streamQuery = useCallback(
      (query: string, assistantId: string, session_id: string, user: string, hash: string) => {
        const myController = new AbortController();
        const answerId = crypto.randomUUID();
        const questionId = crypto.randomUUID();
        addHistoryEntry("user", query, questionId);
        setDone(false);
        const url = `${
          apiBaseUrl
        }/assistants/${assistantId}/sessions/${session_id || ""}?stream=true`;
  
        let _id = '';
        let references: ChatEntryReference[];
  
        const skHeaders: SkHeaders = {
          _skuser: user,
          _skassistant: assistantId,
          _skhash: hash,
          _skapp: app || '',
        };
  
        fetchEventSource(url, {
          method: "POST",
          signal: myController.signal,
          body: JSON.stringify({ body: query }),
          headers: {
            Accept: "text/event-stream",
            ...skHeaders,
          },
          onopen(res: Response) {
            setDone(false);
            if (res.ok && res.status === 200) {
              setHistory((history: ChatHistory) => {
                return [
                  ...history,
                  {
                    origin: "assistant",
                    text: "",
                    id: answerId,
                  },
                ];
              });
            } else if (
              res.status >= 400 &&
              res.status < 500 &&
              res.status !== 429
            ) {
              addHistoryEntry(
                "system",
                "Ett fel inträffade, assistenten gav inget svar.",
                answerId,
                []
              );
              console.error("Client-side error ", res);
            }
            return Promise.resolve();
          },
          onmessage(event: EventSourceMessage) {
            let parsedData: ResponseData;
  
            try {
              parsedData = JSON.parse(event.data);
            } catch (error) {
              console.error("Error when parsing response as json. Returning.");
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
                    origin: "assistant",
                    text: parsedData.answer,
                    id: answerId,
                  });
                } else {
                  newHistory[index] = {
                    origin: "assistant",
                    text: history[index]?.text + parsedData.answer,
                    id: answerId,
                  };
                }
  
                return newHistory;
              });
          },
          onclose() {
            if (!sessionId) {
              setSessionId(_id);
            }
            let answer = "";
            setHistory((history: ChatHistory) => {
              const newHistory = [...history];
              const index = newHistory.findIndex((chat) => chat.id === answerId);
              answer = history[index].text;
  
              newHistory[index] = {
                origin: history[index].origin,
                text: answer,
                id: answerId,
                references: references.slice(0, MAX_REFERENCE_COUNT),
              };
              return newHistory;
            });
            setDone(true);
          },
          onerror(err: unknown) {
            console.error("There was an error from server", err);
            addHistoryEntry(
              "system",
              "Ett fel inträffade, kunde inte kommunicera med assistent.",
              "0",
              []
            );
            setDone(true);
          },
        });
      },
  
      []
    );
  
    const sendQuery = (query: string) => {
      if (!assistantId || !hash) {
        addHistoryEntry(
          "system",
          "Ett fel inträffade, assistenten gav inget svar.",
          "0",
          []
        );
        setDone(true);
        return;
      }
      if (stream) {
        streamQuery(query, assistantId, sessionId, user, hash);
      } else {
        setDone(false);
        const answerId = crypto.randomUUID();
        const questionId = crypto.randomUUID();
        addHistoryEntry("user", query, questionId);
        return batchQuery(query, sessionId)
          .then((res: ResponseData) => {
            if (!sessionId) {
              setSessionId(res.session_id);
            }
            addHistoryEntry(
              "assistant",
              res.answer,
              answerId,
              res.references?.slice(0, MAX_REFERENCE_COUNT).map((reference) => ({
                title: reference.metadata.title || '',
                url: reference.metadata.url || '',
              })) || []
            );
            setDone(true);
            return res;
          })
          .catch((e) => {
            console.error("Error occured:", e);
            addHistoryEntry(
              "system",
              "Ett fel inträffade, assistenten gav inget svar.",
              answerId,
              []
            );
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
  }
  

  