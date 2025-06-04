import { ChatHistory } from './history';

export interface AssistantPublic {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Prompt */
  prompt: string;
  /** Completion Model */
  completion_model: string;
  /**
   * Completion Model Kwargs
   * @default {}
   */
  completion_model_kwargs?: object | null;
  /** Groups */
  groups: GroupPublic[];
  /** Logging Enabled */
  logging_enabled: boolean;
}

export interface GroupPublic {
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Name */
  name: string;
  /** Is Public */
  is_public: boolean;
  /** Embedding Model */
  embedding_model: string;
}

export type AdditionalAssistantOptions = Record<string, unknown>;

export interface AssistantSettings {
  user?: string;
  assistantId: string;
  hash?: string;
  app?: string;
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
  feedback?: AssistantFeedback;
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

export interface AssistantFeedback {
  value: -1 | 1;
  text: string | null;
}

export interface Assistant {
  info: AssistantInfo;
  settings: AssistantSettings;
}

/** ModelId */
export interface ModelId {
  /**
   * Id
   * @format uuid
   */
  id: string;
}
