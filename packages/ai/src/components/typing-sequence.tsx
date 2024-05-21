import { cx } from '@sk-web-gui/utils';
import React from 'react';

export interface TypingSequenceProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  color?: string;
}

export const TypingSequence = React.forwardRef<HTMLSpanElement, TypingSequenceProps>((props, ref) => {
  const { className, color, ...rest } = props;

  return (
    <span className={cx('sk-ai-typing-sequence', className)} ref={ref} {...rest}>
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-order="1" />
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-order="2" />
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-order="3" />
    </span>
  );
});
