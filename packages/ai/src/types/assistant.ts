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

export interface AssistantSettings {
  user?: string;
  assistantId?: string;
  hash?: string;
  app?: string;
  stream?: boolean;
  apiBaseUrl?: string;
}

export interface PaginatedResponseAssistantPublic {
  /**
   * Count
   * Number of items returned in the response
   */
  count: number;
  /**
   * Items
   * List of items returned in the response
   */
  items: AssistantPublic[];
}

export interface SkHeaders {
  _skuser: string;
  _skassistant: string;
  _skhash: string;
  _skapp: string;
}
