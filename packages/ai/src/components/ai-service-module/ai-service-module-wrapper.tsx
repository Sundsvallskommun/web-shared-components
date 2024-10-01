import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIServiceModuleDefaultProps } from './ai-service-module';

export interface AIServiceModuleWrapperProps
  extends React.ComponentPropsWithoutRef<'section'>,
    Pick<AIServiceModuleDefaultProps, 'inverted' | 'variant'> {}

export const AIServiceModuleWrapper = React.forwardRef<HTMLDivElement, AIServiceModuleWrapperProps>((props, ref) => {
  const { className, inverted, variant = 'primary', ...rest } = props;

  return (
    <section
      ref={ref}
      className={cx('sk-ai-service-module', className)}
      data-variant={variant}
      data-inverted={inverted}
      {...rest}
    />
  );
});
