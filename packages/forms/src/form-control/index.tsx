import { useId } from '@reach/auto-id';
import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

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
  /** If this is a group, set to true. */
  fieldset?: boolean;
  /** Set size for all children */
  size?: 'sm' | 'md' | 'lg';
}

interface UseFormControlData extends UseFormControlProps {
  labelId?: string;
  errorId?: string;
  helpTextId?: string;
}

interface IFormControlRegularProps
  extends DefaultProps,
    UseFormControlProps,
    React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  fieldset?: false | undefined;
}
interface IFormControlFieldsetProps
  extends DefaultProps,
    UseFormControlProps,
    React.HTMLAttributes<HTMLFieldSetElement> {
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
    fieldset = false,
    size = 'md',
    ...rest
  } = props;
  const classes = cx('sk-form-control', className);

  const id = idProp || `sk-field-${useId()}`;

  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  const helpTextId = `${id}-helptext`;

  const context = {
    required,
    disabled,
    invalid,
    readOnly,
    id,
    labelId,
    errorId,
    helpTextId,
    fieldset,
    size,
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
        aria-describedby={fieldset ? `${errorId} ${helpTextId}` : undefined}
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
