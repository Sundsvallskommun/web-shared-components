export type Origin = 'user' | 'assistant' | 'system';

export interface ChatEntryReference {
  title: string;
  url: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  text: string;
  references?: ChatEntryReference[];
  id: string;
  done?: boolean;
}

export type ChatHistory = ChatHistoryEntry[];

export interface SessionHistoryEntry {
  id: string;
  title: string;
  updatedAt: Date;
}

export type SessionHistory = SessionHistoryEntry[];
