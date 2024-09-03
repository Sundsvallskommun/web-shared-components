import React, { useEffect } from 'react';
import { useChat } from '../../hooks';
import { AssistantInfo, AssistantSession, OriginTitleMap } from '../../types';
import { AIFeedProps } from '../ai-feed/ai-feed';
import { AIServiceModuleAssistant, AIServiceModuleAssistantEssentialProps } from './ai-service-module-assistant';
import { AIServiceModuleContent } from './ai-service-module-content';
import { AIServiceModuleHeader } from './ai-service-module-header';
import { AIServiceModuleQuestions, AIServiceModuleQuestionsEssentialProps } from './ai-service-module-questions';
import { AIServiceModuleRow } from './ai-service-module-row';
import { AIServiceModuleWrapper, AIServiceModuleWrapperProps } from './ai-service-module-wrapper';
import { Avatar } from '@sk-web-gui/avatar';
import { useAssistantStore } from '../../assistant-store';

export interface AIServiceModuleDefaultProps {
  /**
   * @default vattjom
   */
  color?: string;
  /**
   * @default false
   */
  inverted?: boolean;
}
export interface AIServiceModuleProps
  extends AIServiceModuleWrapperProps,
    AIServiceModuleQuestionsEssentialProps,
    AIServiceModuleDefaultProps,
    Pick<AIFeedProps, 'avatars' | 'onGiveFeedback' | 'showReferences' | 'showFeedback' | 'showTitles'>,
    AIServiceModuleAssistantEssentialProps {
  /**
   * Heading / Title.
   * Will be wrapped in `<h2>` if no element is provided.
   */
  header?: React.ReactNode;
  assistant?: AssistantInfo;
  session?: AssistantSession;
  /**
   * @default false
   */
  isMobile?: boolean;
  originTitles?: OriginTitleMap;
}

export const AIServiceModule = React.forwardRef<HTMLDivElement, AIServiceModuleProps>((props, ref) => {
  const {
    className,
    header,
    color = 'vattjom',
    inverted,
    label,
    helperText,
    readmore,
    formError,
    avatars,
    assistant: _propsAssistant,
    session: propsSession,
    isMobile,
    questionsTitle,
    questions,
    onSelectQuestion,
    onSendQuery,
    onNewSession,
    originTitles,
    onGiveFeedback,
    showReferences,
    showFeedback,
    showTitles,
    ...rest
  } = props;

  const [sessionId, setSessionId] = React.useState<string>('');
  const { session: _session, newSession, sendQuery } = useChat({ sessionId });
  const session = propsSession ?? _session;

  const history = session?.history;

  const _assistant = useAssistantStore((state) => state.info);
  const assistant = _propsAssistant || _assistant;

  if (!assistant) {
    throw new Error('No assistant found');
  }

  useEffect(() => {
    if (session?.id && session.id !== sessionId) {
      setSessionId(session.id);
    }
  }, [session]);

  const handleSelectQuestion = (question: string) => {
    onSelectQuestion && onSelectQuestion(question);
    sendQuery && sendQuery(question);
  };

  const handleSendQuery = (query: string) => {
    if (onSendQuery) {
      onSendQuery(query);
    } else {
      sendQuery(query);
    }
  };

  const handleNewSession = () => {
    if (onNewSession) {
      onNewSession();
    } else {
      newSession && newSession();
    }
  };

  return (
    <AIServiceModuleWrapper ref={ref} inverted={inverted} {...rest}>
      <AIServiceModuleRow color={color} inverted={inverted}>
        <AIServiceModuleContent>
          <AIServiceModuleHeader>
            {typeof header === 'string' ? <h2>{header}</h2> : header || <h2>Hej, vad vill du ha hjälp med?</h2>}
          </AIServiceModuleHeader>
          <AIServiceModuleAssistant
            assistant={assistant}
            avatars={avatars}
            label={label}
            helperText={helperText}
            readmore={readmore}
            formError={formError}
            history={history}
            sessionId={sessionId}
            inverted={inverted}
            onSendQuery={handleSendQuery}
            onNewSession={handleNewSession}
            onGiveFeedback={onGiveFeedback}
            showFeedback={showFeedback}
            showTitles={showTitles}
            titles={originTitles}
          />
        </AIServiceModuleContent>
      </AIServiceModuleRow>
      {!isMobile && questions && (
        <AIServiceModuleRow>
          <AIServiceModuleQuestions
            questionsTitle={questionsTitle}
            questions={questions}
            onSelectQuestion={handleSelectQuestion}
            inverted={inverted}
          />
        </AIServiceModuleRow>
      )}
    </AIServiceModuleWrapper>
  );
});
