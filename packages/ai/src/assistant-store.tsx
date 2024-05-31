import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { AssistantInfo, AssistantPublic, AssistantSettings } from './types/assistant';

export interface AssistantStoreInterface {
  settings: AssistantSettings;
  setSettings: (settings: AssistantSettings) => void;
  info?: AssistantInfo;
  setInfo: (settings: AssistantInfo) => void;
  assistant?: AssistantPublic;
  setAssistant: (assistant: AssistantPublic) => void;
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
      };
    },
    { name: `sk-ai-assistant`, storage: createJSONStorage(() => sessionStorage) }
  )
);

/**
 * Set the name of the assistant store.
 * This should be unique.
 * Leave name empty to create an auto id name.
 * @param {string} name - Name of the assistant store
 */
export const setAssistantStoreName = (name?: string) => {
  const autoId = crypto.randomUUID();
  const id = name || `sk-ai-assistant-${autoId}`;

  useAssistantStore.persist.setOptions({ name: id });
  useAssistantStore.persist.rehydrate();
};
