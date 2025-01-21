import { FormControlObject } from './context';
import { useFormControlContext } from './use-form-control-context';

export interface UseFormControlProps {
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

export interface UseFormControlData extends UseFormControlProps {
  labelId?: string;
  errorId?: string;
  helpTextId?: string;
  hasErrorText?: boolean;
  hasHelpText?: boolean;
}

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
