import { Input } from '@sk-web-gui/forms';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { InputSectionButton } from './input-section-button';
import { InputSectionInput, InputSectionInputProps } from './input-section-input';
import { InputSectionWrapper } from './input-section-wrapper';

export interface InputSectionDefaultProps {
  /**
   * @default true
   */
  shadow?: boolean;
  /**
   * @default default
   */
  variant?: 'default' | 'inset';
  /**
   * @default false
   */
  isMobile?: boolean;
}
export interface InputSectionProps extends React.ComponentPropsWithoutRef<'form'>, InputSectionDefaultProps {
  sessionId?: string;
  onSendQuery?: (query: string) => void;
  placeholder?: InputSectionInputProps['placeholder'];
  onChangeValue?: InputSectionInputProps['onChange'];
  value?: string;
  button?: React.JSX.Element;
  autoFocus?: boolean;
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
    ...rest
  } = props;
  const [query, setQuery] = React.useState<string>('');

  const { sendQuery } = useChat({ sessionId });
  const info = useAssistantStore((state) => state.info);

  const inputref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus && inputref.current) {
      inputref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus, inputref.current]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue?.(event);
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSendQuery) {
      onSendQuery(query);
    } else {
      if (query) {
        sendQuery(query);
      }
    }
    setQuery('');
  };

  return (
    <form ref={ref} className={cx('sk-ai-inputsection', className)} onSubmit={handleSubmit} {...rest}>
      <InputSectionWrapper shadow={shadow} variant={variant}>
        <InputSectionInput
          placeholder={placeholder ?? `Skriv till ${info ? info.name : 'assistanten'}`}
          onChange={handleOnChange}
          value={value ?? query}
          isMobile={isMobile}
          ref={inputref}
        />
        {variant === 'inset' ? <Input.RightAddin>{button}</Input.RightAddin> : button}
      </InputSectionWrapper>
    </form>
  );
});
