import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface AIServiceModuleContentProps extends React.ComponentPropsWithoutRef<'div'> {}

export const AIServiceModuleContent = React.forwardRef<HTMLDivElement, AIServiceModuleContentProps>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} className={cx('sk-ai-service-module-content', className)} {...rest} />;
});
