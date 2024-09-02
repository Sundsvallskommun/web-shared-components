import { Input } from '@sk-web-gui/forms';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { InputSectionDefaultProps } from './input-section';

export interface InputSectionInputProps
  extends React.ComponentPropsWithoutRef<typeof Input.Component>,
    Omit<InputSectionDefaultProps, 'shadow'> {}

export const InputSectionInput = React.forwardRef<HTMLInputElement, InputSectionInputProps>((props, ref) => {
  const { className, isMobile, variant = 'default', ...rest } = props;

  return (
    <Input
      ref={ref}
      className={cx('sk-ai-inputsection-input', className)}
      size={isMobile && variant === 'default' ? 'sm' : 'md'}
      {...rest}
    />
  );
});
