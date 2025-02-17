import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIServiceModuleDefaultProps } from './ai-service-module';

interface AIServiceModuleHeaderProps
  extends React.ComponentPropsWithoutRef<'header'>,
    Pick<AIServiceModuleDefaultProps, 'variant' | 'color' | 'inverted'> {
  /**
   * Icon before title
   * Only used in secondary variant
   */
  icon?: React.JSX.Element;
}

export const AIServiceModuleHeader = React.forwardRef<HTMLDivElement, AIServiceModuleHeaderProps>((props, ref) => {
  const { className, variant = 'primary', icon, children, color, inverted, ...rest } = props;
  return (
    <header ref={ref} data-variant={variant} className={cx('sk-ai-service-module-header', className)} {...rest}>
      {variant === 'secondary' && icon && (
        <span className="sk-ai-service-module-header-icon" data-color={color} data-inverted={inverted}>
          {icon}
        </span>
      )}
      {children}
    </header>
  );
});
