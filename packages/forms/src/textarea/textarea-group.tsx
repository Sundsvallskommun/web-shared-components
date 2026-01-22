import { __DEV__, cx, DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import Textarea, { TextareaProps } from './textarea';
import React from 'react';
import { useTextareGroupClass } from './styles';

export interface TextareaGroupProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Size of all wrapped input */
  size?: TextareaProps['size'];
  /* React node */
  children?: React.ReactNode;
  /* Makes input invalid */
  invalid?: TextareaProps['invalid'];
  /* Makes input disabled */
  disabled?: TextareaProps['disabled'];
  /* Makes input readonly */
  readOnly?: TextareaProps['readOnly'];
}

export const TextareaGroup = React.forwardRef<HTMLDivElement, TextareaGroupProps>((props, ref) => {
  const { children, className, size = 'md', invalid, disabled, readOnly, ...rest } = props;
  const classes = useTextareGroupClass({ size });

  const validChildren = getValidChildren(children);

  return (
    <div
      ref={ref}
      role="group"
      className={cx(classes, className)}
      aria-invalid={invalid}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      {...rest}
    >
      {validChildren.map((child) => {
        if (React.isValidElement<TextareaProps>(child) && child.type === Textarea) {
          return React.cloneElement(child, {
            size,
            disabled,
            readOnly,
            className: cx(child.props.className),
          });
        }

        return child;
      })}
    </div>
  );
});

if (__DEV__) {
  TextareaGroup.displayName = 'TextareaGroup';
}

export default TextareaGroup;
