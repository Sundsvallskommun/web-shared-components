import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { IInputProps, OmittedTypes } from '../input/input';
import { useInputClass } from '../input/styles';
import { useFormControl } from '../form-control';

type TextareaHTMLAttributes<T = HTMLTextAreaElement> = Omit<React.TextareaHTMLAttributes<T>, OmittedTypes>;

type ITextareaProps = {
  showCount?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLengthWarningText?: string;
};

export type TextareaProps<T = HTMLTextAreaElement> = IInputProps<T> &
  TextareaHTMLAttributes<T> &
  ITextareaProps &
  React.RefAttributes<T>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    maxLength,
    showCount,
    value = '',
    onChange,
    maxLengthWarningText,
    size = 'md',
    variant = 'outline',
    color = 'primary',
    as: Comp = 'textarea',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    className,
    id,
    children,
    ...rest
  } = props;
  const { readOnly, disabled, invalid, required, ...formControl } = useFormControl(props);
  const classes = useInputClass({ size, disabled, variant });
  const [maxLengthWarning, setMaxCountWarning] = React.useState<boolean>(false);
  const [charCount, setCharCount] = React.useState<number>(0);
  const [text, setText] = React.useState<string>(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (maxLength && maxLength > 0) {
      if (e.target.value.length >= maxLength) {
        setMaxCountWarning(true);
      } else {
        setMaxCountWarning(false);
      }
      setCharCount(e.target.value.length);
    }
    if (onChange) {
      onChange(e);
    }
  };

  React.useEffect(() => {
    setText(value);
    setCharCount(value.length);
  }, [value]);

  return (
    <div className={cx(className)}>
      <Comp
        onChange={handleOnChange}
        maxLength={maxLength}
        value={text}
        ref={ref}
        readOnly={readOnly}
        aria-readonly={readOnly}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        required={required}
        aria-required={required}
        aria-describedby={ariaDescribedby}
        data-color={color ? color : undefined}
        className={cx('form-textarea', classes, className)}
        id={id || formControl.id}
        {...rest}
      />
      {maxLengthWarning && (
        <p className="sr-only" aria-live="assertive" role="alert">
          {maxLengthWarningText}
        </p>
      )}
      {showCount && (
        <div className="form-textarea-counter">
          {charCount}/{maxLength}
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  Textarea.displayName = 'Textarea';
}

export default Textarea;
