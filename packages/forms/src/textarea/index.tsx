import { cx, __DEV__, DefaultProps, omit } from '@sk-web-gui/utils';
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
  maxLengthWarningText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    maxLength,
    showCount,
    onChange,
    value,
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

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && maxLength > 0) {
      if (e.target.value.length >= maxLength) {
        setMaxCountWarning(true);
      } else {
        setMaxCountWarning(false);
      }
      setCharCount(e.target.value.length);
    }
    onChange?.(e);
  };

  React.useEffect(() => {
    if (maxLength) {
      if (charCount >= maxLength) {
        setMaxCountWarning(true);
      } else {
        setMaxCountWarning(false);
      }
    }
  }, [charCount, maxLength]);

  React.useEffect(() => {
    setCharCount(value?.toString()?.length ?? 0);
  }, [value]);

  return (
    <div className={cx(className)}>
      <Comp
        onChange={handleOnChange}
        maxLength={maxLength}
        value={value}
        ref={ref}
        readOnly={readOnly}
        aria-readonly={readOnly}
        disabled={disabled}
        aria-invalid={invalid}
        required={required}
        aria-describedby={
          (hasErrorText && errorId) || (hasHelpText && helpTextId)
            ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
            : undefined
        }
        data-color={color ? color : undefined}
        className={cx('sk-form-input-textarea', classes, className)}
        id={id || formControl.id}
        {...omit(rest, ['invalid'])}
      />
      {maxLengthWarning && (
        <p className="sk-form-input-textarea-warning" aria-live="assertive" role="alert">
          {maxLengthWarningText}
        </p>
      )}
      {showCount && (
        <div className="sk-form-textarea-counter">
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
