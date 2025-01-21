import { DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import FormErrorMessage from '../form-error-message';
import FormHelperText from '../form-helper-text';
import { UseFormControlProps } from './use-form-control';
import { FormControlContext } from './context';

interface IFormControlRegularProps extends DefaultProps, UseFormControlProps, React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
  fieldset?: false | undefined;
}
interface IFormControlFieldsetProps extends DefaultProps, UseFormControlProps, React.ComponentPropsWithRef<'fieldset'> {
  children?: React.ReactNode;
  fieldset: true;
}

export type FormControlProps = IFormControlFieldsetProps | IFormControlRegularProps;

export const FormControl = React.forwardRef<HTMLElement, FormControlProps>((props, ref) => {
  const {
    children,
    className,
    required,
    disabled,
    invalid,
    readOnly,
    id: idProp,
    name,
    fieldset = false,
    size = 'md',
    ...rest
  } = props;
  const classes = cx('sk-form-control', className);
  const autoId = React.useId();
  const id = idProp || `sk-field-${autoId}`;

  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const helpTextId = `${id}-helptext`;

  const crawlForType = (children: React.ReactNode, type: React.ComponentType): boolean => {
    let hasType = false;
    const validChildren = getValidChildren(children);
    for (let index = 0; index < validChildren.length; index++) {
      if (validChildren[index].type === type) {
        hasType = true;
        break;
      }
      if (validChildren[index].props.children && crawlForType(validChildren[index].props.children, type)) {
        hasType = true;
        break;
      }
    }
    return hasType;
  };

  const hasErrorText = crawlForType(children, FormErrorMessage);
  const hasHelpText = crawlForType(children, FormHelperText);

  const context = {
    required,
    disabled,
    invalid,
    readOnly,
    id,
    name,
    labelId,
    errorId,
    helpTextId,
    fieldset,
    size,
    hasErrorText,
    hasHelpText,
  };

  const getComp = (): React.ElementType => {
    switch (fieldset) {
      case true:
        return 'fieldset';
      case false:
        return 'div';
      default:
        return 'div';
    }
  };

  const Comp = getComp();

  return (
    <FormControlContext.Provider value={context}>
      <Comp
        ref={ref}
        aria-describedby={
          fieldset && (hasErrorText || hasHelpText)
            ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
            : undefined
        }
        aria-invalid={invalid}
        className={classes}
        required={required}
        {...rest}
      >
        {children}
      </Comp>
    </FormControlContext.Provider>
  );
});

if (__DEV__) {
  FormControl.displayName = 'FormGroup';
}

export default FormControl;
