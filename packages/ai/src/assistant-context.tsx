import React from 'react';
import { AssistantPublic, AssistantSettings } from './types/assistant';
import { ChatHistory } from './types/history';

export interface AppContextInterface {
  settings: AssistantSettings;
  setSettings: (settings: AssistantSettings) => void;
  assistant?: AssistantPublic;
  setAssistant: (assistant: AssistantPublic) => void;
  sessionId: string;
  setSessionId: (id: string) => void;
  history?: ChatHistory;
  setHistory: React.Dispatch<React.SetStateAction<ChatHistory>>;
  clearHistory: () => void;
  done: boolean;
  setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AssistantContext = React.createContext<AppContextInterface>({
  settings: {},
  setSettings: () => {},
  setAssistant: () => {},
  sessionId: '',
  setSessionId: () => {},
  setHistory: () => {},
  clearHistory: () => {},
  done: false,
  setDone: () => {},
});

export const AssistantWrapper = ({ children }: { children?: React.ReactNode }) => {
  const [settings, setSettings] = React.useState<AssistantSettings>({ apiBaseUrl: '', hash: '' });
  const [assistant, setAssistant] = React.useState<AssistantPublic | undefined>(undefined);
  const [sessionId, setSessionId] = React.useState<string>('');
  const [history, setHistory] = React.useState<ChatHistory>([]);
  const [done, setDone] = React.useState<boolean>(true);

  const clearHistory = () => {
    setHistory([]);
  };

  const context = {
    settings,
    setSettings,
    assistant,
    setAssistant,
    sessionId,
    setSessionId,
    history,
    setHistory,
    done,
    setDone,
    clearHistory,
  };

  return <AssistantContext.Provider value={context}>{children}</AssistantContext.Provider>;
};

export const useAssistantContext = () => React.useContext(AssistantContext);
