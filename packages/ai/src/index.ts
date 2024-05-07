import type {
  AssistantPublic,
  AssistantSettings,
  ChatEntryReference,
  ChatHistory,
  ChatHistoryEntry,
  GroupPublic,
  PaginatedResponseAssistantPublic,
  Reference,
  ResponseData,
  SkHeaders,
} from './types';
import { AssistantWrapper, useAssistantContext } from './assistant-context';

export { useChat } from './hooks';
export * from './services';
export { AssistantWrapper, useAssistantContext };

export type AssistantType = {
  AssistantPublic: AssistantPublic;
  GroupPublic: GroupPublic;
  AssistantSettings: AssistantSettings;
  PaginatedResponseAssistantPublic: PaginatedResponseAssistantPublic;
  SkHeaders: SkHeaders;
  ChatEntryReference: ChatEntryReference;
  ChatHistoryEntry: ChatHistoryEntry;
  ChatHistory: ChatHistory;
  Reference: Reference;
  RespenseData: ResponseData;
};
