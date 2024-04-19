import { useId } from '@reach/auto-id';
import { DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import FormErrorMessage from '../form-error-message';
import FormHelperText from '../form-helper-text';

interface UseFormControlProps {
  /** If `true`, this prop is passed to its children. */
  required?: boolean;
  /** If `true`, this prop is passed to its children. */
  disabled?: boolean;
  /** If `true`, this prop is passed to its children. */
  invalid?: boolean;
  /** If `true`, this prop is passed to its children. */
  readOnly?: boolean;
  /** The `id` to use for the form control. */
  id?: string;
  /** The name of the input */
  name?: string;
  /** If this is a group, set to true. */
  fieldset?: boolean;
  /** Set size for all children */
  size?: 'sm' | 'md' | 'lg';
}

interface UseFormControlData extends UseFormControlProps {
  labelId?: string;
  errorId?: string;
  helpTextId?: string;
  hasErrorText?: boolean;
  hasHelpText?: boolean;
}

interface IFormControlRegularProps extends DefaultProps, UseFormControlProps, React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
  fieldset?: false | undefined;
}
interface IFormControlFieldsetProps extends DefaultProps, UseFormControlProps, React.ComponentPropsWithRef<'fieldset'> {
  children?: React.ReactNode;
  fieldset: true;
}

export type FormControlProps = IFormControlFieldsetProps | IFormControlRegularProps;

//eslint-disable-next-line
type FormControlObject = Record<string, any>;

export const useFormControl = (props: UseFormControlProps & FormControlObject): UseFormControlData => {
  const context = useFormControlContext();
  if (!context) {
    return props;
  }
  const keys = Object.keys(context);
  return keys.reduce((acc: { [key: string]: string }, prop) => {
    /** Giving precedence to `props` over `context` */
    acc[prop] = props[prop];

    if (context) {
      if (props[prop] == null) {
        acc[prop] = context[prop];
      }
    }

    return acc;
  }, {});
};

const FormControlContext = React.createContext<(UseFormControlProps & FormControlObject) | undefined>(undefined);

const useFormControlContext = () => React.useContext(FormControlContext);

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

  const id = idProp || `sk-field-${useId()}`;

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
