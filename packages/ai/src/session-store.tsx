import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { getAssistantSessionById, getAssistantSessions, mapSessionMessagesToChatHistory } from './services';
import { AssistantSession, ChatHistory, CursorPaginatedResponseSessionMetadataPublic, SessionPublic } from './types';

export interface SessionStoreSession extends AssistantSession {
  /**
   * If the assistant is done or not.
   */
  done: boolean;
  /**
   * If the history has been loaded for the session.
   */
  loaded: boolean;
  /**
   * If the session is new and not saved yet
   */
  isNew?: boolean;
}

const newSession = (): SessionStoreSession => ({
  history: [],
  id: crypto.randomUUID(),
  name: '',
  updated_at: new Date(),
  created_at: new Date(),
  done: true,
  loaded: true,
  isNew: true,
});

export const mapSessionsResponseToStoreData = (
  sessions: CursorPaginatedResponseSessionMetadataPublic
): Record<string, SessionStoreSession> => {
  return sessions.items.reduce(
    (sessions, session) => ({
      ...sessions,
      [session.id]: {
        id: session.id,
        created_at: session.created_at ? new Date(session.created_at) : null,
        updated_at: session.updated_at ? new Date(session.updated_at) : null,
        history: [],
        name: session.name,
        done: true,
        loaded: false,
      },
    }),
    {}
  );
};

export const mapSessionResponseToStoreData = (session: SessionPublic): SessionStoreSession => {
  return {
    id: session.id,
    name: session.name,
    created_at: new Date(session.created_at || ''),
    updated_at: new Date(session.updated_at || ''),
    history: mapSessionMessagesToChatHistory(session.messages),
    feedback: session.feedback || undefined,
    done: true,
    loaded: true,
  };
};

export interface SessionStore {
  sessions: Record<string, SessionStoreSession>;
  /**
   * Get a single session from ID
   * If not loaded, it will be loaded from server.
   * @param {string} id - The session Id
   * @returns a single session
   */
  getSession: (id: string) => Promise<SessionStoreSession | undefined>;
  /**
   * Remove all sessions
   */
  resetSessions: () => void;
  /**
   * Load sessions from server.
   */
  refreshSessions: () => void;
  /**
   * Add a new empty session
   * @returns the new session Id
   */
  newSession: () => string;
  /**
   * Update a single session
   * @param {string} id - Id of the session
   * @param {object} session - The data to be updated
   */
  updateSession: (id: string, sessionHandler: (prev: SessionStoreSession) => SessionStoreSession) => void;
  /**
   * Update the Chat history of a session
   * @param {string} id - Id of the session
   * @param {object} history - The chat history
   */
  updateHistory: (id: string, historyHandler: (prev: ChatHistory) => ChatHistory) => void;
  /**
   * Changes the Id of a session
   * @param {string} oldId - The old (current) session Id
   * @param {string} newId - The new session Id
   * @returns
   */
  changeSessionId: (oldId: string, newId: string) => void;
  /**
   * Set if the session is done
   * @param {string} id - The session Id
   * @param {boolean} done
   */
  setDone: (id: string, done: boolean) => void;
  /**
   * Set if the session is new
   * @param {string} id - The session Id
   * @param {boolean} isNew
   */
  setIsNew: (id: string, isNew: boolean) => void;
  assistantId: string;
}

export const createSessionStore = (assistantId: string) => {
  return createWithEqualityFn(
    persist<SessionStore>(
      (set, get) => {
        return {
          sessions: {},

          getSession: async (id) => {
            const session = get().sessions[id];
            if (session) {
              if (session.loaded || session.isNew) {
                return session;
              } else {
                const fullSession = await getAssistantSessionById(session.id);
                if (fullSession) {
                  set((state) => {
                    return { sessions: { ...state.sessions, [id]: mapSessionResponseToStoreData(fullSession) } };
                  });
                  return fullSession;
                }
              }
            }
            return undefined;
          },
          resetSessions: () => set(() => ({ sessions: {} })),

          refreshSessions: async () => {
            try {
              const newSessions = await getAssistantSessions();
              if (newSessions) {
                return set((state) => ({
                  sessions: { ...mapSessionsResponseToStoreData(newSessions), ...state.sessions },
                }));
              }
            } catch {
              return;
            }
          },

          newSession: () => {
            const mySession = newSession();
            set((state) => ({
              sessions: {
                ...state.sessions,
                [mySession.id]: { ...mySession, created_at: new Date(), updated_at: new Date() },
              },
            }));
            return mySession.id;
          },

          updateSession: (id, fn) =>
            set((state) => {
              const session = fn(state.sessions[id]);
              return { sessions: { ...state.sessions, [id]: session } };
            }),

          updateHistory: (id, fn) =>
            set((state) => {
              const history = fn(state.sessions[id].history);
              return { sessions: { ...state.sessions, [id]: { ...state.sessions[id], history } } };
            }),

          changeSessionId: (oldId, newId) =>
            set((state) => {
              const newSession: SessionStoreSession = { ...state.sessions[oldId], id: newId, isNew: false };

              return { sessions: { ...state.sessions, [newId]: newSession } };
            }),

          setDone: (id, done) =>
            set((state) => {
              return { sessions: { ...state.sessions, [id]: { ...state.sessions[id], done } } };
            }),

          setIsNew: (id, isNew) =>
            set((state) => {
              return { sessions: { ...state.sessions, [id]: { ...state.sessions[id], isNew } } };
            }),

          assistantId: assistantId,
        };
      },
      { name: `${assistantId}-sessions`, storage: createJSONStorage(() => sessionStorage) }
    )
  );
};

export const useSessions = createSessionStore('sk-ai-assistant');
