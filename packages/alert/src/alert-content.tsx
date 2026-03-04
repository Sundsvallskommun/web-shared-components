import React from 'react';
import { cx } from '@sk-web-gui/utils';
import { useAlert } from './context';
import { useAlertContentClass } from './styles';

export interface AlertContentComponentProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}

export const AlertContentComponent = React.forwardRef<HTMLDivElement, AlertContentComponentProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const { size } = useAlert();
  const contentClasses = useAlertContentClass({ size });

  return (
    <div ref={ref} className={cx(contentClasses, className)} {...rest}>
      {children}
    </div>
  );
});
