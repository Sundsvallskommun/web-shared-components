import React, { useEffect } from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { AssistantInfo, AssistantSession, OriginTitleMap } from '../../types';
import { AIFeedProps } from '../ai-feed/ai-feed';
import { AIServiceModuleAssistant, AIServiceModuleAssistantEssentialProps } from './ai-service-module-assistant';
import { AIServiceModuleContent } from './ai-service-module-content';
import { AIServiceModuleHeader } from './ai-service-module-header';
import { AIServiceModuleQuestions, AIServiceModuleQuestionsEssentialProps } from './ai-service-module-questions';
import { AIServiceModuleRow } from './ai-service-module-row';
import { AIServiceModuleWrapper, AIServiceModuleWrapperProps } from './ai-service-module-wrapper';

export interface AIServiceModuleDefaultProps {
  /**
   * @default vattjom
   */
  color?: string;
  /**
   * @default false
   */
  inverted?: boolean;
  /**
   * @default primary
   */
  variant?: 'primary' | 'secondary';
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
  /**
   * Header-icon shown in secondary variant
   */
  headerIcon?: JSX.Element;
}

export const AIServiceModule = React.forwardRef<HTMLDivElement, AIServiceModuleProps>((props, ref) => {
  const {
    className,
    header,
    color = 'vattjom',
    inverted: _inverted,
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
    children,
    variant = 'primary',
    headerIcon,
    ...rest
  } = props;

  const [sessionId, setSessionId] = React.useState<string>('');
  const { session: _session, newSession, sendQuery } = useChat({ sessionId });
  const session = propsSession ?? _session;
  const inverted = _inverted ?? (variant === 'secondary' ? true : undefined);

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
    <AIServiceModuleWrapper ref={ref} inverted={inverted} variant={variant} {...rest}>
      <AIServiceModuleRow color={color} inverted={inverted} variant={variant}>
        <AIServiceModuleContent variant={variant}>
          <AIServiceModuleHeader icon={headerIcon} variant={variant} color={color}>
            {typeof header === 'string' ? <h2>{header}</h2> : header || <h2>Hej, vad vill du ha hjälp med?</h2>}
          </AIServiceModuleHeader>
          {children}
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
      {!isMobile && questions && questions.length > 0 && (
        <AIServiceModuleRow
          color={variant === 'secondary' ? color : undefined}
          inverted={variant === 'secondary' ? inverted : undefined}
          variant={variant}
        >
          <AIServiceModuleQuestions
            questionsTitle={questionsTitle}
            questions={questions}
            onSelectQuestion={handleSelectQuestion}
            inverted={variant === 'secondary' ? !inverted : inverted}
            variant={variant}
          />
        </AIServiceModuleRow>
      )}
    </AIServiceModuleWrapper>
  );
});
