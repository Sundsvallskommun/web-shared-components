import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { FormControlProps, useFormControl } from '../form-control';
interface IFormHelperTextProps extends DefaultProps, Pick<FormControlProps, 'size'> {
  children?: React.ReactNode;
}

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement>, IFormHelperTextProps {}

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
