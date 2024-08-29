import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface AIServiceModuleWrapperProps extends React.ComponentPropsWithoutRef<'div'> {}

export const AIServiceModuleWrapper = React.forwardRef<HTMLDivElement, AIServiceModuleWrapperProps>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} className={cx('sk-ai-service-module', className)} {...rest} />;
});
