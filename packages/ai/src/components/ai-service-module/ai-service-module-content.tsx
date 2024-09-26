import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIServiceModuleDefaultProps } from './ai-service-module';

interface AIServiceModuleContentProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Pick<AIServiceModuleDefaultProps, 'variant'> {}

export const AIServiceModuleContent = React.forwardRef<HTMLDivElement, AIServiceModuleContentProps>((props, ref) => {
  const { className, variant = 'primary', ...rest } = props;

  return <div ref={ref} data-variant={variant} className={cx('sk-ai-service-module-content', className)} {...rest} />;
});
