import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@sk-web-gui/forms';
import { Link } from '@sk-web-gui/link';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AssistantInfo, ChatHistory } from '../../types';
import { AIFeedProps } from '../ai-feed/ai-feed';
import { InputSectionButton } from '../input-section/input-section-button';
import { InputSectionInput } from '../input-section/input-section-input';
import { AIServiceModuleDefaultProps } from './ai-service-module';
import { AIServiceModuleAssistantExpanded } from './ai-service-module-assistant-expanded';

interface ReadMore {
  text?: string;
  link?: {
    text: string;
    url: string;
  };
}

interface HelperTextWithLanguage {
  lang: string;
  text: string;
}

type HelperText = string | HelperTextWithLanguage;

export interface AIServiceModuleAssistantEssentialProps {
  /**
   * Form label
   * @default "Ställ en fråga till vår AI-assistent"
   */
  label?: string;

  /**
   * Form error
   */
  formError?: string;
  readmore?: ReadMore;
  helperText?: HelperText;
  onSendQuery?: (query: string) => void;
  onNewSession?: () => void;
}

export interface AIServiceModuleAssistantProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'>,
    Pick<AIServiceModuleDefaultProps, 'inverted'>,
    Pick<
      AIFeedProps,
      | 'getAssistantInfoFromHistory'
      | 'avatars'
      | 'titles'
      | 'onGiveFeedback'
      | 'showReferences'
      | 'showFeedback'
      | 'showTitles'
    >,
    AIServiceModuleAssistantEssentialProps {
  history?: ChatHistory;
  value?: string;
  onValueChange?: React.ComponentPropsWithoutRef<'input'>['onChange'];
  sessionId?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  assistant: AssistantInfo;
}

export const AIServiceModuleAssistant = React.forwardRef<HTMLDivElement, AIServiceModuleAssistantProps>(
  (props, ref) => {
    const {
      history,
      className,
      label = 'Ställ en fråga till vår AI-assistent',
      readmore,
      helperText,
      value,
      onSubmit,
      onValueChange,
      onSendQuery,
      onGiveFeedback,
      showReferences,
      showFeedback,
      showTitles,
      inverted,
      formError,
      avatars,
      sessionId,
      onNewSession,
      titles,
      assistant,
      getAssistantInfoFromHistory,
      ...rest
    } = props;

    const [query, setQuery] = React.useState<string>(value || '');
    const [_error, setError] = React.useState<string>('');
    const error = formError ?? _error;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (onSubmit) {
        onSubmit(event);
      } else {
        event.preventDefault();
        if (!query) {
          setError('Du har inte skrivit någon fråga.');
        } else {
          onSendQuery?.(query);
          setQuery('');
          setError('');
        }
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event);
      setQuery(event.target.value);
    };

    return (
      <div ref={ref} className={cx('sk-ai-service-module-form', className)} {...rest}>
        <FormControl className="sk-ai-service-module-form-control" invalid={!!error}>
          {helperText && (
            <FormHelperText lang={typeof helperText === 'object' ? helperText?.lang : undefined}>
              {typeof helperText === 'string' ? helperText : helperText.text}
            </FormHelperText>
          )}
          <FormLabel className="sk-ai-service-module-form-label">{label}</FormLabel>
          {history && history.length > 0 ? (
            <div className="sk-ai-service-module-form-input-wrapper">
              <AIServiceModuleAssistantExpanded
                history={history}
                sessionId={sessionId}
                onClose={onNewSession}
                onGiveFeedback={onGiveFeedback}
                avatars={avatars}
                titles={titles}
                showReferences={showReferences}
                showFeedback={showFeedback}
                showTitles={showTitles}
                assistant={assistant}
                getAssistantInfoFromHistory={getAssistantInfoFromHistory}
              />
            </div>
          ) : (
            <form className="sk-ai-service-module-form-input-wrapper" onSubmit={handleSubmit}>
              <Input.InnerGroup
                className="sk-ai-service-module-form-input-group sk-ai-inputsection-group"
                size="lg"
                invalid={!!error}
              >
                <InputSectionInput
                  value={value ?? query}
                  onChange={handleChange}
                  className="sk-ai-service-module-form-input"
                  size="lg"
                ></InputSectionInput>
                <Input.RightAddin>
                  <InputSectionButton size="sm"></InputSectionButton>
                </Input.RightAddin>
              </Input.InnerGroup>
            </form>
          )}
          {error && <FormErrorMessage className="sk-ai-service-module-form-error">{error}</FormErrorMessage>}
        </FormControl>
        {readmore && (
          <div className="sk-ai-service-module-form-readmore" data-inverted={inverted}>
            {readmore.text}{' '}
            {readmore.link && (
              <Link external href={readmore.link.url} variant="tertiary" inverted={!inverted}>
                {readmore.link.text}
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }
);
