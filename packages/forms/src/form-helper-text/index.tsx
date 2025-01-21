import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { FormControlProps, useFormControl } from '../form-control';

export interface FormHelperTextProps
  extends DefaultProps,
    Pick<FormControlProps, 'size'>,
    React.ComponentPropsWithRef<'p'> {
  children?: React.ReactNode;
}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>((props, ref) => {
  const { className, id, size = 'md', ...rest } = props;
  const classes = cx('sk-form-helper-text', `sk-form-helper-text-${size}`, className);
  const formControl = useFormControl({});

  return <p ref={ref} className={classes} id={id || formControl.helpTextId} {...rest} />;
});

if (__DEV__) {
  FormHelperText.displayName = 'FormHelperText';
}

export default FormHelperText;
