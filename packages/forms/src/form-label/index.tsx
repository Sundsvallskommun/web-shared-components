import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

import { useFormControl } from '../form-control';

interface IFormLabelProps extends DefaultProps {
  disabled?: boolean;
  children?: React.ReactNode;
  htmlFor?: string;
  showRequired?: boolean;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg';
}

interface IFormLabelRegularProps extends React.ComponentPropsWithRef<'label'>, IFormLabelProps {}
interface IFormLabelFieldsetProps extends React.ComponentPropsWithRef<'legend'>, IFormLabelProps {}
export type FormLabelProps = IFormLabelFieldsetProps | IFormLabelRegularProps;

export const FormLabel = React.forwardRef<HTMLElement, FormLabelProps>((props, ref) => {
  const { children, className, htmlFor, id, showRequired = true, as, size: _size, ...rest } = props;
  const formControl = useFormControl(rest);
  const size = _size || formControl.size || 'md';

  const classes = cx(
    'sk-form-label',
    `sk-form-label-${size}`,
    formControl.disabled && 'sk-form-label-disabled',
    className
  );

  const getComp = (): React.ElementType => {
    switch (formControl.fieldset) {
      case true:
        return 'legend';
      case false:
        return 'label';
      default:
        return 'label';
    }
  };

  const Comp = as || getComp();

  return (
    <Comp
      ref={ref}
      className={classes}
      htmlFor={htmlFor || (!formControl.fieldset ? formControl.id : undefined)}
      id={id || formControl.labelId}
      {...rest}
    >
      {children}
      {formControl.required && showRequired && <RequiredIndicator />}
    </Comp>
  );
});

if (__DEV__) {
  FormLabel.displayName = 'FormLabel';
}

export const RequiredIndicator = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithRef<'span'>>(
  (props, ref) => {
    const { className, ...rest } = props;
    const classes = cx('sk-form-required-indicator', className);

    return <span ref={ref} className={classes} aria-hidden="true" children="*" {...rest} />;
  }
);

if (__DEV__) {
  RequiredIndicator.displayName = 'RequiredIndicator';
}

export default FormLabel;
