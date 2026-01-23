import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { InputSectionButton } from './input-section-button';
import { InputSectionInput, InputSectionInputProps } from './input-section-input';
import { InputSectionWrapper } from './input-section-wrapper';
import { ChatInput } from '../chat-input';
import type { ChatInputProps } from '../chat-input/chat-input';
import { handleMapToolbar } from '../chat-input/utils';

export interface InputSectionDefaultProps {
  /**
   * @default true
   */
  shadow?: boolean;
  /**
   * @default multiline
   */
  variant?: 'multiline' | 'singleline';
  /**
   * @default false
   */
  isMobile?: boolean;
}

export interface InputSectionProps extends React.ComponentPropsWithoutRef<'form'>, InputSectionDefaultProps {
  sessionId?: string;
  onSendQuery?: (query: string) => void;
  placeholder?: InputSectionInputProps['placeholder'];
  onChangeValue?: InputSectionInputProps['onChange'] | ChatInputProps['onChangeValue'];
  value?: string;
  button?: React.JSX.Element;
  autoFocus?: boolean;
  /**
   * Toolbar - only available with variant "multiline"
   */
  toolbar?: ChatInputProps['toolbar'];
}

export const InputSection = React.forwardRef<HTMLFormElement, InputSectionProps>((props, ref) => {
  const {
    className,
    shadow,
    sessionId,
    onSendQuery,
    isMobile,
    placeholder,
    value,
    onChangeValue,
    variant = 'default',
    button = <InputSectionButton isMobile={isMobile} variant={variant} />,
    autoFocus,
    toolbar,
    ...rest
  } = props;
  const [query, setQuery] = React.useState<string>('');

  const { sendQuery } = useChat({ sessionId });
  const info = useAssistantStore((state) => state.info);

  const inputref = React.useRef<HTMLInputElement>(null);
  const textarearef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      inputref?.current?.focus?.();
      textarearef?.current?.focus?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, inputref.current, textarearef.current]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue?.(event);

    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submit();
  };

  const submit = () => {
    if (onSendQuery) {
      onSendQuery(query);
    } else {
      if (query) {
        sendQuery(query);
      }
    }
    setQuery('');
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form ref={ref} className={cx('sk-ai-inputsection', className)} onSubmit={handleSubmit} {...rest}>
      <InputSectionWrapper shadow={shadow}>
        {variant === 'singleline' ? (
          <>
            <InputSectionInput
              placeholder={placeholder ?? `Skriv till ${info ? info.name : 'assistanten'}`}
              onChange={handleOnChange}
              value={value ?? query}
              isMobile={isMobile}
              ref={inputref}
            />
            {button}
          </>
        ) : (
          <ChatInput.Wrapper>
            <ChatInput.Textarea
              placeholder={placeholder ?? `Skriv till ${info ? info.name : 'assistanten'}`}
              onChange={handleOnChange}
              value={value ?? query}
              onKeyDown={handleEnter}
            ></ChatInput.Textarea>
            {toolbar ? (
              <ChatInput.Toolbar>
                {toolbar.map((group, index) => (
                  <React.Fragment key={`toolbar-group-${index}`}>
                    {handleMapToolbar(group, index, (toolbar?.length ?? 0) - 1)}
                  </React.Fragment>
                ))}
              </ChatInput.Toolbar>
            ) : (
              <></>
            )}
            <ChatInput.Submitbutton type="submit" />
          </ChatInput.Wrapper>
        )}
      </InputSectionWrapper>
    </form>
  );
});
