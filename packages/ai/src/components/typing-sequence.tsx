import { cx } from '@sk-web-gui/utils';
import React from 'react';

export interface TypingSequenceProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  color?: string;
  inverted?: boolean;
}

export const TypingSequence = React.forwardRef<HTMLSpanElement, TypingSequenceProps>((props, ref) => {
  const { className, color, inverted, ...rest } = props;

  return (
    <span className={cx('sk-ai-typing-sequence', className)} ref={ref} {...rest}>
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-inverted={inverted} data-order="1" />
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-inverted={inverted} data-order="2" />
      <span className="sk-ai-typing-sequence-dot" data-color={color} data-inverted={inverted} data-order="3" />
    </span>
  );
});
