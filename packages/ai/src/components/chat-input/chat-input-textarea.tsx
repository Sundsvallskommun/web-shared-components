import { Textarea } from '@sk-web-gui/forms';
import { cx, useForkRef } from '@sk-web-gui/utils';
import React, { useEffect } from 'react';
import { useChatInputTextareaClasses } from './styles';

export interface ChatInputTextareaProps
  extends Omit<React.ComponentPropsWithRef<(typeof Textarea)['Component']>, 'wrap' | 'readOnly'> {
  /**
   * If the textarea should take the full width, making other content wrap
   * @default auto
   */
  wrap?: boolean | 'auto';
}

const TextareaSize: Record<string, number> = {
  sm: 35,
  md: 42,
  lg: 56,
};

export const ChatInputTextarea = React.forwardRef<HTMLTextAreaElement, ChatInputTextareaProps>((props, ref) => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(TextareaSize[props.size ?? 'md']);

  const { className, onInput, wrap = 'auto', ...rest } = props;
  const internalRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setHeight(internalRef?.current?.scrollHeight ?? TextareaSize[props.size ?? 'md']);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    if (props?.value === undefined) {
      onInput?.(event);
      if (event.currentTarget.scrollHeight > height && !scrolled) {
        setScrolled(true);
      }
      if (internalRef.current) {
        internalRef.current.style.height = '';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }
  };

  useEffect(() => {
    if (props?.value !== undefined) {
      if (internalRef.current) {
        if (internalRef.current.scrollHeight > height && !scrolled) {
          setScrolled(true);
        }
        internalRef.current.style.height = '';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.value]);

  const classes = useChatInputTextareaClasses({ size: props?.size });
  return (
    <Textarea
      ref={useForkRef(ref, internalRef)}
      data-wrap={wrap === 'auto' ? scrolled : wrap}
      className={cx(classes, className)}
      onInput={handleInput}
      rows={1}
      {...rest}
    />
  );
});
