import React from 'react';
import { AssistantInfo, ChatHistory, SessionHistory } from '../../types';
import { AIFeed } from '../ai-feed';
import { AssistantPresentation } from '../assistant-presentation';
import { Bubble } from '../bubble';
import { InputSection } from '../input-section';
import { AIModuleHeader } from './ai-module-header';
import { AIModuleWrapper } from './ai-module-wrapper';
import { addDays, format } from 'date-fns';
import { AIModuleSessionHistory } from './ai-module-session-history';
import { Avatar } from '@sk-web-gui/avatar';

export interface AIModuleDefaultProps {
  history?: ChatHistory;
  docked?: boolean;
  color?: string;
  fullscreen?: boolean;
  sessionTitle?: string;
  assistant: AssistantInfo;
  onOpen?: () => void;
  onClose?: () => void;
  onFullScreen?: () => void;
  onCloseFullScreen?: () => void;
  onNewSession?: () => void;
}

export interface AIModuleProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  questions?: string[];
  questionsTitle?: string;
  sessionHistory?: SessionHistory;
  onChangeSession?: (sessionId: string) => void;
}

export const AIModule = React.forwardRef<HTMLDivElement, AIModuleProps>((props, ref) => {
  const {
    history,
    docked: _docked,
    fullscreen: _fullscreen,
    color,
    sessionTitle,
    assistant,
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    onChangeSession,
    className,
    children,
    questions,
    questionsTitle,
    sessionHistory,
    ...rest
  } = props;

  const [docked, setDocked] = React.useState<boolean>(true);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  const assistantAvatar = (
    <Avatar
      imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
      imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
      initials={assistant.shortName}
    />
  );
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

  const today = format(new Date(), 'yyyyMMdd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyyMMdd');

  const todaysSessions = sessionHistory?.filter((session) => format(new Date(session.updatedAt), 'yyyyMMdd') === today);
  const tomorrowsSessions = sessionHistory?.filter(
    (session) => format(new Date(session.updatedAt), 'yyyyMMdd') === tomorrow
  );
  const otherSessions = sessionHistory?.filter((session) => {
    const date = format(new Date(session.updatedAt), 'yyyyMMdd');
    return date !== tomorrow && date !== today;
  });

  return (
    <AIModuleWrapper ref={ref} className={className} {...rest} fullscreen={fullscreen}>
      <div className="sk-ai-module-content">
        {fullscreen && (
          <div className="sk-ai-module-content-row">
            <div className="sk-ai-module-sidebar">
              <AIModuleHeader variant="alt" assistant={assistant} />
              {todaysSessions && (
                <AIModuleSessionHistory sessions={todaysSessions} title="Idag" onSelectSession={onChangeSession} />
              )}
              {tomorrowsSessions && (
                <AIModuleSessionHistory sessions={tomorrowsSessions} title="Igår" onSelectSession={onChangeSession} />
              )}
              {otherSessions && (
                <AIModuleSessionHistory sessions={otherSessions} title="Tidigare" onSelectSession={onChangeSession} />
              )}
            </div>
          </div>
        )}
        <div className="sk-ai-module-content-row sk-ai-module-content-main">
          <AIModuleHeader
            docked={docked}
            fullscreen={fullscreen}
            assistant={assistant}
            color={color}
            sessionTitle={sessionTitle}
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            onFullScreen={handleOnFullscreen}
            onCloseFullScreen={handleOnCloseFullscreen}
            onNewSession={onNewSession}
          />
          {!docked && (
            <>
              <div className="sk-ai-module-feed">
                {!history || history.length < 1 ? (
                  <>
                    <AssistantPresentation size={fullscreen ? 'lg' : 'sm'} assistant={assistant} />
                    {questions && questions?.length > 0 && (
                      <div className="sk-ai-module-feed-questions-wrapper">
                        {questionsTitle && <div className="sk-ai-module-feed-questions-title">{questionsTitle}</div>}
                        <div className="sk-ai-module-feed-questions">
                          {questions?.map((question, index) => <Bubble key={`q-bubble-${index}`}>{question}</Bubble>)}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <AIFeed
                    history={history}
                    avatars={{
                      user: <Avatar initials="DU" color="bjornstigen" />,
                      assistant: assistantAvatar,
                      system: assistantAvatar,
                    }}
                  />
                )}
              </div>
              <InputSection shadow={!fullscreen} />
            </>
          )}
        </div>
      </div>
    </AIModuleWrapper>
  );
});
