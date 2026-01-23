import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { InputSectionDefaultProps } from './input-section';

interface InputSectionWrapperProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Omit<InputSectionDefaultProps, 'isMobile' | 'variant'> {}

export const InputSectionWrapper = React.forwardRef<HTMLDivElement, InputSectionWrapperProps>((props, ref) => {
  const { className, shadow = true, children, ...rest } = props;

  return (
    <div ref={ref} data-shadow={shadow} className={cx('sk-ai-inputsection-wrapper', className)} {...rest}>
      {children}
    </div>
  );
});
