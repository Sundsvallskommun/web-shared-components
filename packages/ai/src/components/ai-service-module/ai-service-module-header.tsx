import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface AIServiceModuleHeaderProps extends React.ComponentPropsWithoutRef<'header'> {}

export const AIServiceModuleHeader = React.forwardRef<HTMLDivElement, AIServiceModuleHeaderProps>((props, ref) => {
  const { className, ...rest } = props;
  return <header ref={ref} className={cx('sk-ai-service-module-header', className)} {...rest} />;
});
