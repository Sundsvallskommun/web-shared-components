import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

import { FormControlProps, useFormControl } from '../form-control';
export interface FormErrorMessageProps
  extends DefaultProps,
    Pick<FormControlProps, 'size'>,
    React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
}

export const FormErrorMessage = React.forwardRef<HTMLParagraphElement, FormErrorMessageProps>((props, ref) => {
  const { className, id, size = 'md', ...rest } = props;
  const classes = cx('sk-form-error-message', `sk-form-error-message-${size}`, className);
  const formControl = useFormControl({});

  return <div ref={ref} className={classes} id={id || formControl.errorId} {...rest} />;
});

if (__DEV__) {
  FormErrorMessage.displayName = 'FormErrorMessage';
}

export default FormErrorMessage;
