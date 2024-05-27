import React from 'react';
import { AIModuleDefaultProps } from './ai-module';
import { cx } from '@sk-web-gui/utils';

interface AIModuleWrapperProps
  extends Pick<AIModuleDefaultProps, 'fullscreen'>,
    React.ComponentPropsWithoutRef<'div'> {}

export const AIModuleWrapper = React.forwardRef<HTMLDivElement, AIModuleWrapperProps>((props, ref) => {
  const { className, fullscreen, ...rest } = props;

  return <div ref={ref} className={cx('sk-ai-module', className)} data-fullscreen={fullscreen} {...rest} />;
});
