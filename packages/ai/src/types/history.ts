import { AssistantInfo, AssistantSession } from './assistant';

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
  /**
   * Optional assistant information.
   * For group chat assistants.
   */
  assistantInfo?: Pick<AssistantInfo, 'id' | 'name' | 'avatar'>;
}

export type ChatHistory = ChatHistoryEntry[];

export type SessionHistory = AssistantSession[];
