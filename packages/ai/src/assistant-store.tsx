import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { AssistantInfo, AssistantPublic, AssistantSettings } from './types/assistant';
import { ChatHistory } from './types/history';

export interface AssistantStoreInterface {
  settings: AssistantSettings;
  setSettings: (settings: AssistantSettings) => void;
  info?: AssistantInfo;
  setInfo: (settings: AssistantInfo) => void;
  assistant?: AssistantPublic;
  setAssistant: (assistant: AssistantPublic) => void;
  sessionId: string;
  setSessionId: (id: string) => void;
  history: ChatHistory;
  setHistory: (fn: (prevstate: ChatHistory) => ChatHistory) => void;
  clearHistory: () => void;
  done: boolean;
  setDone: (done: boolean) => void;
}

export const useAssistantStore = createWithEqualityFn(
  persist<AssistantStoreInterface>(
    (set) => {
      return {
        settings: { assistantId: '' },
        setSettings: (settings) =>
          set(() => ({
            settings: {
              ...settings,
              stream:
                typeof settings.stream === 'boolean' ? settings.stream : settings.stream === 'true' ? true : false,
            },
          })),
        info: undefined,
        setInfo: (info) => set(() => ({ info })),
        assistant: undefined,
        setAssistant: (assistant) => set(() => ({ assistant })),
        sessionId: '',
        setSessionId: (sessionId) => set(() => ({ sessionId })),
        history: [],
        setHistory: (fn: (prev: ChatHistory) => ChatHistory) =>
          set((state) => ({ history: fn(state.history || []) || [] })),
        clearHistory: () => set(() => ({ history: [] })),
        done: true,
        setDone: (done) => set(() => ({ done })),
      };
    },
    { name: `sk-ai-assistant`, storage: createJSONStorage(() => sessionStorage) }
  )
);

/**
 * Set the name of the assistant store.
 * This should be unique.
 * Leave name empty to create an auto id name.
 * @param name
 * @type string
 */
export const setAssistantStoreName = (name?: string) => {
  const autoId = crypto.randomUUID();
  const id = name || `sk-ai-assistant-${autoId}`;

  useAssistantStore.persist.setOptions({ name: id });
  useAssistantStore.persist.rehydrate();
};
