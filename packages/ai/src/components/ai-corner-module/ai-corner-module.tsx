import { Avatar } from '@sk-web-gui/avatar';
import React from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { SessionStoreSession, useSessions } from '../../session-store';
import {
  AIFeedAvatarMap,
  Assistant,
  AssistantInfo,
  AssistantSession,
  OriginTitleMap,
  SessionHistory,
} from '../../types';
import { AIFeed } from '../ai-feed/ai-feed';
import { AssistantPresentation } from '../assistant-presentation';
import { Bubble } from '../bubble';
import { InputSection } from '../input-section';
import { AICornerModuleHeader } from './ai-corner-module-header';
import { AICornerModuleMobileMenu } from './ai-corner-module-mobile-menu';
import { AICornerModuleSessions } from './ai-corner-module-sessions';
import { AICornerModuleWrapper } from './ai-corner-module-wrapper';
import { Link } from '@sk-web-gui/link';
import { AssistantAvatar } from '../assistant-avatar';
import { AICornerModuleAssistantLibrary } from './ai-corner-module-assistant-library';

export interface AICornerModuleDefaultProps {
  docked?: boolean;
  color?: string;
  fullscreen?: boolean;
  session?: AssistantSession;
  /**
   * @default false
   */
  disableFullscreen?: boolean;
  isMobile?: boolean;
  /**
   * @default true
   */
  showSessionHistory?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onFullScreen?: () => void;
  onCloseFullScreen?: () => void;
  onNewSession?: () => void;
  /**
   * Title shown in header
   * @default assistant.name
   */
  title?: string;
  /**
   * Subtitle shown in header when closed
   * @default assistant.title
   */
  subtitle?: string;
}

type InfoLink = { url: string; description: string };
export interface AICornerModuleProps
  extends AICornerModuleDefaultProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  sessionId?: string;
  /**
   * Current assistant
   */
  assistant?: AssistantInfo;
  /**
   * Avalable assistants
   */
  assistants?: Assistant[];
  questions?: string[];
  questionsTitle?: string;
  sessionHistory?: SessionHistory;
  readmore?: InfoLink;
  onSendQuery?: (query: string) => void;
  onChangeSession?: (sessionId: string) => void;
  onSelectQuestion?: (question: string) => void;
  /**
   * @default true
   */
  showFeedback?: boolean;
  avatars?: AIFeedAvatarMap;
  originTitles?: OriginTitleMap;
  onChangeAssistant?: (assistantId: string) => void;
}

export const AICornerModule = React.forwardRef<HTMLDivElement, AICornerModuleProps>((props, ref) => {
  const {
    docked: _docked,
    fullscreen: _fullscreen,
    disableFullscreen,
    session: _propsSession,
    color,
    sessionId: _sessionId,
    assistant: _propsAssistant,
    assistants,
    isMobile,
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    onChangeSession,
    onSendQuery,
    className,
    questions,
    questionsTitle,
    showSessionHistory = true,
    sessionHistory,
    onSelectQuestion,
    readmore,
    showFeedback = true,
    title,
    subtitle,
    avatars,
    originTitles,
    onChangeAssistant,
    ...rest
  } = props;

  const [sessionId, setSessionId] = React.useState<string>('');
  const { history: _history, session: _session, sendQuery } = useChat({ sessionId });
  const [_assistant, _setAssistant] = useAssistantStore((state) => [state.info, state.setInfo]);
  const [settings, setSettings] = useAssistantStore((state) => [state.settings, state.setSettings]);
  const resetSessions = useSessions((state) => state.resetSessions);
  const assistant = _propsAssistant || _assistant;
  const session: SessionStoreSession | AssistantSession | undefined = _propsSession || _session;
  const history = _propsSession?.history || _history || [];
  const [docked, setDocked] = React.useState<boolean>(true);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
  const [showMobileHistory, setShowMobileHistory] = React.useState<boolean>(false);
  const [showAssistantSelector, setShowAssistantSelector] = React.useState<boolean>(false);
  const isFullscreen = fullscreen && !isMobile;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (!assistant) {
    throw new Error('No assistant found');
  }

  const getUserAvatar = (): JSX.Element => {
    if (avatars?.user) {
      if (avatars.user.type === Avatar) {
        return React.cloneElement(avatars.user, {
          ...avatars.user.props,
          size: fullscreen ? 'md' : 'sm',
        });
      } else {
        return avatars.user;
      }
    } else {
      return <Avatar initials="DU" color="bjornstigen" size={fullscreen ? 'md' : 'sm'} />;
    }
  };

  const getSystemAvatar = (): JSX.Element => {
    if (avatars?.system) {
      if (avatars.system.type === Avatar) {
        return React.cloneElement(avatars.system, {
          ...avatars.system.props,
          size: fullscreen ? 'md' : 'sm',
        });
      } else {
        return avatars.system;
      }
    } else {
      return <AssistantAvatar assistant={assistant} avatar={avatars?.assistant} size={fullscreen ? 'md' : 'sm'} />;
    }
  };

  const handleAutoScroll = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 10);
  };

  const handleChangeAssistant = (assistantId: string) => {
    if (onChangeAssistant) {
      onChangeAssistant(assistantId);
    } else {
      const newAssistant = assistants?.find((ass) => ass.settings.assistantId === assistantId);
      if (newAssistant) {
        _setAssistant(newAssistant.info);
        setSettings(newAssistant.settings);
        resetSessions();
        handleNewSession();
      }
    }
    setShowAssistantSelector(false);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (disableFullscreen) {
      setFullscreen(false);
    } else {
      if (typeof _fullscreen === 'boolean') {
        setFullscreen(_fullscreen);
      }
    }
  }, [_fullscreen, disableFullscreen]);

  const handleOnOpen = () => {
    setDocked(false);
    onOpen?.();
  };

  const handleNewSession = () => {
    setShowAssistantSelector(false);
    if (onNewSession) {
      onNewSession();
    } else {
      setSessionId('');
    }
  };

  const handleOnClose = () => {
    setDocked(true);
    setFullscreen(false);
    onCloseFullScreen?.();
    setShowAssistantSelector(false);
    onClose?.();
  };

  const handleOnFullscreen = () => {
    if (docked) {
      handleOnOpen();
    }
    setFullscreen(true);
    setShowAssistantSelector(false);
    onFullScreen?.();
  };

  const handleOnCloseFullscreen = () => {
    setFullscreen(false);
    onCloseFullScreen?.();
  };

  return (
    <AICornerModuleWrapper
      ref={ref}
      className={className}
      {...rest}
      docked={docked}
      fullscreen={isFullscreen}
      isMobile={isMobile}
    >
      <div className="sk-ai-corner-module-content">
        {isFullscreen && (
          <div className="sk-ai-corner-module-content-row">
            <div className="sk-ai-corner-module-sidebar">
              <AICornerModuleHeader
                variant="alt"
                assistant={assistant}
                avatar={avatars?.assistant}
                title={title}
                subtitle={subtitle}
              />
              {showSessionHistory && (
                <AICornerModuleSessions
                  current={!_propsSession && _session?.isNew ? '' : sessionId}
                  sessions={sessionHistory}
                  onSelectSession={handleChangeSession}
                />
              )}
            </div>
          </div>
        )}
        <div className="sk-ai-corner-module-content-row sk-ai-corner-module-content-main">
          <AICornerModuleHeader
            docked={docked}
            fullscreen={isFullscreen}
            assistant={assistant}
            color={color}
            session={session}
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            onFullScreen={handleOnFullscreen}
            onCloseFullScreen={handleOnCloseFullscreen}
            onNewSession={handleNewSession}
            onClick={docked ? handleOnOpen : undefined}
            onOpenHistory={() => setShowMobileHistory(true)}
            onCloseHistory={() => setShowMobileHistory(false)}
            historyOpen={showMobileHistory}
            isMobile={isMobile}
            disableFullscreen={disableFullscreen}
            title={title}
            subtitle={subtitle}
            avatar={avatars?.assistant}
            assistants={assistants}
            assistantSwitchProps={{
              onClick: () => setShowAssistantSelector((prev) => !prev),
              pressed: showAssistantSelector,
              'aria-controls': 'sk-ai-corner-module-assistant-library',
              'aria-expanded': showAssistantSelector,
              'aria-pressed': undefined,
              'aria-haspopup': 'menu',
            }}
          />
          {!docked && (
            <>
              <div className="sk-ai-corner-module-feed" ref={scrollRef}>
                {showAssistantSelector && assistants && (
                  <AICornerModuleAssistantLibrary
                    current={settings.assistantId}
                    assistants={assistants}
                    onClose={() => setShowAssistantSelector(false)}
                    onSelectAssistant={handleChangeAssistant}
                    autofocus
                    id="sk-ai-corner-module-assistant-library"
                  />
                )}
                {!history || history.length < 1 ? (
                  <>
                    <AssistantPresentation
                      size={isFullscreen ? 'lg' : 'sm'}
                      assistant={assistant}
                      avatar={avatars?.assistant}
                    />
                    {readmore && (
                      <div className="sk-ai-corner-module-feed-readmore">
                        <Link external href={readmore.url}>
                          {readmore.description}
                        </Link>
                      </div>
                    )}
                    {questions && questions?.length > 0 && (
                      <div className="sk-ai-corner-module-feed-questions-wrapper">
                        {questionsTitle && (
                          <div className="sk-ai-corner-module-feed-questions-title">{questionsTitle}</div>
                        )}
                        <div className="sk-ai-corner-module-feed-questions">
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
                    size={isFullscreen ? 'lg' : 'sm'}
                    avatars={{
                      user: getUserAvatar(),
                      assistant: (
                        <AssistantAvatar
                          assistant={assistant}
                          avatar={avatars?.assistant}
                          size={fullscreen ? 'md' : 'sm'}
                        />
                      ),
                      system: getSystemAvatar(),
                    }}
                    titles={originTitles}
                    sessionId={session.id}
                  />
                )}
              </div>
              {!showAssistantSelector && (
                <InputSection
                  isMobile={isMobile}
                  shadow={!isFullscreen}
                  sessionId={session?.id}
                  onSendQuery={handleSendQuery}
                />
              )}
            </>
          )}
        </div>
      </div>
      {showSessionHistory && isMobile && (
        <AICornerModuleMobileMenu
          show={showMobileHistory && !!isMobile}
          onClose={() => setShowMobileHistory(false)}
          assistant={assistant}
          sessions={sessionHistory}
        />
      )}
    </AICornerModuleWrapper>
  );
});
