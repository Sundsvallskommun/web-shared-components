import { ChatHistory } from './history';
import { SessionFeedback } from './intric-backend';

export type AdditionalAssistantOptions = Record<string, unknown>;

export interface AssistantSettings {
  user?: string;
  assistantId: string;
  hash?: string;
  app?: string;
  is_group_chat?: boolean;
}

type LanguageCode = string | 'default';

export type AssistantDescriptionWithLanguage = Record<LanguageCode, string>;

export type AssistantDescription = string | AssistantDescriptionWithLanguage;
export interface AssistantInfo {
  /**
   * Image element, or url to image
   */
  avatar?: React.JSX.Element | string;
  name: string;
  shortName?: string;
  title?: string;
  description?: AssistantDescription;
  id?: string;
}

export interface AssistantSession {
  name?: string;
  id: string;
  history: ChatHistory;
  feedback?: SessionFeedback;
  updated_at: Date;
  created_at: Date;
}

export interface SkHeaders {
  _apikey?: string;
  _skuser?: string;
  _skassistant?: string;
  _skhash?: string;
  _skapp?: string;
}

export interface Assistant {
  info: AssistantInfo;
  settings: AssistantSettings;
}

/** ModelId */
