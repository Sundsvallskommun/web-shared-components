import { Input } from '@sk-web-gui/forms';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { InputSectionDefaultProps } from './input-section';

interface InputSectionWrapperProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Omit<InputSectionDefaultProps, 'isMobile'> {}

export const InputSectionWrapper = React.forwardRef<HTMLDivElement, InputSectionWrapperProps>((props, ref) => {
  const { className, shadow = true, variant = 'default', children, ...rest } = props;

  return (
    <div ref={ref} data-shadow={shadow} className={cx('sk-ai-inputsection-wrapper', className)} {...rest}>
      {variant === 'inset' ? (
        <Input.InnerGroup className="sk-ai-inputsection-group">{children}</Input.InnerGroup>
      ) : (
        children
      )}
    </div>
  );
});
