import { Spinner } from '@sk-web-gui/spinner';
import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Link } from '@sk-web-gui/link';
import { useButtonClass } from './styles';

interface IButtonProps extends DefaultProps {
  /* Shows loading spinner */
  loading?: boolean;
  /* Makes button disabled */
  disabled?: boolean;
  /* Makes button active */
  active?: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /* Set the original html type of button */
  type?: 'button' | 'reset' | 'submit';
  /* Adds icon before button label */
  leftIcon?: React.ReactElement;
  /* Adds icon after button label */
  rightIcon?: React.ReactElement;
  /* Set the button color */
  color?: string;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button appearance */
  variant?: 'link' | 'solid' | 'outline' | 'light' | 'ghost' | 'icon';
  /* React node */
  children?: React.ReactNode;
  /* Sets the button to the rounded variant */
  rounded?: boolean;
  /* Sets if this is an icon button */
  iconButton?: boolean;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, IButtonProps {}

export const getButtonContent = (props: ButtonProps): JSX.Element => {
  const { loading, loadingText, leftIcon, rightIcon, children } = props;
  return (
    <>
      {leftIcon && !loading ? <span className="btn-has-icon-left">{leftIcon}</span> : null}
      {loading && (
        <Spinner className={cx(loadingText ? 'relative' : 'absolute', loadingText ? `mr-2` : 'mr-0')} size="sm" />
      )}
      {loading ? loadingText || <span className="opacity-0">{children}</span> : children}
      {rightIcon && !loading ? <span className="btn-has-icon-right">{rightIcon}</span> : null}
    </>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    disabled: _disabled,
    loading,
    active,
    type,
    className,
    loadingText,
    rightIcon,
    leftIcon,
    color,
    variant = 'outline',
    size = 'md',
    rounded = false,
    iconButton,
    ...rest
  } = props;

  const disabled = _disabled || loading;
  const classes = useButtonClass({
    variant,
    size,
    disabled,
  });

  return variant === 'link' ? (
    <Link
      as="button"
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled ? disabled : undefined}
      type={type}
      data-active={active ? 'true' : undefined}
      className={cx(className)}
      {...rest}
    >
      {getButtonContent(props)}
    </Link>
  ) : (
    <button
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled ? disabled : undefined}
      type={type}
      data-rounded={rounded ? rounded : undefined}
      data-active={active ? 'true' : undefined}
      data-color={color ? color : undefined}
      data-icon={iconButton ? iconButton : undefined}
      className={cx(classes, className)}
      {...rest}
    >
      {getButtonContent(props)}
    </button>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}
