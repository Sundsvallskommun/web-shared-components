import React from 'react';
import { AssistantInfo } from '../types';
import { cx } from '@sk-web-gui/utils';
import { Avatar } from '@sk-web-gui/avatar';

interface AssistantPresentationProps extends React.ComponentPropsWithoutRef<'div'> {
  assistant: AssistantInfo;
  size?: 'lg' | 'md';
}

export const AssistantPresentation = React.forwardRef<HTMLDivElement, AssistantPresentationProps>((props, ref) => {
  const { className, assistant, size = 'lg', ...rest } = props;

  return (
    <div ref={ref} className={cx('sk-ai-assistant-presentation', className)} data-size={size} {...rest}>
      <Avatar
        size="lg"
        aria-hidden
        imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
        imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
        imageAlt=""
      />
      <span></span>
    </div>
  );
});
