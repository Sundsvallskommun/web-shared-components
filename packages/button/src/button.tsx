import { Link } from '@sk-web-gui/link';
import { Spinner } from '@sk-web-gui/spinner';
import { DefaultProps, PolymorphicComponentPropsWithRef, PolymorphicRef, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useButtonClass } from './styles';

export interface ButtonProps extends DefaultProps, React.ComponentPropsWithRef<'button'> {
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
  color?: 'info' | 'success' | 'primary' | 'warning' | 'error' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button appearance */
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary' | 'ghost';
  /** React node */
  children?: React.ReactNode;
  /** Sets the button to the rounded variant */
  rounded?: boolean;
  /** Sets if inverted look */
  inverted?: boolean;
  /** Sets if this is an icon button */
  iconButton?: boolean;
  /** Make sure to use aria-describedby or such for accessibility */
  'aria-disabled'?: React.ButtonHTMLAttributes<HTMLButtonElement>['aria-disabled'];
  /**
   * If the background of the button should be shown
   * @default true
   */
  showBackground?: boolean;
  /**
   * @default button
   */
  as?: React.ElementType;
}

export interface ButtonContentProps {
  loading?: ButtonProps['loading'];
  loadingText?: ButtonProps['loadingText'];
  leftIcon?: ButtonProps['leftIcon'];
  rightIcon?: ButtonProps['rightIcon'];
  children?: ButtonProps['children'];
  size?: ButtonProps['size'];
}

export const ButtonContent: React.FC<ButtonContentProps> = (props: ButtonContentProps): JSX.Element => {
  const { size = 'md', loading, loadingText, leftIcon, rightIcon, children } = props;
  return (
    <>
      {leftIcon && !loading ? <span className="btn-has-icon-left">{leftIcon}</span> : null}
      {loading && (
        <Spinner
          size={size === 'sm' ? 1.6 : size === 'md' ? 1.8 : 2}
          className={cx(loadingText ? 'relative' : 'absolute', loadingText ? `mr-2` : 'mr-0')}
        />
      )}
      {loading ? loadingText || <span className="opacity-0">{children}</span> : children}
      {rightIcon && !loading ? <span className="btn-has-icon-right">{rightIcon}</span> : null}
    </>
  );
};

export type IButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, ButtonProps>;
export const Button = React.forwardRef(
  <C extends React.ElementType = 'button'>(props: IButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      disabled: _disabled,
      'aria-disabled': ariaDisabled,
      loading,
      active,
      as,
      type = as ? undefined : 'button',
      className,
      color = 'primary',
      variant = 'primary',
      size = 'md',
      rounded = false,
      iconButton,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      inverted,
      showBackground = true,
      ...rest
    } = props;
    const Component: React.ElementType = as || 'button';

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
        data-background={showBackground ? undefined : 'false'}
        {...rest}
      >
        <ButtonContent
          size={size}
          loading={loading}
          loadingText={loadingText}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </ButtonContent>
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
        data-inverted={inverted ? inverted : undefined}
        data-icon={iconButton ? iconButton : undefined}
        data-background={showBackground ? undefined : 'false'}
        className={cx(classes, className)}
      >
        <ButtonContent
          size={size}
          loading={loading}
          loadingText={loadingText}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </ButtonContent>
      </Component>
    );
  }
);

if (__DEV__) {
  Button.displayName = 'Button';
}

export default Button;
