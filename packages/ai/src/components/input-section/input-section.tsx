import { cx } from '@sk-web-gui/utils';
import React, { FormEvent } from 'react';
import { useAssistantStore } from '../../assistant-store';
import { useChat } from '../../hooks';
import { InputSectionButton } from './input-section-button';
import { InputSectionInput } from './input-section-input';
import { InputSectionWrapper } from './input-section-wrapper';

export interface InputSectionProps extends React.ComponentPropsWithoutRef<'form'> {}

export const InputSection = React.forwardRef<HTMLFormElement, InputSectionProps>((props, ref) => {
  const { className, ...rest } = props;
  const [query, setQuery] = React.useState<string>('');

  const { sendQuery } = useChat();
  const info = useAssistantStore((state) => state.info);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query) {
      sendQuery(query);
      setQuery('');
    }
  };

  return (
    <form ref={ref} className={cx('sk-ai-inputsection', className)} onSubmit={handleSubmit} {...rest}>
      <InputSectionWrapper>
        <InputSectionInput
          placeholder={`Skriv till ${info ? info.name : 'assistanten'}`}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <InputSectionButton />
      </InputSectionWrapper>
    </form>
  );
});
