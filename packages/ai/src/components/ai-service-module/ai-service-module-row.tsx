import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIServiceModuleDefaultProps } from './ai-service-module';
interface AIServiceModuleRowProps extends React.ComponentPropsWithoutRef<'div'>, AIServiceModuleDefaultProps {}

export const AIServiceModuleRow = React.forwardRef<HTMLDivElement, AIServiceModuleRowProps>((props, ref) => {
  const { className, color, inverted, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-ai-service-module-row', className)}
      {...rest}
      data-color={color}
      data-inverted={inverted}
    />
  );
});
