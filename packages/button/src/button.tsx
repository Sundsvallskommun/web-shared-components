import { Spinner } from '@sk-web-gui/spinner';
import { DefaultProps, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Link } from '@sk-web-gui/link';
import { useButtonClass } from './styles';

export interface ButtonProps extends DefaultProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /* Shows loading spinner */
  loading?: boolean;
  /** Makes button disabled */
  disabled?: boolean;
  /** Makes button active */
  active?: boolean;
  /** The label to show in the button when loading is true */
  loadingText?: string;
  /** Set the original html type of button */
  // type?: 'button' | 'reset' | 'submit';
  /** Adds icon before button label */
  leftIcon?: React.ReactElement;
  /** Adds icon after button label */
  rightIcon?: React.ReactElement;
  /** Set the button color */
  color?: string;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'fit';
  /** Controls button appearance */
  variant?: 'link' | 'solid' | 'outline' | 'ghost';
  /** React node */
  children?: React.ReactNode;
  /** Sets the button to the rounded variant */
  rounded?: boolean;
  /** Sets if this is an icon button */
  iconButton?: boolean;
  /** Make sure to use aria-describedby or such for accessibility */
  'aria-disabled'?: React.ButtonHTMLAttributes<HTMLButtonElement>['aria-disabled'];
}

export type IButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, ButtonProps>;

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

export const Button = React.forwardRef(
  <C extends React.ElementType = 'button'>(props: IButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      disabled: _disabled,
      'aria-disabled': ariaDisabled,
      loading,
      active,
      type = 'button',
      className,
      color,
      variant = 'outline',
      size = 'md',
      rounded = false,
      iconButton,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      as,
      ...rest
    } = props;
    const Component = as || 'button';

    const disabled = _disabled || loading;
    const classes = useButtonClass({
      variant,
      size,
      disabled,
    });

    return variant == 'link' ? (
      <Link
        as="button"
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? disabled : ariaDisabled === 'true' ? ariaDisabled : undefined}
        type={type}
        data-active={active ? 'true' : undefined}
        className={cx(className)}
        {...rest}
      >
        {getButtonContent(props)}
      </Link>
    ) : (
      <Component
        {...rest}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? disabled : ariaDisabled === 'true' ? ariaDisabled : undefined}
        type={type}
        data-rounded={rounded ? rounded : undefined}
        data-active={active ? 'true' : undefined}
        data-color={color ? color : undefined}
        data-icon={iconButton ? iconButton : undefined}
        className={cx(classes, className)}
      >
        {getButtonContent(props)}
      </Component>
    );
  }
);

if (__DEV__) {
  Button.displayName = 'Button';
}

export default Button;
