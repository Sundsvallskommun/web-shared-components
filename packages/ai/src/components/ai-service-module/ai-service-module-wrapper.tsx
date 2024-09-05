import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIServiceModuleDefaultProps } from './ai-service-module';

export interface AIServiceModuleWrapperProps
  extends React.ComponentPropsWithoutRef<'section'>,
    Pick<AIServiceModuleDefaultProps, 'inverted'> {}

export const AIServiceModuleWrapper = React.forwardRef<HTMLDivElement, AIServiceModuleWrapperProps>((props, ref) => {
  const { className, inverted, ...rest } = props;

  return <section ref={ref} className={cx('sk-ai-service-module', className)} data-inverted={inverted} {...rest} />;
});
