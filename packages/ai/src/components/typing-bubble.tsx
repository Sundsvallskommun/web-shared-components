import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { TypingSequence } from './typing-sequence';

export interface TypingBubbleProps extends React.ComponentPropsWithoutRef<'span'> {
  /**
   * position of the bubble
   * @default right
   */
  position?: 'left' | 'right';
  /**
   * Inverts colors (light mode as dark mode colors and vice versa)
   */
  inverted?: boolean;
}

export const TypingBubble = React.forwardRef<HTMLSpanElement, TypingBubbleProps>((props, ref) => {
  const { position = 'right', className, inverted, children, ...rest } = props;

  return (
    <span
      className={cx('sk-ai-typing-bubble', className)}
      data-inverted={inverted}
      data-position={position}
      ref={ref}
      {...rest}
    >
      {children ?? <TypingSequence inverted={inverted} />}
    </span>
  );
});
