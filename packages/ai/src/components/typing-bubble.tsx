import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { TypingSequence } from './typing-sequence';

export interface TypingBubbleProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  /**
   * position of the bubble
   * @default right
   */
  position?: 'left' | 'right';
}

export const TypingBubble = React.forwardRef<HTMLSpanElement, TypingBubbleProps>((props, ref) => {
  const { position = 'right', className, ...rest } = props;

  return (
    <span className={cx('sk-ai-typing-bubble', className)} data-position={position} ref={ref} {...rest}>
      <TypingSequence />
    </span>
  );
});
