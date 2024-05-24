import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface InputSectionWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * @default true
   */
  shadow?: boolean;
}

export const InputSectionWrapper = React.forwardRef<HTMLDivElement, InputSectionWrapperProps>((props, ref) => {
  const { className, shadow = true, ...rest } = props;

  return <div ref={ref} data-shadow={shadow} className={cx('sk-ai-inputsection-wrapper', className)} {...rest} />;
});
