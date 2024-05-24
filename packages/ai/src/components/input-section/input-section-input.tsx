import { Input } from '@sk-web-gui/forms';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

type InputSectionInputProps = React.ComponentPropsWithoutRef<typeof Input.Component>;

export const InputSectionInput = React.forwardRef<HTMLInputElement, InputSectionInputProps>((props, ref) => {
  const { className, ...rest } = props;

  return <Input ref={ref} className={cx('sk-ai-inputsection-input', className)} size="md" {...rest} />;
});
