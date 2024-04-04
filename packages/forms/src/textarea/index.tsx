import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { IInputProps } from '../input/input';
import { useInputClass } from '../input/styles';
import { useFormControl } from '../form-control';

export interface TextareaProps
  extends DefaultProps,
    IInputProps<HTMLTextAreaElement>,
    React.ComponentPropsWithRef<'textarea'> {
  showCount?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLengthWarningText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    maxLength,
    showCount,
    value = '',
    onChange,
    maxLengthWarningText,
    size = 'md',
    color = 'primary',
    as: Comp = 'textarea',
    className,
    id,
    ...rest
  } = props;
  const { readOnly, disabled, invalid, required, errorId, helpTextId, hasErrorText, hasHelpText, ...formControl } =
    useFormControl(props);
  const classes = useInputClass({ size, disabled });
  const [maxLengthWarning, setMaxCountWarning] = React.useState<boolean>(false);
  const [charCount, setCharCount] = React.useState<number>(0);
  const [text, setText] = React.useState<string>(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        aria-invalid={invalid}
        required={required}
        aria-required={required}
        aria-describedby={
          (hasErrorText && errorId) || (hasHelpText && helpTextId)
            ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
            : undefined
        }
        data-color={color ? color : undefined}
        className={cx('sk-form-input-textarea', classes, className)}
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
