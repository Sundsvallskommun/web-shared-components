import { Input } from '@sk-web-gui/forms';
import { useThemeQueries } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

export interface InputSectionInputProps extends React.ComponentPropsWithoutRef<typeof Input.Component> {
  isMobile?: boolean;
}

export const InputSectionInput = React.forwardRef<HTMLInputElement, InputSectionInputProps>((props, ref) => {
  const { className, isMobile, ...rest } = props;

  return (
    <Input ref={ref} className={cx('sk-ai-inputsection-input', className)} size={isMobile ? 'sm' : 'md'} {...rest} />
  );
});
