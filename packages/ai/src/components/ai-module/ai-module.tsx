import { Avatar } from '@sk-web-gui/avatar';
import React from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { SessionStoreSession, useSessions } from '../../session-store';
import { AssistantInfo, AssistantSession, SessionHistory } from '../../types';
import { AIFeed } from '../ai-feed/ai-feed';
import { AssistantPresentation } from '../assistant-presentation';
import { Bubble } from '../bubble';
import { InputSection } from '../input-section';
import { AIModuleHeader } from './ai-module-header';
import { AIModuleSessions } from './ai-module-sessions';
import { AIModuleWrapper } from './ai-module-wrapper';

export interface AIModuleDefaultProps {
  docked?: boolean;
  color?: string;
  fullscreen?: boolean;
  session?: AssistantSession;
  onOpen?: () => void;
  onClose?: () => void;
  onFullScreen?: () => void;
  onCloseFullScreen?: () => void;
  onNewSession?: () => void;
}

export interface AIModuleProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  sessionId?: string;
  assistant?: AssistantInfo;
  questions?: string[];
  questionsTitle?: string;
  sessionHistory?: SessionHistory;
  onSendQuery?: (query: string) => void;
  onChangeSession?: (sessionId: string) => void;
  onSelectQuestion?: (question: string) => void;
  /**
   * @default true
   */
  showFeedback?: boolean;
}

export const AIModule = React.forwardRef<HTMLDivElement, AIModuleProps>((props, ref) => {
  const {
    docked: _docked,
    fullscreen: _fullscreen,
    session: _propsSession,
    color,
    sessionId: _sessionId,
    assistant: _propsAssistant,
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    onChangeSession,
    onSendQuery,
    className,
    children,
    questions,
    questionsTitle,
    sessionHistory,
    onSelectQuestion,
    showFeedback = true,
    ...rest
  } = props;

  const [sessionId, setSessionId] = React.useState<string>('');
  const [sessions, setSessions] = React.useState<Array<AssistantSession | SessionStoreSession>>([]);
  const { history: _history, session: _session, sendQuery } = useChat({ sessionId });
  const _assistant = useAssistantStore((state) => state.info);
  const assistant = _propsAssistant || _assistant;
  const [_sessions, refreshSessions] = useSessions((state) => [state.sessions, state.refreshSessions]);
  const session: SessionStoreSession | AssistantSession | undefined = _propsSession || _session;
  const history = _propsSession?.history || _history || [];
  const [docked, setDocked] = React.useState<boolean>(true);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (sessionHistory) {
      setSessions(sessionHistory);
    } else {
      setSessions(
        Object.values({ ..._sessions })
          .filter((session) => !session.isNew)
          .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
      );
    }
  }, [sessionHistory, _sessions]);

  if (!assistant) {
    throw new Error('No assistant found');
  }
  const assistantAvatar = (
    <Avatar
      imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
      imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
      initials={assistant.shortName}
      size={fullscreen ? 'md' : 'sm'}
    />
  );
  const userAvatar = <Avatar initials="DU" color="bjornstigen" size={fullscreen ? 'md' : 'sm'} />;

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleChangeSession = (id: string) => {
    if (onChangeSession) {
      onChangeSession(id);
    } else {
      setSessionId(id);
    }
  };

  const handleSelectQuestion = (question: string) => {
    if (onSelectQuestion) {
      onSelectQuestion(question);
    } else {
      sendQuery(question);
    }
  };

  const handleSendQuery = (query: string) => {
    if (onSendQuery) {
      onSendQuery(query);
    } else {
      sendQuery(query);
    }
  };

  React.useEffect(() => {
    if (typeof _sessionId === 'string') {
      setSessionId(_sessionId);
    }
  }, [_sessionId]);

  React.useEffect(() => {
    if (session?.id && session.id !== sessionId) {
      setSessionId(session.id);
      refreshSessions();
    }
  }, [session?.id]);

  React.useEffect(() => {
    handleAutoScroll();
  }, [history, docked, fullscreen]);

  React.useEffect(() => {
    if (typeof _docked === 'boolean') {
      setDocked(_docked);
    }
  }, [_docked]);

  React.useEffect(() => {
    if (typeof _fullscreen === 'boolean') {
      setFullscreen(_fullscreen);
    }
  }, [_fullscreen]);

  const handleOnOpen = () => {
    setDocked(false);
    onOpen && onOpen();
  };

  React.useEffect(() => {
    if (!sessions && !sessionHistory) {
      refreshSessions();
    }
  }, []);

  const handleNewSession = () => {
    if (onNewSession) {
      onNewSession;
    } else {
      setSessionId('');
    }
  };

  const handleOnClose = () => {
    setDocked(true);
    setFullscreen(false);
    onCloseFullScreen && onCloseFullScreen();
    onClose && onClose();
  };

  const handleOnFullscreen = () => {
    if (docked) {
      handleOnOpen();
    }
    setFullscreen(true);
    onFullScreen && onFullScreen();
  };

  const handleOnCloseFullscreen = () => {
    setFullscreen(false);
    onCloseFullScreen && onCloseFullScreen();
  };

  return (
    <AIModuleWrapper ref={ref} className={className} {...rest} docked={docked} fullscreen={fullscreen}>
      <div className="sk-ai-module-content">
        {fullscreen && (
          <div className="sk-ai-module-content-row">
            <div className="sk-ai-module-sidebar">
              <AIModuleHeader variant="alt" assistant={assistant} />
              <AIModuleSessions
                current={!_propsSession && _session?.isNew ? '' : sessionId}
                sessions={sessions}
                onSelectSession={handleChangeSession}
              />
            </div>
          </div>
        )}
        <div className="sk-ai-module-content-row sk-ai-module-content-main">
          <AIModuleHeader
            docked={docked}
            fullscreen={fullscreen}
            assistant={assistant}
            color={color}
            session={session}
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            onFullScreen={handleOnFullscreen}
            onCloseFullScreen={handleOnCloseFullscreen}
            onNewSession={handleNewSession}
            onClick={docked ? handleOnOpen : undefined}
          />
          {!docked && (
            <>
              <div className="sk-ai-module-feed" ref={scrollRef}>
                {!history || history.length < 1 ? (
                  <>
                    <AssistantPresentation size={fullscreen ? 'lg' : 'sm'} assistant={assistant} />
                    {questions && questions?.length > 0 && (
                      <div className="sk-ai-module-feed-questions-wrapper">
                        {questionsTitle && <div className="sk-ai-module-feed-questions-title">{questionsTitle}</div>}
                        <div className="sk-ai-module-feed-questions">
                          {questions?.map((question, index) => (
                            <Bubble key={`q-bubble-${index}`} onClick={() => handleSelectQuestion(question)}>
                              {question}
                            </Bubble>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <AIFeed
                    history={history}
                    showFeedback={showFeedback}
                    onGiveFeedback={handleAutoScroll}
                    size={fullscreen ? 'lg' : 'sm'}
                    avatars={{
                      user: userAvatar,
                      assistant: assistantAvatar,
                      system: assistantAvatar,
                    }}
                    sessionId={session.id}
                  />
                )}
              </div>
              <InputSection shadow={!fullscreen} sessionId={session?.id} onSendQuery={handleSendQuery} />
            </>
          )}
        </div>
      </div>
    </AIModuleWrapper>
  );
});
