import React from 'react';
import { AICornerModuleDefaultProps } from './ai-corner-module';
import { cx } from '@sk-web-gui/utils';

interface AICornerModuleWrapperProps
  extends Pick<AICornerModuleDefaultProps, 'fullscreen' | 'docked' | 'isMobile'>,
    React.ComponentPropsWithoutRef<'div'> {}

export const AICornerModuleWrapper = React.forwardRef<HTMLDivElement, AICornerModuleWrapperProps>((props, ref) => {
  const { className, fullscreen, docked, isMobile, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-ai-module', className)}
      data-fullscreen={fullscreen}
      data-docked={docked}
      data-mobile={isMobile}
      {...rest}
    />
  );
});
